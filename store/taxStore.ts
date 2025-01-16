import { create } from "zustand";

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

// Part 1: Western Europe
const westernEuropeTax = [
  {
    name: "Germany",
    code: "DE",
    currency: "EUR",
    brackets: [
      { min: 0, max: 10908, rate: 0 },
      { min: 10909, max: 62809, rate: 0.14 },
      { min: 62810, max: 277825, rate: 0.42 },
      { min: 277826, max: Infinity, rate: 0.45 },
    ],
    socialSecurity: {
      rate: 0.185,
      cap: 87600,
    },
  },
  {
    name: "France",
    code: "FR",
    currency: "EUR",
    brackets: [
      { min: 0, max: 10777, rate: 0 },
      { min: 10778, max: 27478, rate: 0.11 },
      { min: 27479, max: 78570, rate: 0.3 },
      { min: 78571, max: 168994, rate: 0.41 },
      { min: 168995, max: Infinity, rate: 0.45 },
    ],
    socialSecurity: {
      rate: 0.2,
      cap: 329088,
    },
  },
  {
    name: "Netherlands",
    code: "NL",
    currency: "EUR",
    brackets: [
      { min: 0, max: 73031, rate: 0.369 },
      { min: 73032, max: Infinity, rate: 0.495 },
    ],
    socialSecurity: {
      rate: 0.275,
    },
  },
  {
    name: "Belgium",
    code: "BE",
    currency: "EUR",
    brackets: [
      { min: 0, max: 13870, rate: 0.25 },
      { min: 13871, max: 24480, rate: 0.4 },
      { min: 24481, max: 42370, rate: 0.45 },
      { min: 42371, max: Infinity, rate: 0.5 },
    ],
    socialSecurity: {
      rate: 0.138,
    },
  },
  {
    name: "Sweden",
    code: "SE",
    currency: "SEK",
    brackets: [
      { min: 0, max: 46200, rate: 0 },
      { min: 46201, max: 540700, rate: 0.32 },
      { min: 540701, max: Infinity, rate: 0.52 },
    ],
    socialSecurity: {
      rate: 0.3142,
    },
  },
  {
    name: "Denmark",
    code: "DK",
    currency: "DKK",
    brackets: [
      { min: 0, max: 48900, rate: 0.12 },
      { min: 48901, max: 544800, rate: 0.42 },
      { min: 544801, max: Infinity, rate: 0.56 },
    ],
    socialSecurity: {
      rate: 0.08,
    },
  },
  {
    name: "Norway",
    code: "NO",
    currency: "NOK",
    brackets: [
      { min: 0, max: 190350, rate: 0.22 },
      { min: 190351, max: 267900, rate: 0.242 },
      { min: 267901, max: 643800, rate: 0.262 },
      { min: 643801, max: 969200, rate: 0.352 },
      { min: 969201, max: 2000000, rate: 0.402 },
      { min: 2000001, max: Infinity, rate: 0.442 },
    ],
    socialSecurity: {
      rate: 0.082,
    },
  },
  {
    name: "Finland",
    code: "FI",
    currency: "EUR",
    brackets: [
      { min: 0, max: 19200, rate: 0.126 },
      { min: 19201, max: 28700, rate: 0.172 },
      { min: 28701, max: 47300, rate: 0.213 },
      { min: 47301, max: 82900, rate: 0.3 },
      { min: 82901, max: Infinity, rate: 0.345 },
    ],
    socialSecurity: {
      rate: 0.0715,
    },
  },
];

const northernEuropeTax = [
  {
    name: "Sweden",
    code: "SE",
    currency: "SEK",
    brackets: [
      { min: 0, max: 46200, rate: 0 },
      { min: 46201, max: 540700, rate: 0.32 },
      { min: 540701, max: Infinity, rate: 0.52 },
    ],
    socialSecurity: {
      rate: 0.3142,
    },
  },
  {
    name: "Denmark",
    code: "DK",
    currency: "DKK",
    brackets: [
      { min: 0, max: 48900, rate: 0.12 },
      { min: 48901, max: 544800, rate: 0.42 },
      { min: 544801, max: Infinity, rate: 0.56 },
    ],
    socialSecurity: {
      rate: 0.08,
    },
  },
  {
    name: "Norway",
    code: "NO",
    currency: "NOK",
    brackets: [
      { min: 0, max: 190350, rate: 0.22 },
      { min: 190351, max: 267900, rate: 0.242 },
      { min: 267901, max: 643800, rate: 0.262 },
      { min: 643801, max: 969200, rate: 0.352 },
      { min: 969201, max: 2000000, rate: 0.402 },
      { min: 2000001, max: Infinity, rate: 0.442 },
    ],
    socialSecurity: {
      rate: 0.082,
    },
  },
  {
    name: "Finland",
    code: "FI",
    currency: "EUR",
    brackets: [
      { min: 0, max: 19200, rate: 0.126 },
      { min: 19201, max: 28700, rate: 0.172 },
      { min: 28701, max: 47300, rate: 0.213 },
      { min: 47301, max: 82900, rate: 0.3 },
      { min: 82901, max: Infinity, rate: 0.345 },
    ],
    socialSecurity: {
      rate: 0.0715,
    },
  },
];

