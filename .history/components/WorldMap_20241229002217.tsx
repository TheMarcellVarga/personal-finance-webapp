// components/WorldMap.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

interface WorldMapProps {
  selectedCountry: string;
  onCountryClick: (country: string) => void;
}

export default function WorldMap({
  selectedCountry,
  onCountryClick,
}: WorldMapProps) {
  const globeRef = useRef<any>(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Wait for the globe to be initialized
    if (globeRef.current) {
      // Set initial camera position
      globeRef.current.pointOfView({
        lat: 0,
        lng: 0,
        altitude: 2.5
      });

      // Auto-rotate
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;

      // Load countries data
      fetch("/countries.geojson")
        .then((res) => res.json())
        .then((data) => {
          setCountries(data.features);
        })
        .catch((error) => {
          console.error("Error loading countries data:", error);
        });
    }
  }, []);

  return (
    <div className="h-[600px] w-full">
      <Globe
        ref={globeRef}
        width={800}
        height={600}
        backgroundColor="rgba(0,0,0,0)"
        polygonsData={countries}
        polygonStrokeColor={() => '#111'}
        polygonSideColor={() => 'rgba(0, 100, 200, 0.15)'}
        polygonCapColor={(d) => {
          const country = (d as any).properties;
          return country.ISO_A2 === selectedCountry ? "#ff5233" : "#3b82f6";
        }}
        onPolygonClick={(polygon) => {
          const country = (polygon as any).properties;
          onCountryClick(country.ISO_A2);
        }}
        polygonLabel={(d) => {
          const country = (d as any).properties;
          return `
            <div class="bg-black/80 p-2 rounded-lg">
              <div class="text-white">${country.NAME}</div>
              <div class="text-gray-400">Click to select</div>
            </div>
          `;
        }}
        globeMaterial={
          new THREE.MeshPhongMaterial({
            color: '#ffffff',
            transparent: true,
            opacity: 0.9,
          })
        }
      />
    </div>
  );
}