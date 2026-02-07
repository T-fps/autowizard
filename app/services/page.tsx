"use client";

import Link from 'next/link';
import { Users, Wrench, Briefcase, Check } from 'lucide-react';
import PageWrapper from '../components/shared/PageWrapper';

export default function ServicesPage() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h1>
          <p className="text-slate-500 max-w-2xl mx-auto mb-8">Comprehensive automotive guidance from selection to ownership</p>
          
          <Link 
            href="/consultation" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
          >
            Book Now
          </Link>
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
            <ul className="space-y-3">
              {['In-depth lifestyle and needs analysis', 'Personalized vehicle recommendations', 'Dream, build, price and find my car', 'Feature comparison and prioritization', 'Customization with trim and options'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <Check className="w-5 h-5 text-amber-600 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
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
            <ul className="space-y-3">
              {['Aftermarket product recommendations', 'Trusted installer network access', 'Performance upgrade planning', 'Aesthetic customization guidance', 'Warranty-safe modification advice'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <Check className="w-5 h-5 text-amber-600 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
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
            <ul className="space-y-3">
              {['Dealership introductions and connections', 'Financing and loan office referrals', 'Price negotiation strategies', 'Certified pre-owned verification', 'Paperwork and documentation guidance'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <Check className="w-5 h-5 text-amber-600 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
