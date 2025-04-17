
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity, Menu, X, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // Check authentication
    const user = localStorage.getItem('tracksafe_user');
    if (user) {
      setIsAuthenticated(true);
    }
    
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
  
  const handleLogout = () => {
    localStorage.removeItem('tracksafe_user');
    setIsAuthenticated(false);
    // Redirect to home if on dashboard
    if (location.pathname === '/dashboard') {
      window.location.href = '/';
    } else {
      // Force a rerender
      window.location.reload();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatDelay: 5
            }}
          >
            <Activity className="h-6 w-6" />
          </motion.div>
          <span>TrackSafe</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-base font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-base font-medium hover:text-primary transition-colors"
          >
            About
          </Link>
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-base font-medium hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Button onClick={handleLogout} variant="ghost" size="sm" className="flex gap-2 items-center">
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button>
                <User size={16} className="mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center text-gray-700"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-base font-medium py-2 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-base font-medium py-2 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-base font-medium py-2 hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }} 
                    variant="ghost" 
                    className="justify-start px-0 hover:bg-transparent"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link 
                  to="/auth" 
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full justify-center">
                    <User size={16} className="mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
