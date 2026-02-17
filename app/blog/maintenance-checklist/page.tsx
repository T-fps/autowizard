"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, AlertTriangle, DollarSign, CheckCircle } from 'lucide-react';
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
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />February 17, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />12 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">The Ultimate Car Maintenance Checklist: What It Costs, When to Do It, and What Happens If You Don&apos;t</h1>
          <p className="text-xl text-slate-600">Your no-BS guide to keeping your car alive longer, avoiding surprise repair bills, and knowing exactly what to budget for every service.</p>
        </header>

        <div className="prose prose-amber max-w-none">
          <div className="bg-amber-100 border border-amber-200 rounded-2xl p-6 mb-8">
            <p className="text-amber-700 m-0 flex items-start gap-3">
              <DollarSign className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>The Big Number:</strong> The average car costs about $900/year in maintenance and repairs. But here&apos;s the thing — skip the routine stuff, and that number can balloon to $3,000+ when something major fails. A $75 oil change is a lot cheaper than a $6,000 engine replacement.</span>
            </p>
          </div>

          <p className="text-slate-600 mb-4">Let&apos;s be real — nobody wakes up excited about car maintenance. But the difference between a car that lasts 200,000 miles and one that dies at 120,000 usually comes down to whether the owner stayed on top of the basics. We&apos;re not talking about anything complicated here. Oil changes, brake pads, tire rotations — the boring stuff that quietly saves you thousands.</p>
          
          <p className="text-slate-600 mb-4">This guide breaks down every major maintenance task by how often you need it, what it&apos;ll cost, and what happens if you ignore it. Bookmark this one.</p>

          {/* Hero Image - Mechanic checking oil */}
          <div className="float-right ml-6 mb-4 w-1/2 rounded-2xl overflow-hidden">
            <img src="/blog/maintenance-checklist/oil-check.avif" alt="Mechanic checking engine oil with a dipstick" className="w-full h-auto object-cover" />
          </div>

          {/* === SECTION 1: THE REGULARS === */}
          <div className="clear-both" />
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">🔧 The Regulars: Every 5,000–7,500 Miles</h2>
          <p className="text-slate-600 mb-4">These are your bread-and-butter services. Think of them like brushing your teeth — skip them and things get ugly fast.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Oil &amp; Filter Change</h3>
          <div className="grid md:grid-cols-3 gap-4 my-6">
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">$35–$125</div>
              <div className="text-slate-600 text-sm">Typical Cost</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">5K–7.5K mi</div>
              <div className="text-slate-600 text-sm">How Often</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">~30 min</div>
              <div className="text-slate-600 text-sm">Service Time</div>
            </div>
          </div>
          <p className="text-slate-600 mb-4">This is the single most important thing you can do for your car. Oil lubricates every moving part in your engine. When it gets old, it turns to sludge, friction increases, and your engine starts slowly destroying itself from the inside out.</p>
          <p className="text-slate-600 mb-4">Conventional oil runs $35–$75. Full synthetic (which most newer cars require) runs $65–$125. If you drive a luxury or European brand, expect to pay closer to $100–$150. Most modern cars use synthetic and can go 7,500 miles between changes, but check your owner&apos;s manual — some turbocharged engines want it every 5,000.</p>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-6">
            <p className="text-red-800 m-0 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
              <span><strong>Skip it and you risk:</strong> Engine sludge buildup, overheating, seized engine. An engine replacement runs $5,000–$10,000+. We&apos;ve seen people total otherwise-fine cars because they ignored oil changes.</span>
            </p>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Tire Rotation</h3>
          <div className="grid md:grid-cols-3 gap-4 my-6">
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">$20–$50</div>
              <div className="text-slate-600 text-sm">Typical Cost</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">5K–7.5K mi</div>
              <div className="text-slate-600 text-sm">How Often</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">~20 min</div>
              <div className="text-slate-600 text-sm">Service Time</div>
            </div>
          </div>
          <p className="text-slate-600 mb-4">Your front and rear tires wear differently depending on whether your car is front-, rear-, or all-wheel drive. Rotating them evens out the wear so you don&apos;t end up replacing two tires way before the other two. A lot of shops bundle this with your oil change for a flat rate around $60–$80 total — always ask about combo pricing.</p>
          <p className="text-slate-600 mb-4"><strong>Pro tip:</strong> Many tire shops offer free rotations for the life of the tire if you purchased from them. Costco, Discount Tire, and most dealerships do this.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Tire Pressure Check</h3>
          <p className="text-slate-600 mb-4"><strong>Cost: Free (DIY) | How often: Monthly</strong></p>
          <p className="text-slate-600 mb-4">Underinflated tires hurt your gas mileage, wear unevenly, and can blow out on the highway. Your TPMS light is a warning, not a suggestion. Check the sticker on your driver&apos;s door jamb for the correct PSI — not the number on the tire sidewall (that&apos;s the maximum, not the target).</p>

          {/* Tire pressure gauge image */}
          <div className="float-left mr-6 mb-4 w-1/2 rounded-2xl overflow-hidden">
            <img src="/blog/maintenance-checklist/tire-pressure.avif" alt="Checking tire pressure with a gauge" className="w-full h-auto object-cover" />
          </div>

          {/* === SECTION 2: EVERY 15,000–30,000 MILES === */}
          <div className="clear-both" />
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">🛞 The Semi-Regulars: Every 15,000–30,000 Miles</h2>
          <p className="text-slate-600 mb-4">These pop up once or twice a year for most drivers. Not as frequent, but just as important.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Brake Pad Replacement</h3>
          <div className="grid md:grid-cols-3 gap-4 my-6">
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">$150–$300</div>
              <div className="text-slate-600 text-sm">Per Axle</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">30K–70K mi</div>
              <div className="text-slate-600 text-sm">Typical Lifespan</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">1–2 hours</div>
              <div className="text-slate-600 text-sm">Service Time</div>
            </div>
          </div>
          <p className="text-slate-600 mb-4">Brake pads are wear items — they&apos;re literally designed to grind down over time. City drivers who do a lot of stop-and-go will chew through pads every 30,000 miles. Highway commuters can get 70,000+ miles out of a set. If you hear squealing or grinding, that&apos;s the wear indicator telling you it&apos;s time.</p>
          <p className="text-slate-600 mb-4">If you wait too long, the pads wear down to metal and start destroying your rotors. Rotors alone cost $200–$500 per axle to replace. So a $150 pad job can turn into a $600+ brake job real quick.</p>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-6">
            <p className="text-red-800 m-0 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
              <span><strong>Skip it and you risk:</strong> Rotor damage ($200–$500/axle), caliper damage ($300–$800), and — let&apos;s not sugarcoat it — brake failure. This is a safety item.</span>
            </p>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Engine Air Filter</h3>
          <div className="grid md:grid-cols-3 gap-4 my-6">
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">$20–$75</div>
              <div className="text-slate-600 text-sm">Typical Cost</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">15K–30K mi</div>
              <div className="text-slate-600 text-sm">How Often</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">~5 min</div>
              <div className="text-slate-600 text-sm">DIY Time</div>
            </div>
          </div>
          <p className="text-slate-600 mb-4">This is one of the easiest DIY jobs on any car. The filter keeps dust and debris out of your engine. When it&apos;s clogged, your engine works harder and burns more fuel. A replacement filter costs $10–$25 at any auto parts store and takes about five minutes to swap — no tools needed on most cars. Don&apos;t pay a shop $75 for something you can do in a parking lot.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Cabin Air Filter</h3>
          <p className="text-slate-600 mb-4"><strong>Cost: $15–$50 DIY / up to $100 at a shop | How often: Every 15,000–20,000 miles</strong></p>
          <p className="text-slate-600 mb-4">This filters the air coming through your vents. If your AC smells musty or your airflow seems weak, this is probably the culprit. Another super easy DIY — usually behind the glove box. YouTube your specific car model and you&apos;ll find a 3-minute tutorial.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Wiper Blades</h3>
          <p className="text-slate-600 mb-4"><strong>Cost: $15–$45 for a pair | How often: Every 6–12 months</strong></p>
          <p className="text-slate-600 mb-4">Cheap, easy to replace yourself, and absolutely critical for visibility. If they&apos;re streaking or chattering, swap them. Most auto parts stores will even install them for free when you buy them there.</p>

          {/* Wheel and brake closeup image */}
          <div className="float-right ml-6 mb-4 w-1/2 rounded-2xl overflow-hidden">
            <img src="/blog/maintenance-checklist/brakes-wheel.avif" alt="Close-up of a car wheel showing brake rotor and caliper" className="w-full h-auto object-cover" />
          </div>

          {/* === SECTION 3: THE BIG ONES === */}
          <div className="clear-both" />
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">⚙️ The Big Ones: Every 30,000–100,000 Miles</h2>
          <p className="text-slate-600 mb-4">These services are less frequent but more expensive. They&apos;re the ones that catch people off guard because they forget to budget for them.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Transmission Fluid Service</h3>
          <div className="grid md:grid-cols-3 gap-4 my-6">
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">$150–$400</div>
              <div className="text-slate-600 text-sm">Typical Cost</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">30K–60K mi</div>
              <div className="text-slate-600 text-sm">How Often</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">1–2 hours</div>
              <div className="text-slate-600 text-sm">Service Time</div>
            </div>
          </div>
          <p className="text-slate-600 mb-4">Many modern cars have &quot;sealed&quot; transmissions that manufacturers claim are &quot;lifetime fill.&quot; Don&apos;t fall for it. What they mean is the lifetime of the warranty — not the lifetime of the car. Most independent mechanics recommend changing transmission fluid every 30,000–60,000 miles regardless of what the manual says.</p>
          <p className="text-slate-600 mb-4">A transmission rebuild costs $3,000–$7,000. A fluid change costs $150–$400. The math is pretty simple.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Brake Fluid Flush</h3>
          <p className="text-slate-600 mb-4"><strong>Cost: $100–$200 | How often: Every 2–3 years or 30,000 miles</strong></p>
          <p className="text-slate-600 mb-4">Brake fluid absorbs moisture over time, which lowers its boiling point and can cause spongy brakes or even brake fade under heavy use. If your brake fluid looks dark brown instead of clear gold, it&apos;s time. This one&apos;s easy to forget because most people don&apos;t even know it&apos;s a thing.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Coolant Flush</h3>
          <p className="text-slate-600 mb-4"><strong>Cost: $100–$250 | How often: Every 30,000–50,000 miles or 5 years</strong></p>
          <p className="text-slate-600 mb-4">Coolant (antifreeze) keeps your engine from overheating in summer and freezing in winter. Over time it breaks down and becomes corrosive, which can eat through hoses and gaskets. An overheating engine can warp a cylinder head — and that&apos;s a $1,500–$3,000 repair.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Spark Plugs</h3>
          <p className="text-slate-600 mb-4"><strong>Cost: $100–$350 | How often: Every 60,000–100,000 miles</strong></p>
          <p className="text-slate-600 mb-4">Modern iridium or platinum plugs last a long time, but they do wear out. Worn plugs cause misfires, rough idling, poor fuel economy, and can eventually damage your catalytic converter ($1,000–$2,500 to replace). This is one of those where spending $200 now prevents a much larger bill later.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Timing Belt / Chain</h3>
          <div className="grid md:grid-cols-3 gap-4 my-6">
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">$400–$1,000</div>
              <div className="text-slate-600 text-sm">Belt Replacement</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">60K–100K mi</div>
              <div className="text-slate-600 text-sm">Service Interval</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">3–5 hours</div>
              <div className="text-slate-600 text-sm">Service Time</div>
            </div>
          </div>
          <p className="text-slate-600 mb-4">Not all cars have timing belts (many use chains that last much longer), so check your owner&apos;s manual. But if yours has a belt and it snaps, the pistons can slam into the valves and destroy your engine. This is one of the few maintenance items where failure can genuinely total your car. Don&apos;t gamble on it.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Battery Replacement</h3>
          <p className="text-slate-600 mb-4"><strong>Cost: $100–$300 | How often: Every 3–5 years</strong></p>
          <p className="text-slate-600 mb-4">Car batteries don&apos;t give much warning before they die. One morning you turn the key and... nothing. Most auto parts stores will test your battery for free. If it&apos;s showing weak, replace it before you end up stranded in a parking lot. Heat kills batteries faster than cold, so if you live in a warm climate, lean toward replacing every 3 years.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Tires</h3>
          <p className="text-slate-600 mb-4"><strong>Cost: $400–$1,200 for a full set | How often: Every 40,000–60,000 miles</strong></p>
          <p className="text-slate-600 mb-4">Do the penny test: stick a penny into your tread with Lincoln&apos;s head facing down. If you can see the top of his head, your tread is below 2/32&quot; and it&apos;s time. Bald tires are dangerous in rain and stop significantly slower. Don&apos;t cheap out here — your tires are the only thing connecting your car to the road.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Wheel Alignment</h3>
          <p className="text-slate-600 mb-4"><strong>Cost: $75–$175 | How often: Every 2–3 years or after hitting a serious pothole</strong></p>
          <p className="text-slate-600 mb-4">If your car pulls to one side or your steering wheel is off-center, you probably need an alignment. Misalignment eats through tires unevenly — and new tires aren&apos;t cheap. A $100 alignment can save you from needing $800 in tires six months early.</p>

          {/* === COST SUMMARY TABLE === */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">💰 The Full Cost Breakdown</h2>
          <p className="text-slate-600 mb-4">Here&apos;s everything in one place so you can actually budget for it:</p>

          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-amber-50">
                  <th className="text-left p-3 text-slate-900 font-semibold border-b border-slate-200">Service</th>
                  <th className="text-left p-3 text-slate-900 font-semibold border-b border-slate-200">Cost</th>
                  <th className="text-left p-3 text-slate-900 font-semibold border-b border-slate-200">Frequency</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="p-3 text-slate-600">Oil &amp; Filter Change</td>
                  <td className="p-3 text-slate-600">$35–$125</td>
                  <td className="p-3 text-slate-600">Every 5K–7.5K mi</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="p-3 text-slate-600">Tire Rotation</td>
                  <td className="p-3 text-slate-600">$20–$50</td>
                  <td className="p-3 text-slate-600">Every 5K–7.5K mi</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3 text-slate-600">Brake Pads</td>
                  <td className="p-3 text-slate-600">$150–$300/axle</td>
                  <td className="p-3 text-slate-600">Every 30K–70K mi</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="p-3 text-slate-600">Engine Air Filter</td>
                  <td className="p-3 text-slate-600">$20–$75</td>
                  <td className="p-3 text-slate-600">Every 15K–30K mi</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3 text-slate-600">Cabin Air Filter</td>
                  <td className="p-3 text-slate-600">$15–$100</td>
                  <td className="p-3 text-slate-600">Every 15K–20K mi</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="p-3 text-slate-600">Wiper Blades</td>
                  <td className="p-3 text-slate-600">$15–$45</td>
                  <td className="p-3 text-slate-600">Every 6–12 months</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3 text-slate-600">Transmission Fluid</td>
                  <td className="p-3 text-slate-600">$150–$400</td>
                  <td className="p-3 text-slate-600">Every 30K–60K mi</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="p-3 text-slate-600">Brake Fluid Flush</td>
                  <td className="p-3 text-slate-600">$100–$200</td>
                  <td className="p-3 text-slate-600">Every 2–3 years</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3 text-slate-600">Coolant Flush</td>
                  <td className="p-3 text-slate-600">$100–$250</td>
                  <td className="p-3 text-slate-600">Every 5 years</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="p-3 text-slate-600">Spark Plugs</td>
                  <td className="p-3 text-slate-600">$100–$350</td>
                  <td className="p-3 text-slate-600">Every 60K–100K mi</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3 text-slate-600">Timing Belt</td>
                  <td className="p-3 text-slate-600">$400–$1,000</td>
                  <td className="p-3 text-slate-600">Every 60K–100K mi</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="p-3 text-slate-600">Battery</td>
                  <td className="p-3 text-slate-600">$100–$300</td>
                  <td className="p-3 text-slate-600">Every 3–5 years</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3 text-slate-600">Tires (full set)</td>
                  <td className="p-3 text-slate-600">$400–$1,200</td>
                  <td className="p-3 text-slate-600">Every 40K–60K mi</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="p-3 text-slate-600">Wheel Alignment</td>
                  <td className="p-3 text-slate-600">$75–$175</td>
                  <td className="p-3 text-slate-600">Every 2–3 years</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* === SECTION 4: EV OWNERS === */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">⚡ What About Electric Vehicles?</h2>
          <p className="text-slate-600 mb-4">If you drive an EV, your maintenance list is a lot shorter — no oil changes, no spark plugs, no transmission fluid, no timing belt. But you&apos;re not completely off the hook:</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>Tire rotations</strong> — EVs are heavier, so tires wear faster. Stay on top of rotations.</li>
            <li><strong>Brake fluid</strong> — Still needs flushing every 2–3 years.</li>
            <li><strong>Cabin air filter</strong> — Same as gas cars.</li>
            <li><strong>Battery coolant</strong> — Some EVs need this serviced around 50,000 miles.</li>
            <li><strong>Software updates</strong> — Keep your car&apos;s software current. Some updates improve range and performance.</li>
            <li><strong>Brake pads</strong> — Last much longer on EVs thanks to regenerative braking. Many EV owners go 100,000+ miles on original pads.</li>
          </ul>
          <p className="text-slate-600 mb-4">Overall, EV maintenance costs roughly 30–40% less per year than gas-powered cars. But that high-voltage battery pack? If it fails outside of warranty, you&apos;re looking at $4,000–$18,000 for a replacement. The good news: most manufacturers warranty EV batteries for 8 years or 100,000 miles.</p>

          {/* === SECTION 5: MONEY-SAVING TIPS === */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">🧠 How to Save Money on Maintenance</h2>
          <ul className="text-slate-600 space-y-3 mb-6">
            <li><strong>DIY the easy stuff:</strong> Air filters, wiper blades, and tire pressure checks require zero mechanical skill. You&apos;ll save $50–$100 per service.</li>
            <li><strong>Use independent mechanics:</strong> They typically charge 20–40% less than dealerships for the same work. The quality is usually identical.</li>
            <li><strong>Bundle services:</strong> Ask your shop about oil change + tire rotation + inspection combos. Most offer package discounts.</li>
            <li><strong>Buy your own parts:</strong> If you&apos;re comfortable with it, buy parts from RockAuto or Amazon and bring them to your mechanic. You&apos;ll pay retail instead of the shop&apos;s markup.</li>
            <li><strong>Don&apos;t skip the cheap stuff:</strong> A $75 oil change prevents a $6,000 engine failure. A $150 brake pad job prevents a $600 rotor replacement. Prevention is always cheaper than repair.</li>
            <li><strong>Keep records:</strong> Well-documented maintenance history adds roughly $2,000 to your car&apos;s resale value according to CARFAX data.</li>
          </ul>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 my-6">
            <p className="text-green-800 m-0 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
              <span><strong>Budget rule of thumb:</strong> Set aside 1–2% of your car&apos;s purchase price each year for maintenance. On a $30,000 car, that&apos;s $300–$600/year, or $25–$50/month. Stash it in a separate account and you&apos;ll never be caught off guard.</span>
            </p>
          </div>

          {/* === CTA === */}
          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-semibold text-amber-600 mb-4">Not Sure What Car Fits Your Budget?</h3>
            <p className="text-slate-600 mb-6">Maintenance costs vary wildly by brand. Toyota and Honda are the cheapest to maintain long-term. BMW, Mercedes, and Audi? Not so much. Take our quiz and we&apos;ll match you to cars that fit both your lifestyle and your wallet.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Find Your Perfect Car
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/rental-car-guide" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-400 transition-colors">
              <span className="text-amber-600">The Ultimate Rental Car Guide: Best Companies, Best Deals</span>
            </Link>
            <Link href="/blog/electric-vs-hybrid" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-400 transition-colors">
              <span className="text-amber-600">Electric vs Hybrid: Which is Right?</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
