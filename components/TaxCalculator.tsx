"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTaxStore, completeEuropeanTaxData } from "@/store/taxStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useCountries } from "@/hooks/useCountries";
import {
  availableCurrencies,
  currencyGroups,
  getCountryCurrency,
} from "@/utils/currencyMappings";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BarChart4, ArrowDownUp, PiggyBank, BadgePercent, ChevronRight } from "lucide-react";

interface TaxCalculatorProps {
  onCountrySelect: (country: string) => void;
  selectedCountry: string;
  useModals?: boolean;
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getExchangeRate = (from: string, to: string) => {
  // This is a simplified example - you should use a real exchange rate API
  const rates: Record<string, Record<string, number>> = {
    USD: { EUR: 0.92, GBP: 0.79, JPY: 148.41 },
    EUR: { USD: 1.09, GBP: 0.86, JPY: 161.32 },
    GBP: { USD: 1.27, EUR: 1.17, JPY: 187.58 },
    JPY: { USD: 0.0067, EUR: 0.0062, GBP: 0.0053 },
  };

  if (from === to) return 1;
  return rates[from]?.[to] ?? 1;
};

const getMonthlyAmount = (amount: number) => amount / 12;

const CurrencyDisplay = ({ code }: { code: string }) => {
  const currency = availableCurrencies.find((c) => c.value === code);
  return currency ? `${currency.value} (${currency.symbol})` : code;
};

export default function TaxCalculator({
  onCountrySelect,
  selectedCountry,
  useModals = false,
}: TaxCalculatorProps) {
  const [income, setIncome] = useState<string>("");
  const [localCurrency, setLocalCurrency] = useState<string>("USD");
  const [incomePeriod, setIncomePeriod] = useState<"annual" | "monthly">(
    "annual"
  );
  const { calculateTax } = useTaxStore();
  const countries = useCountries();
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
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  // Get country name from different sources, handling microstates/tax havens
  const selectedCountryName = useMemo(() => {
    // First try GeoJSON data (main countries)
    const countryFromGeoJSON = countries.find(
      (c) => c.properties.ISO_A2 === selectedCountry
    );
    
    if (countryFromGeoJSON) {
      return countryFromGeoJSON.properties.ADMIN;
    }
    
    // If not found in GeoJSON, check tax data (for microstates/tax havens)
    const countryFromTaxData = completeEuropeanTaxData.find(
      (c) => c.code === selectedCountry
    );
    
    if (countryFromTaxData) {
      return countryFromTaxData.name;
    }
    
    // Fallback
    return selectedCountry;
  }, [selectedCountry, countries]);

  const selectedCountryCurrency = useMemo(() => {
    const country = countries.find(
      (c) => c.properties.ISO_A2 === selectedCountry
    );
    
    // First try GeoJSON data
    if (country?.properties.ISO_A2) {
      return getCountryCurrency(country.properties.ISO_A2);
    }
    
    // If not found in GeoJSON, check tax data (for microstates/tax havens)
    const taxCountry = completeEuropeanTaxData.find(
      (c) => c.code === selectedCountry
    );
    
    if (taxCountry?.currency) {
      return taxCountry.currency;
    }
    
    // Fallback
    return "USD";
  }, [selectedCountry, countries]);

  const handleCalculate = () => {
    if (!income || !selectedCountry) return;

    const annualIncome =
      incomePeriod === "monthly" ? Number(income) * 12 : Number(income);

    try {
      const result = calculateTax(annualIncome, selectedCountry);
      setTaxResult(result);
      
      if (useModals) {
        setIsResultsOpen(true);
      }
    } catch (error) {
      console.error('Error calculating tax for country:', selectedCountry, error);
    }
  };

  const handleCountryChange = (value: string) => {
    onCountrySelect(value);
  };

  const afterTaxIncome = taxResult 
    ? Number(income) * (incomePeriod === "monthly" ? 12 : 1) - taxResult.totalTax 
    : 0;

  // Add debugging before the SelectContent
  console.log('Raw GeoJSON countries:', countries.map(c => ({ 
    iso: c.properties.ISO_A2,
    name: c.properties.ADMIN
  })));
  console.log('Raw European tax data:', completeEuropeanTaxData);

  const getCountryList = () => {
    // Create a Map to store unique countries by code
    const countryMap = new Map();
    const duplicateCodes = new Set();
    const codeCountryMap = new Map();

    // First pass: identify duplicate codes
    countries.forEach(country => {
      const code = country.properties?.ISO_A2;
      const name = country.properties?.ADMIN;
      
      if (code) {
        if (codeCountryMap.has(code)) {
          duplicateCodes.add(code);
          console.log(`Duplicate code found in GeoJSON: ${code}`);
          console.log('Previous country:', codeCountryMap.get(code));
          console.log('Current country:', name);
        } else {
          codeCountryMap.set(code, name);
        }
      }
    });
    
    completeEuropeanTaxData.forEach(country => {
      const code = country.code;
      const name = country.name;
      
      if (code) {
        if (codeCountryMap.has(code)) {
          duplicateCodes.add(code);
          console.log(`Duplicate code found in tax data: ${code}`);
          console.log('Previous country:', codeCountryMap.get(code));
          console.log('Current country:', name);
        } else {
          codeCountryMap.set(code, name);
        }
      }
    });

    console.log('All duplicate codes:', Array.from(duplicateCodes));
    
    // SKIP ALL countries with -99 code and create unique keys for other duplicates
    const countryNameSuffixMap = new Map();
    
    // Add GeoJSON countries with safe uniqueness handling
    countries
      .filter(country => {
        const code = country.properties?.ISO_A2;
        return code && 
          code.length === 2 && 
          /^[A-Z]{2}$/.test(code) &&
          code !== "-" &&
          code !== "-99"; // EXPLICITLY filter out -99 codes
      })
      .forEach(country => {
        const code = country.properties.ISO_A2;
        const name = country.properties.ADMIN;
        
        // For duplicate codes, create a truly unique key by combining code and name
        let uniqueKey = code;
        
        if (duplicateCodes.has(code)) {
          // Get a unique suffix for this country name
          let suffix = countryNameSuffixMap.get(name) || 0;
          countryNameSuffixMap.set(name, suffix + 1);
          
          // Create a unique key combining code, name and suffix if needed
          uniqueKey = `${code}_${name.replace(/\s+/g, '_')}${suffix > 0 ? `_${suffix}` : ''}`;
          
          console.log(`Created unique key for duplicate country: ${uniqueKey}`);
        }
        
        countryMap.set(uniqueKey, {
          code: code,
          name: name,
          uniqueKey: uniqueKey,
          source: 'geojson'
        });
      });

    // Add or override with European tax data with similar uniqueness handling
    completeEuropeanTaxData
      .filter(country => {
        const code = country.code;
        return code && 
          code.length === 2 && 
          /^[A-Z]{2}$/.test(code) &&
          code !== "-" &&
          code !== "-99"; // EXPLICITLY filter out -99 codes
      })
      .forEach(country => {
        const code = country.code;
        const name = country.name;
        
        // For duplicate codes, create a truly unique key by combining code and name
        let uniqueKey = code;
        
        if (duplicateCodes.has(code)) {
          // Get a unique suffix for this country name
          let suffix = countryNameSuffixMap.get(name) || 0;
          countryNameSuffixMap.set(name, suffix + 1);
          
          // Create a unique key combining code, name and suffix if needed
          uniqueKey = `${code}_${name.replace(/\s+/g, '_')}${suffix > 0 ? `_${suffix}` : ''}`;
          
          console.log(`Created unique key for duplicate country: ${uniqueKey}`);
        }
        
        countryMap.set(uniqueKey, {
          code: code,
          name: name,
          uniqueKey: uniqueKey,
          source: 'taxdata'
        });
      });
      
    // Filter out any remaining -99 codes (just to be extra safe)
    const finalCountries = Array.from(countryMap.values())
      .filter(country => country.code !== "-99");
      
    console.log('Final country count after filtering:', finalCountries.length);

    // Convert Map to array and sort
    return finalCountries
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(country => (
        <SelectItem
          key={country.uniqueKey}
          value={country.code}
        >
          {country.name}
        </SelectItem>
      ));
  };

  if (useModals) {
    return (
      <div className="h-full flex flex-col overflow-hidden">
        <Card className="flex-1 border border-primary/10">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span>Income Tax Calculator</span>
              {selectedCountry && (
                <span className="text-base font-normal text-muted-foreground">
                  {selectedCountryName}
                </span>
              )}
            </CardTitle>
            <CardDescription>Calculate income tax based on country rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={selectedCountry}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {getCountryList()}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="income">Income</Label>
                <div className="flex items-center space-x-2 text-sm">
                  <Button
                    variant={incomePeriod === "monthly" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setIncomePeriod("monthly")}
                    className="h-7"
                  >
                    Monthly
                  </Button>
                  <Button
                    variant={incomePeriod === "annual" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setIncomePeriod("annual")}
                    className="h-7"
                  >
                    Annual
                  </Button>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    id="income"
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder={`Enter ${incomePeriod} amount`}
                    className="w-full"
                  />
                </div>
                <Select value={localCurrency} onValueChange={setLocalCurrency}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue>
                      {localCurrency && (
                        <CurrencyDisplay code={localCurrency} />
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(currencyGroups).map(
                      ([group, currencies]: [string, string[]]) => (
                        <SelectGroup key={group}>
                          <SelectLabel className="capitalize">
                            {group.replace(/([A-Z])/g, " $1").trim()}
                          </SelectLabel>
                          {currencies.map((code: string) => {
                            const currency = availableCurrencies.find(
                              (c) => c.value === code
                            );
                            return currency ? (
                              <SelectItem key={code} value={code}>
                                {currency.label}
                              </SelectItem>
                            ) : null;
                          })}
                          <SelectSeparator />
                        </SelectGroup>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              onClick={handleCalculate} 
              className="w-full bg-gradient-to-r from-primary to-primary/80 button-hover"
              disabled={!income || !selectedCountry}
            >
              Calculate Tax
            </Button>
          </CardContent>
          
          {taxResult && (
            <CardFooter className="flex flex-col space-y-4 pt-2 pb-6 px-6">
              <div className="w-full bg-secondary/30 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tax</p>
                    <p className="text-xl font-bold">
                      {formatCurrency(taxResult.totalTax, selectedCountryCurrency)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(taxResult.effectiveRate * 100).toFixed(2)}% effective rate
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">After Tax</p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(afterTaxIncome, selectedCountryCurrency)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(afterTaxIncome / 12, selectedCountryCurrency)} monthly
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="w-full">
                <Dialog open={isBreakdownOpen} onOpenChange={setIsBreakdownOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full flex justify-between">
                      <span>View Tax Breakdown</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tax Breakdown</DialogTitle>
                      <DialogDescription>
                        Detailed breakdown of your tax calculation
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      {taxResult.breakdown.map((bracket, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 bg-muted rounded"
                        >
                          <span>
                            {bracket.bracket} ({(bracket.rate * 100).toFixed(0)}%)
                          </span>
                          <div className="text-right">
                            <span className="font-medium">
                              {formatCurrency(bracket.tax, selectedCountryCurrency)}
                            </span>
                            {localCurrency !== selectedCountryCurrency && (
                              <div className="text-sm text-muted-foreground">
                                ≈{" "}
                                {formatCurrency(
                                  bracket.tax *
                                    getExchangeRate(
                                      selectedCountryCurrency,
                                      localCurrency
                                    ),
                                  localCurrency
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {taxResult.socialSecurity && (
                        <div className="p-2 bg-muted rounded">
                          <div className="flex justify-between">
                            <span>Social Security</span>
                            <span className="font-medium">
                              {formatCurrency(
                                taxResult.socialSecurity,
                                selectedCountryCurrency
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardFooter>
          )}
        </Card>
        
        {/* Results Modal */}
        <Dialog open={isResultsOpen} onOpenChange={setIsResultsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tax Calculation Results</DialogTitle>
              <DialogDescription>
                Your tax calculation for {countries.find(c => c.properties.ISO_A2 === selectedCountry)?.properties.ADMIN || selectedCountry}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col items-center justify-center p-4 bg-secondary/30 rounded-lg">
                  <BadgePercent className="mb-2 text-primary h-8 w-8" />
                  <p className="text-sm text-muted-foreground mb-1">Tax Rate</p>
                  <p className="text-2xl font-bold">{(taxResult?.effectiveRate || 0) * 100}%</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-secondary/30 rounded-lg">
                  <PiggyBank className="mb-2 text-primary h-8 w-8" />
                  <p className="text-sm text-muted-foreground mb-1">Keep</p>
                  <p className="text-2xl font-bold">{(1 - (taxResult?.effectiveRate || 0)) * 100}%</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <ArrowDownUp className="mr-3 text-primary h-5 w-5" />
                    <div>
                      <p className="font-medium">Total Income</p>
                      <p className="text-sm text-muted-foreground">
                        {incomePeriod === 'monthly' ? 'Monthly × 12' : 'Annual'}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold">
                    {formatCurrency(Number(income) * (incomePeriod === 'monthly' ? 12 : 1), selectedCountryCurrency)}
                  </p>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <BarChart4 className="mr-3 text-red-500 h-5 w-5" />
                    <div>
                      <p className="font-medium">Total Tax</p>
                      <p className="text-sm text-muted-foreground">
                        {(taxResult?.effectiveRate || 0) * 100}% effective rate
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-red-500">
                    {formatCurrency(taxResult?.totalTax || 0, selectedCountryCurrency)}
                  </p>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <PiggyBank className="mr-3 text-green-500 h-5 w-5" />
                    <div>
                      <p className="font-medium">After-Tax Income</p>
                      <p className="text-sm text-muted-foreground">
                        What you take home
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(afterTaxIncome, selectedCountryCurrency)}
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={() => {
                    setIsResultsOpen(false);
                    setIsBreakdownOpen(true);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  View Detailed Breakdown
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Original implementation for non-modal version
  return (
    <div className="h-full">
      <div className="space-y-6 h-full flex flex-col">
        <Card className="flex-1">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span>Income Tax Calculator</span>
              {selectedCountry && (
                <span className="text-base font-normal text-muted-foreground">
                  {selectedCountryName}
                </span>
              )}
            </CardTitle>
            <CardDescription>Calculate income tax based on country rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={selectedCountry}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {getCountryList()}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="income">Income</Label>
                <div className="flex items-center space-x-2 text-sm">
                  <Button
                    variant={incomePeriod === "monthly" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setIncomePeriod("monthly")}
                    className="h-7"
                  >
                    Monthly
                  </Button>
                  <Button
                    variant={incomePeriod === "annual" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setIncomePeriod("annual")}
                    className="h-7"
                  >
                    Annual
                  </Button>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    id="income"
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder={`Enter ${incomePeriod} amount`}
                    className="w-full"
                  />
                </div>
                <Select value={localCurrency} onValueChange={setLocalCurrency}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue>
                      {localCurrency && (
                        <CurrencyDisplay code={localCurrency} />
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(currencyGroups).map(
                      ([group, currencies]: [string, string[]]) => (
                        <SelectGroup key={group}>
                          <SelectLabel className="capitalize">
                            {group.replace(/([A-Z])/g, " $1").trim()}
                          </SelectLabel>
                          {currencies.map((code: string) => {
                            const currency = availableCurrencies.find(
                              (c) => c.value === code
                            );
                            return currency ? (
                              <SelectItem key={code} value={code}>
                                {currency.label}
                              </SelectItem>
                            ) : null;
                          })}
                          <SelectSeparator />
                        </SelectGroup>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="h-1" />
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
                <p>
                  Please select a country and enter your income to see tax
                  calculations
                </p>
              </div>
            ) : !taxResult ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Click &ldquo;Calculate Tax&rdquo; to see your tax breakdown</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Tax ({selectedCountryCurrency})
                    </p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(
                        taxResult.totalTax,
                        selectedCountryCurrency
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Monthly:{" "}
                      {formatCurrency(
                        getMonthlyAmount(taxResult.totalTax),
                        selectedCountryCurrency
                      )}
                    </p>
                    {localCurrency !== selectedCountryCurrency && (
                      <>
                        <p className="text-sm text-muted-foreground mt-1">
                          ≈{" "}
                          {formatCurrency(
                            taxResult.totalTax *
                              getExchangeRate(
                                selectedCountryCurrency,
                                localCurrency
                              ),
                            localCurrency
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Monthly: ≈{" "}
                          {formatCurrency(
                            getMonthlyAmount(
                              taxResult.totalTax *
                                getExchangeRate(
                                  selectedCountryCurrency,
                                  localCurrency
                                )
                            ),
                            localCurrency
                          )}
                        </p>
                      </>
                    )}
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

                {/* Add new section for After-Tax Income */}
                <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-secondary rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      After-Tax Income ({selectedCountryCurrency})
                    </p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(
                        Number(income) * (incomePeriod === "monthly" ? 12 : 1) -
                          taxResult.totalTax,
                        selectedCountryCurrency
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Monthly:{" "}
                      {formatCurrency(
                        getMonthlyAmount(
                          Number(income) *
                            (incomePeriod === "monthly" ? 12 : 1) -
                            taxResult.totalTax
                        ),
                        selectedCountryCurrency
                      )}
                    </p>
                    {localCurrency !== selectedCountryCurrency && (
                      <>
                        <p className="text-sm text-muted-foreground mt-1">
                          ≈{" "}
                          {formatCurrency(
                            (Number(income) *
                              (incomePeriod === "monthly" ? 12 : 1) -
                              taxResult.totalTax) *
                              getExchangeRate(
                                selectedCountryCurrency,
                                localCurrency
                              ),
                            localCurrency
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Monthly: ≈{" "}
                          {formatCurrency(
                            getMonthlyAmount(
                              (Number(income) *
                                (incomePeriod === "monthly" ? 12 : 1) -
                                taxResult.totalTax) *
                                getExchangeRate(
                                  selectedCountryCurrency,
                                  localCurrency
                                )
                            ),
                            localCurrency
                          )}
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Take-Home Percentage
                    </p>
                    <p className="text-2xl font-bold">
                      {(100 - taxResult.effectiveRate * 100).toFixed(2)}%
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
                      <div className="text-right">
                        <span className="font-medium">
                          {formatCurrency(bracket.tax, selectedCountryCurrency)}
                        </span>
                        {localCurrency !== selectedCountryCurrency && (
                          <div className="text-sm text-muted-foreground">
                            ≈{" "}
                            {formatCurrency(
                              bracket.tax *
                                getExchangeRate(
                                  selectedCountryCurrency,
                                  localCurrency
                                ),
                              localCurrency
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {taxResult.socialSecurity && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Social Security</h3>
                    <div className="p-2 bg-muted rounded">
                      <div className="text-right">
                        <span className="font-medium">
                          {formatCurrency(
                            taxResult.socialSecurity,
                            selectedCountryCurrency
                          )}
                        </span>
                        {localCurrency !== selectedCountryCurrency && (
                          <div className="text-sm text-muted-foreground">
                            ≈{" "}
                            {formatCurrency(
                              taxResult.socialSecurity *
                                getExchangeRate(
                                  selectedCountryCurrency,
                                  localCurrency
                                ),
                              localCurrency
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 p-4 bg-muted rounded">
                  <p className="text-sm text-muted-foreground">
                    * Exchange rates are approximate and updated daily. For
                    accurate conversions, please verify with your financial
                    institution.
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
