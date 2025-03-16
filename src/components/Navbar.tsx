
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Safety', href: '#safety' },
    { name: 'Health', href: '#health' },
    { name: 'Showcase', href: '#showcase' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-border shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="container-section py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="flex items-center gap-2">
            <span className="text-primary font-semibold text-xl">TrackSafe</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Button className="rounded-full">Get Started</Button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground hover:text-primary focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background transform transition-transform duration-300 ease-in-out md:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full pt-20 px-4 pb-6 overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="py-2 text-base font-medium text-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button className="rounded-full mt-4">Get Started</Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
