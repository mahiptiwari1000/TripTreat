
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Menu, X, User, Map, Home, Coffee, Landmark, 
  Utensils, Info, PhoneCall, ChevronDown, MapPin,
  CalendarRange, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Toggle user menu
  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Close user menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (isUserMenuOpen) setIsUserMenuOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <nav className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-bold text-primary group-hover:scale-105 transition-all duration-300">
              Trip<span className="text-secondary">&</span>Treat
            </span>
            <span className="hidden md:inline-block text-xs text-muted-foreground ml-2 mt-2">
              Manipur Delights
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/homestays" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200">
              <Home size={16} className="transition-transform group-hover:rotate-12" />
              Homestays
            </Link>
            <Link to="/tours" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200">
              <CalendarRange size={16} />
              Tours
            </Link>
            <Link to="/experiences" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200">
              <Award size={16} />
              Experiences
            </Link>
            <Link to="/eateries" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200">
              <Utensils size={16} />
              Eateries
            </Link>
            <Link to="/hotspots" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200">
              <MapPin size={16} />
              Hotspots
            </Link>
            <Link to="/itinerary" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200">
              <Map size={16} />
              Itinerary
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200">
              <Info size={16} />
              Our Story
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200">
              <PhoneCall size={16} />
              Contact
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 group"
              asChild
            >
              <Link to="/become-host" className="flex items-center gap-2">
                <Landmark size={16} className="transition-transform group-hover:rotate-12" />
                Become a Host
              </Link>
            </Button>

            {/* User profile dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-foreground rounded-full hover:bg-primary/10 transition-all duration-300"
                onClick={toggleUserMenu}
              >
                <User size={20} className="transition-transform hover:scale-110" />
              </Button>

              {/* User dropdown menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background rounded-lg shadow-lg overflow-hidden border border-border animate-fade-in">
                  <div className="p-3 border-b border-border">
                    <p className="font-medium">Guest</p>
                    <p className="text-sm text-muted-foreground">Sign in to your account</p>
                  </div>
                  <div className="py-1">
                    <Link 
                      to="/login" 
                      className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link 
                      to="/register" 
                      className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Create account
                    </Link>
                  </div>
                  <div className="py-1 border-t border-border">
                    <Link 
                      to="/favorites" 
                      className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Saved places
                    </Link>
                    <Link 
                      to="/bookings" 
                      className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My bookings
                    </Link>
                    <Link 
                      to="/itinerary" 
                      className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My itinerary
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground focus:outline-none p-2 rounded-full hover:bg-accent/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={cn(
            "md:hidden mt-2 py-4 bg-background rounded-lg shadow-lg transform transition-all duration-300",
            isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none hidden"
          )}
        >
          <div className="flex flex-col space-y-3 px-4">
            <Link 
              to="/homestays" 
              className="py-2 text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={16} />
              Homestays
            </Link>
            <Link 
              to="/tours" 
              className="py-2 text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <CalendarRange size={16} />
              Tours
            </Link>
            <Link 
              to="/experiences" 
              className="py-2 text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Award size={16} />
              Experiences
            </Link>
            <Link 
              to="/eateries" 
              className="py-2 text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Utensils size={16} />
              Eateries
            </Link>
            <Link 
              to="/hotspots" 
              className="py-2 text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <MapPin size={16} />
              Hotspots
            </Link>
            <Link 
              to="/itinerary" 
              className="py-2 text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Map size={16} />
              Itinerary
            </Link>
            <Link 
              to="/about" 
              className="py-2 text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Info size={16} />
              Our Story
            </Link>
            <Link 
              to="/contact" 
              className="py-2 text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <PhoneCall size={16} />
              Contact
            </Link>
            <hr className="border-t border-border" />
            <Link 
              to="/become-host" 
              className="py-2 text-primary font-semibold flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Landmark size={16} />
              Become a Host
            </Link>
            <Link 
              to="/login" 
              className="py-2 text-foreground flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={16} />
              Account
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
