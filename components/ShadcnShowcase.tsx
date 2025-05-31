"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";
import {
  AlertCircle,
  Info,
  CheckCircle,
  X,
  Home,
  Settings,
  User,
  Sparkles,
  TrendingUp,
  Calendar,
  Download,
  Heart
} from "lucide-react";
import Link from "next/link";

export function ShadcnShowcase() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [progress, setProgress] = useState(45);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const showToast = (type: 'default' | 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        toast({
          title: "Success!",
          description: "Your financial data has been updated successfully.",
          duration: 3000,
        });
        break;
      case 'error':
        toast({
          title: "Error",
          description: "Failed to connect to financial service. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
        break;
      case 'info':
        toast({
          title: "Information",
          description: "New market insights are available in your dashboard.",
          duration: 3000,
        });
        break;
      default:
        toast({
          title: "Notification",
          description: "This is a default toast notification.",
          duration: 3000,
        });
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
            shadcn/ui Showcase
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the enhanced UI components that power our financial management platform.
          </p>
        </div>

        {/* Breadcrumb Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Breadcrumb Navigation
            </CardTitle>
            <CardDescription>Context-aware navigation for better user orientation</CardDescription>
          </CardHeader>
          <CardContent>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <Home className="h-4 w-4" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/portfolio">Portfolio</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Investment Analysis</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardContent>
        </Card>

        {/* Alerts Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Alert Components
            </CardTitle>
            <CardDescription>Important notifications and status messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                Your monthly financial report is ready for review.
              </AlertDescription>
            </Alert>

            <Alert className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-800 dark:text-green-200">Success</AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-300">
                Your investment portfolio has been successfully updated.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Unable to sync with your bank account. Please check your connection.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Toast Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Toast Notifications
            </CardTitle>
            <CardDescription>Temporary feedback messages for user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => showToast('default')}>Default Toast</Button>
              <Button onClick={() => showToast('success')} variant="outline">Success Toast</Button>
              <Button onClick={() => showToast('error')} variant="destructive">Error Toast</Button>
              <Button onClick={() => showToast('info')} variant="secondary">Info Toast</Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading States Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Loading States
            </CardTitle>
            <CardDescription>Skeleton components for better loading experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button onClick={handleLoadingDemo} disabled={isLoading}>
                {isLoading ? "Loading..." : "Trigger Loading Demo"}
              </Button>
              <Progress value={progress} className="flex-1" />
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex space-x-2">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded">Loaded content appears here</div>
                <div className="h-4 bg-muted rounded w-3/4">Data visualization ready</div>
                <div className="flex space-x-2">
                  <Badge>Active</Badge>
                  <Badge variant="outline">Portfolio</Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tooltips Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Tooltips & Popovers
            </CardTitle>
            <CardDescription>Contextual help and additional information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover for Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This tooltip provides helpful information about the action.</p>
                </TooltipContent>
              </Tooltip>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Financial Insights</h4>
                      <p className="text-sm text-muted-foreground">
                        Your spending pattern shows a 15% increase in dining expenses this month.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Badge variant="outline" className="justify-start">
                        <Calendar className="h-3 w-3 mr-1" />
                        Monthly Analysis
                      </Badge>
                      <Badge variant="outline" className="justify-start">
                        <Download className="h-3 w-3 mr-1" />
                        Export Report
                      </Badge>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Sheet Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Sheet Components
            </CardTitle>
            <CardDescription>Slide-out panels for detailed views and forms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Settings</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Financial Preferences</SheetTitle>
                    <SheetDescription>
                      Customize your financial tracking and reporting preferences.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Notification Settings</h4>
                      <div className="space-y-2">
                        <Badge>Budget Alerts</Badge>
                        <Badge variant="outline">Investment Updates</Badge>
                        <Badge variant="secondary">Monthly Reports</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Privacy Controls</h4>
                      <Progress value={75} />
                      <p className="text-sm text-muted-foreground">Data sharing: 75% restricted</p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button>Quick Actions</Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Quick Financial Actions</SheetTitle>
                    <SheetDescription>
                      Perform common financial tasks quickly and efficiently.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    {[
                      { title: "Add Transaction", icon: "💰" },
                      { title: "Update Budget", icon: "📊" },
                      { title: "Check Investments", icon: "📈" },
                      { title: "Schedule Payment", icon: "⏰" },
                    ].map((action, index) => (
                      <Button key={index} variant="outline" className="justify-start">
                        <span className="mr-2">{action.icon}</span>
                        {action.title}
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Menu Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Navigation Menu
            </CardTitle>
            <CardDescription>Rich navigation with nested content and descriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Financial Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <Heart className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              FinAdventurer
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Comprehensive financial management platform with advanced analytics.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="/calculator">
                            <div className="text-sm font-medium leading-none">Tax Calculator</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Calculate taxes across different countries and jurisdictions.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="/dashboard">
                            <div className="text-sm font-medium leading-none">Investment Tracker</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Monitor your investment portfolio and market performance.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="/financial-planning">
                            <div className="text-sm font-medium leading-none">Budget Planner</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Create and manage comprehensive financial budgets.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </CardContent>
        </Card>

        {/* Enhanced Tabs Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Enhanced Financial Tabs</CardTitle>
            <CardDescription>Organized content with improved visual hierarchy</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231.89</div>
                      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$3,234.12</div>
                      <p className="text-xs text-muted-foreground">-5.2% from last month</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertTitle>Market Analysis</AlertTitle>
                  <AlertDescription>
                    Your portfolio has outperformed the market by 3.2% this quarter.
                  </AlertDescription>
                </Alert>
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Preferences</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Auto-categorize</Badge>
                    <Badge variant="outline">Email notifications</Badge>
                    <Badge variant="secondary">Dark mode</Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
} 