import { HttpStatus } from '@nestjs/common';
import { AIException } from './ai.exception';

export class AIProviderException extends AIException {
  readonly statusCode = HttpStatus.SERVICE_UNAVAILABLE;

  constructor(message: string, cause?: unknown) {
    super(message, cause);
  }
}
