"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calculator, 
  PiggyBank, 
  LineChart, 
  BarChart, 
  Lightbulb, 
  FileText, 
  DollarSign, 
  Receipt 
} from "lucide-react";
import ExpenseTracker from "@/components/financial/ExpenseTracker";
import RetirementCalculator from "@/components/financial/RetirementCalculator";
import SavingsGoalTracker from "@/components/financial/SavingsGoalTracker";
import FinancialInsights from "@/components/financial/FinancialInsights";
import FinancialRecommendations from "@/components/financial/FinancialRecommendations";
import FinancialReport from "@/components/financial/FinancialReport";
import BudgetManager from "@/components/financial/BudgetManager";
import TaxDeductionAssistant from "@/components/financial/TaxDeductionAssistant";
import { Header } from "@/components/Header";

export default function FinancialPlanningPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-background to-background">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        pageTitle="Financial Planning" 
      />
      <div className="container mx-auto p-6 pt-20 pb-20 relative z-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
            Financial Planning Tools
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plan your financial future with our comprehensive tools designed to help you achieve your goals,
            with integrated tax calculations for more accurate projections.
          </p>
        </div>

        <Tabs defaultValue="retirement" className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8 bg-white p-1 border border-indigo-100 rounded-lg shadow-sm">
            <TabsTrigger value="retirement" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
              <Calculator className="h-4 w-4" />
              <span>Retirement</span>
            </TabsTrigger>
            <TabsTrigger value="savings" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
              <PiggyBank className="h-4 w-4" />
              <span>Savings Goals</span>
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
              <LineChart className="h-4 w-4" />
              <span>Expenses</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
              <DollarSign className="h-4 w-4" />
              <span>Budget</span>
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
              <Receipt className="h-4 w-4" />
              <span>Tax Deductions</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
              <BarChart className="h-4 w-4" />
              <span>Insights</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
              <Lightbulb className="h-4 w-4" />
              <span>AI Advice</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
              <FileText className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="retirement">
            <Card className="border border-indigo-200/30 bg-gradient-to-br from-white to-indigo-50/20 shadow-md">
              <CardHeader className="border-b border-indigo-100/30">
                <CardTitle className="text-indigo-800">Retirement Calculator</CardTitle>
                <CardDescription className="text-gray-600">
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
            <Card className="border border-indigo-200/30 bg-gradient-to-br from-white to-indigo-50/20 shadow-md">
              <CardHeader className="border-b border-indigo-100/30">
                <CardTitle className="text-indigo-800">Savings Goal Tracker</CardTitle>
                <CardDescription className="text-gray-600">
                  Set and track your savings goals with tax-efficient investment recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SavingsGoalTracker />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses">
            <Card className="border border-indigo-200/30 bg-gradient-to-br from-white to-indigo-50/20 shadow-md">
              <CardHeader className="border-b border-indigo-100/30">
                <CardTitle className="text-indigo-800">Expense Tracker</CardTitle>
                <CardDescription className="text-gray-600">
                  Track your expenses and identify tax-deductible spending to optimize your finances.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseTracker />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights">
            <Card className="border border-indigo-200/30 bg-gradient-to-br from-white to-indigo-50/20 shadow-md">
              <CardHeader className="border-b border-indigo-100/30">
                <CardTitle className="text-indigo-800">Financial Insights</CardTitle>
                <CardDescription className="text-gray-600">
                  Visualize your spending patterns and get personalized insights to optimize your finances.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialInsights />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="budget">
            <Card className="border border-indigo-200/30 bg-gradient-to-br from-white to-indigo-50/20 shadow-md">
              <CardHeader className="border-b border-indigo-100/30">
                <CardTitle className="text-indigo-800">Budget Manager</CardTitle>
                <CardDescription className="text-gray-600">
                  Create and manage your budget categories to track spending against targets.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetManager />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tax">
            <Card className="border border-indigo-200/30 bg-gradient-to-br from-white to-indigo-50/20 shadow-md">
              <CardHeader className="border-b border-indigo-100/30">
                <CardTitle className="text-indigo-800">Tax Deduction Assistant</CardTitle>
                <CardDescription className="text-gray-600">
                  Identify potential tax deductions from your expenses to maximize tax savings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TaxDeductionAssistant />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <Card className="border border-indigo-200/30 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 shadow-md">
              <CardHeader className="border-b border-indigo-100/30">
                <CardTitle className="text-purple-800">AI-Powered Financial Recommendations</CardTitle>
                <CardDescription className="text-gray-600">
                  Get personalized financial advice based on your spending habits and financial goals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialRecommendations />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card className="border border-indigo-200/30 bg-gradient-to-br from-white to-indigo-50/20 shadow-md">
              <CardHeader className="border-b border-indigo-100/30">
                <CardTitle className="text-indigo-800">Financial Reports</CardTitle>
                <CardDescription className="text-gray-600">
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