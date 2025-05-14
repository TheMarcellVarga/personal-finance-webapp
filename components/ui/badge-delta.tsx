import { ArrowDownRight, ArrowUpRight, ArrowRight, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type DeltaType = "increase" | "decrease" | "moderateIncrease" | "moderateDecrease" | "unchanged";

interface BadgeDeltaProps {
  deltaType: DeltaType;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BadgeDelta({ deltaType, children, size = "md", className }: BadgeDeltaProps) {
  const sizeClasses = {
    sm: "text-xs py-0 px-1.5",
    md: "text-sm py-0.5 px-2",
    lg: "text-base py-1 px-2.5",
  };

  const deltaTypeClasses = {
    increase: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    decrease: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    moderateIncrease: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    moderateDecrease: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    unchanged: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-medium",
        sizeClasses[size],
        deltaTypeClasses[deltaType],
        className
      )}
    >
      {deltaType === "increase" ? (
        <ArrowUpRight className={cn("mr-0.5", size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
      ) : deltaType === "decrease" ? (
        <ArrowDownRight className={cn("mr-0.5", size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
      ) : deltaType === "moderateIncrease" ? (
        <ArrowUpRight className={cn("mr-0.5", size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
      ) : deltaType === "moderateDecrease" ? (
        <ArrowDownRight className={cn("mr-0.5", size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
      ) : (
        <MinusIcon className={cn("mr-0.5", size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
      )}
      {children}
    </span>
  );
} 