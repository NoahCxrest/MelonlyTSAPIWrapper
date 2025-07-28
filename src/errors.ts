/**
 * Base error class for all Melonly API errors
 */
export class MelonlyError extends Error {
  public override readonly name: string = "MelonlyError";
  public readonly timestamp = new Date().toISOString();

  constructor(
    public readonly status: number,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    Object.setPrototypeOf(this, MelonlyError.prototype);
  }

  /**
   * Convert error to JSON for logging/debugging
   */
  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

/**
 * Network-related errors (timeouts, connection issues, etc.)
 */
export class NetworkError extends Error {
  public override readonly name = "NetworkError";
  public readonly timestamp = new Date().toISOString();

  constructor(
    message: string,
    public readonly cause?: Error,
  ) {
    super(message);
    Object.setPrototypeOf(this, NetworkError.prototype);
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause?.message,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

/**
 * Rate limiting errors with retry information
 */
export class RateLimitError extends MelonlyError {
  public override readonly name: string = "RateLimitError";

  constructor(
    message: string,
    public readonly retryAfterSeconds?: number,
    public readonly resetTimestamp?: number,
  ) {
    super(429, message);
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }

  /**
   * Get the time when the rate limit resets
   */
  get resetDate(): Date | undefined {
    return this.resetTimestamp
      ? new Date(this.resetTimestamp * 1000)
      : undefined;
  }

  /**
   * Get milliseconds until rate limit reset
   */
  get millisecondsUntilReset(): number | undefined {
    if (!this.resetTimestamp) return undefined;
    return Math.max(0, this.resetTimestamp * 1000 - Date.now());
  }

  public override toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      retryAfterSeconds: this.retryAfterSeconds,
      resetTimestamp: this.resetTimestamp,
      resetDate: this.resetDate?.toISOString(),
      millisecondsUntilReset: this.millisecondsUntilReset,
    };
  }
}

/**
 * Validation errors for invalid input parameters
 */
export class ValidationError extends Error {
  public override readonly name = "ValidationError";
  public readonly timestamp = new Date().toISOString();

  constructor(
    message: string,
    public readonly field?: string,
    public readonly value?: unknown,
  ) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      field: this.field,
      value: this.value,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

/**
 * Type guard to check if an error is a Melonly API error
 */
export function isMelonlyError(error: unknown): error is MelonlyError {
  return error instanceof MelonlyError;
}

/**
 * Type guard to check if an error is a network error
 */
export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
}

/**
 * Type guard to check if an error is a rate limit error
 */
export function isRateLimitError(error: unknown): error is RateLimitError {
  return error instanceof RateLimitError;
}

/**
 * Type guard to check if an error is a validation error
 */
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}
