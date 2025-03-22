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

/**
 * Currency code mappings by country code
 */
const countryCurrencyMap: Record<string, string> = {
  US: "USD", // United States
  UK: "GBP", // United Kingdom
  GB: "GBP", // Great Britain
  CA: "CAD", // Canada
  AU: "AUD", // Australia
  NZ: "NZD", // New Zealand
  EU: "EUR", // European Union
  DE: "EUR", // Germany
  FR: "EUR", // France
  IT: "EUR", // Italy
  ES: "EUR", // Spain
  PT: "EUR", // Portugal
  IE: "EUR", // Ireland
  NL: "EUR", // Netherlands
  BE: "EUR", // Belgium
  AT: "EUR", // Austria
  FI: "EUR", // Finland
  GR: "EUR", // Greece
  JP: "JPY", // Japan
  CN: "CNY", // China
  IN: "INR", // India
  BR: "BRL", // Brazil
  RU: "RUB", // Russia
  ZA: "ZAR", // South Africa
  MX: "MXN", // Mexico
  SG: "SGD", // Singapore
  CH: "CHF", // Switzerland
  SE: "SEK", // Sweden
  NO: "NOK", // Norway
  DK: "DKK", // Denmark
  BG: "BGN", // Bulgaria
  HR: "EUR", // Croatia
  CY: "EUR", // Cyprus
  CZ: "CZK", // Czech Republic
  EE: "EUR", // Estonia
  HU: "HUF", // Hungary
  LV: "EUR", // Latvia
  LT: "EUR", // Lithuania
  LU: "EUR", // Luxembourg
  MT: "EUR", // Malta
  PL: "PLN", // Poland
  RO: "RON", // Romania
  SK: "EUR", // Slovakia
  SI: "EUR", // Slovenia
  AL: "ALL", // Albania
  BA: "BAM", // Bosnia and Herzegovina
  BY: "BYN", // Belarus
  IS: "ISK", // Iceland
  MD: "MDL", // Moldova
  RS: "RSD", // Serbia
  UA: "UAH", // Ukraine
  CL: "CLP", // Chile
  CO: "COP", // Colombia
  JM: "JMD", // Jamaica
  TT: "TTD", // Trinidad and Tobago
  ID: "IDR", // Indonesia
  MY: "MYR", // Malaysia
  TH: "THB", // Thailand
  VN: "VND", // Vietnam
  IL: "ILS", // Israel
  SA: "SAR", // Saudi Arabia
  EG: "EGP", // Egypt
  NG: "NGN", // Nigeria
  FJ: "FJD", // Fiji
  PG: "PGK", // Papua New Guinea
  WS: "WST", // Samoa
  TO: "TOP", // Tonga
  BS: "BSD", // Bahamas
  BB: "BBD", // Barbados
  LC: "XCD", // Saint Lucia
  VC: "XCD", // Saint Vincent and the Grenadines
  GL: "DKK", // Greenland (Denmark)
  FO: "DKK", // Faroe Islands (Denmark)
};

/**
 * Get currency code for a given country code
 * @param countryCode The 2-letter country code
 * @returns The currency code or undefined if not found
 */
export const getCountryCurrency = (countryCode: string): string | undefined => {
  return countryCurrencyMap[countryCode];
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
    BTC: "₿",
    ETH: "Ξ",
    USDT: "₮",
    BNB: "BNB",
    XRP: "XRP",
    SOL: "SOL",
    ADA: "₳",
    DOGE: "Ð",
    DOT: "DOT",
    MATIC: "MATIC",
    SHIB: "SHIB",
    LTC: "Ł",
    LINK: "LINK",
    UNI: "UNI",
    AVAX: "AVAX",
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

  // Cryptocurrencies
  { value: "BTC", label: "BTC (₿) - Bitcoin", symbol: "₿" },
  { value: "ETH", label: "ETH (Ξ) - Ethereum", symbol: "Ξ" },
  { value: "USDT", label: "USDT (₮) - Tether", symbol: "₮" },
  { value: "BNB", label: "BNB - Binance Coin", symbol: "BNB" },
  { value: "XRP", label: "XRP - Ripple", symbol: "XRP" },
  { value: "SOL", label: "SOL - Solana", symbol: "SOL" },
  { value: "ADA", label: "ADA (₳) - Cardano", symbol: "₳" },
  { value: "DOGE", label: "DOGE (Ð) - Dogecoin", symbol: "Ð" },
  { value: "DOT", label: "DOT - Polkadot", symbol: "DOT" },
  { value: "MATIC", label: "MATIC - Polygon", symbol: "MATIC" },
  { value: "SHIB", label: "SHIB - Shiba Inu", symbol: "SHIB" },
  { value: "LTC", label: "LTC (Ł) - Litecoin", symbol: "Ł" },
  { value: "LINK", label: "LINK - Chainlink", symbol: "LINK" },
  { value: "UNI", label: "UNI - Uniswap", symbol: "UNI" },
  { value: "AVAX", label: "AVAX - Avalanche", symbol: "AVAX" },
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
  crypto: [
    "BTC", 
    "ETH", 
    "USDT", 
    "BNB", 
    "XRP", 
    "SOL", 
    "ADA", 
    "DOGE", 
    "DOT", 
    "MATIC", 
    "SHIB", 
    "LTC", 
    "LINK", 
    "UNI", 
    "AVAX"
  ],
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

/**
 * Format a number as currency based on country code
 * @param amount The amount to format
 * @param countryCode The country code to determine currency
 * @returns Formatted currency string
 */
export const formatCurrencyForCountry = (
  amount: number,
  countryCode: string
): string => {
  const currency = getCountryCurrency(countryCode) || "USD";
  
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
