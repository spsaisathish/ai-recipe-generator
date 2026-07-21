import { PromptRequest } from './prompt-request.interface';

export interface AIProvider {
  send(prompt: PromptRequest): Promise<string>;
}