// Part 3: Southern Europe
const southernEuropeTax = [
  {
    name: "Spain",
    code: "ES",
    currency: "EUR",
    brackets: [
      { min: 0, max: 12450, rate: 0.19 },
      { min: 12451, max: 20200, rate: 0.24 },
      { min: 20201, max: 35200, rate: 0.3 },
      { min: 35201, max: 60000, rate: 0.37 },
      { min: 60001, max: 300000, rate: 0.45 },
      { min: 300001, max: Infinity, rate: 0.47 },
    ],
    socialSecurity: {
      rate: 0.064,
      cap: 45000,
    },
  },
  {
    name: "Italy",
    code: "IT",
    currency: "EUR",
    brackets: [
      { min: 0, max: 15000, rate: 0.23 },
      { min: 15001, max: 28000, rate: 0.25 },
      { min: 28001, max: 50000, rate: 0.35 },
      { min: 50001, max: Infinity, rate: 0.43 },
    ],
    socialSecurity: {
      rate: 0.1,
    },
  },
  {
    name: "Portugal",
    code: "PT",
    currency: "EUR",
    brackets: [
      { min: 0, max: 7479, rate: 0.145 },
      { min: 7480, max: 11284, rate: 0.23 },
      { min: 11285, max: 15992, rate: 0.285 },
      { min: 15993, max: 20700, rate: 0.35 },
      { min: 20701, max: 36967, rate: 0.37 },
      { min: 36968, max: 80882, rate: 0.45 },
      { min: 80883, max: Infinity, rate: 0.48 },
    ],
    socialSecurity: {
      rate: 0.11,
    },
  },
];

// Part 4: Eastern Europe (continued)
const easternEuropeTax = [
  {
    name: "Poland",
    code: "PL",
    currency: "PLN",
    brackets: [
      { min: 0, max: 120000, rate: 0.12 },
      { min: 120001, max: Infinity, rate: 0.32 },
    ],
    socialSecurity: {
      rate: 0.1371,
    },
  },
  {
    name: "Czech Republic",
    code: "CZ",
    currency: "CZK",
    brackets: [{ min: 0, max: Infinity, rate: 0.15 }],
    socialSecurity: {
      rate: 0.11,
    },
  },
  {
    name: "Hungary",
    code: "HU",
    currency: "HUF",
    brackets: [{ min: 0, max: Infinity, rate: 0.15 }],
    socialSecurity: {
      rate: 0.185,
    },
  },
  {
    name: "Romania",
    code: "RO",
    currency: "RON",
    brackets: [{ min: 0, max: Infinity, rate: 0.1 }],
    socialSecurity: {
      rate: 0.35,
    },
  },
  {
    name: "Bulgaria",
    code: "BG",
    currency: "BGN",
    brackets: [{ min: 0, max: Infinity, rate: 0.1 }],
    socialSecurity: {
      rate: 0.1378,
    },
  },
  {
    name: "Slovakia",
    code: "SK",
    currency: "EUR",
    brackets: [
      { min: 0, max: 38553, rate: 0.19 },
      { min: 38554, max: Infinity, rate: 0.25 },
    ],
    socialSecurity: {
      rate: 0.134,
    },
  },
];

// Part 5: Baltic States
const balticStatesTax = [
  {
    name: "Estonia",
    code: "EE",
    currency: "EUR",
    brackets: [{ min: 0, max: Infinity, rate: 0.2 }],
    socialSecurity: {
      rate: 0.33,
    },
  },
  {
    name: "Latvia",
    code: "LV",
    currency: "EUR",
    brackets: [
      { min: 0, max: 20004, rate: 0.2 },
      { min: 20005, max: 78100, rate: 0.23 },
      { min: 78101, max: Infinity, rate: 0.31 },
    ],
    socialSecurity: {
      rate: 0.105,
    },
  },
  {
    name: "Lithuania",
    code: "LT",
    currency: "EUR",
    brackets: [
      { min: 0, max: 81162, rate: 0.2 },
      { min: 81163, max: Infinity, rate: 0.32 },
    ],
    socialSecurity: {
      rate: 0.1252,
    },
  },
];

