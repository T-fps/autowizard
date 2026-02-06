"use client";

import Link from 'next/link';
import { useState } from 'react';
import { X, Check, Send, Menu, Scale, Home, DollarSign, Target, BookOpen, Sparkles, Search } from 'lucide-react';

const LOGO_SRC = "/logo.png";

// Navigation items - single source of truth
const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/brands', label: 'Search', icon: Search },
  { href: '/compare', label: 'Compare', icon: Scale },
  { href: '/value', label: 'Value', icon: DollarSign },
  { href: '/quiz', label: 'CarMatch™', icon: Target },
  { href: '/blog', label: 'Articles', icon: BookOpen },
];

export default function Navigation() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sendEmail = () => {
    setTimeout(() => {
      setEmailSent(true);
      setTimeout(() => {
        setShowEmailModal(false);
        setEmailSent(false);
        setEmailAddress('');
      }, 2000);
    }, 1000);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" onClick={closeMobileMenu}>
              <img src={LOGO_SRC} alt="Auto Wizard" className="h-14 md:h-20 w-auto" />
            </Link>

            {/* Desktop Navigation - Centered between logo and CTA */}
            <nav className="hidden md:flex items-center justify-center flex-1 px-4">
              <div className="flex items-center gap-1 lg:gap-2">
                {navItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="px-3 lg:px-4 py-2 rounded-lg text-slate-700 font-bold hover:text-amber-600 hover:bg-amber-50 transition-all text-sm lg:text-base whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Right side: CTA + Mobile menu button */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link 
                href="/services" 
                className="hidden sm:block px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25 text-sm whitespace-nowrap"
              >
                Premium Services
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-700 hover:text-amber-600 hover:bg-amber-50 transition-all"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-3 pt-3 pb-2 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 font-semibold hover:text-amber-600 hover:bg-amber-50 transition-all"
                  >
                    <item.icon className="w-5 h-5 text-amber-500" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
              
              {/* Mobile Premium Services CTA */}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <Link 
                  href="/services"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
                >
                  <Sparkles className="w-5 h-5" />
                  Premium Services
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md w-full shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-slate-900">Email Results</h3>
              <button onClick={() => setShowEmailModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            {emailSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-amber-600" />
                </div>
                <p className="text-lg text-slate-900">Sent!</p>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 mb-4 focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={sendEmail}
                  disabled={!emailAddress.includes('@')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />Send
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
