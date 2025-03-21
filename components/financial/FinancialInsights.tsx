"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTaxStore } from "@/store/taxStore";
import { getCountryCurrency } from "@/utils/currencyMappings";
import { PieChart, BarChart, ChevronDown, BarChart3, PieChart as PieChartIcon, LineChart, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title,
  PointElement,
  LineElement
);

interface ExpenseData {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

interface CategoryTotal {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

// Generate colors for categories
const categoryColors: Record<string, string> = {
  "Food": "#FF6B6B",
  "Housing": "#4ECDC4",
  "Transportation": "#FFD166",
  "Utilities": "#118AB2",
  "Healthcare": "#06D6A0",
  "Entertainment": "#9B5DE5",
  "Business": "#F15BB5",
  "Education": "#00BBF9",
  "Charitable Donations": "#00F5D4",
  "Shopping": "#845EC2",
  "Personal": "#D65DB1",
  "Other": "#4D8076"
};

// Default monthly budgets by category
const defaultBudgets: Record<string, number> = {
  "Food": 500,
  "Housing": 1200,
  "Transportation": 300,
  "Utilities": 200,
  "Healthcare": 200,
  "Entertainment": 150,
  "Business": 300,
  "Education": 100,
  "Charitable Donations": 100,
  "Shopping": 200,
  "Personal": 150,
  "Other": 100
};

export default function FinancialInsights() {
  const { selectedCountry } = useTaxStore();
  const countryCode = selectedCountry || "US";
  const currency = getCountryCurrency(countryCode) || "USD";
  
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState<"7days" | "30days" | "90days" | "year">("30days");
  const [categoryTotals, setCategoryTotals] = useState<CategoryTotal[]>([]);
  const [monthlyData, setMonthlyData] = useState<{month: string; total: number}[]>([]);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  
  // Fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/expenses');
        
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        
        const data = await response.json();
        setExpenses(data);
      } catch (err) {
        console.error('Error fetching expenses:', err);
        setError('Failed to load expenses. Using sample data.');
        // Use sample data if API fails
        setExpenses([
          { id: "1", amount: 85.42, category: "Food", date: "2023-05-15" },
          { id: "2", amount: 49.99, category: "Business", date: "2023-05-12" },
          { id: "3", amount: 100, category: "Charitable Donations", date: "2023-05-10" },
          { id: "4", amount: 1200, category: "Housing", date: "2023-05-01" },
          { id: "5", amount: 65.20, category: "Transportation", date: "2023-05-08" },
          { id: "6", amount: 120, category: "Utilities", date: "2023-05-05" },
          { id: "7", amount: 80, category: "Healthcare", date: "2023-05-16" },
          { id: "8", amount: 45, category: "Entertainment", date: "2023-05-20" },
          { id: "9", amount: 92.30, category: "Food", date: "2023-04-28" },
          { id: "10", amount: 42.15, category: "Entertainment", date: "2023-04-20" },
          { id: "11", amount: 1200, category: "Housing", date: "2023-04-01" },
          { id: "12", amount: 58.75, category: "Transportation", date: "2023-04-12" },
          { id: "13", amount: 100, category: "Charitable Donations", date: "2023-03-15" },
          { id: "14", amount: 1200, category: "Housing", date: "2023-03-01" },
          { id: "15", amount: 75.40, category: "Food", date: "2023-03-10" }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExpenses();
  }, []);
  
  // Calculate category totals for visualization
  useEffect(() => {
    calculateCategoryTotals();
    calculateMonthlyData();
  }, [expenses, timeRange]);
  
  const calculateCategoryTotals = () => {
    const now = new Date();
    let cutoffDate = new Date();
    
    // Set cutoff date based on selected time range
    switch (timeRange) {
      case "7days":
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case "30days":
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case "90days":
        cutoffDate.setDate(now.getDate() - 90);
        break;
      case "year":
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    // Filter expenses based on date range
    const filteredExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= cutoffDate && expenseDate <= now;
    });
    
    // Calculate totals by category
    const totals: Record<string, number> = {};
    filteredExpenses.forEach(expense => {
      const { category, amount } = expense;
      totals[category] = (totals[category] || 0) + amount;
    });
    
    // Calculate grand total
    const grandTotal = Object.values(totals).reduce((sum, amount) => sum + amount, 0);
    
    // Format data for visualization
    const formattedTotals = Object.entries(totals).map(([name, value]) => ({
      name,
      value,
      percentage: grandTotal > 0 ? (value / grandTotal) * 100 : 0,
      color: categoryColors[name] || "#CCCCCC"
    }));
    
    // Sort by value (descending)
    formattedTotals.sort((a, b) => b.value - a.value);
    
    setCategoryTotals(formattedTotals);
  };
  
  // Calculate monthly spending for trend analysis
  const calculateMonthlyData = () => {
    const now = new Date();
    const months: Record<string, number> = {};
    
    // Get last 6 months based on time range
    let monthsToShow = 6;
    if (timeRange === "7days" || timeRange === "30days") {
      monthsToShow = 3;
    } else if (timeRange === "year") {
      monthsToShow = 12;
    }
    
    // Initialize months
    for (let i = 0; i < monthsToShow; i++) {
      const d = new Date();
      d.setMonth(now.getMonth() - i);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const monthName = d.toLocaleString('default', { month: 'short' });
      months[monthKey] = 0;
    }
    
    // Sum expenses by month
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (months[monthKey] !== undefined) {
        months[monthKey] += expense.amount;
      }
    });
    
