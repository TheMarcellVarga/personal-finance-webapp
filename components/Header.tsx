"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, ReactNode } from "react";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  pageTitle?: string;
  actionButton?: ReactNode;
}

export function Header({ isDarkMode, toggleDarkMode, pageTitle, actionButton }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-primary/10 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <span className="text-primary font-bold">F</span>
            </div>
            <h2 className="text-xl font-bold text-gradient">FinAdventurer</h2>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/dashboard" 
              className="text-sm text-muted-foreground hover:text-foreground animated-underline py-1"
            >
              Dashboard
            </Link>
            <Link 
              href="/calculator" 
              className="text-sm text-muted-foreground hover:text-foreground animated-underline py-1"
            >
              Calculator
            </Link>
            <Link 
              href="/financial-planning" 
              className="text-sm text-muted-foreground hover:text-foreground animated-underline py-1"
            >
              Financial Planning
            </Link>
            <Link 
              href="/pricing" 
              className="text-sm text-muted-foreground hover:text-foreground animated-underline py-1"
            >
              Pricing
            </Link>
          </nav>
          
          {pageTitle && (
            <div className="ml-6 pl-6 border-l border-primary/10 hidden md:block">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10"
              >
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={toggleDarkMode}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full hover:bg-primary/10"
            >
              <HamburgerMenuIcon className="h-5 w-5" />
            </Button>
            {isMobileMenuOpen && (
              <div className="md:hidden bg-background border-t border-b border-primary/10 py-4">
                <div className="container mx-auto px-6 space-y-4">
                  <Link 
                    href="/dashboard" 
                    className="block py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/calculator" 
                    className="block py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Calculator
                  </Link>
                  <Link 
                    href="/financial-planning" 
                    className="block py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Financial Planning
                  </Link>
                  <Link 
                    href="/pricing" 
                    className="block py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  {pageTitle && (
                    <div className="py-2 font-semibold">
                      {pageTitle}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <SignedOut>
            <SignInButton mode="modal">
              <Button 
                variant="default" 
                className="rounded-full button-hover bg-primary/90 hover:bg-primary"
              >
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300",
                }
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}