"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, DollarSign } from 'lucide-react';
import PageWrapper from '../../components/shared/PageWrapper';

export default function BlogPost() {
  return (
    <PageWrapper>
      <article className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Wizard's Guide
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />January 8, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />12 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Best Cars Under $30K in 2026</h1>
          <p className="text-xl text-slate-500">Top picks across every category that deliver exceptional value without breaking the bank.</p>
        </header>

        <div className="prose prose prose-amber max-w-none">
          <div className="bg-amber-100 border border-amber-200 rounded-2xl p-6 mb-8">
            <p className="text-amber-700 m-0 flex items-start gap-3">
              <DollarSign className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Budget Tip:</strong> The best value often comes from last year's models or well-equipped base trims rather than stripped-down versions of expensive cars.</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Best Sedans Under $30K</h2>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Honda Civic ($24,950 - $29,950)</h3>
          <p className="text-slate-600 mb-4">The benchmark for compact sedans. Excellent fuel economy, refined driving dynamics, and Honda's legendary reliability. The Sport trim offers the best balance of features and value.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Mazda3 ($23,950 - $28,950)</h3>
          <p className="text-slate-600 mb-4">Premium feel at a non-premium price. Best-in-class interior quality and engaging handling make the Mazda3 feel more expensive than it is.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Hyundai Elantra ($22,500 - $27,500)</h3>
          <p className="text-slate-600 mb-4">Striking design, loaded with tech, and backed by an excellent warranty. The Elantra Hybrid offers 54 mpg combined for ultimate efficiency.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Best SUVs Under $30K</h2>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Mazda CX-30 ($24,950 - $29,950)</h3>
          <p className="text-slate-600 mb-4">Upscale interior, sharp handling, and available AWD make the CX-30 a standout in the subcompact SUV segment.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Hyundai Tucson ($29,250)</h3>
          <p className="text-slate-600 mb-4">Just squeaking under budget, the Tucson offers bold styling, spacious interior, and hybrid availability.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Kia Seltos ($24,990 - $29,490)</h3>
          <p className="text-slate-600 mb-4">Practical, well-equipped, and affordable. The Seltos punches above its weight with features usually found in pricier vehicles.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Best Trucks Under $30K</h2>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Ford Maverick ($23,850 - $29,850)</h3>
          <p className="text-slate-600 mb-4">The game-changer. Standard hybrid powertrain delivers 42 mpg city, with genuine truck utility. The best-value truck on the market.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Hyundai Santa Cruz ($27,750 - $29,950)</h3>
          <p className="text-slate-600 mb-4">Sport adventure vehicle that combines car-like driving with pickup versatility. Unique lockable bed storage is genuinely useful.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Used Car Sweet Spots</h2>
          <p className="text-slate-600 mb-4">With $30K for a used vehicle, you can access premium brands and features. Look for 2-3 year old vehicles with remaining warranty coverage. Best bets include the Lexus ES, BMW 3 Series, and Toyota 4Runner.</p>

          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-semibold text-amber-600 mb-4">Find Your Perfect Match Within Budget</h3>
            <p className="text-slate-600 mb-6">Tell us your budget and preferences, and we'll recommend the best options for you.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Take Free Assessment
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/used-vs-new-car" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-600">Used vs New: Which is Better?</span>
            </Link>
            <Link href="/blog/first-car-buying-guide" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-600">First Car Buying Guide</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
