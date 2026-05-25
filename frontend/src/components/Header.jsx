import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Why Choose Us', path: '/why-us' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  // CA Logo - ICAI inspired emblem
  const CALogo = () => (
    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-2 border-blue-800 shadow-sm">
      <div className="text-center leading-none">
        <div className="text-blue-900 font-bold text-xs tracking-tight">CA</div>
        <div className="w-8 h-0.5 bg-blue-700 mx-auto my-0.5"></div>
        <div className="text-blue-700 font-semibold" style={{ fontSize: '7px', letterSpacing: '0.5px' }}>ICAI</div>
      </div>
    </div>
  );

  return (
    <>
      {/* Top Bar - Contact Details Only */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:9521452288" className="flex items-center gap-2 hover:text-blue-200 transition-colors" data-testid="header-phone-link">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">+91 9521452288</span>
              </a>
              <a href="mailto:mittalraghavkt@gmail.com" className="flex items-center gap-2 hover:text-blue-200 transition-colors" data-testid="header-email-link">
                <Mail className="w-4 h-4" />
                <span className="hidden md:inline">mittalraghavkt@gmail.com</span>
              </a>
            </div>
            <div className="text-xs sm:text-sm text-blue-100">
              Professional Financial & Tax Services
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-md'
            : 'bg-white border-b border-blue-100'
        }`}
        data-testid="main-header"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3" data-testid="logo-link">
              <CALogo />
              <div>
                <h1 className="text-xl font-bold text-blue-900">Raghav Mittal & Associates</h1>
                <p className="text-xs text-blue-700">Chartered Accountants</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-blue-900 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-blue-900" />
              ) : (
                <Menu className="w-6 h-6 text-blue-900" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-blue-100 animate-fadeIn">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`mobile-nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-blue-900 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
