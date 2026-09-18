export interface EmbeddingRepository {
  save(content: string, embedding: number[]): Promise<void>;

  // Vector Search 
  searchSimilar(
    queryEmbedding: number[],
    limit: number,
  ): Promise<
    {
      id: number;
      content: string;
      similarity: number;
    }[]
  >;

   // Keyword Search 
  searchKeyword(
    query: string,
    limit: number,
  ): Promise<
    {
      id: number;
      content: string;
      rank: number;
    }[]
  >;

   // Hybrid Search 
  searchHybrid(
    query: string,
    queryEmbedding: number[],
    limit: number,
  ): Promise<
    {
      id: number;
      content: string;
      score: number;
    }[]
  >;
}
