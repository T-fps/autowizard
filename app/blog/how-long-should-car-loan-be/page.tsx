"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Calculator, AlertTriangle, CheckCircle } from 'lucide-react';
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
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">Car Loans</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">How Long Should Your Car Loan Be?</h1>
          <p className="text-xl text-slate-600">Understanding loan terms, interest costs, and why shorter is usually better.</p>
        </header>

        <div className="prose prose-lg max-w-none text-slate-600">
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-8">
            <p className="text-indigo-800 m-0 flex items-start gap-3">
              <Calculator className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Ideal Loan Length:</strong> Financial experts recommend 48 months (4 years) for new cars and 36 months (3 years) for used cars. Avoid 72+ month loans whenever possible.</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Common Car Loan Terms</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-700">36 mo</div>
              <div className="text-sm text-green-600">Best Value</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-700">48 mo</div>
              <div className="text-sm text-green-600">Recommended</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-amber-700">60 mo</div>
              <div className="text-sm text-amber-600">Acceptable</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-700">72+ mo</div>
              <div className="text-sm text-red-600">Avoid</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">How Loan Length Affects Your Costs</h2>
          <p>On a $30,000 car at 7% APR:</p>
          
          <div className="overflow-x-auto my-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 font-bold text-slate-900">Loan Term</th>
                  <th className="text-left py-3 font-bold text-slate-900">Monthly Payment</th>
                  <th className="text-left py-3 font-bold text-slate-900">Total Interest</th>
                  <th className="text-left py-3 font-bold text-slate-900">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 bg-green-50"><td className="py-3 font-semibold">36 months</td><td>$926</td><td className="text-green-600">$3,336</td><td>$33,336</td></tr>
                <tr className="border-b border-slate-200 bg-green-50/50"><td className="py-3 font-semibold">48 months</td><td>$718</td><td className="text-green-600">$4,464</td><td>$34,464</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">60 months</td><td>$594</td><td className="text-amber-600">$5,640</td><td>$35,640</td></tr>
                <tr className="border-b border-slate-200 bg-red-50/50"><td className="py-3 font-semibold">72 months</td><td>$511</td><td className="text-red-600">$6,792</td><td>$36,792</td></tr>
                <tr className="bg-red-50"><td className="py-3 font-semibold">84 months</td><td>$453</td><td className="text-red-600 font-bold">$8,052</td><td>$38,052</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-6 my-6">
            <p className="text-amber-400 font-semibold mb-2">The Real Cost of &quot;Affordable&quot; Payments</p>
            <p className="text-sm">Choosing a 84-month loan over 36-month costs you <span className="text-red-400 font-bold">$4,716 more in interest</span>—enough for a nice vacation or a down payment on your next car.</p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The &quot;Underwater&quot; Problem with Long Loans</h2>
          <p>Cars depreciate faster than you pay them off with long loans. This means you can owe more than the car is worth—called being &quot;underwater&quot; or having &quot;negative equity.&quot;</p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-amber-800">Example of Negative Equity</p>
                <p className="text-sm text-amber-700 mt-2">You buy a $35,000 car with a 72-month loan. After 3 years:</p>
                <ul className="text-sm text-amber-700 mt-2 space-y-1">
                  <li>• Car is worth: ~$18,000 (48% depreciation)</li>
                  <li>• You still owe: ~$20,000</li>
                  <li>• Negative equity: <span className="font-bold">-$2,000</span></li>
                </ul>
                <p className="text-sm text-amber-700 mt-2">If you need to sell or trade, you&apos;d have to pay $2,000 out of pocket!</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">When Longer Loans Make Sense</h2>
          <p>There are limited situations where a 60-month loan is acceptable:</p>
          <ul className="space-y-2 my-4">
            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> <span>You&apos;re getting a 0% APR promotional rate from the manufacturer</span></li>
            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> <span>You have excellent credit and qualify for rates under 4%</span></li>
            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> <span>You&apos;re putting 20%+ down and plan to keep the car 10+ years</span></li>
            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> <span>You have investments earning more than your loan rate</span></li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Loan Length by Vehicle Type</h2>
          
          <div className="space-y-4 my-6">
            <div className="bg-slate-50 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900">New Cars</h4>
              <p className="text-sm">Maximum recommended: <span className="font-bold text-amber-600">60 months</span>. Ideal: 48 months or less.</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900">Used Cars (1-3 years old)</h4>
              <p className="text-sm">Maximum recommended: <span className="font-bold text-amber-600">48 months</span>. Ideal: 36 months.</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900">Used Cars (4+ years old)</h4>
              <p className="text-sm">Maximum recommended: <span className="font-bold text-amber-600">36 months</span>. The car shouldn&apos;t outlive the loan.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">If You Can Only Afford Long-Term Payments</h2>
          <p>If you need 72+ months to afford the payment, consider these alternatives:</p>
          <ul className="space-y-2 my-4">
            <li><strong>Buy a less expensive car:</strong> Find one that fits a 48-60 month budget</li>
            <li><strong>Save for a larger down payment:</strong> Wait 6-12 months while saving</li>
            <li><strong>Consider a quality used car:</strong> 2-3 year old vehicles offer great value</li>
            <li><strong>Look into leasing:</strong> Lower monthly costs without long-term debt</li>
          </ul>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Find Cars That Fit Your Budget</h3>
            <p className="text-slate-700 mb-6">Tell us your ideal monthly payment, and we&apos;ll recommend vehicles you can afford with a sensible loan term.</p>
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
            <Link href="/blog/what-credit-score-to-buy-car" className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <span className="text-amber-600 font-medium">What Credit Score Do You Need?</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
