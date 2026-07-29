import { Injectable } from '@nestjs/common';
import { GenerateRecipeDto } from './dto/generate-recipe.dto';
import { AiService } from 'src/ai/ai.service';
import { RecipeResponseDto } from './dto/recipe-response.dto';

@Injectable()
export class RecipeService {
  constructor(private readonly aiService: AiService) {}
  async generateRecipe(dto: GenerateRecipeDto): Promise<RecipeResponseDto> {
    return await this.aiService.generateRecipe(dto);
  }
}
