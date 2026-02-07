import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase } from '../lib/vehicleDatabase';
import PageWrapper from '../components/shared/PageWrapper';

export const metadata: Metadata = {
  title: 'Best Cars 2025 - Top Rated Vehicles by Category | Auto Wizard',
  description: 'Find the best cars for 2025. Compare top-rated SUVs, trucks, sedans, electric cars, and more. Expert rankings and recommendations.',
  keywords: 'best cars 2025, top rated cars, car rankings, best SUV, best truck, best sedan, best electric car',
};

function formatPrice(price: number): string {
  return `$${(price * 1000).toLocaleString()}`;
}

export default function BestCarsPage() {
  // Calculate category stats
  const suvCount = vehicleDatabase.filter(v => v.bodyType === 'suv' || v.bodyType === 'crossover').length;
  const truckCount = vehicleDatabase.filter(v => v.bodyType === 'truck').length;
  const sedanCount = vehicleDatabase.filter(v => v.bodyType === 'sedan').length;
  const evCount = vehicleDatabase.filter(v => v.powertrain === 'ev').length;
  const luxuryCount = vehicleDatabase.filter(v => v.segment === 'luxury' || v.segment === 'premium').length;
  const familyCount = vehicleDatabase.filter(v => v.seats >= 7).length;
  const under30kCount = vehicleDatabase.filter(v => v.price <= 30).length;
  const under40kCount = vehicleDatabase.filter(v => v.price <= 40).length;
  const sportsCount = vehicleDatabase.filter(v => v.bodyType === 'sports' || v.bodyType === 'coupe' || v.bodyType === 'convertible' || v.segment === 'exotic').length;
  
  const categories = [
    { name: 'Best SUVs & Crossovers', href: '/best/suvs', icon: '🚙', count: suvCount, description: 'From compact to full-size' },
    { name: 'Best Trucks', href: '/best/trucks', icon: '🛻', count: truckCount, description: 'Midsize and full-size pickups' },
    { name: 'Best Sedans', href: '/best/sedans', icon: '🚗', count: sedanCount, description: 'Compact to luxury sedans' },
    { name: 'Sports Cars & Exotics', href: '/best/sports-cars', icon: '🏎️', count: sportsCount, description: 'Supercars to affordable sports' },
    { name: 'Best Electric Cars', href: '/best/electric', icon: '⚡', count: evCount, description: 'EVs for every budget' },
    { name: 'Best Luxury Cars', href: '/best/luxury', icon: '✨', count: luxuryCount, description: 'Premium vehicles' },
    { name: 'Best Family Cars', href: '/best/family', icon: '👨‍👩‍👧‍👦', count: familyCount, description: '3-row SUVs and minivans' },
    { name: 'Best Cars Under $30K', href: '/best/under-30k', icon: '💰', count: under30kCount, description: 'Affordable options' },
    { name: 'Best Cars Under $40K', href: '/best/under-40k', icon: '💵', count: under40kCount, description: 'Value-packed choices' },
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-slate-500">
                <li><Link href="/" className="hover:text-amber-600 transition-colors">Home</Link></li>
                <li>/</li>
                <li className="text-slate-900 font-medium">Best Cars 2025</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Best Cars of 2025
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl">
              Expert rankings and comparisons across every category. Find the perfect vehicle based on your needs, budget, and preferences.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                href="/quiz"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/25"
              >
                🎯 Take the Quiz - Get Personalized Picks
              </Link>
              <Link
                href="/brands"
                className="inline-flex items-center px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border border-slate-300 hover:border-amber-400 hover:bg-amber-50 transition-all duration-300"
              >
                Browse by Brand
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="bg-white rounded-xl p-4 text-center border border-slate-200 shadow-sm">
                <div className="text-3xl font-bold text-amber-600">{vehicleDatabase.length}</div>
                <div className="text-slate-500 text-sm">Vehicles Reviewed</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-slate-200 shadow-sm">
                <div className="text-3xl font-bold text-amber-600">{new Set(vehicleDatabase.map(v => v.brand)).size}+</div>
                <div className="text-slate-500 text-sm">Brands</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-slate-200 shadow-sm">
                <div className="text-3xl font-bold text-amber-600">{evCount}</div>
                <div className="text-slate-500 text-sm">Electric Options</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-slate-200 shadow-sm">
                <div className="text-3xl font-bold text-amber-600">{formatPrice(Math.min(...vehicleDatabase.map(v => v.price)))}</div>
                <div className="text-slate-500 text-sm">Starting From</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Browse by Category</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <Link
                key={category.href}
                href={category.href}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                  {category.name}
                </h3>
                <p className="text-slate-500 text-sm mb-3">{category.description}</p>
                <p className="text-amber-600 font-medium">{category.count} vehicles →</p>
              </Link>
            ))}
          </div>
          
          {/* Popular Searches */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular Searches</h2>
            <div className="flex flex-wrap gap-3">
              {['3 Row SUV', 'Hybrid SUV', 'Electric SUV', 'Midsize Truck', 'Luxury Sedan', 
                'Reliable Cars', 'Good Gas Mileage', 'AWD Cars', 'Compact SUV', 'Sports Car'].map(search => (
                <Link
                  key={search}
                  href="/quiz"
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition-all duration-300"
                >
                  {search}
                </Link>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-amber-100 to-amber-50 rounded-2xl p-8 border border-amber-200 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Not sure where to start?</h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Our quiz analyzes your lifestyle, needs, and preferences to recommend the perfect vehicles for you.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/25"
            >
              Get Personalized Recommendations →
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
