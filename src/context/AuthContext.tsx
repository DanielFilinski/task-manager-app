import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType, LoginCredentials } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials for demo
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = '1234';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (credentials: LoginCredentials): boolean => {
    if (
      credentials.username === VALID_USERNAME &&
      credentials.password === VALID_PASSWORD
    ) {
      setUser({
        username: credentials.username,
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

