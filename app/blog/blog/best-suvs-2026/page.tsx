import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, Award, Car, Users, Mountain, Sparkles, DollarSign, Fuel, Shield } from 'lucide-react';
import PageWrapper from '../../components/shared/PageWrapper';

export const metadata: Metadata = {
  title: 'Best SUVs of 2026: Top Picks by Category | Wizard\'s Guide',
  description: 'From compact crossovers to three-row family haulers—our expert picks for the best SUVs you can buy in 2026.',
};

export default function BestSUVs2026() {
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
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
              Best Cars
            </span>
            <span className="text-slate-500 text-sm">February 8, 2026</span>
            <span className="text-slate-500 text-sm">•</span>
            <span className="text-slate-500 text-sm">16 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Best SUVs of 2026: Our Top Picks in Every Category
          </h1>
          <p className="text-xl text-slate-600">
            SUVs dominate American roads for good reason. From affordable subcompacts to luxury three-rows, here are the standouts worth your money in 2026.
          </p>
        </header>

        {/* Quick Picks */}
        <div className="bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 rounded-2xl p-6 mb-12">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            2026 SUV Quick Picks
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <div className="text-sm text-slate-500 mb-1">Best Overall</div>
              <div className="font-bold text-slate-900">Toyota RAV4 Hybrid</div>
              <div className="text-amber-600">$31,900</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <div className="text-sm text-slate-500 mb-1">Best Value</div>
              <div className="font-bold text-slate-900">Chevrolet Trax</div>
              <div className="text-amber-600">$21,600</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <div className="text-sm text-slate-500 mb-1">Best Luxury</div>
              <div className="font-bold text-slate-900">Lexus NX Hybrid</div>
              <div className="text-amber-600">$44,175</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <div className="text-sm text-slate-500 mb-1">Best 3-Row</div>
              <div className="font-bold text-slate-900">Toyota Grand Highlander</div>
              <div className="text-amber-600">$41,660</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <div className="text-sm text-slate-500 mb-1">Best Off-Road</div>
              <div className="font-bold text-slate-900">Jeep Wrangler</div>
              <div className="text-amber-600">$33,590</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <div className="text-sm text-slate-500 mb-1">Best Electric</div>
              <div className="font-bold text-slate-900">Tesla Model Y</div>
              <div className="text-amber-600">$44,990</div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="lead text-xl text-slate-700">
            Eight of the top 15 best-selling vehicles in America are SUVs. They&apos;re practical, comfortable, and—increasingly—efficient. Whether you&apos;re hauling kids, conquering trails, or just want a commanding view of the road, there&apos;s an SUV for you.
          </p>

          <p>
            We&apos;ve tested, researched, and compared dozens of models to bring you the best picks in every category. Here&apos;s where your money is best spent in 2026.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Car className="w-6 h-6 text-amber-600" />
            Best Subcompact SUVs
          </h2>
          <p className="text-slate-600 italic">For city dwellers and budget-conscious buyers</p>
        </div>

        {/* Subcompact SUVs */}
        <div className="space-y-6 my-10">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">EDITOR&apos;S PICK</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Chevrolet Trax — $21,600</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">MPG:</span> <span className="font-medium">28 combined</span></div>
              <div><span className="text-slate-500">HP:</span> <span className="font-medium">137</span></div>
              <div><span className="text-slate-500">Cargo:</span> <span className="font-medium">54.1 cu ft</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              The redesigned Trax is the best value in the segment. Surprisingly spacious interior, modern tech, and loads of safety features at under $22K. Only FWD, no hybrid option, but for the money? Unbeatable.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Subaru Crosstrek — $26,995</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">MPG:</span> <span className="font-medium">35 combined (hybrid)</span></div>
              <div><span className="text-slate-500">HP:</span> <span className="font-medium">194</span></div>
              <div><span className="text-slate-500">Cargo:</span> <span className="font-medium">55.5 cu ft</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              CR Top Pick for 2026. Standard AWD, available hybrid, excellent visibility, and rugged capability. The choice for outdoorsy types who don&apos;t need a full-size SUV.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Fuel className="w-6 h-6 text-amber-600" />
            Best Compact SUVs
          </h2>
          <p className="text-slate-600 italic">The sweet spot: practical, efficient, affordable</p>
        </div>

        {/* Compact SUVs */}
        <div className="space-y-6 my-10">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">EDITOR&apos;S PICK</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Toyota RAV4 Hybrid — $31,900</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">MPG:</span> <span className="font-medium text-green-600">44 combined</span></div>
              <div><span className="text-slate-500">HP:</span> <span className="font-medium">236 (AWD)</span></div>
              <div><span className="text-slate-500">Cargo:</span> <span className="font-medium">69.8 cu ft</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              America&apos;s best-selling SUV just got even better. Now hybrid-only for 2026, with improved power, efficiency, and tech. The XLE Premium is the sweet spot at ~$37K.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Honda CR-V Hybrid — $34,650</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">MPG:</span> <span className="font-medium">40 combined</span></div>
              <div><span className="text-slate-500">HP:</span> <span className="font-medium">204</span></div>
              <div><span className="text-slate-500">Cargo:</span> <span className="font-medium">76.5 cu ft</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              More cargo space than the RAV4, better interior materials, and the new TrailSport trim adds genuine ruggedness. If driving dynamics matter to you, this is the pick.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Subaru Forester Hybrid — $33,695</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">MPG:</span> <span className="font-medium">33 combined</span></div>
              <div><span className="text-slate-500">HP:</span> <span className="font-medium">180</span></div>
              <div><span className="text-slate-500">Cargo:</span> <span className="font-medium">74.2 cu ft</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              CR Top Pick for 2026. Full-time mechanical AWD (not the part-time system competitors use), incredible visibility, and now with Toyota-sourced hybrid tech. 13 straight years on CR&apos;s Top Picks list.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Users className="w-6 h-6 text-amber-600" />
            Best 3-Row Family SUVs
          </h2>
          <p className="text-slate-600 italic">For families who need serious space</p>
        </div>

        {/* 3-Row SUVs */}
        <div className="space-y-6 my-10">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">EDITOR&apos;S PICK</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Toyota Grand Highlander Hybrid — $41,660</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">MPG:</span> <span className="font-medium text-green-600">35 combined</span></div>
              <div><span className="text-slate-500">HP:</span> <span className="font-medium">245</span></div>
              <div><span className="text-slate-500">Cargo:</span> <span className="font-medium">97.5 cu ft</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              CR Top Pick for 2026. &quot;Rare to find a three-row SUV that&apos;s roomy enough to accommodate an adult in every seat and still have space for cargo.&quot; The hybrid returns an incredible 35 MPG—on par with smaller SUVs.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Kia Telluride — $37,515</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">MPG:</span> <span className="font-medium">23 combined</span></div>
              <div><span className="text-slate-500">HP:</span> <span className="font-medium">291</span></div>
              <div><span className="text-slate-500">Cargo:</span> <span className="font-medium">87 cu ft</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              The value king of three-rows. Looks expensive, feels expensive, but undercuts competitors by thousands. No hybrid option is the only real weakness.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Hyundai Palisade — $37,550</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">MPG:</span> <span className="font-medium">23 combined</span></div>
              <div><span className="text-slate-500">HP:</span> <span className="font-medium">291</span></div>
              <div><span className="text-slate-500">Cargo:</span> <span className="font-medium">86 cu ft</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              Telluride&apos;s twin with slightly different styling. Excellent third-row space, refined ride, loaded with tech. New hybrid option coming soon.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-600" />
            Best Luxury SUVs
          </h2>
          <p className="text-slate-600 italic">When comfort and prestige matter</p>
        </div>

        {/* Luxury SUVs */}
        <div className="space-y-6 my-10">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">EDITOR&apos;S PICK — COMPACT LUXURY</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Lexus NX Hybrid — $44,175</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">MPG:</span> <span className="font-medium text-green-600">38 combined</span></div>
              <div><span className="text-slate-500">HP:</span> <span className="font-medium">239</span></div>
              <div><span className="text-slate-500">0-60:</span> <span className="font-medium">7.2 sec</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              CR Top Pick for 2026. Elegance, efficiency, and exceptional reliability in one package. The PHEV version offers 37 miles of EV range if you need it.
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">EDITOR&apos;S PICK — MIDSIZE LUXURY</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">BMW X5 PHEV — $67,600</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">EV Range:</span> <span className="font-medium text-blue-600">39 miles</span></div>
              <div><span className="text-slate-500">HP:</span> <span className="font-medium">483</span></div>
              <div><span className="text-slate-500">0-60:</span> <span className="font-medium">4.7 sec</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              CR Top Pick for 2026. The rare luxury SUV that&apos;s genuinely fun to drive while also offering plug-in efficiency. 39 miles of EV range handles most commutes.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Genesis GV70 — $46,300</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">MPG:</span> <span className="font-medium">25 combined</span></div>
              <div><span className="text-slate-500">HP:</span> <span className="font-medium">300-375</span></div>
              <div><span className="text-slate-500">0-60:</span> <span className="font-medium">5.1 sec</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              Stunning design, powerful engines, and a price that significantly undercuts German rivals. The value play in luxury compact SUVs.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Mountain className="w-6 h-6 text-amber-600" />
            Best Off-Road SUVs
          </h2>
          <p className="text-slate-600 italic">For when pavement is optional</p>
        </div>

        {/* Off-Road SUVs */}
        <div className="space-y-6 my-10">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">EDITOR&apos;S PICK</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Jeep Wrangler — $33,590</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">Ground Clearance:</span> <span className="font-medium">10.8 in</span></div>
              <div><span className="text-slate-500">Approach:</span> <span className="font-medium">44°</span></div>
              <div><span className="text-slate-500">Towing:</span> <span className="font-medium">3,500 lbs</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              Nothing else offers this level of open-air freedom and off-road capability. The 4xe PHEV combines electric torque with trail prowess. The Rubicon 392 is a beast.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ford Bronco — $38,035</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">Ground Clearance:</span> <span className="font-medium">11.6 in</span></div>
              <div><span className="text-slate-500">Approach:</span> <span className="font-medium">43.2°</span></div>
              <div><span className="text-slate-500">Towing:</span> <span className="font-medium">3,500 lbs</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              More refined on-road than the Wrangler while matching its off-road chops. The Raptor variant is ridiculously capable. Better daily driver, slightly less hardcore.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Toyota 4Runner — $40,770</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">Ground Clearance:</span> <span className="font-medium">9.6 in</span></div>
              <div><span className="text-slate-500">Approach:</span> <span className="font-medium">33°</span></div>
              <div><span className="text-slate-500">Towing:</span> <span className="font-medium">6,000 lbs</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              Redesigned for 2025 with hybrid power and modern tech while keeping body-on-frame toughness. The TRD Pro is the trail warrior; the Limited is surprisingly civilized.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6 text-amber-600" />
            Best Electric SUVs
          </h2>
          <p className="text-slate-600 italic">Zero emissions, maximum capability</p>
        </div>

        {/* Electric SUVs */}
        <div className="space-y-6 my-10">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">EDITOR&apos;S PICK</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Tesla Model Y — $44,990</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">Range:</span> <span className="font-medium text-blue-600">310-337 mi</span></div>
              <div><span className="text-slate-500">0-60:</span> <span className="font-medium">3.3 sec (Perf)</span></div>
              <div><span className="text-slate-500">Cargo:</span> <span className="font-medium">68 cu ft</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              CR Top Pick for 2026. Refreshed model with improved ride quality, better interior, and exceptional Supercharger access. Reliability continues to improve.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Hyundai Ioniq 5 — $35,000</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">Range:</span> <span className="font-medium text-blue-600">303 mi</span></div>
              <div><span className="text-slate-500">0-60:</span> <span className="font-medium">5.0 sec</span></div>
              <div><span className="text-slate-500">Fast Charge:</span> <span className="font-medium">10-80% in 18 min</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              Ultra-fast charging, retro-futuristic design, and often available with $10K+ discounts. The value champion of electric SUVs.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Chevrolet Equinox EV — $34,995</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">Range:</span> <span className="font-medium text-blue-600">319 mi</span></div>
              <div><span className="text-slate-500">0-60:</span> <span className="font-medium">5.9 sec</span></div>
              <div><span className="text-slate-500">Cargo:</span> <span className="font-medium">57 cu ft</span></div>
            </div>
            <p className="text-slate-600 text-sm">
              Finally, an affordable mainstream electric SUV that doesn&apos;t compromise. GM&apos;s Ultium platform delivers impressive range at a competitive price.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
            <h3 className="text-lg font-bold text-slate-900 mt-0 mb-3">The Bottom Line</h3>
            <p className="mb-0">
              The best SUV for you depends entirely on your needs. For most buyers, the Toyota RAV4 Hybrid hits the perfect balance of efficiency, reliability, and value. Families should look at the Grand Highlander. Value seekers can&apos;t beat the Trax or Equinox. And if you&apos;re going electric, the Model Y remains the benchmark—though the Ioniq 5 with dealer discounts is a compelling alternative.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Sources</h2>
          <ul className="text-sm text-slate-600">
            <li>Consumer Reports - 2026 Top Picks</li>
            <li>Car and Driver - SUV Comparison Tests</li>
            <li>Kelley Blue Book - Vehicle Reviews</li>
            <li>Edmunds - Expert Ratings</li>
            <li>J.D. Power - Reliability Data</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Find Your Perfect SUV</h3>
          <p className="text-slate-600 mb-6">
            Answer a few questions and get personalized SUV recommendations matched to your lifestyle.
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
            <Link href="/blog/2026-toyota-rav4-guide" className="block p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-300 transition-colors">
              <span className="text-sm text-amber-600 font-medium">New Model</span>
              <h4 className="font-bold text-slate-900 mt-1">2026 Toyota RAV4: Complete Guide</h4>
            </Link>
          </div>
        </div>
      </article>
    </PageWrapper>
  );
}
