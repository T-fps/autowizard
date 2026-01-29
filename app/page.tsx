"use client";

import Link from 'next/link';
import { ChevronRight, Car, Zap, Users, DollarSign, Truck, Sparkles, BookOpen, Target, Scale, Tag, HelpCircle } from 'lucide-react';
import PageWrapper from './components/shared/PageWrapper';

const quickLinks = [
  {
    title: 'CarMatch™',
    description: 'Get personalized recommendations in 2 minutes',
    href: '/quiz',
    icon: Target,
    color: 'from-amber-500 to-amber-600',
    textColor: 'text-white',
    featured: true
  },
  {
    title: 'Compare Cars',
    description: 'Side-by-side vehicle comparison',
    href: '/compare',
    icon: Scale,
    color: 'from-cyan-500 to-blue-600',
    textColor: 'text-white',
  },
  {
    title: 'Best Cars 2025',
    description: 'Browse top-rated vehicles by category',
    href: '/best',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-600',
    textColor: 'text-white',
  },
  {
    title: 'Browse by Brand',
    description: 'Explore all 40+ manufacturers',
    href: '/brands',
    icon: Tag,
    color: 'from-green-500 to-emerald-600',
    textColor: 'text-white',
  },
];

const guideArticles = [
  {
    slug: 'what-car-should-i-buy',
    title: 'What Car Should I Buy?',
    description: 'The complete guide to finding your perfect vehicle match.',
    icon: HelpCircle,
    color: 'amber'
  },
  {
    slug: 'how-to-choose-a-car',
    title: 'How to Choose a Car',
    description: 'A step-by-step decision framework used by experts.',
    icon: Target,
    color: 'cyan'
  },
  {
    slug: 'first-car-buying-guide',
    title: 'First Car Buying Guide',
    description: 'Everything first-time buyers need to know.',
    icon: BookOpen,
    color: 'rose'
  },
  {
    slug: 'car-financing-guide',
    title: 'Financing, Loans & Leasing',
    description: 'Master budgeting, loans, and lease decisions.',
    icon: DollarSign,
    color: 'green'
  },
  {
    slug: 'used-vs-new-car',
    title: 'Used vs New Car',
    description: 'Complete pros and cons breakdown.',
    icon: Scale,
    color: 'orange'
  },
  {
    slug: 'electric-vs-hybrid',
    title: 'Electric vs Hybrid',
    description: 'Which powertrain is right for you?',
    icon: Zap,
    color: 'cyan'
  },
];

const browseCategories = [
  { name: 'Best SUVs', href: '/best/suvs', icon: Car, count: '170+', color: 'from-blue-500 to-cyan-500' },
  { name: 'Best Trucks', href: '/best/trucks', icon: Truck, count: '35+', color: 'from-orange-500 to-amber-500' },
  { name: 'Best Sedans', href: '/best/sedans', icon: Car, count: '60+', color: 'from-purple-500 to-pink-500' },
  { name: 'Electric Cars', href: '/best/electric', icon: Zap, count: '40+', color: 'from-green-500 to-emerald-500' },
  { name: 'Luxury Cars', href: '/best/luxury', icon: Sparkles, count: '80+', color: 'from-amber-500 to-yellow-500' },
  { name: 'Family Cars', href: '/best/family', icon: Users, count: '50+', color: 'from-rose-500 to-pink-500' },
  { name: 'Under $30K', href: '/best/under-30k', icon: DollarSign, count: '60+', color: 'from-cyan-500 to-blue-500' },
  { name: 'Under $40K', href: '/best/under-40k', icon: DollarSign, count: '100+', color: 'from-indigo-500 to-purple-500' },
];

const popularBrands = [
  { name: 'Toyota', href: '/brands/toyota' },
  { name: 'Honda', href: '/brands/honda' },
  { name: 'Ford', href: '/brands/ford' },
  { name: 'Chevrolet', href: '/brands/chevrolet' },
  { name: 'BMW', href: '/brands/bmw' },
  { name: 'Mercedes-Benz', href: '/brands/mercedes-benz' },
  { name: 'Tesla', href: '/brands/tesla' },
  { name: 'Lexus', href: '/brands/lexus' },
  { name: 'Audi', href: '/brands/audi' },
  { name: 'Jeep', href: '/brands/jeep' },
  { name: 'Subaru', href: '/brands/subaru' },
  { name: 'Hyundai', href: '/brands/hyundai' },
];

