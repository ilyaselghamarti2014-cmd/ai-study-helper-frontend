'use client';

import { useEffect, useState, useRef } from 'react';
import { adService } from '@/lib/adService';

interface AdBannerProps {
  className?: string;
  adSlot?: string;
  style?: React.CSSProperties;
}

/**
 * AdBanner Component
 * Displays Google AdSense ads with responsive design
 * Integrates with adService for timing control
 */
export default function AdBanner({ className = '', adSlot = '', style }: AdBannerProps) {
  const [shouldShow, setShouldShow] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const adRef = useRef<HTMLModElement>(null);

  // Only run on client-side to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Subscribe to ad service events
    const unsubscribe = adService.subscribe((show: boolean) => {
      setShouldShow(show);
    });

    // Check if ad should be shown on mount
    if (adService.checkShouldShowAd()) {
      setShouldShow(true);
    }

    return unsubscribe;
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !shouldShow || !adRef.current || adLoaded) return;

    // Load AdSense ad when banner should show
    // Use setTimeout to ensure DOM is ready
    const timer = setTimeout(() => {
      loadAd();
    }, 100);

    return () => clearTimeout(timer);
  }, [shouldShow, adLoaded, isClient]);

  const loadAd = () => {
    try {
      // Ensure adsbygoogle is initialized
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      
      // Only push if this specific ad hasn't been loaded yet
      if (adRef.current && !adRef.current.getAttribute('data-ad-status')) {
        (window as any).adsbygoogle.push({});
        adRef.current.setAttribute('data-ad-status', 'loaded');
        setAdLoaded(true);
      }
    } catch (error) {
      console.error('Failed to load ad:', error);
    }
  };

  const handleAdClose = () => {
    setShouldShow(false);
    adService.markAdShown();
  };

  // Don't render during SSR
  if (!isClient) return null;
  if (!shouldShow) return null;

  return (
    <div 
      className={`ad-banner ${className}`}
      style={{
        width: '100%',
        minHeight: '100px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        ...style,
      }}
    >
      {/* Close button for user control */}
      <button
        onClick={handleAdClose}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          cursor: 'pointer',
          zIndex: 10,
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Close ad"
      >
        ×
      </button>

      {/* AdSense Ad Unit */}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '100px' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-7457347570950747'}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />

      {/* Fallback if AdSense doesn't load */}
      {!adLoaded && (
        <div style={{ color: '#999', fontSize: '14px' }}>
          Advertisement
        </div>
      )}
    </div>
  );
}

/**
 * InlineAd Component
 * Smaller ad for inline placement within content
 */
export function InlineAd({ className = '', adSlot = '' }: { className?: string; adSlot?: string }) {
  const [shouldShow, setShouldShow] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const unsubscribe = adService.subscribe((show: boolean) => {
      setShouldShow(show);
    });

    if (adService.checkShouldShowAd()) {
      setShouldShow(true);
    }

    return unsubscribe;
  }, [isClient]);

  const handleAdClose = () => {
    setShouldShow(false);
    adService.markAdShown();
  };

  if (!isClient) return null;
  if (!shouldShow) return null;

  return (
    <div className={`inline-ad ${className}`} style={{ margin: '16px 0', position: 'relative' }}>
      <button
        onClick={handleAdClose}
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          cursor: 'pointer',
          zIndex: 10,
          fontSize: '12px',
        }}
      >
        ×
      </button>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '60px' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-7457347570950747'}
        data-ad-slot={adSlot}
        data-ad-format="fluid"
        data-ad-layout="in-article"
      />
    </div>
  );
}
