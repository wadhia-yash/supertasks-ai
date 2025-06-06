"use client";

import type { UserProfile, UserRole } from '@/types';
import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  taskLimit: number;
  loginAsGuest: () => void;
  loginAsAuthenticated: () => void;
  loginAsSubscribed: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_LIMIT = 5;
const AUTHENTICATED_LIMIT = 7;
const SUBSCRIBED_LIMIT = Infinity;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [taskLimit, setTaskLimit] = useState(GUEST_LIMIT);

  useEffect(() => {
    // Simulate loading user from storage or API
    const storedUserRole = localStorage.getItem('prioritizeit-user-role') as UserRole | null;
    if (storedUserRole) {
      updateUserRole(storedUserRole);
    } else {
      loginAsGuest(); // Default to guest
    }
    setLoading(false);
  }, []);

  const updateUserRole = (role: UserRole) => {
    const newUser: UserProfile = { role };
    if (role === 'authenticated') {
      newUser.email = 'user@example.com';
      newUser.displayName = 'Authenticated User';
      setTaskLimit(AUTHENTICATED_LIMIT);
    } else if (role === 'subscribed') {
      newUser.email = 'subscriber@example.com';
      newUser.displayName = 'Subscribed User';
      setTaskLimit(SUBSCRIBED_LIMIT);
    } else { // guest
      setTaskLimit(GUEST_LIMIT);
    }
    setUser(newUser);
    localStorage.setItem('prioritizeit-user-role', role);
  };

  const loginAsGuest = () => updateUserRole('guest');
  const loginAsAuthenticated = () => updateUserRole('authenticated');
  const loginAsSubscribed = () => updateUserRole('subscribed');
  
  const logout = () => {
    localStorage.removeItem('prioritizeit-user-role');
    loginAsGuest(); // Revert to guest after logout
  };

  return (
    <AuthContext.Provider value={{ user, loading, taskLimit, loginAsGuest, loginAsAuthenticated, loginAsSubscribed, logout }}>
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
