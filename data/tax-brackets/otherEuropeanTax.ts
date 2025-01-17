export const otherEuropeanTax = [
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
