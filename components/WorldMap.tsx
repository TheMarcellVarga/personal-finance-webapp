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
  const [globeReady, setGlobeReady] = useState(false);
  const [isGlobeInitialized, setIsGlobeInitialized] = useState(false);

  // Use local image files instead of CDN URLs
  const darkGlobeUrl = "/img/earth-night.jpg";
  const lightGlobeUrl = "//unpkg.com/three-globe/example/img/earth-day.jpg";

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

  // Initialize the globe once it's ready
  useEffect(() => {
    if (globeRef.current && globeReady && !isGlobeInitialized) {
      const controls = globeRef.current.controls();
      controls.enableZoom = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.update();
      
      // Set globe material properties to improve rendering quality
      if (globeRef.current.globeMaterial) {
        const material = globeRef.current.globeMaterial();
        material.bumpScale = 0.01;
        material.shininess = 5;
        
        // Force a re-render to apply changes
        setTimeout(() => {
          if (globeRef.current) {
            globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 2.5 });
          }
        }, 200);
      }
      
      setIsGlobeInitialized(true);
    }
  }, [globeReady, isGlobeInitialized]);

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
    } else if (!selectedCountry && globeRef.current && isGlobeInitialized) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      globeRef.current.pointOfView({
        lat: 0,
        lng: 0,
        altitude: 2.5,
      });
    }
  }, [selectedCountry, countries, globeReady, isGlobeInitialized]);

  return (
    <div ref={containerRef} className="h-full w-full relative">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl={isDarkMode ? darkGlobeUrl : lightGlobeUrl}
        backgroundImageUrl={null}
        backgroundColor={isDarkMode ? "rgba(10,10,25,1)" : "rgba(240,240,245,1)"}
        atmosphereColor={isDarkMode ? "rgba(70,70,120,0.7)" : "rgba(180,180,255,0.2)"}
        atmosphereAltitude={0.15}
        polygonsData={countries}
        onGlobeReady={() => setGlobeReady(true)}
        polygonCapColor={(d) => {
          const country = d as CountryFeature;
          const countryCode = country.properties.ISO_A2;
          
          if (countryCode === selectedCountry) {
            return isDarkMode 
              ? "rgba(255, 165, 0, 0.8)" // Bright orange for selected country in dark mode
              : "rgba(255, 140, 0, 0.8)"; // Slightly darker orange for light mode
          }
          
          const taxData = getCountryTaxData(countryCode);
          return isDarkMode 
            ? `${getTaxBandColor(taxData.taxBand, true)}60` // 37.5% opacity
            : `${getTaxBandColor(taxData.taxBand, false)}60`; // 37.5% opacity
        }}
        polygonSideColor={(d) => {
          const country = d as CountryFeature;
          const countryCode = country.properties.ISO_A2;
          
          if (countryCode === selectedCountry) {
            return isDarkMode 
              ? "rgba(255, 165, 0, 0.5)" // Side color for selected country
              : "rgba(255, 140, 0, 0.5)";
          }
          
          return "rgba(0, 0, 0, 0)"; // Transparent for non-selected
        }}
        polygonStrokeColor={(d) => {
          const country = d as CountryFeature;
          const countryCode = country.properties.ISO_A2;
          
          if (countryCode === selectedCountry) {
            return isDarkMode 
              ? "rgba(255, 255, 255, 0.8)" // White stroke in dark mode
              : "rgba(0, 0, 0, 0.5)"; // Dark stroke in light mode
          }
          
          return "rgba(0, 0, 0, 0)"; // Make borders invisible to prevent glitching
        }}
        polygonAltitude={(d) => {
          const country = d as CountryFeature;
          const countryCode = country.properties.ISO_A2;
          
          // Detect high latitude countries (near poles) for special handling
          let isNearPole = false;
          
          try {
            // Safely access coordinates with proper typing
            if (country.geometry.type === 'Polygon' || country.geometry.type === 'MultiPolygon') {
              const coordinates = country.geometry.coordinates;
              isNearPole = coordinates.some((poly: any) => {
                if (Array.isArray(poly[0][0])) {
                  // MultiPolygon - check first point of first polygon
                  return Math.abs(poly[0][0][1]) > 60; // Latitude > 60°N or < 60°S
                } else {
                  // Polygon - check first point
                  return Math.abs(poly[0][1]) > 60; // Latitude > 60°N or < 60°S
                }
              });
            }
          } catch (e) {
            // Fallback if coordinates can't be checked
            isNearPole = false;
          }
          
          // Apply different altitude based on pole proximity and selection
          if (countryCode === selectedCountry) {
            return isNearPole ? 0.018 : 0.015; // Higher altitude for selected country, even higher near poles
          }
          
          return isNearPole ? 0.008 : 0.006; // Baseline altitude, increased for polar countries
        }}
        polygonsTransitionDuration={300}
        showAtmosphere={true}
        hexPolygonsData={[]} // Disable hex polygons to prevent layer conflicts
        waitForGlobeReady={true} // Wait for textures to load before rendering
        polygonLabel={(d) => {
          const country = d as CountryFeature;
          const countryName = country.properties.ADMIN;
          const countryCode = country.properties.ISO_A2;
          
          // Skip invalid countries
          if (!countryCode || countryCode === "-" || countryCode === "-99") {
            return '';
          }
          
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
      />
    </div>
  );
}
