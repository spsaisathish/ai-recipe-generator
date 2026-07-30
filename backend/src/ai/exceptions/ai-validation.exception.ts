import { HttpStatus } from '@nestjs/common';
import { AIException } from './ai.exception';

export class AIValidationException extends AIException {
  readonly statusCode = HttpStatus.BAD_REQUEST;

  constructor(message: string, cause?: unknown) {
    super(message, cause);
  }
}
