"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import TaxCalculator from "@/components/TaxCalculator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const WorldMap = dynamic(() => import("@/components/WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  ),
});

export default function CalculatorPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-6 space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Personal Finance Assistant
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Calculate your taxes and explore financial information worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-full">
              <TaxCalculator
                onCountrySelect={handleCountrySelect}
                selectedCountry={selectedCountry}
              />
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
      </main>

      <Footer />
    </div>
  );
}
