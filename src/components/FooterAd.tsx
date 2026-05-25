'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * FooterAd Component
 * Displays the footer_ad unit with slot 2831757050
 * This is a dedicated component for the footer ad placement
 */
export default function FooterAd() {
  const [isClient, setIsClient] = useState(false);
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !adRef.current) return;

    // Ensure adsbygoogle is initialized
    (window as any).adsbygoogle = (window as any).adsbygoogle || [];

    // Only push if this specific ad hasn't been loaded yet
    if (!adRef.current.getAttribute('data-ad-status')) {
      const timer = setTimeout(() => {
        try {
          (window as any).adsbygoogle.push({});
          adRef.current?.setAttribute('data-ad-status', 'loaded');
        } catch (error) {
          console.error('Failed to load footer ad:', error);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div className="w-full py-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7457347570950747"
          data-ad-slot="2831757050"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
