import { Injectable } from '@nestjs/common';
import { Language } from 'src/common/enums/language.enum';
import { GenerateRecipeDto } from 'src/recipe/dto/generate-recipe.dto';
import { IngredientDto } from 'src/recipe/dto/ingredient.dto';
import { PromptRequest } from './interfaces/prompt-request.interface';
import { CHEF_SYSTEM_PROMPT } from './prompts/system/chef.system';
import { RECIPE_TEMPLATE } from './prompts/templates/recipe.template';
import { replacePlaceholders } from './utils/prompt.util';
import { RECIPE_OUTPUT_INSTRUCTIONS } from './prompts/outputs/recipe.output';

@Injectable()
export class PromptBuilderService {
  private buildRecipePlaceholderValues(
    dto: GenerateRecipeDto,
  ): Record<string, string> {
    return {
      ingredients: this.formatIngredients(dto.ingredients),
      language: dto.language.toString(),
      servings: dto.servings.toString(),
      dietType: dto.dietType.toString(),
      spiceLevel: dto.spiceLevel.toString(),
    };
  }

  private formatIngredients(ingredients: IngredientDto[]): string {
    return ingredients
      .map(
        (ingredient) =>
          `${ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`,
      )
      .join(', ');
  }

  buildRecipePrompt(dto: GenerateRecipeDto): PromptRequest {
    const values = this.buildRecipePlaceholderValues(dto);

    const userPrompt = replacePlaceholders(RECIPE_TEMPLATE, values);

    return {     
      systemPrompt: CHEF_SYSTEM_PROMPT,
      userPrompt,
      outputInstructions: RECIPE_OUTPUT_INSTRUCTIONS,
    };
  }
}
