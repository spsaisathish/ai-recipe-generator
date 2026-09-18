import { Inject, Injectable } from '@nestjs/common';
import { RERANKER } from './constants/reranker.constants';
import type { Reranker } from './interfaces/reranker.interface';

@Injectable()
export class RerankerService {
  constructor(
    @Inject(RERANKER)
    private readonly reranker: Reranker,
  ) {}

  async rerank(
    query: string,
    documents: {
      id: number;
      content: string;
    }[],
    topK: number,
  ) {
    return this.reranker.rerank(query, documents, topK);
  }
}
