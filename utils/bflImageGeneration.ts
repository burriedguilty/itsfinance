import axios from 'axios';

interface BFLBaseProps {
  prompt: string;
  aspect_ratio?: string; // e.g., "16:9", "1:1"
  seed?: number;
  safety_tolerance?: 0 | 1 | 2;
  output_format?: 'jpeg' | 'png';
  webhook_url?: string;
  webhook_secret?: string;
}

interface BFLStandardGenerationProps extends BFLBaseProps {
  image: string; // base64 image for standard generation
  negative_prompt?: string;
  num_inference_steps?: number;
  guidance_scale?: number;
  strength?: number;
}

interface BFLKontextEditProps extends BFLBaseProps {
  input_image: string; // base64 image for Kontext editing
  prompt_upsampling?: boolean;
}

type BFLImageGenerationProps = BFLStandardGenerationProps | BFLKontextEditProps;

interface BFLGenerationResponse {
  task_id: string; // Task ID for reference
  polling_url: string;
  status: 'Ready' | 'Error' | 'Failed' | 'Processing';
  result?: {
    sample: string; // Signed URL for the generated image
  };
  error?: string;
}

let currentPollingUrl: string | null = null;

export const generateImageWithBFL = async (props: BFLImageGenerationProps) => {
  try {
    const response = await axios.post<BFLGenerationResponse>(
      '/api/bfl/generate',
      props
    );

    // Store the polling URL for subsequent status checks
    currentPollingUrl = response.data.polling_url;
    return response.data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

interface PollResult {
  status: 'Ready' | 'Error' | 'Failed' | 'Processing';
  imageUrl?: string;
  error?: string;
}

export const pollImageGeneration = async (taskId: string, maxAttempts = 20): Promise<PollResult> => {
  try {
    if (!currentPollingUrl) {
      throw new Error('No polling URL available. Please generate an image first.');
    }

    let attempts = 0;
    while (attempts < maxAttempts) {
      const response = await axios.get<BFLGenerationResponse>(
        '/api/bfl/status/check',
        {
          params: {
            polling_url: currentPollingUrl
          }
        }
      );

      const { status, result, error } = response.data;

      // If we have a result or error, we're done
      if (status === 'Ready' && result?.sample) {
        currentPollingUrl = null;
        return {
          status: 'Ready',
          imageUrl: result.sample
        } as PollResult;
      } else if (status === 'Error' || status === 'Failed') {
        currentPollingUrl = null;
        return {
          status: status,
          error: error || 'Generation failed'
        } as PollResult;
      }

      // Still processing, wait before next attempt
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // If we get here, we've exceeded max attempts
    throw new Error('Polling timeout: Image generation is taking longer than expected');
  } catch (error) {
    console.error('Error polling image generation:', error);
    throw error;
  }
};
