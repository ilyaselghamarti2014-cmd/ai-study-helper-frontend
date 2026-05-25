/**
 * React Hook for Ad Service
 * Provides easy integration with adService in React components
 */

import { useEffect, useState, useCallback } from 'react';
import { adService, AdState } from '@/lib/adService';

export function useAdService() {
  const [state, setState] = useState<AdState>(adService.getState());
  const [shouldShowAd, setShouldShowAd] = useState(false);

  useEffect(() => {
    // Subscribe to ad service changes
    const unsubscribe = adService.subscribe((show: boolean) => {
      setShouldShowAd(show);
      setState(adService.getState());
    });

    // Initial check
    setShouldShowAd(adService.checkShouldShowAd());
    setState(adService.getState());

    return unsubscribe;
  }, []);

  const incrementAIUse = useCallback(() => {
    adService.incrementAIUse();
    setState(adService.getState());
  }, []);

  const markAdShown = useCallback(() => {
    adService.markAdShown();
    setState(adService.getState());
  }, []);

  const resetState = useCallback(() => {
    adService.resetState();
    setState(adService.getState());
  }, []);

  return {
    state,
    shouldShowAd,
    incrementAIUse,
    markAdShown,
    resetState,
    isAdSenseAvailable: adService.isAdSenseAvailable(),
  };
}
