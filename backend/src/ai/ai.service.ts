import { Inject, Injectable } from '@nestjs/common';
import { PromptBuilderService } from './prompt-builder.service';
import { ClaudeProvider } from './providers/claude.provider';
import { AI_PROVIDER } from './constants/ai-provider.constants';
import type { AIProvider } from './interfaces/ai-provider.interface';
@Injectable()
export class AiService {
  constructor(
    private readonly promptBuilder: PromptBuilderService,

    private readonly claudeProvider: ClaudeProvider,

    @Inject(AI_PROVIDER)

    private readonly provider: AIProvider
  ) {}
}
