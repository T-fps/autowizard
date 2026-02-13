"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, AlertTriangle, DollarSign, XCircle, CheckCircle, Info, TrendingDown, Lightbulb } from 'lucide-react';
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
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />February 1, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />9 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">The $7,500 EV Tax Credit is Gone: What Buyers Need to Know in 2026</h1>
          <p className="text-xl text-slate-600">The federal EV incentive ended September 30, 2025. Here&apos;s what changed, what still exists, and how to still get a good deal on an electric car.</p>
        </header>

        <div className="prose prose-amber max-w-none">
          <div className="bg-red-100 border border-red-200 rounded-2xl p-6 mb-8">
            <p className="text-red-700 m-0 flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Key Deadline Passed:</strong> The federal $7,500 EV tax credit ended on September 30, 2025. The $4,000 used EV credit also expired. All EV tax credits will fully sunset on January 1, 2027.</span>
            </p>
          </div>

          <p className="text-slate-600 mb-4">Let&apos;s rip off the bandage: the generous federal EV tax credits that made electric cars accessible to millions of Americans are effectively gone. The &quot;One Big Beautiful Bill&quot; signed in July 2025 accelerated the end of these incentives, and as of September 30, 2025, most buyers can no longer claim them.</p>
          
          <p className="text-slate-600 mb-4">But here&apos;s the thing: the EV market didn&apos;t collapse. Prices are adjusting, used EVs are becoming more affordable, and hybrids are filling the gap. Let&apos;s break down exactly what happened and what your options are now.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">What Changed on September 30, 2025</h2>

          <div className="space-y-4 my-8">
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-200">
              <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900">$7,500 New EV Credit — EXPIRED</h3>
                <p className="text-red-700 text-sm mt-1">The full $7,500 tax credit for new electric vehicles ended September 30, 2025. Only buyers with binding contracts and deposits made before that date can still claim it.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-200">
              <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900">$4,000 Used EV Credit — EXPIRED</h3>
                <p className="text-red-700 text-sm mt-1">The 30% credit (up to $4,000) for used EVs under $25,000 also ended on September 30, 2025.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-amber-900">$7,500 Lease Credit — LIMITED</h3>
                <p className="text-amber-700 text-sm mt-1">Some manufacturers can still access commercial credits on leased vehicles, but these are much more restricted and vary by automaker.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-amber-900">EV Charger Credit — ENDING JUNE 30, 2026</h3>
                <p className="text-amber-700 text-sm mt-1">The home EV charger installation credit (30% up to $1,000) will end after June 30, 2026. If you&apos;re planning to install a charger, do it before then.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-100 rounded-xl border border-slate-200">
              <Info className="w-6 h-6 text-slate-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900">All Credits End — JANUARY 1, 2027</h3>
                <p className="text-slate-600 text-sm mt-1">Every remaining EV tax credit will fully sunset on January 1, 2027, ending the Inflation Reduction Act&apos;s EV incentive program entirely.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Who Can Still Claim the Credit?</h2>

          <p className="text-slate-600 mb-4">There&apos;s a narrow window for some buyers. The IRS confirmed that if you had a binding purchase contract with a down payment before September 30, 2025, you can still claim the credit even if delivery happened later. This &quot;time of sale&quot; loophole extends eligibility into early 2026 for some.</p>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 my-6">
            <h3 className="font-semibold text-green-800 mb-4">You May Still Qualify If:</h3>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>You signed a binding purchase contract before Sept 30, 2025</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>You made a down payment or deposit before the deadline</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>You have a dealer &quot;time of sale&quot; report documenting the transaction</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>The vehicle otherwise met all eligibility requirements</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">What Replaced the Tax Credit</h2>

          <p className="text-slate-600 mb-4">The &quot;One Big Beautiful Bill&quot; introduced a new tax deduction (not credit) for auto loan interest. But let&apos;s be real: it&apos;s not a replacement.</p>

          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-4 font-semibold text-slate-900">Feature</th>
                  <th className="text-center p-4 font-semibold text-green-600">Old EV Credit</th>
                  <th className="text-center p-4 font-semibold text-amber-600">New Interest Deduction</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="p-4 text-slate-900">Type</td>
                  <td className="p-4 text-center text-green-600">Tax Credit (reduces tax owed)</td>
                  <td className="p-4 text-center text-amber-600">Tax Deduction (reduces income)</td>
                </tr>
                <tr className="border-t border-slate-200 bg-slate-50">
                  <td className="p-4 text-slate-900">Maximum Value</td>
                  <td className="p-4 text-center text-green-600 font-bold">$7,500</td>
                  <td className="p-4 text-center text-amber-600">~$2,500*</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 text-slate-900">Applies To</td>
                  <td className="p-4 text-center text-green-600">Qualifying EVs only</td>
                  <td className="p-4 text-center text-amber-600">All vehicles (gas, hybrid, EV)</td>
                </tr>
                <tr className="border-t border-slate-200 bg-slate-50">
                  <td className="p-4 text-slate-900">Income Limits</td>
                  <td className="p-4 text-center">$150K single / $300K joint</td>
                  <td className="p-4 text-center">$100K single / $200K joint</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 text-slate-900">Requirements</td>
                  <td className="p-4 text-center">US assembly, battery sourcing</td>
                  <td className="p-4 text-center">US assembly, financed purchase</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-500 mb-4">*Estimated value depends on tax bracket and loan interest paid</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">State Incentives Still Exist</h2>

          <p className="text-slate-600 mb-4">Even though federal credits are gone, many states maintain their own EV incentive programs. These vary widely but can still save you thousands:</p>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900">California</h4>
              <p className="text-blue-700 text-sm">Clean Vehicle Rebate Project (CVRP) — up to $7,500 for income-qualified buyers</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900">Colorado</h4>
              <p className="text-blue-700 text-sm">State tax credit up to $5,000 for new EVs</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900">New Jersey</h4>
              <p className="text-blue-700 text-sm">$4,000 rebate + sales tax exemption</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900">New York</h4>
              <p className="text-blue-700 text-sm">Drive Clean Rebate — up to $2,000</p>
            </div>
          </div>

          <p className="text-slate-600 mb-4">Check your state&apos;s DMV or energy office website for current incentives. Many utility companies also offer rebates for EV charger installation.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Silver Lining: Market Adjustments</h2>

          <p className="text-slate-600 mb-4">Here&apos;s what the headlines aren&apos;t telling you: the end of tax credits is forcing some positive market changes.</p>

          <div className="space-y-4 my-8">
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
              <TrendingDown className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900">New EV Prices Are Dropping</h3>
                <p className="text-green-700 text-sm mt-1">Average new EV transaction price fell from $48,500 in 2022 to $35,900 in 2025. Manufacturers are competing on price now that they can&apos;t rely on subsidies.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
              <TrendingDown className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900">Used EV Prices Crashing</h3>
                <p className="text-green-700 text-sm mt-1">Used EV prices are now only $900 above comparable gas cars. With 330,000 EVs coming off lease in 2026, prices will fall further.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
              <Lightbulb className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900">Aggressive Manufacturer Incentives</h3>
                <p className="text-green-700 text-sm mt-1">Hyundai, Kia, Ford, and others are offering large discounts and low-rate financing to move inventory. The $10,000 discount on Ioniq 5? That&apos;s not a tax credit—it&apos;s a dealer incentive.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Your Best Options in 2026</h2>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
              <div className="text-3xl mb-3">🔋</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Buy a Used EV</h3>
              <p className="text-slate-600 text-sm mb-4">Lease returns flooding the market mean 3-year-old EVs with warranty remaining at steep discounts. A used Tesla Model Y or Ioniq 5 could be under $30,000.</p>
              <Link href="/blog/used-ev-buying-guide-2026" className="text-amber-600 text-sm font-medium hover:underline">Read our Used EV Guide →</Link>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Buy a Hybrid</h3>
              <p className="text-slate-600 text-sm mb-4">Hybrids never qualified for the EV credit anyway, so nothing changed for them. Get 45-50 MPG with no range anxiety and no charging infrastructure needed.</p>
              <Link href="/blog/best-hybrid-cars-2026" className="text-green-600 text-sm font-medium hover:underline">See Best Hybrids of 2026 →</Link>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Lease a New EV</h3>
              <p className="text-slate-600 text-sm mb-4">Some manufacturers can still access commercial credits on leases and pass savings to consumers. Check current lease offers—they may be better than you think.</p>
              <Link href="/consultation" className="text-blue-600 text-sm font-medium hover:underline">Get Expert Help →</Link>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Install a Charger Now</h3>
              <p className="text-slate-600 text-sm mb-4">The EV charger installation credit (30% up to $1,000) ends June 30, 2026. If you&apos;re planning to go electric, install your home charger before then.</p>
              <span className="text-purple-600 text-sm font-medium">Deadline: June 30, 2026</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Bottom Line</h2>

          <p className="text-slate-600 mb-4">Yes, losing the $7,500 tax credit hurts. But the EV market is adapting. Prices are falling, competition is increasing, and the used market is about to become incredibly attractive. The question isn&apos;t whether EVs make sense anymore—it&apos;s which path to ownership makes the most sense for you.</p>

          <p className="text-slate-600 mb-4">For most buyers in 2026, we&apos;d recommend either a used EV (to take advantage of the lease return wave) or a hybrid (if you want electrification without the hassle). Both options can save you money at the pump without relying on government incentives.</p>

          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-semibold text-amber-600 mb-4">Not Sure What&apos;s Right for You?</h3>
            <p className="text-slate-600 mb-6">Our free assessment helps you figure out whether an EV, hybrid, or gas car makes the most sense for your driving habits and budget—with or without tax credits.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Take Free Assessment
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/used-ev-buying-guide-2026" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-400 transition-colors">
              <span className="text-amber-600">Why 2026 is the Best Year to Buy a Used EV</span>
            </Link>
            <Link href="/blog/best-hybrid-cars-2026" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-400 transition-colors">
              <span className="text-amber-600">Best Hybrid Cars of 2026: Complete Guide</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
