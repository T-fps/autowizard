"use client";

import Link from 'next/link';
import { ChevronRight, BookOpen, ChevronLeft } from 'lucide-react';
import PageWrapper from '../components/shared/PageWrapper';

const blogPosts = [
  {
    slug: 'most-improved-cars-2026',
    title: 'Most Improved Cars of 2026: Major Upgrades Worth Knowing',
    description: 'From record-breaking Corvettes to completely redesigned SUVs, these are the cars that made the biggest leaps this year.',
    category: 'New for 2026',
    categoryColor: 'amber',
    date: 'January 28, 2026',
    readTime: '10 min read'
  },
  {
    slug: '2026-corvette-e-ray-record-breaker',
    title: '2026 Chevrolet Corvette E-Ray: The Record Breaker',
    description: 'How Chevy created the fastest production Corvette ever by combining V8 muscle with electric precision.',
    category: 'Performance',
    categoryColor: 'rose',
    date: 'January 28, 2026',
    readTime: '8 min read'
  },
  {
    slug: 'best-car-redesigns-2026',
    title: 'Best New Car Redesigns for 2026',
    description: 'These completely redesigned models offer fresh styling, new technology, and improved performance.',
    category: 'New for 2026',
    categoryColor: 'cyan',
    date: 'January 28, 2026',
    readTime: '9 min read'
  },
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
  amber: 'bg-amber-100 text-amber-700',
  green: 'bg-green-100 text-green-700',
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  cyan: 'bg-cyan-100 text-cyan-700',
  rose: 'bg-rose-100 text-rose-700',
  indigo: 'bg-indigo-100 text-indigo-700',
  orange: 'bg-orange-100 text-orange-700'
};

const categories = [
  { name: 'All', count: blogPosts.length },
  { name: 'New for 2026', count: 3 },
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
          <Link href="/guide" className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Wizard&apos;s Guide
          </Link>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 border border-cyan-200 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-cyan-700" />
            <span className="text-cyan-700 text-sm font-medium">Expert Articles</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Articles & Guides</h1>
          <p className="text-xl text-slate-600 max-w-2xl">
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
                  ? 'bg-amber-100 text-amber-700 border border-amber-200'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300'
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
              className="group block bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-amber-300 hover:bg-amber-50 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.categoryColor]}`}>
                      {post.category}
                    </span>
                    <span className="text-slate-400 text-sm">{post.date}</span>
                    <span className="text-slate-400 text-sm">•</span>
                    <span className="text-slate-400 text-sm">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-600">{post.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-1 text-amber-600 group-hover:text-amber-500 transition-colors">
                    Read More <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Skip the Reading?</h3>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
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
