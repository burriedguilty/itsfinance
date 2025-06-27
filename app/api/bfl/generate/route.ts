import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { BFLError, type ErrorResponse } from '@/types/errors';

const BFL_ENDPOINTS = {
  standard: 'https://api.bfl.ai/v1/flux-pro-1.1',
  kontext: 'https://api.bfl.ai/v1/flux-kontext-pro'
};
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

interface BFLStandardGenerationProps {
  image: string;
  prompt: string;
  negative_prompt?: string;
  num_inference_steps?: number;
  guidance_scale?: number;
  strength?: number;
}

interface BFLKontextEditProps {
  input_image: string;
  prompt: string;
  aspect_ratio?: number;
  prompt_upsampling?: boolean;
  safety_tolerance?: number;
  output_format?: string;
}

export const dynamic = 'force-dynamic';

interface BFLGenerateResponse {
  task_id: string;
  polling_url: string;
  status: string;
}

async function makeRequestWithRetry(url: string, data: BFLKontextEditProps | BFLStandardGenerationProps, retryCount = 0): Promise<BFLGenerateResponse> {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'x-key': process.env.BFL_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    if (!(error instanceof AxiosError) || !error.response) {
      throw error;
    }

    const { status, data: errorData } = error.response;

    // Handle specific error cases
    switch (status) {
      case 429: // Rate limit
        if (retryCount < MAX_RETRIES) {
          const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
          console.log(`Rate limit hit, retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return makeRequestWithRetry(url, data, retryCount + 1);
        }
        throw new Error('Rate limit exceeded after retries');

      case 402:
        throw new Error('Insufficient credits. Please add credits to your account.');

      case 400:
        throw new Error(`Bad request: ${errorData?.detail || 'Invalid parameters'}`);

      case 401:
        throw new Error('Invalid API key or unauthorized access');

      case 404:
        throw new Error('API endpoint not found');

      default:
        throw error;
    }
  }
}

export async function POST(request: Request) {
  console.log('BFL Generate API route hit');

  if (!process.env.BFL_API_KEY) {
    console.error('BFL_API_KEY is not configured');
    return NextResponse.json(
      { error: 'API configuration error' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    console.log('Received request body:', { 
      ...body, 
      image: '[truncated]',
      input_image: body.input_image ? '[truncated]' : undefined
    });

    // For image editing tasks, always use Kontext endpoint
    // If image is provided in standard format, convert it to input_image for Kontext
    const isStandardFormat = Boolean(body.image);
    const endpoint = BFL_ENDPOINTS.kontext;
    
    if (isStandardFormat) {
      // Convert standard format to Kontext format
      body.input_image = body.image;
      delete body.image;
      delete body.negative_prompt;
      delete body.num_inference_steps;
      delete body.guidance_scale;
      delete body.strength;
    }

    // Validate required fields
    if (!body.prompt) {
      return NextResponse.json(
        { error: 'Missing required field: prompt' },
        { status: 400 }
      );
    }

    // After conversion, we should have input_image
    if (!body.input_image) {
      return NextResponse.json(
        { error: 'Missing required field: input_image' },
        { status: 400 }
      );
    }



    console.log('Making request to BFL API...');
    const result = await makeRequestWithRetry(endpoint, body);

    console.log('BFL API response received successfully');
    return NextResponse.json(result);
  } catch (error) {
    console.error('BFL API Error:', error);

    const response: ErrorResponse = {
      error: 'Image generation failed'
    };

    if (error instanceof BFLError) {
      response.details = error.message;
      response.status = 400;
    } else if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 429:
          response.details = 'Rate limit exceeded';
          response.status = 429;
          break;
        case 402:
          response.details = 'Insufficient credits';
          response.status = 402;
          break;
        case 401:
          response.details = 'Unauthorized';
          response.status = 401;
          break;
        case 404:
          response.details = 'Resource not found';
          response.status = 404;
          break;
        default:
          response.details = error.message;
          response.status = error.response?.status || 500;
      }
    } else if (error instanceof Error) {
      response.details = error.message;
      response.status = 500;
    } else {
      response.details = 'An unknown error occurred';
      response.status = 500;
    }

    return NextResponse.json(response, { status: response.status });
  }
}
