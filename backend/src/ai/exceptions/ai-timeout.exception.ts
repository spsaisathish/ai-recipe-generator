import { AIException } from './ai.exception';

export class AITimeoutException extends AIException {
  readonly statusCode = 503;

  constructor(message: string, cause?: unknown) {
    super(message, cause);
  }
}
