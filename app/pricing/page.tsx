"use client";

import { useState } from 'react';
import { Pricing } from '@/components/Pricing';
import { Header } from '@/components/Header';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-background to-background dark:from-indigo-950/20 dark:via-background dark:to-background">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <Header pageTitle="Pricing" />
      <div className="container mx-auto px-4 py-16 pt-20 relative z-10">
        <Pricing />
      </div>
    </div>
  );
} 