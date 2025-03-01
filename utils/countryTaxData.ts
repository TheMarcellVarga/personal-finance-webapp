/**
 * Comprehensive global tax rate data
 * Note: These rates are approximations and can change due to policy updates.
 * Data includes maximum income tax rates (%) for countries worldwide.
 */

export interface CountryTaxData {
  maxRate: number;        // Maximum income tax rate in percentage
  taxBand: TaxBand;       // Classification of tax burden
  effectiveAt?: number;   // Income level where max rate applies (USD)
  hasFlatTax?: boolean;   // Whether the country has a flat tax system
  notes?: string;         // Additional tax system notes
}

export type TaxBand = 'no-tax' | 'very-low' | 'low' | 'medium' | 'high' | 'very-high';

const getTaxBand = (rate: number): TaxBand => {
  if (rate === 0) return 'no-tax';
  if (rate <= 15) return 'very-low';
  if (rate <= 25) return 'low';
  if (rate <= 40) return 'medium';
  if (rate <= 50) return 'high';
  return 'very-high';
};

// Full country tax data map (ISO_A2 country code to tax data)
const countryTaxData: Record<string, CountryTaxData> = {
  // Africa
  'DZ': { maxRate: 35, taxBand: getTaxBand(35) },
  'AO': { maxRate: 25, taxBand: getTaxBand(25) },
  'BJ': { maxRate: 45, taxBand: getTaxBand(45) },
  'BW': { maxRate: 25, taxBand: getTaxBand(25) },
  'BF': { maxRate: 27.5, taxBand: getTaxBand(27.5) },
  'BI': { maxRate: 35, taxBand: getTaxBand(35) },
  'CV': { maxRate: 35, taxBand: getTaxBand(35) },
  'CM': { maxRate: 35, taxBand: getTaxBand(35) },
  'CF': { maxRate: 50, taxBand: getTaxBand(50) },
  'TD': { maxRate: 60, taxBand: getTaxBand(60) },
  'KM': { maxRate: 30, taxBand: getTaxBand(30) },
  'CD': { maxRate: 40, taxBand: getTaxBand(40) },
  'CG': { maxRate: 40, taxBand: getTaxBand(40) },
  'CI': { maxRate: 36, taxBand: getTaxBand(36) },
  'DJ': { maxRate: 30, taxBand: getTaxBand(30) },
  'EG': { maxRate: 25, taxBand: getTaxBand(25) },
  'GQ': { maxRate: 35, taxBand: getTaxBand(35) },
  'ER': { maxRate: 30, taxBand: getTaxBand(30) },
  'SZ': { maxRate: 33, taxBand: getTaxBand(33) },
  'ET': { maxRate: 35, taxBand: getTaxBand(35) },
  'GA': { maxRate: 35, taxBand: getTaxBand(35) },
  'GM': { maxRate: 35, taxBand: getTaxBand(35) },
  'GH': { maxRate: 30, taxBand: getTaxBand(30) },
  'GN': { maxRate: 40, taxBand: getTaxBand(40) },
  'GW': { maxRate: 20, taxBand: getTaxBand(20) },
  'KE': { maxRate: 30, taxBand: getTaxBand(30) },
  'LS': { maxRate: 30, taxBand: getTaxBand(30) },
  'LR': { maxRate: 25, taxBand: getTaxBand(25) },
  'LY': { maxRate: 10, taxBand: getTaxBand(10), hasFlatTax: true },
  'MG': { maxRate: 20, taxBand: getTaxBand(20) },
  'MW': { maxRate: 30, taxBand: getTaxBand(30) },
  'ML': { maxRate: 40, taxBand: getTaxBand(40) },
  'MR': { maxRate: 40, taxBand: getTaxBand(40) },
  'MU': { maxRate: 15, taxBand: getTaxBand(15), hasFlatTax: true },
  'MA': { maxRate: 38, taxBand: getTaxBand(38) },
  'MZ': { maxRate: 32, taxBand: getTaxBand(32) },
  'NA': { maxRate: 37, taxBand: getTaxBand(37) },
  'NE': { maxRate: 35, taxBand: getTaxBand(35) },
  'NG': { maxRate: 24, taxBand: getTaxBand(24) },
  'RW': { maxRate: 30, taxBand: getTaxBand(30) },
  'ST': { maxRate: 25, taxBand: getTaxBand(25) },
  'SN': { maxRate: 40, taxBand: getTaxBand(40) },
  'SC': { maxRate: 15, taxBand: getTaxBand(15), hasFlatTax: true },
  'SL': { maxRate: 35, taxBand: getTaxBand(35) },
  'SO': { maxRate: 10, taxBand: getTaxBand(10) },
  'ZA': { maxRate: 45, taxBand: getTaxBand(45) },
  'SS': { maxRate: 15, taxBand: getTaxBand(15) },
  'SD': { maxRate: 15, taxBand: getTaxBand(15) },
  'TZ': { maxRate: 30, taxBand: getTaxBand(30) },
  'TG': { maxRate: 35, taxBand: getTaxBand(35) },
  'TN': { maxRate: 35, taxBand: getTaxBand(35) },
  'UG': { maxRate: 40, taxBand: getTaxBand(40) },
  'ZM': { maxRate: 37.5, taxBand: getTaxBand(37.5) },
  'ZW': { maxRate: 45, taxBand: getTaxBand(45) },

  // Americas
  'AG': { maxRate: 25, taxBand: getTaxBand(25) },
  'AR': { maxRate: 35, taxBand: getTaxBand(35) },
  'BS': { maxRate: 0, taxBand: getTaxBand(0), notes: 'No income tax' },
  'BB': { maxRate: 33.5, taxBand: getTaxBand(33.5) },
  'BZ': { maxRate: 25, taxBand: getTaxBand(25) },
  'BO': { maxRate: 13, taxBand: getTaxBand(13) },
  'BR': { maxRate: 27.5, taxBand: getTaxBand(27.5) },
  'CA': { maxRate: 53.53, taxBand: getTaxBand(53.53), notes: 'Combined federal and provincial' },
  'CL': { maxRate: 40, taxBand: getTaxBand(40) },
  'CO': { maxRate: 39, taxBand: getTaxBand(39) },
  'CR': { maxRate: 25, taxBand: getTaxBand(25) },
  'CU': { maxRate: 50, taxBand: getTaxBand(50) },
  'DM': { maxRate: 35, taxBand: getTaxBand(35) },
  'DO': { maxRate: 25, taxBand: getTaxBand(25) },
  'EC': { maxRate: 35, taxBand: getTaxBand(35) },
  'SV': { maxRate: 30, taxBand: getTaxBand(30) },
  'GD': { maxRate: 30, taxBand: getTaxBand(30) },
  'GT': { maxRate: 7, taxBand: getTaxBand(7), hasFlatTax: true },
  'GY': { maxRate: 33.33, taxBand: getTaxBand(33.33) },
  'HT': { maxRate: 30, taxBand: getTaxBand(30) },
  'HN': { maxRate: 25, taxBand: getTaxBand(25) },
  'JM': { maxRate: 30, taxBand: getTaxBand(30) },
  'MX': { maxRate: 35, taxBand: getTaxBand(35) },
  'NI': { maxRate: 30, taxBand: getTaxBand(30) },
  'PA': { maxRate: 25, taxBand: getTaxBand(25) },
  'PY': { maxRate: 10, taxBand: getTaxBand(10), hasFlatTax: true },
  'PE': { maxRate: 30, taxBand: getTaxBand(30) },
  'KN': { maxRate: 30, taxBand: getTaxBand(30) },
  'LC': { maxRate: 30, taxBand: getTaxBand(30) },
  'VC': { maxRate: 30, taxBand: getTaxBand(30) },
  'SR': { maxRate: 38, taxBand: getTaxBand(38) },
  'TT': { maxRate: 25, taxBand: getTaxBand(25) },
  'US': { maxRate: 37, taxBand: getTaxBand(37), notes: 'Federal only, states vary' },
  'UY': { maxRate: 36, taxBand: getTaxBand(36) },
  'VE': { maxRate: 34, taxBand: getTaxBand(34) },

  // Asia
  'AF': { maxRate: 20, taxBand: getTaxBand(20) },
  'AM': { maxRate: 22, taxBand: getTaxBand(22), hasFlatTax: true },
  'AZ': { maxRate: 25, taxBand: getTaxBand(25) },
  'BH': { maxRate: 0, taxBand: getTaxBand(0), notes: 'No income tax' },
  'BD': { maxRate: 25, taxBand: getTaxBand(25) },
  'BT': { maxRate: 25, taxBand: getTaxBand(25) },
  'BN': { maxRate: 0, taxBand: getTaxBand(0), notes: 'No income tax' },
  'KH': { maxRate: 20, taxBand: getTaxBand(20) },
  'CN': { maxRate: 45, taxBand: getTaxBand(45) },
  'GE': { maxRate: 20, taxBand: getTaxBand(20), hasFlatTax: true },
  'IN': { maxRate: 30, taxBand: getTaxBand(30) },
  'ID': { maxRate: 35, taxBand: getTaxBand(35) },
  'IR': { maxRate: 35, taxBand: getTaxBand(35) },
  'IQ': { maxRate: 15, taxBand: getTaxBand(15) },
  'IL': { maxRate: 50, taxBand: getTaxBand(50) },
  'JP': { maxRate: 55.97, taxBand: getTaxBand(55.97), notes: 'Including local taxes' },
  'JO': { maxRate: 30, taxBand: getTaxBand(30) },
  'KZ': { maxRate: 10, taxBand: getTaxBand(10), hasFlatTax: true },
  'KW': { maxRate: 0, taxBand: getTaxBand(0), notes: 'No income tax' },
  'KG': { maxRate: 10, taxBand: getTaxBand(10), hasFlatTax: true },
  'LA': { maxRate: 24, taxBand: getTaxBand(24) },
  'LB': { maxRate: 25, taxBand: getTaxBand(25) },
  'MY': { maxRate: 30, taxBand: getTaxBand(30) },
  'MV': { maxRate: 15, taxBand: getTaxBand(15) },
  'MN': { maxRate: 10, taxBand: getTaxBand(10), hasFlatTax: true },
  'MM': { maxRate: 25, taxBand: getTaxBand(25) },
  'NP': { maxRate: 36, taxBand: getTaxBand(36) },
  'OM': { maxRate: 0, taxBand: getTaxBand(0), notes: 'No personal income tax' },
  'PK': { maxRate: 35, taxBand: getTaxBand(35) },
  'PH': { maxRate: 35, taxBand: getTaxBand(35) },
  'QA': { maxRate: 0, taxBand: getTaxBand(0), notes: 'No income tax' },
  'SA': { maxRate: 0, taxBand: getTaxBand(0), notes: 'No income tax' },
  'SG': { maxRate: 22, taxBand: getTaxBand(22) },
  'KR': { maxRate: 45, taxBand: getTaxBand(45) },
  'LK': { maxRate: 24, taxBand: getTaxBand(24) },
  'SY': { maxRate: 22, taxBand: getTaxBand(22) },
  'TW': { maxRate: 40, taxBand: getTaxBand(40) },
  'TJ': { maxRate: 13, taxBand: getTaxBand(13), hasFlatTax: true },
  'TH': { maxRate: 35, taxBand: getTaxBand(35) },
  'TL': { maxRate: 10, taxBand: getTaxBand(10), hasFlatTax: true },
  'TR': { maxRate: 40, taxBand: getTaxBand(40) },
  'TM': { maxRate: 10, taxBand: getTaxBand(10), hasFlatTax: true },
  'AE': { maxRate: 0, taxBand: getTaxBand(0), notes: 'No income tax' },
  'UZ': { maxRate: 12, taxBand: getTaxBand(12), hasFlatTax: true },
  'VN': { maxRate: 35, taxBand: getTaxBand(35) },
  'YE': { maxRate: 15, taxBand: getTaxBand(15) },

  // Europe
  'AL': { maxRate: 23, taxBand: getTaxBand(23) },
  'AD': { maxRate: 10, taxBand: getTaxBand(10) },
  'AT': { maxRate: 55, taxBand: getTaxBand(55) },
  'BY': { maxRate: 13, taxBand: getTaxBand(13), hasFlatTax: true },
  'BE': { maxRate: 53.5, taxBand: getTaxBand(53.5) },
  'BA': { maxRate: 10, taxBand: getTaxBand(10), hasFlatTax: true },
  'BG': { maxRate: 10, taxBand: getTaxBand(10), hasFlatTax: true },
  'HR': { maxRate: 30, taxBand: getTaxBand(30) },
  'CY': { maxRate: 35, taxBand: getTaxBand(35) },
  'CZ': { maxRate: 23, taxBand: getTaxBand(23) },
  'DK': { maxRate: 55.9, taxBand: getTaxBand(55.9) },
  'EE': { maxRate: 20, taxBand: getTaxBand(20), hasFlatTax: true },
  'FI': { maxRate: 56.95, taxBand: getTaxBand(56.95) },
  'FR': { maxRate: 55.4, taxBand: getTaxBand(55.4), notes: 'Including social contributions' },
  'DE': { maxRate: 47.5, taxBand: getTaxBand(47.5), notes: 'Including solidarity surcharge' },
  'GR': { maxRate: 44, taxBand: getTaxBand(44) },
  'HU': { maxRate: 15, taxBand: getTaxBand(15), hasFlatTax: true },
  'IS': { maxRate: 46.25, taxBand: getTaxBand(46.25) },
  'IE': { maxRate: 52, taxBand: getTaxBand(52), notes: 'Including USC' },
  'IT': { maxRate: 47.23, taxBand: getTaxBand(47.23), notes: 'Including regional tax' },
  'XK': { maxRate: 10, taxBand: getTaxBand(10) },
  'LV': { maxRate: 31, taxBand: getTaxBand(31) },
  'LI': { maxRate: 24, taxBand: getTaxBand(24) },
  'LT': { maxRate: 20, taxBand: getTaxBand(20) },
  'LU': { maxRate: 45.78, taxBand: getTaxBand(45.78) },
  'MT': { maxRate: 35, taxBand: getTaxBand(35) },
  'MD': { maxRate: 12, taxBand: getTaxBand(12), hasFlatTax: true },
  'MC': { maxRate: 0, taxBand: getTaxBand(0), notes: 'No income tax for residents' },
  'ME': { maxRate: 15, taxBand: getTaxBand(15) },
  'NL': { maxRate: 49.5, taxBand: getTaxBand(49.5) },
  'MK': { maxRate: 10, taxBand: getTaxBand(10), hasFlatTax: true },
  'NO': { maxRate: 47.4, taxBand: getTaxBand(47.4) },
  'PL': { maxRate: 32, taxBand: getTaxBand(32) },
  'PT': { maxRate: 48, taxBand: getTaxBand(48) },
  'RO': { maxRate: 10, taxBand: getTaxBand(10), hasFlatTax: true },
  'RU': { maxRate: 13, taxBand: getTaxBand(13), hasFlatTax: true },
  'SM': { maxRate: 35, taxBand: getTaxBand(35) },
  'RS': { maxRate: 15, taxBand: getTaxBand(15) },
  'SK': { maxRate: 25, taxBand: getTaxBand(25) },
  'SI': { maxRate: 50, taxBand: getTaxBand(50) },
  'ES': { maxRate: 47, taxBand: getTaxBand(47), notes: 'Varies by autonomous community' },
  'SE': { maxRate: 57.2, taxBand: getTaxBand(57.2) },
  'CH': { maxRate: 40, taxBand: getTaxBand(40), notes: 'Federal, cantonal and communal taxes' },
  'UA': { maxRate: 18, taxBand: getTaxBand(18), hasFlatTax: true },
  'GB': { maxRate: 45, taxBand: getTaxBand(45) },
  'VA': { maxRate: 0, taxBand: getTaxBand(0), notes: 'No income tax' },

  // Oceania
  'AU': { maxRate: 45, taxBand: getTaxBand(45) },
  'FJ': { maxRate: 20, taxBand: getTaxBand(20) },
  'KI': { maxRate: 35, taxBand: getTaxBand(35) },
  'MH': { maxRate: 12, taxBand: getTaxBand(12) },
  'FM': { maxRate: 10, taxBand: getTaxBand(10) },
  'NR': { maxRate: 0, taxBand: getTaxBand(0), notes: 'No income tax' },
  'NZ': { maxRate: 39, taxBand: getTaxBand(39) },
  'PW': { maxRate: 12, taxBand: getTaxBand(12) },
  'PG': { maxRate: 42, taxBand: getTaxBand(42) },
  'WS': { maxRate: 27, taxBand: getTaxBand(27) },
  'SB': { maxRate: 40, taxBand: getTaxBand(40) },
  'TO': { maxRate: 20, taxBand: getTaxBand(20) },
  'TV': { maxRate: 30, taxBand: getTaxBand(30) },
  'VU': { maxRate: 0, taxBand: getTaxBand(0), notes: 'No income tax' },
};

/**
 * Get tax data for a specific country by ISO country code
 */
export const getCountryTaxData = (countryCode: string): CountryTaxData => {
  // Default tax data for countries not in the database
  const defaultTaxData: CountryTaxData = {
    maxRate: 25,
    taxBand: 'medium',
  };

  return countryTaxData[countryCode] || defaultTaxData;
};

/**
 * Get all available country tax data
 */
export const getAllCountryTaxData = (): Record<string, CountryTaxData> => {
  return countryTaxData;
};

/**
 * Get color for tax band visualization
 */
export const getTaxBandColor = (band: TaxBand, isDarkMode: boolean): string => {
  switch(band) {
    case 'no-tax':
      return isDarkMode ? '#00cec9' : '#00b894';
    case 'very-low':
      return isDarkMode ? '#55efc4' : '#00b894';
    case 'low':
      return isDarkMode ? '#ffeaa7' : '#fdcb6e';
    case 'medium':
      return isDarkMode ? '#fab1a0' : '#e17055';
    case 'high':
      return isDarkMode ? '#ff7675' : '#d63031';
    case 'very-high':
      return isDarkMode ? '#ff7675' : '#e74c3c';
    default:
      return isDarkMode ? '#a0a0b8' : '#666680';
  }
}; 