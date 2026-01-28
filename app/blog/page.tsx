"use client";

import Link from 'next/link';
import { ChevronRight, BookOpen, ChevronLeft } from 'lucide-react';
import PageWrapper from '../components/shared/PageWrapper';

const blogPosts = [
  {
    slug: 'what-car-should-i-buy',
    title: 'What Car Should I Buy? The Complete 2026 Guide',
    description: 'Everything you need to know to find the perfect car for your lifestyle, budget, and preferences.',
    category: 'Car Buying Guide',
    categoryColor: 'amber',
    date: 'January 22, 2026',
    readTime: '8 min read'
  },
  {
    slug: 'electric-vs-hybrid',
    title: 'Electric vs Hybrid: Which is Right for You?',
    description: 'A complete breakdown of the pros and cons of going electric versus hybrid in 2026.',
    category: 'Electric Vehicles',
    categoryColor: 'green',
    date: 'January 15, 2026',
    readTime: '6 min read'
  },
  {
    slug: 'best-cars-under-30k',
    title: 'Best Cars Under $30,000 in 2026',
    description: "Our top picks for affordable vehicles that don't compromise on quality or features.",
    category: 'Budget Tips',
    categoryColor: 'blue',
    date: 'January 8, 2026',
    readTime: '5 min read'
  },
  {
    slug: 'best-family-suvs',
    title: '10 Best Family SUVs for 2026',
    description: 'Space, safety, and sanity - our expert picks for the best family haulers this year.',
    category: 'Family Cars',
    categoryColor: 'purple',
    date: 'January 1, 2026',
    readTime: '7 min read'
  },
  {
    slug: 'how-to-choose-a-car',
    title: 'How to Choose a Car: Complete Decision Framework',
    description: 'A step-by-step guide to choosing the right car using the process experts use.',
    category: "Buyer's Guide",
    categoryColor: 'cyan',
    date: 'December 25, 2025',
    readTime: '10 min read'
  },
  {
    slug: 'first-car-buying-guide',
    title: 'First Car Buying Guide: Tips for New Drivers',
    description: 'Everything first-time car buyers need to know about insurance, financing, and more.',
    category: 'First-Time Buyers',
    categoryColor: 'rose',
    date: 'December 18, 2025',
    readTime: '9 min read'
  },
  {
    slug: 'best-commuter-cars',
    title: 'Best Commuter Cars 2026: Fuel-Efficient Daily Drivers',
    description: 'Top picks for daily commuters who want comfort, fuel efficiency, and reliability.',
    category: 'Commuter Cars',
    categoryColor: 'indigo',
    date: 'December 11, 2025',
    readTime: '6 min read'
  },
  {
    slug: 'used-vs-new-car',
    title: 'Used vs New Car: Which Should You Buy?',
    description: 'The complete pros and cons breakdown of buying new versus used.',
    category: 'Buying Tips',
    categoryColor: 'orange',
    date: 'December 4, 2025',
    readTime: '7 min read'
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

const categories = [
  { name: 'All', count: blogPosts.length },
  { name: 'Buying Guides', count: 4 },
  { name: 'Best Cars', count: 3 },
  { name: 'Electric', count: 1 },
];

export default function BlogPage() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/guide" className="inline-flex items-center gap-2 text-white/60 hover:text-amber-400 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Wizard&apos;s Guide
          </Link>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Expert Articles</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Articles & Guides</h1>
          <p className="text-xl text-white/60 max-w-2xl">
            In-depth guides and articles to help you make the best car buying decision.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                i === 0
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/20'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="space-y-6 mb-16">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white/5 border border-white/10 rounded-xl p-6 hover:border-amber-500/30 hover:bg-white/10 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.categoryColor]}`}>
                      {post.category}
                    </span>
                    <span className="text-white/40 text-sm">{post.date}</span>
                    <span className="text-white/40 text-sm">•</span>
                    <span className="text-white/40 text-sm">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-white/60">{post.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-1 text-cyan-400 group-hover:text-amber-400 transition-colors">
                    Read More <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Skip the Reading?</h3>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            Take our 2-minute quiz and get personalized car recommendations instantly.
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
