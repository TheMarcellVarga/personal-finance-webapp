export interface Currency {
  value: string;
  label: string;
  symbol: string;
}

export interface CurrencyGroups {
  major: string[];
  americas: string[];
  asiaPacific: string[];
  europe: string[];
  middleEastAfrica: string[];
  other: string[];
  regional: string[];
  crypto: string[];
}

export const countryCurrencyMap: Record<string, string> = {
  // Europe
  AT: "EUR", // Austria
  BE: "EUR", // Belgium
  BG: "BGN", // Bulgaria
  HR: "EUR", // Croatia
  CY: "EUR", // Cyprus
  CZ: "CZK", // Czech Republic
  DK: "DKK", // Denmark
  EE: "EUR", // Estonia
  FI: "EUR", // Finland
  FR: "EUR", // France
  DE: "EUR", // Germany
  GR: "EUR", // Greece
  HU: "HUF", // Hungary
  IE: "EUR", // Ireland
  IT: "EUR", // Italy
  LV: "EUR", // Latvia
  LT: "EUR", // Lithuania
  LU: "EUR", // Luxembourg
  MT: "EUR", // Malta
  NL: "EUR", // Netherlands
  PL: "PLN", // Poland
  PT: "EUR", // Portugal
  RO: "RON", // Romania
  SK: "EUR", // Slovakia
  SI: "EUR", // Slovenia
  ES: "EUR", // Spain
  SE: "SEK", // Sweden
  AL: "ALL", // Albania
  BA: "BAM", // Bosnia and Herzegovina
  BY: "BYN", // Belarus
  CH: "CHF", // Switzerland
  GB: "GBP", // United Kingdom
  IS: "ISK", // Iceland
  MD: "MDL", // Moldova
  ME: "EUR", // Montenegro
  MK: "MKD", // North Macedonia
  NO: "NOK", // Norway
  RS: "RSD", // Serbia
  UA: "UAH", // Ukraine

  // Americas
  US: "USD", // United States
  CA: "CAD", // Canada
  MX: "MXN", // Mexico
  BR: "BRL", // Brazil
  AR: "ARS", // Argentina
  CL: "CLP", // Chile
  CO: "COP", // Colombia
  PE: "PEN", // Peru
  UY: "UYU", // Uruguay
  BO: "BOB", // Bolivia
  CR: "CRC", // Costa Rica
  DO: "DOP", // Dominican Republic
  EC: "USD", // Ecuador
  GT: "GTQ", // Guatemala
  HN: "HNL", // Honduras
  NI: "NIO", // Nicaragua
  PA: "PAB", // Panama
  PY: "PYG", // Paraguay
  SV: "USD", // El Salvador
  VE: "VES", // Venezuela
  JM: "JMD", // Jamaica
  TT: "TTD", // Trinidad and Tobago

  // Asia
  CN: "CNY", // China
  JP: "JPY", // Japan
  KR: "KRW", // South Korea
  IN: "INR", // India
  ID: "IDR", // Indonesia
  MY: "MYR", // Malaysia
  SG: "SGD", // Singapore
  TH: "THB", // Thailand
  VN: "VND", // Vietnam
  PH: "PHP", // Philippines
  AF: "AFN", // Afghanistan
  AM: "AMD", // Armenia
  AZ: "AZN", // Azerbaijan
  BD: "BDT", // Bangladesh
  BN: "BND", // Brunei
  BT: "BTN", // Bhutan
  GE: "GEL", // Georgia
  KH: "KHR", // Cambodia
  KZ: "KZT", // Kazakhstan
  KG: "KGS", // Kyrgyzstan
  LA: "LAK", // Laos
  LK: "LKR", // Sri Lanka
  MN: "MNT", // Mongolia
  MM: "MMK", // Myanmar
  NP: "NPR", // Nepal
  PK: "PKR", // Pakistan
  TJ: "TJS", // Tajikistan
  TM: "TMT", // Turkmenistan
  UZ: "UZS", // Uzbekistan

  // Middle East
  IL: "ILS", // Israel
  SA: "SAR", // Saudi Arabia
  AE: "AED", // United Arab Emirates
  TR: "TRY", // Turkey
  QA: "QAR", // Qatar
  BH: "BHD", // Bahrain
  KW: "KWD", // Kuwait
  IQ: "IQD", // Iraq
  IR: "IRR", // Iran
  JO: "JOD", // Jordan
  LB: "LBP", // Lebanon
  OM: "OMR", // Oman
  PS: "ILS", // Palestine
  SY: "SYP", // Syria
  YE: "YER", // Yemen

  // Africa
  ZA: "ZAR", // South Africa
  EG: "EGP", // Egypt
  NG: "NGN", // Nigeria
  KE: "KES", // Kenya
  MA: "MAD", // Morocco
  AO: "AOA", // Angola
  BF: "XOF", // Burkina Faso
  BI: "BIF", // Burundi
  BJ: "XOF", // Benin
  BW: "BWP", // Botswana
  CD: "CDF", // DR Congo
  CF: "XAF", // Central African Republic
  CG: "XAF", // Republic of Congo
  CI: "XOF", // Ivory Coast
  CM: "XAF", // Cameroon
  CV: "CVE", // Cape Verde
  DJ: "DJF", // Djibouti
  DZ: "DZD", // Algeria
  ER: "ERN", // Eritrea
  ET: "ETB", // Ethiopia
  GA: "XAF", // Gabon
  GH: "GHS", // Ghana
  GM: "GMD", // Gambia
  GN: "GNF", // Guinea
  GQ: "XAF", // Equatorial Guinea
  GW: "XOF", // Guinea-Bissau
  LR: "LRD", // Liberia
  LS: "LSL", // Lesotho
  LY: "LYD", // Libya
  MG: "MGA", // Madagascar
  ML: "XOF", // Mali
  MR: "MRU", // Mauritania
  MW: "MWK", // Malawi
  MZ: "MZN", // Mozambique
  NA: "NAD", // Namibia
  NE: "XOF", // Niger
  RW: "RWF", // Rwanda
  SD: "SDG", // Sudan
  SL: "SLL", // Sierra Leone
  SN: "XOF", // Senegal
  SO: "SOS", // Somalia
  SS: "SSP", // South Sudan
  SZ: "SZL", // Eswatini (Swaziland)
  TD: "XAF", // Chad
  TG: "XOF", // Togo
  TN: "TND", // Tunisia
  TZ: "TZS", // Tanzania
  UG: "UGX", // Uganda
  ZM: "ZMW", // Zambia
  ZW: "ZWL", // Zimbabwe

  // Oceania
  AU: "AUD", // Australia
  NZ: "NZD", // New Zealand
  FJ: "FJD", // Fiji
  PG: "PGK", // Papua New Guinea
  SB: "SBD", // Solomon Islands
  VU: "VUV", // Vanuatu
  NC: "XPF", // New Caledonia
  WS: "WST", // Samoa
  TO: "TOP", // Tonga

  // Caribbean
  BS: "BSD", // Bahamas
  BB: "BBD", // Barbados
  CU: "CUP", // Cuba
  DM: "XCD", // Dominica
  GD: "XCD", // Grenada
  HT: "HTG", // Haiti
  KN: "XCD", // Saint Kitts and Nevis
  LC: "XCD", // Saint Lucia
  VC: "XCD", // Saint Vincent and the Grenadines

  // Other territories and dependencies
  GL: "DKK", // Greenland (Denmark)
  FO: "DKK", // Faroe Islands (Denmark)
  GI: "GIP", // Gibraltar (UK)
  IM: "GBP", // Isle of Man
  JE: "GBP", // Jersey
  GG: "GBP", // Guernsey
  AW: "AWG", // Aruba
  CW: "ANG", // Curaçao
  SX: "ANG", // Sint Maarten
  BM: "BMD", // Bermuda
  KY: "KYD", // Cayman Islands
  FK: "FKP", // Falkland Islands
  GF: "EUR", // French Guiana
  PF: "XPF", // French Polynesia
  TF: "EUR", // French Southern Territories
  MF: "EUR", // Saint Martin
  PM: "EUR", // Saint Pierre and Miquelon
  WF: "XPF", // Wallis and Futuna
  YT: "EUR", // Mayotte
  RE: "EUR", // Réunion
  BL: "EUR", // Saint Barthélemy
  SH: "SHP", // Saint Helena
  TC: "USD", // Turks and Caicos Islands
  VI: "USD", // U.S. Virgin Islands
  AS: "USD", // American Samoa
  GU: "USD", // Guam
  MP: "USD", // Northern Mariana Islands
  PR: "USD", // Puerto Rico
  UM: "USD", // U.S. Minor Outlying Islands
};

