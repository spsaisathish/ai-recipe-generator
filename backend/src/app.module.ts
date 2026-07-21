import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { RecipeModule } from './recipe/recipe.module';
import { AiModule } from './ai/ai.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HealthModule,
    RecipeModule,
    AiModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
