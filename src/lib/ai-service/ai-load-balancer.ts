/**
 * AI Load Balancer - Key Pool Manager
 * Manages multiple Gemini API keys with round-robin distribution and intelligent fallback
 */

/// <reference types="node" />

interface ApiKeyStatus {
  key: string;
  isActive: boolean;
  lastUsed: Date;
  requestCount: number;
  rateLimitResetTime?: Date;
  consecutiveErrors: number;
}

class GeminiKeyManager {
  private keys: ApiKeyStatus[] = [];
  private currentIndex = 0;
  private readonly MAX_CONSECUTIVE_ERRORS = 3;
  private readonly RATE_LIMIT_COOLDOWN = 60000; // 1 minute

  constructor() {
    this.initializeKeys();
  }

  private initializeKeys() {
    // Only initialize on server side
    if (typeof window !== "undefined") return;

    // Type-safe environment variable access
    const env = process.env as Record<string, string | undefined>;

    // Collect all available API keys
    const apiKeys = [
      env.GEMINI_API_KEY_1, // Primary key
      env.GEMINI_API_KEY_2,
      env.GEMINI_API_KEY_3,
      env.GEMINI_API_KEY_4,
      env.GEMINI_API_KEY_5,
      env.GEMINI_API_KEY_6,
    ].filter((key): key is string => Boolean(key));

    if (apiKeys.length === 0) {
      return;
    }

    this.keys = apiKeys.map((key) => ({
      key,
      isActive: true,
      lastUsed: new Date(),
      requestCount: 0,
      consecutiveErrors: 0,
    }));
  }

  /**
   * Get the next available API key using round-robin algorithm
   */
  getNextKey(): string | null {
    const availableKeys = this.keys.filter((k) => this.isKeyAvailable(k));

    if (availableKeys.length === 0) {
      // this.showRetryMessage("All AI agents are busy, retrying with backup agents...");
      return null;
    }

    // Round-robin through available keys
    let attempts = 0;
    while (attempts < this.keys.length) {
      const key = this.keys[this.currentIndex];
      this.currentIndex = (this.currentIndex + 1) % this.keys.length;

      if (this.isKeyAvailable(key)) {
        key.lastUsed = new Date();
        key.requestCount++;
        return key.key;
      }
      attempts++;
    }
    return null;
  }

  /**
   * Mark a key as having an error (rate limit or other failure)
   */
  markKeyError(apiKey: string, isRateLimit: boolean = false) {
    const keyStatus = this.keys.find((k) => k.key === apiKey);
    if (!keyStatus) return;

    keyStatus.consecutiveErrors++;

    if (isRateLimit) {
      keyStatus.rateLimitResetTime = new Date(
        Date.now() + this.RATE_LIMIT_COOLDOWN,
      );
    }

    if (keyStatus.consecutiveErrors >= this.MAX_CONSECUTIVE_ERRORS) {
      keyStatus.isActive = false;
    }
  }

  /**
   * Mark a key as successful (reset error count)
   */
  markKeySuccess(apiKey: string) {
    const keyStatus = this.keys.find((k) => k.key === apiKey);
    if (keyStatus) {
      keyStatus.consecutiveErrors = 0;
      keyStatus.isActive = true;
    }
  }

  /**
   * Check if a key is available for use
   */
  private isKeyAvailable(keyStatus: ApiKeyStatus): boolean {
    if (!keyStatus.isActive) return false;

    // Check if rate limit has expired
    if (
      keyStatus.rateLimitResetTime &&
      keyStatus.rateLimitResetTime > new Date()
    ) {
      return false;
    }

    return true;
  }

  /**
   * Get statistics for all keys (for monitoring)
   */
  getKeyStats() {
    const stats = this.keys.map((k) => ({
      key: k.key.substring(0, 10) + "...",
      isActive: k.isActive,
      requestCount: k.requestCount,
      consecutiveErrors: k.consecutiveErrors,
      isRateLimited: k.rateLimitResetTime
        ? k.rateLimitResetTime > new Date()
        : false,
      lastUsed: k.lastUsed.toISOString(),
    }));
    return stats;
  }

  /**
   * Reset a specific key (for manual recovery)
   */
  resetKey(keyPrefix: string) {
    const keyStatus = this.keys.find((k) => k.key.startsWith(keyPrefix));
    if (keyStatus) {
      keyStatus.isActive = true;
      keyStatus.consecutiveErrors = 0;
      keyStatus.rateLimitResetTime = undefined;
      return true;
    }
    return false;
  }

  /**
   * Get total count of available vs total keys
   */
  getAvailabilityStats() {
    const total = this.keys.length;
    const active = this.keys.filter((k) => k.isActive).length;
    const available = this.keys.filter((k) => this.isKeyAvailable(k)).length;

    const stats = { total, active, available };
    return stats;
  }
}

// Singleton instance
export const geminiKeyManager = new GeminiKeyManager();
