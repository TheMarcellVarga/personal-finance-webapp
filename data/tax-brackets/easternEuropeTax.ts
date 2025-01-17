export const easternEuropeTax = [
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
