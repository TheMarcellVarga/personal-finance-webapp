'use client'

import { useState } from 'react'
import TaxCalculator from '@/components/TaxCalculator'
import WorldMap from '@/components/WorldMap'

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string>('')

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Global Tax Calculator
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex justify-center items-start">
          <TaxCalculator onCountrySelect={setSelectedCountry} />
        </div>
        
        <div className="bg-card rounded-lg shadow-lg p-4">
          <WorldMap selectedCountry={selectedCountry} />
        </div>
      </div>
    </div>
  )
}
