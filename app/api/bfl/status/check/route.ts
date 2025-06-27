import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { BFLError, type ErrorResponse } from '@/types/errors';

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

export const dynamic = 'force-dynamic';

interface BFLStatusResponse {
  status: 'Ready' | 'Error' | 'Failed' | 'Processing';
  result?: {
    sample: string;
  };
  error?: string;
}

async function makeRequestWithRetry(url: string, retryCount = 0): Promise<BFLStatusResponse> {
  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'x-key': process.env.BFL_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    if (!(error instanceof AxiosError) || !error.response) {
      throw error;
    }

    const { status } = error.response;

    // Handle specific error cases
    switch (status) {
      case 429: // Rate limit
        if (retryCount < MAX_RETRIES) {
          const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
          console.log(`Rate limit hit, retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return makeRequestWithRetry(url, retryCount + 1);
        }
        throw new Error('Rate limit exceeded after retries');

      case 402:
        throw new Error('Insufficient credits. Please add credits to your account.');

      case 400:
        throw new Error('Invalid parameters');

      case 401:
        throw new Error('Invalid API key or unauthorized access');

      case 404:
        throw new Error('API endpoint not found');

      default:
        throw error;
    }
  }
}

export async function GET(request: Request) {
  console.log('BFL Status Check API route hit');

  if (!process.env.BFL_API_KEY) {
    console.error('BFL_API_KEY is not configured');
    return NextResponse.json(
      { error: 'API configuration error' },
      { status: 500 }
    );
  }

  try {
    // Get polling URL from query params
    const requestUrl = new URL(request.url);
    const polling_url = requestUrl.searchParams.get('polling_url');

    if (!polling_url) {
      return NextResponse.json(
        { error: 'Polling URL is required' },
        { status: 400 }
      );
    }

    console.log('Checking task status with polling URL:', polling_url);
    const result = await makeRequestWithRetry(polling_url);

    // Return the status response
    return NextResponse.json({
      ...result,
      status: result.status
    });
  } catch (error) {
    console.error('BFL Status API Error:', error);

    const response: ErrorResponse = {
      error: 'Task status check failed'
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
