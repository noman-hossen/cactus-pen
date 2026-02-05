/**
 * Utility for managing multiple Hugging Face API keys
 * Implements round-robin, failure tracking, and rate limit management
 */

export interface ApiKeyStatus {
  index: number;
  maskedKey: string;
  lastUsed: Date | null;
  successCount: number;
  failureCount: number;
  lastError: string | null;
  isRateLimited: boolean;
  rateLimitUntil: Date | null;
  consecutiveFailures: number;
}

export class ApiKeyManager {
  private apiKeys: string[];
  private keyStatus: Map<number, ApiKeyStatus>;
  private currentKeyIndex: number;
  
  constructor() {
    // Load keys from environment variables
    // Priority: HF_API_KEYS (multiple) -> HF_API_KEY (single)
    const keysString = process.env.HF_API_KEYS || process.env.HF_API_KEY || '';
    
    if (keysString.includes(',')) {
      // Multiple keys provided
      this.apiKeys = keysString.split(',')
        .map(key => key.trim())
        .filter(key => key.length > 0 && key.startsWith('hf_'));
    } else {
      // Single key or empty
      this.apiKeys = keysString ? [keysString] : [];
    }
    
    this.keyStatus = new Map();
    this.currentKeyIndex = 0;
    
    // Initialize status tracking for each key
    this.apiKeys.forEach((key, index) => {
      this.keyStatus.set(index, {
        index,
        maskedKey: key.length >= 8 
          ? `${key.substring(0, 4)}...${key.substring(key.length - 4)}`
          : '***',
        lastUsed: null,
        successCount: 0,
        failureCount: 0,
        lastError: null,
        isRateLimited: false,
        rateLimitUntil: null,
        consecutiveFailures: 0,
      });
    });
    
    console.log(`[KeyManager] Initialized with ${this.apiKeys.length} API key(s)`);
  }
  
  /**
   * Get the next available API key using smart rotation
   * Prioritizes non-rate-limited keys, then least recently used
   */
  getNextKey(): { key: string; index: number } | null {
    if (this.apiKeys.length === 0) {
      return null;
    }
    
    // First, try to find a non-rate-limited key
    for (let i = 0; i < this.apiKeys.length; i++) {
      const index = (this.currentKeyIndex + i) % this.apiKeys.length;
      const status = this.keyStatus.get(index);
      
      if (status && !status.isRateLimited) {
        this.currentKeyIndex = (index + 1) % this.apiKeys.length;
        return { key: this.apiKeys[index], index };
      }
    }
    
    // If all are rate-limited, check if any rate limits have expired
    const now = new Date();
    for (let i = 0; i < this.apiKeys.length; i++) {
      const index = (this.currentKeyIndex + i) % this.apiKeys.length;
      const status = this.keyStatus.get(index);
      
      if (status && status.rateLimitUntil && status.rateLimitUntil <= now) {
        this.resetRateLimit(index);
        this.currentKeyIndex = (index + 1) % this.apiKeys.length;
        return { key: this.apiKeys[index], index };
      }
    }
    
    // All keys are rate-limited and none have expired
    // Return the one with the soonest expiry
    let soonestIndex = 0;
    let soonestTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // Far future
    
    this.keyStatus.forEach((status, index) => {
      if (status.rateLimitUntil && status.rateLimitUntil < soonestTime) {
        soonestTime = status.rateLimitUntil;
        soonestIndex = index;
      }
    });
    
    this.currentKeyIndex = (soonestIndex + 1) % this.apiKeys.length;
    return { key: this.apiKeys[soonestIndex], index: soonestIndex };
  }
  
  /**
   * Record a successful API call
   */
  recordSuccess(keyIndex: number): void {
    const status = this.keyStatus.get(keyIndex);
    if (status) {
      status.successCount++;
      status.lastUsed = new Date();
      status.lastError = null;
      status.consecutiveFailures = 0;
    }
  }
  
