// components/TaxCalculator.tsx
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TaxCalculatorProps {
  onCountrySelect: (country: string) => void
}

export default function TaxCalculator({ onCountrySelect }: TaxCalculatorProps) {
  const [income, setIncome] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [calculatedTax, setCalculatedTax] = useState<number | null>(null)

  const calculateTax = () => {
    // This is a simplified tax calculation - you'll need to implement proper tax brackets
    const incomeNum = parseFloat(income)
    if (isNaN(incomeNum)) return

    let taxRate = 0
    switch (country) {
      case 'US':
        taxRate = 0.25
        break
      case 'UK':
        taxRate = 0.20
        break
      // Add more countries and their tax rates
      default:
        taxRate = 0.15
    }

    setCalculatedTax(incomeNum * taxRate)
  }

  return (
    <div className="p-6 bg-card rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Tax Calculator</h2>
      
      <div className="space-y-4">
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

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select 
            onValueChange={(value) => {
              setCountry(value)
              onCountrySelect(value)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="UK">United Kingdom</SelectItem>
              <SelectItem value="DE">Germany</SelectItem>
              {/* Add more countries */}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={calculateTax} className="w-full">
          Calculate Tax
        </Button>

        {calculatedTax !== null && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <p className="text-lg font-semibold">
              Estimated Tax: {calculatedTax.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
