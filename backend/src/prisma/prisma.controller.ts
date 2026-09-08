import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('prisma')
export class PrismaController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('test')
  async testConnection() {
    const result = await this.prisma.recipe_embeddings.create({
      data: {
        content: 'Chicken biryani is a popular rice dish.',
      },
    });

    return result;
  }
}
