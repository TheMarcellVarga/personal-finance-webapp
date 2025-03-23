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
}

// Define chart data type
interface ChartDataType {
  labels: string[];
  datasets: DatasetType[];
}

export default function DashboardOverview() {
  const [chartData, setChartData] = useState<ChartDataType>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Mock data for the dashboard overview chart
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const incomeData = [4500, 4800, 5200, 5100, 5400, 5600, 5700, 6000, 6200, 6500, 6800, 7000];
    const expensesData = [3800, 3900, 4100, 4000, 4300, 4400, 4500, 4700, 4800, 5000, 5100, 5300];
    const savingsData = incomeData.map((income, index) => income - expensesData[index]);
    
    setChartData({
      labels,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: false,
        },
        {
          label: 'Expenses',
          data: expensesData,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.4,
          fill: false,
        },
        {
          label: 'Savings',
          data: savingsData,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.4,
          fill: true,
        }
      ],
    });
  }, []);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
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
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <div className="h-[350px] w-full">
      {chartData.labels.length > 0 && (
        <Line data={chartData as ChartData<'line'>} options={options} />
      )}
    </div>
  );
} 