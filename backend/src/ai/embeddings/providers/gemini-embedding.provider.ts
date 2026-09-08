import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import type { EmbeddingProvider } from '../interfaces/embedding-provider.interface';

@Injectable()
export class GeminiEmbeddingProvider implements EmbeddingProvider {
  private readonly ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async embed1(text: string): Promise<number[]> {
    const response = await this.ai.models.embedContent({
      model: 'gemini-embedding-2',
      contents: text,
    });

    return response.embeddings?.[0]?.values ?? [];
  }

  async embed(text: string): Promise<number[]> {
    const response = await this.ai.models.embedContent({
      model: 'gemini-embedding-2',
      contents: text,
    });

    const values = response.embeddings?.[0]?.values ?? [];

    console.log('Embedding dimensions:', values.length);

    return values;
  }
}
