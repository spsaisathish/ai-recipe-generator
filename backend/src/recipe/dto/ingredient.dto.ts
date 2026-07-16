import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

export class IngredientDto {

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name!: string;

    @Type(() => Number) // It transforms the string to number if UI Sends "5" then transforms to 5
    @IsNumber()
    @Min(1)
    quantity!: number;

    @IsNotEmpty()
    unit!: string;
}