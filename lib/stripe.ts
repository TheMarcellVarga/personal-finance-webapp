import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing. Please set it in your environment variables.');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
});

export const PLANS = {
  FREE: 'free',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
} as const;

export const PRICING_PLANS = [
  {
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    features: [
      'Basic expense tracking',
      'Monthly reports',
      'Up to 100 transactions',
    ],
    stripePriceId: '',
    planType: PLANS.FREE,
  },
  {
    name: 'Pro',
    description: 'For serious personal finance management',
    price: 9.99,
    features: [
      'Everything in Free',
      'Unlimited transactions',
      'Advanced analytics',
      'Custom categories',
      'Data export',
    ],
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || '',
    planType: PLANS.PRO,
  },
  {
    name: 'Enterprise',
    description: 'For families and small businesses',
    price: 29.99,
    features: [
      'Everything in Pro',
      'Multiple users',
      'Team collaboration',
      'Priority support',
      'Custom reporting',
    ],
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || '',
    planType: PLANS.ENTERPRISE,
  },
] as const; 