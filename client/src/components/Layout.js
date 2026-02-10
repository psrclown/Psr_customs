import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Layout Component - Wraps all pages with Navbar and Footer
 */
const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/booking', label: 'Book Now' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-950/95 backdrop-blur-md border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="font-display font-bold text-xl md:text-2xl text-primary-500 group-hover:text-primary-400 transition-colors">
                PSR
              </span>
              <span className="font-display font-medium text-lg md:text-xl text-white">
                Customs
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-400 hover:text-primary-400 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admin"
                className="text-dark-400 hover:text-dark-300 text-sm transition-colors"
              >
                Admin
              </Link>
              <Link to="/booking" className="btn-primary text-sm py-2 px-4">
                Book Appointment
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-dark-900 border-t border-dark-800 py-4 animate-fade-in">
            <div className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-primary-400 transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-dark-400 py-2"
              >
                Admin
              </Link>
              <Link
                to="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary text-center"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display font-bold text-xl text-primary-500 mb-4">PSR Customs</h3>
              <p className="text-gray-400 text-sm">
                Premium car detailing & customization studio. Transform your vehicle with professional care.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <p className="text-gray-400 text-sm">Phone: +91 XXXXX XXXXX</p>
              <p className="text-gray-400 text-sm mt-2">Email: info@psrcustoms.com</p>
            </div>
          </div>
          <div className="border-t border-dark-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} PSR Customs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
