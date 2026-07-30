import { AIException } from './ai.exception';

export class AIParsingException extends AIException {
  readonly statusCode = 503;

  constructor(message: string, cause?: unknown) {
    super(message, cause);
  }
}
