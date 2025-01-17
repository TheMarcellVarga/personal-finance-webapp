export const additionalEuropeanTax = [
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
