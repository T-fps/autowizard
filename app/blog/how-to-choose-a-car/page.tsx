"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Target } from 'lucide-react';
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
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />December 25, 2025</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />15 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">How to Choose a Car: The Ultimate Step-by-Step Guide</h1>
          <p className="text-xl text-white/60">A systematic approach to finding the perfect vehicle, from initial research to final purchase.</p>
        </header>

        <div className="prose prose-invert prose-amber max-w-none">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mb-8">
            <p className="text-amber-200 m-0 flex items-start gap-3">
              <Target className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Pro Tip:</strong> The biggest mistake car buyers make is shopping for a specific car before understanding their actual needs. Start with requirements, not preferences.</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Step 1: Define Your Requirements</h2>
          <p className="text-white/70 mb-4">Before looking at any vehicles, write down your non-negotiable requirements. These are things you absolutely need, not things you want.</p>
          
          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Passenger Capacity</h3>
          <p className="text-white/70 mb-4">How many people do you regularly transport? Be realistic - if you occasionally need 7 seats, consider whether renting makes more sense than buying a larger vehicle you rarely fill.</p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Cargo Needs</h3>
          <p className="text-white/70 mb-4">What do you regularly haul? Sports equipment, work tools, weekly groceries? Measure your largest regular cargo items.</p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Driving Conditions</h3>
          <p className="text-white/70 mb-4">City traffic, highway commuting, rough weather, off-road adventures? Different vehicles excel in different conditions.</p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Step 2: Set Your Budget</h2>
          <p className="text-white/70 mb-4">Calculate your total car budget, not just the purchase price. Include insurance, fuel, maintenance, parking, and registration.</p>
          
          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Monthly Payment Guidelines</h3>
          <ul className="text-white/70 space-y-2 mb-6">
            <li>Total transportation costs should be under 15% of monthly income</li>
            <li>Put at least 10-20% down to avoid being underwater</li>
            <li>Keep loan terms to 48 months or less</li>
            <li>Factor in insurance before committing (get quotes early)</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Step 3: Research Vehicle Categories</h2>
          <p className="text-white/70 mb-4">Now that you know your requirements, identify which vehicle categories meet them. Don't jump to specific models yet - understand your options.</p>
          <ul className="text-white/70 space-y-2 mb-6">
            <li><strong>Sedans:</strong> Best for commuters prioritizing fuel efficiency and driving comfort</li>
            <li><strong>Hatchbacks:</strong> Sedan efficiency with cargo versatility</li>
            <li><strong>Compact SUVs:</strong> Elevated driving position, moderate cargo, good fuel economy</li>
            <li><strong>Mid-size SUVs:</strong> Balance of space, efficiency, and capability</li>
            <li><strong>3-Row SUVs:</strong> Family haulers with maximum passenger capacity</li>
            <li><strong>Trucks:</strong> When you need to tow or haul regularly</li>
            <li><strong>Minivans:</strong> Maximum family utility (don't dismiss them!)</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Step 4: Create Your Shortlist</h2>
          <p className="text-white/70 mb-4">Research 3-5 specific vehicles that meet your requirements and budget. Read professional reviews, owner forums, and reliability data. Key resources:</p>
          <ul className="text-white/70 space-y-2 mb-6">
            <li>Consumer Reports for reliability data</li>
            <li>IIHS and NHTSA for safety ratings</li>
            <li>Edmunds and Car and Driver for professional reviews</li>
            <li>Owner forums for real-world experiences</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Step 5: Test Drive Strategically</h2>
          <p className="text-white/70 mb-4">Test drives should evaluate, not impress. Bring your car seat, measure your cargo, drive your actual commute route. Take notes immediately after each drive.</p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Step 6: Negotiate and Purchase</h2>
          <p className="text-white/70 mb-4">Get quotes from multiple dealers. Know the fair market value before negotiating. Be willing to walk away - there's always another car.</p>

          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-semibold text-amber-400 mb-4">Skip Steps 1-4 With Our Assessment</h3>
            <p className="text-white/70 mb-6">Our vehicle matching assessment analyzes your lifestyle and requirements to generate a personalized shortlist in minutes.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Take Free Assessment
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/used-vs-new-car" className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-400">Used vs New: Which is Better?</span>
            </Link>
            <Link href="/blog/best-cars-under-30k" className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-400">Best Cars Under $30K</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