// Helper function to get currency with fallback
export const getCountryCurrency = (countryCode: string): string => {
  return countryCurrencyMap[countryCode] || "USD";
};

// Helper function to format currency with proper symbol
export const getCurrencySymbol = (currency: string): string => {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CNY: "¥",
    INR: "₹",
    RUB: "₽",
    KRW: "₩",
    THB: "฿",
    VND: "₫",
    PHP: "₱",
    UAH: "₴",
    NGN: "₦",
    TRY: "₺",
    SAR: "﷼",
    ILS: "₪",
    PLN: "zł",
    CHF: "Fr",
    AED: "د.إ",
    AFN: "؋",
    BDT: "৳",
    CRC: "₡",
    GEL: "₾",
    LAK: "₭",
    MNT: "₮",
    BRL: "R$",
    ARS: "$",
    CLP: "$",
    COP: "$",
    MXN: "$",
    PEN: "S/",
    UYU: "$U",
    BOB: "Bs.",
    DOP: "RD$",
    GTQ: "Q",
    HNL: "L",
    NIO: "C$",
    PAB: "B/.",
    PYG: "₲",
    VES: "Bs.S",
    JMD: "J$",
    TTD: "TT$",
    KZT: "₸",
    BHD: ".د.ب",
    KWD: "د.ك",
    IRR: "﷼",
    JOD: "د.ا",
    LBP: "ل.ل",
    OMR: "ر.ع.",
    QAR: "ر.ق",
    EGP: "ج.م",
    MAD: "د.م.",
    ZAR: "R",
    AUD: "A$",
    NZD: "NZ$",
    FJD: "FJ$",
    SBD: "SI$",
    TOP: "T$",
    DKK: "kr",
    ISK: "kr",
    NOK: "kr",
    SEK: "kr",
    HRK: "kn",
    RON: "lei",
    BGN: "лв",
    CZK: "Kč",
    HUF: "Ft",
    ALL: "L",
    MDL: "L",
    MKD: "ден",
    RSD: "дин.",
    IDR: "Rp",
    MYR: "RM",
    SGD: "S$",
    BND: "B$",
    KHR: "៛",
    MMK: "K",
    LKR: "₨",
    PKR: "₨",
    NPR: "₨",
  };
  return symbols[currency] || currency;
};

