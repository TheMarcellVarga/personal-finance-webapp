export const southernEuropeTax = [
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
