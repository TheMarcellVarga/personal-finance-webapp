// components/WorldMap.tsx
'use client'

import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { scaleLinear } from "d3-scale"

const geoUrl = "/world-110m.json" // You'll need to add this JSON file to your public folder

interface WorldMapProps {
  selectedCountry: string
}

export default function WorldMap({ selectedCountry }: WorldMapProps) {
  const colorScale = scaleLinear<string>()
    .domain([0, 100])
    .range(["#ffedea", "#ff5233"])

  return (
    <div className="w-full h-[500px]">
      <ComposableMap projection="geoMercator">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isSelected = geo.properties.ISO_A2 === selectedCountry
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isSelected ? "#ff5233" : "#D6D6DA"}
                  stroke="#FFFFFF"
                  style={{
                    default: {
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      outline: "none",
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}
