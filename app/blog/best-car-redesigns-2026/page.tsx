"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Star } from 'lucide-react';
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
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />January 28, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />9 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Best New Car Redesigns for 2026</h1>
          <p className="text-xl text-slate-600">These completely redesigned models offer fresh styling, new technology, and improved performance.</p>
        </header>

        <div className="prose prose-amber max-w-none">
          <div className="bg-amber-100 border border-amber-200 rounded-2xl p-6 mb-8">
            <p className="text-amber-700 m-0 flex items-start gap-3">
              <Star className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Fresh Start:</strong> A redesign means all-new platform, styling, and features - the best time to buy a new generation vehicle.</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. 2026 Toyota Camry: The Benchmark Reborn</h2>
          <p className="text-slate-600 mb-4">The ninth-generation Camry arrives with Toyota&apos;s most dramatic redesign yet. Built on the new TNGA-K platform, it sits lower and wider with a sportier stance that finally matches its driving dynamics.</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>What&apos;s New:</strong> All-new exterior, completely redesigned interior with 12.3&quot; touchscreen standard</li>
            <li><strong>Powertrain:</strong> Standard hybrid across all trims - no more gas-only option</li>
            <li><strong>Starting Price:</strong> $29,495</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. 2026 BMW 5 Series: Tech Leader</h2>
          <p className="text-slate-600 mb-4">BMW&apos;s executive sedan gets a ground-up redesign with the new Cluster Architecture platform. The interior features BMW&apos;s latest curved display and an optional 31-inch 8K theater screen for rear passengers.</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>What&apos;s New:</strong> New platform, standard 48V mild hybrid, available fully electric i5</li>
            <li><strong>Interior:</strong> Curved display, optional rear entertainment screen, vegan leather options</li>
            <li><strong>Starting Price:</strong> $57,195</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. 2026 Honda Pilot: Family Focused</h2>
          <p className="text-slate-600 mb-4">Honda&apos;s three-row SUV received its first complete redesign in four years, focusing on interior space, comfort, and an all-new TrailSport variant for off-road capability.</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>What&apos;s New:</strong> Boxy design, larger third row, TrailSport variant with real off-road chops</li>
            <li><strong>Interior:</strong> More cargo space, improved second-row access, standard wireless charging</li>
            <li><strong>Starting Price:</strong> $40,070</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. 2026 Mercedes-Benz E-Class: Luxury Elevated</h2>
          <p className="text-slate-600 mb-4">The E-Class has always been the heart of Mercedes, and the 2026 model proves why. The superscreen dashboard, available in sedan and wagon, creates a genuinely premium experience.</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>What&apos;s New:</strong> Available MBUX Superscreen spanning entire dashboard</li>
            <li><strong>Tech:</strong> Level 3 autonomous driving in some markets, advanced voice control</li>
            <li><strong>Starting Price:</strong> $58,950</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. 2026 Chevrolet Equinox EV: Electric for Everyone</h2>
          <p className="text-slate-600 mb-4">Chevrolet democratizes electric vehicles with the Equinox EV, offering a practical SUV with 300+ mile range at a mainstream price point.</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>What&apos;s New:</strong> Purpose-built EV on Ultium platform</li>
            <li><strong>Range:</strong> Up to 319 miles on a single charge</li>
            <li><strong>Starting Price:</strong> $34,995 (after incentives in some states)</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Why Redesigns Matter</h2>
          <p className="text-slate-600 mb-4">Buying a newly redesigned car offers several advantages:</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>Latest Technology:</strong> Redesigns typically bring the newest infotainment, safety features, and connectivity</li>
            <li><strong>Improved Efficiency:</strong> New platforms often deliver better fuel economy or EV range</li>
            <li><strong>Fresh Styling:</strong> You&apos;ll have a modern-looking car for years to come</li>
            <li><strong>Higher Resale:</strong> First-year redesigns often hold value better than outgoing models</li>
          </ul>

          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-semibold text-amber-600 mb-4">Find Your Perfect Redesign</h3>
            <p className="text-slate-600 mb-6">Not sure which redesigned model fits your lifestyle? Our assessment matches you with the right vehicle.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Take Free Assessment
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/most-improved-cars-2026" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-400 transition-colors">
              <span className="text-amber-600">Most Improved Cars of 2026</span>
            </Link>
            <Link href="/blog/best-cars-under-30k" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-400 transition-colors">
              <span className="text-amber-600">Best Cars Under $30K</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
