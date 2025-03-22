"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, PiggyBank, LineChart, ArrowRight, BarChart, Lightbulb, FileText } from "lucide-react";
import ExpenseTracker from "@/components/financial/ExpenseTracker";
import RetirementCalculator from "@/components/financial/RetirementCalculator";
import SavingsGoalTracker from "@/components/financial/SavingsGoalTracker";
import FinancialInsights from "@/components/financial/FinancialInsights";
import FinancialRecommendations from "@/components/financial/FinancialRecommendations";
import FinancialReport from "@/components/financial/FinancialReport";
import { Header } from "@/components/Header";

export default function FinancialPlanningPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        pageTitle="Financial Planning" 
      />
      <div className="container mx-auto p-6 pt-20 pb-20">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/70 to-primary">
            Financial Planning Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plan your financial future with our comprehensive tools designed to help you achieve your goals,
            with integrated tax calculations for more accurate projections.
          </p>
        </div>

        <Tabs defaultValue="retirement" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="retirement" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span>Retirement</span>
            </TabsTrigger>
            <TabsTrigger value="savings" className="flex items-center gap-2">
              <PiggyBank className="h-4 w-4" />
              <span>Savings Goals</span>
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>Expenses</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Insights</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <span>AI Advice</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="retirement">
            <Card>
              <CardHeader>
                <CardTitle>Retirement Calculator</CardTitle>
                <CardDescription>
                  Plan for your retirement by calculating how your savings will grow over time, 
                  accounting for tax implications in different countries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RetirementCalculator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="savings">
            <Card>
              <CardHeader>
                <CardTitle>Savings Goal Tracker</CardTitle>
                <CardDescription>
                  Set and track your savings goals with tax-efficient investment recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SavingsGoalTracker />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses">
            <Card>
              <CardHeader>
                <CardTitle>Expense Tracker</CardTitle>
                <CardDescription>
                  Track your expenses and identify tax-deductible spending to optimize your finances.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseTracker />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle>Financial Insights</CardTitle>
                <CardDescription>
                  Visualize your spending patterns and get personalized insights to optimize your finances.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialInsights />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Financial Recommendations</CardTitle>
                <CardDescription>
                  Get personalized financial advice based on your spending habits and financial goals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialRecommendations />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>
                  Generate detailed financial reports to analyze your finances and export them as PDF.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialReport />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 