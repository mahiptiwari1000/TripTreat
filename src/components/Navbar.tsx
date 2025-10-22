import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  User,
  Map,
  Home,
  Landmark,
  Utensils,
  Info,
  PhoneCall,
  MapPin,
  CalendarRange,
  Award,
  ShoppingBag,
  LogOut,
  UserCircle,
  LayoutDashboard,
  BookOpen,
  Train,
  Mail,
  Book,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const { user, profile, signOut, isAdmin, isHost } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleUserMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (isUserMenuOpen) setIsUserMenuOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
<div className="container mx-auto px-2.5 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
<span className="text-lg md:text-xl font-bold text-primary group-hover:scale-105 transition-all duration-300 whitespace-nowrap">
              Trip<span className="text-secondary">&</span>Treat
            </span>
<span className="hidden md:inline-block text-[9px] md:text-[11px] text-muted-foreground ml-2 mt-[1px] whitespace-nowrap">
              Manipur Delights
            </span>
          </Link>

<div className="hidden md:flex flex-wrap items-center space-x-2 md:space-x-3 lg:space-x-4 ml-6 lg:ml-10">
            <Link to="/homestays" className="text-[12.5px] md:text-[13.5px] lg:text-[14.5px]
 text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <Home size={16} /> Homestays
            </Link>
            <Link to="/hotspots" className="text-sm md:text-base text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <MapPin size={16} /> Hotspots
            </Link>
            <Link to="/eateries" className="text-sm md:text-base text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <Utensils size={16} /> Eateries
            </Link>
            <Link to="/experiences" className="text-sm md:text-base text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <Award size={16} /> Experiences
            </Link>
            <Link to="/tours" className="text-sm md:text-base text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <CalendarRange size={16} /> Tours
            </Link>
            <Link to="/itinerary" className="text-sm md:text-base text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <Map size={16} /> Itinerary
            </Link>
            <Link to="/store" className="text-sm md:text-base text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <ShoppingBag size={16} /> Store
            </Link>
            <Link to="/transport" className="text-sm md:text-base text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <Train size={16} /> Transport
            </Link>
            <Link to="/about" className="text-sm md:text-base text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <Info size={16} /> Our Story
            </Link>
            <Link to="/contact" className="text-sm md:text-base text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <PhoneCall size={16} /> Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
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

            <div className="relative">
              {user ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10"
                  onClick={toggleUserMenu}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url} alt="User avatar" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {profile?.first_name?.[0]}
                      {profile?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground rounded-full hover:bg-primary/10"
                  onClick={toggleUserMenu}
                >
                  <User size={20} className="transition-transform hover:scale-110" />
                </Button>
              )}
            </div>
          </div>

          {/* Hamburger visible on small screens */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground focus:outline-none p-2 rounded-full hover:bg-accent/50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden mt-2 py-4 bg-background rounded-lg shadow-xl transform transition-all duration-300 absolute w-[calc(100%-2rem)] left-1/2 -translate-x-1/2 border border-border',
            isMenuOpen
              ? 'opacity-100 translate-y-0 visible'
              : 'opacity-0 -translate-y-4 invisible'
          )}
        >
          <div className="flex flex-col space-y-3 px-4 text-sm">
            {[
              ['homestays', Home, 'Homestays'],
              ['hotspots', MapPin, 'Hotspots'],
              ['eateries', Utensils, 'Eateries'],
              ['experiences', Award, 'Experiences'],
              ['tours', CalendarRange, 'Tours'],
              ['itinerary', Map, 'Itinerary'],
              ['store', ShoppingBag, 'Store'],
              ['transport', Train, 'Transport'],
              ['about', Info, 'Our Story'],
              ['contact', PhoneCall, 'Contact'],
            ].map(([to, Icon, label]) => (
              <Link
                key={to}
                to={`/${to}`}
                className="flex items-center gap-2 text-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon size={16} /> {label}
              </Link>
            ))}

            <hr className="border-t border-border" />
            <Link
              to="/become-host"
              className="py-2 text-primary font-semibold flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Landmark size={16} /> Become a Host
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <User size={16} /> My Profile
                </Link>
                <Link to="/bookings" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <BookOpen size={16} /> My Bookings
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <LayoutDashboard size={16} /> Admin Dashboard
                  </Link>
                )}
                <button
                  className="text-red-500 flex items-center gap-2"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </>
            ) : (
              <Link to="/auth" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <User size={16} /> Sign In / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
