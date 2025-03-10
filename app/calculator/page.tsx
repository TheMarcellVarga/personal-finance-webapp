"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import TaxCalculator from "@/components/TaxCalculator";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const WorldMap = dynamic(() => import("@/components/WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  ),
});

export default function CalculatorPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        pageTitle="Tax Calculator"
        actionButton={
          <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <InfoIcon className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>How to Use the Tax Calculator</DialogTitle>
                <DialogDescription>
                  Learn how to make the most of our tax calculator tool.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Select a country</h3>
                  <p className="text-sm text-muted-foreground">
                    Either select a country from the dropdown or by clicking on the interactive map.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Enter your income</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter your income amount and select whether it's monthly or annual.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">View results</h3>
                  <p className="text-sm text-muted-foreground">
                    See your tax breakdown, effective rate, and take-home pay in your preferred currency.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <TaxCalculator
              onCountrySelect={handleCountrySelect}
              selectedCountry={selectedCountry}
              useModals={true}
            />
            <div className="h-full bg-secondary/10 rounded-lg overflow-hidden">
              <WorldMap
                isDarkMode={isDarkMode}
                selectedCountry={selectedCountry}
                onCountryClick={handleCountrySelect}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Simplified footer for app layout */}
      <div className="py-3 px-6 border-t border-primary/10 bg-background text-center text-sm text-muted-foreground">
        © 2024 FinAdventurer. All rights reserved.
      </div>
    </div>
  );
}
