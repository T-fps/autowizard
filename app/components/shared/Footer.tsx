"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Check } from 'lucide-react';

const LOGO_SRC = "/logo.png";

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'footer',
        }),
      });
    } catch (err) {
      // Silent fail
    }

    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-20">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-16 lg:gap-24 mb-8">
          <div className="text-center md:text-left">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img src={LOGO_SRC} alt="Auto Wizard" className="h-16 w-auto" />
            </Link>
            <p className="text-slate-500 text-sm">Your partner in finding the perfect vehicle.</p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-slate-900">Premium Services</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/services" className="hover:text-amber-600 transition-colors">Expert Consultation</Link></li>
              <li><Link href="/services" className="hover:text-amber-600 transition-colors">Customization Support</Link></li>
              <li><Link href="/services" className="hover:text-amber-600 transition-colors">Purchase Assistance</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-slate-900">Free Services</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/" className="hover:text-amber-600 transition-colors">Wizard&apos;s Guide</Link></li>
              <li><Link href="/compare" className="hover:text-amber-600 transition-colors">Compare Cars</Link></li>
              <li><Link href="/quiz" className="hover:text-amber-600 transition-colors">The Car Quiz</Link></li>
              <li><Link href="/brands" className="hover:text-amber-600 transition-colors">Vehicle Search</Link></li>
            </ul>
          </div>
          
          {/* Newsletter Signup */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-slate-900">Stay Updated</h4>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <p className="text-sm text-slate-500 mb-2">Get car buying tips & deals</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 w-40"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Join
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <Check className="w-4 h-4" />
                <span>You&apos;re subscribed!</span>
              </div>
            )}
            <div className="mt-4">
              <Link href="/consultation" className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-500 hover:text-amber-600 transition-colors">
                <Mail className="w-4 h-4 text-amber-500" />autowizardcompany@gmail.com
              </Link>
            </div>
          </div>
        </div>
        
        {/* Affiliate Disclosure */}
        <div className="border-t border-slate-200 pt-6 mb-6">
          <p className="text-xs text-slate-400 text-center max-w-2xl mx-auto">
            <strong>Affiliate Disclosure:</strong> Auto Wizard may earn a commission when you click links to partners like insurance providers and lenders. This helps us keep our tools free. Our recommendations are based on research, not compensation.
          </p>
        </div>
        
        <div className="text-center text-slate-400 text-sm">
          © 2026 Auto Wizard. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
