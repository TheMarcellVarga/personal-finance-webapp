"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    // Check local storage
    const storedTheme = localStorage.getItem("theme");
    const initialDarkMode = storedTheme === "dark" || 
      (storedTheme === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDarkMode(initialDarkMode);
    
    // Apply initial theme to document
    if (initialDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme function
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newDarkMode = !prev;
      
      // Update document class
      if (newDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      // Save to local storage
      localStorage.setItem("theme", newDarkMode ? "dark" : "light");
      
      return newDarkMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
} 