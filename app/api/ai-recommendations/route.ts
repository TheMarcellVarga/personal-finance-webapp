import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs/server';
import clientPromise from '@/lib/db';

// Mock auth function that returns a fixed user ID
const mockAuth = async () => ({ userId: 'user_mock123' });

// Types for recommendation response
interface RecommendationResponse {
  recommendations: Recommendation[];
  summary: string;
}

interface Recommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  potentialSavings: number | null;
  type: 'saving' | 'investing' | 'budgeting' | 'tax';
  priority: 'high' | 'medium' | 'low';
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await mockAuth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get search parameters
    const searchParams = request.nextUrl.searchParams;
    const timeRange = searchParams.get('timeRange') || '30days';
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('personal-finance');
    
    // Get user's expenses
    const expenses = await db
      .collection('expenses')
      .find({ userId })
      .sort({ date: -1 })
      .toArray();
      
    if (!expenses.length) {
      return NextResponse.json({
        recommendations: [],
        summary: "We don't have enough data to make personalized recommendations yet. Add your expenses to get tailored financial advice."
      });
    }
    
    // Calculate date range filter
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (timeRange) {
      case '7days':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case '90days':
        cutoffDate.setDate(now.getDate() - 90);
        break;
      case 'year':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      default: // 30days
        cutoffDate.setDate(now.getDate() - 30);
    }
    
    // Filter expenses by date range
    const filteredExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= cutoffDate && expenseDate <= now;
    });
    
    // Calculate expense metrics
    const expensesByCategory: Record<string, number> = {};
    filteredExpenses.forEach(expense => {
      const category = expense.category;
      if (!expensesByCategory[category]) {
        expensesByCategory[category] = 0;
      }
      expensesByCategory[category] += expense.amount;
    });
    
    const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);
    
    // Sort categories by amount spent (descending)
    const sortedCategories = Object.entries(expensesByCategory)
      .sort(([, a], [, b]) => b - a)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: (amount / totalExpenses) * 100
      }));
    
    // Generate AI-powered recommendations based on spending patterns
    // This would ideally call a proper AI service, but we'll use heuristics for now
    const recommendations = generateRecommendations(sortedCategories, filteredExpenses);
    
    return NextResponse.json({
      recommendations,
      summary: generateSummary(sortedCategories, totalExpenses)
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Generate recommendations based on spending patterns
function generateRecommendations(
  categoryData: { category: string; amount: number; percentage: number }[],
  expenses: any[]
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  // If no expenses, return empty array
  if (!categoryData.length) {
    return recommendations;
  }
  
  // Recommendation: High spending categories
  const highSpendingCategories = categoryData.filter(cat => cat.percentage > 20);
  highSpendingCategories.forEach(category => {
    recommendations.push({
      id: `budget-${category.category.toLowerCase()}-${Date.now()}`,
      category: category.category,
      title: `Consider budgeting your ${category.category.toLowerCase()} expenses`,
      description: `You're spending ${category.percentage.toFixed(1)}% of your total expenses on ${category.category.toLowerCase()}. Consider setting a budget to reduce this by 15-20%.`,
      potentialSavings: category.amount * 0.15,
      type: 'budgeting',
      priority: category.percentage > 30 ? 'high' : 'medium'
    });
  });
  
  // Recommendation: Tax-deductible expenses
  const taxDeductibleCategories = ['Charitable Donations', 'Business', 'Medical', 'Education'];
  const hasDeductibleExpenses = expenses.some(expense => 
    taxDeductibleCategories.includes(expense.category)
  );
  
  if (hasDeductibleExpenses) {
    recommendations.push({
      id: `tax-deduction-${Date.now()}`,
      category: 'Tax',
      title: 'Maximize your tax deductions',
      description: 'You have expenses that might be tax-deductible. Make sure you keep all receipts and documentation for your tax filing.',
      potentialSavings: null,
      type: 'tax',
      priority: 'high'
    });
  }
  
  // Recommendation: Savings opportunity
  if (categoryData.some(cat => cat.category === 'Entertainment' && cat.percentage > 10)) {
    recommendations.push({
      id: `saving-entertainment-${Date.now()}`,
      category: 'Entertainment',
      title: 'Reduce entertainment spending',
      description: 'Your entertainment expenses are relatively high. Consider free or lower-cost alternatives for some activities.',
      potentialSavings: categoryData.find(cat => cat.category === 'Entertainment')!.amount * 0.3,
      type: 'saving',
      priority: 'medium'
    });
  }
  
  // Recommendation: Investing
  if (expenses.length > 10) {
    recommendations.push({
      id: `investing-${Date.now()}`,
      category: 'Investing',
      title: 'Start or increase retirement contributions',
      description: 'Based on your spending patterns, consider allocating 10-15% of your income to retirement accounts for long-term financial security.',
      potentialSavings: null,
      type: 'investing',
      priority: 'medium'
    });
  }
  
  // Recommendation: Consistent small expenses
  const smallFrequentExpenses = expenses
    .filter(expense => expense.amount < 20)
    .length;
    
  if (smallFrequentExpenses > 5) {
    recommendations.push({
      id: `small-expenses-${Date.now()}`,
      category: 'Budgeting',
      title: 'Watch your small, frequent purchases',
      description: 'You have several small purchases that can add up. Track these carefully to see if there are opportunities to reduce them.',
      potentialSavings: smallFrequentExpenses * 10,
      type: 'budgeting',
      priority: 'low'
    });
  }
  
  return recommendations;
}

// Generate an overall financial summary
function generateSummary(
  categoryData: { category: string; amount: number; percentage: number }[],
  totalExpenses: number
): string {
  if (!categoryData.length) {
    return "We don't have enough data to generate a summary yet.";
  }
  
  const topCategory = categoryData[0];
  
  return `Your largest expense category is ${topCategory.category} (${topCategory.percentage.toFixed(1)}% of total). ${
    topCategory.percentage > 30 
      ? 'This is significantly higher than recommended. Consider ways to reduce these expenses.' 
      : 'This appears reasonable, but continue monitoring your spending patterns.'
  } Your overall spending patterns suggest ${
    categoryData.length > 5 
      ? 'a diverse range of expenses' 
      : 'expenses concentrated in a few categories'
  }. Focus on creating a balanced budget that includes savings goals.`;
} 