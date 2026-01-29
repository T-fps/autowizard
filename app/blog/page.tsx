"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, BookOpen, ChevronLeft, SlidersHorizontal } from 'lucide-react';
import PageWrapper from '../components/shared/PageWrapper';

const blogPosts = [
  // NEW - Financing Guide
  {
    slug: 'car-financing-guide',
    title: 'Car Financing Guide: Loans, Leasing & Budgeting Explained',
    description: 'Master the financial side of car buying. Learn when to finance, when to lease, and how to budget wisely.',
    category: 'Car Finance',
    categoryColor: 'green',
    date: 'January 29, 2026',
    dateSort: '2026-01-29',
    readTime: '18 min read'
  },
  // Best Used Cars Article
  {
    slug: 'best-used-cars-2026',
    title: 'Best Used Cars to Buy in 2026: Top Picks by Generation',
    description: 'The smartest used car buys right now—specific model years, generations to target, and exactly why they\'re worth your money.',
    category: 'Used Cars',
    categoryColor: 'emerald',
    date: 'January 29, 2026',
    dateSort: '2026-01-29',
    readTime: '12 min read'
  },
  // SEO Articles - Spaced every 2-3 days
  {
    slug: 'how-much-car-can-i-afford',
    title: 'How Much Car Can I Afford? Complete 2026 Guide',
    description: 'Use proven formulas, budgeting rules, and real calculations to determine exactly how much you should spend.',
    category: 'Car Finance',
    categoryColor: 'green',
    date: 'January 26, 2026',
    dateSort: '2026-01-26',
    readTime: '8 min read'
  },
  {
    slug: 'lease-vs-buy-car',
    title: 'Lease vs. Buy a Car: Which Is Better in 2026?',
    description: 'A comprehensive comparison to help you decide whether leasing or buying makes more financial sense.',
    category: 'Car Finance',
    categoryColor: 'blue',
    date: 'January 23, 2026',
    dateSort: '2026-01-23',
    readTime: '9 min read'
  },
  {
    slug: 'most-reliable-cars-2026',
    title: 'Most Reliable Cars of 2026: Complete Rankings',
    description: 'Based on Consumer Reports data, J.D. Power studies, and owner surveys—these are the cars that last.',
    category: 'Best Cars',
    categoryColor: 'amber',
    date: 'January 20, 2026',
    dateSort: '2026-01-20',
    readTime: '10 min read'
  },
  {
    slug: 'what-credit-score-to-buy-car',
    title: 'What Credit Score Do You Need to Buy a Car?',
    description: 'Understanding how your credit score affects car loan rates, and what you can do to get the best deal.',
    category: 'Car Finance',
    categoryColor: 'purple',
    date: 'January 17, 2026',
    dateSort: '2026-01-17',
    readTime: '7 min read'
  },
  {
    slug: 'best-cars-for-gas-mileage',
    title: 'Best Cars for Gas Mileage in 2026',
    description: 'From hybrids to efficient gas engines—these vehicles will save you thousands at the pump.',
    category: 'Best Cars',
    categoryColor: 'green',
    date: 'January 14, 2026',
    dateSort: '2026-01-14',
    readTime: '8 min read'
  },
  {
    slug: 'suv-vs-sedan',
    title: 'SUV vs. Sedan: Which Should You Buy in 2026?',
    description: 'A comprehensive comparison to help you decide between these two popular vehicle types.',
    category: 'Comparison',
    categoryColor: 'cyan',
    date: 'January 11, 2026',
    dateSort: '2026-01-11',
    readTime: '8 min read'
  },
  {
    slug: 'best-first-car-for-teens',
    title: 'Best First Cars for Teens & New Drivers (2026)',
    description: 'Safe, reliable, and affordable vehicles perfect for young drivers just starting out.',
    category: 'First-Time Buyers',
    categoryColor: 'rose',
    date: 'January 8, 2026',
    dateSort: '2026-01-08',
    readTime: '9 min read'
  },
  {
    slug: 'how-long-should-car-loan-be',
    title: 'How Long Should Your Car Loan Be?',
    description: 'Understanding loan terms, interest costs, and why shorter is usually better.',
    category: 'Car Finance',
    categoryColor: 'indigo',
    date: 'January 5, 2026',
    dateSort: '2026-01-05',
    readTime: '7 min read'
  },
  {
    slug: 'best-time-to-buy-car',
    title: 'Best Time to Buy a Car: When to Get the Best Deals',
    description: 'Timing your purchase right can save you thousands. Here\'s when dealers are most motivated.',
    category: 'Buying Tips',
    categoryColor: 'emerald',
    date: 'January 2, 2026',
    dateSort: '2026-01-02',
    readTime: '6 min read'
  },
  {
    slug: 'awd-vs-4wd',
    title: 'AWD vs. 4WD: What\'s the Difference?',
    description: 'Understanding these drivetrain types helps you choose the right vehicle for your driving conditions.',
    category: 'Comparison',
    categoryColor: 'orange',
    date: 'December 30, 2025',
    dateSort: '2025-12-30',
    readTime: '7 min read'
  },
  // Previous Articles - Earlier December dates
  {
    slug: 'most-improved-cars-2026',
    title: 'Most Improved Cars of 2026: Major Upgrades Worth Knowing',
    description: 'From record-breaking Corvettes to completely redesigned SUVs, these are the cars that made the biggest leaps this year.',
    category: 'New for 2026',
    categoryColor: 'amber',
    date: 'December 27, 2025',
    dateSort: '2025-12-27',
    readTime: '10 min read'
  },
  {
    slug: '2026-corvette-e-ray-record-breaker',
    title: '2026 Chevrolet Corvette E-Ray: The Record Breaker',
    description: 'How Chevy created the fastest production Corvette ever by combining V8 muscle with electric precision.',
    category: 'New for 2026',
    categoryColor: 'rose',
    date: 'December 24, 2025',
    dateSort: '2025-12-24',
    readTime: '8 min read'
  },
  {
    slug: 'best-car-redesigns-2026',
    title: 'Best New Car Redesigns for 2026',
    description: 'These completely redesigned models offer fresh styling, new technology, and improved performance.',
    category: 'New for 2026',
    categoryColor: 'cyan',
    date: 'December 21, 2025',
    dateSort: '2025-12-21',
    readTime: '9 min read'
  },
  {
    slug: 'what-car-should-i-buy',
    title: 'What Car Should I Buy? The Complete 2026 Guide',
    description: 'Everything you need to know to find the perfect car for your lifestyle, budget, and preferences.',
    category: 'Buying Tips',
    categoryColor: 'amber',
    date: 'December 18, 2025',
    dateSort: '2025-12-18',
    readTime: '8 min read'
  },
  {
    slug: 'electric-vs-hybrid',
    title: 'Electric vs Hybrid: Which is Right for You?',
    description: 'A complete breakdown of the pros and cons of going electric versus hybrid in 2026.',
    category: 'Comparison',
    categoryColor: 'green',
    date: 'December 15, 2025',
    dateSort: '2025-12-15',
    readTime: '6 min read'
  },
  {
    slug: 'best-cars-under-30k',
    title: 'Best Cars Under $30,000 in 2026',
    description: "Our top picks for affordable vehicles that don't compromise on quality or features.",
    category: 'Best Cars',
    categoryColor: 'blue',
    date: 'December 12, 2025',
    dateSort: '2025-12-12',
    readTime: '5 min read'
  },
  {
    slug: 'best-family-suvs',
    title: '10 Best Family SUVs for 2026',
    description: 'Space, safety, and sanity - our expert picks for the best family haulers this year.',
    category: 'Best Cars',
    categoryColor: 'purple',
    date: 'December 9, 2025',
    dateSort: '2025-12-09',
    readTime: '7 min read'
  },
  {
    slug: 'how-to-choose-a-car',
    title: 'How to Choose a Car: Complete Decision Framework',
    description: 'A step-by-step guide to choosing the right car using the process experts use.',
    category: 'Buying Tips',
    categoryColor: 'cyan',
    date: 'December 6, 2025',
    dateSort: '2025-12-06',
    readTime: '10 min read'
  },
  {
    slug: 'first-car-buying-guide',
    title: 'First Car Buying Guide: Tips for New Drivers',
    description: 'Everything first-time car buyers need to know about insurance, financing, and more.',
    category: 'First-Time Buyers',
    categoryColor: 'rose',
    date: 'December 3, 2025',
    dateSort: '2025-12-03',
    readTime: '9 min read'
  },
  {
    slug: 'best-commuter-cars',
    title: 'Best Commuter Cars 2026: Fuel-Efficient Daily Drivers',
    description: 'Top picks for daily commuters who want comfort, fuel efficiency, and reliability.',
    category: 'Best Cars',
    categoryColor: 'indigo',
    date: 'November 30, 2025',
    dateSort: '2025-11-30',
    readTime: '6 min read'
  },
  {
    slug: 'used-vs-new-car',
    title: 'Used vs New Car: Which Should You Buy?',
    description: 'The complete pros and cons breakdown of buying new versus used.',
    category: 'Buying Tips',
    categoryColor: 'orange',
    date: 'November 27, 2025',
    dateSort: '2025-11-27',
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
  orange: 'bg-orange-100 text-orange-700',
  emerald: 'bg-emerald-100 text-emerald-700'
};

// Get unique categories with counts
const getCategories = () => {
  const categoryCounts: Record<string, number> = {};
  blogPosts.forEach(post => {
    categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
  });
  return Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
  const categories = useMemo(() => getCategories(), []);
  
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    // Sort by date
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.dateSort).getTime();
      const dateB = new Date(b.dateSort).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [selectedCategory, sortOrder]);

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors">
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

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-amber-100 text-amber-700 border border-amber-200'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              All ({blogPosts.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-amber-100 text-amber-700 border border-amber-200'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
          
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-amber-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-slate-500 mb-6">
          Showing {filteredAndSortedPosts.length} article{filteredAndSortedPosts.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
        </p>

        {/* Articles Grid */}
        <div className="space-y-6 mb-16">
          {filteredAndSortedPosts.map((post) => (
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

        {/* No Results */}
        {filteredAndSortedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 mb-4">No articles found in this category.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-amber-600 hover:text-amber-500 font-medium"
            >
              View all articles
            </button>
          </div>
        )}

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
