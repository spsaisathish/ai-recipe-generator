import { Injectable } from '@nestjs/common';
import { GenerateRecipeDto } from './dto/generate-recipe.dto';
import { AiService } from 'src/ai/ai.service';
import { RecipeResponse } from './interfaces/recipe-response.interface';

@Injectable()
export class RecipeService {
  constructor(private readonly aiService: AiService) {}
  async generateRecipe(dto: GenerateRecipeDto): Promise<RecipeResponse> {
    return await this.aiService.generateRecipe(dto);
  }
}
