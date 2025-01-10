"use client";

import Link from "next/link";
import { Calculator, Globe, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { FeatureCard } from "@/components/ui/feature-card";
// import { Step } from "@/components/ui/step";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import the Globe component to avoid SSR issues
const WireframeGlobe = dynamic(() => import("@/components/WireframeGlobe"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background">
      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Updated container size and positioning */}
        <div className="absolute -right-20 top-1/2 -translate-y-2/3 w-[800px] h-[800px] opacity-50 pointer-events-none rotate-12">
          <WireframeGlobe />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/50 to-primary animate-in fade-in slide-in-from-bottom-10 duration-1000 leading-tight">
            Global Tax Intelligence
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            Navigate worldwide tax systems with our interactive 3D visualization
          </p>
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <SignedIn>
              <Link href="/calculator">
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Continue Exploring
                </Button>
              </Link>
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
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/grid-pattern.png"
            alt="Grid Pattern"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="h-6 w-6 text-primary" />,
                title: "Interactive 3D Globe",
                description:
                  "Explore tax systems across different countries through an immersive visualization",
              },
              {
                icon: <Calculator className="h-6 w-6 text-primary" />,
                title: "Real-time Calculations",
                description:
                  "Get instant tax calculations with support for multiple currencies",
              },
              {
                icon: <ArrowLeftRight className="h-6 w-6 text-primary" />,
                title: "Country Comparison",
                description:
                  "Compare tax rates and systems between different countries",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-secondary/40 backdrop-blur-sm border border-primary/10 hover:bg-secondary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative bg-secondary/10">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Select a Country",
                description:
                  "Choose your country of interest on our interactive globe",
                image: "/images/select-country.png",
              },
              {
                number: "2",
                title: "Enter Income Details",
                description: "Input your income and personal details",
                image: "/images/income-details.png",
              },
              {
                number: "3",
                title: "Get Insights",
                description:
                  "Receive detailed tax calculations and comparisons",
                image: "/images/insights.png",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/10 hover:bg-background/70 transition-all duration-300 group"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                <div className="mb-6 h-48 relative">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
