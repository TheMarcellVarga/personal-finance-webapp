"use client";

import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import { Feature, Geometry } from 'geojson';
import bbox from '@turf/bbox';
import { CountryFeature, useCountries } from "@/hooks/useCountry";

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
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = false;
      controls.enabled = true;
    }
  }, []);

  useEffect(() => {
    if (selectedCountry && globeRef.current && countries.length > 0) {
      const countryFeature = countries.find(
        (feature) => feature.properties.ISO_A2 === selectedCountry
      );

      if (countryFeature) {
        // @ts-ignore or use type assertion if needed
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
        pointLabel="name"
        pointRadius={0.5}
        pointAltitude={0.1}
        backgroundColor="rgba(0,0,0,0)"
        width={size.width}
        height={size.height}
        animateIn={true}
        atmosphereColor={isDarkMode ? "#ffffff" : "#1f1f1f"}
        atmosphereAltitude={0.1}
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        hexPolygonColor={(d: any) => {
          const country = d as CountryFeature;
          return country.properties.ISO_A2 === selectedCountry
            ? "#ff5233"
            : "#1f2937";
        }}
        onHexPolygonClick={(polygon: any) => {
          const country = polygon as CountryFeature;
          onCountryClick(country.properties.ISO_A2);
        }}
        hexPolygonLabel={(d: any) => {
          const country = d as CountryFeature;
          return `
            <div class="bg-black/80 p-2 rounded-lg">
              <div class="text-white">${country.properties.NAME}</div>
              <div class="text-gray-400">Click to select</div>
            </div>
          `;
        }}
      />
    </div>
  );
}
