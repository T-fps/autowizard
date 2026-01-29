"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Shield, DollarSign, Heart } from 'lucide-react';
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
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />January 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />9 min read</span>
            <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">Teen Drivers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Best First Cars for Teens &amp; New Drivers (2026)</h1>
          <p className="text-xl text-slate-600">Safe, reliable, and affordable vehicles perfect for young drivers just starting out.</p>
        </header>

        <div className="prose prose-lg max-w-none text-slate-600">
          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6 mb-8">
            <p className="text-pink-800 m-0 flex items-start gap-3">
              <Shield className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Safety First:</strong> Car crashes are the leading cause of death for teens. Prioritize vehicles with top safety ratings, modern driver assistance features, and good crash test scores over style or speed.</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">What to Look for in a First Car</h2>
          <ul className="space-y-2 my-4">
            <li><strong>Top safety ratings:</strong> 5-star NHTSA or IIHS Top Safety Pick</li>
            <li><strong>Modern safety tech:</strong> Automatic emergency braking, lane departure warning</li>
            <li><strong>Reliable brand:</strong> Toyota, Honda, Mazda minimize repair headaches</li>
            <li><strong>Affordable insurance:</strong> Smaller, safer cars cost less to insure for teens</li>
            <li><strong>Modest power:</strong> 150-200 HP is plenty—avoid sports cars and turbo engines</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Best New Cars for Teen Drivers</h2>
          
          <div className="space-y-4 my-6">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-900 text-lg">1. Honda Civic</h4>
                <span className="text-amber-600 font-semibold">$25,045</span>
              </div>
              <p className="text-sm mb-2">IIHS Top Safety Pick+. Standard Honda Sensing suite with collision mitigation, lane keeping, and adaptive cruise control.</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Excellent Safety</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Great Reliability</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">34 MPG</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-900 text-lg">2. Toyota Corolla</h4>
                <span className="text-amber-600 font-semibold">$22,995</span>
              </div>
              <p className="text-sm mb-2">IIHS Top Safety Pick. Toyota Safety Sense standard on all trims. Legendary reliability means fewer repair bills.</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Top Safety Pick</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Best Reliability</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">34 MPG</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-900 text-lg">3. Mazda3</h4>
                <span className="text-amber-600 font-semibold">$24,970</span>
              </div>
              <p className="text-sm mb-2">IIHS Top Safety Pick+. Upscale interior quality. Available hatchback adds practicality for college life.</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Top Safety Pick+</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Premium Feel</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">32 MPG</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-900 text-lg">4. Hyundai Elantra</h4>
                <span className="text-amber-600 font-semibold">$22,865</span>
              </div>
              <p className="text-sm mb-2">Bold styling appeals to younger buyers. Excellent warranty (5-year/60,000 mile bumper-to-bumper). Great value.</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Top Safety Pick</span>
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">Best Warranty</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">37 MPG</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-900 text-lg">5. Subaru Crosstrek</h4>
                <span className="text-amber-600 font-semibold">$28,290</span>
              </div>
              <p className="text-sm mb-2">Standard AWD for all-weather confidence. Higher ground clearance for light off-road. EyeSight safety suite.</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Standard AWD</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">All-Weather Ready</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">30 MPG</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Best Used Cars for Teen Drivers</h2>
          <p>A 3-5 year old used car can save thousands while still offering modern safety features:</p>
          
          <div className="overflow-x-auto my-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 font-bold text-slate-900">Vehicle</th>
                  <th className="text-left py-3 font-bold text-slate-900">Years to Look For</th>
                  <th className="text-left py-3 font-bold text-slate-900">Used Price Range</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Honda Civic</td><td>2022-2024</td><td>$18,000 - $24,000</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Toyota Corolla</td><td>2022-2024</td><td>$17,000 - $22,000</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Mazda3</td><td>2021-2024</td><td>$18,000 - $24,000</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Subaru Impreza</td><td>2021-2024</td><td>$16,000 - $22,000</td></tr>
                <tr><td className="py-3 font-semibold">Kia Forte</td><td>2022-2024</td><td>$14,000 - $19,000</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Cars to AVOID for Teen Drivers</h2>
          <ul className="space-y-2 my-4">
            <li><strong>Sports cars:</strong> Mustang, Camaro, WRX—high insurance and encourages speeding</li>
            <li><strong>Large trucks/SUVs:</strong> Harder to control, worse visibility, rollover risk</li>
            <li><strong>Older cars without safety tech:</strong> Pre-2018 vehicles often lack critical features</li>
            <li><strong>Turbocharged vehicles:</strong> More power than a new driver needs</li>
            <li><strong>Convertibles:</strong> Less structural protection in rollovers</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Insurance Costs for Teen Drivers</h2>
          <p>Teen drivers pay the highest insurance rates. A safe, modest vehicle can save hundreds per year:</p>
          
          <div className="bg-slate-900 text-white rounded-xl p-6 my-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span>Honda Civic (sedan)</span>
                <span className="text-green-400 font-bold">~$2,400/year</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span>Toyota RAV4 (SUV)</span>
                <span className="text-amber-400">~$2,700/year</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span>Ford Mustang (sports)</span>
                <span className="text-red-400 font-bold">~$4,200/year</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-4">Choosing a Civic over a Mustang saves: <span className="text-white font-bold">$1,800/year</span></p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Find the Perfect First Car</h3>
            <p className="text-slate-700 mb-6">Tell us your budget and priorities, and we&apos;ll recommend safe, reliable first cars perfect for new drivers.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Try CarMatch™ Free →
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/best-cars-under-30k" className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <span className="text-amber-600 font-medium">Best Cars Under $30,000</span>
            </Link>
            <Link href="/blog/most-reliable-cars-2026" className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <span className="text-amber-600 font-medium">Most Reliable Cars of 2026</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
