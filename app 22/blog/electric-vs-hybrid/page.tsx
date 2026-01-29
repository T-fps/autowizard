"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Zap } from 'lucide-react';
import PageWrapper from '../../components/shared/PageWrapper';

export default function BlogPost() {
  return (
    <PageWrapper>
      <article className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/blog" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Wizard's Guide
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />January 15, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />10 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Electric vs Hybrid: Which is Right for You?</h1>
          <p className="text-xl text-slate-500">Understanding the differences between EVs, hybrids, and plug-in hybrids to make the best choice for your lifestyle.</p>
        </header>

        <div className="prose prose prose-amber max-w-none">
          <div className="bg-amber-100 border border-amber-200 rounded-2xl p-6 mb-8">
            <p className="text-amber-700 m-0 flex items-start gap-3">
              <Zap className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Quick Answer:</strong> Choose electric if you have home charging and drive under 250 miles daily. Choose hybrid if you need maximum flexibility and can't charge regularly.</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Understanding Your Options</h2>
          <p className="text-slate-600 mb-4">The electrified vehicle market offers three main categories, each with distinct advantages:</p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Battery Electric Vehicles (BEVs)</h3>
          <p className="text-slate-600 mb-4">Fully electric with no gas engine. Examples include Tesla Model 3, Ford Mustang Mach-E, and Hyundai Ioniq 6. They offer the lowest operating costs and zero direct emissions but require charging infrastructure.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Hybrid Electric Vehicles (HEVs)</h3>
          <p className="text-slate-600 mb-4">Combine gas engine with electric motor that recharges through regenerative braking. Toyota Prius and Honda Accord Hybrid are popular examples. No plugging in required, excellent fuel economy.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Plug-in Hybrid Electric Vehicles (PHEVs)</h3>
          <p className="text-slate-600 mb-4">Offer electric-only range (typically 25-50 miles) plus gas backup. Toyota RAV4 Prime and BMW X5 xDrive45e bridge the gap between EVs and traditional hybrids.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Cost Comparison</h2>
          <p className="text-slate-600 mb-4">While EVs typically have higher purchase prices, they often cost less to own over time due to lower fuel and maintenance costs. Federal tax credits up to $7,500 can significantly reduce EV purchase prices.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Charging Considerations</h2>
          <p className="text-slate-600 mb-4">Home charging is the most convenient option for EV owners. A Level 2 charger ($500-1,500 installed) can fully charge most EVs overnight. Public charging networks continue expanding rapidly.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Which Should You Choose?</h2>
          <p className="text-slate-600 mb-4"><strong>Go Electric if:</strong> You can charge at home, your daily driving is under 250 miles, you want lowest operating costs, and you're comfortable with charging planning for road trips.</p>
          <p className="text-slate-600 mb-4"><strong>Go Hybrid if:</strong> You can't charge at home, you frequently take long trips, you want better fuel economy without lifestyle changes, or charging infrastructure is limited in your area.</p>
          <p className="text-slate-600 mb-4"><strong>Go Plug-in Hybrid if:</strong> Most of your driving is short trips (commuting) but you occasionally need long-range flexibility, or you want to try electric driving before fully committing.</p>

          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-semibold text-amber-600 mb-4">Not Sure Which Fits Your Lifestyle?</h3>
            <p className="text-slate-600 mb-6">Our assessment considers your driving patterns, charging access, and preferences to recommend the right powertrain for you.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Take Free Assessment
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/best-commuter-cars" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-600">Best Commuter Cars of 2026</span>
            </Link>
            <Link href="/blog/what-car-should-i-buy" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-600">What Car Should I Buy?</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
