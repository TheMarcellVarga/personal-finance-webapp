"use client";

import Link from "next/link";
import { Globe, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-secondary/20 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <span className="text-primary font-bold">F</span>
              </div>
              <h2 className="text-xl font-bold text-gradient">FinAdventurer</h2>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Navigate worldwide tax systems with our interactive 3D visualization and make informed financial decisions across borders.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-medium mb-4 text-sm tracking-wider uppercase">Resources</h3>
            <div className="flex flex-col space-y-3">
              <Link href="/calculator" className="text-sm text-muted-foreground hover:text-foreground animated-underline py-1 w-fit">
                Calculator
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground animated-underline py-1 w-fit">
                Pricing
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground animated-underline py-1 w-fit">
                Documentation
              </a>
            </div>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-medium mb-4 text-sm tracking-wider uppercase">Legal</h3>
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground animated-underline py-1 w-fit">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground animated-underline py-1 w-fit">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground animated-underline py-1 w-fit">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-primary/10">
          <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
            © 2024 FinAdventurer. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300"
              aria-label="Globe"
            >
              <Globe className="h-4 w-4 text-primary" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300"
              aria-label="Github"
            >
              <Github className="h-4 w-4 text-primary" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4 text-primary" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
