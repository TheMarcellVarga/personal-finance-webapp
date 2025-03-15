"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, PiggyBank, LineChart, ArrowRight } from "lucide-react";
import ExpenseTracker from "@/components/financial/ExpenseTracker";
import RetirementCalculator from "@/components/financial/RetirementCalculator";
import SavingsGoalTracker from "@/components/financial/SavingsGoalTracker";

export default function FinancialPlanningPage() {
  return (
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
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="retirement" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span>Retirement Calculator</span>
          </TabsTrigger>
          <TabsTrigger value="savings" className="flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
            <span>Savings Goals</span>
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Expense Tracker</span>
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
      </Tabs>
    </div>
  );
} 