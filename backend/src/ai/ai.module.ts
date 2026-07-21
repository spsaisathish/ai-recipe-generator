import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { PromptBuilderService } from './prompt-builder.service';
import { AI_PROVIDER } from './constants/ai-provider.constants';
import { ClaudeProvider } from './providers/claude.provider';

@Module({
  providers: [
    AiService,
    PromptBuilderService,
    ClaudeProvider,
    {
      provide: AI_PROVIDER,
      useClass: ClaudeProvider,
    },
  ],
})
export class AiModule {}
