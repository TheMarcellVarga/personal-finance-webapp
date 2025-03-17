import { useState, useEffect } from "react";
import { Feature, Geometry } from "geojson";

export interface CountryFeature extends Feature {
  properties: {
    ISO_A2: string;
    NAME: string;
    ADMIN: string;
    currency?: string;
    geometry: Geometry;
  };
}

// Map of special territory names to proper ISO codes
const specialTerritoryCodes: Record<string, string> = {
  "Antarctica": "AQ",
  "French Southern and Antarctic Lands": "TF",
  "Bouvet Island": "BV",
  "Heard Island and McDonald Islands": "HM",
  "South Georgia and the South Sandwich Islands": "GS"
};

export function useCountries() {
  const [countries, setCountries] = useState<CountryFeature[]>([]);

  useEffect(() => {
    fetch("/ne_110m_admin_0_countries.geojson")
      .then((res) => res.json())
      .then((data) => {
        // Process the countries to handle problematic -99 codes
        const processedFeatures = data.features.map((country: CountryFeature) => {
          // Fix countries with -99 code if they have a known mapping
          if (country.properties.ISO_A2 === "-99" && country.properties.ADMIN in specialTerritoryCodes) {
            return {
              ...country,
              properties: {
                ...country.properties,
                ISO_A2: specialTerritoryCodes[country.properties.ADMIN]
              }
            };
          }
          return country;
        });

        // Filter out any remaining countries with -99 code that couldn't be mapped
        const filteredFeatures = processedFeatures.filter((country: CountryFeature) => 
          country.properties.ISO_A2 !== "-99"
        );
        
        setCountries(filteredFeatures);
      });
  }, []);

  return countries;
}
