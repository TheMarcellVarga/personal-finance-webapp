"use client";

import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import { Feature, Geometry } from 'geojson';
import bbox from '@turf/bbox';
import { CountryFeature, useCountries } from "@/hooks/useCountries";

interface WorldMapProps {
  isDarkMode: boolean;
  selectedCountry: string;
  onCountryClick: (countryCode: string) => void;
}

export default function WorldMap({
  isDarkMode,
  selectedCountry,
  onCountryClick,
}: WorldMapProps) {
  const globeRef = useRef<any>(null);
  const size = { width: 600, height: 600 };
  const countries = useCountries();

  useEffect(() => {
    if (selectedCountry && globeRef.current && countries.length > 0) {
      const countryFeature = countries.find(
        (feature) => feature.properties.ISO_A2 === selectedCountry
      );

      if (countryFeature) {
        const bboxCoords = bbox(countryFeature as Feature<Geometry>);
        const centerLng = (bboxCoords[0] + bboxCoords[2]) / 2;
        const centerLat = (bboxCoords[1] + bboxCoords[3]) / 2;

        globeRef.current.pointOfView(
          {
            lat: centerLat,
            lng: centerLng,
            altitude: 2.5,
          },
          1000
        );
      }
    }
  }, [selectedCountry, countries]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Globe
        ref={globeRef}
        globeImageUrl={
          isDarkMode
            ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
            : "//unpkg.com/three-globe/example/img/earth-day.jpg"
        }
        polygonsData={countries}
        polygonCapColor={(d) => {
          const country = d as CountryFeature;
          return country.properties.ISO_A2 === selectedCountry
          ? "#ff5233"
            : isDarkMode 
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)"
        }}
        polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
        polygonStrokeColor={() => "#111"}
        polygonLabel={(d) => {
          const country = d as CountryFeature;
          return `
            <div class="bg-black/80 p-2 rounded-lg">
              <div class="text-white">${country.properties.ADMIN}</div>
              <div class="text-gray-400">Click to select</div>
            </div>
          `;
        }}
        onPolygonClick={(polygon) => {
          const country = polygon as CountryFeature;
          onCountryClick(country.properties.ISO_A2);
        }}
        backgroundColor="rgba(0,0,0,0)"
        width={size.width}
        height={size.height}
        animateIn={true}
        atmosphereColor={isDarkMode ? "#ffffff" : "#1f1f1f"}
        atmosphereAltitude={0.1}
      />
    </div>
  );
}
