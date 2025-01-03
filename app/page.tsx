"use client";

import Link from "next/link";
import { Calculator, Globe, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { Step } from "@/components/ui/step";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">
            Global Tax Intelligence
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Navigate worldwide tax systems with our interactive 3D visualization
          </p>
          <Link href="/calculator">
            <Button size="lg" className="rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Globe className="h-6 w-6 text-primary" />}
              title="Interactive 3D Globe"
              description="Explore tax systems across different countries through an immersive visualization"
            />
            <FeatureCard
              icon={<Calculator className="h-6 w-6 text-primary" />}
              title="Real-time Calculations"
              description="Get instant tax calculations with support for multiple currencies"
            />
            <FeatureCard
              icon={<ArrowLeftRight className="h-6 w-6 text-primary" />}
              title="Country Comparison"
              description="Compare tax rates and systems between different countries"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Step
              number="1"
              title="Select a Country"
              description="Choose your country of interest on our interactive globe"
            />
            <Step
              number="2"
              title="Enter Income Details"
              description="Input your income and personal details"
            />
            <Step
              number="3"
              title="Get Insights"
              description="Receive detailed tax calculations and comparisons"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
