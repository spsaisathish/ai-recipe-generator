import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PromptBuilderService } from './prompt-builder.service';
import { AI_PROVIDER } from './constants/ai-provider.constants';
import type { AIProvider } from './interfaces/ai-provider.interface';
import { GenerateRecipeDto } from 'src/recipe/dto/generate-recipe.dto';
import { ResponseParserService } from './response-parser.service';
import { RecipeResponseDto } from 'src/recipe/dto/recipe-response.dto';
import { ResponseValidatorService } from './validator/response-validator.service';
@Injectable()
export class AiService {
  constructor(
    private readonly promptBuilder: PromptBuilderService,

    @Inject(AI_PROVIDER)
    private readonly provider: AIProvider,
    private readonly responseParser: ResponseParserService,
    private readonly responseValidator: ResponseValidatorService,
  ) {}

  async generateRecipe(dto: GenerateRecipeDto): Promise<RecipeResponseDto> {
    const prompt = this.promptBuilder.buildRecipePrompt(dto);

    const llmResponse = await this.provider.send(prompt);

    const parsedResponse =
      this.responseParser.parse<RecipeResponseDto>(llmResponse);

    const messages = await this.responseValidator.validate(
      RecipeResponseDto,
      parsedResponse,
    );

    if (messages.length > 0) {
      throw new BadRequestException(messages);
    }

    return parsedResponse;
  }
}
