import { Inject, Injectable } from '@nestjs/common';
import { EmbeddingService } from './embedding.service';
import { EMBEDDING_REPOSITORY } from './constants/embedding-repository.constants';
import type { EmbeddingRepository } from './interfaces/embedding.repository.interface';
import { RerankerService } from '../reranking/reranker.service';

@Injectable()
export class RecipeEmbeddingService {
  constructor(
    private readonly embeddingService: EmbeddingService,

    @Inject(EMBEDDING_REPOSITORY)
    private readonly embeddingRepository: EmbeddingRepository,

    private readonly rerankerService: RerankerService,
  ) {}

  async create(content: string): Promise<void> {
    const embedding = await this.embeddingService.embed(content);

    await this.embeddingRepository.save(content, embedding);
  }

  async search(query: string, limit = 5) {
    const queryEmbedding = await this.embeddingService.embed(query);

    return this.embeddingRepository.searchSimilar(queryEmbedding, limit);
  }

  async searchKeyword(query: string, limit = 5) {
    return this.embeddingRepository.searchKeyword(query, limit);
  }

  async searchHybrid(query: string, limit = 5) {
    const queryEmbedding = await this.embeddingService.embed(query);

    const candidates = await this.embeddingRepository.searchHybrid(
      query,
      queryEmbedding,
      20,
    );

    return this.rerankerService.rerank(
      query,
      candidates.map((candidate) => ({
        id: candidate.id,
        content: candidate.content,
      })),
      limit,
    );
  }
}
