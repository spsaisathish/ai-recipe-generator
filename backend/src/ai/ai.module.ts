import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { PromptBuilderService } from './prompt-builder.service';

@Module({
  providers: [AiService, PromptBuilderService]
})
export class AiModule {}
