'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTaxStore } from '@/store/taxStore'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface TaxCalculatorProps {
  onCountrySelect: (country: string) => void;
}

// components/TaxCalculator.tsx (continued)

export default function TaxCalculator({ onCountrySelect }: TaxCalculatorProps) {
    const [income, setIncome] = useState<string>('')
    const { countries, calculateTax } = useTaxStore()
    const [selectedCountry, setSelectedCountry] = useState<string>('')
    const [taxResult, setTaxResult] = useState<{
      totalTax: number;
      effectiveRate: number;
      breakdown: Array<{
        bracket: string;
        tax: number;
        rate: number;
      }>;
      socialSecurity?: number;
    } | null>(null)
  
    const handleCalculate = () => {
      if (!income || !selectedCountry) return;
      
      const result = calculateTax(Number(income), selectedCountry);
      setTaxResult(result);
    }
  
    const handleCountryChange = (value: string) => {
      setSelectedCountry(value);
      onCountrySelect(value);
    }
  
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <Card>
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
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
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
  
        {taxResult && (
          <Card>
            <CardHeader>
              <CardTitle>Tax Calculation Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tax</p>
                  <p className="text-2xl font-bold">
                    {taxResult.totalTax.toLocaleString('en-US', {
                      style: 'currency',
                      currency: countries.find(c => c.code === selectedCountry)?.currency || 'USD'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Effective Tax Rate</p>
                  <p className="text-2xl font-bold">
                    {(taxResult.effectiveRate * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
  
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Tax Breakdown</h3>
                {taxResult.breakdown.map((bracket, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>
                      {bracket.bracket} ({(bracket.rate * 100).toFixed(0)}%)
                    </span>
                    <span className="font-medium">
                      {bracket.tax.toLocaleString('en-US', {
                        style: 'currency',
                        currency: countries.find(c => c.code === selectedCountry)?.currency || 'USD'
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
                      {taxResult.socialSecurity.toLocaleString('en-US', {
                        style: 'currency',
                        currency: countries.find(c => c.code === selectedCountry)?.currency || 'USD'
                      })}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    )
  }
  