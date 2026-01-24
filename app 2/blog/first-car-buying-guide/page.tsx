"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, GraduationCap } from 'lucide-react';
import PageWrapper from '../../components/shared/PageWrapper';

export default function BlogPost() {
  return (
    <PageWrapper>
      <article className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/blog" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Wizard's Guide
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-white/50 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />January 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />12 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">First Car Buying Guide: Everything You Need to Know</h1>
          <p className="text-xl text-white/60">Expert advice for first-time car buyers navigating the process with confidence.</p>
        </header>

        <div className="prose prose-invert prose-amber max-w-none">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mb-8">
            <p className="text-amber-200 m-0 flex items-start gap-3">
              <GraduationCap className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>First-Timer Tip:</strong> Your first car doesn't need to be your dream car. Focus on reliability, safety, and affordability. You can upgrade later.</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Best First Cars in 2026</h2>
          <p className="text-white/70 mb-4">These vehicles offer the ideal combination of reliability, safety, affordability, and low insurance costs:</p>
          
          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Honda Civic</h3>
          <p className="text-white/70 mb-4">The gold standard for first cars. Excellent reliability, great fuel economy, affordable maintenance, and strong resale value. Both new and used Civics are smart choices.</p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Toyota Corolla</h3>
          <p className="text-white/70 mb-4">Legendary reliability and the lowest ownership costs in the segment. The hybrid version offers 50+ mpg for maximum fuel savings.</p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Mazda3</h3>
          <p className="text-white/70 mb-4">If you want something more engaging to drive. Premium interior feel, excellent safety ratings, and Mazda's improving reliability record.</p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Hyundai Elantra</h3>
          <p className="text-white/70 mb-4">Best warranty in the business (5-year/60,000-mile basic, 10-year/100,000-mile powertrain). Modern tech and striking design at an affordable price.</p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Subaru Crosstrek</h3>
          <p className="text-white/70 mb-4">If you need AWD for weather or light adventures. Excellent safety ratings and great visibility make it ideal for new drivers.</p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">New vs. Used for First-Timers</h2>
          <p className="text-white/70 mb-4"><strong>Arguments for Used:</strong> Lower price, lower insurance, less financial risk if you make mistakes (dings, minor accidents), slower depreciation.</p>
          <p className="text-white/70 mb-4"><strong>Arguments for New:</strong> Full warranty coverage, latest safety features, no unknown history, available 0% financing.</p>
          <p className="text-white/70 mb-4"><strong>Sweet Spot:</strong> Certified Pre-Owned (CPO) vehicles offer warranty protection with used car pricing. 2-3 year old vehicles with remaining factory warranty are ideal.</p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Insurance Considerations</h2>
          <p className="text-white/70 mb-4">First-time drivers face higher insurance rates. Keep costs down by:</p>
          <ul className="text-white/70 space-y-2 mb-6">
            <li>Choosing vehicles in lower insurance groups (sedans over sports cars)</li>
            <li>Taking defensive driving courses</li>
            <li>Maintaining good grades (if under 25)</li>
            <li>Bundling with parents' policy if possible</li>
            <li>Opting for higher deductibles if you have emergency savings</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Financing Your First Car</h2>
          <p className="text-white/70 mb-4">Without established credit, you may need a co-signer or larger down payment. Options include:</p>
          <ul className="text-white/70 space-y-2 mb-6">
            <li>Credit unions often offer better rates for first-time buyers</li>
            <li>Manufacturer financing programs for recent graduates</li>
            <li>Saving for a larger down payment to reduce loan amount</li>
            <li>Starting with a less expensive car to build credit</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Cars to Avoid as a First Car</h2>
          <ul className="text-white/70 space-y-2 mb-6">
            <li><strong>Luxury vehicles:</strong> High insurance, expensive maintenance</li>
            <li><strong>Sports cars:</strong> Sky-high insurance for young drivers</li>
            <li><strong>Large trucks/SUVs:</strong> Harder to maneuver, expensive to fuel</li>
            <li><strong>Very old cars:</strong> May lack modern safety features</li>
            <li><strong>Modified vehicles:</strong> Unknown reliability, insurance complications</li>
          </ul>

          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-semibold text-amber-400 mb-4">Find Your Perfect First Car</h3>
            <p className="text-white/70 mb-6">Our assessment considers your budget, needs, and experience level to recommend ideal first vehicles.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Take Free Assessment
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/best-cars-under-30k" className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-400">Best Cars Under $30K</span>
            </Link>
            <Link href="/blog/used-vs-new-car" className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-400">Used vs New: Which is Better?</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
