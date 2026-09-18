export interface Chunk {
  content: string;
  index: number;
}

export interface Chunker {
  chunk(text: string, chunkSize: number, overlap: number): Chunk[];
}
