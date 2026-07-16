import { GenerateRecipeDto } from "src/recipe/dto/generate-recipe.dto";

export interface HealthStatus {
    status: string;
    message: string;
    version: string;
}

export interface RecipeGenerateResponse {
    success: boolean;
    message: string;
    data: GenerateRecipeDto;
}

