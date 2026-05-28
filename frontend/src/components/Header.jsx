import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user is on a mobile device (screen width less than 768px)
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // Force the contracted (small) header state ALL the time on mobile screens
        setIsScrolled(true);
      } else {
        // Keep dynamic expand/contract behavior ONLY for desktop screens
        setIsScrolled(window.scrollY > 20);
      }
    };

    // Run the check immediately on mount/load
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Close mobile navigation panel when clicking on links or changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Why Us', path: '/why-us' },
    { name: 'Blog', path: '/blog' },
  ];

  const CALogo = () => (
    <img
      src="/images/ca-india-logo.png"
      alt="CA India Logo"
      className={`object-contain bg-white rounded transition-all duration-300 logo-img ${
        isScrolled ? 'w-8 h-8' : 'w-10 h-10 md:w-12 md:h-12'
      }`}
    />
  );

  return (
    <>
      {/* Top micro-bar containing direct contact links - Hidden on mobile screen views to ensure compact sizing */}
      <div className="hidden md:block bg-blue-950 text-white py-1.5 border-b border-blue-900 text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="tel:9521452288" className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
              <Phone className="w-3.5 h-3.5" /> +91 9521452288
            </a>
            <a href="mailto:mittalraghavkt@gmail.com" className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
              <Mail className="w-3.5 h-3.5" /> mittalraghavkt@gmail.com
            </a>
          </div>
          <div className="text-blue-200 font-medium">Raghav Mittal &amp; Associates</div>
        </div>
      </div>

      {/* Main Navigation Top Bar Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
            : 'bg-white py-4 md:py-5'
        }`}
        data-testid="main-header"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Branding Firm Label Layout */}
            <Link to="/" className="flex items-center space-x-2 md:space-x-3 group select-none">
              <CALogo />
              <div className="flex flex-col">
                <span className={`font-bold text-blue-900 transition-all duration-300 tracking-tight leading-tight group-hover:text-green-700 ${
                  isScrolled ? 'text-base md:text-lg' : 'text-md md:text-xl'
                }`}>
                  Raghav Mittal &amp; Associates
                </span>
                <span className={`text-gray-500 font-medium transition-all duration-300 leading-none ${
                  isScrolled ? 'text-[10px] md:text-xs mt-0.5' : 'text-xs mt-1'
                }`}>
                  Chartered Accountants
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links view items */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-900'
                        : 'text-blue-950 hover:bg-slate-50 hover:text-green-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link to="/contact">
                <Button className="bg-blue-900 hover:bg-green-700 text-white font-semibold shadow-sm transition-all duration-200 px-5">
                  Contact Us
                </Button>
              </Link>
              {user && (
                <Button variant="outline" onClick={logout} className="font-semibold text-red-600 border-red-200 hover:bg-red-50">
                  Logout
                </Button>
              )}
            </div>

            {/* Mobile View Navigation Toggle Menu Trigger Icon Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-blue-900 hover:bg-blue-50 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Panel Backdrop overlay drawer list items */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl animate-fadeIn">
            <div className="px-4 pt-3 pb-6 space-y-1.5 bg-white">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg text-base font-bold transition-all ${
                      isActive
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'text-blue-950 hover:bg-blue-50 hover:text-green-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3">
                <Link to="/contact" className="w-full">
                  <Button className="w-full bg-blue-900 hover:bg-green-700 text-white font-bold py-5 shadow-md">
                    Contact Us
                  </Button>
                </Link>
                {user && (
                  <Button variant="outline" onClick={logout} className="w-full font-bold text-red-600 border-red-200 py-5">
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
