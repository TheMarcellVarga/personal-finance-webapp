"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTaxStore } from "@/store/taxStore";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCountries } from "@/hooks/useCountries";
import { getCountryCurrency } from "@/utils/currencyMappings";
import { LineChart, Calculator, ArrowRight, PiggyBank, BadgePercent } from "lucide-react";

export default function RetirementCalculator() {
  const countries = useCountries();
  const { selectedCountry, setSelectedCountry, calculateTax } = useTaxStore();
  
  // Form state
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [annualContribution, setAnnualContribution] = useState<number>(10000);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(7);
  const [inflationRate, setInflationRate] = useState<number>(2);
  const [currency, setCurrency] = useState<string>("USD");
  const [countryCode, setCountryCode] = useState<string>("US");
  const [annualIncome, setAnnualIncome] = useState<number>(80000);
  
  // Results state
  const [results, setResults] = useState<{
    projectedSavings: number;
    contributionTotal: number;
    interestEarned: number;
    taxImpact: number;
    effectiveTaxRate: number;
    monthlyRetirementIncome: number;
    yearlyData: Array<{
      age: number;
      savingsBalance: number;
      annualContribution: number;
      annualReturn: number;
      taxPaid: number;
    }>;
  } | null>(null);

  // Handle country change
  useEffect(() => {
    if (selectedCountry) {
      const countryCurrency = getCountryCurrency(selectedCountry);
      if (countryCurrency) {
        setCurrency(countryCurrency);
      }
      setCountryCode(selectedCountry);
    }
  }, [selectedCountry]);

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(rate / 100);
  };

  const calculateResults = () => {
    const yearsToRetirement = retirementAge - currentAge;
    
    // Initialize data
    let balance = currentSavings;
    let totalContributions = currentSavings;
    let yearlyData = [];
    let taxPaidTotal = 0;
    
    // Calculate yearly growth
    for (let year = 1; year <= yearsToRetirement; year++) {
      const currentAgeInYear = currentAge + year;
      const inflationAdjustedContribution = annualContribution * Math.pow(1 + inflationRate / 100, year);
      const investmentReturn = balance * (expectedReturnRate / 100);
      
      // Calculate taxes on investment returns
      // This is simplified - in reality, tax implications would be more complex
      const taxResult = calculateTax(investmentReturn, countryCode);
      const taxPaid = taxResult.totalTax;
      taxPaidTotal += taxPaid;
      
      // Update balance with new contribution and return minus taxes
      balance = balance + inflationAdjustedContribution + investmentReturn - taxPaid;
      totalContributions += inflationAdjustedContribution;
      
      yearlyData.push({
        age: currentAgeInYear,
        savingsBalance: balance,
        annualContribution: inflationAdjustedContribution,
        annualReturn: investmentReturn,
        taxPaid: taxPaid
      });
    }
    
    // Calculate monthly retirement income (4% withdrawal rule is common)
    const monthlyRetirementIncome = (balance * 0.04) / 12;
    
    // Effective tax rate across the entire investment period
    const totalReturns = balance - totalContributions;
    const effectiveTaxRate = totalReturns > 0 ? (taxPaidTotal / totalReturns) * 100 : 0;
    
    setResults({
      projectedSavings: balance,
      contributionTotal: totalContributions,
      interestEarned: balance - totalContributions,
      taxImpact: taxPaidTotal,
      effectiveTaxRate,
      monthlyRetirementIncome,
      yearlyData,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentAge">Current Age</Label>
            <Input
              id="currentAge"
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="retirementAge">Retirement Age</Label>
            <Input
              id="retirementAge"
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="currentSavings">Current Savings</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {currency}
            </span>
            <Input
              id="currentSavings"
              type="number"
              className="pl-12"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="annualContribution">Annual Contribution</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {currency}
            </span>
            <Input
              id="annualContribution"
              type="number"
              className="pl-12"
              value={annualContribution}
              onChange={(e) => setAnnualContribution(Number(e.target.value))}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expectedReturnRate">Expected Return (%)</Label>
            <Input
              id="expectedReturnRate"
              type="number"
              step="0.1"
              value={expectedReturnRate}
              onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
            <Input
              id="inflationRate"
              type="number"
              step="0.1"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">Country for Tax Calculations</Label>
          <Select value={countryCode} onValueChange={handleCountryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.properties.ISO_A2} value={country.properties.ISO_A2}>
                  {country.properties.NAME}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={calculateResults}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Retirement Savings
        </Button>
      </div>
      
      <div className="space-y-6">
        {results ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <PiggyBank className="mx-auto h-8 w-8 text-primary" />
                    <h3 className="mt-2 font-medium text-muted-foreground">Projected Savings</h3>
                    <p className="text-2xl font-bold">{formatCurrency(results.projectedSavings)}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <BadgePercent className="mx-auto h-8 w-8 text-primary" />
                    <h3 className="mt-2 font-medium text-muted-foreground">Tax Impact</h3>
                    <p className="text-2xl font-bold">{formatCurrency(results.taxImpact)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPercentage(results.effectiveTaxRate)} effective rate
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Retirement Income</span>
                    <span className="font-medium">{formatCurrency(results.monthlyRetirementIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Contributions</span>
                    <span className="font-medium">{formatCurrency(results.contributionTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Interest Earned</span>
                    <span className="font-medium">{formatCurrency(results.interestEarned)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Years to Retirement</span>
                    <span className="font-medium">{retirementAge - currentAge}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-sm text-muted-foreground">
              <p>
                <strong>Note:</strong> This is a simplified calculation. Actual results may vary based on market performance, 
                changing tax laws, and other factors. Consider consulting a financial advisor for personalized advice.
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <Calculator className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No Results Yet</h3>
              <p className="mt-2 text-muted-foreground">
                Fill in your details and calculate to see your retirement projections with
                tax implications based on your selected country.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 