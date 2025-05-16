"use client";

import { Progress } from "@/components/ui/progress";
import { ChevronRight, Target, Activity } from "lucide-react";

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  color: string;
}

export default function GoalsProgress() {
  // Mock goals data
  const goals: Goal[] = [
    {
      id: "emergency-fund",
      name: "Emergency Fund",
      target: 25000,
      current: 18750,
      deadline: "Dec 2023",
      color: "bg-blue-500"
    },
    {
      id: "home-downpayment",
      name: "Home Down Payment",
      target: 50000,
      current: 22500,
      deadline: "Jun 2024",
      color: "bg-green-500"
    },
    {
      id: "vacation",
      name: "Vacation",
      target: 5000,
      current: 3200,
      deadline: "Jul 2023",
      color: "bg-purple-500"
    },
    {
      id: "new-car",
      name: "New Car",
      target: 30000,
      current: 5400,
      deadline: "Dec 2024",
      color: "bg-amber-500"
    }
  ];

  // Calculate progress percentage
  const calculatePercentage = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-1">
          <Target className="h-4 w-4" />
          <h3 className="font-medium">Goals Progress</h3>
        </div>
        <p className="text-xs text-muted-foreground">Track your financial targets</p>
      </div>
      
      <div className="space-y-4 flex-1">
        {goals.map((goal) => {
          const percentage = calculatePercentage(goal.current, goal.target);
          
          return (
            <div key={goal.id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">{goal.name}</h4>
                  <p className="text-xs text-muted-foreground">Target: {formatCurrency(goal.target)} by {goal.deadline}</p>
                </div>
                <span className="text-sm font-medium">{percentage}%</span>
              </div>
              
              <div className="relative">
                <Progress 
                  value={percentage} 
                  className={`h-1.5 ${percentage === 100 ? "bg-opacity-20" : ""}`}
                  indicatorClassName={goal.color}
                />
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Current: {formatCurrency(goal.current)}</span>
                <span>Remaining: {formatCurrency(goal.target - goal.current)}</span>
              </div>
            </div>
          );
        })}
        
        <div className="pt-1">
          <button className="text-sm text-primary flex items-center hover:underline">
            Add New Goal <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
} 