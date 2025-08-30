import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { cn } from './ui/utils';
import { Skeleton } from './ui/skeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({ 
  src, 
  alt, 
  className, 
  placeholder, 
  width, 
  height, 
  loading = 'lazy',
  priority = false,
  onLoad,
  onError 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(priority ? src : placeholder || '');
  
  const { elementRef, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '50px',
    freezeOnceVisible: true
  });

  // Load image when it becomes visible
  React.useEffect(() => {
    if ((isVisible || priority) && !imageSrc && !hasError) {
      setImageSrc(src);
    }
  }, [isVisible, priority, src, imageSrc, hasError]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div 
        ref={elementRef}
        className={cn(
          'bg-muted flex items-center justify-center text-muted-foreground text-sm',
          className
        )}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        Failed to load image
      </div>
    );
  }

  return (
    <div ref={elementRef} className={cn('relative overflow-hidden', className)}>
      {/* Skeleton placeholder */}
      {!isLoaded && imageSrc && (
        <Skeleton 
          className={cn('absolute inset-0', className)}
          style={{ width, height }}
        />
      )}
      
      {/* Actual image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
        />
      )}
      
      {/* Loading state for non-priority images */}
      {!imageSrc && !priority && (
        <Skeleton 
          className={className}
          style={{ width, height }}
        />
      )}
    </div>
  );
}