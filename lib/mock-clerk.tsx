'use client';

import React, { createContext } from 'react';

// Create a mock Clerk context
export const MockClerkContext = createContext({
  user: {
    id: 'user_mock123',
    fullName: 'Demo User',
    primaryEmailAddress: 'demo@example.com',
  },
  isSignedIn: true,
  isLoaded: true,
});

// Mock ClerkProvider component
export function MockClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <MockClerkContext.Provider 
      value={{
        user: {
          id: 'user_mock123',
          fullName: 'Demo User',
          primaryEmailAddress: 'demo@example.com',
        },
        isSignedIn: true,
        isLoaded: true,
      }}
    >
      {children}
    </MockClerkContext.Provider>
  );
}

// Mock auth hooks
export function useAuth() {
  return { userId: 'user_mock123' };
}

// Mock user hook
export function useUser() {
  return { 
    isSignedIn: true,
    isLoaded: true,
    user: {
      id: 'user_mock123',
      fullName: 'Demo User',
      primaryEmailAddress: {
        emailAddress: 'demo@example.com'
      }
    }
  };
}

export function SignedIn({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  return null; // Hide signed-out content
}

export function UserButton() {
  return <div className="rounded-full bg-gray-300 w-8 h-8 flex items-center justify-center">DU</div>;
}

export function SignInButton({ children }: { children: React.ReactNode }) {
  return <div className="cursor-pointer">{children}</div>;
}

export function SignIn() {
  return <div className="p-4 border rounded">Mock Sign In Form</div>;
} 