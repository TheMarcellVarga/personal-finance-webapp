"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaxStore } from "@/store/taxStore";
import { useCountries } from "@/hooks/useCountries";
import { getCountryCurrency } from "@/utils/currencyMappings";
import { 
  Receipt, 
  PieChart, 
  BadgeDollarSign, 
  PiggyBank, 
  Plus, 
  Calendar, 
  CreditCard, 
  Tag, 
  FileText,
  Check,
  X
} from "lucide-react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  potentiallyDeductible: boolean;
}

// Simplified tax deduction categories by country
// In a real app, this would be much more detailed and maintained by tax professionals
const taxDeductibleCategories = {
  US: ["Medical", "Mortgage Interest", "Charitable Donations", "Education", "Business", "Retirement Contributions"],
  UK: ["Business", "Charitable Donations", "Property Investment", "Pension Contributions"],
  DE: ["Business", "Insurance", "Education", "Charitable Donations"],
  default: ["Business", "Charitable Donations"]
};

export default function ExpenseTracker() {
  const { selectedCountry } = useTaxStore();
  const countryCode = selectedCountry || "US";
  const countries = useCountries();
  
  // Get country-specific currency
  const currency = getCountryCurrency(countryCode) || "USD";
  
  // Get tax-deductible categories for the selected country
  const deductibleCategories = taxDeductibleCategories[countryCode as keyof typeof taxDeductibleCategories] || 
                              taxDeductibleCategories.default;
  
  // Expense state
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      description: "Grocery shopping",
      amount: 85.42,
      date: "2023-05-15",
      category: "Food",
      paymentMethod: "Credit Card",
      potentiallyDeductible: false
    },
    {
      id: "2",
      description: "Professional software subscription",
      amount: 49.99,
      date: "2023-05-12",
      category: "Business",
      paymentMethod: "Credit Card",
      potentiallyDeductible: true
    },
    {
      id: "3",
      description: "Donation to charity",
      amount: 100,
      date: "2023-05-10",
      category: "Charitable Donations",
      paymentMethod: "Bank Transfer",
      potentiallyDeductible: true
    }
  ]);
  
  // New expense form state
  const [newExpense, setNewExpense] = useState<Omit<Expense, "id" | "potentiallyDeductible">>({
    description: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
    category: "Other",
    paymentMethod: "Credit Card",
  });
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  
  // Check if a category is tax-deductible
  const isCategoryDeductible = (category: string) => {
    return deductibleCategories.includes(category);
  };
  
  // Add new expense
  const handleAddExpense = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const potentiallyDeductible = isCategoryDeductible(newExpense.category);
    
    setExpenses([...expenses, { ...newExpense, id, potentiallyDeductible }]);
    
    // Reset form
    setNewExpense({
      description: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      category: "Other",
      paymentMethod: "Credit Card",
    });
  };
  
  // Delete expense
  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };
  
  // Toggle deductible status
  const toggleDeductible = (id: string) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, potentiallyDeductible: !expense.potentiallyDeductible } : expense
    ));
  };
  
  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  
  // Calculate potential tax deductions
  const potentialDeductions = expenses
    .filter(expense => expense.potentiallyDeductible)
    .reduce((total, expense) => total + expense.amount, 0);
  
  // Get expense categories for grouping
  const expensesByCategory: Record<string, number> = {};
  expenses.forEach(expense => {
    if (expensesByCategory[expense.category]) {
      expensesByCategory[expense.category] += expense.amount;
    } else {
      expensesByCategory[expense.category] = expense.amount;
    }
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <CreditCard className="mx-auto h-8 w-8 text-primary" />
              <h3 className="mt-2 font-medium text-muted-foreground">Total Expenses</h3>
              <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <BadgeDollarSign className="mx-auto h-8 w-8 text-primary" />
              <h3 className="mt-2 font-medium text-muted-foreground">Potential Tax Deductions</h3>
              <p className="text-2xl font-bold">{formatCurrency(potentialDeductions)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <PiggyBank className="mx-auto h-8 w-8 text-primary" />
              <h3 className="mt-2 font-medium text-muted-foreground">Potential Tax Savings</h3>
              <p className="text-2xl font-bold">
                {/* This is a very simplified calculation - real tax savings would depend on tax brackets */}
                {formatCurrency(potentialDeductions * 0.25)} 
                <span className="text-sm text-muted-foreground ml-1">(est.)</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Category breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-primary" />
            <span>Expense Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(expensesByCategory).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isCategoryDeductible(category) ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span>{category}</span>
                  {isCategoryDeductible(category) && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                      Potentially Deductible
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{formatCurrency(amount)}</span>
                  <span className="text-muted-foreground text-sm">
                    ({Math.round((amount / totalExpenses) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Expense list */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            <span>Recent Expenses</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(expense.date).toLocaleDateString()}</span>
                    <Tag className="h-3 w-3 ml-2" />
                    <span>{expense.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-medium text-right">{formatCurrency(expense.amount)}</p>
                  <button 
                    className={`p-1 rounded-full ${expense.potentiallyDeductible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                    onClick={() => toggleDeductible(expense.id)}
                    title={expense.potentiallyDeductible ? "Tax deductible" : "Not tax deductible"}
                  >
                    {expense.potentiallyDeductible ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Add expense form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            <span>Add New Expense</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expenseDesc">Description</Label>
              <Input 
                id="expenseDesc" 
                placeholder="What did you spend on?"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expenseAmount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {currency}
                  </span>
                  <Input 
                    id="expenseAmount" 
                    type="number"
                    step="0.01"
                    className="pl-12"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expenseDate">Date</Label>
                <Input 
                  id="expenseDate" 
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expenseCategory">Category</Label>
                <select 
                  id="expenseCategory"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                >
                  <option value="Food">Food & Dining</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Housing">Housing</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Medical">Medical</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Education">Education</option>
                  <option value="Business">Business</option>
                  <option value="Charitable Donations">Charitable Donations</option>
                  <option value="Mortgage Interest">Mortgage Interest</option>
                  <option value="Retirement Contributions">Retirement Contributions</option>
                  <option value="Other">Other</option>
                </select>
                {isCategoryDeductible(newExpense.category) && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <BadgeDollarSign className="h-3 w-3" />
                    This category may be tax-deductible in {countries.find(c => c.properties.ISO_A2 === countryCode)?.properties.NAME || countryCode}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expensePayment">Payment Method</Label>
                <select 
                  id="expensePayment"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newExpense.paymentMethod}
                  onChange={(e) => setNewExpense({...newExpense, paymentMethod: e.target.value})}
                >
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Mobile Payment">Mobile Payment</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <Button 
              onClick={handleAddExpense}
              className="w-full mt-2"
              disabled={!newExpense.description || newExpense.amount <= 0}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-sm text-muted-foreground">
        <p className="flex items-start gap-2">
          <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <span>
            <strong>Tax deduction note:</strong> The potential tax deductions shown are general guidelines based on common rules 
            in {countries.find(c => c.properties.ISO_A2 === countryCode)?.properties.NAME || countryCode}. Actual deductibility depends on your specific tax situation, 
            applicable limits, and current tax laws. Always consult a tax professional for advice specific to your situation.
          </span>
        </p>
      </div>
    </div>
  );
} 