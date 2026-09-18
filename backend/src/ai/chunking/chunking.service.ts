import { Injectable } from '@nestjs/common';
import type { Chunk, Chunker } from './interfaces/chunker.interface';

@Injectable()
export class ChunkingService implements Chunker {
  chunk(text: string, chunkSize: number, overlap: number): Chunk[] {
    if (chunkSize <= 0) {
      throw new Error('Chunk size must be greater than 0');
    }

    if (overlap < 0 || overlap >= chunkSize) {
      throw new Error('Overlap must be >= 0 and smaller than chunk size');
    }

    const words = text.trim().split(/\s+/);

    const chunks: Chunk[] = [];

    const step = chunkSize - overlap;

    for (let start = 0; start < words.length; start += step) {
      const chunkWords = words.slice(start, start + chunkSize);

      if (chunkWords.length === 0) {
        break;
      }

      chunks.push({
        index: chunks.length,
        content: chunkWords.join(' '),
      });
    }

    return chunks;
  }
}
