import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from './AnimationProvider';
import { cn } from '../ui/utils';

// Premium hover card with sophisticated animations
export const PremiumHoverCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  glowColor?: string;
}> = ({ children, className, hoverScale = 1.03, glowColor = '#10B981' }) => {
  const { enableMicroInteractions } = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  if (!enableMicroInteractions) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn('relative', className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: hoverScale,
        rotateX: 5,
        rotateY: 5,
        z: 50,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      style={{
        transformStyle: "preserve-3d",
        boxShadow: isHovered 
          ? `0 25px 50px -12px ${glowColor}40, 0 0 0 1px ${glowColor}20`
          : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
    >
      {children}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0"
        animate={{
          opacity: isHovered ? 0.1 : 0,
        }}
        style={{
          background: `linear-gradient(135deg, ${glowColor}40, transparent)`,
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
};

// Ripple effect for buttons
export const RippleButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  rippleColor?: string;
}> = ({ children, className, onClick, rippleColor = 'rgba(255, 255, 255, 0.6)' }) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const { enableMicroInteractions } = useAnimation();

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={createRipple}
      whileHover={enableMicroInteractions ? { scale: 1.02 } : {}}
      whileTap={enableMicroInteractions ? { scale: 0.98 } : {}}
    >
      {children}
      <AnimatePresence>
        {enableMicroInteractions && ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: rippleColor,
            }}
            initial={{
              width: 0,
              height: 0,
              opacity: 1,
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              width: 300,
              height: 300,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
};

// Floating action button with premium animations
export const FloatingActionButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}> = ({ children, onClick, className, position = 'bottom-right' }) => {
  const { enableMicroInteractions } = useAnimation();
  const [isExpanded, setIsExpanded] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <motion.button
      className={`fixed z-50 ${positionClasses[position]} ${className}`}
      onClick={onClick}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      whileHover={enableMicroInteractions ? {
        scale: 1.1,
        rotate: 5,
        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
      } : {}}
      whileTap={enableMicroInteractions ? { scale: 0.95 } : {}}
      animate={enableMicroInteractions ? {
        y: [0, -5, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }
      } : {}}
    >
      <motion.div
        animate={{
          rotate: isExpanded ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
};

// Loading spinner with luxury aesthetics
export const LuxurySpinner: React.FC<{
  size?: number;
  color?: string;
  className?: string;
}> = ({ size = 40, color = '#10B981', className }) => {
  const { animationSpeed } = useAnimation();

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        style={{
          width: size,
          height: size,
          border: `3px solid ${color}20`,
          borderTop: `3px solid ${color}`,
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1 / animationSpeed,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute"
        style={{
          width: size * 0.6,
          height: size * 0.6,
          border: `2px solid ${color}40`,
          borderBottom: `2px solid ${color}`,
          borderRadius: '50%',
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5 / animationSpeed,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Animated counter with smooth transitions
export const AnimatedCounter: React.FC<{
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}> = ({ value, duration = 2, className, prefix = '', suffix = '' }) => {
  const { animationSpeed } = useAnimation();

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 * animationSpeed }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: duration * animationSpeed,
          ease: "easeOut",
        }}
      >
        {prefix}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: duration * animationSpeed,
            ease: "easeOut",
          }}
          className="font-bold"
        >
          {value}
        </motion.span>
        {suffix}
      </motion.span>
    </motion.span>
  );
};

// Gradient text animation
export const GradientText: React.FC<{
  children: React.ReactNode;
  className?: string;
  colors?: string[];
}> = ({ children, className, colors = ['#10B981', '#059669', '#047857'] }) => {
  const { enableMicroInteractions } = useAnimation();

  if (!enableMicroInteractions) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={className}
      style={{
        background: `linear-gradient(45deg, ${colors.join(', ')})`,
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
};

// Typewriter effect
export const TypewriterText: React.FC<{
  text: string;
  speed?: number;
  className?: string;
  cursor?: boolean;
}> = ({ text, speed = 50, className, cursor = true }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const { animationSpeed } = useAnimation();

  React.useEffect(() => {
    let index = 0;
    const adjustedSpeed = speed / animationSpeed;
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        if (cursor) {
          setInterval(() => {
            setShowCursor(prev => !prev);
          }, 500);
        }
      }
    }, adjustedSpeed);

    return () => clearInterval(timer);
  }, [text, speed, animationSpeed, cursor]);

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <motion.span
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0 }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};
