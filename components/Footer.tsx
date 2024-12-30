"use client";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          © 2024 FinAdventurer. All rights reserved.
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
