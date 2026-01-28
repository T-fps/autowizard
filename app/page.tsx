"use client";

import Link from 'next/link';
import { Car, Users, Wrench, MapPin, ChevronRight, Check, Sparkles, Target, CarFront, Gauge, Heart } from 'lucide-react';
import PageWrapper from './components/shared/PageWrapper';

export default function HomePage() {
  // Number of questions in the quiz (matches quiz page)
  const questionCount = 25;

  return (
    <PageWrapper>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="relative text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-8">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Quick & Easy Vehicle Matching Assessment
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Find The </span>
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Perfect</span>
              <br />
              <span className="text-white">Vehicle</span>
            </h1>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Our quick and easy vehicle matching assessment analyzes your lifestyle, needs, and preferences to match you with the car of your dreams from 16 categories and 400+ models.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/quiz" 
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-lg font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-2xl shadow-amber-500/30 hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  Find Your Dream Car
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                href="/consultation" 
                className="px-8 py-4 rounded-xl border border-white/20 text-white hover:border-amber-500/50 hover:text-amber-400 transition-all text-center"
              >
                Contact One of Our Experts
              </Link>
              <Link 
                href="/blog" 
                className="px-8 py-4 rounded-xl border border-white/20 text-white hover:border-amber-500/50 hover:text-amber-400 transition-all text-center"
              >
                Wizard&apos;s Guide
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="relative mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: questionCount.toString(), label: 'Questions', icon: Target },
              { value: '16', label: 'Categories', icon: CarFront },
              { value: '400+', label: 'Models', icon: Gauge },
              { value: '100%', label: 'Free', icon: Heart }
            ].map((s, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                <s.icon className="w-6 h-6 text-amber-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-sm text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="space-y-4">
            {[
              { icon: Car, title: 'Advanced Matching', desc: 'Sophisticated algorithm analyzes 20+ factors for precise recommendations' },
              { icon: Users, title: 'Expert Consultation', desc: "Dream, build, and price your car, we've got you" },
              { icon: Wrench, title: 'Aftermarket Support', desc: 'Custom interiors and exteriors, to make your car stand out' },
              { icon: MapPin, title: 'Dealership Network', desc: 'Direct connections to dealerships, financing, and sales' }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
                <item.icon className="w-10 h-10 text-amber-400 mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Overview Section */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Comprehensive Services</h2>
          <div className="space-y-6">
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
              <h3 className="text-xl font-semibold text-amber-400 mb-6">Consultation Services</h3>
              <ul className="space-y-4">
                {['In-depth lifestyle analysis', 'Budget and financing guidance', 'Feature comparison and recommendations'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
              <h3 className="text-xl font-semibold text-amber-400 mb-6">Customization Support</h3>
              <ul className="space-y-4">
                {['Aftermarket product recommendations', 'Trusted installer network', 'Style and functionality planning'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
              <h3 className="text-xl font-semibold text-amber-400 mb-6">Purchase Assistance</h3>
              <ul className="space-y-4">
                {['Dealership connections', 'Financing and loan office referrals', 'Certified pre-owned options'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* CTA to Services */}
          <div className="mt-8 text-center">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all"
            >
              View All Services
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Find Your Perfect Vehicle?</h2>
          <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
            Take our free assessment and get personalized recommendations based on your unique lifestyle and preferences.
          </p>
          <Link 
            href="/quiz" 
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-lg font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-2xl shadow-amber-500/30 hover:scale-105"
          >
            Start Free Assessment
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>
      </div>
    </PageWrapper>
  );
}
