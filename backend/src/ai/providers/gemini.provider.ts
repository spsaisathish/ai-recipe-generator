import { Injectable } from '@nestjs/common';
import { AIProvider } from '../interfaces/ai-provider.interface';
import { ConfigService } from '@nestjs/config';
import { PromptRequest } from '../interfaces/prompt-request.interface';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiProvider implements AIProvider {
  private readonly client: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.getOrThrow<string>('GEMINI_API_KEY');

    this.client = new GoogleGenAI({
      apiKey,
    });
  }

  async send(prompt: PromptRequest): Promise<string> {
    const response = await this.client.models.generateContent({
      model: this.configService.getOrThrow<string>('GEMINI_MODEL'),
      contents: this.buildPrompt(prompt),
    });

    if (!response.text) {
      throw new Error('Gemini returned an empty response.');
    }

    return response.text;
  }

  private buildPrompt(prompt: PromptRequest): string {
    return [
      prompt.systemPrompt,
      prompt.userPrompt,
      prompt.outputInstructions,
    ].join('\n\n');
  }
}
