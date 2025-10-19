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

  // Toggle user menu
  const toggleUserMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isUserMenuOpen) setIsUserMenuOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-bold text-primary group-hover:scale-105 transition-all duration-300">
              Trip<span className="text-secondary">&</span>Treat
            </span>
            <span className="hidden 2xl:inline-block text-xs text-muted-foreground ml-2 mt-2">
              Manipur Delights
            </span>
          </Link>

          <div className="hidden 2xl:flex items-center space-x-6 xl:space-x-8">
            <Link to="/homestays" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <Home size={16} />
              Homestays
            </Link>
            <Link to="/hotspots" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <MapPin size={16} />
              Hotspots
            </Link>
            <Link to="/eateries" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <Utensils size={16} />
              Eateries
            </Link>
            <Link to="/experiences" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <Award size={16} />
              Experiences
            </Link>
            <Link to="/tours" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <CalendarRange size={16} />
              Tours
            </Link>
            <Link to="/itinerary" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <Map size={16} />
              Itinerary
            </Link>
            <Link to="/store" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <ShoppingBag size={16} />
              Store
            </Link>
            <Link to="/transport" className="text-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-105">
              <Train size={16} />
              Transport
            </Link>
          </div>

          <div className="hidden 2xl:flex items-center space-x-4">
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

              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-background rounded-lg shadow-lg overflow-hidden border border-border animate-fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                   {user ? (
                    <>
                      <div className="p-4 border-b border-border">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={profile?.avatar_url} alt="User avatar" />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {profile?.first_name?.[0]}
                              {profile?.last_name?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {profile?.first_name} {profile?.last_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        {(isAdmin || isHost) && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {isAdmin && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                                Admin
                              </span>
                            )}
                            {isHost && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                Host
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="py-1">
                        <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent" onClick={() => setIsUserMenuOpen(false)}>
                          <UserCircle className="h-4 w-4 mr-3" />
                          My Profile
                        </Link>
                        <Link to="/bookings" className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent" onClick={() => setIsUserMenuOpen(false)}>
                          <BookOpen className="h-4 w-4 mr-3" />
                          My Bookings
                        </Link>
                        <Link to="/itinerary" className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent" onClick={() => setIsUserMenuOpen(false)}>
                          <Map className="h-4 w-4 mr-3" />
                          My Itinerary
                        </Link>
                         <Link to="/about" className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent" onClick={() => setIsUserMenuOpen(false)}>
                          <Book className="h-4 w-4 mr-3" />
                          Our Story
                        </Link>
                        <Link to="/contact" className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent" onClick={() => setIsUserMenuOpen(false)}>
                          <Mail className="h-4 w-4 mr-3" />
                          Contact
                        </Link>
                      </div>

                      {isAdmin && (
                        <div className="py-1 border-t border-border">
                          <Link to="/admin" className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent" onClick={() => setIsUserMenuOpen(false)}>
                            <LayoutDashboard className="h-4 w-4 mr-3" />
                            Admin Dashboard
                          </Link>
                        </div>
                      )}

                      <div className="py-1 border-t border-border">
                        <button onClick={handleSignOut} className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-accent hover:text-red-600">
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign out
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-3 border-b border-border">
                        <p className="font-medium">Welcome</p>
                        <p className="text-sm text-muted-foreground">Sign in to your account</p>
                      </div>
                      <div className="py-1">
                        <Link to="/auth" className="block px-4 py-2 text-sm text-foreground hover:bg-accent" onClick={() => setIsUserMenuOpen(false)}>
                          Sign in
                        </Link>
                        <Link to="/auth" state={{ tab: 'signup' }} className="block px-4 py-2 text-sm text-foreground hover:bg-accent" onClick={() => setIsUserMenuOpen(false)}>
                          Create account
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="2xl:hidden flex items-center space-x-2">
            {user && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10"
                onClick={() => navigate('/profile')}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url} alt="User avatar" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {profile?.first_name?.[0]}
                    {profile?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </Button>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground focus:outline-none p-2 rounded-full hover:bg-accent/50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            '2xl:hidden mt-2 py-4 bg-background rounded-lg shadow-xl transform transition-all duration-300 absolute w-[calc(100%-2rem)] left-1/2 -translate-x-1/2 border border-border',
            isMenuOpen
              ? 'opacity-100 translate-y-0 visible'
              : 'opacity-0 -translate-y-4 invisible'
          )}
        >
          <div className="flex flex-col space-y-3 px-4">
            <Link to="/homestays" className="py-2 text-foreground hover:text-primary flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Home size={16} /> Homestays
            </Link>
            <Link to="/tours" className="py-2 text-foreground hover:text-primary flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <CalendarRange size={16} /> Tours
            </Link>
            <Link to="/experiences" className="py-2 text-foreground hover:text-primary flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Award size={16} /> Experiences
            </Link>
            <Link to="/eateries" className="py-2 text-foreground hover:text-primary flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Utensils size={16} /> Eateries
            </Link>
            <Link to="/hotspots" className="py-2 text-foreground hover:text-primary flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <MapPin size={16} /> Hotspots
            </Link>
            <Link to="/itinerary" className="py-2 text-foreground hover:text-primary flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Map size={16} /> Itinerary
            </Link>
            <Link to="/store" className="py-2 text-foreground hover:text-primary flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <ShoppingBag size={16} /> Store
            </Link>
            <Link to="/transport" className="py-2 text-foreground hover:text-primary flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Train size={16} /> Transport
            </Link>
            <Link to="/about" className="py-2 text-foreground hover:text-primary flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Info size={16} /> Our Story
            </Link>
            <Link to="/contact" className="py-2 text-foreground hover:text-primary flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <PhoneCall size={16} /> Contact
            </Link>
            <hr className="border-t border-border" />
            <Link to="/become-host" className="py-2 text-primary font-semibold flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Landmark size={16} /> Become a Host
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="py-2 text-foreground hover:text-primary flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <User size={16} /> My Profile
                </Link>
                <Link to="/bookings" className="py-2 text-foreground hover:text-primary flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <BookOpen size={16} /> My Bookings
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="py-2 text-foreground hover:text-primary flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <LayoutDashboard size={16} /> Admin Dashboard
                  </Link>
                )}
                <button
                  className="py-2 text-red-500 hover:text-red-600 flex items-center gap-2 w-full text-left"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </>
            ) : (
              <Link to="/auth" className="py-2 text-foreground flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
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