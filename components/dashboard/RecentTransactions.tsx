"use client";

import { ArrowUpRight, ArrowDownRight, Coffee, ShoppingBag, Home, Car, CreditCard, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  icon: ReactNode;
  deductible?: boolean;
}

export default function RecentTransactions() {
  // Mock transactions data
  const transactions: Transaction[] = [
    {
      id: "tx-001",
      date: "Apr 15, 2023",
      description: "Salary Deposit",
      amount: 5000,
      category: "Income",
      type: "income",
      icon: <ArrowUpRight className="h-4 w-4 text-green-500" />
    },
    {
      id: "tx-002",
      date: "Apr 14, 2023",
      description: "Grocery Shopping",
      amount: 138.42,
      category: "Food",
      type: "expense",
      icon: <ShoppingBag className="h-4 w-4 text-blue-500" />
    },
    {
      id: "tx-003",
      date: "Apr 13, 2023",
      description: "Mortgage Payment",
      amount: 1850,
      category: "Housing",
      type: "expense",
      icon: <Home className="h-4 w-4 text-purple-500" />,
      deductible: true
    },
    {
      id: "tx-004",
      date: "Apr 12, 2023",
      description: "Car Insurance",
      amount: 175.23,
      category: "Insurance",
      type: "expense",
      icon: <Car className="h-4 w-4 text-amber-500" />
    },
    {
      id: "tx-005",
      date: "Apr 11, 2023",
      description: "Coffee Shop",
      amount: 5.75,
      category: "Food & Drink",
      type: "expense",
      icon: <Coffee className="h-4 w-4 text-orange-500" />
    },
    {
      id: "tx-006",
      date: "Apr 10, 2023",
      description: "Freelance Payment",
      amount: 850,
      category: "Income",
      type: "income",
      icon: <ArrowUpRight className="h-4 w-4 text-green-500" />
    },
    {
      id: "tx-007",
      date: "Apr 09, 2023",
      description: "Restaurant Dinner",
      amount: 92.35,
      category: "Food & Drink",
      type: "expense",
      icon: <Utensils className="h-4 w-4 text-red-500" />
    },
    {
      id: "tx-008",
      date: "Apr 08, 2023",
      description: "Credit Card Payment",
      amount: 500,
      category: "Debt",
      type: "expense",
      icon: <CreditCard className="h-4 w-4 text-gray-500" />,
      deductible: true
    }
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2
    }).format(amount);
  };

  return (
    <div className="space-y-1">
      <div className="grid grid-cols-12 text-xs text-muted-foreground py-2 px-4 border-b">
        <div className="col-span-1">Type</div>
        <div className="col-span-3">Date</div>
        <div className="col-span-4">Description</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-2 text-right">Amount</div>
      </div>
      
      <div className="max-h-[360px] overflow-y-auto pr-2">
        {transactions.map((tx) => (
          <div 
            key={tx.id} 
            className="grid grid-cols-12 items-center text-sm py-3 px-4 border-b border-border/40 hover:bg-muted/50 transition-colors rounded-sm cursor-pointer"
          >
            <div className="col-span-1">
              {tx.icon}
            </div>
            <div className="col-span-3 text-muted-foreground text-xs">
              {tx.date}
            </div>
            <div className="col-span-4 font-medium flex items-center">
              {tx.description}
              {tx.deductible && (
                <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-600 text-[10px] px-1 py-0 h-4">
                  Tax-deductible
                </Badge>
              )}
            </div>
            <div className="col-span-2 text-xs text-muted-foreground">
              {tx.category}
            </div>
            <div className={`col-span-2 font-medium text-right ${tx.type === "income" ? "text-green-500" : ""}`}>
              {tx.type === "expense" ? "-" : "+"}{formatCurrency(tx.amount)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="py-2 text-right">
        <button className="text-sm text-primary hover:underline">
          View All Transactions
        </button>
      </div>
    </div>
  );
} 