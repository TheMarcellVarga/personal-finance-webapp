/**
 * Coordinates for microstates and tax havens that are difficult to see/click on a world map
 * These are used for placing marker points at the correct geographic locations
 */

// Predefined coordinates for key microstates and tax havens
export const MICROSTATE_COORDS: Record<string, [number, number]> = {
  // Europe
  'MC': [43.7384, 7.4246],     // Monaco
  'LI': [47.1660, 9.5554],     // Liechtenstein
  'AD': [42.5063, 1.5218],     // Andorra
  'MT': [35.9375, 14.3754],    // Malta
  'LU': [49.8153, 6.1296],     // Luxembourg
  'SM': [43.9424, 12.4578],    // San Marino
  'VA': [41.9029, 12.4534],    // Vatican City
  'CY': [35.1264, 33.4299],    // Cyprus
  'IM': [54.2361, -4.5481],    // Isle of Man
  'JE': [49.2144, -2.1312],    // Jersey
  'GG': [49.4657, -2.5853],    // Guernsey
  
  // Caribbean & Americas
  'BS': [25.0343, -77.3963],   // Bahamas
  'KY': [19.3133, -81.2546],   // Cayman Islands
  'BM': [32.3078, -64.7505],   // Bermuda
  'BB': [13.1939, -59.5432],   // Barbados
  'AG': [17.0608, -61.7964],   // Antigua and Barbuda
  'VC': [13.2528, -61.1972],   // Saint Vincent
  'LC': [13.9094, -60.9789],   // Saint Lucia
  'KN': [17.3578, -62.7830],   // Saint Kitts
  'DM': [15.4150, -61.3710],   // Dominica
  'GD': [12.1165, -61.6790],   // Grenada
  
  // Asia & Pacific
  'SG': [1.3521, 103.8198],    // Singapore
  'BN': [4.5353, 114.7277],    // Brunei
  'BH': [26.0667, 50.5577],    // Bahrain
  'MV': [3.2028, 73.2207],     // Maldives
  'HK': [22.3193, 114.1694],   // Hong Kong
  'MO': [22.1987, 113.5439],   // Macau
  'MU': [-20.3484, 57.5522],   // Mauritius
  'SC': [-4.6796, 55.4920],    // Seychelles
  'WS': [-13.7590, -172.1046], // Samoa
  'VU': [-15.3767, 166.9592],  // Vanuatu
};

// List of important tax havens (microstates with favorable tax regimes)
export const TAX_HAVEN_CODES = [
  'MC', 'LI', 'AD', 'MT', 'LU', 'SM', 'CY', 'IM', 'JE', 'GG',  // Europe
  'BS', 'KY', 'BM', 'BB', 'AG', 'LC', 'VC', 'KN',              // Caribbean
  'SG', 'BN', 'BH', 'HK', 'MO', 'MU', 'SC', 'VU'               // Asia/Pacific
]; 