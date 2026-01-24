"use client";

import { BookOpen, Calculator, RefreshCw, Shield } from 'lucide-react';
import PageWrapper from '../components/shared/PageWrapper';

export default function ExpertisePage() {
  const resources = [
    { 
      icon: BookOpen, 
      title: 'Buying Guide', 
      desc: 'Complete guide to navigating the car buying process', 
      items: ['New vs. used comparison', 'Timing your purchase', 'Inspection checklist', 'Negotiation tips'] 
    },
    { 
      icon: Calculator, 
      title: 'Financing Options', 
      desc: 'Understanding loans, leases, and payments', 
      items: ['Loan vs. lease calculator', 'Credit score impact', 'Down payment strategies', 'Interest rate comparison'] 
    },
    { 
      icon: RefreshCw, 
      title: 'Trade-In Values', 
      desc: 'Maximize the value of your current vehicle', 
      items: ['Value estimation tools', 'Preparation tips', 'Timing strategies', 'Negotiation tactics'] 
    },
    { 
      icon: Shield, 
      title: 'Warranty & Protection', 
      desc: 'Understanding coverage options', 
      items: ['Factory warranty details', 'Extended warranty options', 'GAP insurance explained', 'Maintenance plans'] 
    }
  ];

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Our Expertise</h1>
          <p className="text-white/60 max-w-2xl mx-auto">Helpful guides and tools for your car buying journey</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource, i) => (
            <div key={i} className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                <resource.icon className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">{resource.title}</h2>
              <p className="text-white/60 mb-4">{resource.desc}</p>
              <ul className="space-y-2">
                {resource.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-white/70 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
