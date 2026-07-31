import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AIExceptionFilter } from './common/filters/ai-exception.filter';

async function bootstrap() {

   const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(
      // Validation Pipe - Validate every request before it reaches the controller (Global Validation)
      new ValidationPipe({
         transform: true,  // This works together with the @Type(() => Number) decorator
         whitelist: true, //  DTO doesn't contain the request params , then it is skipped 
         forbidNonWhitelisted: true, // DTO doesn't contain the request params , then error gets
      })
   );

   app.useGlobalFilters(
    new AIExceptionFilter(),
   );

   await app.listen(3000);

}
bootstrap();
