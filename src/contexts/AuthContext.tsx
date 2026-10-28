import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => void;
  signInWithSocial: (provider: 'google' | 'facebook' | 'github') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isAuthenticated = !!user;

  const signIn = async (email: string, _password: string) => {
    // Mock authentication - replace with real implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      email,
      name: email.split('@')[0],
    });
    setShowAuthModal(false);
  };

  const signUp = async (email: string, _password: string, name?: string) => {
    // Mock authentication - replace with real implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      email,
      name: name || email.split('@')[0],
    });
    setShowAuthModal(false);
  };

  const signOut = () => {
    setUser(null);
  };

  const signInWithSocial = async (provider: 'google' | 'facebook' | 'github') => {
    // Mock social authentication - replace with real implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      email: `user@${provider}.com`,
      name: `${provider} User`,
    });
    setShowAuthModal(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      showAuthModal,
      setShowAuthModal,
      signIn,
      signUp,
      signOut,
      signInWithSocial,
    }}>
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