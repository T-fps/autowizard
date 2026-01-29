"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Mountain, Snowflake, Settings } from 'lucide-react';
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
            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">Technical Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">AWD vs. 4WD: What&apos;s the Difference?</h1>
          <p className="text-xl text-slate-600">Understanding these drivetrain types helps you choose the right vehicle for your driving conditions.</p>
        </header>

        <div className="prose prose-lg max-w-none text-slate-600">
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
            <p className="text-orange-800 m-0"><strong>Quick Answer:</strong> AWD is best for on-road traction in rain and light snow. 4WD (4x4) is built for serious off-road use and heavy-duty applications like towing in rough terrain.</p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">AWD vs. 4WD at a Glance</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <Snowflake className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-900 m-0">All-Wheel Drive (AWD)</h3>
              </div>
              <p className="text-sm mb-4">Power goes to all four wheels automatically. No driver input needed.</p>
              <ul className="space-y-2 text-sm">
                <li>✓ Always active or automatic</li>
                <li>✓ Better on-road handling</li>
                <li>✓ Improved rain/snow traction</li>
                <li>✓ Better fuel economy than 4WD</li>
                <li>✓ Found on cars, crossovers, SUVs</li>
                <li>✗ Not for serious off-roading</li>
              </ul>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
              <div className="flex items-center gap-2 mb-4">
                <Mountain className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-bold text-slate-900 m-0">Four-Wheel Drive (4WD)</h3>
              </div>
              <p className="text-sm mb-4">Driver engages 4WD when needed. Often includes low-range gearing.</p>
              <ul className="space-y-2 text-sm">
                <li>✓ Serious off-road capability</li>
                <li>✓ Low-range for rock crawling</li>
                <li>✓ Better towing in rough terrain</li>
                <li>✓ More durable components</li>
                <li>✓ Found on trucks, body-on-frame SUVs</li>
                <li>✗ Worse fuel economy</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">How AWD Works</h2>
          <p>All-wheel drive systems automatically distribute power between front and rear wheels based on traction conditions:</p>
          <ul className="space-y-2 my-4">
            <li><strong>Full-time AWD:</strong> Power always goes to all four wheels (Subaru, Audi Quattro)</li>
            <li><strong>Part-time AWD:</strong> Normally FWD, sends power to rear when slip detected (most crossovers)</li>
            <li><strong>Torque-vectoring AWD:</strong> Can send more power to individual wheels for better handling</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">How 4WD Works</h2>
          <p>Four-wheel drive uses a transfer case to send power to both axles:</p>
          <ul className="space-y-2 my-4">
            <li><strong>Part-time 4WD:</strong> 2WD normally, driver engages 4WD (Jeep Wrangler, Toyota 4Runner)</li>
            <li><strong>Full-time 4WD:</strong> Always active with center differential (Land Rover, some trucks)</li>
            <li><strong>4-High:</strong> For slippery roads, moderate speeds</li>
            <li><strong>4-Low:</strong> Maximum torque for rock crawling, steep grades, deep mud</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Which Do You Need?</h2>
          
          <div className="overflow-x-auto my-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 font-bold text-slate-900">Driving Condition</th>
                  <th className="text-left py-3 font-bold text-slate-900">Best Choice</th>
                  <th className="text-left py-3 font-bold text-slate-900">Why</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Rain &amp; wet roads</td><td className="text-blue-600">AWD</td><td>Automatic, no driver input needed</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Light snow (plowed roads)</td><td className="text-blue-600">AWD</td><td>Sufficient traction, better MPG</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Heavy snow/ice</td><td className="text-blue-600">AWD or 4WD</td><td>Either works with proper tires</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Gravel/dirt roads</td><td className="text-amber-600">4WD</td><td>More ground clearance, durability</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Off-road trails</td><td className="text-amber-600">4WD</td><td>Low-range gearing essential</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Rock crawling</td><td className="text-amber-600">4WD (4-Low)</td><td>Maximum torque multiplication</td></tr>
                <tr><td className="py-3 font-semibold">Towing in rough terrain</td><td className="text-amber-600">4WD</td><td>Stronger components</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Popular AWD Vehicles</h2>
          <ul className="space-y-2 my-4">
            <li><strong>Best AWD Sedans:</strong> Subaru Legacy, Audi A4, BMW 3 Series xDrive</li>
            <li><strong>Best AWD Crossovers:</strong> Subaru Outback, Mazda CX-50, Toyota RAV4</li>
            <li><strong>Best AWD SUVs:</strong> Lexus RX, Acura MDX, Porsche Cayenne</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Popular 4WD Vehicles</h2>
          <ul className="space-y-2 my-4">
            <li><strong>Best 4WD Trucks:</strong> Ford F-150, Toyota Tacoma, Chevrolet Silverado</li>
            <li><strong>Best 4WD SUVs:</strong> Jeep Wrangler, Toyota 4Runner, Ford Bronco</li>
            <li><strong>Best Luxury 4WD:</strong> Land Rover Defender, Lexus GX, Mercedes G-Class</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Cost of AWD/4WD</h2>
          
          <div className="bg-slate-900 text-white rounded-xl p-6 my-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span>AWD option (on cars/crossovers)</span>
                <span className="text-amber-400 font-bold">+$1,500 - $3,000</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span>4WD option (on trucks)</span>
                <span className="text-amber-400 font-bold">+$3,000 - $5,000</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span>Fuel economy penalty (AWD)</span>
                <span className="text-red-400">-1 to 3 MPG</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Fuel economy penalty (4WD)</span>
                <span className="text-red-400">-2 to 4 MPG</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Tires Matter More Than Drivetrain</h2>
          <p className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4">
            <strong>Important:</strong> A FWD car with dedicated winter tires will outperform an AWD vehicle with all-season tires in snow. No drivetrain system can overcome poor tire grip. If you live in a snowy climate, budget for winter tires regardless of your drivetrain.
          </p>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Find the Right Drivetrain for You</h3>
            <p className="text-slate-700 mb-6">Tell us about your climate, terrain, and driving habits, and we&apos;ll recommend vehicles with the right drivetrain for your needs.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Try CarMatch™ Free →
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/suv-vs-sedan" className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <span className="text-amber-600 font-medium">SUV vs. Sedan: Which Should You Buy?</span>
            </Link>
            <Link href="/blog/best-family-suvs" className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <span className="text-amber-600 font-medium">Best Family SUVs of 2026</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
