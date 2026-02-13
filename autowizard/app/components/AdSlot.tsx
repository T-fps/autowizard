"use client";

import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  slotId: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  testMode?: boolean;
}

/**
 * Google AdSense Ad Slot Component
 * 
 * To enable ads:
 * 1. Sign up for Google AdSense at https://www.google.com/adsense
 * 2. Get approved and create ad units
 * 3. Add your publisher ID to layout.tsx (in the <head> section):
 *    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
 * 4. Replace the slotId with your actual ad unit IDs
 * 
 * Set testMode={true} during development to see placeholder ads
 */
export default function AdSlot({ 
  slotId, 
  format = 'auto', 
  className = '',
  testMode = process.env.NODE_ENV === 'development'
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (testMode || isLoaded.current) return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      isLoaded.current = true;
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [testMode]);

  // Test mode placeholder
  if (testMode) {
    const heights: Record<string, string> = {
      auto: 'min-h-[250px]',
      rectangle: 'h-[250px] w-[300px]',
      horizontal: 'h-[90px]',
      vertical: 'h-[600px] w-[160px]',
    };

    return (
      <div 
        className={`bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-sm ${heights[format]} ${className}`}
      >
        <div className="text-center p-4">
          <p className="font-medium">Ad Placeholder</p>
          <p className="text-xs mt-1">Slot: {slotId}</p>
          <p className="text-xs">Format: {format}</p>
        </div>
      </div>
    );
  }

  // Real ad slot
  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{ display: 'block' }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your publisher ID
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}

/**
 * In-Article Ad - Best for placing within blog content
 */
export function InArticleAd({ className = '' }: { className?: string }) {
  return (
    <div className={`my-8 ${className}`}>
      <p className="text-xs text-slate-400 text-center mb-2">Advertisement</p>
      <AdSlot slotId="in-article-1" format="auto" />
    </div>
  );
}

/**
 * Sidebar Ad - Best for sidebars on desktop
 */
export function SidebarAd({ className = '' }: { className?: string }) {
  return (
    <div className={`sticky top-4 ${className}`}>
      <p className="text-xs text-slate-400 mb-2">Sponsored</p>
      <AdSlot slotId="sidebar-1" format="rectangle" />
    </div>
  );
}

/**
 * Banner Ad - Best for top/bottom of pages
 */
export function BannerAd({ className = '' }: { className?: string }) {
  return (
    <div className={`py-4 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <AdSlot slotId="banner-1" format="horizontal" />
      </div>
    </div>
  );
}

/**
 * Native Ad Block - Styled to blend with content
 */
export function NativeAdBlock({ 
  title = "Recommended",
  className = '' 
}: { 
  title?: string;
  className?: string;
}) {
  const testMode = process.env.NODE_ENV === 'development';

  if (testMode) {
    return (
      <div className={`bg-slate-50 rounded-xl p-6 border border-slate-200 ${className}`}>
        <p className="text-sm text-slate-500 mb-4">{title}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="aspect-video bg-slate-200 rounded mb-2" />
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-1" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 text-center mt-4">Native Ad Placeholder</p>
      </div>
    );
  }

  return (
    <div className={`bg-slate-50 rounded-xl p-6 border border-slate-200 ${className}`}>
      <p className="text-sm text-slate-500 mb-4">{title}</p>
      <AdSlot slotId="native-1" format="auto" />
    </div>
  );
}
