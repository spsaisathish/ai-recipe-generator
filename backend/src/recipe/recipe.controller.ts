import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenerateRecipeDto } from './dto/generate-recipe.dto';
import { RecipeService } from './recipe.service';
import { RecipeResponseDto } from './dto/recipe-response.dto';
import { EmbeddingService } from 'src/ai/embeddings/embedding.service';
import { cosineSimilarity } from 'src/ai/utils/prompt.util';

@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly embeddingService: EmbeddingService,
  ) {}

  @Post('generate')
  async generateRecipe(
    @Body() dto: GenerateRecipeDto,
  ): Promise<RecipeResponseDto> {
    return this.recipeService.generateRecipe(dto);
  }

  @Get('embedding-test')
  async embeddingTest() {
    const texts = [
      'How long should I cook chicken biryani?',
      'Chicken biryani takes about 30 minutes to cook.',
      'How do I make chocolate cake?',
    ];

    const vectors = await Promise.all(
      texts.map((text) => this.embeddingService.embed(text)),
    );

    return {
      chickenQuestionVsChickenAnswer: cosineSimilarity(vectors[0], vectors[1]),

      chickenQuestionVsChocolateCake: cosineSimilarity(vectors[0], vectors[2]),
    };
  }
}
