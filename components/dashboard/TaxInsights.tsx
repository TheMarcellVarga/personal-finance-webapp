"use client";

import { ArrowRight, Check, ChevronRight, FileBadge, FileBarChart, PieChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function TaxInsights() {
  // Mock tax data
  const currentTaxRate = 25.4;
  const optimizedTaxRate = 22.1;
  const potentialSavings = 3750;
  const taxesPaid = 18500;
  const projectedTaxes = 21200;

  // Tax breakdown data for doughnut chart
  const taxBreakdownData: ChartData<'doughnut'> = {
    labels: ['Income Tax', 'Social Security', 'Medicare', 'State Tax', 'Local Tax'],
    datasets: [
      {
        data: [10500, 4200, 1800, 3500, 1200],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
        labels: {
          boxWidth: 10,
          font: {
            size: 10
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((sum: number, data: number) => sum + data, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD',
              maximumFractionDigits: 0
            }).format(value)} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '65%'
  };

  // Tax savings opportunities
  const savingsOpportunities = [
    {
      id: "retirement",
      name: "401k Contributions",
      description: "Increase retirement contributions",
      potential: 1800,
    },
    {
      id: "deductions",
      name: "Itemized Deductions",
      description: "Switch from standard to itemized",
      potential: 1250,
    },
    {
      id: "investments",
      name: "Tax-Loss Harvesting",
      description: "Offset gains with strategic losses",
      potential: 700,
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-1">
          <FileBadge className="h-4 w-4" />
          <h3 className="font-medium">Tax Insights</h3>
        </div>
        <p className="text-xs text-muted-foreground">Tax situation and savings</p>
      </div>
      
      <div className="space-y-5 flex-1">
        {/* Tax Rate Comparison */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Current Effective Tax Rate</h4>
            <span className="font-bold">{currentTaxRate}%</span>
          </div>
          
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Optimized Tax Rate</h4>
            <span className="font-bold text-green-500">{optimizedTaxRate}%</span>
          </div>
          <Progress value={optimizedTaxRate} max={40} className="h-1.5" indicatorClassName="bg-green-500" />
          
          <div className="p-2 rounded bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <p className="text-xs text-green-700 dark:text-green-400 flex items-center">
              <Check className="h-3 w-3 mr-1" />
              Potential tax savings: ${potentialSavings.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Tax Breakdown Chart */}
        <div className="h-[140px] relative">
          <Doughnut data={taxBreakdownData} options={chartOptions} />
        </div>

        {/* Tax Savings Opportunities */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Savings Opportunities</h4>
          
          {savingsOpportunities.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 hover:bg-secondary/50 transition-colors cursor-pointer group border-b border-border last:border-0">
              <div>
                <h5 className="font-medium text-sm">{item.name}</h5>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-green-500 mr-1">
                  +${item.potential}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-xs pt-1">
          <div>
            <p className="text-muted-foreground">YTD Taxes Paid</p>
            <p className="font-medium">${taxesPaid.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">Projected Annual</p>
            <p className="font-medium">${projectedTaxes.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 