// List of major available currencies for the currency selector
export const availableCurrencies = [
  // Major World Currencies
  { value: "USD", label: "USD ($) - US Dollar", symbol: "$" },
  { value: "EUR", label: "EUR (€) - Euro", symbol: "€" },
  { value: "GBP", label: "GBP (£) - British Pound", symbol: "£" },
  { value: "JPY", label: "JPY (¥) - Japanese Yen", symbol: "¥" },
  { value: "CNY", label: "CNY (¥) - Chinese Yuan", symbol: "¥" },
  { value: "CHF", label: "CHF (Fr) - Swiss Franc", symbol: "Fr" },

  // Americas
  { value: "CAD", label: "CAD ($) - Canadian Dollar", symbol: "$" },
  { value: "MXN", label: "MXN ($) - Mexican Peso", symbol: "$" },
  { value: "BRL", label: "BRL (R$) - Brazilian Real", symbol: "R$" },
  { value: "ARS", label: "ARS ($) - Argentine Peso", symbol: "$" },
  { value: "CLP", label: "CLP ($) - Chilean Peso", symbol: "$" },
  { value: "COP", label: "COP ($) - Colombian Peso", symbol: "$" },
  { value: "PEN", label: "PEN (S/) - Peruvian Sol", symbol: "S/" },

  // Asia Pacific
  { value: "AUD", label: "AUD (A$) - Australian Dollar", symbol: "A$" },
  { value: "NZD", label: "NZD (NZ$) - New Zealand Dollar", symbol: "NZ$" },
  { value: "INR", label: "INR (₹) - Indian Rupee", symbol: "₹" },
  { value: "KRW", label: "KRW (₩) - South Korean Won", symbol: "₩" },
  { value: "SGD", label: "SGD (S$) - Singapore Dollar", symbol: "S$" },
  { value: "HKD", label: "HKD ($) - Hong Kong Dollar", symbol: "$" },
  { value: "TWD", label: "TWD (NT$) - Taiwan Dollar", symbol: "NT$" },
  { value: "THB", label: "THB (฿) - Thai Baht", symbol: "฿" },
  { value: "VND", label: "VND (₫) - Vietnamese Dong", symbol: "₫" },
  { value: "IDR", label: "IDR (Rp) - Indonesian Rupiah", symbol: "Rp" },
  { value: "MYR", label: "MYR (RM) - Malaysian Ringgit", symbol: "RM" },
  { value: "PHP", label: "PHP (₱) - Philippine Peso", symbol: "₱" },

  // Europe
  { value: "SEK", label: "SEK (kr) - Swedish Krona", symbol: "kr" },
  { value: "NOK", label: "NOK (kr) - Norwegian Krone", symbol: "kr" },
  { value: "DKK", label: "DKK (kr) - Danish Krone", symbol: "kr" },
  { value: "PLN", label: "PLN (zł) - Polish Złoty", symbol: "zł" },
  { value: "CZK", label: "CZK (Kč) - Czech Koruna", symbol: "Kč" },
  { value: "HUF", label: "HUF (Ft) - Hungarian Forint", symbol: "Ft" },
  { value: "RON", label: "RON (lei) - Romanian Leu", symbol: "lei" },

  // Middle East & Africa
  { value: "ILS", label: "ILS (₪) - Israeli Shekel", symbol: "₪" },
  // Middle East & Africa (continued)
  { value: "AED", label: "AED (د.إ) - UAE Dirham", symbol: "د.إ" },
  { value: "SAR", label: "SAR (﷼) - Saudi Riyal", symbol: "﷼" },
  { value: "QAR", label: "QAR (ر.ق) - Qatari Riyal", symbol: "ر.ق" },
  { value: "KWD", label: "KWD (د.ك) - Kuwaiti Dinar", symbol: "د.ك" },
  { value: "EGP", label: "EGP (ج.م) - Egyptian Pound", symbol: "ج.م" },
  { value: "ZAR", label: "ZAR (R) - South African Rand", symbol: "R" },
  { value: "TRY", label: "TRY (₺) - Turkish Lira", symbol: "₺" },
  { value: "NGN", label: "NGN (₦) - Nigerian Naira", symbol: "₦" },
  { value: "MAD", label: "MAD (د.م.) - Moroccan Dirham", symbol: "د.م." },

  // Other Major Currencies
  { value: "RUB", label: "RUB (₽) - Russian Ruble", symbol: "₽" },
  { value: "UAH", label: "UAH (₴) - Ukrainian Hryvnia", symbol: "₴" },
  { value: "KZT", label: "KZT (₸) - Kazakhstani Tenge", symbol: "₸" },

  // Regional Currencies
  { value: "XAF", label: "XAF (FCFA) - Central African CFA", symbol: "FCFA" },
  { value: "XOF", label: "XOF (CFA) - West African CFA", symbol: "CFA" },
  { value: "XCD", label: "XCD ($) - East Caribbean Dollar", symbol: "$" },
  { value: "XPF", label: "XPF (₣) - CFP Franc", symbol: "₣" },

  // Cryptocurrencies (if needed)
  { value: "BTC", label: "BTC (₿) - Bitcoin", symbol: "₿" },
  { value: "ETH", label: "ETH (Ξ) - Ethereum", symbol: "Ξ" },
];

