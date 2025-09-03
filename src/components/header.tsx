'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Menu, Search, User, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Logo from './logo';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tv-shows', label: 'TV Shows' },
  { href: '/movies', label: 'Movies' },
  { href: '/my-list', label: 'My List' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out',
        isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex-shrink-0">
              <Logo />
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-white font-bold'
                      : 'text-neutral-300 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/search"><Search className="h-5 w-5" /></Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-black/90 p-0 border-r border-gray-800">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-6">
                    <Logo />
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon"><X className="h-6 w-6"/></Button>
                    </SheetTrigger>
                  </div>
                  <nav className="flex flex-col space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'block px-3 py-2 rounded-md text-base font-medium',
                          pathname === link.href
                            ? 'bg-primary text-white'
                            : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
