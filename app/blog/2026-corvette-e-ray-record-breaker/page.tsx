"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Zap } from 'lucide-react';
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
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />January 28, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />8 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">2026 Chevrolet Corvette E-Ray: The Record Breaker</h1>
          <p className="text-xl text-slate-600">How Chevy created the fastest production Corvette ever by combining V8 muscle with electric precision.</p>
        </header>

        <div className="prose prose-amber max-w-none">
          <div className="bg-amber-100 border border-amber-200 rounded-2xl p-6 mb-8">
            <p className="text-amber-700 m-0 flex items-start gap-3">
              <Zap className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Record Alert:</strong> The 2026 E-Ray broke the Corvette 0-60 record at 2.5 seconds, making it faster than many supercars costing 3x as much.</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Best of Both Worlds</h2>
          <p className="text-slate-600 mb-4">The E-Ray represents a pivotal moment in Corvette history. It&apos;s the first electrified Corvette and the first with all-wheel drive. But more importantly, it proves that electrification can enhance - not diminish - the driving experience.</p>
          
          <p className="text-slate-600 mb-4">At the heart of the E-Ray is Chevrolet&apos;s familiar 6.2-liter LT2 V8, producing 495 horsepower sent to the rear wheels through an 8-speed dual-clutch transmission. But here&apos;s where it gets interesting: a 160-horsepower electric motor powers the front wheels, bringing total system output to 655 horsepower.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">By The Numbers</h2>
          <div className="grid md:grid-cols-2 gap-4 my-8">
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-3xl font-bold text-amber-600">655 HP</div>
              <div className="text-slate-600 text-sm">Combined System Power</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-3xl font-bold text-amber-600">2.5 sec</div>
              <div className="text-slate-600 text-sm">0-60 MPH</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-3xl font-bold text-amber-600">10.5 sec</div>
              <div className="text-slate-600 text-sm">Quarter Mile</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-3xl font-bold text-amber-600">AWD</div>
              <div className="text-slate-600 text-sm">All-Wheel Drive</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">What&apos;s New for 2026</h2>
          <p className="text-slate-600 mb-4">For 2026, Chevrolet refined the E-Ray in several key areas:</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>Suspension Tuning:</strong> Revised Magnetic Ride Control 4.0 calibration for better body control without sacrificing comfort</li>
            <li><strong>Battery Management:</strong> Improved thermal management allows for more consistent performance during track sessions</li>
            <li><strong>Launch Control:</strong> New algorithm shaves 0.1 seconds off the 0-60 time</li>
            <li><strong>Stealth Mode:</strong> Electric-only driving extended to speeds up to 45 mph (up from 35)</li>
            <li><strong>New Colors:</strong> Hysteria Purple and Riptide Blue Metallic join the palette</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">How the Hybrid System Works</h2>
          <p className="text-slate-600 mb-4">Unlike typical hybrids focused on fuel economy, the E-Ray&apos;s electric system is designed purely for performance. The front electric motor provides instant torque fill during gear changes, eliminating the power gaps that plague traditional automatics during hard acceleration.</p>
          
          <p className="text-slate-600 mb-4">The 1.9 kWh battery pack is small but mighty, positioned in the center tunnel where the transmission tunnel would be in a front-engine car. This maintains the Corvette&apos;s ideal 50/50 weight distribution while adding the benefits of all-wheel drive.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Competition</h2>
          <p className="text-slate-600 mb-4">The E-Ray&apos;s $104,295 starting price undercuts most of its performance rivals significantly:</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>Porsche 911 Carrera 4S:</strong> $137,400 - similar AWD performance, but less power</li>
            <li><strong>Audi R8:</strong> $158,600 - comparable speed, higher price</li>
            <li><strong>McLaren Artura:</strong> $237,500 - hybrid supercar territory</li>
            <li><strong>Ferrari 296 GTB:</strong> $322,986 - the hybrid benchmark at 3x the price</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Should You Buy One?</h2>
          <p className="text-slate-600 mb-4">The E-Ray makes sense if you want supercar performance with practical daily usability. The AWD system provides confidence in poor weather, while Stealth Mode lets you cruise neighborhoods quietly. It&apos;s essentially two cars in one: a silent cruiser and a record-breaking rocket.</p>

          <p className="text-slate-600 mb-4">However, if you&apos;re a purist who wants the most engaging driving experience, the standard Stingray or Z06 might be better choices. They&apos;re lighter and offer a more direct connection to the road.</p>

          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-semibold text-amber-600 mb-4">Is the E-Ray Right for You?</h3>
            <p className="text-slate-600 mb-6">Take our quick assessment to see if the Corvette E-Ray matches your driving style and needs.</p>
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
            <Link href="/blog/electric-vs-hybrid" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-400 transition-colors">
              <span className="text-amber-600">Electric vs Hybrid: Which is Right?</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
