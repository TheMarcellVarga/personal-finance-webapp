import { create } from "zustand";

import { westernEuropeTax } from '../data/tax-brackets/westernEuropeTax';
import { northernEuropeTax } from '../data/tax-brackets/northernEuropeTax';
import { southernEuropeTax } from '../data/tax-brackets/southernEuropeTax';
import { easternEuropeTax } from '../data/tax-brackets/easternEuropeTax';
import { balticStatesTax } from '../data/tax-brackets/balticStatesTax';
import { otherEuropeanTax } from '../data/tax-brackets/otherEuropeanTax';
import { additionalEuropeanTax } from '../data/tax-brackets/additionalEuropeanTax';
import { missingEuropeanTax } from '../data/tax-brackets/missingEuropeanTax';
import { taxHavensTax } from '../data/tax-brackets/taxHavensTax';

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
  deduction?: number;
}

interface CountryTax {
  name: string;
  code: string;
  currency: string;
  brackets: TaxBracket[];
  standardDeduction?: number;
  socialSecurity?: {
    rate: number;
    cap?: number;
  };
}

interface TaxStore {
  countries: CountryTax[];
  selectedCountry: string | null;
  setSelectedCountry: (code: string) => void;
  getTaxBrackets: (code: string) => TaxBracket[];
  calculateTax: (
    income: number,
    countryCode: string
  ) => {
    totalTax: number;
    effectiveRate: number;
    breakdown: Array<{
      bracket: string;
      tax: number;
      rate: number;
    }>;
    socialSecurity?: number;
  };
}

export const completeEuropeanTaxData = [
  ...westernEuropeTax,
  ...northernEuropeTax,
  ...southernEuropeTax,
  ...easternEuropeTax,
  ...balticStatesTax,
  ...otherEuropeanTax,
  ...additionalEuropeanTax,
  ...missingEuropeanTax,
  ...taxHavensTax,
];

export const useTaxStore = create<TaxStore>((set, get) => ({
  countries: completeEuropeanTaxData,
  selectedCountry: null,
  setSelectedCountry: (code) => set({ selectedCountry: code }),
  getTaxBrackets: (code) => {
    const country = get().countries.find((c) => c.code === code);
    return country?.brackets || [];
  },
  calculateTax: (income: number, countryCode: string) => {
    const country = get().countries.find((c) => c.code === countryCode);
    if (!country) {
      return {
        totalTax: 0,
        effectiveRate: 0,
        breakdown: [],
      };
    }

    let taxableIncome = income;
    if (country.standardDeduction) {
      taxableIncome = Math.max(0, income - country.standardDeduction);
    }

    let totalTax = 0;
    const breakdown: Array<{ bracket: string; tax: number; rate: number }> = [];

    for (let i = 0; i < country.brackets.length; i++) {
      const bracket = country.brackets[i];
      const nextBracket = country.brackets[i + 1];

      const bracketMin = Math.max(bracket.min, 0);
      const bracketMax = bracket.max;
      const bracketIncome = Math.min(
        Math.max(taxableIncome - bracketMin, 0),
        bracketMax - bracketMin
      );

      const bracketTax = bracketIncome * bracket.rate;
      if (bracketTax > 0) {
        breakdown.push({
          bracket: `${bracketMin.toLocaleString()} - ${
            bracketMax === Infinity ? "∞" : bracketMax.toLocaleString()
          }`,
          tax: bracketTax,
          rate: bracket.rate,
        });
        totalTax += bracketTax;
      }
    }

    let socialSecurity;
    if (country.socialSecurity) {
      const ssIncome = country.socialSecurity.cap
        ? Math.min(income, country.socialSecurity.cap)
        : income;
      socialSecurity = ssIncome * country.socialSecurity.rate;
    }

    return {
      totalTax,
      effectiveRate: totalTax / income,
      breakdown,
      socialSecurity,
    };
  },
}));
