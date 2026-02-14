"use client";

import React, { useState, useEffect } from 'react';
import { X, Mail, Gift, Check } from 'lucide-react';

interface NewsletterPopupProps {
  delay?: number; // milliseconds before showing
  exitIntent?: boolean; // show on exit intent
}

export default function NewsletterPopup({ 
  delay = 30000, 
  exitIntent = true 
}: NewsletterPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already subscribed or dismissed recently
    const dismissed = localStorage.getItem('newsletter-dismissed');
    const subscribed = localStorage.getItem('newsletter-subscribed');
    
    if (dismissed || subscribed) {
      const dismissedTime = parseInt(dismissed || '0');
      // Show again after 7 days if dismissed
      if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
        return;
      }
    }

    // Timer-based popup
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, delay);

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (exitIntent && e.clientY < 10 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    if (exitIntent) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      clearTimeout(timer);
      if (exitIntent) {
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [delay, exitIntent, hasShown]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('newsletter-dismissed', Date.now().toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'popup',
        }),
      });
    } catch (err) {
      // Silent fail
    }

    setSubmitted(true);
    localStorage.setItem('newsletter-subscribed', 'true');
    
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header gradient */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Gift className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Free Car Buying Guide</h2>
          </div>
          <p className="text-amber-100">
            Get our expert guide + weekly tips to find your perfect car
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {!submitted ? (
            <>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-slate-700">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Insider negotiation tactics that save thousands</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Best time to buy (and when to avoid dealers)</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Hidden fees to watch out for</span>
                </li>
              </ul>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all"
                >
                  Send Me the Guide
                </button>
              </form>

              <p className="text-xs text-slate-400 text-center mt-4">
                No spam, ever. Unsubscribe anytime.
              </p>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">You&apos;re In!</h3>
              <p className="text-slate-600">
                Check your inbox for the free guide. Happy car hunting!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
