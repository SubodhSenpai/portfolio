"use client";

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type ThemeName = 'dark' | 'matrix' | 'ubuntu' | 'dracula' | 'nord' | 'monokai';

type ThemeContextValue = {
  theme: ThemeName;
  switchTheme: (theme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('dark');

  useEffect(() => {
    try {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      const stored = window.localStorage?.getItem('terminal-theme') as ThemeName | null;
      const initial: ThemeName = stored ?? (prefersDark ? 'matrix' : 'dark');
      if (initial !== theme) {
        setTheme(initial);
      }
    } catch (error) {
      // Handle errors gracefully (e.g., localStorage disabled, SSR issues)
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to load theme from localStorage:', error);
      }
      // Continue with default theme
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage?.setItem('terminal-theme', theme);
    } catch (error) {
      // Handle storage errors (quota exceeded, disabled localStorage, etc.)
      if (process.env.NODE_ENV === 'development') {
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
          console.warn('LocalStorage quota exceeded. Theme preference not saved.');
        } else {
          console.warn('Failed to save theme to localStorage:', error);
        }
      }
      // Continue without saving - theme will still work for current session
    }
  }, [theme]);

  const switchTheme = (newTheme: ThemeName) => {
    setTheme(newTheme);
  };

  const value = useMemo<ThemeContextValue>(() => ({ theme, switchTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
