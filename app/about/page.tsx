"use client";

import Link from 'next/link';
import { Target, Scale, BookOpen, Car, Users, Wrench, MapPin, ChevronRight } from 'lucide-react';
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
          <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
          <p className="text-white/60 max-w-2xl mx-auto">Every step of the way, this is what we do</p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-8 mb-16 text-center">
          <Car className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            At Auto Wizard, we believe finding the perfect car shouldn&apos;t be overwhelming. 
            We combine expert knowledge with smart technology to guide you through every step 
            of your car buying journey - from research to purchase.
          </p>
        </div>

        {/* Free Services */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Free Services</h2>
          <p className="text-white/60 mb-8">Everything you need to research and find your perfect car</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {freeServices.map((service, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-white/60 mb-4">{service.desc}</p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-white/70 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />{item}
                    </li>
                  ))}
                </ul>
                <Link 
                  href={service.href}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all text-sm font-medium"
                >
                  {service.cta} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Services */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Premium Services</h2>
          <p className="text-white/60 mb-8">Expert guidance when you need personalized support</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {premiumServices.map((service, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-white/60 mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-white/70 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500 transition-all"
            >
              View Premium Services <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Ready to Find Your Perfect Car?</h3>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            Start with our free quiz and get personalized recommendations in just 2 minutes.
          </p>
          <Link 
            href="/quiz"
            className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500 transition-all text-lg"
          >
            Take the Free Quiz →
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
