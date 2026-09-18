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
import { EMBEDDING_PROVIDER } from './embeddings/constants/embedding-provider.constants';
import { EmbeddingService } from './embeddings/embedding.service';
import { GeminiEmbeddingProvider } from './embeddings/providers/gemini-embedding.provider';
import { PostgresEmbeddingRepository } from './embeddings/repositories/postgres-embedding.repository';
import { EMBEDDING_REPOSITORY } from './embeddings/constants/embedding-repository.constants';
import { RecipeEmbeddingService } from './embeddings/recipe-embedding.service';
import { EmbeddingTestController } from './embeddings/embedding-test.controller';
import { GeminiRerankerProvider } from './reranking/providers/gemini-reranker.provider';
import { RERANKER } from './reranking/constants/reranker.constants';
import { RerankerService } from './reranking/reranker.service';
import { DocumentIngestionService } from './ingestion/document-ingestion.service';
import { ChunkingService } from './chunking/chunking.service';

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
  controllers: [EmbeddingTestController],
  providers: [
    AiService,
    PromptBuilderService,
    ResponseParserService,
    ResponseValidatorService,
    ClaudeProvider,
    GeminiProvider,
    aiProviderFactory,
    ProviderRouterService,
    EmbeddingService,
    {
      provide: EMBEDDING_PROVIDER,
      useClass: GeminiEmbeddingProvider,
    },
    {
      provide: EMBEDDING_REPOSITORY,
      useClass: PostgresEmbeddingRepository,
    },
    RerankerService,
    {
      provide: RERANKER,
      useClass: GeminiRerankerProvider,
    },
    ChunkingService,
    DocumentIngestionService,
    RecipeEmbeddingService,
  ],
  exports: [AiService, EmbeddingService, RecipeEmbeddingService, RerankerService],
})
export class AiModule {}
