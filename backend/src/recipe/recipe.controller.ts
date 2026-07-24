import { Body, Controller, Post } from '@nestjs/common';
import { GenerateRecipeDto } from './dto/generate-recipe.dto';
import { RecipeService } from './recipe.service';
import { RecipeResponse } from './interfaces/recipe-response.interface';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('generate')
  async generateRecipe(
    @Body() dto: GenerateRecipeDto,
  ): Promise<RecipeResponse> {
    return this.recipeService.generateRecipe(dto);
  }
}
