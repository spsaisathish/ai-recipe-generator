import { Inject, Injectable } from '@nestjs/common';
import { PromptBuilderService } from './prompt-builder.service';
import { AI_PROVIDER } from './constants/ai-provider.constants';
import type { AIProvider } from './interfaces/ai-provider.interface';
import { GenerateRecipeDto } from 'src/recipe/dto/generate-recipe.dto';
import { RecipeResponse } from 'src/recipe/interfaces/recipe-response.interface';
@Injectable()
export class AiService {
  constructor(
    private readonly promptBuilder: PromptBuilderService,

    @Inject(AI_PROVIDER)
    private readonly provider: AIProvider,
  ) {}

  async generateRecipe(dto: GenerateRecipeDto): Promise<RecipeResponse> {
    const prompt = this.promptBuilder.buildRecipePrompt(dto);

    const recipeJson = await this.provider.send(prompt);

    return JSON.parse(recipeJson) as RecipeResponse;
  }
}
