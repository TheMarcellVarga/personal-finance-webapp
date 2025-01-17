export const westernEuropeTax = [
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
