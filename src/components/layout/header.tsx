
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const { user, userData, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/learn', label: 'Learn' },
    { href: '/minigames', label: 'Minigames' },
    { href: '/shop', label: 'Shop' },
  ];
  
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
      scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/10" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center justify-end space-x-2">
            {/* Desktop Auth Controls */}
            <div className="hidden md:flex items-center space-x-4">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-9 w-20 rounded-md" />
                  <Skeleton className="h-9 w-24 rounded-md" />
                </div>
              ) : user ? (
                <UserNav />
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/auth">Log In</Link>
                  </Button>
                  <Button asChild className="shadow-glow transition-all duration-300 hover:shadow-glow-lg">
                    <Link href="/auth?view=signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-sm bg-background/95 backdrop-blur-lg flex flex-col">
                  <SheetHeader className="flex-shrink-0 border-b border-border/10 pb-4">
                     <Logo onClick={closeMenu} />
                     <SheetTitle className="sr-only">Main Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="flex-grow flex flex-col gap-6 mt-8">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} onClick={closeMenu} className="text-2xl font-semibold text-foreground hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="flex-shrink-0 border-t border-border/10 pt-6">
                    {loading ? (
                       <div className="flex items-center space-x-2">
                          <Skeleton className="h-10 w-full rounded-md" />
                       </div>
                    ) : user ? (
                      <div>
                        {/* In mobile, UserNav is enough as it contains the dropdown */}
                        <UserNav />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <Button variant="outline" asChild size="lg" className="text-lg">
                          <Link href="/auth" onClick={closeMenu}>Log In</Link>
                        </Button>
                        <Button asChild size="lg" className="shadow-glow text-lg">
                          <Link href="/auth?view=signup" onClick={closeMenu}>Sign Up</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
