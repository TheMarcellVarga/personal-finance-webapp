"use client";

import { useState } from 'react';
import { Pricing } from '@/components/Pricing';
import { Header } from '@/components/Header';

export default function PricingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        pageTitle="Pricing" 
      />
      <div className="container mx-auto px-4 py-16 pt-20">
        <Pricing />
      </div>
    </div>
  );
} 