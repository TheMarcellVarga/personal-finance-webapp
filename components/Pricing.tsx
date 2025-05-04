"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PRICING_PLANS } from '@/lib/stripe';
import { Check } from 'lucide-react';
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

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that best fits your needs
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <Card key={plan.name} className="flex flex-col p-8">
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="mt-4 text-gray-600">{plan.description}</p>
              <div className="mt-8">
                <span className="text-4xl font-bold">${plan.price}</span>
                {plan.price > 0 && <span className="text-gray-600">/month</span>}
              </div>
              <ul className="mt-8 space-y-4 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-8"
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