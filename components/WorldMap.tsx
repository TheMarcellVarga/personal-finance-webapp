"use client";

import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { Feature, Geometry } from "geojson";
import bbox from "@turf/bbox";
import { CountryFeature, useCountries } from "@/hooks/useCountries";
import { getCountryTaxData, getTaxBandColor, getAllCountryTaxData, CountryTaxData, TaxBand } from "@/utils/countryTaxData";
import { MICROSTATE_COORDS, TAX_HAVEN_CODES } from "@/data/tax-brackets/microstateCoordinates";
import { completeEuropeanTaxData } from "@/store/taxStore";
import { useTheme } from "@/lib/theme-context";

// Define microstates with their coordinates, pulling from existing tax data
// These are small countries that might be hard to see/select on the map
interface MicrostateData {
  name: string;
  code: string;
  lat: number;
  lng: number;
}

interface WorldMapProps {
  selectedCountry: string;
  onCountryClick: (countryCode: string) => void;
}

export default function WorldMap({
  selectedCountry,
  onCountryClick,
}: WorldMapProps) {
  const { isDarkMode } = useTheme();
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const countries = useCountries();
  const [globeReady, setGlobeReady] = useState(false);
  const [isGlobeInitialized, setIsGlobeInitialized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Prepare microstate marker data
  const [microstateMarkers, setMicrostateMarkers] = useState<MicrostateData[]>([]);
  const [showMicrostatesPanel, setShowMicrostatesPanel] = useState(false);
  
  // Use local image files with better dark mode support
  const darkGlobeUrl = "/img/earth-night.jpg";
  const lightGlobeUrl = "//unpkg.com/three-globe/example/img/earth-day.jpg";

  const defaultColor = isDarkMode ? "#384152" : "#e5e7eb";

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Prepare microstate data from tax data
  useEffect(() => {
    if (countries.length > 0) {
      const allTaxData = getAllCountryTaxData();
      const markers: MicrostateData[] = [];
      
      // Create markers for all tax havens and microstates with coordinates
      TAX_HAVEN_CODES.forEach(code => {
        if (MICROSTATE_COORDS[code]) {
          const countryFeature = countries.find(c => c.properties.ISO_A2 === code);
          const [lat, lng] = MICROSTATE_COORDS[code];
          const taxData = getCountryTaxData(code);
          
          // Get the country name from GeoJSON or use a default name
          let name = code;
          if (countryFeature) {
            name = countryFeature.properties.ADMIN;
          } else {
            // Lookup the name from tax store if not in GeoJSON
            const taxCountry = completeEuropeanTaxData.find((c: { code: string }) => c.code === code);
            if (taxCountry) {
              name = taxCountry.name;
            } else if (taxData.notes) {
              name = `${code} (${taxData.notes})`;
            }
          }
            
          markers.push({
            name,
            code,
            lat,
            lng
          });
        }
      });
      
      setMicrostateMarkers(markers);
    }
  }, [countries]);

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

      // First, check if it's a country in the GeoJSON data
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
      // If not found in GeoJSON, check if it's a microstate/tax haven with coordinates
      else if (MICROSTATE_COORDS[selectedCountry]) {
        const [lat, lng] = MICROSTATE_COORDS[selectedCountry];
        
        setTimeout(() => {
          globeRef.current.pointOfView(
            {
              lat,
              lng,
              altitude: 1.8, // Slightly higher altitude for small territories
            },
            1250
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

  // Effect to auto-open the microstates panel when a microstate is selected
  useEffect(() => {
    if (selectedCountry && TAX_HAVEN_CODES.includes(selectedCountry)) {
      setShowMicrostatesPanel(true);
    }
  }, [selectedCountry]);

  const getCountryIsoCode = (country: Feature<Geometry, any> | null): string | null => {
    if (!country) return null;
    
    const isoCode = country?.properties?.ISO_A2;
    if (!isoCode || isoCode === "-") return null;

    // We don't need special handling for "-99" codes anymore as they're
    // fixed in the useCountries hook

    return isoCode;
  };

  const getCountryColor = (country: Feature<Geometry, any> | null) => {
    if (!country) return defaultColor;

    const isoCode = getCountryIsoCode(country);
    if (!isoCode) return defaultColor;

    const taxData = getCountryTaxData(isoCode);
    return getTaxBandColor(taxData.taxBand, isDarkMode);
  };

  const handleCountryClick = (country: Feature<Geometry, any> | null) => {
    if (!country) return;
    
    const isoCode = getCountryIsoCode(country);
    if (isoCode) {
      onCountryClick(isoCode);
    }
  };

  // Update the click handlers to handle undefined values
  const handleMicrostateClick = (code: string) => {
    const country = countries.find(c => c.properties.ISO_A2 === code);
    if (country) {
      handleCountryClick(country);
    }
  };

  // Handle globe ready event safely
  const handleGlobeReady = () => {
    if (isMounted) {
      setGlobeReady(true);
    }
  };

  return (
    <div ref={containerRef} className="h-full w-full relative">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl={isDarkMode ? darkGlobeUrl : lightGlobeUrl}
        backgroundImageUrl={null}
        backgroundColor={isDarkMode ? "rgba(15,23,42,1)" : "rgba(240,240,245,1)"}
        atmosphereColor={isDarkMode ? "rgba(100,120,220,0.8)" : "rgba(180,180,255,0.2)"}
        atmosphereAltitude={0.15}
        polygonsData={countries}
        onGlobeReady={handleGlobeReady}
        polygonCapColor={(d) => {
          const country = d as CountryFeature;
          const countryCode = country.properties.ISO_A2;
          
          if (countryCode === selectedCountry) {
            return isDarkMode 
              ? "rgba(255, 165, 0, 0.9)" // Brighter orange for selected country in dark mode
              : "rgba(255, 140, 0, 0.8)";
          }
          
          const taxData = getCountryTaxData(countryCode);
          return isDarkMode 
            ? `${getTaxBandColor(taxData.taxBand, true)}80` // 50% opacity in dark mode
            : `${getTaxBandColor(taxData.taxBand, false)}60`; // 37.5% opacity in light mode
        }}
        polygonSideColor={() => "rgba(0, 0, 0, 0.15)"}
        polygonStrokeColor={(d) => {
          const country = d as CountryFeature;
          const countryCode = country.properties.ISO_A2;
          
          if (countryCode === selectedCountry) {
            return isDarkMode 
              ? "rgba(255, 255, 255, 0.9)" // Brighter white stroke in dark mode
              : "rgba(0, 0, 0, 0.5)";
          }
          
          return isDarkMode
            ? "rgba(255, 255, 255, 0.2)" // Subtle borders in dark mode
            : "rgba(0, 0, 0, 0.15)"; // Subtle borders in light mode
        }}
        polygonAltitude={(d) => {
          const country = d as CountryFeature;
          const isoCode = getCountryIsoCode(country);
          
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
          if (isoCode === selectedCountry) {
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
          
          // Get the ISO code using our helper function
          const isoCode = getCountryIsoCode(country);
          if (!isoCode) return '';
          
          const taxData = getCountryTaxData(isoCode);
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
              background-color: ${isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)'}; 
              color: ${isDarkMode ? 'rgba(248, 250, 252, 0.95)' : '#333344'}; 
              border-radius: 6px;
              padding: 14px;
              font-family: system-ui, -apple-system, sans-serif;
              box-shadow: 0 4px 20px rgba(0,0,0,${isDarkMode ? '0.5' : '0.3'});
              min-width: 200px;
              border: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
            ">
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                border-bottom: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'};
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
                <div style="font-size: 14px; color: ${isDarkMode ? '#e2e8f0' : '#666680'};">
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
                <div style="font-size: 14px; color: ${isDarkMode ? '#e2e8f0' : '#666680'};">
                  Country Code:
                </div>
                <div style="font-size: 14px; font-weight: 500;">
                  ${isoCode}
                </div>
              </div>
              
              ${specialNote}
            </div>
          `;
        }}
        onPolygonClick={(polygon, event) => {
          const country = polygon as CountryFeature;
          handleCountryClick(country);
        }}
        
        // Add microstate markers
        pointsData={microstateMarkers}
        pointLabel={d => {
          const microstate = d as MicrostateData;
          const taxData = getCountryTaxData(microstate.code);
          const taxBandColor = getTaxBandColor(taxData.taxBand, isDarkMode);
          
          let specialNotes = '';
          if (taxData.notes) {
            specialNotes = `<div style="font-style: italic; font-size: 12px; margin-top: 4px;">${taxData.notes}</div>`;
          } else if (taxData.hasFlatTax) {
            specialNotes = '<div style="font-style: italic; font-size: 12px; margin-top: 4px;">Flat tax system</div>';
          }
          
          return `
            <div style="
              background-color: ${isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)'}; 
              color: ${isDarkMode ? 'rgba(248, 250, 252, 0.95)' : '#333344'}; 
              border-radius: 6px;
              padding: 14px;
              font-family: system-ui, -apple-system, sans-serif;
              box-shadow: 0 4px 20px rgba(0,0,0,${isDarkMode ? '0.5' : '0.3'});
              min-width: 200px;
              border: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
            ">
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                border-bottom: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'};
                padding-bottom: 8px;
              ">
                <div style="font-weight: bold; font-size: 18px;">${microstate.name}</div>
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
                <div style="font-size: 14px; color: ${isDarkMode ? '#e2e8f0' : '#666680'};">
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
                margin-bottom: ${specialNotes ? '6px' : '0'};
              ">
                <div style="font-size: 14px; color: ${isDarkMode ? '#e2e8f0' : '#666680'};">
                  Country Code:
                </div>
                <div style="font-size: 14px; font-weight: 500;">
                  ${microstate.code}
                </div>
              </div>
              
              ${specialNotes}
              
              <div style="font-style: italic; font-size: 12px; margin-top: 8px; color: ${isDarkMode ? '#e2e8f0' : '#666680'};">
                🔍 Tax-advantageous jurisdiction
              </div>
            </div>
          `;
        }}
        pointColor={d => {
          const microstate = d as MicrostateData;
          const taxData = getCountryTaxData(microstate.code);
          
          // Always use the tax band color so selection doesn't distort tax perception
          return isDarkMode 
            ? `${getTaxBandColor(taxData.taxBand, true)}` 
            : `${getTaxBandColor(taxData.taxBand, false)}`;
        }}
        pointAltitude={d => {
          const microstate = d as MicrostateData;
          // Make selected microstates stand out by being slightly higher
          return microstate.code === selectedCountry ? 0.05 : 0.02;
        }}
        pointRadius={d => {
          const microstate = d as MicrostateData;
          // Make selected microstates have a larger radius
          return microstate.code === selectedCountry ? 0.7 : 0.4;
        }}
        // Add a ring/halo around selected points
        pointsMerge={false}
        ringsData={selectedCountry && MICROSTATE_COORDS[selectedCountry] ? 
          [{ lat: MICROSTATE_COORDS[selectedCountry][0], lng: MICROSTATE_COORDS[selectedCountry][1] }] : 
          []
        }
        ringColor={() => isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'}
        ringMaxRadius={0.8}
        ringPropagationSpeed={3}
        ringRepeatPeriod={2000}
        pointResolution={32}
        onPointClick={point => {
          const microstate = point as MicrostateData;
          handleMicrostateClick(microstate.code);
          setShowMicrostatesPanel(true);
        }}
      />
      
      {/* Tax Haven Button - Improve visibility */}
      <button 
        className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm p-2 rounded-lg border border-primary/20 text-xs shadow-lg flex items-center gap-1.5 hover:bg-primary/10 transition-all"
        onClick={() => setShowMicrostatesPanel(!showMicrostatesPanel)}
      >
        <span className="text-xs font-medium">🏝️ Tax Havens</span>
        <span className={`transition-transform duration-200 ${showMicrostatesPanel ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {/* Tax Haven Panel - Improve visibility */}
      {showMicrostatesPanel && (
        <div className="absolute top-12 right-3 bg-background/95 backdrop-blur-sm p-3 rounded-lg border border-primary/20 shadow-lg max-h-[60vh] overflow-y-auto w-[260px] z-10">
          <div className="mb-2 pb-1 border-b border-primary/20">
            <h3 className="font-medium text-sm">Tax-Advantageous Jurisdictions</h3>
            <p className="text-xs text-muted-foreground mt-1">Small states with favorable tax policies</p>
            <p className="text-xs text-muted-foreground mt-1 italic">
              <span className="inline-block w-2 h-2 border border-gray-400 rounded-sm mr-1"></span>
              Selected states are indicated with a border and checkmark
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-1.5">
            {microstateMarkers.sort((a, b) => a.name.localeCompare(b.name)).map(ms => {
              const taxData = getCountryTaxData(ms.code);
              const taxCountry = completeEuropeanTaxData.find((c: { code: string }) => c.code === ms.code);
              const taxRate = taxCountry ? 
                (taxCountry.brackets.length > 0 ? 
                  (taxCountry.brackets[taxCountry.brackets.length - 1].rate * 100).toFixed(0) : "0") : 
                (taxData.maxRate.toString());
              
              return (
                <button 
                  key={ms.code}
                  onClick={() => handleMicrostateClick(ms.code)}
                  className={`p-2 rounded text-xs flex flex-col items-start transition-all ${
                    selectedCountry === ms.code 
                    ? 'bg-primary dark:bg-primary/80 text-primary-foreground'
                    : 'hover:bg-accent'
                  }`}
                >
                  {/* Add a checkmark for selected states */}
                  {selectedCountry === ms.code && (
                    <div className="absolute -right-1 -top-1 bg-background rounded-full p-0.5 shadow-sm border border-primary/20">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                  <span className="font-medium">
                    {ms.name}
                  </span>
                  <div className="flex items-center justify-between w-full mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{ms.code}</span>
                    {/* Tax rate badge always uses the color based on tax band */}
                    <span 
                      className="text-[10px] px-1.5 py-0.5 rounded-full text-white font-medium" 
                      style={{
                        backgroundColor: getTaxBandColor(taxData.taxBand, isDarkMode),
                        boxShadow: isDarkMode ? '0 1px 3px rgba(0,0,0,0.3)' : 'none'
                      }}
                    >
                      {taxRate}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="mt-3 pt-2 border-t border-primary/20">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Tax Band Colors:</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {['no-tax', 'very-low', 'low', 'medium', 'high', 'very-high'].map(band => (
                <div 
                  key={band}
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium"
                  style={{
                    backgroundColor: getTaxBandColor(band as any, isDarkMode),
                    color: 'white',
                    boxShadow: isDarkMode ? '0 1px 3px rgba(0,0,0,0.3)' : 'none'
                  }}
                >
                  {band.replace('-', ' ')}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
