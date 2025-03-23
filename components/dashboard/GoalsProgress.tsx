"use client";

import { Progress } from "@/components/ui/progress";
import { ChevronRight } from "lucide-react";

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
    <div className="space-y-6">
      {goals.map((goal) => {
        const percentage = calculatePercentage(goal.current, goal.target);
        
        return (
          <div key={goal.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{goal.name}</h4>
                <p className="text-xs text-muted-foreground">Target: {formatCurrency(goal.target)} by {goal.deadline}</p>
              </div>
              <span className="text-sm font-medium">{percentage}%</span>
            </div>
            
            <div className="relative">
              <Progress 
                value={percentage} 
                className={`h-2 ${percentage === 100 ? "bg-opacity-20" : ""}`}
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
      
      <div className="pt-2">
        <button className="text-sm text-primary flex items-center hover:underline">
          Add New Goal <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
} 