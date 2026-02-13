"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Check, ArrowRight, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;

    setLoading(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'footer',
        }),
      });

      if (response.ok) {
        setSubscribed(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Subscribe error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Get Smarter About Cars
              </h3>
              <p className="text-slate-400">
                Weekly tips, market insights, and exclusive deals. Join 10,000+ smart car buyers.
              </p>
            </div>
            
            {subscribed ? (
              <div className="flex items-center gap-3 text-green-400">
                <Check className="w-6 h-6" />
                <span className="text-lg font-medium">You're subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? '...' : 'Subscribe'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Auto Wizard" className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-slate-400 mb-4">
              Your partner in finding the perfect vehicle since 2024.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-white mb-4">Free Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/quiz" className="hover:text-amber-400 transition-colors">Car Matchmaking Quiz</Link></li>
              <li><Link href="/compare" className="hover:text-amber-400 transition-colors">Compare Vehicles</Link></li>
              <li><Link href="/brands" className="hover:text-amber-400 transition-colors">Browse by Brand</Link></li>
              <li><Link href="/best" className="hover:text-amber-400 transition-colors">Best Cars 2026</Link></li>
              <li><Link href="/blog" className="hover:text-amber-400 transition-colors">Buying Guides</Link></li>
            </ul>
          </div>

          {/* Premium */}
          <div>
            <h4 className="font-semibold text-white mb-4">Premium</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pro" className="hover:text-amber-400 transition-colors">Wizard Pro</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Consultation</Link></li>
              <li><Link href="/pro#concierge" className="hover:text-amber-400 transition-colors">Concierge Service</Link></li>
              <li><Link href="/pro#pricing" className="hover:text-amber-400 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/how-to-choose-a-car" className="hover:text-amber-400 transition-colors">How to Choose a Car</Link></li>
              <li><Link href="/blog/car-financing-guide" className="hover:text-amber-400 transition-colors">Financing Guide</Link></li>
              <li><Link href="/blog/lease-vs-buy-car" className="hover:text-amber-400 transition-colors">Lease vs Buy</Link></li>
              <li><Link href="/blog/best-time-to-buy-car" className="hover:text-amber-400 transition-colors">Best Time to Buy</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Affiliate Disclosure */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-300">Affiliate Disclosure:</strong> Auto Wizard may earn a commission 
              from purchases made through links on this site. This comes at no additional cost to you and helps 
              support our free tools and content. Our recommendations are based on genuine research and are not 
              influenced by affiliate partnerships. We only recommend products and services we believe will 
              benefit our users. For more information, please see our{' '}
              <Link href="/privacy" className="text-amber-400 hover:underline">Privacy Policy</Link> and{' '}
              <Link href="/terms" className="text-amber-400 hover:underline">Terms of Service</Link>.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Auto Wizard. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
