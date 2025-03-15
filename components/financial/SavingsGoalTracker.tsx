"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTaxStore } from "@/store/taxStore";
import { useCountries } from "@/hooks/useCountries";
import { getCountryCurrency } from "@/utils/currencyMappings";
import { PiggyBank, Target, BadgeDollarSign, TrendingUp, ArrowUpRight, BarChart3 } from "lucide-react";

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
}

// These recommendations would ideally come from your financial API or backend
// This is a simplified version for demonstration
const taxEfficientRecommendations = {
  US: [
    { 
      title: "401(k) Contributions", 
      description: "Contribute to your 401(k) to reduce taxable income. Contributions are tax-deferred.",
      taxSavings: "Up to 37% of contributions (federal tax rate)"
    },
    { 
      title: "Roth IRA", 
      description: "While contributions aren't tax-deductible, growth and qualified withdrawals are tax-free.",
      taxSavings: "Tax-free growth and withdrawals"
    },
    { 
      title: "HSA Contributions", 
      description: "Triple tax advantage: tax-deductible contributions, tax-free growth, and tax-free withdrawals for medical expenses.",
      taxSavings: "Up to 37% on contributions plus tax-free growth"
    }
  ],
  UK: [
    { 
      title: "ISA Allowance", 
      description: "Utilize your annual ISA allowance for tax-free growth and withdrawals.",
      taxSavings: "Up to 20-45% on investment earnings"
    },
    { 
      title: "Pension Contributions", 
      description: "Pension contributions are tax-deductible, reducing your taxable income.",
      taxSavings: "20-45% of contributions (income tax relief)"
    }
  ],
  DE: [
    { 
      title: "Riester Pension", 
      description: "Government-subsidized retirement plan with tax advantages.",
      taxSavings: "Tax-deductible contributions plus subsidies"
    },
    { 
      title: "Company Pension Scheme", 
      description: "Contributions often made pre-tax, reducing taxable income.",
      taxSavings: "Up to 42% on contributions (income tax rate)"
    }
  ],
  // Default recommendations for other countries
  default: [
    { 
      title: "Retirement Accounts", 
      description: "Many countries offer tax-advantaged retirement accounts. Check local regulations.",
      taxSavings: "Varies by country"
    },
    { 
      title: "Tax-Efficient Investments", 
      description: "Consider assets with preferential tax treatment in your country.",
      taxSavings: "Depends on local tax laws"
    }
  ]
};

