import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    // Handle successful payment
    // Retrieve subscription but don't store in variable since it's unused
    await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      return new NextResponse('User id is required', { status: 400 });
    }

    // Here you would typically update your database with the user's subscription status
    // For example:
    // await db.user.update({
    //   where: { id: session.metadata.userId },
    //   data: { 
    //     stripeSubscriptionId: subscription.id,
    //     stripePriceId: subscription.items.data[0].price.id,
    //     stripeCustomerId: subscription.customer as string,
    //   }
    // });
  }

  if (event.type === 'invoice.payment_succeeded') {
    // Handle successful subscription renewal
    // You might want to update the user's subscription status or send a notification
  }

  if (event.type === 'customer.subscription.deleted') {
    // Handle subscription cancellation
    // Update the user's subscription status in your database
  }

  return new NextResponse(null, { status: 200 });
} 