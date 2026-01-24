"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import PageWrapper from '../components/shared/PageWrapper';

const blogPosts = [
  {
    slug: 'what-car-should-i-buy',
    title: 'What Car Should I Buy? The Complete 2026 Guide',
    description: 'Everything you need to know to find the perfect car for your lifestyle, budget, and preferences. Our comprehensive guide breaks down the key factors.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
    imageAlt: 'What car should I buy 2026 - sports car representing the car buying decision process and vehicle selection',
    category: 'Car Buying Guide',
    categoryColor: 'amber',
    date: 'January 24, 2026'
  },
  {
    slug: 'electric-vs-hybrid',
    title: 'Electric vs Hybrid: Which is Right for You?',
    description: 'A complete breakdown of the pros and cons of going electric versus hybrid in 2026. We cover range, charging, costs, and more.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop',
    imageAlt: 'Electric vs hybrid car comparison - electric vehicle charging at home charging station',
    category: 'Electric Vehicles',
    categoryColor: 'green',
    date: 'January 24, 2026'
  },
  {
    slug: 'best-cars-under-30k',
    title: 'Best Cars Under $30,000 in 2026',
    description: "Our top picks for affordable vehicles that don't compromise on quality or features. Great value doesn't mean boring.",
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
    imageAlt: 'Best cars under 30000 dollars 2026 - affordable reliable sedan perfect for budget conscious buyers',
    category: 'Budget Tips',
    categoryColor: 'blue',
    date: 'January 24, 2026'
  },
  {
    slug: 'best-family-suvs',
    title: '10 Best Family SUVs for 2026',
    description: 'Space, safety, and sanity - our expert picks for the best family haulers this year. From three-row giants to efficient crossovers.',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop',
    imageAlt: 'Best family SUV 2026 - three row SUV for families with car seats and cargo space',
    category: 'Family Cars',
    categoryColor: 'purple',
    date: 'January 24, 2026'
  },
  {
    slug: 'how-to-choose-a-car',
    title: 'How to Choose a Car: Complete Decision Framework',
    description: 'A step-by-step guide to choosing the right car. Learn the exact process car consultants use to match buyers with their perfect vehicle.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop',
    imageAlt: 'How to choose a car - person comparing vehicles at dealership lot',
    category: "Buyer's Guide",
    categoryColor: 'cyan',
    date: 'January 24, 2026'
  },
  {
    slug: 'first-car-buying-guide',
    title: 'First Car Buying Guide: Tips for New Drivers',
    description: 'Everything first-time car buyers need to know. From insurance to financing to picking the right reliable starter car.',
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop',
    imageAlt: 'First car for new drivers - young person with car keys excited about first vehicle',
    category: 'First-Time Buyers',
    categoryColor: 'rose',
    date: 'January 24, 2026'
  },
  {
    slug: 'best-commuter-cars',
    title: 'Best Commuter Cars 2026: Fuel-Efficient Daily Drivers',
    description: 'Top picks for daily commuters who want comfort, fuel efficiency, and reliability for the daily grind.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
    imageAlt: 'Best commuter car 2026 - fuel efficient sedan on highway during rush hour commute',
    category: 'Commuter Cars',
    categoryColor: 'indigo',
    date: 'January 24, 2026'
  },
  {
    slug: 'used-vs-new-car',
    title: 'Used vs New Car: Which Should You Buy?',
    description: 'The complete pros and cons breakdown of buying new versus used. Plus the CPO sweet spot most buyers miss.',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop',
    imageAlt: 'Used vs new car comparison - certified pre-owned vehicles at dealership',
    category: 'Buying Tips',
    categoryColor: 'orange',
    date: 'January 24, 2026'
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

export default function BlogPage() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Blog Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">The Wizard's Guide</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">Expert advice, buying guides, and tips to help you find your perfect vehicle.</p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[post.categoryColor]}`}>
                    {post.category}
                  </span>
                  <span className="text-white/40 text-sm">{post.date}</span>
                </div>
                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-white/60 text-sm mb-4">{post.description}</p>
                <div className="flex items-center gap-2 text-amber-400 text-sm font-medium">
                  Read More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Want More Car Buying Tips?</h3>
          <p className="text-white/60 mb-6">Take our free quiz and get personalized vehicle recommendations.</p>
          <Link 
            href="/quiz"
            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500 transition-all"
          >
            Take the Free Assessment
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
