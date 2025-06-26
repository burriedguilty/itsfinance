const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    retries?: number;
    delay?: number;
    onRetry?: (error: Error, attempt: number) => void;
  } = {}
): Promise<T> {
  const { 
    retries = 3,
    delay = 1000,
    onRetry = (error, attempt) => console.log(`Retrying (${attempt}/${retries}) after error:`, error.message)
  } = options;

  let lastError: Error;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === retries) {
        throw error;
      }

      onRetry(lastError, attempt);
      await wait(delay * attempt); // Exponential backoff
    }
  }

  throw lastError!;
}
