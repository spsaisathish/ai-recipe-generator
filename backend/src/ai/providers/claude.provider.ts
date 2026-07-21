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
    // Claude SDK call here
  }
}
