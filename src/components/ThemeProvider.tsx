import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Handle theme migration - if the old theme value exists as a plain string, migrate it
  const migrateTheme = (): Theme => {
    if (typeof window === "undefined") return 'light';
    
    try {
      const existingTheme = window.localStorage.getItem('theme');
      if (existingTheme === 'light' || existingTheme === 'dark') {
        // It's a plain string, return as-is and the hook will handle it
        return existingTheme as Theme;
      }
      // Default to light theme
      return 'light';
    } catch {
      return 'light';
    }
  };

  const [theme, setTheme] = useLocalStorage<Theme>('theme', migrateTheme());
  const [reducedMotion, setReducedMotion] = useLocalStorage('reduced-motion', false);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Apply reduced motion preference
    if (reducedMotion) {
      document.documentElement.style.setProperty('--motion-reduce', '1');
    } else {
      document.documentElement.style.removeProperty('--motion-reduce');
    }

    // Check for system preference on first load
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && !localStorage.getItem('reduced-motion')) {
      setReducedMotion(true);
    }

    // Listen for system theme changes
    const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    systemThemeQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      systemThemeQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme, reducedMotion, setTheme, setReducedMotion]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, reducedMotion, setReducedMotion }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};