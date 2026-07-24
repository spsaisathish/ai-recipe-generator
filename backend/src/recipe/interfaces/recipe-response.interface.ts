export interface NutritionInfo {
  calories: string;
  protein: string;
  carbohydrates: string;
  fat: string;
}

export interface RecipeIngredient {
  name: string;
  quantity: string;
}

export interface RecipeResponse {
  recipeName: string;

  description: string;

  preparationTime: string;

  cookingTime: string;

  servings: number;

  ingredients: RecipeIngredient[];

  instructions: string[];

  nutrition: NutritionInfo;
}
