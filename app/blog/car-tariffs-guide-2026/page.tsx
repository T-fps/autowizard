import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, AlertTriangle, DollarSign, TrendingUp, Calendar, Globe, ShieldCheck, Car, Factory, Truck } from 'lucide-react';
import PageWrapper from '../../components/shared/PageWrapper';

export const metadata: Metadata = {
  title: 'Car Tariffs Guide 2026: How They\'re Affecting Prices | Wizard\'s Guide',
  description: 'Everything you need to know about how the 25% auto tariffs are impacting car prices in 2026—and what buyers can do about it.',
};

export default function CarTariffsGuide2026() {
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
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              Market Alert
            </span>
            <span className="text-slate-500 text-sm">February 12, 2026</span>
            <span className="text-slate-500 text-sm">•</span>
            <span className="text-slate-500 text-sm">11 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Car Tariffs Guide 2026: How the 25% Import Tax Is Really Affecting Prices
          </h1>
          <p className="text-xl text-slate-600">
            The 25% tariff on imported vehicles went into effect April 2025. Almost a year later, here&apos;s what it actually means for car buyers—and how to avoid paying more than you need to.
          </p>
        </header>

        {/* Key Stats Banner */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h2 className="font-bold text-slate-900">The Tariff Impact at a Glance</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">25%</div>
              <div className="text-sm text-slate-600">Tariff on Imports</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">$6,400</div>
              <div className="text-sm text-slate-600">Avg. Price Impact</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">$2,000</div>
              <div className="text-sm text-slate-600">2026 Model Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">$41B</div>
              <div className="text-sm text-slate-600">Year 1 Industry Cost</div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="lead text-xl text-slate-700">
            If you&apos;ve been shopping for a new car lately, you&apos;ve probably noticed something: prices on 2026 models are creeping up compared to their 2025 counterparts. The culprit? A 25% tariff on imported vehicles and parts that&apos;s now filtering through to showroom floors. Here&apos;s what&apos;s really happening and what you can do about it.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Globe className="w-6 h-6 text-amber-600" />
            What Happened: The Tariff Timeline
          </h2>
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-28 flex-shrink-0 font-bold text-amber-600">Mar 26, 2025</div>
                <div>Trump announces 25% tariff on all imported automobiles and parts</div>
              </div>
              <div className="flex gap-4">
                <div className="w-28 flex-shrink-0 font-bold text-amber-600">Apr 3, 2025</div>
                <div>Tariff on complete vehicles goes into effect</div>
              </div>
              <div className="flex gap-4">
                <div className="w-28 flex-shrink-0 font-bold text-amber-600">May 3, 2025</div>
                <div>Tariff on auto parts (engines, transmissions, electrical) begins</div>
              </div>
              <div className="flex gap-4">
                <div className="w-28 flex-shrink-0 font-bold text-amber-600">Apr 29, 2025</div>
                <div>3.75% rebate announced for US-assembled vehicles (drops to 2.5% May 2026)</div>
              </div>
              <div className="flex gap-4">
                <div className="w-28 flex-shrink-0 font-bold text-amber-600">Now</div>
                <div>2026 models arriving with price increases averaging $2,000</div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-amber-600" />
            The Real Price Impact
          </h2>

          <p>
            Here&apos;s the thing automakers don&apos;t want to admit publicly: they&apos;re raising prices because of tariffs, but they&apos;re not putting it on a line item. According to Cloud Theory data, 2026 model year price increases are averaging nearly <strong>$2,000</strong>—compared to just $400 during the typical model year changeover.
          </p>
        </div>

        {/* Price Impact Table */}
        <div className="my-10 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-4 py-3 text-left font-bold">Vehicle Type</th>
                <th className="border border-slate-300 px-4 py-3 text-left font-bold">Estimated Tariff Impact</th>
                <th className="border border-slate-300 px-4 py-3 text-left font-bold">Example Models</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 px-4 py-3">Fully Imported Cars</td>
                <td className="border border-slate-300 px-4 py-3 text-red-600 font-bold">+$5,000 - $10,000</td>
                <td className="border border-slate-300 px-4 py-3">BMW 3-Series, Mercedes C-Class, Audi A4</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-4 py-3">US-Built with Import Parts</td>
                <td className="border border-slate-300 px-4 py-3 text-orange-600 font-bold">+$2,000 - $4,000</td>
                <td className="border border-slate-300 px-4 py-3">Toyota RAV4, Honda CR-V, Ford Explorer</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-4 py-3">Domestic Trucks/SUVs</td>
                <td className="border border-slate-300 px-4 py-3 text-amber-600 font-bold">+$1,500 - $3,000</td>
                <td className="border border-slate-300 px-4 py-3">Ford F-150, Chevy Silverado, Ram 1500</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-4 py-3">Korean Brands</td>
                <td className="border border-slate-300 px-4 py-3 text-orange-600 font-bold">+$2,000 - $6,000</td>
                <td className="border border-slate-300 px-4 py-3">Hyundai, Kia, Genesis models</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
            <h3 className="text-lg font-bold text-slate-900 mt-0 mb-3">Why You Won&apos;t See &quot;Tariff&quot; on the Sticker</h3>
            <p className="mb-0">
              Automakers are terrified of angering the administration by publicly blaming tariffs for price hikes. Instead, they&apos;re hiding costs through higher destination charges (up $200-$300), reduced standard features, and simply higher MSRPs on new model years. As Edmunds director Ivan Drury puts it: &quot;The sticker price is the last place they want to put the increase.&quot;
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Factory className="w-6 h-6 text-amber-600" />
            No Vehicle is 100% American
          </h2>

          <p>
            Here&apos;s an important reality check: even vehicles assembled in the United States use significant amounts of imported parts. According to Department of Transportation data, <strong>every 2025 model</strong> had at least 20% of its content come from outside the US and Canada.
          </p>

          <p>
            Even Tesla—often seen as &quot;American&quot;—sources 30% of its Model Y content from overseas. The Kia EV6, ironically, has the highest US/Canada content at 80%, while many traditional American brands have significant exposure to imported parts.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
            How to Protect Yourself
          </h2>
        </div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 gap-6 my-10">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Car className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-slate-900">Buy Pre-Tariff Inventory</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Vehicles imported before April 3, 2025 aren&apos;t subject to the tariff. Some dealers still have 2025 models at pre-tariff prices—these are your best deals right now.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-slate-900">Consider Used Cars</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Tariffs don&apos;t apply to used vehicles. With 1.1M EVs coming off lease in 2026 and overall used prices stabilizing, the used market is more attractive than ever.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900">Check Assembly Location</h3>
            </div>
            <p className="text-slate-600 text-sm">
              US-assembled vehicles get partial rebates. Check the Monroney sticker for final assembly point—vehicles built in Kentucky, Indiana, or Alabama may have smaller price increases.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900">Negotiate Harder</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Automakers absorbed early tariff costs to maintain market share. Some still offer strong incentives—Hyundai and Kia especially. Don&apos;t accept MSRP as final.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-amber-600" />
            What&apos;s Coming Next
          </h2>

          <p>
            J.P. Morgan estimates combined tariff costs will hit <strong>$41 billion</strong> in year one, rising to $52 billion by year three. That cost has to go somewhere—and increasingly, it&apos;s going to consumers.
          </p>

          <p>
            The silver lining? Automakers are adapting. Honda announced it will absorb tariff costs rather than pass them on. Hyundai is relocating Tucson production from Mexico to the US. Toyota is expanding Kentucky production. Over time, these shifts may reduce the tariff impact on popular models.
          </p>

          <div className="bg-slate-100 border border-slate-300 rounded-xl p-6 my-8">
            <h3 className="text-lg font-bold text-slate-900 mt-0 mb-3">The Bottom Line</h3>
            <p className="mb-0">
              Tariffs are real, and they&apos;re affecting prices. But smart buyers can minimize the impact by shopping pre-tariff inventory, considering used vehicles, and focusing on US-assembled models. The worst thing you can do is pay MSRP without negotiating—dealers know the market is tough, and there&apos;s more room to deal than the sticker suggests.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Sources</h2>
          <ul className="text-sm text-slate-600">
            <li>Kelley Blue Book - Tariff Impact Analysis</li>
            <li>Yale Budget Lab - Fiscal & Economic Effects of Auto Tariffs</li>
            <li>J.P. Morgan Global Research - Auto Tariffs Report</li>
            <li>Cloud Theory - 2026 Model Year Pricing Data</li>
            <li>Cars.com - Tariff Tracker</li>
            <li>Detroit News - Auto Industry Tariff Coverage</li>
            <li>TrueCar - Automaker Response Tracking</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Find the Best Value Despite Tariffs</h3>
          <p className="text-slate-600 mb-6">
            Take our quiz and we&apos;ll recommend vehicles that offer the best value in today&apos;s market.
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
            <Link href="/blog/used-ev-buying-guide-2026" className="block p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-300 transition-colors">
              <span className="text-sm text-amber-600 font-medium">Used Cars</span>
              <h4 className="font-bold text-slate-900 mt-1">Why 2026 is the Best Year to Buy a Used EV</h4>
            </Link>
            <Link href="/blog/best-time-to-buy-car" className="block p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-300 transition-colors">
              <span className="text-sm text-amber-600 font-medium">Buying Tips</span>
              <h4 className="font-bold text-slate-900 mt-1">Best Time to Buy a Car: When to Get the Best Deals</h4>
            </Link>
          </div>
        </div>
      </article>
    </PageWrapper>
  );
}
