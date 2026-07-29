import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DietType } from 'src/common/enums/diet-type.enum';
import { SpiceLevel } from 'src/common/enums/spice-level.enum';
import { IngredientDto } from './ingredient.dto';
import { Type } from 'class-transformer';

export class RecipeResponseDto {
  @IsString()
  recipeName!: string;

  @IsEnum(DietType)
  dietType!: DietType;

  @IsNumber()
  servings!: number;

  @IsString()
  preparationTime!: string;

  @IsString()
  cookingTime!: string;

  @IsEnum(SpiceLevel)
  spiceLevel!: SpiceLevel;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  @ArrayMinSize(1)
  ingredients!: IngredientDto[];

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  instructions!: string[];
}
