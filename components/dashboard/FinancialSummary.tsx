"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from "chart.js";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FinancialData {
  category: string;
  amount: number;
  color: string;
  budgeted?: number;
  average?: number;
  previousMonth?: number;
}

export default function FinancialSummary() {
  const [incomeData, setIncomeData] = useState<FinancialData[]>([]);
  const [expenseData, setExpenseData] = useState<FinancialData[]>([]);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: []
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedView, setSelectedView] = useState('category');

  useEffect(() => {
    // More realistic income data with specific sources
    const realIncomeData: FinancialData[] = [
      { 
        category: 'Microsoft Salary', 
        amount: 6800, 
        color: 'rgba(75, 192, 192, 0.7)',
        previousMonth: 6800
      },
      { 
        category: 'MSFT Stock Dividends', 
        amount: 430, 
        color: 'rgba(54, 162, 235, 0.7)',
        previousMonth: 410
      },
      { 
        category: 'Freelance Work', 
        amount: 1250, 
        color: 'rgba(153, 102, 255, 0.7)',
        previousMonth: 800
      },
      { 
        category: 'Airbnb Rental', 
        amount: 1800, 
        color: 'rgba(75, 192, 192, 0.7)',
        previousMonth: 1800
      }
    ];

    // More realistic expense data with budget comparison
    const realExpenseData: FinancialData[] = [
      { 
        category: 'Mortgage', 
        amount: 2100, 
        color: 'rgba(255, 99, 132, 0.7)', 
        budgeted: 2100,
        previousMonth: 2100
      },
      { 
        category: 'Utilities', 
        amount: 395, 
        color: 'rgba(255, 159, 64, 0.7)', 
        budgeted: 350,
        previousMonth: 370
      },
      { 
        category: 'Transportation', 
        amount: 580, 
        color: 'rgba(255, 205, 86, 0.7)', 
        budgeted: 600,
        previousMonth: 620
      },
      { 
        category: 'Groceries', 
        amount: 780, 
        color: 'rgba(75, 192, 192, 0.7)', 
        budgeted: 800,
        previousMonth: 740
      },
      { 
        category: 'Dining Out', 
        amount: 520, 
        color: 'rgba(54, 162, 235, 0.7)', 
        budgeted: 400,
        previousMonth: 490
      },
      { 
        category: 'Insurance', 
        amount: 310, 
        color: 'rgba(153, 102, 255, 0.7)', 
        budgeted: 310,
        previousMonth: 310
      },
      { 
        category: 'Entertainment', 
        amount: 380, 
        color: 'rgba(255, 159, 64, 0.7)', 
        budgeted: 350,
        previousMonth: 420
      },
      { 
        category: 'Shopping', 
        amount: 430, 
        color: 'rgba(255, 99, 132, 0.7)', 
        budgeted: 300,
        previousMonth: 390
      },
      { 
        category: 'Healthcare', 
        amount: 180, 
        color: 'rgba(75, 192, 192, 0.7)', 
        budgeted: 200,
        previousMonth: 220
      },
      { 
        category: 'Subscriptions', 
        amount: 120, 
        color: 'rgba(153, 102, 255, 0.7)', 
        budgeted: 100,
        previousMonth: 110
      }
    ];

    setIncomeData(realIncomeData);
    setExpenseData(realExpenseData);

    updateChartData(activeTab, selectedView, realIncomeData, realExpenseData);
  }, [activeTab, selectedView]);

  const updateChartData = (
    tab: string, 
    view: string, 
    incomeData: FinancialData[], 
    expenseData: FinancialData[]
  ) => {
    if (tab === 'overview') {
      // For overview, show income vs expenses
      setChartData({
        labels: ["Income", "Expenses"],
        datasets: [
          {
            label: 'Amount',
            data: [
              incomeData.reduce((sum, item) => sum + item.amount, 0),
              expenseData.reduce((sum, item) => sum + item.amount, 0)
            ],
            backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
          }
        ],
      });
    } else if (tab === 'income') {
      // For income tab, show income by category
      setChartData({
        labels: incomeData.map(i => i.category),
        datasets: [
          {
            label: 'Current Month',
            data: incomeData.map(i => i.amount),
            backgroundColor: incomeData.map(i => i.color),
            borderColor: incomeData.map(i => i.color.replace('0.7', '1')),
            borderWidth: 1
          },
          {
            label: 'Previous Month',
            data: incomeData.map(i => i.previousMonth || 0),
            backgroundColor: incomeData.map(i => i.color.replace('0.7', '0.3')),
            borderColor: incomeData.map(i => i.color.replace('0.7', '0.5')),
            borderWidth: 1
          }
        ],
      });
    } else if (tab === 'expenses') {
      // For expenses tab, show different views
      if (view === 'category') {
        setChartData({
          labels: expenseData.map(e => e.category),
          datasets: [
            {
              label: 'Actual',
              data: expenseData.map(e => e.amount),
              backgroundColor: expenseData.map(e => e.color),
              borderColor: expenseData.map(e => e.color.replace('0.7', '1')),
              borderWidth: 1
            },
            {
              label: 'Budgeted',
              data: expenseData.map(e => e.budgeted || 0),
              backgroundColor: expenseData.map(e => e.color.replace('0.7', '0.3')),
              borderColor: expenseData.map(e => e.color.replace('0.7', '0.5')),
              borderWidth: 1
            }
          ],
        });
      } else if (view === 'comparison') {
        setChartData({
          labels: expenseData.map(e => e.category),
          datasets: [
            {
              label: 'Current Month',
              data: expenseData.map(e => e.amount),
              backgroundColor: expenseData.map(e => e.color),
              borderColor: expenseData.map(e => e.color.replace('0.7', '1')),
              borderWidth: 1
            },
            {
              label: 'Previous Month',
              data: expenseData.map(e => e.previousMonth || 0),
              backgroundColor: expenseData.map(e => e.color.replace('0.7', '0.3')),
              borderColor: expenseData.map(e => e.color.replace('0.7', '0.5')),
              borderWidth: 1
            }
          ],
        });
      }
    }
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
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
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const netIncome = totalIncome - totalExpenses;
  
  const previousMonthIncome = incomeData.reduce((sum, item) => sum + (item.previousMonth || 0), 0);
  const previousMonthExpenses = expenseData.reduce((sum, item) => sum + (item.previousMonth || 0), 0);
  
  const incomeChangePercent = ((totalIncome - previousMonthIncome) / previousMonthIncome * 100).toFixed(1);
  const expensesChangePercent = ((totalExpenses - previousMonthExpenses) / previousMonthExpenses * 100).toFixed(1);
  const savingsRatePercent = ((netIncome / totalIncome) * 100).toFixed(1);
  
  const overBudgetItems = expenseData.filter(item => (item.amount > (item.budgeted || 0)));
  const totalBudget = expenseData.reduce((sum, item) => sum + (item.budgeted || 0), 0);
  const budgetUsagePercent = Math.min(100, (totalExpenses / totalBudget) * 100);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          
          {activeTab === 'expenses' && (
            <div className="flex space-x-2">
              <Button 
                variant={selectedView === 'category' ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedView('category')}
              >
                Category
              </Button>
              <Button 
                variant={selectedView === 'comparison' ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedView('comparison')}
              >
                Monthly Comparison
              </Button>
            </div>
          )}
        </div>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-muted-foreground mb-1">Income</p>
                <span className={`text-xs flex items-center ${Number(incomeChangePercent) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Number(incomeChangePercent) >= 0 ? 
                    <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  }
                  {Math.abs(Number(incomeChangePercent))}%
                </span>
              </div>
              <p className="text-2xl font-bold">${totalIncome.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">vs. ${previousMonthIncome.toLocaleString()} last month</p>
            </div>
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-muted-foreground mb-1">Expenses</p>
                <span className={`text-xs flex items-center ${Number(expensesChangePercent) <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Number(expensesChangePercent) <= 0 ? 
                    <ArrowDownRight className="h-3 w-3 mr-1" /> : 
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  }
                  {Math.abs(Number(expensesChangePercent))}%
                </span>
              </div>
              <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">vs. ${previousMonthExpenses.toLocaleString()} last month</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-muted-foreground mb-1">Net Income</p>
                <span className="text-xs flex items-center text-blue-600">
                  {savingsRatePercent}% of income
                </span>
              </div>
              <p className="text-2xl font-bold">${netIncome.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Budget Usage: {budgetUsagePercent.toFixed(0)}%
              </p>
              <Progress value={budgetUsagePercent} className="h-1.5 mt-2" />
            </div>
          </div>

          <div className="h-[280px]">
            {chartData.labels && chartData.labels.length > 0 && (
              <Bar data={chartData} options={options} />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="income" className="space-y-4">
          <div className="h-[280px]">
            {chartData.labels && chartData.labels.length > 0 && (
              <Bar data={chartData} options={options} />
            )}
          </div>
          
          <div className="border rounded-lg divide-y">
            <div className="flex items-center justify-between p-3 font-medium text-sm bg-muted/50">
              <span>Income Source</span>
              <span>Amount</span>
            </div>
            {incomeData.map((income, index) => (
              <div key={index} className="flex items-center justify-between p-3 text-sm">
                <span>{income.category}</span>
                <div className="flex flex-col items-end">
                  <span>${income.amount.toLocaleString()}</span>
                  {income.previousMonth && income.previousMonth !== income.amount && (
                    <span className={`text-xs ${income.amount > income.previousMonth ? 'text-green-600' : 'text-red-600'}`}>
                      {income.amount > income.previousMonth ? '+' : ''}
                      ${(income.amount - income.previousMonth).toLocaleString()} vs last month
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 font-medium bg-muted/30">
              <span>Total Income</span>
              <span>${totalIncome.toLocaleString()}</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-4">
          <div className="h-[280px]">
            {chartData.labels && chartData.labels.length > 0 && (
              <Bar data={chartData} options={options} />
            )}
          </div>
          
          {selectedView === 'category' && (
            <div className="border rounded-lg divide-y">
              <div className="flex items-center p-3 font-medium text-sm bg-muted/50">
                <span className="w-1/3">Category</span>
                <span className="w-1/4 text-right">Actual</span>
                <span className="w-1/4 text-right">Budget</span>
                <span className="w-1/4 text-right">Difference</span>
              </div>
              {expenseData.map((expense, index) => {
                const difference = (expense.budgeted || 0) - expense.amount;
                return (
                  <div 
                    key={index} 
                    className={`flex items-center p-3 text-sm ${difference < 0 ? 'bg-red-50 dark:bg-red-900/10' : ''}`}
                  >
                    <span className="w-1/3">{expense.category}</span>
                    <span className="w-1/4 text-right">${expense.amount.toLocaleString()}</span>
                    <span className="w-1/4 text-right">${(expense.budgeted || 0).toLocaleString()}</span>
                    <span className={`w-1/4 text-right ${difference < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {difference < 0 ? '-' : '+'}${Math.abs(difference).toLocaleString()}
                    </span>
                  </div>
                );
              })}
              <div className="flex items-center p-3 font-medium bg-muted/30">
                <span className="w-1/3">Total</span>
                <span className="w-1/4 text-right">${totalExpenses.toLocaleString()}</span>
                <span className="w-1/4 text-right">${totalBudget.toLocaleString()}</span>
                <span className={`w-1/4 text-right ${totalBudget - totalExpenses < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {totalBudget - totalExpenses < 0 ? '-' : '+'}${Math.abs(totalBudget - totalExpenses).toLocaleString()}
                </span>
              </div>
            </div>
          )}
          
          {selectedView === 'comparison' && (
            <div className="border rounded-lg divide-y">
              <div className="flex items-center p-3 font-medium text-sm bg-muted/50">
                <span className="w-1/3">Category</span>
                <span className="w-1/4 text-right">Current Month</span>
                <span className="w-1/4 text-right">Previous Month</span>
                <span className="w-1/4 text-right">Change</span>
              </div>
              {expenseData.map((expense, index) => {
                const difference = expense.amount - (expense.previousMonth || 0);
                const percentChange = expense.previousMonth ? (difference / expense.previousMonth * 100).toFixed(1) : '0.0';
                return (
                  <div 
                    key={index} 
                    className="flex items-center p-3 text-sm"
                  >
                    <span className="w-1/3">{expense.category}</span>
                    <span className="w-1/4 text-right">${expense.amount.toLocaleString()}</span>
                    <span className="w-1/4 text-right">${(expense.previousMonth || 0).toLocaleString()}</span>
                    <span className={`w-1/4 text-right flex items-center justify-end ${difference < 0 ? 'text-green-600' : difference > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                      {difference < 0 ? 
                        <ArrowDownRight className="h-3 w-3 mr-1" /> : 
                        difference > 0 ? 
                        <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                        ''
                      }
                      {Math.abs(Number(percentChange))}%
                    </span>
                  </div>
                );
              })}
              <div className="flex items-center p-3 font-medium bg-muted/30">
                <span className="w-1/3">Total</span>
                <span className="w-1/4 text-right">${totalExpenses.toLocaleString()}</span>
                <span className="w-1/4 text-right">${previousMonthExpenses.toLocaleString()}</span>
                <span className={`w-1/4 text-right flex items-center justify-end ${Number(expensesChangePercent) < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Number(expensesChangePercent) < 0 ? 
                    <ArrowDownRight className="h-3 w-3 mr-1" /> : 
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  }
                  {Math.abs(Number(expensesChangePercent))}%
                </span>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 