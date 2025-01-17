export const balticStatesTax = [
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
