export enum ErrorType {
  VALIDATION = 'VALIDATION',
  BUSINESS = 'BUSINESS',
  NOT_FOUND = 'NOT_FOUND',
  DUPLICATE = 'DUPLICATE'
}

export class ApplicationError extends Error {
  constructor(
    message: string,
    public readonly type: ErrorType,
    public readonly originalError?: Error
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}
