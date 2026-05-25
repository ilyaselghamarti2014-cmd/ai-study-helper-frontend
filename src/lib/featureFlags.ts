/**
 * Feature Flags Configuration
 * Allows enabling/disabling features independently
 */

export interface FeatureFlags {
  // Core Features
  studyPlanner: boolean;
  adaptiveQuizzes: boolean;
  semanticSearch: boolean;
  chatMemory: boolean;
  aiFlashcards: boolean;
  
  // Analytics & Productivity
  analyticsDashboard: boolean;
  productivityTracker: boolean;
  
  // Learning Features
  examPrepMode: boolean;
  learningPaths: boolean;
  
  // Social Features
  collaboration: boolean;
  gamification: boolean;
  
  // Onboarding & Admin
  onboarding: boolean;
  adminDashboard: boolean;
  
  // Platform Features
  offlineMode: boolean;
  pwa: boolean;
}

// Default feature flags (all enabled for development)
const defaultFlags: FeatureFlags = {
  studyPlanner: true,
  adaptiveQuizzes: true,
  semanticSearch: true,
  chatMemory: true,
  aiFlashcards: true,
  analyticsDashboard: true,
  productivityTracker: true,
  examPrepMode: true,
  learningPaths: true,
  collaboration: true,
  gamification: true,
  onboarding: true,
  adminDashboard: true,
  offlineMode: false, // Disabled by default
  pwa: true,
};

// Load flags from environment variables
const loadFlags = (): FeatureFlags => {
  return {
    studyPlanner: process.env.NEXT_PUBLIC_FEATURE_STUDY_PLANNER === 'true' || defaultFlags.studyPlanner,
    adaptiveQuizzes: process.env.NEXT_PUBLIC_FEATURE_ADAPTIVE_QUIZZES === 'true' || defaultFlags.adaptiveQuizzes,
    semanticSearch: process.env.NEXT_PUBLIC_FEATURE_SEMANTIC_SEARCH === 'true' || defaultFlags.semanticSearch,
    chatMemory: process.env.NEXT_PUBLIC_FEATURE_CHAT_MEMORY === 'true' || defaultFlags.chatMemory,
    aiFlashcards: process.env.NEXT_PUBLIC_FEATURE_AI_FLASHCARDS === 'true' || defaultFlags.aiFlashcards,
    analyticsDashboard: process.env.NEXT_PUBLIC_FEATURE_ANALYTICS_DASHBOARD === 'true' || defaultFlags.analyticsDashboard,
    productivityTracker: process.env.NEXT_PUBLIC_FEATURE_PRODUCTIVITY_TRACKER === 'true' || defaultFlags.productivityTracker,
    examPrepMode: process.env.NEXT_PUBLIC_FEATURE_EXAM_PREP === 'true' || defaultFlags.examPrepMode,
    learningPaths: process.env.NEXT_PUBLIC_FEATURE_LEARNING_PATHS === 'true' || defaultFlags.learningPaths,
    collaboration: process.env.NEXT_PUBLIC_FEATURE_COLLABORATION === 'true' || defaultFlags.collaboration,
    gamification: process.env.NEXT_PUBLIC_FEATURE_GAMIFICATION === 'true' || defaultFlags.gamification,
    onboarding: process.env.NEXT_PUBLIC_FEATURE_ONBOARDING === 'true' || defaultFlags.onboarding,
    adminDashboard: process.env.NEXT_PUBLIC_FEATURE_ADMIN_DASHBOARD === 'true' || defaultFlags.adminDashboard,
    offlineMode: process.env.NEXT_PUBLIC_FEATURE_OFFLINE_MODE === 'true' || defaultFlags.offlineMode,
    pwa: process.env.NEXT_PUBLIC_FEATURE_PWA === 'true' || defaultFlags.pwa,
  };
};

const featureFlags: FeatureFlags = loadFlags();

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  return featureFlags[feature];
}

/**
 * Get all feature flags
 */
export function getFeatureFlags(): FeatureFlags {
  return { ...featureFlags };
}

/**
 * Enable a feature (for testing/admin)
 */
export function enableFeature(feature: keyof FeatureFlags): void {
  if (typeof window !== 'undefined') {
    const flags = { ...featureFlags };
    flags[feature] = true;
    localStorage.setItem('featureFlags', JSON.stringify(flags));
  }
}

/**
 * Disable a feature (for testing/admin)
 */
export function disableFeature(feature: keyof FeatureFlags): void {
  if (typeof window !== 'undefined') {
    const flags = { ...featureFlags };
    flags[feature] = false;
    localStorage.setItem('featureFlags', JSON.stringify(flags));
  }
}

export default featureFlags;
