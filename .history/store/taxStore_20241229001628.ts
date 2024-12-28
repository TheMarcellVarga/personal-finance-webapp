import { create } from 'zustand'

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
  calculateTax: (income: number, countryCode: string) => {
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

export const useTaxStore = create<TaxStore>((set, get) => ({
  countries: [
    {
      name: 'United States',
      code: 'US',
      currency: 'USD',
      standardDeduction: 12950,
      brackets: [
        { min: 0, max: 11000, rate: 0.10 },
        { min: 11001, max: 44725, rate: 0.12 },
        { min: 44726, max: 95375, rate: 0.22 },
        { min: 95376, max: 182100, rate: 0.24 },
        { min: 182101, max: 231250, rate: 0.32 },
        { min: 231251, max: 578125, rate: 0.35 },
        { min: 578126, max: Infinity, rate: 0.37 }
      ],
      socialSecurity: {
        rate: 0.062,
        cap: 160200
      }
    },
    {
      name: 'United Kingdom',
      code: 'GB',
      currency: 'GBP',
      brackets: [
        { min: 0, max: 12570, rate: 0 },
        { min: 12571, max: 50270, rate: 0.20 },
        { min: 50271, max: 125140, rate: 0.40 },
        { min: 125141, max: Infinity, rate: 0.45 }
      ],
      socialSecurity: {
        rate: 0.12
      }
    },
    {
      name: 'Germany',
      code: 'DE',
      currency: 'EUR',
      brackets: [
        { min: 0, max: 10908, rate: 0 },
        { min: 10909, max: 62809, rate: 0.14 },
        { min: 62810, max: 277825, rate: 0.42 },
        { min: 277826, max: Infinity, rate: 0.45 }
      ],
      socialSecurity: {
        rate: 0.185,
        cap: 87600
      }
    }
  ],
  selectedCountry: null,
  setSelectedCountry: (code) => set({ selectedCountry: code }),
  getTaxBrackets: (code) => {
    const country = get().countries.find(c => c.code === code);
    return country?.brackets || [];
  },
  calculateTax: (income: number, countryCode: string) => {
    const country = get().countries.find(c => c.code === countryCode);
    if (!country) {
      return {
        totalTax: 0,
        effectiveRate: 0,
        breakdown: []
      };
    }

    let taxableIncome = income;
    if (country.standardDeduction) {
      taxableIncome = Math.max(0, income - country.standardDeduction);
    }

    let totalTax = 0;
    const breakdown: Array<{bracket: string; tax: number; rate: number}> = [];

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
          bracket: `${bracketMin.toLocaleString()} - ${bracketMax === Infinity ? '∞' : bracketMax.toLocaleString()}`,
          tax: bracketTax,
          rate: bracket.rate
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
      socialSecurity
    };
  }
}));
