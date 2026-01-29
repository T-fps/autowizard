"use client";

import Link from 'next/link';
import { Users, Wrench, Briefcase, Check } from 'lucide-react';
import PageWrapper from '../components/shared/PageWrapper';

export default function ServicesPage() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Our Services</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">Comprehensive automotive guidance from selection to ownership</p>
        </div>
        
        <div className="space-y-6">
          <div className="p-8 rounded-2xl bg-slate-100 border border-slate-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-amber-600 mb-2">Expert Consultation</h2>
                <p className="text-slate-500">One-on-one sessions with certified automotive specialists</p>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              {['In-depth lifestyle and needs analysis', 'Personalized vehicle recommendations', 'Dream, build, price and find my car', 'Feature comparison and prioritization', 'Customization with trim and options'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <Check className="w-5 h-5 text-amber-600 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-amber-600 font-semibold text-lg">$119 / session</span>
              <Link href="/consultation" className="px-6 py-2 rounded-lg bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 transition-all">Book Now</Link>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-slate-100 border border-slate-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-amber-600 mb-2">Customization Support</h2>
                <p className="text-slate-500">Personalize your vehicle with expert guidance</p>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              {['Aftermarket product recommendations', 'Trusted installer network access', 'Performance upgrade planning', 'Aesthetic customization guidance', 'Warranty-safe modification advice'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <Check className="w-5 h-5 text-amber-600 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-amber-600 font-semibold text-lg">$49 / consultation</span>
              <Link href="/consultation" className="px-6 py-2 rounded-lg bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 transition-all">Get Started</Link>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-slate-100 border border-slate-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-amber-600 mb-2">Purchase Assistance</h2>
                <p className="text-slate-500">Navigate the buying process with confidence</p>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              {['Dealership introductions and connections', 'Financing and loan office referrals', 'Price negotiation strategies', 'Certified pre-owned verification', 'Paperwork and documentation guidance'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <Check className="w-5 h-5 text-amber-600 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-amber-600 font-semibold text-lg">$79 / vehicle</span>
              <Link href="/consultation" className="px-6 py-2 rounded-lg bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 transition-all">Learn More</Link>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
