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
      {/* Hero Section with Globe Focus */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Globe positioning - made more prominent */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-70 pointer-events-none">
          <WireframeGlobe />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl sm:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/50 to-primary animate-in fade-in slide-in-from-bottom-10 duration-1000 leading-tight">
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
                    className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Start Calculating
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full hover:bg-primary/10 transition-all duration-300 hover:-translate-y-0.5"
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
                  className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Try Calculator
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

      {/* How It Works Section - Moved up */}
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
                  "Choose your country of interest on our interactive 3D globe",
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
                title: "Get Instant Comparisons",
                description:
                  "See detailed tax calculations and compare with other countries",
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
                  "Explore tax systems visually across different countries through our immersive 3D visualization",
              },
              {
                icon: <Calculator className="h-8 w-8 text-primary" />,
                title: "Real-time Calculations",
                description:
                  "Get instant tax calculations with support for multiple currencies and income types",
              },
              {
                icon: <ArrowLeftRight className="h-8 w-8 text-primary" />,
                title: "Country Comparison",
                description:
                  "Compare tax rates and systems side-by-side between multiple countries",
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

      {/* Dashboard Section - Moved down and de-emphasized */}
      <section className="w-full py-12 md:py-24 lg:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Additional Tools</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Enhance your experience with our dashboard to track financial metrics across borders
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="mx-auto w-full max-w-[600px] rounded-lg border bg-white p-2 shadow-lg order-2 lg:order-1">
              <Image 
                src="/dashboard-preview.svg" 
                alt="Dashboard Preview" 
                width={600}
                height={350}
                className="rounded shadow-sm"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Save Calculations</h3>
                    <p className="text-gray-500">
                      Store and revisit your tax calculations for different countries and scenarios.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Track Changes</h3>
                    <p className="text-gray-500">
                      Monitor tax policy changes in countries of interest and see how they affect your finances.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Export Reports</h3>
                    <p className="text-gray-500">
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
        <div className="container mx-auto px-6">
          <Card className="border border-primary/20 bg-gradient-to-br from-secondary/40 to-background/80 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8 md:p-12 flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Ready to Compare Global Tax Systems?
              </h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl">
                Start calculating and visualizing tax differences across countries
              </p>
              <SignedIn>
                <div className="flex items-center space-x-4 justify-center">
                  <Link href="/calculator">
                    <Button
                      size="lg"
                      className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Launch Calculator
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full hover:bg-primary/10 transition-all duration-300 hover:-translate-y-0.5"
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
                    className="rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5"
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
