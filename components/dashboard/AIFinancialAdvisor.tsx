"use client";

import { useState, useEffect, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, SendHorizonal, Lightbulb, ArrowRight, TrendingUp, ChevronRight, Coins, LineChart, Info } from "lucide-react";

interface Insight {
  id: string;
  type: "opportunity" | "risk" | "tip";
  title: string;
  description: string;
  icon: ReactNode;
  impact: "high" | "medium" | "low";
  action?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIFinancialAdvisor() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [userQuery, setUserQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showInsights, setShowInsights] = useState(true);
  
  useEffect(() => {
    // In a real app, these insights would be generated based on actual financial data
    const mockInsights: Insight[] = [
      {
        id: "insight-1",
        type: "opportunity",
        title: "Potential Tax Deduction",
        description: "Based on your profession and expenses, you may qualify for a home office deduction of up to $1,800.",
        icon: <Coins className="h-5 w-5 text-green-500" />,
        impact: "high",
        action: "Review tax deduction options"
      },
      {
        id: "insight-2",
        type: "risk",
        title: "High Credit Card Interest",
        description: "You're paying 24% APR on your credit card balance. Transferring to a 0% intro rate card could save you $420 this year.",
        icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
        impact: "high",
        action: "Explore balance transfer options"
      },
      {
        id: "insight-3",
        type: "tip",
        title: "Automated Savings Opportunity",
        description: "Setting up a recurring transfer of $200 to your savings account would increase your emergency fund by $2,400 annually.",
        icon: <Lightbulb className="h-5 w-5 text-blue-500" />,
        impact: "medium",
        action: "Set up auto-transfer"
      },
      {
        id: "insight-4",
        type: "opportunity",
        title: "401(k) Match Not Maximized",
        description: "You're currently contributing 4% to your 401(k), but your employer matches up to 6%. Increasing your contribution would gain you an extra $1,200 per year.",
        icon: <LineChart className="h-5 w-5 text-purple-500" />,
        impact: "high",
        action: "Adjust retirement contributions"
      }
    ];
    
    setInsights(mockInsights);
    
    // Welcome message
    setMessages([
      {
        id: "msg-1",
        role: "assistant",
        content: "Hello! I'm your AI Financial Advisor. I've analyzed your financial data and have some personalized insights for you. You can also ask me any financial questions you have.",
        timestamp: new Date()
      }
    ]);
  }, []);
  
  const handleSubmitQuery = () => {
    if (!userQuery.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userQuery,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // In a real app, this would call an API to get AI response
    setTimeout(() => {
      // Mock AI response
      let response: string;
      
      if (userQuery.toLowerCase().includes("invest") || userQuery.toLowerCase().includes("stock")) {
        response = "Based on your risk profile and financial goals, I recommend a diversified portfolio with 60% in broad market index funds, 20% in bonds, and 20% in international stocks. This aligns with your long-term retirement goals while providing some stability.";
      } else if (userQuery.toLowerCase().includes("debt") || userQuery.toLowerCase().includes("loan")) {
        response = "Looking at your current debts, I suggest focusing on your credit card debt first since it has the highest interest rate (24% APR). By allocating an extra $200 monthly payment, you could be debt-free 14 months sooner and save approximately $840 in interest.";
      } else if (userQuery.toLowerCase().includes("save") || userQuery.toLowerCase().includes("saving")) {
        response = "For your savings goals, I recommend the 50/30/20 budget rule: 50% for needs, 30% for wants, and 20% for savings. With your current income, that means setting aside about $1,000 per month for savings. This would help you reach your house down payment goal in approximately 36 months.";
      } else if (userQuery.toLowerCase().includes("retire") || userQuery.toLowerCase().includes("401k")) {
        response = "Based on your current retirement contributions and estimated future needs, you're on track to have about 70% of your target retirement savings by age 65. I recommend increasing your 401(k) contribution by at least 2% to maximize your employer match, which is essentially free money.";
      } else if (userQuery.toLowerCase().includes("tax") || userQuery.toLowerCase().includes("taxes")) {
        response = "Reviewing your tax situation, I see several potential deductions you might be missing. Your home office, professional development courses, and healthcare expenses could qualify as deductions. These could potentially reduce your taxable income by $3,200, saving you approximately $704 in taxes.";
      } else {
        response = "Thank you for your question. Based on your financial profile, I'd recommend reviewing your budget allocations, particularly in discretionary spending categories. Your current spending in entertainment and dining is about 15% higher than recommended for your income level. Adjusting this could increase your monthly savings rate significantly.";
      }
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      setUserQuery("");
    }, 1500);
  };
  
  const getBadgeColors = (type: string) => {
    switch (type) {
      case "opportunity":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "risk":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "tip":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };
  
  const getImpactColors = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };
  
  return (
    <div className="space-y-6">
      {/* AI Chat Interface */}
      <div className="flex flex-col h-[400px] bg-secondary/30 rounded-lg border border-primary/10 overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-primary/10 bg-secondary/50">
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-medium">Financial AI Assistant</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowInsights(!showInsights)}
            className="text-xs"
          >
            {showInsights ? "Hide Insights" : "Show Insights"}
          </Button>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Chat Messages */}
          <div className={`flex-1 overflow-y-auto p-4 ${showInsights ? 'w-7/12' : 'w-full'}`}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <div className="text-sm">{message.content}</div>
                    <div className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* AI Insights Panel */}
          {showInsights && (
            <div className="w-5/12 border-l border-primary/10 bg-background/50 overflow-y-auto p-4">
              <h4 className="text-sm font-medium mb-3 flex items-center">
                <Info className="h-4 w-4 mr-1.5" />
                AI-Generated Insights
              </h4>
              <div className="space-y-3">
                {insights.map((insight) => (
                  <Card key={insight.id} className="border-primary/10">
                    <CardContent className="p-3">
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5">
                          {insight.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-medium text-sm">{insight.title}</h5>
                            <div className="flex space-x-1">
                              <Badge 
                                variant="outline" 
                                className={`text-[10px] px-1.5 py-0 ${getBadgeColors(insight.type)}`}
                              >
                                {insight.type}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`text-[10px] px-1.5 py-0 ${getImpactColors(insight.impact)}`}
                              >
                                {insight.impact} impact
                              </Badge>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
                          {insight.action && (
                            <button className="text-xs text-primary flex items-center hover:underline">
                              {insight.action} <ChevronRight className="h-3 w-3 ml-0.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Input Area */}
        <div className="p-3 border-t border-primary/10 bg-background">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitQuery();
            }}
            className="flex items-center space-x-2"
          >
            <Input
              type="text"
              placeholder="Ask me about your finances..."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || !userQuery.trim()}>
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </form>
          <div className="mt-2 text-xs text-muted-foreground flex items-center">
            <Sparkles className="h-3 w-3 mr-1 text-primary" />
            Try asking: "How can I optimize my investments?" or "What's my debt reduction plan?"
          </div>
        </div>
      </div>
    </div>
  );
} 