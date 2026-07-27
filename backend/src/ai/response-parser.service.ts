import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseParserService {
  parse<T>(response: string): T {
    // Step 1

    const normalizedResponse = this.normalizeResponse(response);

    // Step 2

    try {
      // Step 3

      return JSON.parse(normalizedResponse) as T;
    } catch (error) {
      throw new Error(
        `Failed to parse AI response: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  }

  private normalizeResponse(response: string): string {
    const responseWithoutMarkdown = this.removeMarkdown(response);

    const extractedJson = this.extractJson(responseWithoutMarkdown);

    return extractedJson.trim();
  }

  private removeMarkdown(response: string): string {
    return response.replaceAll('```json', '').replaceAll('```', '').trim();
  }

  private extractJson(response: string): string {
    const startIndex = response.indexOf('{');
    const endIndex = response.lastIndexOf('}');

    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
      throw new Error('No JSON object found in AI response');
    }

    return response.substring(startIndex, endIndex + 1);
  }
}
