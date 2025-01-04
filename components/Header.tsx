"use client";

import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="border-b">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <h2 className="text-2xl font-bold">FinAdventurer</h2>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="mr-2"
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>

          <SignedOut>
            <div className="flex items-center space-x-2">
              <SignInButton mode="modal">
                <Button variant="ghost">Sign in</Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button>Sign up</Button>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                }
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
