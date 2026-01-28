"use client";

import Link from 'next/link';
import { ChevronRight, Car, Zap, Users, DollarSign, Truck, Sparkles } from 'lucide-react';
import PageWrapper from '../components/shared/PageWrapper';

const blogPosts = [
  {
    slug: 'what-car-should-i-buy',
    title: 'What Car Should I Buy? The Complete 2026 Guide',
    description: 'Everything you need to know to find the perfect car for your lifestyle, budget, and preferences.',
    category: 'Car Buying Guide',
    categoryColor: 'amber',
    date: 'January 22, 2026'
  },
  {
    slug: 'electric-vs-hybrid',
    title: 'Electric vs Hybrid: Which is Right for You?',
    description: 'A complete breakdown of the pros and cons of going electric versus hybrid in 2026.',
    category: 'Electric Vehicles',
    categoryColor: 'green',
    date: 'January 15, 2026'
  },
  {
    slug: 'best-cars-under-30k',
    title: 'Best Cars Under $30,000 in 2026',
    description: "Our top picks for affordable vehicles that don't compromise on quality or features.",
    category: 'Budget Tips',
    categoryColor: 'blue',
    date: 'January 8, 2026'
  },
  {
    slug: 'best-family-suvs',
    title: '10 Best Family SUVs for 2026',
    description: 'Space, safety, and sanity - our expert picks for the best family haulers this year.',
    category: 'Family Cars',
    categoryColor: 'purple',
    date: 'January 1, 2026'
  },
  {
    slug: 'how-to-choose-a-car',
    title: 'How to Choose a Car: Complete Decision Framework',
    description: 'A step-by-step guide to choosing the right car using the process experts use.',
    category: "Buyer's Guide",
    categoryColor: 'cyan',
    date: 'December 25, 2025'
  },
  {
    slug: 'first-car-buying-guide',
    title: 'First Car Buying Guide: Tips for New Drivers',
    description: 'Everything first-time car buyers need to know about insurance, financing, and more.',
    category: 'First-Time Buyers',
    categoryColor: 'rose',
    date: 'December 18, 2025'
  },
  {
    slug: 'best-commuter-cars',
    title: 'Best Commuter Cars 2026: Fuel-Efficient Daily Drivers',
    description: 'Top picks for daily commuters who want comfort, fuel efficiency, and reliability.',
    category: 'Commuter Cars',
    categoryColor: 'indigo',
    date: 'December 11, 2025'
  },
  {
    slug: 'used-vs-new-car',
    title: 'Used vs New Car: Which Should You Buy?',
    description: 'The complete pros and cons breakdown of buying new versus used.',
    category: 'Buying Tips',
    categoryColor: 'orange',
    date: 'December 4, 2025'
  }
];

const categoryColors: Record<string, string> = {
  amber: 'bg-amber-500/20 text-amber-400',
  green: 'bg-green-500/20 text-green-400',
  blue: 'bg-blue-500/20 text-blue-400',
  purple: 'bg-purple-500/20 text-purple-400',
  cyan: 'bg-cyan-500/20 text-cyan-400',
  rose: 'bg-rose-500/20 text-rose-400',
  indigo: 'bg-indigo-500/20 text-indigo-400',
  orange: 'bg-orange-500/20 text-orange-400'
};

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

export default function BlogPage() {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">The Wizard&apos;s Guide</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Your complete car research hub. Browse 329+ vehicles, compare by category, or read our expert guides.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <Link 
            href="/quiz"
            className="group relative overflow-hidden bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="relative z-10">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl font-bold text-black mb-2">Take the Quiz</h3>
              <p className="text-black/70 text-sm">Get personalized recommendations in 2 minutes</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <Link 
            href="/compare"
            className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300"
          >
            <div className="text-4xl mb-3">⚖️</div>
            <h3 className="text-xl font-bold text-white mb-2">Compare Cars</h3>
            <p className="text-white/60 text-sm">Side-by-side vehicle comparison</p>
          </Link>
          
          <Link 
            href="/best"
            className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300"
          >
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="text-xl font-bold text-white mb-2">Best Cars 2025</h3>
            <p className="text-white/60 text-sm">Browse top-rated vehicles by category</p>
          </Link>
          
          <Link 
            href="/brands"
            className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300"
          >
            <div className="text-4xl mb-3">🏷️</div>
            <h3 className="text-xl font-bold text-white mb-2">Browse by Brand</h3>
            <p className="text-white/60 text-sm">Explore all 30+ manufacturers</p>
          </Link>
        </div>

        {/* Browse by Category */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
            <Link href="/best" className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {browseCategories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-3`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-semibold group-hover:text-amber-400 transition-colors">{category.name}</h3>
                <p className="text-white/40 text-sm">{category.count} vehicles</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Brands */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Popular Brands</h2>
            <Link href="/brands" className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center gap-1">
              All Brands <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {popularBrands.map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-amber-500/20 hover:border-amber-500/30 hover:text-amber-400 transition-all duration-300"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Search Specific Vehicle */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-2">Looking for a Specific Vehicle?</h2>
            <p className="text-white/60 mb-4">We have detailed pages for 329 vehicles with specs, pricing, and recommendations.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/cars/toyota-camry" className="text-cyan-400 hover:text-cyan-300 text-sm">Toyota Camry →</Link>
              <Link href="/cars/ford-f-150" className="text-cyan-400 hover:text-cyan-300 text-sm">Ford F-150 →</Link>
              <Link href="/cars/tesla-model-y" className="text-cyan-400 hover:text-cyan-300 text-sm">Tesla Model Y →</Link>
              <Link href="/cars/honda-cr-v" className="text-cyan-400 hover:text-cyan-300 text-sm">Honda CR-V →</Link>
              <Link href="/cars/bmw-3-series" className="text-cyan-400 hover:text-cyan-300 text-sm">BMW 3 Series →</Link>
              <Link href="/best" className="text-amber-400 hover:text-amber-300 text-sm font-medium">Browse All →</Link>
            </div>
          </div>
        </section>

        {/* Buying Guides Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Buying Guides & Articles</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.slice(0, 6).map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:border-amber-500/30 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[post.categoryColor]}`}>
                    {post.category}
                  </span>
                  <span className="text-white/40 text-xs">{post.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-white/60 text-sm">{post.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Quiz CTA */}
        <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Not Sure Where to Start?</h3>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            Answer a few questions about your lifestyle and needs, and we&apos;ll recommend the perfect vehicles for you from our database of 329 cars.
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
