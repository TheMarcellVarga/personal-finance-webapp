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
  Calculator,
  Sparkles,
  HeartPulse,
  CreditCard
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import FinancialSummary from "@/components/dashboard/FinancialSummary";
import GoalsProgress from "@/components/dashboard/GoalsProgress";
import TaxInsights from "@/components/dashboard/TaxInsights";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import FinancialHealthScore from "@/components/dashboard/FinancialHealthScore";
import AIFinancialAdvisor from "@/components/dashboard/AIFinancialAdvisor";
import InvestmentPortfolio from "@/components/dashboard/InvestmentPortfolio";

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
      
      <main className="container mx-auto p-4 sm:p-6 pt-20 pb-16">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
            Financial Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
            Your personal financial command center. Track, analyze, and optimize your finances.
          </p>
        </div>

        {/* Top Row - Key Financial Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Card className="border border-primary/10 shadow-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Net Worth</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-2xl font-bold">$124,500</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 text-xs flex items-center">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    12.5%
                  </Badge>
                </div>
                <Progress value={75} className="h-1.5 mt-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Goal: $175K</span>
                  <span>75%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-primary/10 shadow-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Monthly Income</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-2xl font-bold">$7,050</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 text-xs flex items-center">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    4.2%
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                  <DollarSign className="h-3 w-3 mr-1" />
                  <span>vs $6,768 last month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-primary/10 shadow-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Monthly Expenses</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-2xl font-bold">$5,320</span>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500 text-xs flex items-center">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    2.8%
                  </Badge>
                </div>
                <Progress value={79} className="h-1.5 mt-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Budget: $6,700</span>
                  <span>79%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-primary/10 shadow-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Savings Rate</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-2xl font-bold">24.5%</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 text-xs flex items-center">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    1.3%
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                  <PiggyBank className="h-3 w-3 mr-1" />
                  <span>$1,730/mo saved</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Financial Overview - Large Chart */}
          <Card className="border border-primary/10 shadow-sm md:col-span-2">
            <CardHeader className="pb-2 space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle>Financial Overview</CardTitle>
                </div>
                <Tabs defaultValue="month" className="w-[180px]">
                  <TabsList className="grid w-full grid-cols-3 h-8">
                    <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
                    <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
                    <TabsTrigger value="year" className="text-xs">Year</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardDescription>Income, expenses and savings trends</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <DashboardOverview />
            </CardContent>
          </Card>

          {/* AI Financial Advisor */}
          <Card className="border border-primary/10 shadow-sm md:row-span-2">
            <CardHeader className="pb-2 space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle>AI Advisor</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  Full Consultation
                </Button>
              </div>
              <CardDescription>Personalized financial insights</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <AIFinancialAdvisor />
            </CardContent>
          </Card>

          {/* Income & Expenses */}
          <Card className="border border-primary/10 shadow-sm md:col-span-2">
            <CardHeader className="pb-2 space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle>Income & Expenses</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  View Details
                </Button>
              </div>
              <CardDescription>Monthly breakdown of your cash flow</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <FinancialSummary />
            </CardContent>
          </Card>

          {/* Recent Transactions & Investment Portfolio */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Recent Transactions */}
              <Card className="border border-primary/10 shadow-sm md:col-span-2">
                <CardHeader className="pb-2 space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-primary" />
                      <CardTitle>Recent Transactions</CardTitle>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <Link href="/transactions">All Transactions</Link>
                    </Button>
                  </div>
                  <CardDescription>Your recent financial activity</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <RecentTransactions />
                </CardContent>
              </Card>

              {/* Financial Health Score */}
              <Card className="border border-primary/10 shadow-sm">
                <CardHeader className="pb-2 space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <HeartPulse className="h-5 w-5 mr-2 text-primary" />
                      <CardTitle>Financial Health</CardTitle>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      View Details
                    </Button>
                  </div>
                  <CardDescription>Your financial wellness score</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <FinancialHealthScore />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Investment Portfolio */}
              <Card className="border border-primary/10 shadow-sm md:col-span-2">
                <CardHeader className="pb-2 space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                      <CardTitle>Investment Portfolio</CardTitle>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Portfolio Settings
                    </Button>
                  </div>
                  <CardDescription>Track your investment performance</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <InvestmentPortfolio />
                </CardContent>
              </Card>

              {/* Side-by-side boxes */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {/* Goals Progress */}
                <Card className="border border-primary/10 shadow-sm">
                  <CardHeader className="pb-2 space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-primary" />
                        <CardTitle>Goals Progress</CardTitle>
                      </div>
                    </div>
                    <CardDescription>Track your financial targets</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <GoalsProgress />
                  </CardContent>
                </Card>

                {/* Tax Insights */}
                <Card className="border border-primary/10 shadow-sm">
                  <CardHeader className="pb-2 space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Receipt className="h-5 w-5 mr-2 text-primary" />
                        <CardTitle>Tax Insights</CardTitle>
                      </div>
                    </div>
                    <CardDescription>Tax situation and savings</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <TaxInsights />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            {
              title: "Track Expenses",
              description: "Log your spending",
              icon: <Wallet className="h-6 w-6 text-primary" />,
              link: "/financial-planning?tab=expenses"
            },
            {
              title: "Update Budget",
              description: "Adjust your budget",
              icon: <DollarSign className="h-6 w-6 text-primary" />,
              link: "/financial-planning?tab=budget"
            },
            {
              title: "Calculate Taxes",
              description: "Tax implications",
              icon: <Calculator className="h-6 w-6 text-primary" />,
              link: "/calculator"
            },
            {
              title: "Plan Retirement",
              description: "Update strategy",
              icon: <PiggyBank className="h-6 w-6 text-primary" />,
              link: "/financial-planning?tab=retirement"
            },
          ].map((action, index) => (
            <Link key={index} href={action.link}>
              <Card className="border border-primary/10 shadow-sm hover:bg-secondary/20 transition-all duration-300 hover:-translate-y-1 h-full">
                <CardContent className="p-3 sm:p-4 flex flex-row sm:flex-col sm:items-center sm:text-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    {action.icon}
                  </div>
                  <div>
                    <CardTitle className="text-sm sm:text-base mb-0.5">{action.title}</CardTitle>
                    <CardDescription className="text-xs">{action.description}</CardDescription>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
} 