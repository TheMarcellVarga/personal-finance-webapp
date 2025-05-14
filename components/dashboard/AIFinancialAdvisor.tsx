"use client";

import { useState, useEffect, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, SendHorizonal, Lightbulb, ArrowRight, TrendingUp, ChevronRight, Coins, LineChart, Info, BarChart, PiggyBank, ShieldCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Insight {
  id: string;
  type: "opportunity" | "risk" | "tip";
  title: string;
  description: string;
  icon: ReactNode;
  impact: "high" | "medium" | "low";
  action?: string;
  actionUrl?: string;
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
  
  useEffect(() => {
    // More realistic insights based on actual financial patterns
    const realInsights: Insight[] = [
      {
        id: "insight-1",
        type: "opportunity",
        title: "Potential Tax Deduction",
        description: "Based on your profession as a software developer and home office expenses, you may qualify for a home office deduction of up to $1,800.",
        icon: <Coins className="h-5 w-5 text-green-500" />,
        impact: "high",
        action: "Review tax deduction options",
        actionUrl: "/calculator?tab=deductions"
      },
      {
        id: "insight-2",
        type: "risk",
        title: "High Credit Card Interest",
        description: "Your Chase credit card has a 24% APR on $3,400 balance. Transferring to a 0% intro rate card could save you $420 this year.",
        icon: <ShieldCheck className="h-5 w-5 text-amber-500" />,
        impact: "high",
        action: "Explore balance transfer options",
        actionUrl: "/financial-planning?tab=debt"
      },
      {
        id: "insight-3",
        type: "tip",
        title: "Automated Savings Opportunity",
        description: "Setting up a recurring transfer of $200/week to your Ally savings account would boost your emergency fund by $2,400 in 3 months.",
        icon: <PiggyBank className="h-5 w-5 text-blue-500" />,
        impact: "medium",
        action: "Set up auto-transfer",
        actionUrl: "/financial-planning?tab=automation"
      },
      {
        id: "insight-4",
        type: "opportunity",
        title: "401(k) Match Not Maximized",
        description: "You're currently contributing 4% to your Microsoft 401(k), but they match up to 6%. Increasing your contribution would gain you an extra $1,200 per year.",
        icon: <BarChart className="h-5 w-5 text-purple-500" />,
        impact: "high",
        action: "Adjust retirement contributions",
        actionUrl: "/financial-planning?tab=retirement"
      }
    ];
    
    setInsights(realInsights);
    
    // More professional welcome message
    setMessages([
      {
        id: "msg-1",
        role: "assistant",
        content: "Hello! I'm your AI Financial Advisor. I've analyzed your accounts from Chase, Ally Bank, and Microsoft 401(k). I've found several ways to optimize your finances - check out the insights panel or ask me a specific question.",
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
    
    // Simulated API call with more context-aware responses
    setTimeout(() => {
      let response: string;
      const query = userQuery.toLowerCase();
      
      if (query.includes("invest") || query.includes("stock") || query.includes("etf")) {
        response = "Based on your risk profile and financial goals, I recommend adjusting your current portfolio. Your Microsoft RSUs are creating concentration risk (42% of your investments). Consider diversifying with these allocations:\n\n• 50% VTI (Total US Market)\n• 20% VXUS (International)\n• 20% BND (Bonds)\n• 10% individual stocks\n\nThis would reduce volatility while maintaining strong growth potential.";
      } else if (query.includes("debt") || query.includes("loan") || query.includes("credit card")) {
        response = "Let's tackle your debt strategically. Your current debts:\n\n• Chase Credit Card: $3,400 @ 24.99% APR\n• Car Loan: $12,500 @ 4.5% APR\n• Student Loan: $18,200 @ 5.8% APR\n\nI recommend the avalanche method - focus on the Chase card first while making minimum payments on other debts. By allocating an extra $300 monthly to the Chase card, you'll be debt-free in 11 months and save $612 in interest.";
      } else if (query.includes("save") || query.includes("saving") || query.includes("emergency fund")) {
        response = "Your current savings rate is 12% of take-home pay. For your goal of buying a home in the next 3 years, I recommend increasing to 20%. With your monthly income of $6,800 after taxes, that means setting aside $1,360 monthly instead of your current $816. This would grow your down payment fund from $14,500 to $63,460 by your target date of June 2027, assuming your Ally high-yield savings account maintains its 4.25% APY.";
      } else if (query.includes("retire") || query.includes("401k") || query.includes("roth")) {
        response = "Your retirement accounts look good, but there's room for optimization. Current status:\n\n• Microsoft 401(k): $58,400 (4% contribution + 4% match)\n• Roth IRA: $22,500 (not maxed this year)\n\nRecommendations:\n1. Increase 401(k) to 6% to get full employer match (+$1,200/year)\n2. Max out your Roth IRA contribution ($6,000 − $2,200 = $3,800 remaining)\n3. Consider adding a backdoor Roth conversion given your income level";
      } else if (query.includes("tax") || query.includes("taxes") || query.includes("deduction")) {
        response = "Looking at your tax situation, I see several optimization opportunities:\n\n1. Home office deduction: $1,800 potential savings\n2. Health insurance premiums: $1,200 tax-advantaged via your HSA\n3. Professional development courses: $850 potential deduction\n4. Charitable contributions: $1,350 itemized deduction\n\nThese could reduce your taxable income by approximately $5,200, saving you $1,144 in federal taxes at your 22% marginal rate.";
      } else if (query.includes("budget") || query.includes("spend") || query.includes("expense")) {
        response = "Analyzing your spending patterns over the last 3 months:\n\n• Housing: $2,100/mo (31% of income)\n• Transportation: $650/mo (10%)\n• Food: $850/mo (12.5%)\n• Entertainment: $620/mo (9%)\n• Shopping: $480/mo (7%)\n\nYour entertainment and shopping categories are 15% above recommended levels for your income. Reducing these by $250/mo combined would boost your savings rate by 3.7% and accelerate your home purchase timeline by 4 months.";
      } else {
        response = "Based on your overall financial profile, here are your key opportunities:\n\n1. Increase 401(k) contribution to get full employer match\n2. Refinance your high-interest credit card debt\n3. Optimize your investment portfolio allocation\n4. Build your emergency fund to cover 6 months of expenses\n\nWould you like me to elaborate on any of these areas specifically?";
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
    }, 1200);
  };
  
  return (
    <div>
      <Tabs defaultValue="chat" className="w-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src="/ai-assistant.png" alt="AI" />
              <AvatarFallback className="bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Personal Finance AI</p>
              <p className="text-xs text-muted-foreground">Connected to your accounts</p>
            </div>
          </div>
          <TabsList className="h-8">
            <TabsTrigger value="chat" className="text-xs px-3">Chat</TabsTrigger>
            <TabsTrigger value="insights" className="text-xs px-3">Insights</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="mt-0 space-y-4">
          <div className="relative bg-muted/40 rounded-lg p-4 h-[260px] overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-6 w-6 mr-2 mt-0.5">
                      <AvatarFallback className="bg-primary/10">
                        <Sparkles className="h-3 w-3 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div 
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground text-sm' 
                        : 'bg-muted text-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line">{message.content}</div>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="h-6 w-6 ml-2 mt-0.5">
                      <AvatarFallback>MV</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start">
                  <Avatar className="h-6 w-6 mr-2 mt-0.5">
                    <AvatarFallback className="bg-primary/10">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-[80%] rounded-lg px-3 py-2 bg-muted">
                    <div className="flex space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 items-center">
            <Input
              type="text"
              placeholder="Ask me about your finances..."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="flex-1 h-9 text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmitQuery();
                }
              }}
            />
            <Button 
              type="submit" 
              size="sm" 
              className="h-9"
              onClick={handleSubmitQuery}
              disabled={isLoading || !userQuery.trim()}
            >
              <SendHorizonal className="h-4 w-4 mr-1" />
              Send
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground border border-border/40 rounded p-2 flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
            <span>Try asking: "How can I optimize my investment portfolio?" or "What's my debt reduction plan?"</span>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-0">
          <div className="h-[335px] overflow-y-auto pr-1">
            <div className="space-y-3">
              {insights.map((insight) => (
                <Card key={insight.id} className="border border-border/40">
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                        {insight.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-sm">{insight.title}</h5>
                          <Badge 
                            variant="secondary" 
                            className="text-[10px] px-1.5 py-0 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          >
                            {insight.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
                        {insight.action && (
                          <a href={insight.actionUrl || "#"} className="text-xs text-primary flex items-center hover:underline">
                            {insight.action} <ChevronRight className="h-3 w-3 ml-0.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 