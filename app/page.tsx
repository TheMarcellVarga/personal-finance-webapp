"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import TaxCalculator from "@/components/TaxCalculator";

// Dynamically import WorldMap to avoid SSR issues
const WorldMap = dynamic(() => import("@/components/WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  ),
});

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Personal Finance Assistant
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Calculate your taxes and explore financial information worldwide
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        <div className="h-full">
          <TaxCalculator onCountrySelect={handleCountrySelect} />
        </div>
        <div className="h-full">
          <WorldMap
            isDarkMode={isDarkMode}
            selectedCountry={selectedCountry}
            onCountryClick={handleCountrySelect}
          />
        </div>
      </div>
    </div>
  );
}
