"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Edit2, Save, X, Trash2 } from "lucide-react";
import { useTaxStore } from "@/store/taxStore";
import { getCountryCurrency } from "@/utils/currencyMappings";

interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  spent: number;
}

export default function BudgetManager() {
  const { selectedCountry } = useTaxStore();
  const countryCode = selectedCountry || "US";
  const currency = getCountryCurrency(countryCode) || "USD";
  
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState("");
  const [editAmount, setEditAmount] = useState("");
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Load budgets and expenses
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, this would be an API call
        // For demo purposes, we're using mock data
        
        // Mock budget data
        const mockBudgets = [
          { id: "1", category: "Housing", amount: 1500, spent: 1200 },
          { id: "2", category: "Food", amount: 500, spent: 420 },
          { id: "3", category: "Transportation", amount: 300, spent: 275 },
          { id: "4", category: "Entertainment", amount: 200, spent: 180 },
          { id: "5", category: "Healthcare", amount: 250, spent: 150 },
          { id: "6", category: "Utilities", amount: 300, spent: 290 },
        ];
        
        // Simulate API delay
        await new Promise(r => setTimeout(r, 800));
        
        setBudgets(mockBudgets);
      } catch (err) {
        console.error("Error loading budget data:", err);
        setError("Failed to load budget data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Add new budget
  const handleAddBudget = () => {
    if (!newCategory.trim() || !newAmount.trim()) {
      alert("Please enter both category and amount");
      return;
    }
    
    const amount = parseFloat(newAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    const newBudget: BudgetItem = {
      id: Date.now().toString(),
      category: newCategory,
      amount,
      spent: 0,
    };
    
    setBudgets([...budgets, newBudget]);
    setNewCategory("");
    setNewAmount("");
  };
  
  // Start editing a budget
  const startEdit = (budget: BudgetItem) => {
    setEditingId(budget.id);
    setEditCategory(budget.category);
    setEditAmount(budget.amount.toString());
  };
  
  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
  };
  
  // Save budget edit
  const saveEdit = (id: string) => {
    if (!editCategory.trim() || !editAmount.trim()) {
      alert("Please enter both category and amount");
      return;
    }
    
    const amount = parseFloat(editAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    setBudgets(budgets.map(budget => 
      budget.id === id 
        ? { ...budget, category: editCategory, amount } 
        : budget
    ));
    
    setEditingId(null);
  };
  
  // Delete a budget
  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };
  
  // Calculate totals
  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-muted-foreground">Total Budgeted</h3>
              <p className="text-3xl font-bold">{formatCurrency(totalBudgeted)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-muted-foreground">Total Spent</h3>
              <p className="text-3xl font-bold">{formatCurrency(totalSpent)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-muted-foreground">Remaining</h3>
              <p className={`text-3xl font-bold ${totalRemaining < 0 ? "text-red-500" : "text-green-500"}`}>
                {formatCurrency(totalRemaining)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading budget data...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Category (e.g., Housing, Food)"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Monthly Amount"
                  type="number"
                  min="0"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddBudget} className="whitespace-nowrap">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Budget
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Budgets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgets.length === 0 ? (
                  <p className="text-center text-muted-foreground py-6">
                    No budgets added yet. Add your first budget above.
                  </p>
                ) : (
                  budgets.map((budget) => (
                    <div key={budget.id} className="border rounded-lg p-4">
                      {editingId === budget.id ? (
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Input
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            min="0"
                            value={editAmount}
                            onChange={(e) => setEditAmount(e.target.value)}
                            className="flex-1"
                          />
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => saveEdit(budget.id)}
                              className="w-10 h-10 p-0"
                            >
                              <Save size={16} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={cancelEdit}
                              className="w-10 h-10 p-0"
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">{budget.category}</h3>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => startEdit(budget)}
                                className="w-8 h-8 p-0"
                              >
                                <Edit2 size={14} />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => deleteBudget(budget.id)}
                                className="w-8 h-8 p-0 text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-sm text-muted-foreground mb-1">
                            <span>Spent: {formatCurrency(budget.spent)}</span>
                            <span>Budgeted: {formatCurrency(budget.amount)}</span>
                          </div>
                          
                          <Progress 
                            value={(budget.spent / budget.amount) * 100}
                            className={`h-2 ${budget.spent > budget.amount ? "bg-red-200" : ""}`}
                            indicatorClassName={budget.spent > budget.amount ? "bg-red-500" : undefined}
                          />
                          
                          <div className="flex justify-between mt-2">
                            <span className={`text-sm font-medium ${budget.spent > budget.amount ? "text-red-500" : ""}`}>
                              {((budget.spent / budget.amount) * 100).toFixed(0)}% spent
                            </span>
                            <span className={`text-sm font-medium ${budget.spent > budget.amount ? "text-red-500" : "text-green-500"}`}>
                              {budget.spent > budget.amount ? "Over by " : "Remaining: "}
                              {formatCurrency(Math.abs(budget.amount - budget.spent))}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
} 