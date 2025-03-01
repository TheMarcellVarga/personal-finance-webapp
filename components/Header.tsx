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
import { useState } from "react";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
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
              href="/calculator" 
              className="text-sm text-muted-foreground hover:text-foreground animated-underline py-1"
            >
              Calculator
            </Link>
            <Link 
              href="/pricing" 
              className="text-sm text-muted-foreground hover:text-foreground animated-underline py-1"
            >
              Pricing
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
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
              <div className="absolute top-16 right-0 w-full bg-background border-b border-primary/10 p-4 shadow-lg">
                <nav className="flex flex-col space-y-3">
                  <Link 
                    href="/calculator" 
                    className="text-sm text-muted-foreground hover:text-foreground py-2 px-4 hover:bg-primary/5 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Calculator
                  </Link>
                  <Link 
                    href="/pricing" 
                    className="text-sm text-muted-foreground hover:text-foreground py-2 px-4 hover:bg-primary/5 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                </nav>
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