    // Format for chart
    const formattedMonths = Object.keys(months)
      .sort()
      .map(monthKey => {
        const [year, month] = monthKey.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return {
          month: date.toLocaleString('default', { month: 'short' }),
          total: months[monthKey]
        };
      });
    
    setMonthlyData(formattedMonths);
  };
  
  // Calculate total spending
  const totalSpending = categoryTotals.reduce((sum, category) => sum + category.value, 0);

  // Prepare data for pie chart
  const pieChartData = {
    labels: categoryTotals.map(category => category.name),
    datasets: [
      {
        data: categoryTotals.map(category => category.value),
        backgroundColor: categoryTotals.map(category => category.color),
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for bar chart (budget comparison)
  const barChartData = {
    labels: categoryTotals.map(category => category.name),
    datasets: [
      {
        label: 'Actual Spending',
        data: categoryTotals.map(category => category.value),
        backgroundColor: categoryTotals.map(category => category.color),
      },
      {
        label: 'Budget',
        data: categoryTotals.map(category => defaultBudgets[category.name] || 100),
        backgroundColor: 'rgba(150, 150, 150, 0.5)',
      },
    ],
  };

  // Prepare data for line chart (monthly trends)
  const lineChartData = {
    labels: monthlyData.map(data => data.month),
    datasets: [
      {
        label: 'Monthly Spending',
        data: monthlyData.map(data => data.total),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  // Chart options
  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = (value / totalSpending * 100).toFixed(1);
            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
          }
        }
      }
    },
  };

  const barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => {
            return formatCurrency(value);
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${formatCurrency(value)}`;
          }
        }
      }
    }
  };

  const lineChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => {
            return formatCurrency(value);
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${formatCurrency(value)}`;
          }
        }
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Financial Insights</h2>
        <div className="flex space-x-2">
          <select 
            className="bg-background border rounded-md px-3 py-1 text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">Last year</option>
          </select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading financial insights...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Spending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalSpending)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  For selected period
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Top Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{categoryTotals[0]?.name || "N/A"}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {categoryTotals[0] ? `${formatCurrency(categoryTotals[0].value)} (${categoryTotals[0].percentage.toFixed(1)}%)` : "No data"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{categoryTotals.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Different spending categories
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Visualization Tabs */}
          <Tabs defaultValue="breakdown" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="breakdown" className="flex items-center gap-2">
                <PieChartIcon className="h-4 w-4" />
                Breakdown
              </TabsTrigger>
              <TabsTrigger value="comparison" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Budget Comparison
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                Monthly Trends
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="breakdown" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Spending Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  {categoryTotals.length > 0 ? (
                    <div className="space-y-4">
                      {/* Pie Chart */}
                      <div className="h-64 w-full flex items-center justify-center">
                        <div className="h-full w-full max-w-md">
                          <Pie data={pieChartData} options={pieChartOptions} />
                        </div>
                      </div>
                      
                      {/* Category list */}
                      <div className="space-y-2 mt-6">
                        {categoryTotals.map((category) => (
                          <div key={category.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                              <span>{category.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                {formatCurrency(category.value)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {category.percentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-64">
                      <p>No spending data available for the selected period.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="comparison" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Budget vs. Actual Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  {categoryTotals.length > 0 ? (
                    <div className="space-y-4">
                      {/* Bar Chart */}
                      <div className="h-64 w-full">
                        <Bar data={barChartData} options={barChartOptions} />
                      </div>
                      
                      {/* Budget detail */}
                      <div className="space-y-4 mt-6">
                        {categoryTotals.map((category) => {
                          const budget = defaultBudgets[category.name] || 100;
                          const percentage = (category.value / budget) * 100;
                          const isOverBudget = category.value > budget;
                          
                          return (
                            <div key={category.name} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: category.color }}
                                  />
                                  <span>{category.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">
                                    {formatCurrency(category.value)}
                                  </span>
                                  <span className="text-xs font-medium">
                                    of {formatCurrency(budget)}
                                  </span>
                                  <span className={`text-xs flex items-center ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
                                    {isOverBudget ? (
                                      <ArrowUpRight className="h-3 w-3 mr-1" />
                                    ) : (
                                      <ArrowDownRight className="h-3 w-3 mr-1" />
                                    )}
                                    {isOverBudget ? '+' : ''}
                                    {Math.abs(percentage - 100).toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                              
                              {/* Progress bar */}
                              <div className="w-full bg-muted rounded-full h-2.5">
                                <div
                                  className={`h-2.5 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-green-500'}`}
                                  style={{ width: `${Math.min(percentage, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-64">
                      <p>No spending data available for the selected period.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Spending Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  {monthlyData.length > 0 ? (
                    <div className="space-y-4">
                      {/* Line Chart */}
                      <div className="h-64 w-full">
                        <Line data={lineChartData} options={lineChartOptions} />
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-sm font-semibold mb-2">Monthly Totals</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                          {monthlyData.map((data, index) => (
                            <Card key={index} className="bg-muted/30">
                              <CardContent className="p-4">
                                <p className="text-sm font-medium">{data.month}</p>
                                <p className="text-lg font-bold">{formatCurrency(data.total)}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-64">
                      <p>No monthly data available for the selected period.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
} 