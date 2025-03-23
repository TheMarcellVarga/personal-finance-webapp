"use client";

import { useState, useEffect, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, ChevronRight, AlertTriangle, Shield, TrendingUp, CreditCard, PiggyBank, DollarSign } from "lucide-react";

interface HealthMetric {
  name: string;
  score: number;
  maxScore: number;
  status: "excellent" | "good" | "fair" | "poor";
  icon: ReactNode;
  description: string;
  recommendation: string;
}

export default function FinancialHealthScore() {
  const [overallScore, setOverallScore] = useState(0);
  const [scoreColor, setScoreColor] = useState("");
  const [scoreLabel, setScoreLabel] = useState("");
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  
  useEffect(() => {
    // In a real application, this would fetch real financial data
    // and calculate metrics based on that data
    
    // Mock metrics
    const mockMetrics: HealthMetric[] = [
      {
        name: "Savings Rate",
        score: 18,
        maxScore: 25,
        status: "good",
        icon: <PiggyBank className="h-4 w-4 text-primary" />,
        description: "You're saving 20% of your income",
        recommendation: "Increase to 25% for optimal financial security"
      },
      {
        name: "Debt Management",
        score: 13,
        maxScore: 25,
        status: "fair",
        icon: <CreditCard className="h-4 w-4 text-amber-500" />,
        description: "Your debt-to-income ratio is 28%",
        recommendation: "Work to reduce high-interest debt below 20%"
      },
      {
        name: "Emergency Fund",
        score: 15,
        maxScore: 20,
        status: "good",
        icon: <Shield className="h-4 w-4 text-green-500" />,
        description: "You have 4 months of expenses saved",
        recommendation: "Target 6 months for improved security"
      },
      {
        name: "Investment Diversity",
        score: 10,
        maxScore: 15,
        status: "fair",
        icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
        description: "Your investments are somewhat diversified",
        recommendation: "Consider adding more international exposure"
      },
      {
        name: "Tax Optimization",
        score: 8,
        maxScore: 15,
        status: "fair",
        icon: <DollarSign className="h-4 w-4 text-purple-500" />,
        description: "You're using some tax-advantaged accounts",
        recommendation: "Maximize retirement contributions for better tax efficiency"
      }
    ];
    
    setMetrics(mockMetrics);
    
    // Calculate overall score
    const totalScore = mockMetrics.reduce((sum, metric) => sum + metric.score, 0);
    const totalMaxScore = mockMetrics.reduce((sum, metric) => sum + metric.maxScore, 0);
    const calculatedScore = Math.round((totalScore / totalMaxScore) * 100);
    
    setOverallScore(calculatedScore);
    
    // Set color and label based on score
    if (calculatedScore >= 90) {
      setScoreColor("text-green-500");
      setScoreLabel("Excellent");
    } else if (calculatedScore >= 75) {
      setScoreColor("text-emerald-500");
      setScoreLabel("Very Good");
    } else if (calculatedScore >= 60) {
      setScoreColor("text-blue-500");
      setScoreLabel("Good");
    } else if (calculatedScore >= 40) {
      setScoreColor("text-amber-500");
      setScoreLabel("Fair");
    } else {
      setScoreColor("text-red-500");
      setScoreLabel("Needs Attention");
    }
  }, []);
  
  // Get background color for status badges
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "good":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "fair":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "poor":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <div className="relative w-36 h-36 mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`text-4xl font-bold ${scoreColor}`}>{overallScore}</div>
          </div>
          <svg className="w-full h-full" viewBox="0 0 120 120">
            <circle 
              cx="60" 
              cy="60" 
              r="54" 
              fill="none" 
              stroke="currentColor" 
              className="text-gray-200 dark:text-gray-800" 
              strokeWidth="12" 
            />
            <circle 
              cx="60" 
              cy="60" 
              r="54" 
              fill="none" 
              stroke="currentColor" 
              className={scoreColor.replace('text', 'text')} 
              strokeWidth="12" 
              strokeDasharray="339.292"
              strokeDashoffset={339.292 * (1 - overallScore / 100)}
              transform="rotate(-90 60 60)"
            />
          </svg>
        </div>
        <h3 className={`text-xl font-bold ${scoreColor}`}>{scoreLabel}</h3>
        <p className="text-sm text-muted-foreground mt-1">Financial Health Score</p>
      </div>
      
      {/* Metrics */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-2">Score Breakdown</h3>
        {metrics.map((metric, index) => (
          <Card key={index} className="overflow-hidden border-primary/10">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="mr-3">{metric.icon}</div>
                  <div>
                    <h4 className="font-medium text-sm">{metric.name}</h4>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </div>
                <div className={`text-xs rounded-full px-2 py-1 ${getStatusBgColor(metric.status)}`}>
                  {metric.status}
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span>{metric.score} / {metric.maxScore} points</span>
                  <span>{Math.round((metric.score / metric.maxScore) * 100)}%</span>
                </div>
                <Progress 
                  value={(metric.score / metric.maxScore) * 100} 
                  className="h-1.5" 
                />
              </div>
              
              <div className="mt-3 pt-3 border-t text-xs">
                <div className="flex">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mr-1.5 flex-shrink-0 mt-0.5" />
                  <span>{metric.recommendation}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Actions */}
      <div className="pt-2">
        <button className="text-sm text-primary flex items-center hover:underline">
          View Detailed Health Report <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
} 