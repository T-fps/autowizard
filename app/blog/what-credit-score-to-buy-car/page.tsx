"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
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
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />7 min read</span>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Credit & Finance</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">What Credit Score Do You Need to Buy a Car?</h1>
          <p className="text-xl text-slate-600">Understanding how your credit score affects car loan rates, and what you can do to get the best deal regardless of your score.</p>
        </header>

        <div className="prose prose-lg max-w-none text-slate-600">
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 mb-8">
            <p className="text-purple-800 m-0"><strong>Quick Answer:</strong> You can get a car loan with almost any credit score, but you&apos;ll get the best rates (under 5% APR) with a score of 720+. Most buyers are approved with scores of 660+. Below 600, expect higher rates or may need a co-signer.</p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Credit Score Ranges &amp; Auto Loan Rates (2026)</h2>
          
          <div className="overflow-x-auto my-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 font-bold text-slate-900">Credit Score</th>
                  <th className="text-left py-3 font-bold text-slate-900">Rating</th>
                  <th className="text-left py-3 font-bold text-slate-900">New Car APR</th>
                  <th className="text-left py-3 font-bold text-slate-900">Used Car APR</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 bg-green-50"><td className="py-3 font-semibold">781-850</td><td>Excellent</td><td className="text-green-600 font-semibold">5.0% - 6.5%</td><td className="text-green-600 font-semibold">6.5% - 8.0%</td></tr>
                <tr className="border-b border-slate-200 bg-green-50/50"><td className="py-3 font-semibold">661-780</td><td>Good</td><td className="text-green-600">6.5% - 9.0%</td><td>8.0% - 11.0%</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">601-660</td><td>Fair</td><td>9.0% - 13.0%</td><td>11.0% - 16.0%</td></tr>
                <tr className="border-b border-slate-200 bg-amber-50"><td className="py-3 font-semibold">501-600</td><td>Poor</td><td className="text-amber-600">13.0% - 18.0%</td><td className="text-amber-600">16.0% - 21.0%</td></tr>
                <tr className="bg-red-50"><td className="py-3 font-semibold">300-500</td><td>Very Poor</td><td className="text-red-600">18.0%+</td><td className="text-red-600">21.0%+</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">How Much Your Credit Score Costs You</h2>
          <p>On a $30,000 car loan over 60 months, here&apos;s what you&apos;d pay in interest:</p>
          
          <div className="bg-slate-900 text-white rounded-xl p-6 my-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                <span>Excellent Credit (5.5% APR)</span>
                <span className="text-green-400 font-bold">$4,400 in interest</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                <span>Good Credit (8% APR)</span>
                <span className="text-amber-400 font-bold">$6,500 in interest</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                <span>Fair Credit (12% APR)</span>
                <span className="text-orange-400 font-bold">$10,000 in interest</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Poor Credit (18% APR)</span>
                <span className="text-red-400 font-bold">$15,500 in interest</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-4">Difference between excellent and poor credit: <span className="text-white font-bold">$11,100</span></p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Can You Get a Car Loan With Bad Credit?</h2>
          <p>Yes, but expect challenges:</p>
          <ul className="space-y-2 my-4">
            <li><strong>Higher interest rates</strong> - Potentially 15-25% APR</li>
            <li><strong>Larger down payment required</strong> - Often 20% or more</li>
            <li><strong>Shorter loan terms</strong> - May be limited to 36-48 months</li>
            <li><strong>Vehicle restrictions</strong> - May be limited to certain cars or price ranges</li>
            <li><strong>Co-signer may be needed</strong> - Someone with good credit to guarantee the loan</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">How to Improve Your Auto Loan Chances</h2>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-slate-900">Before Applying</span>
              </div>
              <ul className="text-sm space-y-2">
                <li>• Check your credit report for errors</li>
                <li>• Pay down existing credit card debt</li>
                <li>• Don&apos;t open new credit accounts</li>
                <li>• Save for a larger down payment</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                <span className="font-semibold text-slate-900">When Shopping</span>
              </div>
              <ul className="text-sm space-y-2">
                <li>• Get pre-approved before visiting dealers</li>
                <li>• Compare rates from multiple lenders</li>
                <li>• Consider credit unions (often lower rates)</li>
                <li>• Shop within a 14-day window to minimize credit hits</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Best Options by Credit Score</h2>
          
          <div className="space-y-4 my-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="font-semibold text-green-800">720+ (Excellent)</h4>
              <p className="text-sm text-green-700">Shop aggressively for 0% financing deals from manufacturers. You qualify for the best rates everywhere.</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-800">660-719 (Good)</h4>
              <p className="text-sm text-blue-700">Check credit unions first—they often beat bank rates by 1-2%. You&apos;ll still get competitive offers.</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h4 className="font-semibold text-amber-800">600-659 (Fair)</h4>
              <p className="text-sm text-amber-700">Consider larger down payment to offset rate. Look into manufacturer subprime programs.</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-red-800">Below 600 (Poor)</h4>
              <p className="text-sm text-red-700">Consider a co-signer, buy a less expensive car, or wait 6 months while improving credit.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Find Cars That Fit Your Budget</h3>
            <p className="text-slate-700 mb-6">Regardless of your credit score, we can help you find the perfect car. Tell us your budget and needs, and get personalized recommendations.</p>
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
