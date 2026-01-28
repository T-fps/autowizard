'use client';

import { useState } from 'react';

interface BrandLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export default function BrandLogo({ src, alt, className = 'max-w-full max-h-full object-contain' }: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <img 
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
