import { Injectable } from '@nestjs/common';
import { AIProvider } from '../interfaces/ai-provider.interface';
import { ConfigService } from '@nestjs/config';
import { PromptRequest } from '../interfaces/prompt-request.interface';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiProvider implements AIProvider {
  constructor(
    private readonly configService: ConfigService,
    private readonly client: GoogleGenAI,
  ) {
    const apiKey = this.configService.getOrThrow<string>('GEMINI_API_KEY');
    this.client = new GoogleGenAI({
      apiKey,
    });
  }

  buildPrompt(prompt: PromptRequest) {
    return [
      prompt.systemPrompt,

      prompt.userPrompt,

      prompt.outputInstructions,
    ].join('\n\n');
  }

  async send(prompt: PromptRequest): Promise<string> {
    const response = await this.client.models.generateContent({
      model: this.configService.getOrThrow<string>('GEMINI_MODEL'),
      contents: this.buildPrompt(prompt),
    });

    if (!response.text) {
      throw new Error('Gemini returned an empty response');
    }

    return response.text;
  }
}
