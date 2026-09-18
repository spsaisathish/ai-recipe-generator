import { Controller, Get, Post, Query } from '@nestjs/common';
import { RecipeEmbeddingService } from './recipe-embedding.service';
import { DocumentIngestionService } from '../ingestion/document-ingestion.service';

@Controller('embedding-test')
export class EmbeddingTestController {
  constructor(
    private readonly recipeEmbeddingService: RecipeEmbeddingService,
    private readonly documentIngestionService: DocumentIngestionService,
  ) {}

  @Get()
  async testEmbeddingSave() {
    await this.recipeEmbeddingService.create(
      'Chicken biryani is a popular Indian rice dish made with aromatic spices.',
    );

    return {
      success: true,
      message: 'Embedding generated and saved successfully',
    };
  }

  @Get('search')
  async search(@Query('q') query: string) {
    return this.recipeEmbeddingService.search(query);
  }

  @Post('seed')
  async seedEmbeddings() {
    const recipes = [
      'Chicken biryani is a popular Indian rice dish made with aromatic spices.',
      'Chocolate cake is a rich dessert made with cocoa, flour, sugar, eggs, and butter.',
      'Paneer butter masala is an Indian curry made with paneer, tomato, butter, cream, and spices.',
      'Vegetable fried rice is a rice dish prepared with mixed vegetables, soy sauce, garlic, and spices.',
      'Chicken noodles are prepared with noodles, chicken, vegetables, soy sauce, and seasonings.',
    ];

    for (const recipe of recipes) {
      await this.recipeEmbeddingService.create(recipe);
    }

    return {
      success: true,
      message: 'Recipe embeddings seeded successfully',
      count: recipes.length,
    };
  }

  @Get('keyword-search')
  async keywordSearch(@Query('q') query: string) {
    return this.recipeEmbeddingService.searchKeyword(query);
  }

  @Get('hybrid-search')
  async hybridSearch(@Query('q') query: string) {
    return this.recipeEmbeddingService.searchHybrid(query);
  }

  @Post('ingest')
  async ingestDocument() {
    const document = `
Chicken Biryani Recipe.

Ingredients:
Chicken, basmati rice, onion, tomato, ginger, garlic, yogurt,
mint leaves, coriander leaves, biryani masala, salt and oil.

Preparation:
Marinate the chicken with yogurt, ginger garlic paste,
biryani masala and salt for at least 30 minutes.

Cooking:
Cook the marinated chicken until it is almost done.
Add soaked basmati rice and cook until the rice is tender.
The biryani should be cooked for approximately 30 minutes.

Serving:
Serve hot with onion raita and boiled eggs.
`;

    await this.documentIngestionService.ingest(document, 30, 5);

    return {
      success: true,
      message: 'Document chunked and embedded successfully',
    };
  }
}
