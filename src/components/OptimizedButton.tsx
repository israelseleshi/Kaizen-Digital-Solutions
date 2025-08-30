import React, { memo, forwardRef } from 'react';
import { Button } from './ui/button';
import { LoadingSpinner } from './LoadingSpinner';
import { cn } from './ui/utils';
import { analytics } from '../utils/analytics';

interface OptimizedButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
  trackingLabel?: string;
  trackingCategory?: string;
  ripple?: boolean;
  debounceMs?: number;
}

export const OptimizedButton = memo(forwardRef<HTMLButtonElement, OptimizedButtonProps>(
  ({ 
    children, 
    loading = false, 
    trackingLabel, 
    trackingCategory = 'button_click',
    ripple = true,
    debounceMs = 0,
    onClick,
    disabled,
    className,
    ...props 
  }, ref) => {
    const [isDebounced, setIsDebounced] = React.useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      // Prevent multiple clicks during debounce period
      if (isDebounced || loading || disabled) {
        e.preventDefault();
        return;
      }

      // Track button click
      if (trackingLabel) {
        analytics.trackEvent({
          action: 'click',
          category: trackingCategory,
          label: trackingLabel
        });
      }

      // Handle debouncing
      if (debounceMs > 0) {
        setIsDebounced(true);
        timeoutRef.current = setTimeout(() => {
          setIsDebounced(false);
        }, debounceMs);
      }

      // Add ripple effect
      if (ripple && e.currentTarget) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const rippleElement = document.createElement('div');
        rippleElement.className = 'absolute rounded-full bg-current opacity-25 animate-ping pointer-events-none';
        rippleElement.style.left = `${x - 10}px`;
        rippleElement.style.top = `${y - 10}px`;
        rippleElement.style.width = '20px';
        rippleElement.style.height = '20px';
        
        button.style.position = 'relative';
        button.appendChild(rippleElement);
        
        setTimeout(() => {
          if (button.contains(rippleElement)) {
            button.removeChild(rippleElement);
          }
        }, 600);
      }

      onClick?.(e);
    }, [isDebounced, loading, disabled, trackingLabel, trackingCategory, debounceMs, ripple, onClick]);

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        disabled={disabled || loading || isDebounced}
        className={cn(
          'relative overflow-hidden',
          (loading || isDebounced) && 'cursor-wait',
          className
        )}
        {...props}
      >
        {loading && (
          <LoadingSpinner size="sm" className="mr-2" />
        )}
        <span className={loading ? 'opacity-70' : 'opacity-100'}>
          {children}
        </span>
      </Button>
    );
  }
));

OptimizedButton.displayName = 'OptimizedButton';