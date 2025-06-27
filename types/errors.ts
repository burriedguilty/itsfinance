export interface APIError {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
}

export class BFLError extends Error {
  constructor(message: string, public details?: unknown) {
    super(message);
    this.name = 'BFLError';
  }
}

export type ErrorResponse = {
  error: string;
  details?: string;
  status?: number;
};
