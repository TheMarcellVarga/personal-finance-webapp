"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  LineChart, 
  BarChart, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  TrendingUp, 
  PiggyBank, 
  Wallet, 
  Activity,
  Receipt,
  Calculator
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import FinancialSummary from "@/components/dashboard/FinancialSummary";
import GoalsProgress from "@/components/dashboard/GoalsProgress";
import TaxInsights from "@/components/dashboard/TaxInsights";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        pageTitle="Financial Dashboard" 
      />
      
      <main className="container mx-auto p-6 pt-20 pb-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
            Financial Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Your personal financial command center. Track, analyze, and optimize your finances across all dimensions.
          </p>
        </div>

        {/* Main Dashboard Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Financial Summary */}
          <Card className="lg:col-span-2 border border-primary/10 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Financial Overview</CardTitle>
                <Tabs defaultValue="month" className="w-[230px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardDescription>Your financial health at a glance</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <DashboardOverview />
            </CardContent>
          </Card>

          {/* Right Column - Financial Stats */}
          <div className="space-y-6">
            {/* Net Worth Card */}
            <Card className="border border-primary/10 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Net Worth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold">$124,500</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      12.5%
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    Since last month
                  </span>
                  <Progress 
                    value={75} 
                    className="h-2 mt-4" 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Target: $175,000</span>
                    <span>75% Complete</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Budget Status Card */}
            <Card className="border border-primary/10 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Budget Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold">$2,340</span>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      8.2%
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    Remaining this month
                  </span>
                  <Progress 
                    value={65} 
                    className="h-2 mt-4" 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Spent: $4,360</span>
                    <span>Budget: $6,700</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Savings Card */}
            <Card className="border border-primary/10 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Savings Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold">$18,750</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      4.3%
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    Emergency fund progress
                  </span>
                  <Progress 
                    value={75} 
                    className="h-2 mt-4" 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Target: $25,000</span>
                    <span>75% Complete</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Financial Summary */}
          <Card className="lg:col-span-8 border border-primary/10 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Income & Expenses</CardTitle>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
              <CardDescription>Monthly breakdown of your cash flow</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <FinancialSummary />
            </CardContent>
          </Card>

          {/* Goals Progress */}
          <Card className="lg:col-span-4 border border-primary/10 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Goals Progress</CardTitle>
                <Button variant="outline" size="sm">
                  <Link href="/financial-planning">All Goals</Link>
                </Button>
              </div>
              <CardDescription>Track your financial targets</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <GoalsProgress />
            </CardContent>
          </Card>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Tax Insights */}
          <Card className="lg:col-span-4 border border-primary/10 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Tax Insights</CardTitle>
                <Button variant="outline" size="sm">
                  <Link href="/calculator">Tax Calculator</Link>
                </Button>
              </div>
              <CardDescription>Current tax situation and savings</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <TaxInsights />
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="lg:col-span-8 border border-primary/10 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="outline" size="sm">
                  <Link href="/financial-planning">All Transactions</Link>
                </Button>
              </div>
              <CardDescription>Your recent financial activity</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <RecentTransactions />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Track Expenses",
              description: "Log and categorize your spending",
              icon: <Wallet className="h-8 w-8 text-primary" />,
              link: "/financial-planning?tab=expenses"
            },
            {
              title: "Update Budget",
              description: "Review and adjust your budget",
              icon: <DollarSign className="h-8 w-8 text-primary" />,
              link: "/financial-planning?tab=budget"
            },
            {
              title: "Calculate Taxes",
              description: "Explore tax implications globally",
              icon: <Calculator className="h-8 w-8 text-primary" />,
              link: "/calculator"
            },
            {
              title: "Plan Retirement",
              description: "Update your retirement strategy",
              icon: <PiggyBank className="h-8 w-8 text-primary" />,
              link: "/financial-planning?tab=retirement"
            },
          ].map((action, index) => (
            <Link key={index} href={action.link}>
              <Card className="border border-primary/10 shadow-md hover:bg-secondary/20 transition-all duration-300 hover:-translate-y-1 h-full">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-3">
                    {action.icon}
                  </div>
                  <CardTitle className="text-xl mb-1">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
} 