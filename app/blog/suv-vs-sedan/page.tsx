"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Car, Truck, CheckCircle, XCircle } from 'lucide-react';
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
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />8 min read</span>
            <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">Comparison</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">SUV vs. Sedan: Which Should You Buy in 2026?</h1>
          <p className="text-xl text-slate-600">A comprehensive comparison to help you decide between these two popular vehicle types.</p>
        </header>

        <div className="prose prose-lg max-w-none text-slate-600">
          <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-6 mb-8">
            <p className="text-cyan-800 m-0"><strong>Quick Answer:</strong> Choose an SUV if you need cargo space, higher seating position, or AWD capability. Choose a sedan if you prioritize fuel economy, lower cost, and easier parking/handling.</p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Side-by-Side Comparison</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-bold text-slate-900 m-0">SUV / Crossover</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> Higher seating position</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> More cargo space</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> Available third row</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> AWD often standard</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> Better in snow/rough roads</li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> Higher purchase price</li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> Worse fuel economy</li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> Harder to park</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <Car className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-900 m-0">Sedan</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> Better fuel economy</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> Lower purchase price</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> Easier to park/maneuver</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> Better handling</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> Lower insurance costs</li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> Less cargo space</li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> Lower seating position</li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> Max 5 passengers</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Cost Comparison: Similar Vehicles</h2>
          
          <div className="overflow-x-auto my-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 font-bold text-slate-900">Category</th>
                  <th className="text-left py-3 font-bold text-slate-900">Sedan Example</th>
                  <th className="text-left py-3 font-bold text-slate-900">SUV Example</th>
                  <th className="text-left py-3 font-bold text-slate-900">Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-3 font-semibold">Toyota</td>
                  <td>Camry: $28,400</td>
                  <td>RAV4: $31,380</td>
                  <td className="text-amber-600">+$2,980</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 font-semibold">Honda</td>
                  <td>Accord: $29,610</td>
                  <td>CR-V: $32,450</td>
                  <td className="text-amber-600">+$2,840</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 font-semibold">Mazda</td>
                  <td>Mazda3: $24,970</td>
                  <td>CX-30: $28,950</td>
                  <td className="text-amber-600">+$3,980</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">BMW</td>
                  <td>3 Series: $46,200</td>
                  <td>X3: $49,600</td>
                  <td className="text-amber-600">+$3,400</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Fuel Economy Comparison</h2>
          
          <div className="bg-slate-900 text-white rounded-xl p-6 my-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-amber-400 font-semibold mb-3">Average Sedan MPG</h4>
                <div className="space-y-2 text-sm">
                  <p>Toyota Camry: <span className="text-green-400">28 city / 39 hwy</span></p>
                  <p>Honda Accord: <span className="text-green-400">29 city / 37 hwy</span></p>
                  <p>Mazda3: <span className="text-green-400">28 city / 37 hwy</span></p>
                  <p className="pt-2 border-t border-slate-700">Average: <span className="font-bold text-green-400">~33 MPG combined</span></p>
                </div>
              </div>
              <div>
                <h4 className="text-amber-400 font-semibold mb-3">Average SUV MPG</h4>
                <div className="space-y-2 text-sm">
                  <p>Toyota RAV4: <span className="text-amber-400">27 city / 35 hwy</span></p>
                  <p>Honda CR-V: <span className="text-amber-400">28 city / 34 hwy</span></p>
                  <p>Mazda CX-5: <span className="text-amber-400">26 city / 31 hwy</span></p>
                  <p className="pt-2 border-t border-slate-700">Average: <span className="font-bold text-amber-400">~28 MPG combined</span></p>
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-4">Annual fuel savings with sedan (12,000 miles, $3.50/gal): <span className="text-white font-bold">~$220/year</span></p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Choose an SUV If You...</h2>
          <ul className="space-y-2 my-4">
            <li>Have kids and need to haul gear (sports equipment, strollers, etc.)</li>
            <li>Live in an area with snow or rough roads</li>
            <li>Prefer a commanding view of the road</li>
            <li>Need to tow a small trailer or boat</li>
            <li>Frequently transport large items (furniture, bikes)</li>
            <li>Want the option of a third row for extra passengers</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Choose a Sedan If You...</h2>
          <ul className="space-y-2 my-4">
            <li>Primarily commute on highways and city streets</li>
            <li>Want to maximize fuel economy and minimize costs</li>
            <li>Park in tight spaces or urban parking garages</li>
            <li>Prefer sportier handling and driving dynamics</li>
            <li>Don&apos;t need more than 5 passenger seats</li>
            <li>Value a smoother, quieter ride</li>
          </ul>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Not Sure Which Is Right for You?</h3>
            <p className="text-slate-700 mb-6">Tell us about your lifestyle and needs, and we&apos;ll recommend the perfect vehicle type and specific models for you.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Try CarMatch™ Free →
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/best-family-suvs" className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <span className="text-amber-600 font-medium">Best Family SUVs of 2026</span>
            </Link>
            <Link href="/blog/awd-vs-4wd" className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <span className="text-amber-600 font-medium">AWD vs. 4WD: What&apos;s the Difference?</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
