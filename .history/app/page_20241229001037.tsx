// app/page.tsx
'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import TaxCalculator from '@/components/TaxCalculator'

// Dynamically import WorldMap to avoid SSR issues
const WorldMap = dynamic(() => import('@/components/WorldMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  )
})

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
          <WorldMap 
            selectedCountry={selectedCountry} 
            onCountryClick={setSelectedCountry}
          />
        </div>
      </div>
    </div>
  )
}
