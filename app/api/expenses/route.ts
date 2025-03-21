import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const client = await clientPromise;
    const db = client.db('personal-finance');
    
    const expenses = await db
      .collection('expenses')
      .find({ userId })
      .sort({ date: -1 })
      .toArray();
    
    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { amount, category, description, date } = body;
    
    if (!amount || !category || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db('personal-finance');
    
    const expense = {
      userId,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(date),
      createdAt: new Date()
    };
    
    const result = await db.collection('expenses').insertOne(expense);
    
    return NextResponse.json({ 
      id: result.insertedId,
      success: true 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 