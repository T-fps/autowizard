"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Car } from 'lucide-react';
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
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />January 22, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />8 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">What Car Should I Buy? The Complete Decision Guide</h1>
          <p className="text-xl text-slate-500">A comprehensive framework to help you find the perfect vehicle for your lifestyle, budget, and preferences.</p>
        </header>

        <div className="prose prose prose-amber max-w-none">
          <div className="bg-amber-100 border border-amber-200 rounded-2xl p-6 mb-8">
            <p className="text-amber-700 m-0 flex items-start gap-3">
              <Car className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Quick Answer:</strong> Take our free vehicle matching assessment to get personalized recommendations based on your specific needs, lifestyle, and budget.</span>
            </p>
            <Link href="/quiz" className="inline-block mt-4 px-6 py-2 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors">
              Take Free Assessment →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Understanding Your Needs</h2>
          <p className="text-slate-600 mb-4">Before diving into specific makes and models, it's crucial to understand what you actually need from a vehicle. The right car for a daily commuter is very different from the right car for a growing family or outdoor enthusiast.</p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Key Questions to Ask Yourself</h3>
          <p className="text-slate-600 mb-4">Start by considering these fundamental questions:</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li>How many passengers do you regularly transport?</li>
            <li>What's your typical daily commute distance?</li>
            <li>Do you need cargo space for equipment, gear, or regular hauling?</li>
            <li>What driving conditions do you face (city, highway, off-road, weather)?</li>
            <li>How important is fuel efficiency vs. performance?</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Budget Considerations</h2>
          <p className="text-slate-600 mb-4">Your budget extends beyond the sticker price. Consider the total cost of ownership including insurance, fuel, maintenance, and depreciation. A cheaper car upfront might cost more over time.</p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">The 20/4/10 Rule</h3>
          <p className="text-slate-600 mb-4">Financial experts recommend: 20% down payment, 4-year loan maximum, and total transportation costs under 10% of gross income. This helps ensure your car purchase doesn't strain your finances.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">New vs. Used: Making the Right Choice</h2>
          <p className="text-slate-600 mb-4">Both options have merit. New cars offer warranties, latest features, and no hidden history. Used cars provide better value, lower insurance costs, and slower depreciation. Certified pre-owned vehicles offer a middle ground with inspection guarantees.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Body Style Breakdown</h2>
          <p className="text-slate-600 mb-4">Each body style serves different needs:</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>Sedans:</strong> Best for commuters, fuel efficiency, and comfortable highway driving</li>
            <li><strong>SUVs:</strong> Versatile for families, cargo, and varying weather conditions</li>
            <li><strong>Trucks:</strong> Essential for towing, hauling, and work requirements</li>
            <li><strong>Hatchbacks:</strong> Urban-friendly with surprising cargo flexibility</li>
            <li><strong>Minivans:</strong> Maximum family utility and passenger comfort</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Powertrain Options in 2026</h2>
          <p className="text-slate-600 mb-4">Today's market offers more powertrain choices than ever: traditional gas engines, hybrids, plug-in hybrids, and fully electric vehicles. Your choice depends on driving patterns, charging access, and environmental priorities.</p>

          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-semibold text-amber-600 mb-4">Ready to Find Your Perfect Match?</h3>
            <p className="text-slate-600 mb-6">Our vehicle matching assessment analyzes 25 factors about your lifestyle and preferences to recommend the ideal vehicles for you.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Start Free Assessment
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/best-cars-under-30k" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-600">Best Cars Under $30K in 2026</span>
            </Link>
            <Link href="/blog/electric-vs-hybrid" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-600">Electric vs Hybrid: Which is Right for You?</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
