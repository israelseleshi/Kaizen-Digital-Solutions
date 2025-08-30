import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from '../ThemeProvider';

interface AnimationContextType {
  reducedMotion: boolean;
  animationSpeed: number;
  enableParallax: boolean;
  enableMicroInteractions: boolean;
  setAnimationPreference: (key: string, value: any) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const { reducedMotion } = useTheme();
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [enableParallax, setEnableParallax] = useState(true);
  const [enableMicroInteractions, setEnableMicroInteractions] = useState(true);

  useEffect(() => {
    // Load animation preferences from localStorage
    const savedPrefs = localStorage.getItem('animation-preferences');
    if (savedPrefs) {
      try {
        const prefs = JSON.parse(savedPrefs);
        setAnimationSpeed(prefs.speed || 1);
        setEnableParallax(prefs.parallax !== false);
        setEnableMicroInteractions(prefs.microInteractions !== false);
      } catch (error) {
        console.warn('Failed to load animation preferences:', error);
      }
    }

    // Respect system preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setAnimationSpeed(0.5);
      setEnableParallax(false);
    }
  }, []);

  const setAnimationPreference = (key: string, value: any) => {
    const currentPrefs = JSON.parse(localStorage.getItem('animation-preferences') || '{}');
    const newPrefs = { ...currentPrefs, [key]: value };
    localStorage.setItem('animation-preferences', JSON.stringify(newPrefs));

    switch (key) {
      case 'speed':
        setAnimationSpeed(value);
        break;
      case 'parallax':
        setEnableParallax(value);
        break;
      case 'microInteractions':
        setEnableMicroInteractions(value);
        break;
    }
  };

  return (
    <AnimationContext.Provider
      value={{
        reducedMotion,
        animationSpeed: reducedMotion ? 0.3 : animationSpeed,
        enableParallax: reducedMotion ? false : enableParallax,
        enableMicroInteractions: reducedMotion ? false : enableMicroInteractions,
        setAnimationPreference,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
