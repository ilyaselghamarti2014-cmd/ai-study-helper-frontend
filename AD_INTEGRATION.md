# Google AdSense Integration Guide

## Overview
This ad system integrates Google AdSense with your Next.js/Capacitor frontend using a service-based approach.

## Files Created

### 1. `frontend/src/lib/adService.ts`
**Purpose:** Core ad service that manages timing, counters, and localStorage persistence.

**Key Features:**
- Tracks AI uses since last ad
- Tracks time since last ad
- Prevents aggressive ad showing (minimum 30 seconds between ads)
- Persists state to localStorage
- Notifies subscribers when ads should show

**Usage:**
```typescript
import { adService } from '@/lib/adService';

// Increment after each AI interaction
adService.incrementAIUse();

// Check if ad should show
if (adService.checkShouldShowAd()) {
  // Show ad
  adService.markAdShown();
}

// Subscribe to ad events
const unsubscribe = adService.subscribe((shouldShow) => {
  console.log('Should show ad:', shouldShow);
});
```

### 2. `frontend/src/components/AdBanner.tsx`
**Purpose:** React component for displaying AdSense ads.

**Components:**
- `AdBanner` - Full-width banner ad with close button
- `InlineAd` - Smaller inline ad for content placement

**Usage:**
```tsx
import AdBanner, { InlineAd } from '@/components/AdBanner';

// Full banner
<AdBanner className="my-4" adSlot="YOUR_AD_SLOT" />

// Inline ad
<InlineAd className="my-2" adSlot="YOUR_AD_SLOT" />
```

### 3. `frontend/src/hooks/useAdService.ts`
**Purpose:** React hook for easy integration with adService.

**Usage:**
```tsx
import { useAdService } from '@/hooks/useAdService';

function MyComponent() {
  const { state, shouldShowAd, incrementAIUse, markAdShown } = useAdService();

  const handleAIInteraction = () => {
    // Call after AI response
    incrementAIUse();
  };

  return (
    <div>
      {shouldShowAd && <AdBanner />}
    </div>
  );
}
```

## Integration Steps

### Step 1: Add AdBanner to Layout
Add the AdBanner component to your main layout or dashboard:

```tsx
// frontend/src/app/dashboard/layout.tsx or similar
import AdBanner from '@/components/AdBanner';

export default function DashboardLayout({ children }) {
  return (
    <div>
      <AdBanner className="mb-4" />
      {children}
    </div>
  );
}
```

### Step 2: Increment AI Use Counter
Call `adService.incrementAIUse()` after each AI interaction:

```tsx
// Example in AI chat component
import { adService } from '@/lib/adService';

async function handleSendMessage(message: string) {
  const response = await aiApi.sendMessage(message);
  
  // Increment counter after AI response
  adService.incrementAIUse();
  
  return response;
}
```

### Step 3: Add Ad Slots to Key Pages
Add inline ads to high-traffic pages:

```tsx
// frontend/src/app/ai-recommendations/page.tsx
import { InlineAd } from '@/components/AdBanner';

export default function AIRecommendationsPage() {
  return (
    <div>
      <InlineAd />
      {/* Your content */}
      <InlineAd />
    </div>
  );
}
```

## Configuration

Default configuration in `adService.ts`:
```typescript
{
  aiUsesThreshold: 5,              // Show ad every 5 AI uses
  timeThresholdMinutes: 1,         // Also show if 1 minute passed
  minTimeBetweenAdsMinutes: 0.5    // Minimum 30 seconds between ads
}
```

To customize:
```typescript
import { AdService } from '@/lib/adService';

const customService = new AdService({
  aiUsesThreshold: 10,
  timeThresholdMinutes: 2,
  minTimeBetweenAdsMinutes: 1,
});
```

## AdSense Setup

### 1. Get Ad Slots
1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Create ad units for your app
3. Copy the ad slot IDs

### 2. Update Ad Components
Replace `YOUR_AD_SLOT` with your actual AdSense ad slot IDs in:
- `AdBanner.tsx` (data-ad-slot)
- `InlineAd.tsx` (data-ad-slot)

### 3. Verify AdSense Script
Ensure the AdSense script is in `frontend/src/index.html` (already added):
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7457347570950747" crossorigin="anonymous"></script>
```

## Capacitor Android Considerations

### 1. Webview Configuration
Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<application
    android:usesCleartextTraffic="true"
    android:networkSecurityConfig="@xml/network_security_config">
```

### 2. Network Security Config
Create `android/app/src/main/res/xml/network_security_config.xml`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
</network-security-config>
```

### 3. Permissions
Ensure these permissions in `AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

## Testing

### Test Ad Display
```typescript
// In browser console
import { adService } from '@/lib/adService';

// Force ad to show
adService.incrementAIUse();
adService.incrementAIUse();
adService.incrementAIUse();
adService.incrementAIUse();
adService.incrementAIUse(); // 5th use triggers ad

// Check state
console.log(adService.getState());

// Reset for testing
adService.resetState();
```

### Test on Android
1. Build Android app: `npx cap build android`
2. Install on device/emulator
3. Trigger AI interactions
4. Verify ads display correctly

## Best Practices

1. **Don't Show Too Many Ads**: The minimum time threshold prevents aggressive showing
2. **User Control**: Close button allows users to dismiss ads
3. **Mobile Friendly**: Responsive ad units adapt to screen size
4. **Performance**: Ads load asynchronously, don't block rendering
5. **Privacy**: State stored locally, no server tracking

## Troubleshooting

### Ads Not Showing
- Check AdSense account is approved
- Verify ad slot IDs are correct
- Check browser console for errors
- Ensure AdSense script is loaded
- Verify `adService.incrementAIUse()` is being called

### Ads Showing Too Frequently
- Increase `minTimeBetweenAdsMinutes`
- Increase `aiUsesThreshold`
- Check localStorage is working

### Capacitor Issues
- Ensure internet permission in AndroidManifest.xml
- Check network security config
- Test in browser first, then Capacitor

## Compliance

- Follow Google AdSense policies
- Don't incentivize ad clicks
- Don't place ads over content
- Provide user control (close button)
- Respect user privacy
