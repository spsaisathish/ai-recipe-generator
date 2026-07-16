import { IngredientDto } from './ingredient.dto';
import { Language } from '../../common/enums/language.enum';
import { DietType } from '../../common/enums/diet-type.enum';
import { SpiceLevel } from '../../common/enums/spice-level.enum';
import { ArrayMinSize, IsArray, IsEnum, IsInt, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class GenerateRecipeDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => IngredientDto)
    ingredients!: IngredientDto[];

    @IsEnum(Language)
    language!: Language;

    @Type(() => Number) // It transforms the string to number if UI Sends "5" then transforms to 5
    @IsInt()
    @Min(1)
    servings!: number;

    @IsEnum(DietType)
    dietType!: DietType;

    @IsEnum(SpiceLevel)
    spiceLevel!: SpiceLevel;
}