// Part 6: Other European Countries
const otherEuropeanTax = [
  {
    name: "Switzerland",
    code: "CH",
    currency: "CHF",
    brackets: [
      { min: 0, max: 14500, rate: 0 },
      { min: 14501, max: 31600, rate: 0.077 },
      { min: 31601, max: 41400, rate: 0.088 },
      { min: 41401, max: 55200, rate: 0.11 },
      { min: 55201, max: 72500, rate: 0.12 },
      { min: 72501, max: 78100, rate: 0.125 },
      { min: 78101, max: 103600, rate: 0.13 },
      { min: 103601, max: 134600, rate: 0.132 },
      { min: 134601, max: 176000, rate: 0.135 },
      { min: 176001, max: 755200, rate: 0.136 },
      { min: 755201, max: Infinity, rate: 0.137 },
    ],
    socialSecurity: {
      rate: 0.064,
    },
  },
  {
    name: "Croatia",
    code: "HR",
    currency: "EUR",
    brackets: [
      { min: 0, max: 47780, rate: 0.2 },
      { min: 47781, max: Infinity, rate: 0.3 },
    ],
    socialSecurity: {
      rate: 0.2,
    },
  },
  {
    name: "Slovenia",
    code: "SI",
    currency: "EUR",
    brackets: [
      { min: 0, max: 8500, rate: 0.16 },
      { min: 8501, max: 25000, rate: 0.26 },
      { min: 25001, max: 50000, rate: 0.33 },
      { min: 50001, max: 72000, rate: 0.39 },
      { min: 72001, max: Infinity, rate: 0.45 },
    ],
    socialSecurity: {
      rate: 0.221,
    },
  },
];

// Additional European countries that were missing
const additionalEuropeanTax = [
  {
    name: "Albania",
    code: "AL",
    currency: "ALL",
    brackets: [
      { min: 0, max: 30000, rate: 0 },
      { min: 30001, max: 150000, rate: 0.13 },
      { min: 150001, max: Infinity, rate: 0.23 },
    ],
    socialSecurity: {
      rate: 0.115,
    },
  },
  {
    name: "Bosnia and Herzegovina",
    code: "BA",
    currency: "BAM",
    brackets: [{ min: 0, max: Infinity, rate: 0.1 }],
    socialSecurity: {
      rate: 0.31,
    },
  },
  {
    name: "Belarus",
    code: "BY",
    currency: "BYN",
    brackets: [{ min: 0, max: Infinity, rate: 0.13 }],
    socialSecurity: {
      rate: 0.01,
    },
  },
  {
    name: "Iceland",
    code: "IS",
    currency: "ISK",
    brackets: [
      { min: 0, max: 409986, rate: 0.3145 },
      { min: 409987, max: 1151012, rate: 0.3795 },
      { min: 1151013, max: Infinity, rate: 0.4645 },
    ],
    socialSecurity: {
      rate: 0.04,
    },
  },
  {
    name: "Moldova",
    code: "MD",
    currency: "MDL",
    brackets: [{ min: 0, max: Infinity, rate: 0.12 }],
    socialSecurity: {
      rate: 0.06,
    },
  },
  {
    name: "Montenegro",
    code: "ME",
    currency: "EUR",
    brackets: [
      { min: 0, max: 8000, rate: 0.09 },
      { min: 8001, max: Infinity, rate: 0.11 },
    ],
    socialSecurity: {
      rate: 0.24,
    },
  },
  {
    name: "North Macedonia",
    code: "MK",
    currency: "MKD",
    brackets: [{ min: 0, max: Infinity, rate: 0.1 }],
    socialSecurity: {
      rate: 0.27,
    },
  },
  {
    name: "Serbia",
    code: "RS",
    currency: "RSD",
    brackets: [{ min: 0, max: Infinity, rate: 0.1 }],
    socialSecurity: {
      rate: 0.197,
    },
  },
  {
    name: "Ukraine",
    code: "UA",
    currency: "UAH",
    brackets: [{ min: 0, max: Infinity, rate: 0.18 }],
    socialSecurity: {
      rate: 0.22,
    },
  },
  {
    name: "Vatican City",
    code: "VA",
    currency: "EUR",
    brackets: [{ min: 0, max: Infinity, rate: 0 }],
  },
  {
    name: "Monaco",
    code: "MC",
    currency: "EUR",
    brackets: [{ min: 0, max: Infinity, rate: 0 }],
  },
  {
    name: "Liechtenstein",
    code: "LI",
    currency: "CHF",
    brackets: [
      { min: 0, max: 15000, rate: 0.03 },
      { min: 15001, max: 35000, rate: 0.04 },
      { min: 35001, max: 70000, rate: 0.05 },
      { min: 70001, max: 105000, rate: 0.06 },
      { min: 105001, max: 140000, rate: 0.07 },
      { min: 140001, max: Infinity, rate: 0.08 },
    ],
  },
  {
    name: "Andorra",
    code: "AD",
    currency: "EUR",
    brackets: [
      { min: 0, max: 24000, rate: 0 },
      { min: 24001, max: 40000, rate: 0.05 },
      { min: 40001, max: Infinity, rate: 0.1 },
    ],
  },
  {
    name: "San Marino",
    code: "SM",
    currency: "EUR",
    brackets: [
      { min: 0, max: 10000, rate: 0.09 },
      { min: 10001, max: 28000, rate: 0.13 },
      { min: 28001, max: 50000, rate: 0.17 },
      { min: 50001, max: Infinity, rate: 0.35 },
    ],
  },
];

