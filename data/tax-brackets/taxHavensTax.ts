export const taxHavensTax = [
  // Europe
  {
    name: "Monaco",
    code: "MC",
    currency: "EUR",
    brackets: [
      { min: 0, max: Infinity, rate: 0 }
    ],
    socialSecurity: {
      rate: 0.14,
    },
  },
  {
    name: "Liechtenstein",
    code: "LI",
    currency: "CHF",
    brackets: [
      { min: 0, max: 15000, rate: 0.01 },
      { min: 15001, max: 20000, rate: 0.03 },
      { min: 20001, max: 40000, rate: 0.04 },
      { min: 40001, max: 70000, rate: 0.06 },
      { min: 70001, max: 100000, rate: 0.08 },
      { min: 100001, max: 130000, rate: 0.09 },
      { min: 130001, max: 160000, rate: 0.1 },
      { min: 160001, max: 200000, rate: 0.11 },
      { min: 200001, max: Infinity, rate: 0.12 },
    ],
    socialSecurity: {
      rate: 0.13,
    },
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
    socialSecurity: {
      rate: 0.0675,
    },
  },
  {
    name: "San Marino",
    code: "SM",
    currency: "EUR",
    brackets: [
      { min: 0, max: 10000, rate: 0.09 },
      { min: 10001, max: 28000, rate: 0.15 },
      { min: 28001, max: 50000, rate: 0.2 },
      { min: 50001, max: Infinity, rate: 0.35 },
    ],
    socialSecurity: {
      rate: 0.08,
    },
  },
  {
    name: "Isle of Man",
    code: "IM",
    currency: "GBP",
    brackets: [
      { min: 0, max: 6500, rate: 0.1 },
      { min: 6501, max: 100000, rate: 0.2 },
      { min: 100001, max: Infinity, rate: 0.2 },
    ],
    socialSecurity: {
      rate: 0.115,
    },
  },
  {
    name: "Jersey",
    code: "JE",
    currency: "GBP",
    brackets: [
      { min: 0, max: 15400, rate: 0 },
      { min: 15401, max: Infinity, rate: 0.2 },
    ],
    socialSecurity: {
      rate: 0.06,
    },
  },
  {
    name: "Guernsey",
    code: "GG",
    currency: "GBP",
    brackets: [
      { min: 0, max: 11875, rate: 0 },
      { min: 11876, max: Infinity, rate: 0.2 },
    ],
    socialSecurity: {
      rate: 0.065,
    },
  },
  {
    name: "Vatican City",
    code: "VA",
    currency: "EUR",
    brackets: [
      { min: 0, max: Infinity, rate: 0 },
    ],
    socialSecurity: {
      rate: 0,
    },
  },
  
  // Caribbean & Americas
  {
    name: "Bahamas",
    code: "BS",
    currency: "BSD",
    brackets: [
      { min: 0, max: Infinity, rate: 0 },
    ],
    socialSecurity: {
      rate: 0.0975,
    },
  },
  {
    name: "Cayman Islands",
    code: "KY",
    currency: "KYD",
    brackets: [
      { min: 0, max: Infinity, rate: 0 },
    ],
    socialSecurity: {
      rate: 0.05,
    },
  },
  {
    name: "Bermuda",
    code: "BM",
    currency: "BMD",
    brackets: [
      { min: 0, max: Infinity, rate: 0 },
    ],
    socialSecurity: {
      rate: 0.0475,
    },
  },
  {
    name: "Barbados",
    code: "BB",
    currency: "BBD",
    brackets: [
      { min: 0, max: 25000, rate: 0.12 },
      { min: 25001, max: 60000, rate: 0.285 },
      { min: 60001, max: Infinity, rate: 0.335 },
    ],
    socialSecurity: {
      rate: 0.1125,
    },
  },
  {
    name: "Antigua and Barbuda",
    code: "AG",
    currency: "XCD",
    brackets: [
      { min: 0, max: 3000, rate: 0 },
      { min: 3001, max: 150000, rate: 0.1 },
      { min: 150001, max: 300000, rate: 0.15 },
      { min: 300001, max: 500000, rate: 0.2 },
      { min: 500001, max: Infinity, rate: 0.25 },
    ],
    socialSecurity: {
      rate: 0.1,
    },
  },
  {
    name: "Saint Vincent",
    code: "VC",
    currency: "XCD",
    brackets: [
      { min: 0, max: 18000, rate: 0 },
      { min: 18001, max: 29000, rate: 0.2 },
      { min: 29001, max: 59000, rate: 0.25 },
      { min: 59001, max: Infinity, rate: 0.3 },
    ],
    socialSecurity: {
      rate: 0.1,
    },
  },
  {
    name: "Saint Lucia",
    code: "LC",
    currency: "XCD",
    brackets: [
      { min: 0, max: 10000, rate: 0 },
      { min: 10001, max: 30000, rate: 0.15 },
      { min: 30001, max: Infinity, rate: 0.3 },
    ],
    socialSecurity: {
      rate: 0.1,
    },
  },
  {
    name: "Saint Kitts and Nevis",
    code: "KN",
    currency: "XCD",
    brackets: [
      { min: 0, max: 60000, rate: 0 },
      { min: 60001, max: Infinity, rate: 0.3 },
    ],
    socialSecurity: {
      rate: 0.11,
    },
  },
  {
    name: "Dominica",
    code: "DM",
    currency: "XCD",
    brackets: [
      { min: 0, max: 30000, rate: 0.15 },
      { min: 30001, max: 60000, rate: 0.25 },
      { min: 60001, max: Infinity, rate: 0.35 },
    ],
    socialSecurity: {
      rate: 0.1,
    },
  },
  {
    name: "Grenada",
    code: "GD",
    currency: "XCD",
    brackets: [
      { min: 0, max: 36000, rate: 0.15 },
      { min: 36001, max: 60000, rate: 0.2 },
      { min: 60001, max: 108000, rate: 0.25 },
      { min: 108001, max: Infinity, rate: 0.3 },
    ],
    socialSecurity: {
      rate: 0.09,
    },
  },
  
  // Asia & Pacific
  {
    name: "Singapore",
    code: "SG",
    currency: "SGD",
    brackets: [
      { min: 0, max: 20000, rate: 0 },
      { min: 20001, max: 30000, rate: 0.02 },
      { min: 30001, max: 40000, rate: 0.035 },
      { min: 40001, max: 80000, rate: 0.07 },
      { min: 80001, max: 120000, rate: 0.115 },
      { min: 120001, max: 160000, rate: 0.15 },
      { min: 160001, max: 200000, rate: 0.18 },
      { min: 200001, max: 240000, rate: 0.19 },
      { min: 240001, max: 280000, rate: 0.195 },
      { min: 280001, max: 320000, rate: 0.2 },
      { min: 320001, max: 500000, rate: 0.22 },
      { min: 500001, max: 1000000, rate: 0.23 },
      { min: 1000001, max: Infinity, rate: 0.24 },
    ],
    socialSecurity: {
      rate: 0.2,
    },
  },
  {
    name: "Brunei",
    code: "BN",
    currency: "BND",
    brackets: [
      { min: 0, max: Infinity, rate: 0 },
    ],
    socialSecurity: {
      rate: 0.05,
    },
  },
  {
    name: "Bahrain",
    code: "BH",
    currency: "BHD",
    brackets: [
      { min: 0, max: Infinity, rate: 0 },
    ],
    socialSecurity: {
      rate: 0.07,
    },
  },
  {
    name: "Hong Kong",
    code: "HK",
    currency: "HKD",
    brackets: [
      { min: 0, max: 50000, rate: 0.02 },
      { min: 50001, max: 100000, rate: 0.06 },
      { min: 100001, max: 150000, rate: 0.1 },
      { min: 150001, max: 200000, rate: 0.14 },
      { min: 200001, max: Infinity, rate: 0.17 },
    ],
    standardDeduction: 132000,
    socialSecurity: {
      rate: 0.05,
      cap: 30000,
    },
  },
  {
    name: "Macau",
    code: "MO",
    currency: "MOP",
    brackets: [
      { min: 0, max: 144000, rate: 0 },
      { min: 144001, max: 164000, rate: 0.01 },
      { min: 164001, max: 194000, rate: 0.03 },
      { min: 194001, max: 244000, rate: 0.06 },
      { min: 244001, max: 304000, rate: 0.09 },
      { min: 304001, max: 424000, rate: 0.12 },
      { min: 424001, max: Infinity, rate: 0.12 },
    ],
    socialSecurity: {
      rate: 0.06,
    },
  },
  {
    name: "Mauritius",
    code: "MU",
    currency: "MUR",
    brackets: [
      { min: 0, max: 650000, rate: 0.1 },
      { min: 650001, max: Infinity, rate: 0.15 },
    ],
    socialSecurity: {
      rate: 0.03,
    },
  },
  {
    name: "Seychelles",
    code: "SC",
    currency: "SCR",
    brackets: [
      { min: 0, max: 8555.5, rate: 0 },
      { min: 8555.6, max: Infinity, rate: 0.15 },
    ],
    socialSecurity: {
      rate: 0.03,
    },
  },
  {
    name: "Samoa",
    code: "WS",
    currency: "WST",
    brackets: [
      { min: 0, max: 14000, rate: 0 },
      { min: 14001, max: 22000, rate: 0.1 },
      { min: 22001, max: 38000, rate: 0.2 },
      { min: 38001, max: Infinity, rate: 0.27 },
    ],
    socialSecurity: {
      rate: 0.08,
    },
  },
  {
    name: "Vanuatu",
    code: "VU",
    currency: "VUV",
    brackets: [
      { min: 0, max: Infinity, rate: 0 },
    ],
    socialSecurity: {
      rate: 0.04,
    },
  },
]; 