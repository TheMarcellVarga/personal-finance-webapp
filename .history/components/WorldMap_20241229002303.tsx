// components/WorldMap.tsx
'use client'

import { useEffect, useRef } from 'react'
import Globe from 'react-globe.gl'
import * as THREE from 'three'

interface WorldMapProps {
  selectedCountry: string;
  onCountryClick: (country: string) => void;
}

interface CountryData {
  NAME: string;
  ISO_A2: string;
  geometry: any;
}

export default function WorldMap({ selectedCountry, onCountryClick }: WorldMapProps) {
  const globeRef = useRef<any>('');

  useEffect(() => {
    // Auto-rotate
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }

    // Load country data
    fetch('/countries.geojson')
      .then(res => res.json())
      .then(countries => {
        if (globeRef.current) {
          globeRef.current.polygonsData(countries.features);
        }
      });
  }, []);

  return (
    <div className="h-[600px] w-full">
      <Globe
        ref={globeRef}
        width={800}
        height={600}
        backgroundColor="rgba(0,0,0,0)"
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        hexPolygonColor={d => {
          const country = (d as any).properties;
          return country.ISO_A2 === selectedCountry ? '#ff5233' : '#1f2937';
        }}
        onHexPolygonClick={(polygon) => {
          const country = (polygon as any).properties;
          onCountryClick(country.ISO_A2);
        }}
        hexPolygonLabel={d => {
          const country = (d as any).properties;
          return `
            <div class="bg-black/80 p-2 rounded-lg">
              <div class="text-white">${country.NAME}</div>
              <div class="text-gray-400">Click to select</div>
            </div>
          `;
        }}
      />
    </div>
  );
}
