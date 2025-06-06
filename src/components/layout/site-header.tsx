"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/auth-provider';
import { LogIn, LogOut, User, Crown, UserCircle2 } from 'lucide-react';

export function SiteHeader() {
  const { user, loginAsGuest, loginAsAuthenticated, loginAsSubscribed, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
            <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM17 14h4v4h-4zM14 17.5h3M17 15.5V14M7 11.5V3M10.5 7H3"/>
          </svg>
          <span className="font-bold sm:inline-block font-headline">
            PrioritizeIt
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4">
          <Link href="/pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Pricing</Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">About</Link>
          <Link href="/feedback" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Feedback</Link>
        </nav>
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden md:inline">
                Welcome, {user.displayName || user.role}!
              </span>
              {user.role === 'guest' && <Button variant="ghost" size="sm" onClick={loginAsAuthenticated}><LogIn className="mr-2 h-4 w-4" /> Login</Button>}
              {user.role === 'authenticated' && <Button variant="ghost" size="sm" onClick={loginAsSubscribed}><Crown className="mr-2 h-4 w-4" /> Upgrade</Button>}
              <Button variant="outline" size="sm" onClick={logout}><LogOut className="mr-2 h-4 w-4" /> Logout</Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={loginAsGuest}><UserCircle2 className="mr-2 h-4 w-4" /> Login as Guest</Button>
          )}
        </div>
      </div>
    </header>
  );
}
