
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/auth-provider';
import { LogIn, LogOut, User, Crown, UserCircle2, Settings, LayoutDashboard, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export function SiteHeader() {
  const { user, loginAsGuest, loginAsAuthenticated, loginAsSubscribed, logout } = useAuth();

  const navLinks = (
    <>
      <Link href="/pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Pricing</Link>
      <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">About</Link>
      <Link href="/feedback" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Feedback</Link>
      {user && (user.role === 'authenticated' || user.role === 'subscribed') && (
        <>
          <Link href="/workspace" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center">
            <LayoutDashboard className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Workspace</span>
            <span className="sm:hidden">Workspace</span> {/* Show text on small mobile if icon only is too little */}
          </Link>
          <Link href="/settings" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center">
            <Settings className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Settings</span>
            <span className="sm:hidden">Settings</span>
          </Link>
        </>
      )}
    </>
  );

  const mobileNavLinks = (
    <>
      <SheetClose asChild>
        <Link href="/pricing" className="block px-4 py-3 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md">Pricing</Link>
      </SheetClose>
      <SheetClose asChild>
        <Link href="/about" className="block px-4 py-3 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md">About</Link>
      </SheetClose>
      <SheetClose asChild>
        <Link href="/feedback" className="block px-4 py-3 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md">Feedback</Link>
      </SheetClose>
      {user && (user.role === 'authenticated' || user.role === 'subscribed') && (
        <>
          <SheetClose asChild>
            <Link href="/workspace" className="block px-4 py-3 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md flex items-center">
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Workspace
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/settings" className="block px-4 py-3 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md flex items-center">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </SheetClose>
        </>
      )}
    </>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-4 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
            <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM17 14h4v4h-4zM14 17.5h3M17 15.5V14M7 11.5V3M10.5 7H3"/>
          </svg>
          <span className="font-bold sm:inline-block font-headline">
            supertasks.ai
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-2 sm:space-x-4 ml-6">
          {navLinks}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-1 md:space-x-2 ml-auto">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden md:inline">
                Welcome, {user.displayName || user.role}!
              </span>
              {user.role === 'guest' && (
                <Button variant="ghost" size="sm" onClick={loginAsAuthenticated}>
                  <LogIn className="mr-0 md:mr-2 h-4 w-4" /> <span className="hidden md:inline">Login</span>
                </Button>
              )}
              {user.role === 'authenticated' && (
                <Button variant="ghost" size="sm" onClick={loginAsSubscribed}>
                  <Crown className="mr-0 md:mr-2 h-4 w-4" /> <span className="hidden md:inline">Upgrade</span>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="mr-0 md:mr-2 h-4 w-4" /> <span className="hidden md:inline">Logout</span>
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={loginAsGuest}>
              <UserCircle2 className="mr-0 md:mr-2 h-4 w-4" /> <span className="hidden md:inline">Login as Guest</span>
            </Button>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden ml-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <div className="p-4 border-b">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                      <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM17 14h4v4h-4zM14 17.5h3M17 15.5V14M7 11.5V3M10.5 7H3"/>
                    </svg>
                    <span className="font-bold text-lg font-headline">supertasks.ai</span>
                  </Link>
                </SheetClose>
              </div>
              <nav className="flex flex-col space-y-2 p-4">
                {mobileNavLinks}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
