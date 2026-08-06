import { Inject, Injectable } from '@nestjs/common';

import { AI_PROVIDER } from '../constants/ai-provider.constants';

import type { AIProvider } from '../interfaces/ai-provider.interface';
import type { PromptRequest } from '../interfaces/prompt-request.interface';

@Injectable()
export class ProviderRouterService {
  constructor(
    @Inject(AI_PROVIDER)
    private readonly provider: AIProvider,
  ) {}

  async send(prompt: PromptRequest): Promise<string> {
    return this.provider.send(prompt);
  }
}