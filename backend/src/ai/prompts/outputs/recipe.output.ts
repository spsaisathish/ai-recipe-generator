export const RECIPE_OUTPUT_INSTRUCTIONS = `
Return ONLY valid JSON.

Do not return markdown.

Do not use code fences.

Do not include explanations.

Do not include comments.

Use camelCase for every JSON property.

The response MUST strictly follow this schema:

{
  "recipeName": "...",
  "dietType": "...",
  "servings": 0,
  "preparationTime": "...",
  "cookingTime": "...",
  "spiceLevel": "...",
  "ingredients": [
    {
      "name": "...",
      "quantity": 0,
      "unit": "..."
    }
  ],
  "instructions": [
    "..."
  ]
}
`;