const popularVehicles = [
  { name: 'Toyota RAV4', href: '/cars/toyota-rav4' },
  { name: 'Honda CR-V', href: '/cars/honda-cr-v' },
  { name: 'Ford F-150', href: '/cars/ford-f-150' },
  { name: 'Tesla Model Y', href: '/cars/tesla-model-y' },
  { name: 'Toyota Camry', href: '/cars/toyota-camry' },
  { name: 'Honda Civic', href: '/cars/honda-civic' },
  { name: 'Jeep Wrangler', href: '/cars/jeep-wrangler' },
  { name: 'BMW 3 Series', href: '/cars/bmw-3-series' },
];

const categoryColors: Record<string, string> = {
  amber: 'bg-amber-100 text-amber-700 border-amber-200',
  green: 'bg-green-100 text-green-700 border-green-200',
  cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  rose: 'bg-rose-100 text-rose-700 border-rose-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
};

export default function HomePage() {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-200 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span className="text-amber-700 text-sm font-medium">Your Car Research Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">The Wizard&apos;s Guide</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to find your perfect car. Browse 300+ vehicles, compare specs, or read our expert guides.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {quickLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                link.featured 
                  ? `bg-gradient-to-br ${link.color} hover:scale-[1.02] shadow-lg shadow-amber-500/20` 
                  : 'bg-slate-50 border border-slate-200 hover:border-amber-300 hover:bg-amber-50'
              }`}
            >
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl ${link.featured ? 'bg-white/20' : `bg-gradient-to-br ${link.color}`} flex items-center justify-center mb-4`}>
                  <link.icon className={`w-6 h-6 ${link.featured ? link.textColor : 'text-white'}`} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${link.featured ? link.textColor : 'text-slate-900'}`}>{link.title}</h3>
                <p className={`text-sm ${link.featured ? 'text-white/80' : 'text-slate-600'}`}>{link.description}</p>
              </div>
              {link.featured && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </Link>
          ))}
        </div>

        {/* Buying Guides */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">📚 Buying Guides</h2>
            <Link href="/blog" className="text-amber-600 hover:text-amber-500 text-sm font-medium flex items-center gap-1">
              More Articles <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guideArticles.map((guide) => (
              <Link 
                key={guide.slug}
                href={`/blog/${guide.slug}`}
                className={`group border rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${categoryColors[guide.color]}`}
              >
                <guide.icon className="w-8 h-8 mb-3" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-slate-600 text-sm">{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by Category */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">🏆 Browse by Category</h2>
            <Link href="/best" className="text-amber-600 hover:text-amber-500 text-sm font-medium flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {browseCategories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-3`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-slate-900 font-semibold group-hover:text-amber-600 transition-colors">{category.name}</h3>
                <p className="text-slate-500 text-sm">{category.count} vehicles</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Brands */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">🏷️ Popular Brands</h2>
            <Link href="/brands" className="text-amber-600 hover:text-amber-500 text-sm font-medium flex items-center gap-1">
              All Brands <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {popularBrands.map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 hover:bg-amber-100 hover:border-amber-300 hover:text-amber-700 transition-all duration-300"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Vehicles */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">🚗 Popular Vehicles</h2>
            <p className="text-slate-600 mb-4">Quick access to the most searched vehicles.</p>
            <div className="flex flex-wrap gap-3">
              {popularVehicles.map((vehicle) => (
                <Link 
                  key={vehicle.href}
                  href={vehicle.href} 
                  className="text-cyan-600 hover:text-cyan-500 text-sm"
                >
                  {vehicle.name} →
                </Link>
              ))}
              <Link href="/best" className="text-amber-600 hover:text-amber-500 text-sm font-medium">Browse All →</Link>
            </div>
          </div>
        </section>

        {/* CarMatch CTA */}
        <div className="bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Not Sure Where to Start?</h3>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Answer a few questions about your lifestyle and needs, and we&apos;ll recommend the perfect vehicles for you.
          </p>
          <Link 
            href="/quiz"
            className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:from-amber-400 hover:to-amber-500 transition-all text-lg shadow-lg shadow-amber-500/25"
          >
            Try CarMatch™ Free →
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