  /**
   * Record a failed API call
   */
  recordFailure(keyIndex: number, error: string): void {
    const status = this.keyStatus.get(keyIndex);
    if (status) {
      status.failureCount++;
      status.lastUsed = new Date();
      status.lastError = error;
      status.consecutiveFailures++;
      
      // Check for rate limit errors
      if (this.isRateLimitError(error)) {
        status.isRateLimited = true;
        const rateLimitUntil = new Date();
        // Standard HuggingFace rate limit is 1 minute
        rateLimitUntil.setSeconds(rateLimitUntil.getSeconds() + 60);
        status.rateLimitUntil = rateLimitUntil;
        
        console.log(`[KeyManager] Key ${keyIndex} rate limited until ${rateLimitUntil.toISOString()}`);
      }
      
      // If key has too many consecutive failures, temporarily disable it
      if (status.consecutiveFailures >= 3) {
        status.isRateLimited = true;
        const disableUntil = new Date();
        disableUntil.setMinutes(disableUntil.getMinutes() + 5); // Disable for 5 minutes
        status.rateLimitUntil = disableUntil;
        
        console.log(`[KeyManager] Key ${keyIndex} disabled due to ${status.consecutiveFailures} consecutive failures`);
      }
    }
  }
  
  /**
   * Check if error indicates rate limiting
   */
  private isRateLimitError(error: string): boolean {
    const rateLimitIndicators = [
      '429',
      'rate limit',
      'Rate limit',
      'too many requests',
      'Too Many Requests',
      'quota',
      'Quota'
    ];
    
    return rateLimitIndicators.some(indicator => 
      error.toLowerCase().includes(indicator.toLowerCase())
    );
  }
  
  /**
   * Reset rate limit for a key
   */
  resetRateLimit(keyIndex: number): void {
    const status = this.keyStatus.get(keyIndex);
    if (status) {
      status.isRateLimited = false;
      status.rateLimitUntil = null;
      status.consecutiveFailures = 0;
      console.log(`[KeyManager] Key ${keyIndex} rate limit reset`);
    }
  }
  
  /**
   * Manually add a new API key (for runtime updates)
   */
  addKey(apiKey: string): number {
    const index = this.apiKeys.length;
    this.apiKeys.push(apiKey);
    
    this.keyStatus.set(index, {
      index,
      maskedKey: apiKey.length >= 8 
        ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`
        : '***',
      lastUsed: null,
      successCount: 0,
      failureCount: 0,
      lastError: null,
      isRateLimited: false,
      rateLimitUntil: null,
      consecutiveFailures: 0,
    });
    
    console.log(`[KeyManager] Added new key at index ${index}`);
    return index;
  }
  
  /**
   * Get status of all keys
   */
  getAllKeyStatus(): ApiKeyStatus[] {
    return Array.from(this.keyStatus.values()).sort((a, b) => a.index - b.index);
  }
  
  /**
   * Get total number of keys
   */
  getTotalKeys(): number {
    return this.apiKeys.length;
  }
  
  /**
   * Get number of available (non-rate-limited) keys
   */
  getAvailableKeys(): number {
    const now = new Date();
    return Array.from(this.keyStatus.values()).filter(s => 
      !s.isRateLimited || (s.rateLimitUntil && s.rateLimitUntil <= now)
    ).length;
  }
  
  /**
   * Get statistics for monitoring
   */
  getStatistics() {
    const now = new Date();
    const statuses = this.getAllKeyStatus();
    
    const totalSuccess = statuses.reduce((sum, s) => sum + s.successCount, 0);
    const totalFailures = statuses.reduce((sum, s) => sum + s.failureCount, 0);
    const rateLimited = statuses.filter(s => 
      s.isRateLimited && s.rateLimitUntil && s.rateLimitUntil > now
    ).length;
    
    return {
      totalKeys: this.getTotalKeys(),
      availableKeys: this.getAvailableKeys(),
      rateLimitedKeys: rateLimited,
      totalSuccess,
      totalFailures,
      successRate: totalSuccess + totalFailures > 0 
        ? (totalSuccess / (totalSuccess + totalFailures)) * 100 
        : 0,
      keys: statuses,
    };
  }
}

// Singleton instance
export const keyManager = new ApiKeyManager();