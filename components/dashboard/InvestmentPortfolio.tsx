'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, PieChart as PieChartIcon, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Investment {
  id: string;
  name: string;
  ticker: string;
  category: string;
  value: number;
  cost: number;
  shares: number;
  currentPrice: number;
  dayChange: number;
  dayChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
}

interface AllocationData {
  name: string;
  value: number;
}

interface PerformanceData {
  month: string;
  return: number;
}

// Type for PieChart label
interface PieLabelProps {
  name: string;
  percent: number;
}

const COLORS = ['#6366F1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#10b981', '#0ea5e9'];

export default function InvestmentPortfolio() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [allocationData, setAllocationData] = useState<AllocationData[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalReturn, setTotalReturn] = useState(0);
  const [totalReturnPercent, setTotalReturnPercent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call to fetch investment data
    const fetchInvestments = () => {
      setLoading(true);
      
      // Mock data - in a real app, this would come from an API
      const mockInvestments: Investment[] = [
        {
          id: '1',
          name: 'Apple Inc.',
          ticker: 'AAPL',
          category: 'Technology',
          value: 10450.75,
          cost: 8200.50,
          shares: 54,
          currentPrice: 193.53,
          dayChange: 1.25,
          dayChangePercent: 0.65,
          totalReturn: 2250.25,
          totalReturnPercent: 27.44
        },
        {
          id: '2',
          name: 'Microsoft Corporation',
          ticker: 'MSFT',
          category: 'Technology',
          value: 12365.84,
          cost: 9800.40,
          shares: 32,
          currentPrice: 386.43,
          dayChange: -1.75,
          dayChangePercent: -0.45,
          totalReturn: 2565.44,
          totalReturnPercent: 26.18
        },
        {
          id: '3',
          name: 'Tesla, Inc.',
          ticker: 'TSLA',
          category: 'Automotive',
          value: 8540.60,
          cost: 7600.20,
          shares: 45,
          currentPrice: 189.79,
          dayChange: 3.25,
          dayChangePercent: 1.74,
          totalReturn: 940.40,
          totalReturnPercent: 12.37
        },
        {
          id: '4',
          name: 'Vanguard Total Stock Market ETF',
          ticker: 'VTI',
          category: 'ETF',
          value: 15675.30,
          cost: 13200.75,
          shares: 65,
          currentPrice: 241.16,
          dayChange: 0.52,
          dayChangePercent: 0.22,
          totalReturn: 2474.55,
          totalReturnPercent: 18.75
        },
        {
          id: '5',
          name: 'Amazon.com, Inc.',
          ticker: 'AMZN',
          category: 'E-commerce',
          value: 9260.95,
          cost: 7500.65,
          shares: 62,
          currentPrice: 149.37,
          dayChange: 2.15,
          dayChangePercent: 1.46,
          totalReturn: 1760.30,
          totalReturnPercent: 23.47
        }
      ];

      // Calculate aggregate values from the investments
      const totalInvestmentValue = mockInvestments.reduce((acc, inv) => acc + inv.value, 0);
      const totalInvestmentCost = mockInvestments.reduce((acc, inv) => acc + inv.cost, 0);
      const totalInvestmentReturn = totalInvestmentValue - totalInvestmentCost;
      const totalInvestmentReturnPercent = (totalInvestmentReturn / totalInvestmentCost) * 100;

      // Create allocation data for pie chart
      const categoryMap = new Map<string, number>();
      mockInvestments.forEach(inv => {
        const currentValue = categoryMap.get(inv.category) || 0;
        categoryMap.set(inv.category, currentValue + inv.value);
      });
      
      const allocationChartData = Array.from(categoryMap.entries()).map(([name, value]) => ({
        name,
        value
      }));

      // Create performance data for bar chart - in a real app this would be historical data
      const performanceChartData: PerformanceData[] = [
        { month: 'Jan', return: 2.3 },
        { month: 'Feb', return: 1.5 },
        { month: 'Mar', return: -1.2 },
        { month: 'Apr', return: 3.7 },
        { month: 'May', return: -0.8 },
        { month: 'Jun', return: 2.1 },
        { month: 'Jul', return: 4.5 },
        { month: 'Aug', return: 1.9 },
        { month: 'Sep', return: -2.1 },
        { month: 'Oct', return: 3.3 },
        { month: 'Nov', return: 2.7 },
        { month: 'Dec', return: 1.8 },
      ];

      setInvestments(mockInvestments);
      setAllocationData(allocationChartData);
      setPerformanceData(performanceChartData);
      setTotalValue(totalInvestmentValue);
      setTotalReturn(totalInvestmentReturn);
      setTotalReturnPercent(totalInvestmentReturnPercent);
      setLoading(false);
    };

    fetchInvestments();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 100);
  };

  const getReturnBadgeVariant = (value: number) => {
    return value >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getReturnIcon = (value: number) => {
    return value >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Investment Portfolio</CardTitle>
            <CardDescription>Track and manage your investment portfolio</CardDescription>
          </div>
          <Button variant="outline" size="sm">Add Investment</Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Value</p>
                      <p className="text-2xl font-semibold">{formatCurrency(totalValue)}</p>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <DollarSign className="text-primary h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Return</p>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-semibold">{formatCurrency(totalReturn)}</p>
                        <Badge className={getReturnBadgeVariant(totalReturn)}>
                          <span className="flex items-center gap-1">
                            {getReturnIcon(totalReturn)}
                            {formatPercentage(totalReturnPercent)}
                          </span>
                        </Badge>
                      </div>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <TrendingUp className="text-primary h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Positions</p>
                      <p className="text-2xl font-semibold">{investments.length}</p>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <BarChart3 className="text-primary h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="holdings">
              <TabsList className="mb-4">
                <TabsTrigger value="holdings">Holdings</TabsTrigger>
                <TabsTrigger value="allocation">Allocation</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="holdings" className="pt-2">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground border-b">
                        <th className="pb-2 font-medium">Name</th>
                        <th className="pb-2 font-medium">Value</th>
                        <th className="pb-2 font-medium">Change (Day)</th>
                        <th className="pb-2 font-medium">Total Return</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investments.map((investment) => (
                        <tr key={investment.id} className="border-b last:border-b-0">
                          <td className="py-3">
                            <div>
                              <p className="font-medium">{investment.name}</p>
                              <p className="text-xs text-muted-foreground">{investment.ticker} • {investment.shares} shares</p>
                            </div>
                          </td>
                          <td className="py-3">{formatCurrency(investment.value)}</td>
                          <td className="py-3">
                            <Badge className={getReturnBadgeVariant(investment.dayChange)}>
                              <span className="flex items-center gap-1">
                                {getReturnIcon(investment.dayChange)}
                                {formatPercentage(investment.dayChangePercent)}
                              </span>
                            </Badge>
                          </td>
                          <td className="py-3">
                            <div>
                              <p>{formatCurrency(investment.totalReturn)}</p>
                              <Badge className={getReturnBadgeVariant(investment.totalReturn)}>
                                <span className="flex items-center gap-1">
                                  {getReturnIcon(investment.totalReturn)}
                                  {formatPercentage(investment.totalReturnPercent)}
                                </span>
                              </Badge>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="allocation" className="pt-2">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-64 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={allocationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }: PieLabelProps) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {allocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">Portfolio Allocation</h3>
                    <div className="space-y-4">
                      {allocationData.map((item, index) => (
                        <div key={item.name} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                              <span>{item.name}</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <span>{formatCurrency(item.value)}</span>
                              <span className="text-xs text-muted-foreground">
                                {((item.value / totalValue) * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                width: `${(item.value / totalValue) * 100}%`,
                                backgroundColor: COLORS[index % COLORS.length]
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="pt-2">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value: number) => `${value}%`} />
                      <Tooltip formatter={(value: number) => `${value}%`} />
                      <Legend />
                      <Bar dataKey="return" fill="#6366F1" name="Monthly Return" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Performance Insights</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="p-1 mt-0.5 bg-green-100 text-green-800 rounded-full">
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Best performing month:</span> April with a 3.7% return
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="p-1 mt-0.5 bg-red-100 text-red-800 rounded-full">
                        <ArrowDownRight className="w-3 h-3" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Worst performing month:</span> September with a -2.1% return
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="p-1 mt-0.5 bg-primary/10 text-primary rounded-full">
                        <TrendingUp className="w-3 h-3" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">YTD performance:</span> Your portfolio has gained 18.75% this year, outperforming the S&P 500 by 2.3%
                      </p>
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 justify-between">
        <p className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleString()}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Export Data</Button>
          <Button size="sm">View All Investments</Button>
        </div>
      </CardFooter>
    </Card>
  );
} 