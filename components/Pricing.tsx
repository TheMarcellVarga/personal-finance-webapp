"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PRICING_PLANS } from '@/lib/stripe';
import { Check, Globe, Calculator, BarChart3 } from 'lucide-react';
// import { useUser } from '@clerk/nextjs';
import { useUser } from '@/lib/mock-clerk';

export function Pricing() {
  const { isSignedIn } = useUser();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    try {
      setIsLoading(priceId);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const planIcons = {
    'Explorer': <Globe className="h-12 w-12 text-primary/60" />,
    'Global Pro': <Calculator className="h-12 w-12 text-primary/80" />,
    'Tax Advisor': <BarChart3 className="h-12 w-12 text-primary" />
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Compare Tax Systems Worldwide
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that best fits your global financial needs
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <Card key={plan.name} className={`flex flex-col p-8 border ${
              plan.name === 'Global Pro' 
                ? 'border-primary/20 bg-primary/5 shadow-lg hover:shadow-xl' 
                : 'border-primary/10 hover:border-primary/30'
              } transition-all duration-300 hover:-translate-y-1`}>
              <div className="mb-4">
                {planIcons[plan.name as keyof typeof planIcons]}
              </div>
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="mt-2 text-gray-600">{plan.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                {plan.price > 0 && <span className="text-gray-600">/month</span>}
              </div>
              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`mt-8 ${plan.name === 'Global Pro' ? 'bg-primary hover:bg-primary/90' : ''}`}
                size="lg"
                variant={plan.planType === 'free' ? 'outline' : 'default'}
                disabled={!isSignedIn || isLoading === plan.stripePriceId}
                onClick={() => plan.stripePriceId && handleSubscribe(plan.stripePriceId)}
              >
                {isLoading === plan.stripePriceId ? (
                  'Processing...'
                ) : plan.planType === 'free' ? (
                  'Get Started'
                ) : (
                  `Subscribe to ${plan.name}`
                )}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 