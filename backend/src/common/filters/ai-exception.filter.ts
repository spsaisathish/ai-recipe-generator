import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { AIException } from 'src/ai/exceptions/ai.exception';
import { Request, Response } from 'express';

@Catch(AIException)
export class AIExceptionFilter implements ExceptionFilter {
  catch(exception: AIException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // http context

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    response.status(exception.statusCode).json({
      method: request.method,
      statusCode: exception.statusCode,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.path,
    });
  }
}
