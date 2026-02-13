"use client";

import Link from 'next/link';
import { Target, Scale, BookOpen, Users, Wrench, MapPin, ChevronRight } from 'lucide-react';
import PageWrapper from '../components/shared/PageWrapper';

export default function AboutPage() {
  const freeServices = [
    { 
      icon: Target, 
      title: 'The Car Quiz', 
      desc: 'Our personalized vehicle matching assessment', 
      items: ['25 questions about your lifestyle', 'Analysis of 300+ vehicles', 'Instant personalized recommendations', 'Compare your top matches'],
      href: '/quiz',
      cta: 'Take the Quiz'
    },
    { 
      icon: Scale, 
      title: 'Compare Cars', 
      desc: 'Side-by-side vehicle comparison tool', 
      items: ['Compare specs and features', 'See pricing differences', 'View key specifications', 'Make informed decisions'],
      href: '/compare',
      cta: 'Compare Now'
    },
    { 
      icon: BookOpen, 
      title: "Wizard's Guide", 
      desc: 'Your complete car research hub', 
      items: ['Browse 300+ vehicles', 'Expert buying guides', 'Category breakdowns', 'Brand information'],
      href: '/',
      cta: 'Explore Guide'
    },
  ];

  const premiumServices = [
    { 
      icon: Users, 
      title: 'Expert Consultation', 
      desc: 'One-on-one guidance from our car experts', 
      items: ['In-depth lifestyle analysis', 'Budget and financing guidance', 'Feature comparison and recommendations', 'Personalized vehicle shortlist'],
      href: '/services'
    },
    { 
      icon: Wrench, 
      title: 'Customization Support', 
      desc: 'Make your vehicle uniquely yours', 
      items: ['Aftermarket product recommendations', 'Trusted installer network', 'Style and functionality planning', 'Interior and exterior options'],
      href: '/services'
    },
    { 
      icon: MapPin, 
      title: 'Purchase Assistance', 
      desc: 'We help you through the buying process', 
      items: ['Dealership connections', 'Financing and loan referrals', 'Certified pre-owned options', 'Negotiation support'],
      href: '/services'
    },
  ];

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">About Us</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Every step of the way, this is what we do</p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 rounded-2xl p-8 mb-16 text-center">
          <p className="text-slate-800 font-semibold text-lg max-w-2xl mx-auto">
            At Auto Wizard, we believe finding the perfect car shouldn&apos;t be overwhelming. 
            We combine expert knowledge with smart technology to guide you through every step 
            of your car buying journey - from research to purchase and protection.
          </p>
        </div>

        {/* Free Services */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Free Services</h2>
          <p className="text-slate-600 mb-8">Everything you need to research and find your perfect car</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {freeServices.map((service, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600 mb-4">{service.desc}</p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-700 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />{item}
                    </li>
                  ))}
                </ul>
                <Link 
                  href={service.href}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-all text-sm font-medium"
                >
                  {service.cta} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Services */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Premium Services</h2>
          <p className="text-slate-600 mb-8">Expert guidance when you need personalized support</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {premiumServices.map((service, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600 mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-700 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
            >
              View Premium Services <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to Find Your Perfect Car?</h3>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Start with our free quiz and get personalized recommendations in just 2 minutes.
          </p>
          <Link 
            href="/quiz"
            className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:from-amber-400 hover:to-amber-500 transition-all text-lg shadow-lg shadow-amber-500/25"
          >
            Take the Free Quiz →
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
