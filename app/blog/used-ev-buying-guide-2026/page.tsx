"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Zap, TrendingDown, DollarSign, Battery, Car, AlertCircle, CheckCircle } from 'lucide-react';
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
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />February 5, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />12 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Why 2026 is the Best Year to Buy a Used EV</h1>
          <p className="text-xl text-slate-600">A flood of lease returns is about to crash used EV prices. Here&apos;s how to take advantage of the coming &quot;EV avalanche.&quot;</p>
        </header>

        <div className="prose prose-amber max-w-none">
          <div className="bg-green-100 border border-green-200 rounded-2xl p-6 mb-8">
            <p className="text-green-700 m-0 flex items-start gap-3">
              <TrendingDown className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Market Alert:</strong> Between 243,000 and 330,000 EVs will come off lease in 2026—more than triple the 2025 volume. That supply surge is about to create incredible buying opportunities.</span>
            </p>
          </div>

          <p className="text-slate-600 mb-4">Here&apos;s a twist of irony for you: the $7,500 federal EV tax credit is gone, and that&apos;s actually about to make EVs <em>more</em> affordable. Not new ones—used ones. And 2026 is shaping up to be the best year in history to buy a pre-owned electric vehicle.</p>
          
          <p className="text-slate-600 mb-4">Let me explain the economics that are about to reshape the used car market.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Lease Tsunami is Coming</h2>
          
          <p className="text-slate-600 mb-4">Between January 2023 and September 2025, over 1.1 million EVs were leased under incredibly attractive terms—terms made possible by the federal government&apos;s Commercial Clean Vehicle Credit. Automakers called it a &quot;capital cost reduction,&quot; but the money came straight from IRS Section 45W.</p>

          <p className="text-slate-600 mb-4">That credit turbocharged EV leasing. According to Cox Automotive, nearly half of all franchise EV sales were leases by 2024. Now those 36-month leases are expiring, and the cars are flooding back into the market.</p>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <div className="bg-slate-100 rounded-xl p-6">
              <div className="text-4xl font-bold text-amber-600">1.1M</div>
              <div className="text-slate-600 text-sm">EVs leased 2023-2025</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-6">
              <div className="text-4xl font-bold text-amber-600">330K</div>
              <div className="text-slate-600 text-sm">Returning in 2026</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-6">
              <div className="text-4xl font-bold text-amber-600">230%</div>
              <div className="text-slate-600 text-sm">Increase over 2025 returns</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-6">
              <div className="text-4xl font-bold text-amber-600">15%</div>
              <div className="text-slate-600 text-sm">Of auctions will be EVs</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Why Most Lessees Won&apos;t Buy Their Cars</h2>
          
          <p className="text-slate-600 mb-4">Here&apos;s the key insight: when these leases were written in 2022-2023, automakers assumed EVs would retain about 50% of their value. Reality check: they&apos;re only retaining about 40%.</p>

          <p className="text-slate-600 mb-4">That means the buyout prices on these leases are <em>higher</em> than what the cars are actually worth on the open market. Most drivers are going to turn in their keys rather than overpay for a vehicle they could buy cheaper at a dealership.</p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 my-8">
            <h3 className="text-lg font-semibold text-amber-800 mb-4">The Math Doesn&apos;t Lie</h3>
            <div className="space-y-3 text-amber-900">
              <div className="flex justify-between items-center">
                <span>Average lease buyout (compact SUV):</span>
                <span className="font-bold">$29,645</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average monthly payment to buy out:</span>
                <span className="font-bold">$477/mo</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average new EV lease payment:</span>
                <span className="font-bold text-green-700">$457/mo</span>
              </div>
              <div className="pt-3 border-t border-amber-300">
                <p className="text-sm">It&apos;s actually cheaper to lease a brand-new EV than to buy out the old lease. That&apos;s why these cars are coming back.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Which Models Will Flood the Market?</h2>
          
          <p className="text-slate-600 mb-4">Cox Automotive has identified the EVs that will dominate lease returns over the next few years:</p>

          <div className="space-y-4 my-8">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Tesla Model Y</div>
                  <div className="text-sm text-slate-500">Best-selling EV in America</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-amber-600">~$29,000</div>
                <div className="text-xs text-slate-500">Avg. used price</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Tesla Model 3</div>
                  <div className="text-sm text-slate-500">Sedan counterpart</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-amber-600">~$25,000</div>
                <div className="text-xs text-slate-500">Avg. used price</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Hyundai Ioniq 5</div>
                  <div className="text-sm text-slate-500">Award-winning design</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-amber-600">~$27,000</div>
                <div className="text-xs text-slate-500">Avg. used price</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Volkswagen ID.4</div>
                  <div className="text-sm text-slate-500">Practical crossover</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-amber-600">~$22,000</div>
                <div className="text-xs text-slate-500">Avg. used price</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Ford Mustang Mach-E</div>
                  <div className="text-sm text-slate-500">Performance crossover</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-amber-600">~$28,000</div>
                <div className="text-xs text-slate-500">Avg. used price</div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">But What About the Battery?</h2>
          
          <p className="text-slate-600 mb-4">This is the question everyone asks, and the data is reassuring. Modern EV batteries hold up remarkably well. Study after study shows that most EVs retain 80-90% of their battery capacity after 36,000 miles.</p>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 my-8">
            <div className="flex items-start gap-3">
              <Battery className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-800 mb-2">Battery Degradation Reality Check</h3>
                <p className="text-green-700 text-sm mb-4">A typical 3-year-old lease return with ~30,000 miles will have minimal battery degradation. We&apos;ve seen Teslas pass 200,000+ miles with 80%+ capacity remaining.</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-700">90%+</div>
                    <div className="text-xs text-green-600">Capacity at 30K miles</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-700">8 years</div>
                    <div className="text-xs text-green-600">Typical warranty</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-700">100K mi</div>
                    <div className="text-xs text-green-600">Warranty coverage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Price Comparison That Matters</h2>
          
          <p className="text-slate-600 mb-4">Here&apos;s where things get interesting. According to Edmunds, the average used EV price is now just $900 above comparable gas-powered vehicles. As the lease returns flood the market, that gap is expected to flip.</p>

          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-4 font-semibold text-slate-900">Vehicle</th>
                  <th className="text-right p-4 font-semibold text-slate-900">New Price</th>
                  <th className="text-right p-4 font-semibold text-slate-900">Used (2023)</th>
                  <th className="text-right p-4 font-semibold text-green-700">Savings</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="p-4 text-slate-900">Tesla Model Y</td>
                  <td className="p-4 text-right text-slate-600">$44,990</td>
                  <td className="p-4 text-right text-slate-600">$29,000</td>
                  <td className="p-4 text-right font-bold text-green-600">$15,990</td>
                </tr>
                <tr className="border-t border-slate-200 bg-slate-50">
                  <td className="p-4 text-slate-900">Tesla Model 3</td>
                  <td className="p-4 text-right text-slate-600">$42,490</td>
                  <td className="p-4 text-right text-slate-600">$25,000</td>
                  <td className="p-4 text-right font-bold text-green-600">$17,490</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 text-slate-900">Hyundai Ioniq 5</td>
                  <td className="p-4 text-right text-slate-600">$44,650</td>
                  <td className="p-4 text-right text-slate-600">$27,000</td>
                  <td className="p-4 text-right font-bold text-green-600">$17,650</td>
                </tr>
                <tr className="border-t border-slate-200 bg-slate-50">
                  <td className="p-4 text-slate-900">VW ID.4</td>
                  <td className="p-4 text-right text-slate-600">$40,815</td>
                  <td className="p-4 text-right text-slate-600">$22,000</td>
                  <td className="p-4 text-right font-bold text-green-600">$18,815</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 text-slate-900">Ford Mach-E</td>
                  <td className="p-4 text-right text-slate-600">$45,995</td>
                  <td className="p-4 text-right text-slate-600">$28,000</td>
                  <td className="p-4 text-right font-bold text-green-600">$17,995</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">When to Buy: The Timeline</h2>
          
          <p className="text-slate-600 mb-4">The lease return surge really kicks into high gear starting in April 2026, when those 36-month leases written in April 2023 start expiring. Here&apos;s what to expect:</p>

          <div className="space-y-4 my-8">
            <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="w-24 text-center">
                <div className="text-lg font-bold text-amber-600">Now</div>
                <div className="text-xs text-amber-600">Feb 2026</div>
              </div>
              <div>
                <div className="font-semibold text-slate-900">Early adopters moving</div>
                <div className="text-sm text-slate-600">Some good deals already available, but selection is limited. California already seeing 20% EV share at auctions.</div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="w-24 text-center">
                <div className="text-lg font-bold text-green-600">Apr</div>
                <div className="text-xs text-green-600">2026</div>
              </div>
              <div>
                <div className="font-semibold text-slate-900">The floodgates open</div>
                <div className="text-sm text-slate-600">Major surge begins. 36-month leases from the peak period start returning en masse.</div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-green-100 rounded-xl border border-green-300">
              <div className="w-24 text-center">
                <div className="text-lg font-bold text-green-700">Q3-Q4</div>
                <div className="text-xs text-green-600">2026</div>
              </div>
              <div>
                <div className="font-semibold text-slate-900">Peak selection</div>
                <div className="text-sm text-slate-600">Best variety and likely strongest pricing pressure. EV share at auctions expected to hit 15%.</div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="w-24 text-center">
                <div className="text-lg font-bold text-blue-600">2027</div>
                <div className="text-xs text-blue-600">Ongoing</div>
              </div>
              <div>
                <div className="font-semibold text-slate-900">Sustained supply</div>
                <div className="text-sm text-slate-600">EV share of lease returns expected to reach 19%. Market normalizes at lower price levels.</div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">What to Look for When Buying</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Green Flags</h3>
              </div>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Remaining battery warranty (usually 8yr/100K)</li>
                <li>• Single owner, lease return history</li>
                <li>• Low mileage (30K or less)</li>
                <li>• Complete service records</li>
                <li>• Battery health report available</li>
                <li>• Original charging equipment included</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-800">Red Flags</h3>
              </div>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• High mileage without battery health data</li>
                <li>• Former rideshare/fleet vehicle</li>
                <li>• Accident history (can damage battery)</li>
                <li>• Multiple owners in short time</li>
                <li>• Missing charging cables</li>
                <li>• Out-of-warranty battery</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Bottom Line</h2>
          
          <p className="text-slate-600 mb-4">The federal tax credit created an artificial boom in EV leasing. Now that credit is gone, and those subsidized leases are returning to market. What was once a government program to boost new EV sales is about to become the best thing that ever happened to used EV buyers.</p>
          
          <p className="text-slate-600 mb-4">The irony is delicious: federal subsidies inflated new EV demand through generous lease incentives, and now that bubble is deflating right into the used market—without any subsidies needed to bridge the affordability gap.</p>

          <p className="text-slate-600 mb-4">If you&apos;ve been on the fence about going electric, 2026 might be your year. A three-year-old Tesla Model Y or Hyundai Ioniq 5 with low miles and warranty remaining could be yours for thousands less than a new compact SUV—and you&apos;ll never pay for gas again.</p>

          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-semibold text-amber-600 mb-4">Ready to Go Electric?</h3>
            <p className="text-slate-600 mb-6">Take our assessment to find out which EV fits your driving habits and budget. We&apos;ll match you with the perfect electric vehicle.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Take Free Assessment
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/ev-tax-credit-guide-2026" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-400 transition-colors">
              <span className="text-amber-600">EV Tax Credit Gone: What Buyers Need to Know</span>
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