const missingEuropeanTax = [
  {
    name: "Cyprus",
    code: "CY",
    currency: "EUR",
    brackets: [
      { min: 0, max: 19500, rate: 0 },
      { min: 19501, max: 28000, rate: 0.2 },
      { min: 28001, max: 36300, rate: 0.25 },
      { min: 36301, max: 60000, rate: 0.3 },
      { min: 60001, max: Infinity, rate: 0.35 },
    ],
    socialSecurity: {
      rate: 0.083,
    },
  },
  {
    name: "Greece",
    code: "GR",
    currency: "EUR",
    brackets: [
      { min: 0, max: 10000, rate: 0.09 },
      { min: 10001, max: 20000, rate: 0.22 },
      { min: 20001, max: 30000, rate: 0.28 },
      { min: 30001, max: 40000, rate: 0.36 },
      { min: 40001, max: Infinity, rate: 0.44 },
    ],
    socialSecurity: {
      rate: 0.141,
    },
  },
  {
    name: "Ireland",
    code: "IE",
    currency: "EUR",
    brackets: [
      { min: 0, max: 36800, rate: 0.2 },
      { min: 36801, max: Infinity, rate: 0.4 },
    ],
    socialSecurity: {
      rate: 0.04,
      cap: 115000,
    },
  },
  {
    name: "Luxembourg",
    code: "LU",
    currency: "EUR",
    brackets: [
      { min: 0, max: 11265, rate: 0 },
      { min: 11266, max: 13137, rate: 0.08 },
      { min: 13138, max: 15009, rate: 0.09 },
      { min: 15010, max: 16881, rate: 0.1 },
      { min: 16882, max: 18753, rate: 0.11 },
      { min: 18754, max: 20625, rate: 0.12 },
      { min: 20626, max: 22569, rate: 0.14 },
      { min: 22570, max: 24513, rate: 0.16 },
      { min: 24514, max: 26457, rate: 0.18 },
      { min: 26458, max: 28401, rate: 0.2 },
      { min: 28402, max: 30345, rate: 0.22 },
      { min: 30346, max: 32289, rate: 0.24 },
      { min: 32290, max: 34233, rate: 0.26 },
      { min: 34234, max: 36177, rate: 0.28 },
      { min: 36178, max: 38121, rate: 0.3 },
      { min: 38122, max: 40065, rate: 0.32 },
      { min: 40066, max: 42009, rate: 0.34 },
      { min: 42010, max: 43953, rate: 0.36 },
      { min: 43954, max: 45897, rate: 0.38 },
      { min: 45898, max: 100002, rate: 0.39 },
      { min: 100003, max: 150000, rate: 0.4 },
      { min: 150001, max: 200004, rate: 0.41 },
      { min: 200005, max: Infinity, rate: 0.42 },
    ],
    socialSecurity: {
      rate: 0.125,
    },
  },
  {
    name: "Malta",
    code: "MT",
    currency: "EUR",
    brackets: [
      { min: 0, max: 9100, rate: 0 },
      { min: 9101, max: 14500, rate: 0.15 },
      { min: 14501, max: 19500, rate: 0.25 },
      { min: 19501, max: 60000, rate: 0.25 },
      { min: 60001, max: Infinity, rate: 0.35 },
    ],
    socialSecurity: {
      rate: 0.1,
    },
  },
];

export const completeEuropeanTaxData = [
  ...westernEuropeTax,
  ...northernEuropeTax,  // Now this will work
  ...southernEuropeTax,
  ...easternEuropeTax,
  ...balticStatesTax,
  ...otherEuropeanTax,
  ...additionalEuropeanTax,
  ...missingEuropeanTax
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
