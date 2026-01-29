"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Award, Shield, Star } from 'lucide-react';
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
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />10 min read</span>
            <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Rankings</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Most Reliable Cars of 2026: Complete Rankings</h1>
          <p className="text-xl text-slate-600">Based on Consumer Reports data, J.D. Power studies, and owner surveys—these are the cars that will go the distance.</p>
        </header>

        <div className="prose prose-lg max-w-none text-slate-600">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <p className="text-amber-800 m-0 flex items-start gap-3">
              <Award className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Top Pick:</strong> Toyota and Lexus continue to dominate reliability rankings in 2026, with the Toyota Camry, Corolla, and Lexus ES leading their segments for predicted reliability.</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Most Reliable Brands Overall</h2>
          
          <div className="space-y-3 my-6">
            {[
              { rank: 1, brand: 'Lexus', score: 76, note: '5 years running at #1' },
              { rank: 2, brand: 'Toyota', score: 74, note: 'Most reliable mainstream brand' },
              { rank: 3, brand: 'Mazda', score: 66, note: 'Best non-luxury Japanese brand' },
              { rank: 4, brand: 'Honda', score: 64, note: 'Consistent performer' },
              { rank: 5, brand: 'Subaru', score: 62, note: 'Most reliable AWD lineup' },
            ].map((item) => (
              <div key={item.rank} className="flex items-center gap-4 bg-slate-50 rounded-xl p-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">{item.rank}</div>
                <div className="flex-1">
                  <span className="font-semibold text-slate-900">{item.brand}</span>
                  <span className="text-sm text-slate-500 ml-2">{item.note}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{item.score}/100</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Most Reliable Sedans</h2>
          <div className="overflow-x-auto my-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 font-bold text-slate-900">Rank</th>
                  <th className="text-left py-3 font-bold text-slate-900">Vehicle</th>
                  <th className="text-left py-3 font-bold text-slate-900">Starting Price</th>
                  <th className="text-left py-3 font-bold text-slate-900">Score</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200"><td className="py-3">1</td><td className="font-semibold">Toyota Camry</td><td>$28,400</td><td>⭐⭐⭐⭐⭐</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3">2</td><td className="font-semibold">Honda Accord</td><td>$29,610</td><td>⭐⭐⭐⭐⭐</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3">3</td><td className="font-semibold">Toyota Corolla</td><td>$22,995</td><td>⭐⭐⭐⭐⭐</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3">4</td><td className="font-semibold">Mazda3</td><td>$24,970</td><td>⭐⭐⭐⭐</td></tr>
                <tr><td className="py-3">5</td><td className="font-semibold">Honda Civic</td><td>$25,045</td><td>⭐⭐⭐⭐</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Most Reliable SUVs</h2>
          <div className="overflow-x-auto my-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 font-bold text-slate-900">Rank</th>
                  <th className="text-left py-3 font-bold text-slate-900">Vehicle</th>
                  <th className="text-left py-3 font-bold text-slate-900">Starting Price</th>
                  <th className="text-left py-3 font-bold text-slate-900">Score</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200"><td className="py-3">1</td><td className="font-semibold">Lexus RX</td><td>$51,000</td><td>⭐⭐⭐⭐⭐</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3">2</td><td className="font-semibold">Toyota RAV4</td><td>$31,380</td><td>⭐⭐⭐⭐⭐</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3">3</td><td className="font-semibold">Mazda CX-5</td><td>$30,400</td><td>⭐⭐⭐⭐⭐</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3">4</td><td className="font-semibold">Honda CR-V</td><td>$32,450</td><td>⭐⭐⭐⭐</td></tr>
                <tr><td className="py-3">5</td><td className="font-semibold">Toyota Highlander</td><td>$42,350</td><td>⭐⭐⭐⭐</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Most Reliable Trucks</h2>
          <div className="overflow-x-auto my-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 font-bold text-slate-900">Rank</th>
                  <th className="text-left py-3 font-bold text-slate-900">Vehicle</th>
                  <th className="text-left py-3 font-bold text-slate-900">Starting Price</th>
                  <th className="text-left py-3 font-bold text-slate-900">Score</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200"><td className="py-3">1</td><td className="font-semibold">Toyota Tacoma</td><td>$35,880</td><td>⭐⭐⭐⭐⭐</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3">2</td><td className="font-semibold">Toyota Tundra</td><td>$42,275</td><td>⭐⭐⭐⭐</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3">3</td><td className="font-semibold">Honda Ridgeline</td><td>$43,620</td><td>⭐⭐⭐⭐</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3">4</td><td className="font-semibold">Ford F-150</td><td>$38,965</td><td>⭐⭐⭐</td></tr>
                <tr><td className="py-3">5</td><td className="font-semibold">Chevrolet Silverado</td><td>$40,500</td><td>⭐⭐⭐</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">What Makes a Car Reliable?</h2>
          <ul className="space-y-2 my-4">
            <li><strong>Proven powertrains:</strong> Engines and transmissions with years of refinement</li>
            <li><strong>Quality materials:</strong> Components that withstand wear and weather</li>
            <li><strong>Simple technology:</strong> Fewer complex systems mean fewer potential failures</li>
            <li><strong>Build quality:</strong> Consistent manufacturing processes and quality control</li>
            <li><strong>Owner maintenance:</strong> Vehicles designed for easy, affordable upkeep</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Brands to Avoid for Reliability</h2>
          <p>These brands consistently rank lowest in reliability studies:</p>
          <ul className="space-y-2 my-4">
            <li><strong>Alfa Romeo:</strong> Beautiful but problematic—electrical and mechanical issues</li>
            <li><strong>Jeep:</strong> Off-road capability often comes with reliability trade-offs</li>
            <li><strong>Land Rover:</strong> Luxury meets frequent repair shop visits</li>
            <li><strong>Chrysler/Dodge:</strong> Aging platforms show their age</li>
          </ul>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Find Your Perfect Reliable Car</h3>
            <p className="text-slate-700 mb-6">Tell us what you need, and we&apos;ll recommend reliable vehicles that match your lifestyle and budget.</p>
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
            <Link href="/blog/best-cars-for-gas-mileage" className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <span className="text-amber-600 font-medium">Best Cars for Gas Mileage</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
