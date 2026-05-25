import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

// CA INDIA Logo with tricolor checkmark (Indian flag colors)
const CaIndiaLogo = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    {/* Outer C */}
    <path
      d="M 95 30 A 40 40 0 1 0 95 90"
      fill="none"
      stroke="#1e3a8a"
      strokeWidth="9"
      strokeLinecap="round"
    />
    {/* A letter inside */}
    <path
      d="M 50 80 L 62 40 L 74 80 M 55 65 L 69 65"
      fill="none"
      stroke="#1e3a8a"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Tricolor check mark */}
    <g transform="translate(28, 35)">
      <path d="M 0 14 L 8 22 L 26 0" fill="none" stroke="#ff9933" strokeWidth="4" strokeLinecap="round" />
      <path d="M 0 22 L 8 30 L 26 8" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" stroke-opacity="0.95" />
      <path d="M 0 22 L 8 30 L 26 8" fill="none" stroke="#138808" strokeWidth="3" strokeLinecap="round" strokeDasharray="0,0" opacity="0.9" transform="translate(0, 4)" />
    </g>
    {/* INDIA text */}
    <text x="60" y="108" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" textAnchor="middle" fill="#1e3a8a" letterSpacing="2">
      INDIA
    </text>
  </svg>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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

  return (
    <div className="sticky top-0 z-50 shadow-md">
      {/* Top Bar - Contact Details */}
      <div className="bg-blue-950 text-white py-2 border-b border-blue-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-2">
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <a
                href="tel:9521452288"
                className="flex items-center gap-2 hover:text-green-300 transition-colors duration-200"
                data-testid="header-phone-link"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+91 9521452288</span>
              </a>
              <a
                href="mailto:mittalraghavkt@gmail.com"
                className="flex items-center gap-2 hover:text-green-300 transition-colors duration-200"
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

      {/* Logo Bar */}
      <div className={`bg-white transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'} border-b border-blue-100`}>
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center justify-center sm:justify-start gap-3" data-testid="logo-link">
            <CaIndiaLogo size={isScrolled ? 48 : 60} />
            <div className="text-center sm:text-left">
              <h1
                className="text-blue-900 font-bold leading-tight tracking-wide"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isScrolled ? '1.5rem' : '1.875rem',
                  transition: 'font-size 0.3s ease',
                }}
              >
                Raghav Mittal &amp; Associates
              </h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                <span className="h-px bg-blue-300 w-6 sm:w-10"></span>
                <p className="text-blue-700 font-medium uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.25em' }}>
                  Chartered Accountants
                </p>
                <span className="h-px bg-blue-300 w-6 sm:w-10"></span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-t border-blue-700/50 shadow-inner" data-testid="main-nav">
        <div className="container mx-auto px-2">
          <div className="flex justify-center items-center overflow-x-auto scrollbar-hide">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`relative px-3 sm:px-5 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 group ${
                    isActive
                      ? 'text-white'
                      : 'text-blue-100 hover:text-white'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Active indicator */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-green-400 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-3/4'
                    }`}
                  />
                  {/* Hover background */}
                  <span className="absolute inset-0 bg-blue-800/0 group-hover:bg-blue-800/60 transition-all duration-200" />
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
