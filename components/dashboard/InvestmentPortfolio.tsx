'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Investment {
  id: string;
  name: string;
  ticker: string;
  shares: number;
  value: number;
  changePercent: number;
}

export default function InvestmentPortfolio() {
  // Mock investments data
  const investments: Investment[] = [
    {
      id: '1',
      name: 'Microsoft Corporation',
      ticker: 'MSFT',
      shares: 32,
      value: 12365.84,
      changePercent: -0.45,
    },
    {
      id: '2',
      name: 'Tesla, Inc.',
      ticker: 'TSLA',
      shares: 45,
      value: 8540.60,
      changePercent: 1.74,
    },
    {
      id: '3',
      name: 'Vanguard Total Stock Market ETF',
      ticker: 'VTI',
      shares: 65,
      value: 15675.30,
      changePercent: 0.22,
    },
    {
      id: '4',
      name: 'Amazon.com, Inc.',
      ticker: 'AMZN',
      shares: 62,
      value: 9260.95,
      changePercent: 1.46,
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getChangeColor = (value: number) => {
    return value >= 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-1">
          <TrendingUp className="h-4 w-4" />
          <h3 className="font-medium">Investment Portfolio</h3>
        </div>
        <p className="text-xs text-muted-foreground">Current market value: $56,293.28</p>
      </div>
      
      <div className="space-y-0 flex-1">
        <div className="border-b pb-1 mb-1">
          <p className="text-xs text-muted-foreground">Last updated: 10/05/2023, 09:07:57</p>
        </div>
        
        {investments.map((investment) => (
          <div 
            key={investment.id} 
            className="flex items-center justify-between py-2 border-b last:border-0"
          >
            <div>
              <h4 className="font-medium text-sm">{investment.name}</h4>
              <p className="text-xs text-muted-foreground">{investment.ticker} • {investment.shares} shares</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-medium">{formatCurrency(investment.value)}</span>
              <span className={`text-xs ${getChangeColor(investment.changePercent)}`}>
                {formatPercentage(investment.changePercent)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-2 flex justify-between items-center">
        <button className="text-sm text-primary flex items-center hover:underline">
          Export Data
        </button>
        <button className="text-sm text-primary flex items-center hover:underline">
          View All Investments <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
} 