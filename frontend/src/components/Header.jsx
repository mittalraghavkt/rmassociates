import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MoreVertical, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      // Hysteresis: only flip state when crossing distinct thresholds.
      // This prevents jitter near the boundary.
      setIsScrolled((prev) => {
        if (prev && y < 30) return false;
        if (!prev && y > 110) return true;
        return prev;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Why Choose Us', path: '/why-us' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="sticky top-0 z-50 shadow-md">
      {/* Top Contact Bar */}
      <div className="bg-blue-950 text-white py-2 border-b border-blue-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-2">
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <a
                href="tel:9521452288"
                className="flex items-center gap-2 hover:text-green-300 transition-colors duration-300"
                data-testid="header-phone-link"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+91 9521452288</span>
              </a>
              <a
                href="mailto:mittalraghavkt@gmail.com"
                className="flex items-center gap-2 hover:text-green-300 transition-colors duration-300"
                data-testid="header-email-link"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">mittalraghavkt@gmail.com</span>
                <span className="sm:hidden">Email</span>
              </a>
            </div>
            <div className="text-blue-100 text-xs hidden md:block">
              ICAI Qualified Chartered Accountants
            </div>
          </div>
        </div>
      </div>

      {/* Logo + Mobile Menu Bar */}
      <div
        className="bg-white border-b border-blue-100"
        style={{
          paddingTop: isScrolled ? '0.4rem' : '0.85rem',
          paddingBottom: isScrolled ? '0.4rem' : '0.85rem',
          transition: 'padding 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-3 flex-1 justify-center sm:justify-start"
              data-testid="logo-link"
            >
              <img
                src="/images/ca-india-logo.png"
                alt="CA India Logo"
                className="logo-img"
                style={{
                  width: isScrolled ? '46px' : '64px',
                  height: isScrolled ? '46px' : '64px',
                  objectFit: 'contain',
                  transition: 'width 0.45s cubic-bezier(0.16, 1, 0.3, 1), height 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  flexShrink: 0,
                }}
              />
              <div className="text-center sm:text-left overflow-hidden">
                <h1
                  className="text-blue-900 font-bold leading-tight tracking-wide whitespace-nowrap"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isScrolled ? '1.25rem' : '1.875rem',
                    transition: 'font-size 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  Raghav Mittal &amp; Associates
                </h1>
                <div
                  className="flex items-center justify-center sm:justify-start gap-2"
                  style={{
                    marginTop: isScrolled ? '0.1rem' : '0.3rem',
                    transition: 'margin-top 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <span className="h-px bg-green-600 w-6 sm:w-10"></span>
                  <p
                    className="text-blue-700 font-medium uppercase"
                    style={{
                      fontSize: isScrolled ? '0.55rem' : '0.7rem',
                      letterSpacing: '0.25em',
                      transition: 'font-size 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    Chartered Accountants
                  </p>
                  <span className="h-px bg-green-600 w-6 sm:w-10"></span>
                </div>
              </div>
            </Link>

            {/* Mobile Menu Toggle (three dots) */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors flex-shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-blue-900" />
              ) : (
                <MoreVertical className="w-6 h-6 text-blue-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Bar */}
      <nav
        className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-t border-blue-700/50 shadow-inner hidden lg:block"
        data-testid="main-nav"
      >
        <div className="container mx-auto px-2">
          <div className="flex justify-center items-center overflow-x-auto scrollbar-hide">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`relative px-5 py-3 text-sm font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 group ${
                    isActive ? 'text-white' : 'text-blue-100 hover:text-white'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-green-400 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-3/4'
                    }`}
                  />
                  <span className="absolute inset-0 bg-green-600/0 group-hover:bg-green-600/15 transition-all duration-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu (slides down) */}
      <div
        className={`lg:hidden bg-blue-900 overflow-hidden transition-all duration-400 ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <nav className="flex flex-col py-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`mobile-nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 border-l-4 ${
                  isActive
                    ? 'text-white border-l-green-400 bg-blue-800/60'
                    : 'text-blue-100 border-l-transparent hover:text-white hover:border-l-green-400 hover:bg-blue-800/40'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Header;
