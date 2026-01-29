'use client';

import { useState } from 'react';

interface BrandLogoProps {
  src: string;
  alt: string;
  brandName?: string;
  className?: string;
}

export default function BrandLogo({ src, alt, brandName, className = 'max-w-full max-h-full object-contain' }: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);

  // Get initials from brand name for fallback
  const getInitials = (name: string) => {
    const words = name.split(/[\s-]+/);
    if (words.length >= 2) {
      return words.slice(0, 2).map(w => w[0]).join('').toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  if (hasError) {
    // Show stylized fallback with brand initial
    const displayName = brandName || alt.replace(' logo', '');
    return (
      <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg w-full h-full flex items-center justify-center">
        <span className="text-2xl md:text-3xl font-bold text-white">
          {getInitials(displayName)}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-2 w-full h-full flex items-center justify-center">
      <img 
        src={src}
        alt={alt}
        className={className}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
