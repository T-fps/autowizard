"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, CheckCircle, XCircle, Car, Key } from 'lucide-react';
import PageWrapper from '../../components/shared/PageWrapper';

export default function BlogPost() {
  return (
    <PageWrapper>
      <article className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/blog" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />January 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />9 min read</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Buying Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Lease vs. Buy a Car: Which Is Better in 2026?</h1>
          <p className="text-xl text-slate-600">A comprehensive comparison to help you decide whether leasing or buying makes more financial sense for your situation.</p>
        </header>

        <div className="prose prose-lg max-w-none text-slate-600">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <p className="text-blue-800 m-0"><strong>Quick Answer:</strong> Lease if you want lower monthly payments, drive under 12,000 miles/year, and like getting a new car every 3 years. Buy if you drive a lot, want to customize your car, or plan to keep it long-term to build equity.</p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Leasing vs. Buying at a Glance</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Key className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-900 m-0">Leasing</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> Lower monthly payments</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> Always under warranty</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> New car every 2-3 years</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> Lower down payment</li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> Mileage restrictions</li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> No ownership equity</li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> Wear-and-tear fees</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Car className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-bold text-slate-900 m-0">Buying</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> Build equity/ownership</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> No mileage limits</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> Can modify/customize</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> Eventually payment-free</li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> Higher monthly payments</li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> Repair costs after warranty</li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> Higher down payment</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Cost Comparison: Real Numbers</h2>
          <p>Let&apos;s compare a $35,000 car over 6 years:</p>
          
          <div className="bg-slate-900 text-white rounded-xl p-6 my-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-amber-400 font-semibold mb-3">Leasing (2 x 3-year leases)</h4>
                <div className="space-y-2 text-sm font-mono">
                  <p>Monthly payment: $350 × 72 months = <span className="text-amber-400">$25,200</span></p>
                  <p>Down payments (2): $2,000 × 2 = <span className="text-amber-400">$4,000</span></p>
                  <p>Disposition fees: $300 × 2 = <span className="text-amber-400">$600</span></p>
                  <p className="pt-2 border-t border-slate-700 font-bold">Total spent: <span className="text-red-400">$29,800</span></p>
                  <p>Car owned at end: <span className="text-red-400">$0</span></p>
                </div>
              </div>
              <div>
                <h4 className="text-amber-400 font-semibold mb-3">Buying (5-year loan + 1 year owned)</h4>
                <div className="space-y-2 text-sm font-mono">
                  <p>Monthly payment: $550 × 60 months = <span className="text-amber-400">$33,000</span></p>
                  <p>Down payment: <span className="text-amber-400">$5,000</span></p>
                  <p>Year 6 (no payment): <span className="text-green-400">$0</span></p>
                  <p className="pt-2 border-t border-slate-700 font-bold">Total spent: <span className="text-amber-400">$38,000</span></p>
                  <p>Car value at end: <span className="text-green-400">~$15,000</span></p>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-4">* Net cost of buying: $38,000 - $15,000 = $23,000 (actually cheaper long-term)</p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">When Leasing Makes Sense</h2>
          <ul className="space-y-2 my-4">
            <li><strong>You drive under 12,000-15,000 miles per year</strong> - Excess mileage fees can be $0.15-$0.30 per mile</li>
            <li><strong>You want the latest safety technology</strong> - Always have current driver assistance features</li>
            <li><strong>You&apos;re a business owner</strong> - Lease payments may be tax deductible</li>
            <li><strong>You hate dealing with repairs</strong> - Always under warranty coverage</li>
            <li><strong>You like driving new cars</strong> - Fresh vehicle every 2-3 years</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">When Buying Makes Sense</h2>
          <ul className="space-y-2 my-4">
            <li><strong>You drive 15,000+ miles per year</strong> - No mileage penalties</li>
            <li><strong>You keep cars for 7+ years</strong> - Years of payment-free driving</li>
            <li><strong>You want to customize</strong> - Add aftermarket parts, accessories, or modifications</li>
            <li><strong>You have kids or pets</strong> - No worries about interior wear-and-tear fees</li>
            <li><strong>You want to build equity</strong> - Car becomes an asset you can sell or trade</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Hidden Lease Costs to Watch For</h2>
          <ul className="space-y-2 my-4">
            <li><strong>Acquisition fee:</strong> $395-$995 charged at lease start</li>
            <li><strong>Disposition fee:</strong> $300-$500 charged when you return the car</li>
            <li><strong>Excess mileage:</strong> $0.15-$0.30 per mile over your limit</li>
            <li><strong>Wear and tear:</strong> Charges for dents, stains, or excessive tire wear</li>
            <li><strong>Early termination:</strong> Can cost thousands if you need to end the lease early</li>
          </ul>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Not Sure What&apos;s Right for You?</h3>
            <p className="text-slate-700 mb-6">Answer a few questions about your driving habits and preferences, and we&apos;ll help you find the perfect car—whether you lease or buy.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Try CarMatch™ Free →
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/how-much-car-can-i-afford" className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <span className="text-amber-600 font-medium">How Much Car Can I Afford?</span>
            </Link>
            <Link href="/blog/how-long-should-car-loan-be" className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <span className="text-amber-600 font-medium">How Long Should Your Car Loan Be?</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
