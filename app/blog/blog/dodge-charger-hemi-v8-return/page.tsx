import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, Zap, Flame, TrendingDown, Calendar, AlertTriangle, CheckCircle, XCircle, Car } from 'lucide-react';
import PageWrapper from '../../components/shared/PageWrapper';

export const metadata: Metadata = {
  title: 'Dodge Charger Hemi V8 Returns as Electric Daytona Fails | Wizard\'s Guide',
  description: 'The Charger Daytona EV flopped. Now Dodge is bringing back the Hemi V8. Here\'s everything you need to know about Stellantis\'s dramatic reversal.',
};

export default function DodgeChargerHemiReturn() {
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
            <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
              Industry News
            </span>
            <span className="text-slate-500 text-sm">February 11, 2026</span>
            <span className="text-slate-500 text-sm">•</span>
            <span className="text-slate-500 text-sm">10 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            The Hemi V8 is Back: How Dodge&apos;s Electric Gamble Failed and What&apos;s Coming Next
          </h1>
          <p className="text-xl text-slate-600">
            The Charger Daytona EV was supposed to be the future of muscle cars. Instead, it became one of 2025&apos;s biggest sales disasters. Now Stellantis is scrambling to bring back what fans actually wanted.
          </p>
        </header>

        {/* Dramatic Stats Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 mb-12">
          <h2 className="font-bold text-amber-400 mb-4 flex items-center gap-2">
            <Flame className="w-5 h-5" />
            The Charger Daytona Disaster
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">$25K+</div>
              <div className="text-sm text-slate-300">Dealer Discounts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">R/T Cut</div>
              <div className="text-sm text-slate-300">For 2026</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">Late 2026</div>
              <div className="text-sm text-slate-300">Hemi V8 Return</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">550 HP</div>
              <div className="text-sm text-slate-300">SIXPACK I-6</div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="lead text-xl text-slate-700">
            In the world of muscle cars, few names carry as much weight as &quot;Hemi.&quot; For decades, that V8 rumble was synonymous with American performance. So when Dodge announced the new Charger would launch as an <em>electric</em> vehicle—complete with fake exhaust sounds—the reaction was... not great.
          </p>

          <p>
            Now, less than a year after the Charger Daytona EV hit dealerships, Stellantis is in full retreat. The entry-level Daytona R/T has been discontinued. The high-performance Banshee variant is reportedly dead. And engineers are &quot;actively working&quot; on bringing the Hemi V8 back to the Charger lineup.
          </p>

          <p>
            Here&apos;s what happened, what&apos;s coming, and what it means for buyers.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <TrendingDown className="w-6 h-6 text-red-600" />
            What Went Wrong with the Daytona EV
          </h2>
        </div>

        {/* Failure Analysis Grid */}
        <div className="grid md:grid-cols-2 gap-6 my-10">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-slate-900">Wrong Car, Wrong Time</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Dodge launched an EV muscle car just as EV demand softened. The $7,500 federal tax credit expired in September 2025, making the already-pricey Daytona even harder to justify.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-slate-900">Identity Crisis</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Muscle car buyers wanted V8 thunder. EV enthusiasts wanted efficiency and tech. The Daytona&apos;s &quot;Fratzonic Chambered Exhaust&quot; (fake engine sounds) satisfied neither group.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-slate-900">Price vs. Range</h3>
            </div>
            <p className="text-slate-600 text-sm">
              The Scat Pack starts near $70,000 but only delivers 241 miles of range. Traditional muscle car buyers balked at the price; EV buyers balked at the range.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-slate-900">Customers Were Waiting</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Word leaked early that gas-powered Chargers were coming. Enthusiasts simply waited, leaving Daytonas languishing on lots with $25,000+ discounts.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
            <h3 className="text-lg font-bold text-slate-900 mt-0 mb-3">The Quote That Says It All</h3>
            <p className="italic mb-2">
              &quot;With a car so ingrained in muscle car culture—thanks to the Hemi V8—the Charger&apos;s reinvention as an all-electric before the gas-fed models arrive was probably going to make brisk sales a long shot.&quot;
            </p>
            <p className="text-sm text-slate-500 mb-0">— MotorTrend</p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Flame className="w-6 h-6 text-amber-600" />
            What&apos;s Coming: The 2026-2027 Charger Lineup
          </h2>

          <p>
            Dodge isn&apos;t abandoning the new Charger platform—they&apos;re just giving buyers what they actually want. Here&apos;s the expanded lineup:
          </p>
        </div>

        {/* Coming Lineup */}
        <div className="space-y-4 my-10">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Charger SIXPACK (Hurricane I-6)
              </h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Now Available</span>
            </div>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div><span className="text-slate-500">R/T:</span> <span className="font-medium">420 HP</span></div>
              <div><span className="text-slate-500">Scat Pack:</span> <span className="font-medium">550 HP</span></div>
              <div><span className="text-slate-500">Starting:</span> <span className="font-medium">$51,990</span></div>
              <div><span className="text-slate-500">Status:</span> <span className="font-medium text-green-600">In Production</span></div>
            </div>
            <p className="text-slate-600 text-sm mt-3">
              Twin-turbo 3.0L inline-six delivers serious power with better efficiency than the old Hemi. Available in 2-door and 4-door body styles.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-600" />
                Charger Hemi V8
              </h3>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">Late 2026</span>
            </div>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div><span className="text-slate-500">Engine:</span> <span className="font-medium">5.7L or 6.4L Hemi</span></div>
              <div><span className="text-slate-500">Power:</span> <span className="font-medium">372-485+ HP</span></div>
              <div><span className="text-slate-500">Starting:</span> <span className="font-medium">TBD</span></div>
              <div><span className="text-slate-500">Status:</span> <span className="font-medium text-amber-600">In Development</span></div>
            </div>
            <p className="text-slate-600 text-sm mt-3">
              Production reportedly restarting at Dundee, Michigan facility. Expect customer deliveries late 2026. Hellcat-level variants possible for 2027.
            </p>
          </div>

          <div className="bg-slate-100 border border-slate-300 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-slate-600" />
                Charger Daytona Scat Pack (EV)
              </h3>
              <span className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-sm font-medium">Still Available</span>
            </div>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div><span className="text-slate-500">Power:</span> <span className="font-medium">670 HP</span></div>
              <div><span className="text-slate-500">Range:</span> <span className="font-medium">241 miles</span></div>
              <div><span className="text-slate-500">Starting:</span> <span className="font-medium">$69,995</span></div>
              <div><span className="text-slate-500">Status:</span> <span className="font-medium text-slate-600">Heavy Discounts</span></div>
            </div>
            <p className="text-slate-600 text-sm mt-3">
              The R/T is discontinued for 2026. The Scat Pack remains as the &quot;quickest and most powerful muscle car&quot; but faces heavy dealer incentives.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Car className="w-6 h-6 text-amber-600" />
            What About the Banshee?
          </h2>

          <p>
            The Charger Daytona SRT Banshee was supposed to be the ultimate electric muscle car—an 800-volt system with over 1,000 horsepower. According to MoparInsiders, it&apos;s now dead.
          </p>

          <p>
            With Tim Kuniskis (the architect of Dodge&apos;s modern muscle revival) now overseeing all North American Stellantis brands, the company is pivoting hard back to internal combustion. The SRT division is being revived, the Hemi is returning across multiple vehicles, and full electrification has clearly &quot;lost momentum.&quot;
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-amber-600" />
            Should You Wait for the Hemi?
          </h2>
        </div>

        {/* Decision Matrix */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-10">
          <h3 className="font-bold text-slate-900 mb-4">Who Should Buy What:</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-40 flex-shrink-0 font-bold text-amber-600">Buy SIXPACK Now</div>
              <div>You want a new Charger immediately, appreciate twin-turbo I-6 power, and care about fuel efficiency. The 550-hp Scat Pack is legitimately quick.</div>
            </div>
            <div className="flex gap-4">
              <div className="w-40 flex-shrink-0 font-bold text-amber-600">Wait for Hemi</div>
              <div>You specifically want V8 sound and character, can wait until late 2026 or 2027, and value the &quot;authentic&quot; muscle car experience.</div>
            </div>
            <div className="flex gap-4">
              <div className="w-40 flex-shrink-0 font-bold text-amber-600">Buy Daytona EV Now</div>
              <div>You want the fastest 0-60 (2.9 seconds in Scat Pack), don&apos;t mind EV ownership, and can negotiate a massive discount off MSRP.</div>
            </div>
            <div className="flex gap-4">
              <div className="w-40 flex-shrink-0 font-bold text-amber-600">Buy Used Hellcat</div>
              <div>You want Hellcat power without paying current prices. Last-gen Charger Hellcats are available used and will likely hold value well.</div>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8">
            <h3 className="text-lg font-bold text-slate-900 mt-0 mb-3">Our Take</h3>
            <p className="mb-0">
              The SIXPACK is genuinely good—MotorWeek just named it their &quot;Best of the Year.&quot; The twin-turbo I-6 makes 88% of peak torque at just 2,500 RPM, and testers say it&apos;s surprisingly fun. If you must have a V8, wait. But don&apos;t sleep on the Hurricane engine—it might win you over.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">The Bigger Picture</h2>

          <p>
            Dodge&apos;s electric stumble isn&apos;t unique. Across the industry, automakers are pulling back on aggressive EV timelines as consumer demand softens. Ford delayed its next-gen EVs. GM cut Ultium production. Even Toyota—which bet big on hybrids—is now being seen as prescient rather than behind.
          </p>

          <p>
            The Charger&apos;s multi-energy approach (EV, hybrid, V8 all on one platform) might actually be the smartest play: offer everything and let customers choose. The mistake was leading with the one option customers wanted least.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Sources</h2>
          <ul className="text-sm text-slate-600">
            <li>Car and Driver - Dodge Charger Hemi V8 Return Report</li>
            <li>MotorTrend - Charger Daytona Production Pause</li>
            <li>MoparInsiders - Daytona Banshee Cancellation</li>
            <li>Autoblog - Charger Daytona R/T Discontinued</li>
            <li>MotorWeek - 2026 Charger SIXPACK Track Test</li>
            <li>Carscoops - Stellantis EV Strategy Reversal</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Not Sure Which Charger Is Right?</h3>
          <p className="text-slate-600 mb-6">
            Take our quiz and we&apos;ll help you find the perfect performance car for your needs.
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
            <Link href="/blog/best-hybrid-cars-2026" className="block p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-300 transition-colors">
              <span className="text-sm text-amber-600 font-medium">Best Cars</span>
              <h4 className="font-bold text-slate-900 mt-1">Best Hybrid Cars of 2026</h4>
            </Link>
            <Link href="/blog/electric-vs-hybrid" className="block p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-300 transition-colors">
              <span className="text-sm text-amber-600 font-medium">Comparison</span>
              <h4 className="font-bold text-slate-900 mt-1">Electric vs Hybrid: Which is Right for You?</h4>
            </Link>
          </div>
        </div>
      </article>
    </PageWrapper>
  );
}
