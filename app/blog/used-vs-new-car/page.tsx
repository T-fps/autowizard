"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Scale } from 'lucide-react';
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
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />December 4, 2025</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />11 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Used vs New Car: Which Should You Buy?</h1>
          <p className="text-xl text-slate-500">A comprehensive analysis to help you decide between buying new or used based on your situation.</p>
        </header>

        <div className="prose prose prose-amber max-w-none">
          <div className="bg-amber-100 border border-amber-200 rounded-2xl p-6 mb-8">
            <p className="text-amber-700 m-0 flex items-start gap-3">
              <Scale className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>The Truth:</strong> Neither is universally better. The right choice depends on your budget, how long you'll keep the car, and your tolerance for risk.</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Case for Buying New</h2>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Full Warranty Coverage</h3>
          <p className="text-slate-600 mb-4">New cars come with comprehensive warranties (typically 3-5 years bumper-to-bumper). Everything is covered, giving you peace of mind.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Latest Safety Technology</h3>
          <p className="text-slate-600 mb-4">Safety features advance rapidly. A 2026 vehicle has significantly better crash protection and accident avoidance technology than a 2020 model.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">No Hidden History</h3>
          <p className="text-slate-600 mb-4">You know exactly how the car has been treated because you're the first owner. No concerns about previous accidents, neglected maintenance, or abuse.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Better Financing Rates</h3>
          <p className="text-slate-600 mb-4">New car loans typically have lower interest rates than used car loans. Manufacturers sometimes offer 0% APR promotions.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Case for Buying Used</h2>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Significant Cost Savings</h3>
          <p className="text-slate-600 mb-4">A 3-year-old car typically costs 40-50% less than the same model new. That's real money you can invest elsewhere.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Slower Depreciation</h3>
          <p className="text-slate-600 mb-4">New cars lose 20-30% of their value in the first year. Used cars depreciate more slowly, meaning you lose less money over time.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Lower Insurance Costs</h3>
          <p className="text-slate-600 mb-4">Insurance premiums are based partly on vehicle value. A less expensive used car costs less to insure.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">More Car for Your Money</h3>
          <p className="text-slate-600 mb-4">Your $35,000 budget might buy a base model new, or a fully-loaded version (or a premium brand) used.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Middle Ground: Certified Pre-Owned</h2>
          <p className="text-slate-600 mb-4">CPO vehicles offer many benefits of both new and used:</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li>Manufacturer inspection and reconditioning</li>
            <li>Extended warranty coverage (often matching new car warranties)</li>
            <li>Vehicle history verification</li>
            <li>Lower price than new with more confidence than private sale</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Decision Framework</h2>
          <p className="text-slate-600 mb-4"><strong>Buy New if:</strong></p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li>You plan to keep the car 7+ years (amortizes the depreciation)</li>
            <li>You want specific features or colors only available new</li>
            <li>You qualify for excellent financing rates</li>
            <li>Latest safety technology is a priority</li>
            <li>You value warranty peace of mind highly</li>
          </ul>

          <p className="text-slate-600 mb-4"><strong>Buy Used if:</strong></p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li>You want to maximize value per dollar</li>
            <li>You change cars every 3-5 years</li>
            <li>You're comfortable with some uncertainty</li>
            <li>You can pay cash or have good credit for used car rates</li>
            <li>You want a premium vehicle at a mainstream price</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">What About the Current Market?</h2>
          <p className="text-slate-600 mb-4">Used car prices have normalized somewhat from pandemic highs, but the gap between new and used remains smaller than historical norms. This makes new cars relatively more attractive than usual, especially when manufacturer incentives are available.</p>

          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-semibold text-amber-600 mb-4">Get Personalized Recommendations</h3>
            <p className="text-slate-600 mb-6">Our assessment considers your budget and preferences to recommend specific vehicles—new, used, or CPO.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Take Free Assessment
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/best-cars-under-30k" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-600">Best Cars Under $30K</span>
            </Link>
            <Link href="/blog/how-to-choose-a-car" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-600">How to Choose a Car</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
