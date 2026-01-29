"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, TrendingDown, Star, Tag } from 'lucide-react';
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
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />January 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />6 min read</span>
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Smart Shopping</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Best Time to Buy a Car: When to Get the Best Deals</h1>
          <p className="text-xl text-slate-600">Timing your purchase right can save you thousands. Here&apos;s when dealers are most motivated to negotiate.</p>
        </header>

        <div className="prose prose-lg max-w-none text-slate-600">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8">
            <p className="text-emerald-800 m-0 flex items-start gap-3">
              <TrendingDown className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Best Overall Time:</strong> Late December (especially the last week) and end of model year (September-October) typically offer the biggest discounts—often $2,000-$5,000 below MSRP.</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Best Months to Buy a Car</h2>
          
          <div className="space-y-4 my-6">
            <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-green-800 m-0">December (Best)</h4>
              </div>
              <p className="text-sm text-green-700 m-0">Dealers push to meet year-end quotas. The last week of December offers the deepest discounts as salespeople scramble for bonuses.</p>
            </div>
            
            <div className="bg-green-50/70 border-l-4 border-green-400 rounded-r-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-green-700 m-0">October-November</h4>
              </div>
              <p className="text-sm text-green-700 m-0">Current model year vehicles get discounted to make room for next year&apos;s models. Great deals on &quot;last year&apos;s&quot; cars.</p>
            </div>
            
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-amber-700 m-0">Holiday Weekends</h4>
              </div>
              <p className="text-sm text-amber-700 m-0">Memorial Day, Labor Day, July 4th, and Black Friday feature manufacturer incentives and dealer promotions.</p>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-blue-700 m-0">End of Month/Quarter</h4>
              </div>
              <p className="text-sm text-blue-700 m-0">Salespeople and dealers have monthly/quarterly quotas. The last few days offer more negotiation flexibility.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Best Days to Buy a Car</h2>
          
          <div className="overflow-x-auto my-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 font-bold text-slate-900">Day</th>
                  <th className="text-left py-3 font-bold text-slate-900">Why It&apos;s Good</th>
                  <th className="text-left py-3 font-bold text-slate-900">Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Monday</td><td>Slower day, salespeople more attentive</td><td className="text-green-600">⭐⭐⭐⭐⭐</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Tuesday</td><td>Still slow, good attention</td><td className="text-green-600">⭐⭐⭐⭐⭐</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Wednesday</td><td>Mid-week deals possible</td><td className="text-green-600">⭐⭐⭐⭐</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Thursday</td><td>Average day</td><td className="text-amber-600">⭐⭐⭐</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Friday</td><td>Busy, less negotiation leverage</td><td className="text-amber-600">⭐⭐</td></tr>
                <tr><td className="py-3 font-semibold">Saturday</td><td>Busiest day—avoid if possible</td><td className="text-red-600">⭐</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Worst Times to Buy a Car</h2>
          <ul className="space-y-2 my-4">
            <li><strong>Spring (March-May):</strong> Tax refunds drive demand up, fewer discounts</li>
            <li><strong>Early summer:</strong> Vacation buyers increase competition</li>
            <li><strong>Saturday afternoons:</strong> Peak traffic, salespeople less flexible</li>
            <li><strong>When you NEED a car immediately:</strong> Desperation kills negotiating power</li>
            <li><strong>Right after model launch:</strong> New releases have no discounts</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Potential Savings by Timing</h2>
          
          <div className="bg-slate-900 text-white rounded-xl p-6 my-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span>End of December (last week)</span>
                <span className="text-green-400 font-bold">$2,000 - $5,000 off</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span>Model year clearance (Sept-Oct)</span>
                <span className="text-green-400">$3,000 - $6,000 off</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span>Holiday weekend sales</span>
                <span className="text-amber-400">$1,000 - $3,000 off</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span>End of month</span>
                <span className="text-amber-400">$500 - $1,500 off</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Random Tuesday in April</span>
                <span className="text-slate-400">MSRP or minimal discount</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Pro Tips for Maximum Savings</h2>
          <ul className="space-y-2 my-4">
            <li><strong>Stack your advantages:</strong> Shop end of month + end of year + weekday</li>
            <li><strong>Get pre-approved:</strong> Having financing ready strengthens your position</li>
            <li><strong>Research invoice pricing:</strong> Know the dealer&apos;s cost before negotiating</li>
            <li><strong>Email multiple dealers:</strong> Create competition for your business</li>
            <li><strong>Be willing to walk away:</strong> The best deals come when you&apos;re not desperate</li>
          </ul>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Ready to Find Your Perfect Car?</h3>
            <p className="text-slate-700 mb-6">No matter when you&apos;re buying, knowing exactly what you want gives you negotiating power. Let us help you find the right car.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Try CarMatch™ Free →
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/lease-vs-buy-car" className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <span className="text-amber-600 font-medium">Lease vs. Buy: Which Is Right?</span>
            </Link>
            <Link href="/blog/how-much-car-can-i-afford" className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <span className="text-amber-600 font-medium">How Much Car Can I Afford?</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
