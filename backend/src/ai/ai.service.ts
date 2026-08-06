import { Inject, Injectable } from '@nestjs/common';
import { PromptBuilderService } from './prompt-builder.service';
import { AI_PROVIDER } from './constants/ai-provider.constants';
import type { AIProvider } from './interfaces/ai-provider.interface';
import { ResponseParserService } from './response-parser.service';
import { ResponseValidatorService } from './validator/response-validator.service';
import { ClassConstructor } from 'class-transformer';
import { AIRequest } from './interfaces/ai-request.interface';
@Injectable()
export class AiService {
  constructor(
    private readonly promptBuilder: PromptBuilderService,

    @Inject(AI_PROVIDER)
    private readonly provider: AIProvider,
    private readonly responseParser: ResponseParserService,
    private readonly responseValidator: ResponseValidatorService,
  ) {}

  async generate<TRequest, TResponse extends object>(
    request: AIRequest<TRequest>,
    responseType: ClassConstructor<TResponse>,
  ): Promise<TResponse> {
    const prompt = this.promptBuilder.build(request);

    const llmResponse = await this.provider.send(prompt);

    const parsedResponse = this.responseParser.parse<TResponse>(llmResponse);

    await this.responseValidator.validate(responseType, parsedResponse);

    return parsedResponse;
  }
}
