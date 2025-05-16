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

  const planDetails = {
    'Explorer': {
      icon: <Globe className="h-12 w-12 text-blue-500" />,
      gradient: "from-blue-50/30 to-indigo-50/30",
      darkGradient: "dark:from-blue-900/20 dark:to-indigo-900/20",
      titleColor: "text-blue-700 dark:text-blue-300",
    },
    'Global Pro': {
      icon: <Calculator className="h-12 w-12 text-indigo-500" />,
      gradient: "from-indigo-50/30 to-purple-50/30",
      darkGradient: "dark:from-indigo-900/20 dark:to-purple-900/20",
      titleColor: "text-indigo-700 dark:text-indigo-300",
    },
    'Tax Advisor': {
      icon: <BarChart3 className="h-12 w-12 text-purple-500" />,
      gradient: "from-purple-50/30 to-pink-50/30",
      darkGradient: "dark:from-purple-900/20 dark:to-pink-900/20",
      titleColor: "text-purple-700 dark:text-purple-300",
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Compare Tax Systems Worldwide
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Choose the plan that best fits your global financial needs
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => {
            const details = planDetails[plan.name as keyof typeof planDetails];
            return (
              <Card 
                key={plan.name} 
                className={`flex flex-col p-8 border border-indigo-200/30 dark:border-indigo-700/30 bg-gradient-to-br ${details.gradient} ${details.darkGradient} 
                ${plan.name === 'Global Pro' ? 'shadow-lg hover:shadow-xl' : 'shadow-md'} 
                transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="mb-4 p-3 rounded-full bg-white/70 dark:bg-gray-800/70 shadow-md w-fit">
                  {details.icon}
                </div>
                <h3 className={`text-2xl font-semibold ${details.titleColor}`}>{plan.name}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{plan.description}</p>
                <div className="mt-6">
                  <span className={`text-4xl font-bold ${details.titleColor}`}>${plan.price}</span>
                  {plan.price > 0 && <span className="text-gray-600 dark:text-gray-400">/month</span>}
                </div>
                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-1 mr-2">
                        <Check className={`h-4 w-4 ${details.titleColor}`} />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`mt-8 ${
                    plan.name === 'Global Pro' 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/20 dark:from-indigo-500 dark:to-purple-500' 
                      : plan.name === 'Tax Advisor'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/20 dark:from-purple-500 dark:to-pink-500'
                      : 'border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50/10 dark:hover:bg-indigo-900/30'
                  }`}
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
            );
          })}
        </div>
      </div>
    </div>
  );
} 