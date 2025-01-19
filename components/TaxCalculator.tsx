"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTaxStore } from "@/store/taxStore";
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
} from "@/components/ui/card";
import { useCountries } from "@/hooks/useCountries";
import {
  availableCurrencies,
  currencyGroups,
  getCountryCurrency,
} from "@/utils/currencyMappings";
interface TaxCalculatorProps {
  onCountrySelect: (country: string) => void;
  selectedCountry: string;
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

  const selectedCountryCurrency = useMemo(() => {
    const country = countries.find(
      (c) => c.properties.ISO_A2 === selectedCountry
    );
    return getCountryCurrency(country?.properties.ISO_A2 ?? "US");
  }, [selectedCountry, countries]);

  const handleCalculate = () => {
    if (!income || !selectedCountry) return;

    const annualIncome =
      incomePeriod === "monthly" ? Number(income) * 12 : Number(income);

    const result = calculateTax(annualIncome, selectedCountry);
    setTaxResult(result);
  };

  const handleCountryChange = (value: string) => {
    onCountrySelect(value);
  };

  return (
    <div className="h-full">
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
              <Select
                value={selectedCountry}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries
                    .filter(
                      (country, index, self) =>
                        country.properties.ISO_A2 !== "-" &&
                        country.properties.ISO_A2 !== "-99" &&
                        index ===
                          self.findIndex(
                            (c) =>
                              c.properties.ISO_A2 === country.properties.ISO_A2
                          )
                    )
                    .sort((a, b) =>
                      a.properties.ADMIN.localeCompare(b.properties.ADMIN)
                    )
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
                <p>Click "Calculate Tax" to see your tax breakdown</p>
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
