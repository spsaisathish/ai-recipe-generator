export interface Reranker {
  rerank(
    query: string,
    documents: {
      id: number;
      content: string;
    }[],
    topK: number,
  ): Promise<
    {
      id: number;
      content: string;
      score: number;
    }[]
  >;
}
