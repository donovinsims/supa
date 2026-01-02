"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Send, User as UserIcon, LogOut, Loader2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Logo } from '@/components/ui/logo';
import { SubmitModal } from '@/components/ui/submit-modal';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

const Navbar = () => {
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] w-full bg-page/80 backdrop-blur-md transition-theme">
      <div className="container h-[56px] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Logo />
          </Link>
            <nav className="hidden md:flex items-center gap-1 md:gap-2">
              <Link 
                href="/software" 
                className="text-text-primary bg-ui-1 border border-border-1 px-3 py-1.5 text-[12px] font-medium rounded-[8px] transition-all"
              >
                Software
              </Link>
              <Link 
                href="/" 
                className="text-text-secondary hover:text-text-primary px-3 py-1.5 text-[12px] font-medium transition-colors rounded-[8px]"
              >
                Guides
              </Link>
              <Link 
                href="/" 
                className="text-text-secondary hover:text-text-primary px-3 py-1.5 text-[12px] font-medium transition-colors rounded-[8px]"
              >
                Catalog
              </Link>
              <Link 
                href="/" 
                className="text-text-secondary hover:text-text-primary px-3 py-1.5 text-[12px] font-medium transition-colors rounded-[8px]"
              >
                Learn
              </Link>
              <Link 
                href="/creators" 
                className="text-text-secondary hover:text-text-primary px-3 py-1.5 text-[12px] font-medium transition-colors rounded-[8px]"
              >
                Creators
              </Link>
            </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1">
            <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <ThemeToggle />
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button 
              onClick={() => setSubmitModalOpen(true)}
              className="flex items-center gap-1.5 text-text-primary bg-ui-1 border border-border-1 px-3 py-1.5 text-[12px] font-medium rounded-[8px] hover:bg-ui-2 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              Submit
            </button>

            {loading ? (
              <div className="px-3 py-1.5">
                <Loader2 className="w-4 h-4 animate-spin text-text-secondary" />
              </div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-[8px] hover:bg-ui-1 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-ui-3 flex items-center justify-center overflow-hidden">
                    {user.user_metadata?.avatar_url ? (
                      <Image
                        src={user.user_metadata.avatar_url}
                        alt="Avatar"
                        width={28}
                        height={28}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon className="w-3.5 h-3.5 text-text-secondary" />
                    )}
                  </div>
                </button>

                {menuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setMenuOpen(false)} 
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-ui-1 border border-border-1 rounded-[12px] shadow-xl z-20 overflow-hidden">
                      <div className="p-3 border-b border-border-1">
                        <p className="text-[13px] font-medium text-text-primary truncate">
                          {user.user_metadata?.full_name || user.email?.split("@")[0]}
                        </p>
                        <p className="text-[11px] text-text-secondary truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="p-1">
                        <Link
                          href="/profile"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-[13px] text-text-primary hover:bg-ui-2 rounded-[8px] transition-colors"
                        >
                          <UserIcon className="w-4 h-4" />
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-red-500 hover:bg-ui-2 rounded-[8px] transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link 
                  href="/auth/signin" 
                  className="text-text-primary px-3 py-1.5 text-[12px] font-medium hover:text-text-primary transition-colors"
                >
                  Sign in
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="bg-text-primary text-page px-4 py-1.5 text-[12px] font-semibold rounded-[8px] hover:opacity-90 transition-all"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          <button className="sm:hidden flex flex-col gap-1 p-2">
            <span className="w-5 h-0.5 bg-text-primary rounded-full"></span>
            <span className="w-5 h-0.5 bg-text-primary rounded-full"></span>
          </button>
        </div>
      </div>
      <SubmitModal open={submitModalOpen} onOpenChange={setSubmitModalOpen} />
    </div>
  );
};

export default Navbar;
