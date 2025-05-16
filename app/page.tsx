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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/30 via-background to-background dark:from-indigo-950/30 dark:via-background dark:to-background">
      {/* Hero Section with Globe Focus */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        
        {/* Globe positioning - made more prominent */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-70 pointer-events-none">
          <WireframeGlobe />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl sm:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 animate-in fade-in slide-in-from-bottom-10 duration-1000 leading-tight">
            Global Tax Calculator
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            Compare tax systems worldwide with our interactive 3D globe visualization and make informed financial decisions across borders
          </p>
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <SignedIn>
              <div className="flex items-center space-x-4 justify-center">
                <Link href="/calculator">
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Start Calculating
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-indigo-200 dark:border-indigo-400/30 dark:text-indigo-200 hover:bg-indigo-50/10 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </SignedIn>
            <SignedOut>
              <Link href="/calculator">
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Try Calculator
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-indigo-500/50 dark:border-indigo-400/50 flex justify-center">
            <div className="w-1.5 h-3 bg-indigo-500/50 dark:bg-indigo-400/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Moved up */}
      <section className="py-20 relative bg-gradient-to-b from-indigo-50/20 to-background dark:from-indigo-950/10 dark:to-background">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[top_1rem_right_1rem] dark:bg-grid-slate-400/[0.05] dark:bg-[top_1rem_right_1rem] pointer-events-none"></div>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Select a Country",
                description:
                  "Choose your country of interest on our interactive 3D globe",
                icon: <MapPin className="h-16 w-16 text-indigo-500 dark:text-indigo-400" />,
                gradient: "from-blue-500/20 to-indigo-500/20 dark:from-blue-600/10 dark:to-indigo-600/10"
              },
              {
                number: "2",
                title: "Enter Income Details",
                description: "Input your income and personal details",
                icon: <Coins className="h-16 w-16 text-purple-500 dark:text-purple-400" />,
                gradient: "from-indigo-500/20 to-purple-500/20 dark:from-indigo-600/10 dark:to-purple-600/10"
              },
              {
                number: "3",
                title: "Get Instant Comparisons",
                description:
                  "See detailed tax calculations and compare with other countries",
                icon: <BarChart3 className="h-16 w-16 text-pink-500 dark:text-pink-400" />,
                gradient: "from-purple-500/20 to-pink-500/20 dark:from-purple-600/10 dark:to-pink-600/10"
              },
            ].map((step, index) => (
              <Card 
                key={index}
                className={`relative border border-indigo-200/30 dark:border-indigo-500/20 bg-gradient-to-br ${step.gradient} backdrop-blur-sm hover:bg-indigo-50/10 transition-all duration-300 group`}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 z-10">
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

      {/* Features Section */}
      <section className="py-20 relative bg-gradient-to-b from-background to-purple-50/10 dark:to-purple-950/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="h-8 w-8 text-blue-500 dark:text-blue-400" />,
                title: "Interactive 3D Globe",
                description:
                  "Explore tax systems visually across different countries through our immersive 3D visualization",
                gradient: "from-blue-500/10 to-indigo-500/10 dark:from-blue-600/5 dark:to-indigo-600/5"
              },
              {
                icon: <Calculator className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />,
                title: "Real-time Calculations",
                description:
                  "Get instant tax calculations with support for multiple currencies and income types",
                gradient: "from-indigo-500/10 to-purple-500/10 dark:from-indigo-600/5 dark:to-purple-600/5"
              },
              {
                icon: <ArrowLeftRight className="h-8 w-8 text-purple-500 dark:text-purple-400" />,
                title: "Country Comparison",
                description:
                  "Compare tax rates and systems side-by-side between multiple countries",
                gradient: "from-purple-500/10 to-pink-500/10 dark:from-purple-600/5 dark:to-pink-600/5"
              },
            ].map((feature, index) => (
              <Card 
                key={index}
                className={`group border border-indigo-200/30 dark:border-indigo-500/20 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1`}
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-white/50 dark:bg-white/10 shadow-md group-hover:shadow-lg group-hover:bg-white dark:group-hover:bg-white/20 transition-all duration-300">
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

      {/* Dashboard Section */}
      <section className="w-full py-12 md:py-24 lg:py-24 bg-gradient-to-b from-purple-50/10 to-indigo-50/10 dark:from-purple-950/10 dark:to-indigo-950/10">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Additional Tools</h2>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Enhance your experience with our dashboard to track financial metrics across borders
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="mx-auto w-full max-w-[600px] rounded-lg border border-indigo-200/50 dark:border-indigo-500/30 bg-white dark:bg-gray-800/50 p-2 shadow-lg order-2 lg:order-1">
              <Image 
                src="/dashboard-preview.svg" 
                alt="Dashboard Preview" 
                width={600}
                height={350}
                className="rounded shadow-sm dark:filter dark:brightness-90"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">Save Calculations</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Store and revisit your tax calculations for different countries and scenarios.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">Track Changes</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Monitor tax policy changes in countries of interest and see how they affect your finances.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">Export Reports</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Generate detailed PDF reports of tax comparisons to share with advisors.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 dark:bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6">
          <Card className="border border-indigo-200/30 dark:border-indigo-500/20 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 dark:from-indigo-900/10 dark:to-purple-900/10 backdrop-blur-sm overflow-hidden">
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <CardContent className="p-8 md:p-12 flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400">
                Ready to Compare Global Tax Systems?
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                Start calculating and visualizing tax differences across countries
              </p>
              <SignedIn>
                <div className="flex items-center space-x-4 justify-center">
                  <Link href="/calculator">
                    <Button
                      size="lg"
                      className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Launch Calculator
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full border-indigo-200 dark:border-indigo-400/30 dark:text-indigo-200 hover:bg-indigo-50/10 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      View Dashboard
                    </Button>
                  </Link>
                </div>
              </SignedIn>
              <SignedOut>
                <Link href="/calculator">
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Try it Free
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
