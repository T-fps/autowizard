import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase } from '../lib/vehicleDatabase';

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
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Best Cars of 2025
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl">
            Expert rankings and comparisons across every category. Find the perfect vehicle based on your needs, budget, and preferences.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              href="/quiz"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 text-lg"
            >
              🎯 Take the Quiz - Get Personalized Picks
            </Link>
            <Link
              href="/brands"
              className="inline-flex items-center px-8 py-4 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-all duration-300 text-lg"
            >
              Browse by Brand
            </Link>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">{vehicleDatabase.length}</div>
              <div className="text-slate-400 text-sm">Vehicles Reviewed</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">{new Set(vehicleDatabase.map(v => v.brand)).size}+</div>
              <div className="text-slate-400 text-sm">Brands</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">{evCount}</div>
              <div className="text-slate-400 text-sm">Electric Options</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">{formatPrice(Math.min(...vehicleDatabase.map(v => v.price)))}</div>
              <div className="text-slate-400 text-sm">Starting From</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-white mb-8">Browse by Category</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link
              key={category.href}
              href={category.href}
              className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors mb-2">
                {category.name}
              </h3>
              <p className="text-slate-400 text-sm mb-3">{category.description}</p>
              <p className="text-cyan-400 font-medium">{category.count} vehicles →</p>
            </Link>
          ))}
        </div>
        
        {/* Popular Searches */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Popular Searches</h2>
          <div className="flex flex-wrap gap-3">
            {['3 Row SUV', 'Hybrid SUV', 'Electric SUV', 'Midsize Truck', 'Luxury Sedan', 
              'Reliable Cars', 'Good Gas Mileage', 'AWD Cars', 'Compact SUV', 'Sports Car'].map(search => (
              <Link
                key={search}
                href="/quiz"
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
              >
                {search}
              </Link>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not sure where to start?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Our quiz analyzes your lifestyle, needs, and preferences to recommend the perfect vehicles for you.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 text-lg"
          >
            Get Personalized Recommendations →
          </Link>
        </div>
      </div>
    </div>
  );
}
