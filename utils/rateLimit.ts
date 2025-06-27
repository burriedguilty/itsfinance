interface RateLimitInfo {
  count: number;
  resetTime: number;
}

const rateLimits = new Map<string, RateLimitInfo>();

export function checkRateLimit(userId: string, maxAttempts: number = 15): boolean {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  
  // Get or create rate limit info
  let limitInfo = rateLimits.get(userId);
  if (!limitInfo || now >= limitInfo.resetTime) {
    limitInfo = {
      count: 0,
      resetTime: now + oneDayMs
    };
  }
  
  // Check if limit exceeded
  if (limitInfo.count >= maxAttempts) {
    return false;
  }
  
  // Increment count and update
  limitInfo.count++;
  rateLimits.set(userId, limitInfo);
  
  return true;
}

export function getRateLimitInfo(userId: string): { 
  remainingAttempts: number;
  resetTime: number;
} | null {
  const limitInfo = rateLimits.get(userId);
  if (!limitInfo) return null;
  
  return {
    remainingAttempts: Math.max(0, 15 - limitInfo.count),
    resetTime: limitInfo.resetTime
  };
}
