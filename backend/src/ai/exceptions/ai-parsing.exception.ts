import { HttpStatus } from '@nestjs/common';
import { AIException } from './ai.exception';

export class AIParsingException extends AIException {
  readonly statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

  constructor(message: string, cause?: unknown) {
    super(message, cause);
  }
}
