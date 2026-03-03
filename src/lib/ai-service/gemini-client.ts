/**
 * Load-Balanced Gemini Client
 * Wraps Google Generative AI SDK with intelligent retry logic and key rotation
 */

/// <reference types="node" />

// Use dynamic import for better module resolution
import type { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiKeyManager } from "./ai-load-balancer";

interface RetryOptions {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
}

interface TokenCountResult {
  totalTokens: number;
  success: boolean;
  error?: string;
}

interface GenerateContentWithTokensResult {
  content: string;
  tokensUsed: {
    promptTokens: number;
    candidateTokens: number;
    totalTokens: number;
  };
  success: boolean;
  error?: string;
}

class LoadBalancedGeminiClient {
  private readonly defaultRetryOptions: RetryOptions = {
    maxRetries: 5,
    baseDelay: 1000,
    maxDelay: 10000,
  };

  /**
   * Dynamically import Google Generative AI to avoid module resolution issues
   */
  private async getGoogleGenerativeAI(): Promise<typeof GoogleGenerativeAI> {
    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      return GoogleGenerativeAI;
    } catch (error) {
      throw new Error("Google Generative AI SDK not available");
    }
  }

  /**
   * Count tokens for a given prompt with retry logic
   */
  async countTokens(
    prompt: string,
    modelName: string = "gemini-2.5-flash-lite-preview-09-2025",
    retryOptions: Partial<RetryOptions> = {},
  ): Promise<TokenCountResult> {
    const options = { ...this.defaultRetryOptions, ...retryOptions };
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
      const apiKey = geminiKeyManager.getNextKey();
      if (!apiKey) {
        return {
          totalTokens: 0,
          success: false,
          error:
            "No available API keys. All keys are rate limited or inactive.",
        };
      }

      try {
        const GoogleGenerativeAI = await this.getGoogleGenerativeAI();
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelName });

        const result = await model.countTokens(prompt);

        // Mark success for this key
        geminiKeyManager.markKeySuccess(apiKey);

        return {
          totalTokens: result.totalTokens,
          success: true,
        };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        lastError = error;
        const isRateLimit = this.isRateLimitError(error);

        // Mark error for this key
        geminiKeyManager.markKeyError(apiKey, isRateLimit);

        // If this is the last attempt, return error
        if (attempt === options.maxRetries) {
          break;
        }

        // Calculate delay for exponential backoff
        const delay = Math.min(
          options.baseDelay * Math.pow(2, attempt),
          options.maxDelay,
        );
        await this.sleep(delay);
      }
    }

    return {
      totalTokens: 0,
      success: false,
      error:
        lastError?.message || "Failed to count tokens after maximum retries",
    };
  }

  /**
   * Generate content with accurate token usage tracking
   */
  async generateContentWithTokens(
    prompt: string,
    modelName: string = "gemini-2.5-flash-lite-preview-09-2025",
    retryOptions: Partial<RetryOptions> = {},
  ): Promise<GenerateContentWithTokensResult> {
    const options = { ...this.defaultRetryOptions, ...retryOptions };
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
      const apiKey = geminiKeyManager.getNextKey();

      if (!apiKey) {
        return {
          content: "",
          tokensUsed: { promptTokens: 0, candidateTokens: 0, totalTokens: 0 },
          success: false,
          error:
            "No available API keys. All keys are rate limited or inactive.",
        };
      }

      try {
        const GoogleGenerativeAI = await this.getGoogleGenerativeAI();
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelName });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract usage metadata if available
        const usageMetadata = response.usageMetadata || {
          promptTokenCount: 0,
          candidatesTokenCount: 0,
          totalTokenCount: 0,
        };

        // Mark success for this key
        geminiKeyManager.markKeySuccess(apiKey);
        return {
          content: text.trim(),
          tokensUsed: {
            promptTokens: usageMetadata.promptTokenCount || 0,
            candidateTokens: usageMetadata.candidatesTokenCount || 0,
            totalTokens: usageMetadata.totalTokenCount || 0,
          },
          success: true,
        };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        lastError = error;
        const isRateLimit = this.isRateLimitError(error);

        // Mark error for this key
        geminiKeyManager.markKeyError(apiKey, isRateLimit);

        // If this is the last attempt, return error
        if (attempt === options.maxRetries) {
          break;
        }

        // Calculate delay for exponential backoff
        const delay = Math.min(
          options.baseDelay * Math.pow(2, attempt),
          options.maxDelay,
        );

        await this.sleep(delay);
      }
    }

    return {
      content: "",
      tokensUsed: { promptTokens: 0, candidateTokens: 0, totalTokens: 0 },
      success: false,
      error:
        lastError?.message ||
        "Failed to generate content after maximum retries",
    };
  }

  /**
   * Generate content using load-balanced API keys with retry logic
   */
  async generateContent(
    prompt: string,
    modelName: string = "gemini-2.5-flash",
    retryOptions: Partial<RetryOptions> = {},
  ): Promise<{ success: boolean; message: string | string }> {
    const options = { ...this.defaultRetryOptions, ...retryOptions };
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
      const apiKey = geminiKeyManager.getNextKey();

      if (!apiKey) {
        return {
          success: false,
          message:
            "No available API keys. All keys are rate limited or inactive.",
        };
      }

      try {
        const GoogleGenerativeAI = await this.getGoogleGenerativeAI();
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelName });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Mark success for this key
        geminiKeyManager.markKeySuccess(apiKey);

        return {
          success: true,
          message: text.trim(),
        };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        lastError = error;
        const isRateLimit = this.isRateLimitError(error);

        // Mark error for this key
        geminiKeyManager.markKeyError(apiKey, isRateLimit);

        // If this is the last attempt, throw the error
        if (attempt === options.maxRetries) {
          break;
        }

        // Calculate delay for exponential backoff
        const delay = Math.min(
          options.baseDelay * Math.pow(2, attempt),
          options.maxDelay,
        );

        await this.sleep(delay);
      }
    }

    return {
      success: false,
      message: "Please refresh your page and try again after some time",
    };
  }

  /**
   * Check if an error is related to rate limiting
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isRateLimitError(error: any): boolean {
    const errorMessage = error?.message?.toLowerCase() || "";
    return (
      errorMessage.includes("quota") ||
      errorMessage.includes("rate limit") ||
      errorMessage.includes("429") ||
      errorMessage.includes("503") ||
      error?.status === 503 ||
      error?.status === 429 ||
      errorMessage.includes("resource_exhausted")
    );
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get load balancer statistics
   */
  getStats() {
    const stats = {
      keyStats: geminiKeyManager.getKeyStats(),
      availability: geminiKeyManager.getAvailabilityStats(),
      timestamp: new Date().toISOString(),
    };
    return stats;
  }
  /**
   * Reset a specific API key (for manual recovery)
   */
  resetKey(keyPrefix: string): boolean {
    const result = geminiKeyManager.resetKey(keyPrefix);

    return result;
  }
}

// Singleton instance
export const loadBalancedGeminiClient = new LoadBalancedGeminiClient();
