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

  // Read preferred theme after mount to avoid hydration mismatches
  useEffect(() => {
    try {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      const stored = window.localStorage?.getItem('terminal-theme') as ThemeName | null;
      const initial: ThemeName = stored ?? (prefersDark ? 'matrix' : 'dark');
      if (initial !== theme) {
        setTheme(initial);
      }
    } catch {
      // ignore
    }
    // We intentionally run this only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      window.localStorage?.setItem('terminal-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const switchTheme = (newTheme: ThemeName) => {
    setTheme(newTheme);
  };

  const value = useMemo<ThemeContextValue>(() => ({ theme, switchTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
