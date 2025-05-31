"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@/lib/mock-clerk";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, ReactNode } from "react";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

interface HeaderProps {
  pageTitle?: string;
  actionButton?: ReactNode;
}

const ListItem = ({ className, title, children, href, ...props }: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export function Header({ pageTitle, actionButton }: HeaderProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <TooltipProvider>
      <header className="border-b border-primary/10 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <span className="text-primary font-bold">F</span>
              </div>
              <h2 className="text-xl font-bold text-gradient">FinAdventurer</h2>
            </Link>
            
            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground">
                    Dashboard
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/dashboard"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Financial Dashboard
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Comprehensive overview of your financial health, spending patterns, and investment performance.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/dashboard" title="Overview">
                        Get a bird's-eye view of your finances with key metrics and trends.
                      </ListItem>
                      <ListItem href="/dashboard#investments" title="Investments">
                        Track your portfolio performance and asset allocation.
                      </ListItem>
                      <ListItem href="/dashboard#transactions" title="Transactions">
                        Review your recent financial activity and spending patterns.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground">
                    Tools
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="/calculator" title="Tax Calculator">
                        Calculate your taxes and optimize your tax strategy.
                      </ListItem>
                      <ListItem href="/financial-planning" title="Financial Planning">
                        Plan for your financial future with our comprehensive tools.
                      </ListItem>
                      <ListItem href="/showcase" title="UI Showcase">
                        Explore our enhanced shadcn/ui components and design system.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/pricing" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent hover:text-accent-foreground")}>
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {pageTitle && (
              <div className="ml-6 pl-6 border-l border-primary/10 hidden lg:block">
                <h1 className="text-xl font-semibold">{pageTitle}</h1>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Page-specific action button */}
            {actionButton && (
              <div className="mr-2">
                {actionButton}
              </div>
            )}
            
            {/* Theme toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  className="rounded-full hover:bg-primary/10"
                >
                  {isDarkMode ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch to {isDarkMode ? "light" : "dark"} mode</p>
              </TooltipContent>
            </Tooltip>

            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/10"
                  >
                    <HamburgerMenuIcon className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="text-left">Navigation</SheetTitle>
                    <SheetDescription className="text-left">
                      Access all features of FinAdventurer
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground">Dashboard</h4>
                      <div className="grid gap-2">
                        <Link 
                          href="/dashboard" 
                          className="block py-2 text-foreground hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Overview
                        </Link>
                        <Link 
                          href="/dashboard#investments" 
                          className="block py-2 text-foreground hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Investments
                        </Link>
                        <Link 
                          href="/dashboard#transactions" 
                          className="block py-2 text-foreground hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Transactions
                        </Link>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground">Tools</h4>
                      <div className="grid gap-2">
                        <Link 
                          href="/calculator" 
                          className="block py-2 text-foreground hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Tax Calculator
                        </Link>
                        <Link 
                          href="/financial-planning" 
                          className="block py-2 text-foreground hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Financial Planning
                        </Link>
                        <Link 
                          href="/showcase" 
                          className="block py-2 text-foreground hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          UI Showcase
                        </Link>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Link 
                        href="/pricing" 
                        className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Pricing
                      </Link>
                    </div>
                    {pageTitle && (
                      <div className="pt-4 border-t">
                        <h4 className="font-semibold text-foreground">
                          {pageTitle}
                        </h4>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <SignedOut>
              <SignInButton>
                <Button 
                  variant="default" 
                  className="rounded-full button-hover bg-primary/90 hover:bg-primary"
                >
                  Sign in
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}