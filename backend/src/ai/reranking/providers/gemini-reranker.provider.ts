import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import type { Reranker } from '../interfaces/reranker.interface';

@Injectable()
export class GeminiRerankerProvider implements Reranker {
  private readonly ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async rerank(
    query: string,
    documents: {
      id: number;
      content: string;
    }[],
    topK: number,
  ) {
    const documentText = documents
      .map((doc) => `ID: ${doc.id}\nCONTENT: ${doc.content}`)
      .join('\n\n');

    const prompt = `
You are a document relevance reranker.

User query:
${query}

Candidate documents:
${documentText}

For each document, assign a relevance score from 0 to 1.

Return ONLY valid JSON in this format:

[
  {
    "id": 1,
    "score": 0.95
  }
]

Do not include explanations.
`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const text = response.text ?? '';

    const jsonText = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const scores: {
      id: number;
      score: number;
    }[] = JSON.parse(jsonText);

    const scoreMap = new Map(scores.map((item) => [item.id, item.score]));

    return documents
      .map((doc) => ({
        ...doc,
        score: scoreMap.get(doc.id) ?? 0,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }
}
