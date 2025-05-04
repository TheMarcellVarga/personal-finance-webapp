import { stripe } from '@/lib/stripe';
// import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Mock auth function that returns a fixed user ID
const mockAuth = async () => ({ userId: 'user_mock123' });

export async function POST(req: Request) {
  try {
    const { userId } = await mockAuth();
    const { priceId } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!priceId) {
      return new NextResponse('Price ID is required', { status: 400 });
    }

    // This uses our mock implementation from lib/stripe.ts
    // We're ignoring the parameters since the mock doesn't use them
    const session = await stripe.checkout.sessions.create();

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[STRIPE_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 