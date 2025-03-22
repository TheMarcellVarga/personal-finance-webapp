"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTaxStore } from "@/store/taxStore";
import { getCountryCurrency } from "@/utils/currencyMappings";
import { 
  CircleDollarSign, 
  Lightbulb, 
  ArrowUpRight, 
  Bookmark, 
  BadgeDollarSign, 
  BarChart,
  PiggyBank,
  Calculator,
  RefreshCw
} from "lucide-react";

interface Recommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  potentialSavings: number | null;
  type: 'saving' | 'investing' | 'budgeting' | 'tax';
  priority: 'high' | 'medium' | 'low';
}

export default function FinancialRecommendations() {
  const { selectedCountry } = useTaxStore();
  const countryCode = selectedCountry || "US";
  const currency = getCountryCurrency(countryCode) || "USD";
  
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<"7days" | "30days" | "90days" | "year">("30days");
  const [savedRecommendations, setSavedRecommendations] = useState<string[]>([]);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  
  // Fetch recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/ai-recommendations?timeRange=${timeRange}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        
        const data = await response.json();
        setRecommendations(data.recommendations);
        setSummary(data.summary);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Failed to load recommendations. Please try again later.');
        
        // Use sample data in case of error
        setRecommendations([
          {
            id: "budget-housing-1",
            category: "Housing",
            title: "Consider budgeting your housing expenses",
            description: "You're spending 35.2% of your total expenses on housing. Consider setting a budget to reduce this by 15-20% if possible.",
            potentialSavings: 250,
            type: "budgeting",
            priority: "high"
          },
          {
            id: "tax-deduction-2",
            category: "Tax",
            title: "Maximize your tax deductions",
            description: "You have expenses that might be tax-deductible. Make sure you keep all receipts and documentation for your tax filing.",
            potentialSavings: null,
            type: "tax",
            priority: "high"
          },
          {
            id: "investing-3",
            category: "Investing",
            title: "Start or increase retirement contributions",
            description: "Based on your spending patterns, consider allocating 10-15% of your income to retirement accounts for long-term financial security.",
            potentialSavings: null,
            type: "investing",
            priority: "medium"
          }
        ]);
        setSummary("Your largest expense category is Housing (35.2% of total). This is significantly higher than recommended. Consider ways to reduce these expenses. Your overall spending patterns suggest expenses concentrated in a few categories. Focus on creating a balanced budget that includes savings goals.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [timeRange]);
  
  // Load saved recommendations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedRecommendations');
    if (saved) {
      setSavedRecommendations(JSON.parse(saved));
    }
  }, []);
  
  // Save or unsave a recommendation
  const toggleSaveRecommendation = (id: string) => {
    let newSaved;
    if (savedRecommendations.includes(id)) {
      newSaved = savedRecommendations.filter(recId => recId !== id);
    } else {
      newSaved = [...savedRecommendations, id];
    }
    setSavedRecommendations(newSaved);
    localStorage.setItem('savedRecommendations', JSON.stringify(newSaved));
  };
  
  // Map types to icons
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'saving':
        return <PiggyBank className="h-4 w-4" />;
      case 'investing':
        return <ArrowUpRight className="h-4 w-4" />;
      case 'budgeting':
        return <BarChart className="h-4 w-4" />;
      case 'tax':
        return <BadgeDollarSign className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };
  
  // Map priority to color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Smart Recommendations</h2>
        <div className="flex space-x-2">
          <select
            className="bg-background border rounded-md px-3 py-1 text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">Last year</option>
          </select>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setTimeRange(timeRange)}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading recommendations...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Financial summary */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start">
                <CircleDollarSign className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Your Financial Summary</h3>
                  <p className="text-muted-foreground">{summary}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Personalized recommendations */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <span>Personalized Recommendations</span>
            </h3>
            
            {recommendations.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    We don't have enough data to make personalized recommendations yet. 
                    Add more expenses to get tailored financial advice.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {recommendations.map((recommendation) => (
                  <Card key={recommendation.id} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className={`${getPriorityColor(recommendation.priority)} capitalize`}>
                          {recommendation.priority} priority
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => toggleSaveRecommendation(recommendation.id)}
                        >
                          <Bookmark className={`h-4 w-4 ${
                            savedRecommendations.includes(recommendation.id) 
                              ? 'fill-primary text-primary' 
                              : 'text-muted-foreground'
                          }`} />
                        </Button>
                      </div>
                      <CardTitle className="text-lg flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                          {getTypeIcon(recommendation.type)}
                        </span>
                        {recommendation.title}
                      </CardTitle>
                      <CardDescription>
                        Category: {recommendation.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {recommendation.description}
                      </p>
                      {recommendation.potentialSavings && (
                        <div className="bg-green-50 border border-green-100 rounded-md p-2 text-green-700 text-sm">
                          <span className="font-medium">Potential savings: </span>
                          {formatCurrency(recommendation.potentialSavings)}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {/* Tip of the day */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start">
                <div className="bg-blue-500 text-white p-2 rounded-lg">
                  <Calculator className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-blue-800">Financial Tip of the Day</h3>
                  <p className="text-blue-700">Follow the 50/30/20 rule: Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment. This creates a sustainable budget that balances your current lifestyle with your future goals.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 