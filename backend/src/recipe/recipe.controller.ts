import { Body, Controller, Post } from '@nestjs/common';
import { GenerateRecipeDto } from './dto/generate-recipe.dto';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post('generate')
  generateRecipe(@Body() dto: GenerateRecipeDto) {
    return this.recipeService.generateRecipe(dto);
  }
}
