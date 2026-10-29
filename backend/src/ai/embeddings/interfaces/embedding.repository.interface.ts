export interface EmbeddingRepository {
  save(
  documentId: number,
  chunkIndex: number,
  content: string,
  embedding: number[],
): Promise<void>;

  // Vector Search 
 searchSimilar(
  queryEmbedding: number[],
  limit: number,
): Promise<
  {
    id: number;
    documentId: number;
    chunkIndex: number;
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
    documentId: number;
    chunkIndex: number;
    content: string;
    score: number;
  }[]
>;
}
