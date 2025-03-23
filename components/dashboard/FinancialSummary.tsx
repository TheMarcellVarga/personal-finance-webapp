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
}

export default function FinancialSummary() {
  const [incomeData, setIncomeData] = useState<FinancialData[]>([]);
  const [expenseData, setExpenseData] = useState<FinancialData[]>([]);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    // Mock income data
    const mockIncomeData: FinancialData[] = [
      { category: 'Salary', amount: 5000, color: 'rgba(75, 192, 192, 0.7)' },
      { category: 'Investments', amount: 1200, color: 'rgba(54, 162, 235, 0.7)' },
      { category: 'Side Hustle', amount: 800, color: 'rgba(153, 102, 255, 0.7)' },
      { category: 'Rental Income', amount: 1500, color: 'rgba(75, 192, 192, 0.7)' }
    ];

    // Mock expense data
    const mockExpenseData: FinancialData[] = [
      { category: 'Housing', amount: 1800, color: 'rgba(255, 99, 132, 0.7)' },
      { category: 'Utilities', amount: 400, color: 'rgba(255, 159, 64, 0.7)' },
      { category: 'Transportation', amount: 600, color: 'rgba(255, 205, 86, 0.7)' },
      { category: 'Food', amount: 800, color: 'rgba(255, 99, 132, 0.7)' },
      { category: 'Insurance', amount: 300, color: 'rgba(255, 159, 64, 0.7)' },
      { category: 'Entertainment', amount: 400, color: 'rgba(255, 205, 86, 0.7)' }
    ];

    setIncomeData(mockIncomeData);
    setExpenseData(mockExpenseData);

    // Prepare chart data
    const labels = [...mockIncomeData.map(i => i.category), ...mockExpenseData.map(e => e.category)];
    
    setChartData({
      labels,
      datasets: [
        {
          label: 'Income',
          data: [...mockIncomeData.map(i => i.amount), ...Array(mockExpenseData.length).fill(0)],
          backgroundColor: mockIncomeData.map(i => i.color),
          borderColor: mockIncomeData.map(i => i.color.replace('0.7', '1')),
          borderWidth: 1
        },
        {
          label: 'Expenses',
          data: [...Array(mockIncomeData.length).fill(0), ...mockExpenseData.map(e => e.amount)],
          backgroundColor: mockExpenseData.map(e => e.color),
          borderColor: mockExpenseData.map(e => e.color.replace('0.7', '1')),
          borderWidth: 1
        }
      ],
    });
  }, []);

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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
          <p className="text-sm font-medium text-muted-foreground mb-1">Total Income</p>
          <p className="text-2xl font-bold">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-sm font-medium text-muted-foreground mb-1">Total Expenses</p>
          <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm font-medium text-muted-foreground mb-1">Net Income</p>
          <p className="text-2xl font-bold">${netIncome.toLocaleString()}</p>
        </div>
      </div>

      <div className="h-[300px]">
        {chartData.labels && chartData.labels.length > 0 && (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
} 