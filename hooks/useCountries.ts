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

export function useCountries() {
  const [countries, setCountries] = useState<CountryFeature[]>([]);

  useEffect(() => {
    fetch("/ne_110m_admin_0_countries.geojson")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.features);
      });
  }, []);

  return countries;
}
