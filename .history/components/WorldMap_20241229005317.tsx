// components/WorldMap.tsx
'use client'

import { useEffect, useRef } from 'react'
import Globe from 'react-globe.gl'

interface WorldMapProps {
  isDarkMode: boolean;
  selectedCountry: string;
  onCountryClick: (country: string) => void;
}

interface CountryFeature {
  properties: {
    NAME: string;
    ISO_A2: string;
  };
  geometry: any;
}

const copenhagen = {
  lat: 55.6761,
  lng: 12.5683,
  size: 1,
  color: "#FF4444",
  name: "Copenhagen, Denmark"
};

export default function WorldMap({ isDarkMode, selectedCountry, onCountryClick }: WorldMapProps) {
  const globeRef = useRef<any>();
  const size = { width: 600, height: 600 };
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;
      
      globeRef.current.pointOfView({
        lat: copenhagen.lat,
        lng: copenhagen.lng,
        altitude: 2.5
      }, 1000);
    }

    // Load country data
    fetch('/countries.geojson')
      .then(res => res.json())
      .then(countries => {
        if (globeRef.current) {
          globeRef.current.hexPolygonsData(countries.features);
        }
      });
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Globe
        ref={globeRef}
        globeImageUrl={
          isDarkMode
            ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
            : "//unpkg.com/three-globe/example/img/earth-day.jpg"
        }
        pointsData={[copenhagen]}
        pointLabel="name"
        pointColor={() => copenhagen.color}
        pointRadius={0.5}
        pointAltitude={0.1}
        backgroundColor="rgba(0,0,0,0)"
        width={size.width}
        height={size.height}
        animateIn={true}
        atmosphereColor={isDarkMode ? "#ffffff" : "#1f1f1f"}
        atmosphereAltitude={0.1}
        hexPolygonsData={[]}
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        hexPolygonColor={(d: any) => {
          const country = d as CountryFeature;
          return country.properties.ISO_A2 === selectedCountry ? '#ff5233' : '#1f2937';
        }}
        onHexPolygonClick={(polygon: any, event: MouseEvent, coords: { lat: number; lng: number; altitude: number; }) => {
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
