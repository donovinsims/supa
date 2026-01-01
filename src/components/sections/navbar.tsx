"use client";

import React from 'react';
import Link from 'next/link';
import { Search, Send } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Logo } from '@/components/ui/logo';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] w-full bg-page/80 backdrop-blur-md transition-theme">
      <div className="container h-[56px] flex items-center justify-between">
        {/* Left Side: Logo & Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href="/">
            <Logo />
          </Link>
            <nav className="hidden md:flex items-center gap-1 md:gap-2">
              <Link 
                href="/" 
                className="text-text-primary bg-ui-1 border border-border-1 px-3 py-1.5 text-[12px] font-medium rounded-[8px] transition-all"
              >
                Websites
              </Link>
              <Link 
                href="/creators" 
                className="text-text-secondary hover:text-text-primary px-3 py-1.5 text-[12px] font-medium transition-colors rounded-[8px]"
              >
                Creators
              </Link>
              <Link 
                href="/templates" 
                className="text-text-secondary hover:text-text-primary px-3 py-1.5 text-[12px] font-medium transition-colors rounded-[8px]"
              >
                Templates
              </Link>
            <Link 
              href="/software" 
              className="text-text-secondary hover:text-text-primary px-3 py-1.5 text-[12px] font-medium transition-colors rounded-[8px]"
            >
              Software
            </Link>
            <Link 
              href="/pricing" 
              className="text-text-secondary hover:text-text-primary px-3 py-1.5 text-[12px] font-medium transition-colors rounded-[8px]"
            >
              Pricing
            </Link>
          </nav>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1">
            <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <ThemeToggle />
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Link 
              href="/submit" 
              className="flex items-center gap-1.5 text-text-primary bg-ui-1 border border-border-1 px-3 py-1.5 text-[12px] font-medium rounded-[8px] hover:bg-ui-2 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              Submit
            </Link>
            <Link 
              href="/login" 
              className="text-text-primary px-3 py-1.5 text-[12px] font-medium hover:text-text-primary transition-colors"
            >
              Sign in
            </Link>
            <Link 
              href="/signup" 
              className="bg-text-primary text-page px-4 py-1.5 text-[12px] font-semibold rounded-[8px] hover:opacity-90 transition-all"
            >
              Create Account
            </Link>
          </div>

          {/* Mobile Menu Toggle (simplified for now) */}
          <button className="sm:hidden flex flex-col gap-1 p-2">
            <span className="w-5 h-0.5 bg-text-primary rounded-full"></span>
            <span className="w-5 h-0.5 bg-text-primary rounded-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
