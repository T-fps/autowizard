"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Users } from 'lucide-react';
import PageWrapper from '../../components/shared/PageWrapper';

export default function BlogPost() {
  return (
    <PageWrapper>
      <article className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Wizard's Guide
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />January 1, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />10 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Best Family SUVs of 2026</h1>
          <p className="text-xl text-slate-500">Our top picks for families who need space, safety, and reliability without sacrificing comfort.</p>
        </header>

        <div className="prose prose prose-amber max-w-none">
          <div className="bg-amber-100 border border-amber-200 rounded-2xl p-6 mb-8">
            <p className="text-amber-700 m-0 flex items-start gap-3">
              <Users className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Family First:</strong> When choosing a family SUV, prioritize safety ratings, ease of car seat installation, and cargo space over flashy features.</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Best 3-Row Family SUVs</h2>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Kia Telluride ($36,490 - $52,490)</h3>
          <p className="text-slate-600 mb-4">The reigning king of family SUVs. Spacious third row, premium interior, excellent value. The Telluride consistently tops family vehicle rankings for good reason.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Hyundai Palisade ($36,500 - $52,500)</h3>
          <p className="text-slate-600 mb-4">The Telluride's corporate twin with slightly different styling. Equally spacious with a few unique features like available Nappa leather and a built-in intercom system.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Toyota Grand Highlander ($45,070 - $58,000)</h3>
          <p className="text-slate-600 mb-4">Stretched version of the popular Highlander with significantly more cargo and third-row space. Hybrid MAX powertrain offers 362 hp with 34 mpg combined.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Mazda CX-90 ($40,970 - $58,475)</h3>
          <p className="text-slate-600 mb-4">For families who want driving engagement. Best-in-class interior quality, available inline-6 with plug-in hybrid option. Feels genuinely premium.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Best 2-Row Family SUVs</h2>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Toyota RAV4 ($30,825 - $41,090)</h3>
          <p className="text-slate-600 mb-4">America's best-selling SUV for good reason. Reliable, practical, with excellent hybrid and plug-in hybrid options. Adventure trim adds genuine off-road capability.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Honda CR-V ($32,450 - $41,550)</h3>
          <p className="text-slate-600 mb-4">Spacious, fuel-efficient, and practical. The CR-V offers the best rear-seat space in its class and Honda's reputation for longevity.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Subaru Outback ($31,895 - $42,995)</h3>
          <p className="text-slate-600 mb-4">Standard AWD, wagon-like cargo space, and excellent safety features. The Wilderness trim handles genuine off-road adventures.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Safety Essentials to Look For</h2>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li>IIHS Top Safety Pick+ rating</li>
            <li>Automatic Emergency Braking with pedestrian detection</li>
            <li>Blind Spot Monitoring</li>
            <li>Rear Cross-Traffic Alert</li>
            <li>Easy-to-use LATCH anchors for car seats</li>
            <li>Rear-seat reminder systems</li>
          </ul>

          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-semibold text-amber-600 mb-4">Find the Right SUV for Your Family</h3>
            <p className="text-slate-600 mb-6">Our assessment considers your family size, activities, and budget to recommend the perfect fit.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Take Free Assessment
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/what-car-should-i-buy" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-600">What Car Should I Buy?</span>
            </Link>
            <Link href="/blog/best-cars-under-30k" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-600">Best Cars Under $30K</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
