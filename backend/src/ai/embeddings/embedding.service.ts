import { Inject, Injectable } from '@nestjs/common';
import { EMBEDDING_PROVIDER } from './constants/embedding-provider.constants';
import type { EmbeddingProvider } from './interfaces/embedding-provider.interface';

@Injectable()
export class EmbeddingService {
  constructor(
    @Inject(EMBEDDING_PROVIDER)
    private readonly provider: EmbeddingProvider,
  ) {}

  async embed(text: string): Promise<number[]> {
    return this.provider.embed(text);
  }
}