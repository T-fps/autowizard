'use client';

import { useState } from 'react';

interface CarImageProps {
  src: string;
  alt: string;
  fallbackEmoji?: string;
  className?: string;
  containerClassName?: string;
}

export default function CarImage({ 
  src, 
  alt, 
  fallbackEmoji = '🚗',
  className = 'w-full h-full object-contain',
  containerClassName = ''
}: CarImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${containerClassName}`}>
      {!hasError && (
        <img 
          src={src}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onError={() => setHasError(true)}
          onLoad={() => setIsLoading(false)}
        />
      )}
      {(hasError || isLoading) && (
        <div className={`absolute inset-0 flex items-center justify-center ${hasError ? '' : 'animate-pulse'}`}>
          <span className="text-5xl">{fallbackEmoji}</span>
        </div>
      )}
    </div>
  );
}
