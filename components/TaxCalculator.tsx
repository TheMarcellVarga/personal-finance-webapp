"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTaxStore } from "@/store/taxStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCountries } from "@/hooks/useCountries";

interface TaxCalculatorProps {
  onCountrySelect: (country: string) => void;
}

export default function TaxCalculator({ onCountrySelect }: TaxCalculatorProps) {
  const [income, setIncome] = useState<string>("");
  const { calculateTax } = useTaxStore();
  const countries = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [taxResult, setTaxResult] = useState<{
    totalTax: number;
    effectiveRate: number;
    breakdown: Array<{
      bracket: string;
      tax: number;
      rate: number;
    }>;
    socialSecurity?: number;
  } | null>(null);

  const handleCalculate = () => {
    if (!income || !selectedCountry) return;

    const result = calculateTax(Number(income), selectedCountry);
    setTaxResult(result);
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    onCountrySelect(value);
  };

  return (
    <div className="h-full"> {/* Changed from w-full h-full max-w-2xl mx-auto space-y-6 */}
      <div className="space-y-6 h-full flex flex-col">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Income Tax Calculator</CardTitle>
          <CardDescription>
            Calculate your income tax based on your country's tax brackets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select value={selectedCountry} onValueChange={handleCountryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries
                  // Filter out invalid or duplicate ISO codes
                  .filter((country, index, self) => 
                    country.properties.ISO_A2 !== '-' && 
                    country.properties.ISO_A2 !== '-99' &&
                    index === self.findIndex(c => c.properties.ISO_A2 === country.properties.ISO_A2)
                  )
                  // Sort by country name
                  .sort((a, b) => a.properties.ADMIN.localeCompare(b.properties.ADMIN))
                  .map((country) => (
                    <SelectItem 
                      key={country.properties.ISO_A2} 
                      value={country.properties.ISO_A2}
                    >
                      {country.properties.ADMIN}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="income">Annual Income</Label>
            <Input
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter your annual income"
            />
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Calculate Tax
          </Button>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Tax Calculation Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selectedCountry || !income ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Please select a country and enter your income to see tax calculations</p>
            </div>
          ) : !taxResult ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Click "Calculate Tax" to see your tax breakdown</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tax</p>
                  <p className="text-2xl font-bold">
                    {taxResult.totalTax.toLocaleString("en-US", {
                      style: "currency",
                      currency:
                        countries.find((c) => c.properties.ISO_A2 === selectedCountry)
                          ?.properties.currency || "USD",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Effective Tax Rate
                  </p>
                  <p className="text-2xl font-bold">
                    {(taxResult.effectiveRate * 100).toFixed(2)}%
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Tax Breakdown</h3>
                {taxResult.breakdown.map((bracket, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-muted rounded"
                  >
                    <span>
                      {bracket.bracket} ({(bracket.rate * 100).toFixed(0)}%)
                    </span>
                    <span className="font-medium">
                      {bracket.tax.toLocaleString("en-US", {
                        style: "currency",
                        currency:
                          countries.find((c) => c.properties.ISO_A2 === selectedCountry)
                            ?.properties.currency || "USD",
                      })}
                    </span>
                  </div>
                ))}
              </div>

              {taxResult.socialSecurity && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Social Security</h3>
                  <div className="p-2 bg-muted rounded">
                    <span className="font-medium">
                      {taxResult.socialSecurity.toLocaleString("en-US", {
                        style: "currency",
                        currency:
                          countries.find((c) => c.properties.ISO_A2 === selectedCountry)
                            ?.properties.currency || "USD",
                      })}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  </div>
  );
}