export default function SavingsGoalTracker() {
  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: "1",
      name: "Emergency Fund",
      targetAmount: 10000,
      currentAmount: 3500,
      targetDate: "2023-12-31",
      category: "Emergency"
    },
    {
      id: "2",
      name: "Down Payment",
      targetAmount: 50000,
      currentAmount: 15000,
      targetDate: "2025-06-30",
      category: "Housing"
    }
  ]);
  
  // New goal form state
  const [newGoal, setNewGoal] = useState<Omit<SavingsGoal, "id">>({
    name: "",
    targetAmount: 0,
    currentAmount: 0,
    targetDate: "",
    category: "Other"
  });
  
  const { selectedCountry } = useTaxStore();
  const countryCode = selectedCountry || "US";
  const countries = useCountries();
  
  // Get currency based on selected country
  const currency = getCountryCurrency(countryCode) || "USD";
  
  // Get tax recommendations based on country
  const recommendations = taxEfficientRecommendations[countryCode as keyof typeof taxEfficientRecommendations] || 
                          taxEfficientRecommendations.default;
  
  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Calculate progress percentage
  const calculateProgress = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    return Math.min(percentage, 100); // Cap at 100%
  };
  
  // Calculate time remaining in months
  const calculateTimeRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return Math.max(0, diffMonths);
  };
  
  // Calculate monthly savings needed
  const calculateMonthlySavingsNeeded = (goal: SavingsGoal) => {
    const monthsRemaining = calculateTimeRemaining(goal.targetDate);
    if (monthsRemaining <= 0) return 0;
    const amountNeeded = goal.targetAmount - goal.currentAmount;
    return amountNeeded / monthsRemaining;
  };
  
  // Add a new goal
  const handleAddGoal = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setGoals([...goals, { ...newGoal, id }]);
    setNewGoal({
      name: "",
      targetAmount: 0,
      currentAmount: 0,
      targetDate: "",
      category: "Other"
    });
  };
  
  // Update goal progress
  const handleUpdateProgress = (id: string, newAmount: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, currentAmount: newAmount } : goal
    ));
  };
  
  // Delete a goal
  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="goals">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Your Goals</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <BadgeDollarSign className="h-4 w-4" />
            <span>Tax-Efficient Savings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="goals" className="space-y-6 pt-4">
          {/* Goals List */}
          <div className="grid gap-4">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{goal.name}</h3>
                        <p className="text-sm text-muted-foreground">{goal.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{formatCurrency(goal.currentAmount)}</p>
                        <p className="text-sm text-muted-foreground">
                          of {formatCurrency(goal.targetAmount)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground">Target Date:</span>
                        <span className="ml-1 font-medium">{new Date(goal.targetDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Monthly Needed:</span>
                        <span className="ml-1 font-medium">
                          {formatCurrency(calculateMonthlySavingsNeeded(goal))}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-2">
                      <div className="flex-grow">
                        <Input 
                          type="number"
                          placeholder="Update current amount"
                          onChange={(e) => handleUpdateProgress(goal.id, Number(e.target.value))}
                          value={goal.currentAmount}
                        />
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Add New Goal Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Savings Goal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goalName">Goal Name</Label>
                  <Input 
                    id="goalName" 
                    placeholder="e.g., Vacation Fund"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goalTarget">Target Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {currency}
                      </span>
                      <Input 
                        id="goalTarget" 
                        type="number"
                        className="pl-12"
                        value={newGoal.targetAmount}
                        onChange={(e) => setNewGoal({...newGoal, targetAmount: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="goalCurrent">Current Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {currency}
                      </span>
                      <Input 
                        id="goalCurrent" 
                        type="number"
                        className="pl-12"
                        value={newGoal.currentAmount}
                        onChange={(e) => setNewGoal({...newGoal, currentAmount: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goalDate">Target Date</Label>
                    <Input 
                      id="goalDate" 
                      type="date"
                      value={newGoal.targetDate}
                      onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="goalCategory">Category</Label>
                    <select 
                      id="goalCategory"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                    >
                      <option value="Emergency">Emergency Fund</option>
                      <option value="Retirement">Retirement</option>
                      <option value="Housing">Housing</option>
                      <option value="Education">Education</option>
                      <option value="Travel">Travel</option>
                      <option value="Vehicle">Vehicle</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleAddGoal}
                className="w-full"
                disabled={!newGoal.name || newGoal.targetAmount <= 0 || !newGoal.targetDate}
              >
                <PiggyBank className="mr-2 h-4 w-4" />
                Add Savings Goal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="pt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Tax-Efficient Saving Strategies for {countries.find(c => c.properties.ISO_A2 === countryCode)?.properties.NAME || countryCode}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <h3 className="font-medium flex items-center">
                    <ArrowUpRight className="h-4 w-4 text-primary mr-2" />
                    {rec.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                  <div className="bg-primary/10 rounded-md px-3 py-1.5 text-sm inline-flex items-center">
                    <BadgeDollarSign className="h-3.5 w-3.5 mr-1 text-primary" />
                    <span className="text-primary font-medium">Potential tax savings: {rec.taxSavings}</span>
                  </div>
                </div>
              ))}
              
              <div className="text-sm text-muted-foreground pt-2">
                <p className="flex items-start gap-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>
                    These recommendations are general guidelines. Tax laws vary by country and individual circumstances.
                    Consider consulting a financial advisor for personalized advice.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 