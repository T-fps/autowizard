import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, TrendingUp, Award, Truck, Car, Zap, BarChart3 } from 'lucide-react';
import PageWrapper from '../../components/shared/PageWrapper';

export const metadata: Metadata = {
  title: 'Best-Selling Cars of 2025: Complete Rankings | Wizard\'s Guide',
  description: 'The definitive list of America\'s most popular vehicles in 2025—from the F-150\'s continued dominance to Tesla\'s surprising decline.',
};

export default function BestSellingCars2025() {
  return (
    <PageWrapper>
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Market Data
            </span>
            <span className="text-slate-500 text-sm">February 10, 2026</span>
            <span className="text-slate-500 text-sm">•</span>
            <span className="text-slate-500 text-sm">9 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Best-Selling Cars of 2025: The Complete Rankings
          </h1>
          <p className="text-xl text-slate-600">
            From the Ford F-Series&apos; 44th consecutive year at #1 to the Chevy Equinox&apos;s 40% surge—here&apos;s what Americans actually bought in 2025.
          </p>
        </header>

        {/* Top 3 Highlight */}
        <div className="bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 rounded-2xl p-6 mb-12">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            The Top 3 Best-Sellers of 2025
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 text-center border border-amber-200">
              <div className="text-4xl mb-2">🥇</div>
              <div className="font-bold text-slate-900">Ford F-Series</div>
              <div className="text-2xl font-bold text-amber-600">750,000+</div>
              <div className="text-sm text-slate-500">44th year at #1</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-amber-200">
              <div className="text-4xl mb-2">🥈</div>
              <div className="font-bold text-slate-900">Chevy Silverado</div>
              <div className="text-2xl font-bold text-amber-600">520,000+</div>
              <div className="text-sm text-slate-500">Consistent performer</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-amber-200">
              <div className="text-4xl mb-2">🥉</div>
              <div className="font-bold text-slate-900">Toyota RAV4</div>
              <div className="text-2xl font-bold text-amber-600">479,288</div>
              <div className="text-sm text-slate-500">#1 non-pickup</div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="lead text-xl text-slate-700">
            Another year, another F-150 victory lap. But dig into the 2025 sales data and you&apos;ll find some fascinating shifts: the Chevy Equinox surged 40%, the Tesla Model Y dropped 22%, and hybrids quietly dominated as the market adjusted to post-subsidy reality.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-amber-600" />
            The Top 25 Best-Selling Vehicles of 2025
          </h2>
        </div>

        {/* Full Rankings Table */}
        <div className="my-10 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-3 py-2 text-left font-bold">Rank</th>
                <th className="border border-slate-300 px-3 py-2 text-left font-bold">Vehicle</th>
                <th className="border border-slate-300 px-3 py-2 text-left font-bold">2025 Sales</th>
                <th className="border border-slate-300 px-3 py-2 text-left font-bold">vs 2024</th>
                <th className="border border-slate-300 px-3 py-2 text-left font-bold">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-amber-50">
                <td className="border border-slate-300 px-3 py-2 font-bold">1</td>
                <td className="border border-slate-300 px-3 py-2 font-medium">Ford F-Series</td>
                <td className="border border-slate-300 px-3 py-2">750,000+</td>
                <td className="border border-slate-300 px-3 py-2 text-slate-500">—</td>
                <td className="border border-slate-300 px-3 py-2"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Truck</span></td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-bold">2</td>
                <td className="border border-slate-300 px-3 py-2 font-medium">Chevrolet Silverado</td>
                <td className="border border-slate-300 px-3 py-2">520,000+</td>
                <td className="border border-slate-300 px-3 py-2 text-slate-500">—</td>
                <td className="border border-slate-300 px-3 py-2"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Truck</span></td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-3 py-2 font-bold">3</td>
                <td className="border border-slate-300 px-3 py-2 font-medium">Toyota RAV4</td>
                <td className="border border-slate-300 px-3 py-2">479,288</td>
                <td className="border border-slate-300 px-3 py-2 text-green-600">↑ Slight</td>
                <td className="border border-slate-300 px-3 py-2"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">SUV</span></td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-bold">4</td>
                <td className="border border-slate-300 px-3 py-2 font-medium">Honda CR-V</td>
                <td className="border border-slate-300 px-3 py-2">403,768</td>
                <td className="border border-slate-300 px-3 py-2 text-slate-500">—</td>
                <td className="border border-slate-300 px-3 py-2"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">SUV</span></td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-3 py-2 font-bold">5</td>
                <td className="border border-slate-300 px-3 py-2 font-medium">Ram Pickup</td>
                <td className="border border-slate-300 px-3 py-2">374,059</td>
                <td className="border border-slate-300 px-3 py-2 text-slate-500">—</td>
                <td className="border border-slate-300 px-3 py-2"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Truck</span></td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-bold">6</td>
                <td className="border border-slate-300 px-3 py-2 font-medium">GMC Sierra</td>
                <td className="border border-slate-300 px-3 py-2">356,218</td>
                <td className="border border-slate-300 px-3 py-2 text-green-600">↑ 8%</td>
                <td className="border border-slate-300 px-3 py-2"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Truck</span></td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-3 py-2 font-bold">7</td>
                <td className="border border-slate-300 px-3 py-2 font-medium">Chevrolet Equinox</td>
                <td className="border border-slate-300 px-3 py-2">332,301</td>
                <td className="border border-slate-300 px-3 py-2 text-green-600 font-bold">↑ 40.5%</td>
                <td className="border border-slate-300 px-3 py-2"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">SUV</span></td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-bold">8</td>
                <td className="border border-slate-300 px-3 py-2 font-medium">Toyota Camry</td>
                <td className="border border-slate-300 px-3 py-2">316,185</td>
                <td className="border border-slate-300 px-3 py-2 text-green-600">↑ 2%</td>
                <td className="border border-slate-300 px-3 py-2"><span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">Sedan</span></td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-3 py-2 font-bold">9</td>
                <td className="border border-slate-300 px-3 py-2 font-medium">Tesla Model Y</td>
                <td className="border border-slate-300 px-3 py-2">~300,000</td>
                <td className="border border-slate-300 px-3 py-2 text-red-600 font-bold">↓ 22%</td>
                <td className="border border-slate-300 px-3 py-2"><span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded text-xs">EV</span></td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-bold">10</td>
                <td className="border border-slate-300 px-3 py-2 font-medium">Toyota Tacoma</td>
                <td className="border border-slate-300 px-3 py-2">274,638</td>
                <td className="border border-slate-300 px-3 py-2 text-green-600 font-bold">↑ 42%</td>
                <td className="border border-slate-300 px-3 py-2"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Truck</span></td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-3 py-2 font-bold">11</td>
                <td className="border border-slate-300 px-3 py-2 font-medium">Subaru Outback</td>
                <td className="border border-slate-300 px-3 py-2">~200,000</td>
                <td className="border border-slate-300 px-3 py-2 text-green-600">↑ 6%</td>
                <td className="border border-slate-300 px-3 py-2"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">SUV</span></td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-bold">12</td>
                <td className="border border-slate-300 px-3 py-2 font-medium">Kia Sportage</td>
                <td className="border border-slate-300 px-3 py-2">~185,000</td>
                <td className="border border-slate-300 px-3 py-2 text-green-600">↑ 13%</td>
                <td className="border border-slate-300 px-3 py-2"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">SUV</span></td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-3 py-2 font-bold">13</td>
                <td className="border border-slate-300 px-3 py-2 font-medium">Subaru Forester</td>
                <td className="border border-slate-300 px-3 py-2">~175,000</td>
                <td className="border border-slate-300 px-3 py-2 text-red-600">↓ Slight</td>
                <td className="border border-slate-300 px-3 py-2"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">SUV</span></td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-bold">14</td>
                <td className="border border-slate-300 px-3 py-2 font-medium">Chevrolet Trax</td>
                <td className="border border-slate-300 px-3 py-2">~170,000</td>
                <td className="border border-slate-300 px-3 py-2 text-green-600">↑ 3%</td>
                <td className="border border-slate-300 px-3 py-2"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">SUV</span></td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-3 py-2 font-bold">15</td>
                <td className="border border-slate-300 px-3 py-2 font-medium">Hyundai Tucson</td>
                <td className="border border-slate-300 px-3 py-2">165,239</td>
                <td className="border border-slate-300 px-3 py-2 text-red-600">↓ Slight</td>
                <td className="border border-slate-300 px-3 py-2"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">SUV</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
            The Biggest Winners of 2025
          </h2>
        </div>

        {/* Winners Grid */}
        <div className="grid md:grid-cols-2 gap-6 my-10">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-slate-900">Toyota Tacoma (+42%)</h3>
            </div>
            <p className="text-slate-600 text-sm">
              The all-new 2024 redesign paid off big in 2025. New turbocharged and hybrid powertrains, plus improved refinement, made it the compact truck to beat.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-slate-900">Chevy Equinox (+40.5%)</h3>
            </div>
            <p className="text-slate-600 text-sm">
              The 2025 redesign delivered a more modern interior, better tech, and sharper pricing. The affordable Equinox EV helped boost brand perception.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-slate-900">Tesla Model 3 (+18%)</h3>
            </div>
            <p className="text-slate-600 text-sm">
              After a down year during the 2024 refresh transition, Model 3 sales rebounded. The Highland update brought improved range and interior quality.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-slate-900">GMC Sierra EV (+347%)</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Granted, it started from a tiny base—but 7,996 Sierra EV sales show there&apos;s real demand for electric trucks when done right.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-red-600" />
            The Biggest Decliners
          </h2>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-8">
            <h3 className="text-lg font-bold text-slate-900 mt-0 mb-3 flex items-center gap-2">
              Tesla Model Y: Down 22%
            </h3>
            <p className="mb-0">
              From 406,200 units in 2024 to approximately 300,000 in 2025. Part of this was the transition to the refreshed 2026 model, but slowing EV demand and the end of federal tax credits clearly hurt. Tesla doesn&apos;t report sales officially, so figures are estimates.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Car className="w-6 h-6 text-amber-600" />
            What the Data Tells Us
          </h2>
        </div>

        {/* Key Insights */}
        <div className="space-y-4 my-10">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-2">🚗 Sedans Are Still Relevant (Barely)</h3>
            <p className="text-slate-600 text-sm mb-0">
              Only 4 of the top 20 sellers are traditional cars: Camry, Model Y, Corolla, and Model 3. Sedans aren&apos;t dead, but they&apos;re clearly niche products now. The Camry&apos;s transition to hybrid-only helped maintain sales.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-2">🔌 EV Momentum Slowed</h3>
            <p className="text-slate-600 text-sm mb-0">
              The end of the $7,500 federal tax credit in September 2025 visibly impacted EV sales. Model Y&apos;s decline and the Charger Daytona&apos;s struggles highlight the challenge of selling EVs without subsidies.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-2">⛽ Hybrids Are Winning</h3>
            <p className="text-slate-600 text-sm mb-0">
              Half of RAV4 sales were hybrids. The Camry is now hybrid-only. Hybrids offer the efficiency buyers want without range anxiety or charging hassles.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-2">🛻 Trucks Remain King</h3>
            <p className="text-slate-600 text-sm mb-0">
              The top 2 spots and 5 of the top 10 are trucks. America&apos;s love affair with pickups shows no signs of slowing, even with prices exceeding $60K on average.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">What It Means for 2026</h2>

          <p>
            Several vehicles are entering 2026 with major updates that could shake up these rankings:
          </p>

          <ul>
            <li><strong>Toyota RAV4:</strong> All-new redesign goes hybrid-only. Should maintain or grow its #3 position.</li>
            <li><strong>Tesla Model Y:</strong> Refreshed 2026 model with improved range and features may help recovery.</li>
            <li><strong>Honda CR-V:</strong> TrailSport trim and updates could help it challenge the RAV4.</li>
            <li><strong>Ford F-150:</strong> Now a Consumer Reports Top Pick—expect continued dominance.</li>
          </ul>

          <div className="bg-slate-100 border border-slate-300 rounded-xl p-6 my-8">
            <h3 className="text-lg font-bold text-slate-900 mt-0 mb-3">Looking Ahead</h3>
            <p className="mb-0">
              With tariffs adding $2,000+ to many vehicles and EV subsidies gone, expect 2026 to be defined by value-conscious buyers gravitating toward hybrids and well-priced compact SUVs. The Equinox&apos;s surge is just the beginning.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Sources</h2>
          <ul className="text-sm text-slate-600">
            <li>Car and Driver - Best-Selling Cars 2025</li>
            <li>Kelley Blue Book - 2025 Sales Data</li>
            <li>Automotive News - Year-End Sales Report</li>
            <li>Cox Automotive - Market Analysis</li>
            <li>Best Selling Cars Statistics</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Find Your Perfect Match</h3>
          <p className="text-slate-600 mb-6">
            From bestsellers to hidden gems—take our quiz and get personalized recommendations.
          </p>
          <Link 
            href="/quiz"
            className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500 transition-all"
          >
            Take the Free Quiz →
          </Link>
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/consumer-reports-top-10-2026" className="block p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-300 transition-colors">
              <span className="text-sm text-amber-600 font-medium">Best Cars</span>
              <h4 className="font-bold text-slate-900 mt-1">Consumer Reports Top 10 Cars of 2026</h4>
            </Link>
            <Link href="/blog/most-reliable-cars-2026" className="block p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-300 transition-colors">
              <span className="text-sm text-amber-600 font-medium">Best Cars</span>
              <h4 className="font-bold text-slate-900 mt-1">Most Reliable Cars of 2026</h4>
            </Link>
          </div>
        </div>
      </article>
    </PageWrapper>
  );
}
