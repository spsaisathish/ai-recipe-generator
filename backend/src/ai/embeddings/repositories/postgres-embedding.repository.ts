import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { EmbeddingRepository } from '../interfaces/embedding.repository.interface';

@Injectable()
export class PostgresEmbeddingRepository implements EmbeddingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(content: string, embedding: number[]): Promise<void> {
    const vector = `[${embedding.join(',')}]`;

    await this.prisma.$executeRaw`
      INSERT INTO recipe_embeddings (content, embedding)
      VALUES (${content}, ${vector}::vector)
    `;
  }

  async searchSimilar(
    queryEmbedding: number[],
    limit: number,
  ): Promise<
    {
      id: number;
      content: string;
      similarity: number;
    }[]
  > {
    const vector = `[${queryEmbedding.join(',')}]`;

    return this.prisma.$queryRaw<
      {
        id: number;
        content: string;
        similarity: number;
      }[]
    >`
  SELECT
    id,
    content,
    1 - (embedding <=> ${vector}::vector) AS similarity
  FROM recipe_embeddings
  WHERE embedding IS NOT NULL
    AND 1 - (embedding <=> ${vector}::vector) >= 0.60
  ORDER BY embedding <=> ${vector}::vector
  LIMIT ${limit}
`;
  }

  async searchKeyword(
    query: string,
    limit: number,
  ): Promise<
    {
      id: number;
      content: string;
      rank: number;
    }[]
  > {
    return this.prisma.$queryRaw<
      {
        id: number;
        content: string;
        rank: number;
      }[]
    >`
    SELECT
      id,
      content,
      ts_rank(
        to_tsvector('english', content),
        plainto_tsquery('english', ${query})
      ) AS rank
    FROM recipe_embeddings
    WHERE embedding IS NOT NULL
      AND to_tsvector('english', content)
          @@ plainto_tsquery('english', ${query})
    ORDER BY rank DESC
    LIMIT ${limit}
  `;
  }

  async searchHybrid(
    query: string,
    queryEmbedding: number[],
    limit: number,
  ): Promise<
    {
      id: number;
      content: string;
      score: number;
    }[]
  > {
    const vector = `[${queryEmbedding.join(',')}]`;

    return this.prisma.$queryRaw<
      {
        id: number;
        content: string;
        score: number;
      }[]
    >`
    WITH vector_results AS (
      SELECT
        id,
        content,
        ROW_NUMBER() OVER (
          ORDER BY embedding <=> ${vector}::vector
        ) AS vector_rank
      FROM recipe_embeddings
      WHERE embedding IS NOT NULL
    ),

    keyword_results AS (
      SELECT
        id,
        content,
        ROW_NUMBER() OVER (
          ORDER BY ts_rank(
            to_tsvector('english', content),
            plainto_tsquery('english', ${query})
          ) DESC
        ) AS keyword_rank
      FROM recipe_embeddings
      WHERE to_tsvector('english', content)
            @@ plainto_tsquery('english', ${query})
    ),

    combined AS (
      SELECT
        COALESCE(v.id, k.id) AS id,
        COALESCE(v.content, k.content) AS content,

        COALESCE(1.0 / (60 + v.vector_rank), 0) +
        COALESCE(1.0 / (60 + k.keyword_rank), 0) AS score

      FROM vector_results v
      FULL OUTER JOIN keyword_results k
        ON v.id = k.id
    )

    SELECT
      id,
      content,
      score
    FROM combined
    ORDER BY score DESC
    LIMIT ${limit}
  `;
  }
}
