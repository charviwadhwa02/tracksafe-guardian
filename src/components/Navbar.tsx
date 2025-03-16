
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary"
        >
          <Activity className="h-6 w-6" />
          <span>TrackSafe</span>
        </Link>
        
        <nav className="flex items-center gap-2 md:gap-8">
          {isHomePage ? (
            <>
              <a href="#features" className="hidden md:block text-sm md:text-base font-medium hover:text-primary transition-colors">Features</a>
              <a href="#safety" className="hidden md:block text-sm md:text-base font-medium hover:text-primary transition-colors">Safety</a>
              <a href="#health" className="hidden md:block text-sm md:text-base font-medium hover:text-primary transition-colors">Health</a>
              <Link to="/dashboard">
                <Button variant="outline" className="hidden md:inline-flex">
                  Open App
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="text-sm md:text-base font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/dashboard" className="text-sm md:text-base font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
