import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
// import { auth } from '@clerk/nextjs/server';

// Example expense data
// In a real app, this would come from a database
const sampleExpenses = [
  { id: "1", amount: 85.42, category: "Food", date: "2023-05-15", description: "Grocery shopping" },
  { id: "2", amount: 49.99, category: "Business", date: "2023-05-12", description: "Software subscription" },
  { id: "3", amount: 100, category: "Charitable Donations", date: "2023-05-10", description: "Monthly donation" },
  { id: "4", amount: 1200, category: "Housing", date: "2023-05-01", description: "Rent payment" },
  { id: "5", amount: 65.20, category: "Transportation", date: "2023-05-08", description: "Gas refill" },
  { id: "6", amount: 120, category: "Utilities", date: "2023-05-05", description: "Electricity bill" },
  { id: "7", amount: 80, category: "Healthcare", date: "2023-05-16", description: "Pharmacy" },
  { id: "8", amount: 45, category: "Entertainment", date: "2023-05-20", description: "Movie tickets" },
  { id: "9", amount: 35.50, category: "Food", date: "2023-04-25", description: "Restaurant" },
  { id: "10", amount: 299.99, category: "Shopping", date: "2023-04-18", description: "New shoes" },
  { id: "11", amount: 9.99, category: "Entertainment", date: "2023-04-15", description: "Music subscription" },
  { id: "12", amount: 1200, category: "Housing", date: "2023-04-01", description: "Rent payment" },
  { id: "13", amount: 60, category: "Transportation", date: "2023-04-10", description: "Uber rides" },
  { id: "14", amount: 150, category: "Utilities", date: "2023-04-12", description: "Internet and phone" },
  { id: "15", amount: 200, category: "Education", date: "2023-04-05", description: "Online course" },
  { id: "16", amount: 40, category: "Food", date: "2023-03-28", description: "Takeout" },
  { id: "17", amount: 75, category: "Healthcare", date: "2023-03-15", description: "Copay" },
  { id: "18", amount: 1200, category: "Housing", date: "2023-03-01", description: "Rent payment" },
  { id: "19", amount: 22.99, category: "Entertainment", date: "2023-03-18", description: "Book purchase" },
  { id: "20", amount: 50, category: "Gifts", date: "2023-03-25", description: "Birthday gift" }
];

// Mock auth function that returns a fixed user ID
const mockAuth = async () => ({ userId: 'user_mock123' });

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real app, you would fetch data from a database
  // and handle authentication to return user-specific data
  
  try {
    return NextResponse.json(sampleExpenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await mockAuth();
    
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