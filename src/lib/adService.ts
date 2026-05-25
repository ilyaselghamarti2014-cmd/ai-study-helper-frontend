/**
 * Ad Service for Google AdSense
 * Manages ad display timing, counters, and localStorage persistence
 */

export interface AdConfig {
  aiUsesThreshold: number;
  timeThresholdMinutes: number;
  minTimeBetweenAdsMinutes: number;
}

export interface AdState {
  aiUsesSinceLastAd: number;
  lastAdTimestamp: number | null;
  totalAdsShown: number;
}

const DEFAULT_CONFIG: AdConfig = {
  aiUsesThreshold: 5,
  timeThresholdMinutes: 1,
  minTimeBetweenAdsMinutes: 0.5, // 30 seconds minimum between ads
};

const STORAGE_KEY = 'adState';

class AdService {
  private config: AdConfig;
  private state: AdState;
  private listeners: Set<(shouldShow: boolean) => void> = new Set();

  constructor(config: Partial<AdConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.state = this.loadState();
  }

  /**
   * Load ad state from localStorage
   */
  private loadState(): AdState {
    if (typeof window === 'undefined') {
      return {
        aiUsesSinceLastAd: 0,
        lastAdTimestamp: null,
        totalAdsShown: 0,
      };
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load ad state:', error);
    }

    return {
      aiUsesSinceLastAd: 0,
      lastAdTimestamp: null,
      totalAdsShown: 0,
    };
  }

  /**
   * Save ad state to localStorage
   */
  private saveState(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (error) {
      console.error('Failed to save ad state:', error);
    }
  }

  /**
   * Notify all listeners of ad state change
   */
  private notifyListeners(shouldShow: boolean): void {
    this.listeners.forEach(listener => listener(shouldShow));
  }

  /**
   * Register a listener for ad display events
   */
  public subscribe(listener: (shouldShow: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Increment AI use counter
   * Call this after each AI interaction (message, generation, etc.)
   */
  public incrementAIUse(): void {
    this.state.aiUsesSinceLastAd++;
    this.saveState();
    this.checkShouldShowAd();
  }

  /**
   * Check if an ad should be shown based on current state
   */
  public checkShouldShowAd(): boolean {
    const now = Date.now();
    const timeSinceLastAd = this.state.lastAdTimestamp 
      ? (now - this.state.lastAdTimestamp) / 1000 / 60 // Convert to minutes
      : Infinity;

    // Check AI uses threshold
    const aiThresholdMet = this.state.aiUsesSinceLastAd >= this.config.aiUsesThreshold;
    
    // Check time threshold
    const timeThresholdMet = timeSinceLastAd >= this.config.timeThresholdMinutes;
    
    // Check minimum time between ads (prevent aggressive showing)
    const minTimePassed = timeSinceLastAd >= this.config.minTimeBetweenAdsMinutes;

    const shouldShow = (aiThresholdMet || timeThresholdMet) && minTimePassed;

    if (shouldShow) {
      this.notifyListeners(true);
    }

    return shouldShow;
  }

  /**
   * Mark an ad as shown and reset counters
   */
  public markAdShown(): void {
    this.state.aiUsesSinceLastAd = 0;
    this.state.lastAdTimestamp = Date.now();
    this.state.totalAdsShown++;
    this.saveState();
    this.notifyListeners(false);
  }

  /**
   * Get current ad state (read-only)
   */
  public getState(): Readonly<AdState> {
    return { ...this.state };
  }

  /**
   * Reset ad state (for testing or user reset)
   */
  public resetState(): void {
    this.state = {
      aiUsesSinceLastAd: 0,
      lastAdTimestamp: null,
      totalAdsShown: 0,
    };
    this.saveState();
    this.notifyListeners(false);
  }

  /**
   * Check if AdSense is available (client-side only)
   */
  public isAdSenseAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(window as any).adsbygoogle;
  }
}

// Singleton instance
export const adService = new AdService();