// Optional: Add currency groups for better organization in UI
export const currencyGroups = {
  major: ["USD", "EUR", "GBP", "JPY", "CNY", "CHF"],
  americas: ["CAD", "MXN", "BRL", "ARS", "CLP", "COP", "PEN"],
  asiaPacific: [
    "AUD",
    "NZD",
    "INR",
    "KRW",
    "SGD",
    "HKD",
    "TWD",
    "THB",
    "VND",
    "IDR",
    "MYR",
    "PHP",
  ],
  europe: ["SEK", "NOK", "DKK", "PLN", "CZK", "HUF", "RON"],
  middleEastAfrica: [
    "ILS",
    "AED",
    "SAR",
    "QAR",
    "KWD",
    "EGP",
    "ZAR",
    "TRY",
    "NGN",
    "MAD",
  ],
  other: ["RUB", "UAH", "KZT"],
  regional: ["XAF", "XOF", "XCD", "XPF"],
  crypto: ["BTC", "ETH"],
};

// Helper function to get currency info
export const getCurrencyInfo = (currencyCode: string) => {
  return (
    availableCurrencies.find((currency) => currency.value === currencyCode) || {
      value: currencyCode,
      label: currencyCode,
      symbol: currencyCode,
    }
  );
};

// Helper function to format currency with proper locale
export const formatCurrencyValue = (
  amount: number,
  currency: string,
  locale: string = "en-US",
  options: Intl.NumberFormatOptions = {}
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(amount);
};
