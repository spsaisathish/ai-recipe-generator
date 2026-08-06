import { Injectable } from '@nestjs/common';
import { GenerateRecipeDto } from './dto/generate-recipe.dto';
import { AiService } from 'src/ai/ai.service';
import { RecipeResponseDto } from './dto/recipe-response.dto';
import { AIRequest } from 'src/ai/interfaces/ai-request.interface';
import { AIFeature } from 'src/ai/enums/ai-feature.enum';

@Injectable()
export class RecipeService {
  constructor(private readonly aiService: AiService) {}

  private createAIRequest(
    dto: GenerateRecipeDto,
  ): AIRequest<GenerateRecipeDto> {
    return {
      feature: AIFeature.RECIPE,
      payload: dto,
    };
  }

  async generateRecipe(dto: GenerateRecipeDto): Promise<RecipeResponseDto> {
    return this.aiService.generate(
      this.createAIRequest(dto),
      RecipeResponseDto,
    );
  }
}
