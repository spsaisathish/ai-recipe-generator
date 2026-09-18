import { Inject, Injectable } from '@nestjs/common';
import { ChunkingService } from '../chunking/chunking.service';
import { EmbeddingService } from '../embeddings/embedding.service';
import { EMBEDDING_REPOSITORY } from '../embeddings/constants/embedding-repository.constants';
import type { EmbeddingRepository } from '../embeddings/interfaces/embedding.repository.interface';

@Injectable()
export class DocumentIngestionService {
  constructor(
    private readonly chunkingService: ChunkingService,

    private readonly embeddingService: EmbeddingService,

    @Inject(EMBEDDING_REPOSITORY)
    private readonly embeddingRepository: EmbeddingRepository,
  ) {}

  async ingest(document: string, chunkSize = 500, overlap = 50): Promise<void> {
    const chunks = this.chunkingService.chunk(document, chunkSize, overlap);

    for (const chunk of chunks) {
      const embedding = await this.embeddingService.embed(chunk.content);

      await this.embeddingRepository.save(chunk.content, embedding);
    }
  }
}
