import { Injectable } from '@nestjs/common';
import { AIProvider } from '../interfaces/ai-provider.interface';
import { ConfigService } from '@nestjs/config';
import { PromptRequest } from '../interfaces/prompt-request.interface';
import { GoogleGenAI } from '@google/genai';
import { AIProviderException } from '../exceptions/ai-provider.exception';

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
    try {
      const response = await this.client.models.generateContent({
        model: this.configService.getOrThrow<string>('GEMINI_MODEL'),
        contents: this.buildPrompt(prompt),
      });

      if (!response.text) {
        throw new AIProviderException('Gemini returned an empty response.');
      }

      return response.text;
    } catch (error: unknown) {
      if (error instanceof AIProviderException) {
        throw error;
      }

      throw new AIProviderException('Failed to communicate with Gemini', error);
    }
  }

  private buildPrompt(prompt: PromptRequest): string {
    return [
      prompt.systemPrompt,
      prompt.userPrompt,
      prompt.outputInstructions,
    ].join('\n\n');
  }
}
