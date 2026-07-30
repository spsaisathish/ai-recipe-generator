import { Catch, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { AIException } from "src/ai/exceptions/ai.exception";

@Catch(AIException)
export class AIExceptionFilter implements ExceptionFilter {
  catch(
    exception: AIException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp(); // http context

    const request = ctx.getRequest();

    const response = ctx.getResponse();
    

    // 🚀 We'll build this together line by line.
  }
}