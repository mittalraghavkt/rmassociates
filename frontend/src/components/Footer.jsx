import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
  ];

  const services = [
    { name: 'Taxation Services', path: '/services' },
    { name: 'GST Consultancy', path: '/services' },
    { name: 'Audit Services', path: '/services' },
    { name: 'Company Incorporation', path: '/services' },
  ];

  const CALogo = () => (
    <img
      src="/images/ca-india-logo.png"
      alt="CA India Logo"
      className="w-12 h-12 object-contain bg-white rounded-lg p-1"
    />
  );

  return (
    <footer className="bg-blue-950 text-white" data-testid="main-footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CALogo />
              <div>
                <h3 className="text-lg font-bold">Raghav Mittal & Associates</h3>
                <p className="text-sm text-blue-200">Chartered Accountants</p>
              </div>
            </div>
            <p className="text-blue-100 text-sm">
              Your dedicated partner for comprehensive financial, tax, and compliance solutions. We deliver quality service with integrity and commitment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-200 hover:text-green-300 transition-colors duration-300 text-sm link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="text-blue-200 hover:text-green-300 transition-colors duration-300 text-sm link-underline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-300 flex-shrink-0 mt-1" />
                <span className="text-blue-100 text-sm">
                  Venkatesh Villa, Station Road,<br />
                  Chhabra, Dist. Baran,<br />
                  Rajasthan-325220
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-300" />
                <a href="tel:9521452288" className="text-blue-100 hover:text-white transition-colors text-sm" data-testid="footer-phone">
                  +91 9521452288
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-300" />
                <a href="mailto:mittalraghavkt@gmail.com" className="text-blue-100 hover:text-white transition-colors text-sm" data-testid="footer-email">
                  mittalraghavkt@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-blue-300" />
                <a 
                  href="https://www.linkedin.com/in/caraghavmittal25" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                  data-testid="footer-linkedin"
                >
                  Connect on LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-200 text-sm text-center md:text-left">
              © {currentYear} Raghav Mittal & Associates. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-blue-200">
              <Link to="/" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
