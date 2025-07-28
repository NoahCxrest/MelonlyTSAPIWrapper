import { ValidationError } from "../errors";

/**
 * Validate API token format and presence
 */
export function validateToken(token: string): void {
  if (!token) {
    throw new ValidationError("API token is required", "token", token);
  }

  if (typeof token !== "string") {
    throw new ValidationError("API token must be a string", "token", token);
  }

  if (token.trim().length === 0) {
    throw new ValidationError("API token cannot be empty", "token", token);
  }

  // Basic format validation - adjust based on actual token format requirements
  if (token.length < 10) {
    throw new ValidationError(
      "API token appears to be invalid (too short)",
      "token",
      token,
    );
  }
}

/**
 * Validate ID parameters (non-empty strings)
 */
export function validateId(id: string, fieldName: string): void {
  if (!id) {
    throw new ValidationError(`${fieldName} is required`, fieldName, id);
  }

  if (typeof id !== "string") {
    throw new ValidationError(`${fieldName} must be a string`, fieldName, id);
  }

  if (id.trim().length === 0) {
    throw new ValidationError(`${fieldName} cannot be empty`, fieldName, id);
  }

  // Check for potentially problematic characters
  if (id.includes("/") || id.includes("?") || id.includes("#")) {
    throw new ValidationError(
      `${fieldName} contains invalid characters`,
      fieldName,
      id,
    );
  }
}

/**
 * Validate pagination parameters
 */
export function validatePaginationParams(params: {
  page?: number;
  limit?: number;
}): void {
  if (params.page !== undefined) {
    if (!Number.isInteger(params.page) || params.page < 1) {
      throw new ValidationError(
        "Page must be a positive integer starting from 1",
        "page",
        params.page,
      );
    }

    if (params.page > 10000) {
      throw new ValidationError(
        "Page number is too large (maximum: 10000)",
        "page",
        params.page,
      );
    }
  }

  if (params.limit !== undefined) {
    if (!Number.isInteger(params.limit) || params.limit < 1) {
      throw new ValidationError(
        "Limit must be a positive integer",
        "limit",
        params.limit,
      );
    }

    if (params.limit > 100) {
      throw new ValidationError(
        "Limit cannot exceed 100 items per page",
        "limit",
        params.limit,
      );
    }
  }
}

/**
 * Validate URL format
 */
export function validateUrl(url: string, fieldName: string): void {
  if (!url) {
    throw new ValidationError(`${fieldName} is required`, fieldName, url);
  }

  if (typeof url !== "string") {
    throw new ValidationError(`${fieldName} must be a string`, fieldName, url);
  }

  try {
    new URL(url);
  } catch {
    throw new ValidationError(
      `${fieldName} must be a valid URL`,
      fieldName,
      url,
    );
  }

  if (!url.startsWith("https://")) {
    throw new ValidationError(`${fieldName} must use HTTPS`, fieldName, url);
  }
}

/**
 * Validate timeout value
 */
export function validateTimeout(timeout: number): void {
  if (!Number.isInteger(timeout) || timeout < 1000) {
    throw new ValidationError(
      "Timeout must be an integer of at least 1000ms",
      "timeout",
      timeout,
    );
  }

  if (timeout > 300000) {
    throw new ValidationError(
      "Timeout cannot exceed 300000ms (5 minutes)",
      "timeout",
      timeout,
    );
  }
}

/**
 * Validate retry count
 */
export function validateRetryCount(retries: number): void {
  if (!Number.isInteger(retries) || retries < 0) {
    throw new ValidationError(
      "Retry count must be a non-negative integer",
      "maxRetries",
      retries,
    );
  }

  if (retries > 10) {
    throw new ValidationError(
      "Retry count cannot exceed 10",
      "maxRetries",
      retries,
    );
  }
}
