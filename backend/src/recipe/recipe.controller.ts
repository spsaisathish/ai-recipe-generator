import { Body, Controller, Post } from '@nestjs/common';
import { GenerateRecipeDto } from './dto/generate-recipe.dto';
import { RecipeService } from './recipe.service';
import { RecipeResponseDto } from './dto/recipe-response.dto';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('generate')
  async generateRecipe(
    @Body() dto: GenerateRecipeDto,
  ): Promise<RecipeResponseDto> {
    return this.recipeService.generateRecipe(dto);
  }
}
