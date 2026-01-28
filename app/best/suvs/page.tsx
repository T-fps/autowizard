import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase, Vehicle } from '../../lib/vehicleDatabase';
import VehicleCard from '../../components/VehicleCard';
import { sortByPopularity } from '../../lib/vehicleUtils';

export const metadata: Metadata = {
  title: 'Best SUVs & Crossovers 2025 - Top Rated Models | Auto Wizard',
  description: 'Compare the best SUVs and crossovers for 2025. From compact crossovers to full-size luxury SUVs. Find prices, specs, and the perfect SUV for your needs.',
  keywords: 'best SUV, best crossover, top SUVs 2025, SUV comparison, family SUV, luxury SUV, compact SUV',
};

function formatPrice(price: number): string {
  return `$${(price * 1000).toLocaleString()}`;
}

export default function BestSUVsPage() {
  // Get all SUVs and crossovers, sorted by popularity
  const suvs = sortByPopularity(vehicleDatabase.filter(v => v.bodyType === 'suv' || v.bodyType === 'crossover'));
  
  // Categories (also sorted by popularity)
  const compactSuvs = sortByPopularity(suvs.filter(v => v.size === 'compact' || v.size === 'subcompact'));
  const midsizeSuvs = sortByPopularity(suvs.filter(v => v.size === 'midsize'));
  const fullsizeSuvs = sortByPopularity(suvs.filter(v => v.size === 'fullsize'));
  const luxurySuvs = sortByPopularity(suvs.filter(v => v.segment === 'luxury' || v.segment === 'premium'));
  const electricSuvs = sortByPopularity(suvs.filter(v => v.powertrain === 'ev'));
  const threeRowSuvs = sortByPopularity(suvs.filter(v => v.seats >= 7));
  const affordableSuvs = sortByPopularity(suvs.filter(v => v.price <= 35));

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-slate-200">Best SUVs</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Best SUVs & Crossovers 2025
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Compare {suvs.length} SUVs and crossovers. From efficient compact crossovers to powerful full-size family haulers.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              href="/quiz"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
            >
              🎯 Find Your Perfect SUV
            </Link>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">{suvs.length}</div>
              <div className="text-slate-400 text-sm">Total SUVs</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">{electricSuvs.length}</div>
              <div className="text-slate-400 text-sm">Electric Options</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">{threeRowSuvs.length}</div>
              <div className="text-slate-400 text-sm">3-Row Models</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">{formatPrice(Math.min(...suvs.map(v => v.price)))}</div>
              <div className="text-slate-400 text-sm">Starting Price</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Affordable SUVs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Affordable SUVs Under $35K</h2>
          <p className="text-slate-400 mb-6">Great value SUVs that won&apos;t break the bank</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {affordableSuvs.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        {/* Compact SUVs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Compact SUVs & Crossovers</h2>
          <p className="text-slate-400 mb-6">Efficient and easy to maneuver, perfect for city driving</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {compactSuvs.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        {/* 3-Row SUVs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best 3-Row Family SUVs</h2>
          <p className="text-slate-400 mb-6">Room for 7+ passengers and all their gear</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {threeRowSuvs.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        {/* Luxury SUVs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Luxury SUVs</h2>
          <p className="text-slate-400 mb-6">Premium materials, advanced features, and refined comfort</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {luxurySuvs.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        {/* Electric SUVs */}
        {electricSuvs.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Best Electric SUVs</h2>
            <p className="text-slate-400 mb-6">Zero-emission driving with SUV practicality</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {electricSuvs.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}
        
        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Not sure which SUV is right for you?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Answer a few questions about your lifestyle and needs, and we&apos;ll recommend the perfect SUV for you.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 text-lg"
          >
            Take the Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
