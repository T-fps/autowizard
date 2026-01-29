"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, DollarSign, Calculator } from 'lucide-react';
import PageWrapper from '../../components/shared/PageWrapper';

export default function BlogPost() {
  return (
    <PageWrapper>
      <article className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />January 29, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />7 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">How Much Car Can I Afford? The Complete Guide</h1>
          <p className="text-xl text-slate-600">Use these proven formulas and rules to determine exactly how much you should spend on your next vehicle.</p>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="bg-amber-100 border border-amber-200 rounded-2xl p-6 mb-8">
            <p className="text-amber-800 m-0 flex items-start gap-3">
              <Calculator className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Quick Rule:</strong> Your total car costs (payment + insurance + gas) should not exceed 15-20% of your monthly take-home pay.</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The 20/4/10 Rule Explained</h2>
          <p className="text-slate-600 mb-4">Financial experts recommend the 20/4/10 rule for car buying:</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>20% down payment</strong> - Put at least 20% down to avoid being underwater on your loan</li>
            <li><strong>4-year loan maximum</strong> - Keep your loan to 48 months or less to minimize interest</li>
            <li><strong>10% of gross income</strong> - Your monthly payment shouldn&apos;t exceed 10% of your gross monthly income</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Calculate Your Car Budget</h2>
          <p className="text-slate-600 mb-4">Here&apos;s a simple way to calculate how much car you can afford:</p>
          
          <div className="bg-slate-100 rounded-xl p-6 my-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Budget Calculator Example</h3>
            <div className="space-y-3 text-slate-600">
              <p><strong>Monthly Take-Home Pay:</strong> $5,000</p>
              <p><strong>Maximum for Car Costs (15%):</strong> $750/month</p>
              <p><strong>Estimated Insurance:</strong> -$150/month</p>
              <p><strong>Estimated Gas:</strong> -$150/month</p>
              <p><strong>Available for Payment:</strong> $450/month</p>
              <p className="pt-3 border-t border-slate-300"><strong>Approximate Car Price:</strong> $20,000-$25,000</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Hidden Costs to Consider</h2>
          <p className="text-slate-600 mb-4">The purchase price is just the beginning. Factor in these ongoing costs:</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>Insurance:</strong> $100-$300/month depending on coverage and driving history</li>
            <li><strong>Gas:</strong> $100-$300/month based on driving habits and fuel efficiency</li>
            <li><strong>Maintenance:</strong> $50-$100/month averaged over the year</li>
            <li><strong>Registration & Taxes:</strong> Varies by state, can be $200-$1,000+ annually</li>
            <li><strong>Parking:</strong> $0-$300/month in urban areas</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Income-Based Guidelines</h2>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-slate-600">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="text-left py-3 font-semibold text-slate-900">Annual Income</th>
                  <th className="text-left py-3 font-semibold text-slate-900">Recommended Max Price</th>
                  <th className="text-left py-3 font-semibold text-slate-900">Monthly Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200"><td className="py-3">$40,000</td><td className="py-3">$12,000-$16,000</td><td className="py-3">$250-$330</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3">$60,000</td><td className="py-3">$18,000-$24,000</td><td className="py-3">$375-$500</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3">$80,000</td><td className="py-3">$24,000-$32,000</td><td className="py-3">$500-$665</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3">$100,000</td><td className="py-3">$30,000-$40,000</td><td className="py-3">$625-$830</td></tr>
                <tr><td className="py-3">$150,000</td><td className="py-3">$45,000-$60,000</td><td className="py-3">$940-$1,250</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">New vs. Used: Budget Impact</h2>
          <p className="text-slate-600 mb-4">Your budget goes further with a used car. A 3-year-old vehicle typically costs 40-50% less than new while still having years of reliable service ahead.</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>$25,000 budget new:</strong> Base model compact sedan or crossover</li>
            <li><strong>$25,000 budget used:</strong> Well-equipped mid-size SUV or luxury sedan</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">When to Stretch Your Budget</h2>
          <p className="text-slate-600 mb-4">It may make sense to spend slightly more if:</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li>You drive 20,000+ miles per year (fuel efficiency matters more)</li>
            <li>Safety features could protect your family</li>
            <li>Reliability will save on repairs and rental cars</li>
            <li>You plan to keep the car for 10+ years</li>
          </ul>

          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-semibold text-amber-600 mb-4">Find Cars in Your Budget</h3>
            <p className="text-slate-600 mb-6">Tell us your budget and lifestyle, and we&apos;ll recommend the best cars that fit your financial situation.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Try CarMatch™ Free
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/best-cars-under-30k" className="p-4 rounded-xl bg-slate-100 hover:border-amber-400 border border-slate-200 transition-colors">
              <span className="text-amber-600">Best Cars Under $30,000</span>
            </Link>
            <Link href="/blog/what-credit-score-to-buy-car" className="p-4 rounded-xl bg-slate-100 hover:border-amber-400 border border-slate-200 transition-colors">
              <span className="text-amber-600">What Credit Score Do You Need?</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
