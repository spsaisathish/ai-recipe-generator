import { Injectable } from '@nestjs/common';
import { AIProvider } from '../interfaces/ai-provider.interface';
import { PromptRequest } from '../interfaces/prompt-request.interface';
import Anthropic from '@anthropic-ai/sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClaudeProvider implements AIProvider {
  private readonly anthropic: Anthropic;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.getOrThrow<string>('CLAUDE_API_KEY');

    this.anthropic = new Anthropic({
      apiKey,
    });
  }

  async send(prompt: PromptRequest): Promise<string> {
    const response = await this.anthropic.messages.create({
      model: this.configService.getOrThrow<string>('CLAUDE_MODEL'),

      max_tokens: Number(this.configService.getOrThrow('CLAUDE_MAX_TOKENS')),

      system: [prompt.systemPrompt, prompt.outputInstructions].join('\n\n'),

      messages: [
        {
          role: 'user',
          content: prompt.userPrompt,
        },
      ],
    });

    const firstContent = response.content[0];

    if (firstContent?.type !== 'text') {
      throw new Error('Claude returned an unexpected response.');
    }

    return firstContent.text;
  }
}
