import React from 'react';
import { motion, HTMLMotionProps, Variants, useScroll, useTransform } from 'framer-motion';
import { useAnimation } from './AnimationProvider';

// Enhanced motion variants with luxury feel
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.95 }
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -80, rotateY: -15 },
  animate: { opacity: 1, x: 0, rotateY: 0 },
  exit: { opacity: 0, x: 80, rotateY: 15 }
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 80, rotateY: 15 },
  animate: { opacity: 1, x: 0, rotateY: 0 },
  exit: { opacity: 0, x: -80, rotateY: -15 }
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8, rotateZ: -5 },
  animate: { opacity: 1, scale: 1, rotateZ: 0 },
  exit: { opacity: 0, scale: 0.9, rotateZ: 5 }
};

export const slideInFromBottom: Variants = {
  initial: { opacity: 0, y: 100, skewY: 3 },
  animate: { opacity: 1, y: 0, skewY: 0 },
  exit: { opacity: 0, y: -50, skewY: -2 }
};

export const luxuryFloat: Variants = {
  initial: { y: 0 },
  animate: { 
    y: [-5, 5, -5],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const shimmer: Variants = {
  initial: { backgroundPosition: '-200% 0' },
  animate: { 
    backgroundPosition: '200% 0',
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Premium motion components
interface MotionBoxProps extends HTMLMotionProps<"div"> {
  variant?: keyof typeof motionVariants;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

const motionVariants = {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  slideInFromBottom,
  luxuryFloat,
  shimmer
};

export const MotionBox: React.FC<MotionBoxProps> = ({
  variant = 'fadeInUp',
  delay = 0,
  duration = 0.8,
  children,
  ...props
}) => {
  const { animationSpeed, reducedMotion } = useAnimation();

  const transition = {
    duration: duration * animationSpeed,
    delay: delay * animationSpeed,
    ease: [0.25, 0.46, 0.45, 0.94], // Premium easing curve
  };

  return (
    <motion.div
      variants={motionVariants[variant]}
      initial={reducedMotion ? false : "initial"}
      animate="animate"
      exit="exit"
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Stagger container for sequential animations
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 0.1, className }) => {
  const { animationSpeed } = useAnimation();

  return (
    <motion.div
      className={className}
      variants={{
        animate: {
          transition: {
            staggerChildren: staggerDelay * animationSpeed,
            delayChildren: 0.2 * animationSpeed,
          },
        },
      }}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
};

// Magnetic hover effect for premium interactions
export const MagneticButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}> = ({ children, className, onClick, strength = 0.3 }) => {
  const { enableMicroInteractions } = useAnimation();

  if (!enableMicroInteractions) {
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      className={className}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        rotateZ: 1,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      }}
      whileTap={{
        scale: 0.98,
        rotateZ: -0.5,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        e.currentTarget.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0px, 0px)';
      }}
    >
      {children}
    </motion.button>
  );
};

// Parallax scroll component
export const ParallaxElement: React.FC<{
  children: React.ReactNode;
  speed?: number;
  className?: string;
}> = ({ children, speed = 0.5, className }) => {
  const { enableParallax } = useAnimation();

  if (!enableParallax) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{
        y: useTransform(
          useScroll().scrollY,
          [0, 1000],
          [0, -1000 * speed]
        ),
      }}
    >
      {children}
    </motion.div>
  );
};

// Morphing shape component for premium aesthetics
export const MorphingShape: React.FC<{
  className?: string;
  duration?: number;
}> = ({ className, duration = 8 }) => {
  const { animationSpeed } = useAnimation();

  return (
    <motion.div
      className={className}
      animate={{
        borderRadius: [
          "60% 40% 30% 70%",
          "30% 60% 70% 40%",
          "70% 30% 40% 60%",
          "40% 70% 60% 30%",
          "60% 40% 30% 70%"
        ],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration: duration * animationSpeed,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// Text reveal animation
export const TextReveal: React.FC<{
  children: string;
  className?: string;
  delay?: number;
}> = ({ children, className, delay = 0 }) => {
  const { animationSpeed, reducedMotion } = useAnimation();

  if (reducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: delay * animationSpeed,
        duration: 0.8 * animationSpeed,
      }}
    >
      {children.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: (delay + index * 0.05) * animationSpeed,
            duration: 0.6 * animationSpeed,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};
