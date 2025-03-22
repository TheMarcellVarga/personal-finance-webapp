"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTaxStore } from "@/store/taxStore";
import { getCountryCurrency } from "@/utils/currencyMappings";
import { Check, AlertCircle, Info, ArrowRight, FileText, Calculator } from "lucide-react";

interface DeductibleExpense {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  confidence: "high" | "medium" | "low";
}

interface DeductionCategory {
  id: string;
  name: string;
  description: string;
  country: string;
  isCommon: boolean;
  examples: string[];
}

export default function TaxDeductionAssistant() {
  const { selectedCountry } = useTaxStore();
  const countryCode = selectedCountry || "US";
  const currency = getCountryCurrency(countryCode) || "USD";

  const [deductibleExpenses, setDeductibleExpenses] = useState<DeductibleExpense[]>([]);
  const [deductionCategories, setDeductionCategories] = useState<DeductionCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [potentialSavings, setPotentialSavings] = useState<number>(0);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Load deduction data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // In a real app, this would come from an API
        // For demo purposes, using mock data

        // Mock deduction categories data for different countries
        const mockCategories: DeductionCategory[] = [
          {
            id: "1",
            name: "Business Expenses",
            description: "Costs directly related to running your business",
            country: "US",
            isCommon: true,
            examples: [
              "Office supplies",
              "Business travel",
              "Professional services",
              "Software subscriptions"
            ]
          },
          {
            id: "2",
            name: "Charitable Donations",
            description: "Donations to qualified charitable organizations",
            country: "US",
            isCommon: true,
            examples: [
              "Cash donations to registered charities",
              "Donated goods with receipts",
              "Fundraising event tickets (partial value)"
            ]
          },
          {
            id: "3",
            name: "Medical Expenses",
            description: "Qualified medical expenses that exceed 7.5% of your adjusted gross income",
            country: "US",
            isCommon: true,
            examples: [
              "Unreimbursed doctor visits",
              "Prescription medications",
              "Medical equipment",
              "Health insurance premiums (if self-employed)"
            ]
          },
          {
            id: "4",
            name: "Education Expenses",
            description: "Qualified education costs, including tuition and fees",
            country: "US",
            isCommon: false,
            examples: [
              "Tuition and fees",
              "Student loan interest",
              "Education supplies"
            ]
          },
          {
            id: "5",
            name: "Retirement Contributions",
            description: "Contributions to qualified retirement accounts",
            country: "US",
            isCommon: true,
            examples: [
              "Traditional IRA contributions",
              "401(k) contributions",
              "SEP IRA (if self-employed)"
            ]
          },
          {
            id: "6",
            name: "Home Office Deduction",
            description: "Expenses for using part of your home exclusively for business",
            country: "US",
            isCommon: false,
            examples: [
              "Portion of rent or mortgage interest",
              "Utilities for business space",
              "Home office maintenance"
            ]
          }
        ];

        // Filter categories based on selected country
        const filteredCategories = mockCategories.filter(
          cat => cat.country === countryCode
        );

        // Mock deductible expenses
        const mockExpenses: DeductibleExpense[] = [
          {
            id: "1",
            category: "Business Expenses",
            amount: 249.99,
            date: "2023-04-15",
            description: "Adobe Creative Cloud Subscription",
            confidence: "high"
          },
          {
            id: "2",
            category: "Charitable Donations",
            amount: 100,
            date: "2023-03-20",
            description: "Red Cross Donation",
            confidence: "high"
          },
          {
            id: "3",
            category: "Medical Expenses",
            amount: 150,
            date: "2023-05-02",
            description: "Prescription Medications",
            confidence: "medium"
          },
          {
            id: "4",
            category: "Business Expenses",
            amount: 65.94,
            date: "2023-04-10",
            description: "Office Supplies",
            confidence: "high"
          },
          {
            id: "5",
            category: "Education Expenses",
            amount: 399,
            date: "2023-02-15",
            description: "Web Development Course",
            confidence: "medium"
          },
          {
            id: "6",
            category: "Business Expenses",
            amount: 19.99,
            date: "2023-05-01",
            description: "Zoom Subscription",
            confidence: "high"
          },
          {
            id: "7",
            category: "Charitable Donations",
            amount: 50,
            date: "2023-04-29",
            description: "Local Food Bank",
            confidence: "high"
          }
        ];

        // Simulate API delay
        await new Promise(r => setTimeout(r, 800));

        setDeductionCategories(filteredCategories);
        setDeductibleExpenses(mockExpenses);

        // Calculate potential tax savings (simplified calculation)
        const totalDeductible = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        // Assuming a simple 25% tax rate for demo purposes
        setPotentialSavings(totalDeductible * 0.25);

      } catch (err) {
        console.error("Error loading deduction data:", err);
        setError("Failed to load tax deduction data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [countryCode]);

  // Filter expenses by category
  const getFilteredExpenses = () => {
    if (!activeCategory) return deductibleExpenses;
    return deductibleExpenses.filter(expense => expense.category === activeCategory);
  };

  const filteredExpenses = getFilteredExpenses();

  // Get categories with expense counts
  const getCategoriesWithCounts = () => {
    const counts: Record<string, number> = {};
    
    deductibleExpenses.forEach(expense => {
      counts[expense.category] = (counts[expense.category] || 0) + 1;
    });
    
    return deductionCategories.map(category => ({
      ...category,
      count: counts[category.name] || 0
    }));
  };

  const categoriesWithCounts = getCategoriesWithCounts();

  // Get confidence badge style
  const getConfidenceBadge = (confidence: "high" | "medium" | "low") => {
    switch (confidence) {
      case "high":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Check className="w-3 h-3 mr-1" /> High Confidence
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Info className="w-3 h-3 mr-1" /> Medium Confidence
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" /> Low Confidence
          </Badge>
        );
      default:
        return null;
    }
  };

  // Calculate total potential deductions
  const totalDeductions = deductibleExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-muted-foreground">Potential Deductions</h3>
              <p className="text-3xl font-bold">{formatCurrency(totalDeductions)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Found {deductibleExpenses.length} deductible expenses
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-muted-foreground">Estimated Tax Savings</h3>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(potentialSavings)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Based on estimated tax rate for your bracket
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading tax deduction data...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Deduction Categories</CardTitle>
                <CardDescription>
                  Tax deduction categories for {countryCode}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant={!activeCategory ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setActiveCategory(null)}
                  >
                    All Categories ({deductibleExpenses.length})
                  </Button>
                  
                  {categoriesWithCounts.map(category => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.name ? "default" : "outline"}
                      className="w-full justify-between"
                      onClick={() => setActiveCategory(category.name)}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="ml-2">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-medium mb-2">Need help?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Talk to a tax professional to maximize your deductions for your specific situation.
                  </p>
                  <Button variant="outline" className="w-full">
                    <Calculator className="w-4 h-4 mr-2" />
                    Run Tax Simulation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeCategory ? `${activeCategory} Deductions` : "All Potential Deductions"}
                </CardTitle>
                <CardDescription>
                  Transactions identified as potentially tax-deductible
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredExpenses.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No deductible expenses found in this category.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredExpenses.map(expense => (
                      <div key={expense.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{expense.description}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(expense.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatCurrency(expense.amount)}</p>
                            <div className="mt-1">
                              {getConfidenceBadge(expense.confidence)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
                          <span className="text-sm text-muted-foreground">
                            Category: {expense.category}
                          </span>
                          <Button variant="ghost" size="sm" className="h-8">
                            <FileText className="w-4 h-4 mr-1" /> View Receipt
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeCategory && (
                  <div className="mt-6 bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">About {activeCategory}</h3>
                    {(() => {
                      const category = deductionCategories.find(c => c.name === activeCategory);
                      return category ? (
                        <>
                          <p className="text-sm mb-3">{category.description}</p>
                          <h4 className="text-sm font-semibold mb-1">Common examples:</h4>
                          <ul className="text-sm list-disc list-inside space-y-1 text-muted-foreground">
                            {category.examples.map((example, i) => (
                              <li key={i}>{example}</li>
                            ))}
                          </ul>
                        </>
                      ) : null;
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
} 