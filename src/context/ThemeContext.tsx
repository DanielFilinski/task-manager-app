import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeColors {
  // Backgrounds
  background: string;
  cardBackground: string;
  headerBackground: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  
  // UI colors
  primary: string;
  primaryDark: string;
  error: string;
  success: string;
  border: string;
  
  // Input colors
  inputBackground: string;
  inputBorder: string;
  inputPlaceholder: string;
  
  // Modal
  modalOverlay: string;
  
  // Button
  buttonSecondaryBg: string;
  buttonSecondaryText: string;
}

const lightTheme: ThemeColors = {
  // Backgrounds
  background: '#F2F2F7',
  cardBackground: '#FFFFFF',
  headerBackground: '#FFFFFF',
  
  // Text colors
  textPrimary: '#1C1C1E',
  textSecondary: '#8E8E93',
  textTertiary: '#C7C7CC',
  
  // UI colors
  primary: '#007AFF',
  primaryDark: '#0051D5',
  error: '#FF3B30',
  success: '#34C759',
  border: '#E5E5EA',
  
  // Input colors
  inputBackground: '#FFFFFF',
  inputBorder: '#E5E5EA',
  inputPlaceholder: '#C7C7CC',
  
  // Modal
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
  
  // Button
  buttonSecondaryBg: '#F2F2F7',
  buttonSecondaryText: '#007AFF',
};

const darkTheme: ThemeColors = {
  // Backgrounds
  background: '#000000',
  cardBackground: '#1C1C1E',
  headerBackground: '#1C1C1E',
  
  // Text colors
  textPrimary: '#FFFFFF',
  textSecondary: '#8E8E93',
  textTertiary: '#48484A',
  
  // UI colors
  primary: '#0A84FF',
  primaryDark: '#0970E0',
  error: '#FF453A',
  success: '#32D74B',
  border: '#38383A',
  
  // Input colors
  inputBackground: '#2C2C2E',
  inputBorder: '#38383A',
  inputPlaceholder: '#8E8E93',
  
  // Modal
  modalOverlay: 'rgba(0, 0, 0, 0.75)',
  
  // Button
  buttonSecondaryBg: '#2C2C2E',
  buttonSecondaryText: '#0A84FF',
};

interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@task_manager_theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeMode>('auto');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference on mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'auto')) {
        setThemeState(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setTheme = async (newTheme: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  // Determine if dark mode is active
  const isDark = theme === 'auto' 
    ? systemColorScheme === 'dark'
    : theme === 'dark';

  const colors = isDark ? darkTheme : lightTheme;

  // Don't render children until theme is loaded
  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

