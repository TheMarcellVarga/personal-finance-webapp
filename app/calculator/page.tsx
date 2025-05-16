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
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
    </div>
  ),
});

export default function CalculatorPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-background to-background dark:from-indigo-950/20 dark:via-background dark:to-background">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <Header 
        pageTitle="Tax Calculator"
        actionButton={
          <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20">
                <InfoIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md border border-indigo-200/30 dark:border-indigo-700/30 bg-gradient-to-br from-white to-indigo-50/30 dark:from-gray-900 dark:to-indigo-950/30">
              <DialogHeader>
                <DialogTitle className="text-indigo-700 dark:text-indigo-300">How to Use the Tax Calculator</DialogTitle>
                <DialogDescription className="dark:text-gray-400">
                  Learn how to make the most of our tax calculator tool.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-indigo-700 dark:text-indigo-300">Select a country</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Either select a country from the dropdown or by clicking on the interactive map.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-indigo-700 dark:text-indigo-300">Enter your income</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enter your income amount and select whether it's monthly or annual.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-indigo-700 dark:text-indigo-300">View results</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    See your tax breakdown, effective rate, and take-home pay in your preferred currency.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mt-20 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Global Tax Calculator
          </h1>
        </div>
        <div className="flex-1 overflow-hidden p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <TaxCalculator
              onCountrySelect={handleCountrySelect}
              selectedCountry={selectedCountry}
              useModals={true}
            />
            <div className="h-full bg-gradient-to-br from-indigo-50/20 to-purple-50/20 dark:from-indigo-900/10 dark:to-purple-900/10 border border-indigo-200/30 dark:border-indigo-700/30 rounded-lg overflow-hidden shadow-lg">
              <WorldMap
                selectedCountry={selectedCountry}
                onCountryClick={handleCountrySelect}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Simplified footer for app layout */}
      <div className="py-3 px-6 border-t border-indigo-200/30 dark:border-indigo-800/30 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/50 dark:to-purple-950/50 text-center text-sm text-gray-600 dark:text-gray-400">
        © 2024 FinAdventurer. All rights reserved.
      </div>
    </div>
  );
}
