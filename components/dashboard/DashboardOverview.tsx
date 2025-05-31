"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions
} from "chart.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeDelta, DeltaType } from "@/components/ui/badge-delta";
import { useTheme } from "@/lib/theme-context";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Define dataset type
interface DatasetType {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  tension: number;
  fill: boolean | string;
  pointRadius?: number;
  pointHoverRadius?: number;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
}

// Define chart data type
interface ChartDataType {
  labels: string[];
  datasets: DatasetType[];
}

// Financial metrics
interface FinancialMetric {
  name: string;
  value: number;
  delta: number;
  deltaType: DeltaType;
}

export default function DashboardOverview() {
  const { isDarkMode } = useTheme();
  const [chartData, setChartData] = useState<ChartDataType>({
    labels: [],
    datasets: [],
  });
  const [timeRange, setTimeRange] = useState("6m");
  const [metrics, setMetrics] = useState<FinancialMetric[]>([]);

  useEffect(() => {
    generateChartData(timeRange);
    generateMetrics();
  }, [timeRange, isDarkMode]);

  const generateMetrics = () => {
    setMetrics([
      {
        name: "Net Worth",
        value: 124500,
        delta: 12.5,
        deltaType: "increase"
      },
      {
        name: "Income",
        value: 7050,
        delta: 4.2,
        deltaType: "increase"
      },
      {
        name: "Expenses",
        value: 5320,
        delta: 2.8,
        deltaType: "increase" 
      },
      {
        name: "Savings Rate",
        value: 24.5,
        delta: 1.3,
        deltaType: "increase"
      }
    ]);
  };

  const generateChartData = (period: string) => {
    let labels: string[] = [];
    const incomeData: number[] = [];
    const expensesData: number[] = [];
    const savingsData: number[] = [];
    
    // Generate more realistic data with some variability
    const baseIncome = 6000;
    const baseExpenses = 4500;
    const incomeTrend = 0.005; // 0.5% monthly growth trend
    const expensesTrend = 0.003; // 0.3% monthly growth trend
    const volatility = 0.03; // 3% random variance
    
    let monthCount: number;
    
    switch(period) {
      case "1m":
        labels = Array.from({length: 30}, (_, i) => new Date(Date.now() - (29-i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {month: 'short', day: 'numeric'}));
        monthCount = 1;
        break;
      case "3m":
        labels = Array.from({length: 3}, (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - 2 + i);
          return date.toLocaleDateString('en-US', {month: 'short'});
        });
        monthCount = 3;
        break;
      case "6m":
        labels = Array.from({length: 6}, (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - 5 + i);
          return date.toLocaleDateString('en-US', {month: 'short'});
        });
        monthCount = 6;
        break;
      case "1y":
        labels = Array.from({length: 12}, (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - 11 + i);
          return date.toLocaleDateString('en-US', {month: 'short'});
        });
        monthCount = 12;
        break;
      case "ytd":
        const currentMonth = new Date().getMonth() + 1;
        labels = Array.from({length: currentMonth}, (_, i) => {
          const date = new Date();
          date.setMonth(i);
          return date.toLocaleDateString('en-US', {month: 'short'});
        });
        monthCount = currentMonth;
        break;
      default:
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        monthCount = 12;
    }
    
    // Generate data with realistic patterns
    for (let i = 0; i < labels.length; i++) {
      // Base calculation plus trend plus random variance
      const monthOffset = i - (labels.length / 2); // For trend calculation
      
      // Salary increase in January
      const januaryBonus = labels[i] === 'Jan' ? 2000 : 0;
      
      // Tax return in April
      const aprilBonus = labels[i] === 'Apr' ? 1500 : 0;
      
      // Higher expenses in December (holiday shopping)
      const decemberExpenses = labels[i] === 'Dec' ? 1200 : 0;
      
      // Summer vacation expenses in June/July
      const summerExpenses = (labels[i] === 'Jun' || labels[i] === 'Jul') ? 800 : 0;
      
      const income = baseIncome * 
        (1 + (incomeTrend * monthOffset)) * 
        (1 + (Math.random() * volatility * 2 - volatility)) +
        januaryBonus + aprilBonus;
        
      const expenses = baseExpenses * 
        (1 + (expensesTrend * monthOffset)) * 
        (1 + (Math.random() * volatility * 2 - volatility)) +
        decemberExpenses + summerExpenses;
        
      incomeData.push(Math.round(income));
      expensesData.push(Math.round(expenses));
      savingsData.push(Math.round(income - expenses));
    }
    
    // Use different colors in dark mode for better visibility
    const incomeColor = isDarkMode ? 'rgba(110, 230, 230, 1)' : 'rgba(75, 192, 192, 1)';
    const incomeBgColor = isDarkMode ? 'rgba(110, 230, 230, 0.2)' : 'rgba(75, 192, 192, 0.2)';
    
    const expensesColor = isDarkMode ? 'rgba(255, 120, 150, 1)' : 'rgba(255, 99, 132, 1)';
    const expensesBgColor = isDarkMode ? 'rgba(255, 120, 150, 0.2)' : 'rgba(255, 99, 132, 0.2)';
    
    const savingsColor = isDarkMode ? 'rgba(100, 180, 255, 1)' : 'rgba(54, 162, 235, 1)';
    const savingsBgColor = isDarkMode ? 'rgba(100, 180, 255, 0.2)' : 'rgba(54, 162, 235, 0.2)';
    
    setChartData({
      labels,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          borderColor: incomeColor,
          backgroundColor: incomeBgColor,
          tension: 0.3,
          fill: false,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: incomeColor,
          pointBorderColor: isDarkMode ? '#2D3748' : '#fff',
        },
        {
          label: 'Expenses',
          data: expensesData,
          borderColor: expensesColor,
          backgroundColor: expensesBgColor,
          tension: 0.3,
          fill: false,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: expensesColor,
          pointBorderColor: isDarkMode ? '#2D3748' : '#fff',
        },
        {
          label: 'Savings',
          data: savingsData,
          borderColor: savingsColor,
          backgroundColor: savingsBgColor,
          tension: 0.3,
          fill: true,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: savingsColor,
          pointBorderColor: isDarkMode ? '#2D3748' : '#fff',
        }
      ],
    });
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#e2e8f0' : '#333',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDarkMode ? '#e2e8f0' : '#333',
        bodyColor: isDarkMode ? '#e2e8f0' : '#333',
        borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD' 
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDarkMode ? 'rgba(156, 163, 175, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: isDarkMode ? '#cbd5e1' : '#333',
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      },
      x: {
        grid: {
          color: isDarkMode ? 'rgba(156, 163, 175, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: isDarkMode ? '#cbd5e1' : '#333',
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
          {metrics.map((metric) => (
            <Card key={metric.name} className="border-primary/10">
              <CardContent className="p-3">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{metric.name}</p>
                    <BadgeDelta deltaType={metric.deltaType} size="sm">
                      {metric.delta}%
                    </BadgeDelta>
                  </div>
                  <div className="text-2xl font-semibold mt-1">
                    {metric.name === "Savings Rate" 
                      ? `${metric.value}%` 
                      : new Intl.NumberFormat('en-US', { 
                          style: 'currency', 
                          currency: 'USD',
                          maximumFractionDigits: 0
                        }).format(metric.value)
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Select 
          value={timeRange}
          onValueChange={setTimeRange}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">1 Month</SelectItem>
            <SelectItem value="3m">3 Months</SelectItem>
            <SelectItem value="6m">6 Months</SelectItem>
            <SelectItem value="1y">1 Year</SelectItem>
            <SelectItem value="ytd">Year to Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-[300px] w-full">
        {chartData.labels.length > 0 && (
          <Line data={chartData as ChartData<'line'>} options={options} />
        )}
      </div>
    </div>
  );
} 