"use client";

import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { Feature, Geometry } from "geojson";
import bbox from "@turf/bbox";
import { CountryFeature, useCountries } from "@/hooks/useCountries";
import { getCountryTaxData, getTaxBandColor } from "@/utils/countryTaxData";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const countries = useCountries();

  // Dynamically adjust globe size based on container
  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        if (containerRef.current) {
          setDimensions({
            width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight,
          });
        }
      };

      // Initial size
      updateDimensions();

      // Update on resize
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(containerRef.current);

      return () => {
        if (containerRef.current) {
          resizeObserver.unobserve(containerRef.current);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (selectedCountry && globeRef.current && countries.length > 0) {
      const controls = globeRef.current.controls();
      controls.autoRotate = false;

      const countryFeature = countries.find(
        (feature) => feature.properties.ISO_A2 === selectedCountry
      );

      if (countryFeature) {
        const bboxCoords = bbox(countryFeature as Feature<Geometry>);
        const centerLng = (bboxCoords[0] + bboxCoords[2]) / 2;
        const centerLat = (bboxCoords[1] + bboxCoords[3]) / 2;

        setTimeout(() => {
          globeRef.current.pointOfView(
            {
              lat: centerLat,
              lng: centerLng,
              altitude: 1.6,
            },
            1250 // Increased duration for smoother transition
          );
        }, 100);
      }
    } else if (!selectedCountry && globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      globeRef.current.pointOfView({
        lat: 0,
        lng: 0,
        altitude: 2.5,
      });
    }
  }, [selectedCountry, countries]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl={
          isDarkMode ? 
            "https://unpkg.com/three-globe@2.24.4/example/img/earth-night.jpg" : 
            "https://unpkg.com/three-globe@2.24.4/example/img/earth-blue-marble.jpg"
        }
        backgroundColor={isDarkMode ? "rgba(10,10,25,1)" : "rgba(240,240,245,1)"}
        atmosphereColor={isDarkMode ? "rgba(70,70,120,0.8)" : "rgba(180,180,255,0.3)"}
        atmosphereAltitude={0.1}
        polygonsData={countries}
        polygonCapColor={(d) => {
          const country = d as CountryFeature;
          const countryCode = country.properties.ISO_A2;
          
          if (countryCode === selectedCountry) {
            return "rgba(255, 100, 100, 0.8)";
          }
          
          const taxData = getCountryTaxData(countryCode);
          return isDarkMode 
            ? `${getTaxBandColor(taxData.taxBand, true)}80` // 50% opacity
            : `${getTaxBandColor(taxData.taxBand, false)}80`; // 50% opacity
        }}
        polygonSideColor={() => "rgba(0, 0, 0, 0)"}
        polygonStrokeColor={() => isDarkMode ? "#aaa" : "#666"}
        polygonAltitude={0.003}
        polygonLabel={(d) => {
          const country = d as CountryFeature;
          const countryName = country.properties.ADMIN;
          const countryCode = country.properties.ISO_A2;
          
          const taxData = getCountryTaxData(countryCode);
          const taxBandColor = getTaxBandColor(taxData.taxBand, isDarkMode);
          
          // Special note for flat tax or no tax countries
          let specialNote = '';
          if (taxData.notes) {
            specialNote = `<div style="font-style: italic; font-size: 12px; margin-top: 4px;">${taxData.notes}</div>`;
          } else if (taxData.hasFlatTax) {
            specialNote = '<div style="font-style: italic; font-size: 12px; margin-top: 4px;">Flat tax system</div>';
          }
          
          return `
            <div style="
              background-color: ${isDarkMode ? 'rgba(30, 30, 45, 0.95)' : 'rgba(255, 255, 255, 0.95)'}; 
              color: ${isDarkMode ? 'white' : '#333344'}; 
              border-radius: 6px;
              padding: 14px;
              font-family: system-ui, -apple-system, sans-serif;
              box-shadow: 0 4px 20px rgba(0,0,0,0.3);
              min-width: 200px;
            ">
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                border-bottom: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
                padding-bottom: 8px;
              ">
                <div style="font-weight: bold; font-size: 18px;">${countryName}</div>
                <div style="
                  font-size: 12px;
                  padding: 3px 8px;
                  border-radius: 12px;
                  background-color: ${taxBandColor};
                  color: white;
                  font-weight: 500;
                ">${taxData.taxBand.replace('-', ' ').toUpperCase()}</div>
              </div>
              
              <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 8px;
              ">
                <div style="font-size: 14px; color: ${isDarkMode ? '#a0a0b8' : '#666680'};">
                  Maximum Tax Rate:
                </div>
                <div style="
                  font-size: 18px; 
                  font-weight: bold;
                  color: ${taxBandColor};
                ">${taxData.maxRate}%</div>
              </div>
              
              <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: ${specialNote ? '6px' : '0'};
              ">
                <div style="font-size: 14px; color: ${isDarkMode ? '#a0a0b8' : '#666680'};">
                  Country Code:
                </div>
                <div style="font-size: 14px; font-weight: 500;">
                  ${countryCode}
                </div>
              </div>
              
              ${specialNote}
            </div>
          `;
        }}
        onPolygonClick={(polygon, event) => {
          const country = polygon as CountryFeature;
          if (country.properties.ISO_A2 && 
              country.properties.ISO_A2 !== "-" && 
              country.properties.ISO_A2 !== "-99") {
            onCountryClick(country.properties.ISO_A2);
          }
        }}
        polygonsTransitionDuration={300}
      />
    </div>
  );
}
