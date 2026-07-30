export abstract class AIException extends Error {
  abstract readonly statusCode: number;

  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);

    this.name = this.constructor.name;
  }
}
