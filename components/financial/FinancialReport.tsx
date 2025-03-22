"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTaxStore } from "@/store/taxStore";
import { getCountryCurrency } from "@/utils/currencyMappings";
import { 
  FileText, 
  Check, 
  Download, 
  Mail, 
  Calendar, 
  RefreshCw,
  PieChart,
  LineChart,
  DollarSign
} from "lucide-react";
import { Pie, Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface ExpenseData {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export default function FinancialReport() {
  const { selectedCountry } = useTaxStore();
  const countryCode = selectedCountry || "US";
  const currency = getCountryCurrency(countryCode) || "USD";
  
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<"7days" | "30days" | "90days" | "year">("30days");
  const [reportDate, setReportDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const reportRef = useRef<HTMLDivElement>(null);
  
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
        // Use sample data
        setExpenses([
          { id: "1", amount: 85.42, category: "Food", date: "2023-05-15" },
          { id: "2", amount: 49.99, category: "Business", date: "2023-05-12" },
          { id: "3", amount: 100, category: "Charitable Donations", date: "2023-05-10" },
          { id: "4", amount: 1200, category: "Housing", date: "2023-05-01" },
          { id: "5", amount: 65.20, category: "Transportation", date: "2023-05-08" },
          { id: "6", amount: 120, category: "Utilities", date: "2023-05-05" },
          { id: "7", amount: 80, category: "Healthcare", date: "2023-05-16" },
          { id: "8", amount: 45, category: "Entertainment", date: "2023-05-20" }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExpenses();
  }, []);
  
  // Calculate timeframe expenses
  const getTimeframedExpenses = () => {
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
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= cutoffDate && expenseDate <= now;
    });
  };
  
  const filteredExpenses = getTimeframedExpenses();
  
  // Calculate category totals
  const getCategoryTotals = () => {
    const totals: Record<string, number> = {};
    
    filteredExpenses.forEach(expense => {
      const { category, amount } = expense;
      totals[category] = (totals[category] || 0) + amount;
    });
    
    const totalSpending = Object.values(totals).reduce((sum, amount) => sum + amount, 0);
    
    return Object.entries(totals).map(([name, value]) => ({
      name,
      value,
      percentage: totalSpending > 0 ? (value / totalSpending) * 100 : 0
    }));
  };
  
  const categoryTotals = getCategoryTotals();
  
  // Calculate monthly spending
  const getMonthlyData = () => {
    const months: Record<string, number> = {};
    const monthLabels: string[] = [];
    
    // Get number of months based on time range
    let monthsToShow = 3;
    if (timeRange === "90days") {
      monthsToShow = 3;
    } else if (timeRange === "year") {
      monthsToShow = 12;
    } else {
      monthsToShow = 2; // Default for shorter timeframes
    }
    
    // Initialize months
    for (let i = 0; i < monthsToShow; i++) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const monthName = d.toLocaleString('default', { month: 'short' });
      months[monthKey] = 0;
      monthLabels.unshift(monthName);
    }
    
    // Sum expenses by month
    filteredExpenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (months[monthKey] !== undefined) {
        months[monthKey] += expense.amount;
      }
    });
    
    // Format for chart
    const values = Object.keys(months)
      .sort()
      .map(key => months[key]);
    
    return { labels: monthLabels, values };
  };
  
  const monthlyData = getMonthlyData();
  
  // Prepare chart data
  const pieChartData = {
    labels: categoryTotals.map(cat => cat.name),
    datasets: [
      {
        data: categoryTotals.map(cat => cat.value),
        backgroundColor: [
          '#FF6B6B', '#4ECDC4', '#FFD166', '#118AB2', '#06D6A0', 
          '#9B5DE5', '#F15BB5', '#00BBF9', '#00F5D4', '#845EC2'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const barChartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthlyData.values,
        backgroundColor: 'rgba(53, 162, 235, 0.6)',
      },
    ],
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };
  
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  // Calculate totals and stats
  const totalSpent = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const avgDaily = totalSpent / (timeRange === "7days" ? 7 : timeRange === "30days" ? 30 : timeRange === "90days" ? 90 : 365);
  const largestExpense = filteredExpenses.length ? Math.max(...filteredExpenses.map(e => e.amount)) : 0;
  const largestCategory = categoryTotals.length ? categoryTotals.sort((a, b) => b.value - a.value)[0].name : 'N/A';
  
  // Generate and download PDF report
  const generatePDF = async () => {
    if (!reportRef.current) return;
    
    try {
      setIsGenerating(true);
      
      const content = reportRef.current;
      const canvas = await html2canvas(content, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      
      pdf.addImage(imgData, 'PNG', imgX, 0, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`financial-report-${reportDate}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Financial Report</h2>
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
          <input
            type="date"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
            className="bg-background border rounded-md px-3 py-1 text-sm"
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setTimeRange(timeRange)}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading report data...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-end gap-2 mb-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => generatePDF()}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  <span>Export as PDF</span>
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => alert('Email functionality would be implemented here')}
            >
              <Mail className="h-4 w-4" />
              <span>Email Report</span>
            </Button>
          </div>
          
          <div ref={reportRef} className="bg-white p-8 rounded-lg border">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Financial Report</h1>
              <div className="flex justify-center items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Report Period: {(() => {
                  switch(timeRange) {
                    case '7days': return 'Last 7 Days';
                    case '30days': return 'Last 30 Days';
                    case '90days': return 'Last 3 Months';
                    case 'year': return 'Last Year';
                    default: return 'Last 30 Days';
                  }
                })()}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Generated on {new Date(reportDate).toLocaleDateString()}</p>
            </div>
            
            {/* Report Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-primary/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <DollarSign className="mx-auto h-8 w-8 text-primary" />
                    <h3 className="mt-2 font-medium text-muted-foreground">Total Spent</h3>
                    <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-primary/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Calendar className="mx-auto h-8 w-8 text-primary" />
                    <h3 className="mt-2 font-medium text-muted-foreground">Avg. Daily</h3>
                    <p className="text-2xl font-bold">{formatCurrency(avgDaily)}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-primary/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <FileText className="mx-auto h-8 w-8 text-primary" />
                    <h3 className="mt-2 font-medium text-muted-foreground">Largest Expense</h3>
                    <p className="text-2xl font-bold">{formatCurrency(largestExpense)}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-primary/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <PieChart className="mx-auto h-8 w-8 text-primary" />
                    <h3 className="mt-2 font-medium text-muted-foreground">Top Category</h3>
                    <p className="text-2xl font-bold">{largestCategory}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Spending by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Pie data={pieChartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Bar data={barChartData} options={barChartOptions} />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Category Breakdown Table */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Category</th>
                        <th className="text-right py-2 px-4">Amount</th>
                        <th className="text-right py-2 px-4">% of Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryTotals.map((category, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-4">{category.name}</td>
                          <td className="text-right py-2 px-4">{formatCurrency(category.value)}</td>
                          <td className="text-right py-2 px-4">{category.percentage.toFixed(1)}%</td>
                        </tr>
                      ))}
                      <tr className="font-bold">
                        <td className="py-2 px-4">Total</td>
                        <td className="text-right py-2 px-4">{formatCurrency(totalSpent)}</td>
                        <td className="text-right py-2 px-4">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Date</th>
                        <th className="text-left py-2 px-4">Category</th>
                        <th className="text-left py-2 px-4">Description</th>
                        <th className="text-right py-2 px-4">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredExpenses.slice(0, 10).map((expense, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-4">{new Date(expense.date).toLocaleDateString()}</td>
                          <td className="py-2 px-4">{expense.category}</td>
                          <td className="py-2 px-4">{expense.description || '-'}</td>
                          <td className="text-right py-2 px-4">{formatCurrency(expense.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Report Footer */}
            <div className="text-center mt-8 text-xs text-muted-foreground">
              <p>This report is generated for informational purposes only.</p>
              <p>© {new Date().getFullYear()} Personal Finance Manager</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 