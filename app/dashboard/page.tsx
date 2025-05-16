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
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-background to-background dark:from-indigo-950/20 dark:via-background dark:to-background">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <Header pageTitle="Financial Dashboard" />
      
      <main className="container mx-auto p-4 sm:p-6 pt-20 pb-16 relative z-10">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Financial Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-3xl">
            Your personal financial command center. Track, analyze, and optimize your finances.
          </p>
        </div>

        {/* Top Row - Key Financial Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Card className="border border-indigo-200/30 dark:border-indigo-800/30 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-md">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm text-indigo-700 dark:text-indigo-300 mb-1">Net Worth</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-2xl font-bold">$124,500</span>
                  <Badge variant="outline" className="bg-green-500/20 text-green-600 dark:text-green-400 text-xs flex items-center border-green-200 dark:border-green-800">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    12.5%
                  </Badge>
                </div>
                <Progress value={75} className="h-1.5 mt-2 bg-indigo-100 dark:bg-indigo-900" />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Goal: $175K</span>
                  <span>75%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-indigo-200/30 dark:border-indigo-800/30 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 dark:from-indigo-900/20 dark:to-purple-900/20 shadow-md">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 mb-1">Monthly Income</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-2xl font-bold">$7,050</span>
                  <Badge variant="outline" className="bg-green-500/20 text-green-600 dark:text-green-400 text-xs flex items-center border-green-200 dark:border-green-800">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    4.2%
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <DollarSign className="h-3 w-3 mr-1 text-purple-500 dark:text-purple-500" />
                  <span>vs $6,768 last month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-indigo-200/30 dark:border-indigo-800/30 bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-purple-900/20 dark:to-pink-900/20 shadow-md">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm text-pink-700 dark:text-pink-300 mb-1">Monthly Expenses</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-2xl font-bold">$5,320</span>
                  <Badge variant="outline" className="bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs flex items-center border-amber-200 dark:border-amber-800">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    2.8%
                  </Badge>
                </div>
                <Progress value={79} className="h-1.5 mt-2 bg-pink-100 dark:bg-pink-900" />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Budget: $6,700</span>
                  <span>79%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-indigo-200/30 dark:border-indigo-800/30 bg-gradient-to-br from-pink-50/30 to-rose-50/30 dark:from-pink-900/20 dark:to-rose-900/20 shadow-md">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm text-rose-700 dark:text-rose-300 mb-1">Savings Rate</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-2xl font-bold">24.5%</span>
                  <Badge variant="outline" className="bg-green-500/20 text-green-600 dark:text-green-400 text-xs flex items-center border-green-200 dark:border-green-800">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    1.3%
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <PiggyBank className="h-3 w-3 mr-1 text-rose-500 dark:text-rose-500" />
                  <span>$1,730/mo saved</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Financial Overview - Large Chart */}
          <Card className="border border-indigo-200/30 dark:border-indigo-800/30 bg-gradient-to-br from-white to-indigo-50/20 dark:from-gray-900/40 dark:to-indigo-950/20 shadow-md md:col-span-2">
            <CardHeader className="pb-2 space-y-1 border-b border-indigo-100/30 dark:border-indigo-900/30">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-indigo-800 dark:text-indigo-200">Financial Overview</CardTitle>
                </div>
                <Tabs defaultValue="month" className="w-[180px]">
                  <TabsList className="grid w-full grid-cols-3 h-8 bg-white dark:bg-gray-800 p-1 border border-indigo-100 dark:border-indigo-800 shadow-sm">
                    <TabsTrigger value="week" className="text-xs data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 dark:data-[state=active]:bg-indigo-900/60 dark:data-[state=active]:text-indigo-300">Week</TabsTrigger>
                    <TabsTrigger value="month" className="text-xs data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 dark:data-[state=active]:bg-indigo-900/60 dark:data-[state=active]:text-indigo-300">Month</TabsTrigger>
                    <TabsTrigger value="year" className="text-xs data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 dark:data-[state=active]:bg-indigo-900/60 dark:data-[state=active]:text-indigo-300">Year</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardDescription className="text-gray-600 dark:text-gray-400">Income, expenses and savings trends</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <DashboardOverview />
            </CardContent>
          </Card>

          {/* AI Financial Advisor */}
          <Card className="border border-indigo-200/30 dark:border-indigo-800/30 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 dark:from-indigo-950/30 dark:to-purple-950/30 shadow-md md:row-span-2">
            <CardHeader className="pb-2 space-y-1 border-b border-indigo-100/30 dark:border-indigo-900/30">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                  <CardTitle className="text-purple-800 dark:text-purple-200">AI Advisor</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs border-purple-200 hover:bg-purple-50/50 dark:border-purple-800 dark:hover:bg-purple-900/50">
                  Full Consultation
                </Button>
              </div>
              <CardDescription className="text-gray-600 dark:text-gray-400">Personalized financial insights</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <AIFinancialAdvisor />
            </CardContent>
          </Card>

          {/* Income & Expenses */}
          <Card className="border border-indigo-200/30 dark:border-indigo-800/30 bg-gradient-to-br from-white to-indigo-50/20 dark:from-gray-900/40 dark:to-indigo-950/20 shadow-md md:col-span-2">
            <CardHeader className="pb-2 space-y-1 border-b border-indigo-100/30 dark:border-indigo-900/30">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-indigo-800 dark:text-indigo-200">Income & Expenses</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs border-indigo-200 hover:bg-indigo-50/50 dark:border-indigo-800 dark:hover:bg-indigo-900/50">
                  View Details
                </Button>
              </div>
              <CardDescription className="text-gray-600 dark:text-gray-400">Monthly breakdown of your cash flow</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <FinancialSummary />
            </CardContent>
          </Card>

          {/* Recent Transactions & Investment Portfolio */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Recent Transactions */}
              <Card className="border border-indigo-200/30 dark:border-indigo-800/30 bg-gradient-to-br from-white to-indigo-50/20 dark:from-gray-900/40 dark:to-indigo-950/20 shadow-md md:col-span-2">
                <CardHeader className="pb-2 space-y-1 border-b border-indigo-100/30 dark:border-indigo-900/30">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                      <CardTitle className="text-indigo-800 dark:text-indigo-200">Recent Transactions</CardTitle>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs border-indigo-200 hover:bg-indigo-50/50 dark:border-indigo-800 dark:hover:bg-indigo-900/50">
                      <Link href="/transactions">All Transactions</Link>
                    </Button>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Your recent financial activity</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <RecentTransactions />
                </CardContent>
              </Card>

              {/* Financial Health Score */}
              <Card className="border border-indigo-200/30 dark:border-indigo-800/30 bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-purple-950/30 dark:to-pink-950/30 shadow-md">
                <CardHeader className="pb-2 space-y-1 border-b border-indigo-100/30 dark:border-indigo-900/30">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <HeartPulse className="h-5 w-5 mr-2 text-pink-600 dark:text-pink-400" />
                      <CardTitle className="text-pink-800 dark:text-pink-200">Financial Health</CardTitle>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs border-pink-200 hover:bg-pink-50/50 dark:border-pink-800 dark:hover:bg-pink-900/50">
                      View Details
                    </Button>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Your financial wellness score</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <FinancialHealthScore />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Investment Portfolio */}
              <Card className="border border-indigo-200/30 dark:border-indigo-800/30 bg-gradient-to-br from-white to-indigo-50/20 dark:from-gray-900/40 dark:to-indigo-950/20 shadow-md md:col-span-2">
                <CardContent className="p-4">
                  <InvestmentPortfolio />
                </CardContent>
              </Card>

              {/* Side-by-side boxes */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {/* Goals Progress */}
                <Card className="border border-indigo-200/30 dark:border-indigo-800/30 bg-gradient-to-br from-white to-indigo-50/20 dark:from-gray-900/40 dark:to-indigo-950/20 shadow-md">
                  <CardContent className="p-4">
                    <GoalsProgress />
                  </CardContent>
                </Card>

                {/* Tax Insights */}
                <Card className="border border-indigo-200/30 dark:border-indigo-800/30 bg-gradient-to-br from-white to-indigo-50/20 dark:from-gray-900/40 dark:to-indigo-950/20 shadow-md">
                  <CardContent className="p-4">
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
              icon: <Wallet className="h-6 w-6 text-primary dark:text-primary" />,
              link: "/financial-planning?tab=expenses"
            },
            {
              title: "Update Budget",
              description: "Adjust your budget",
              icon: <DollarSign className="h-6 w-6 text-primary dark:text-primary" />,
              link: "/financial-planning?tab=budget"
            },
            {
              title: "Calculate Taxes",
              description: "Tax implications",
              icon: <Calculator className="h-6 w-6 text-primary dark:text-primary" />,
              link: "/calculator"
            },
            {
              title: "Plan Retirement",
              description: "Update strategy",
              icon: <PiggyBank className="h-6 w-6 text-primary dark:text-primary" />,
              link: "/financial-planning?tab=retirement"
            },
          ].map((action, index) => (
            <Link key={index} href={action.link}>
              <Card className="border border-primary/10 shadow-sm hover:bg-secondary/20 transition-all duration-300 hover:-translate-y-1 h-full dark:border-primary/20 dark:hover:bg-primary/10">
                <CardContent className="p-3 sm:p-4 flex flex-row sm:flex-col sm:items-center sm:text-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20">
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