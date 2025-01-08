"use client";

import Link from "next/link";
import { Calculator, Globe, ArrowLeftRight, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { Step } from "@/components/ui/step";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background">
      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-grid-white/[0.02] bg-grid-pattern" />
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6 text-center relative z-10"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                Global Tax Intelligence
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground mb-8"
            >
              Navigate worldwide tax systems with our interactive 3D visualization
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <SignedIn>
                <Link href="/calculator">
                  <Button size="lg" className="rounded-full bg-primary hover:bg-primary/80 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25">
                    Continue Exploring
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/auth">
                  <Button size="lg" className="rounded-full bg-primary hover:bg-primary/80 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25">
                    Start Exploring
                  </Button>
                </Link>
              </SignedOut>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-12 flex items-center justify-center gap-2 text-muted-foreground"
            >
              <MousePointer2 className="h-4 w-4 animate-bounce" />
              <span>Scroll to explore more</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-6"
        >
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
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 relative"
        >
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
        </motion.div>
      </section>
    </div>
  );
}
