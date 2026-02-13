"use client";

import React, { useState, useEffect } from 'react';
import { X, Mail, Gift, Check } from 'lucide-react';

interface NewsletterPopupProps {
  delay?: number; // ms before showing (default: 30000 = 30s)
  exitIntent?: boolean; // show on exit intent
}

export default function NewsletterPopup({ delay = 30000, exitIntent = true }: NewsletterPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already subscribed or dismissed
    const dismissed = localStorage.getItem('newsletter_dismissed');
    const subscribed = localStorage.getItem('newsletter_subscribed');
    
    if (dismissed || subscribed) return;

    // Timer-based popup
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && exitIntent) {
        setIsVisible(true);
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
  }, [delay, exitIntent]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('newsletter_dismissed', Date.now().toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;

    setLoading(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'popup',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        localStorage.setItem('newsletter_subscribed', 'true');
        setTimeout(() => setIsVisible(false), 3000);
      }
    } catch (error) {
      console.error('Subscribe error:', error);
    } finally {
      setLoading(false);
    }
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

        {!submitted ? (
          <>
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Get the Free Car Buyer's Checklist
              </h2>
              <p className="text-amber-100">
                Plus weekly tips to save thousands on your next car
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 text-lg"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading || !email.includes('@')}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-lg rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Me the Checklist'}
                </button>
              </div>

              {/* Benefits */}
              <div className="mt-6 space-y-2">
                {[
                  '21-point inspection checklist',
                  'Negotiation scripts that work',
                  'Hidden fees to avoid',
                  'Weekly market updates',
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-green-600" />
                    {benefit}
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400 text-center mt-4">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          </>
        ) : (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              You're In! 🎉
            </h2>
            <p className="text-slate-600">
              Check your inbox for the checklist. Welcome to the smart car buyers club!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
