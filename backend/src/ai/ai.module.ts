import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { PromptBuilderService } from './prompt-builder.service';
import { ClaudeProvider } from './providers/claude.provider';
import { ConfigService } from '@nestjs/config';
import { AIProvider } from './interfaces/ai-provider.interface';
import { GeminiProvider } from './providers/gemini.provider';
import { AI_PROVIDER } from './constants/ai-provider.constants';
import { AIProviderType } from 'src/common/enums/ai-provider-type.enum';
import { ResponseParserService } from './response-parser.service';
import { ResponseValidatorService } from './validator/response-validator.service';
import { ProviderRouterService } from './provider-router/provider-router.service';

const aiProviderFactory = {
  provide: AI_PROVIDER,

  useFactory: (
    configService: ConfigService,
    claudeProvider: ClaudeProvider,
    geminiProvider: GeminiProvider,
  ): AIProvider => {
    const provider = configService.getOrThrow<string>('AI_PROVIDER');

    switch (provider) {
      case AIProviderType.CLAUDE:
        return claudeProvider;

      case AIProviderType.GEMINI:
        return geminiProvider;

      default:
        throw new Error(`Unsupported AI Provider: ${provider}`);
    }
  },

  inject: [ConfigService, ClaudeProvider, GeminiProvider],
};
@Module({
  providers: [
    AiService,
    PromptBuilderService,
    ResponseParserService,
    ResponseValidatorService,
    ClaudeProvider,
    GeminiProvider,
    aiProviderFactory,
    ProviderRouterService
  ],
  exports: [AiService],
})
export class AiModule {}
