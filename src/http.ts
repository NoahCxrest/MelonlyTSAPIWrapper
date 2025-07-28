import { MelonlyError, NetworkError, RateLimitError } from "./errors";

/**
 * Configuration options for the HTTP client
 */
export interface HttpClientOptions {
  baseUrl: string;
  token: string;
  timeout?: number;
  maxRetries?: number;
  debug?: boolean;
  headers?: Record<string, string> | undefined;
}

/**
 * HTTP request options
 */
interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

/**
 * Internal HTTP client with retry logic, timeout handling, and proper error handling
 */
export class HttpClient {
  private readonly baseUrl: string;
  private readonly token: string;
  private readonly timeout: number;
  private readonly maxRetries: number;
  private readonly debug: boolean;
  private readonly defaultHeaders: Record<string, string>;

  constructor(options: HttpClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, ""); // Remove trailing slash
    this.token = options.token;
    this.timeout = options.timeout ?? 30000;
    this.maxRetries = options.maxRetries ?? 3;
    this.debug = options.debug ?? false;
    this.defaultHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "@melonly/api-client/1.0.0",
      ...options.headers,
    };
  }

  /**
   * Perform a GET request
   */
  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    return this.request<T>({ method: "GET", url });
  }

  /**
   * Perform a POST request
   */
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>({ method: "POST", url, body: data });
  }

  /**
   * Perform a PUT request
   */
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>({ method: "PUT", url, body: data });
  }

  /**
   * Perform a DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>({ method: "DELETE", url });
  }

  /**
   * Perform a PATCH request
   */
  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>({ method: "PATCH", url, body: data });
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, unknown>): string {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    let url = `${this.baseUrl}${cleanEndpoint}`;

    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return url;
  }

  /**
   * Perform HTTP request with retry logic
   */
  private async request<T>(options: RequestOptions): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        if (this.debug) {
          console.log(
            `[Melonly API] ${options.method} ${options.url} (attempt ${attempt})`,
          );
        }

        const response = await this.performRequest(options);
        return response as T;
      } catch (error) {
        lastError = error as Error;

        // Don't retry on client errors (4xx), only on server errors (5xx) and network issues
        if (error instanceof MelonlyError && error.status < 500) {
          throw error;
        }

        // Don't retry on rate limits immediately - throw with retry info
        if (error instanceof RateLimitError) {
          throw error;
        }

        if (attempt === this.maxRetries) {
          break;
        }

        // Exponential backoff with jitter
        const delay =
          Math.min(1000 * Math.pow(2, attempt - 1), 10000) +
          Math.random() * 1000;

        if (this.debug) {
          console.log(`[Melonly API] Retrying after ${Math.round(delay)}ms...`);
        }

        await this.sleep(delay);
      }
    }

    throw (
      lastError ?? new NetworkError("Request failed after all retry attempts")
    );
  }

  /**
   * Perform the actual HTTP request
   */
  private async performRequest<T>(options: RequestOptions): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const headers = {
        ...this.defaultHeaders,
        Authorization: `Bearer ${this.token}`,
        ...options.headers,
      };

      const fetchOptions: RequestInit = {
        method: options.method,
        headers,
        signal: controller.signal,
      };

      if (options.body !== undefined) {
        fetchOptions.body = JSON.stringify(options.body);
      }

      const response = await fetch(options.url, fetchOptions);
      clearTimeout(timeoutId);

      return await this.handleResponse<T>(response);
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        throw new NetworkError(`Request timeout after ${this.timeout}ms`);
      }

      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new NetworkError(
          "Network request failed - please check your connection",
        );
      }

      throw error;
    }
  }

  /**
   * Handle HTTP response and parse JSON
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type") ?? "";

    let responseBody: unknown;
    try {
      if (contentType.includes("application/json")) {
        responseBody = await response.json();
      } else {
        responseBody = await response.text();
      }
    } catch (parseError) {
      throw new MelonlyError(response.status, "Failed to parse response body", {
        originalError: parseError,
      });
    }

    if (!response.ok) {
      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get("retry-after");
        const resetTime = response.headers.get("x-ratelimit-reset");
        throw new RateLimitError(
          "Rate limit exceeded",
          retryAfter ? parseInt(retryAfter, 10) : undefined,
          resetTime ? parseInt(resetTime, 10) : undefined,
        );
      }

      // Extract error message from response body if available
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      if (
        responseBody &&
        typeof responseBody === "object" &&
        "error" in responseBody
      ) {
        errorMessage = String(responseBody.error);
      }

      throw new MelonlyError(response.status, errorMessage, responseBody);
    }

    return responseBody as T;
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
