import { Injectable } from '@nestjs/common';
import { RecipeGenerateResponse } from 'src/utils/interfaces';
import { GenerateRecipeDto } from './dto/generate-recipe.dto';

@Injectable()
export class RecipeService {

    generateRecipe(dto: GenerateRecipeDto): RecipeGenerateResponse {
        return {
            success: true,
            message: 'Recipe request validated successfully',
            data: dto,
        };
    }
}
