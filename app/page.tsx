"use client";

import Link from "next/link";
import { Calculator, Globe, ArrowLeftRight, MapPin, Coins, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { SignedIn, SignedOut } from "@/lib/mock-clerk";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import the Globe component to avoid SSR issues
const WireframeGlobe = dynamic(() => import("@/components/WireframeGlobe"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background">
      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Globe positioning */}
        <div className="absolute -right-20 top-1/2 -translate-y-2/3 w-[800px] h-[800px] opacity-60 pointer-events-none rotate-12">
          <WireframeGlobe />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl sm:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/50 to-primary animate-in fade-in slide-in-from-bottom-10 duration-1000 leading-tight">
            Global Tax Intelligence
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            Navigate worldwide tax systems with our interactive 3D visualization and make informed financial decisions across borders
          </p>
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <SignedIn>
              <div className="flex items-center space-x-4 justify-center">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
                <Link href="/calculator">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full hover:bg-primary/10 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Explore Calculators
                  </Button>
                </Link>
              </div>
            </SignedIn>
            <SignedOut>
              <Link href="/auth">
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Start Exploring
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center">
            <div className="w-1.5 h-3 bg-primary/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="h-8 w-8 text-primary" />,
                title: "Interactive 3D Globe",
                description:
                  "Explore tax systems across different countries through an immersive visualization",
              },
              {
                icon: <Calculator className="h-8 w-8 text-primary" />,
                title: "Real-time Calculations",
                description:
                  "Get instant tax calculations with support for multiple currencies",
              },
              {
                icon: <ArrowLeftRight className="h-8 w-8 text-primary" />,
                title: "Country Comparison",
                description:
                  "Compare tax rates and systems between different countries",
              },
            ].map((feature, index) => (
              <Card 
                key={index}
                className="group border border-primary/10 bg-secondary/20 backdrop-blur-sm hover:bg-secondary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Showcase Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Financial Command Center</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get a comprehensive view of your finances with our intelligent dashboard and AI-powered insights.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Financial Health Score</h3>
                    <p className="text-gray-500">
                      Our proprietary algorithm calculates your overall financial health and provides actionable steps to improve.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">AI Financial Advisor</h3>
                    <p className="text-gray-500">
                      Ask questions about your finances and receive personalized recommendations based on your financial data.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Global Tax Insights</h3>
                    <p className="text-gray-500">
                      Understand tax implications across different countries to optimize your financial decisions.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Link
                  href="/dashboard"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                >
                  Access Dashboard
                </Link>
                <Link
                  href="/auth"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                >
                  Try Dashboard
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[600px] rounded-lg border bg-white p-2 shadow-lg">
              <Image 
                src="/dashboard-preview.svg" 
                alt="Dashboard Preview" 
                width={600}
                height={350}
                className="rounded shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative bg-secondary/10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Select a Country",
                description:
                  "Choose your country of interest on our interactive globe",
                icon: <MapPin className="h-16 w-16 text-primary/80" />,
              },
              {
                number: "2",
                title: "Enter Income Details",
                description: "Input your income and personal details",
                icon: <Coins className="h-16 w-16 text-primary/80" />,
              },
              {
                number: "3",
                title: "Get Insights",
                description:
                  "Receive detailed tax calculations and comparisons",
                icon: <BarChart3 className="h-16 w-16 text-primary/80" />,
              },
            ].map((step, index) => (
              <Card 
                key={index}
                className="relative border border-primary/10 bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-all duration-300 group"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg group-hover:scale-110 transition-transform duration-300 z-10">
                  {step.number}
                </div>
                <CardContent className="pt-8 flex flex-col items-center">
                  <div className="mb-6 h-24 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <CardTitle className="text-xl font-semibold mb-2">{step.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{step.description}</CardDescription>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <Card className="border border-primary/20 bg-gradient-to-br from-secondary/40 to-background/80 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8 md:p-12 flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Ready to Optimize Your Global Finances?
              </h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl">
                Join thousands of users who are making informed financial decisions across borders
              </p>
              <SignedIn>
                <div className="flex items-center space-x-4 justify-center">
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Link href="/calculator">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full hover:bg-primary/10 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Explore Calculators
                    </Button>
                  </Link>
                </div>
              </SignedIn>
              <SignedOut>
                <Link href="/auth">
                  <Button
                    size="lg"
                    className="rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Create Free Account
                  </Button>
                </Link>
              </SignedOut>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
