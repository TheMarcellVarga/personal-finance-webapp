// This file has been modified to work without a real Stripe API key
// import Stripe from 'stripe';

// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error('STRIPE_SECRET_KEY is missing. Please set it in your environment variables.');
// }

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2025-02-24.acacia',
//   typescript: true,
// });

// Mock Stripe implementation for development
export const stripe = {
  checkout: {
    sessions: {
      create: async () => ({
        url: 'https://example.com/mock-checkout',
      }),
    },
  },
  webhooks: {
    constructEvent: () => ({
      type: 'mock.event',
      data: { object: {} },
    }),
  },
};

export const PLANS = {
  FREE: 'free',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
} as const;

export const PRICING_PLANS = [
  {
    name: 'Explorer',
    description: 'Perfect for initial tax comparisons',
    price: 0,
    features: [
      'Basic tax calculations',
      'Compare up to 3 countries',
      'Standard visualization',
      'Monthly tax updates',
    ],
    stripePriceId: '',
    planType: PLANS.FREE,
  },
  {
    name: 'Global Pro',
    description: 'For serious tax planning',
    price: 9.99,
    features: [
      'Advanced tax calculations',
      'Unlimited country comparisons',
      'Interactive 3D globe',
      'Save calculations',
      'Export tax reports',
      'Tax optimization suggestions',
    ],
    stripePriceId: 'mock_pro_price_id',
    planType: PLANS.PRO,
  },
  {
    name: 'Tax Advisor',
    description: 'For financial professionals',
    price: 29.99,
    features: [
      'Everything in Global Pro',
      'Client management',
      'Tax policy change alerts',
      'White-label reports',
      'API access',
      'Priority support',
    ],
    stripePriceId: 'mock_enterprise_price_id',
    planType: PLANS.ENTERPRISE,
  },
] as const; 