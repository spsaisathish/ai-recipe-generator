import { Injectable } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ResponseValidatorService {
  async validate<T extends object>(
    dtoClass: ClassConstructor<T>,
    object: unknown,
  ): Promise<string[]> {
    const dto = plainToInstance(dtoClass, object);

    const errors = await validate(dto);

    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
