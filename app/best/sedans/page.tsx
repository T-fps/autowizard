import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase, Vehicle } from '../../lib/vehicleDatabase';

export const metadata: Metadata = {
  title: 'Best Sedans 2025 - Compact to Full-Size Cars | Auto Wizard',
  description: 'Compare the best sedans for 2025. From efficient compacts to luxury flagships. Toyota Camry, Honda Accord, BMW 3 Series and more.',
  keywords: 'best sedans 2025, best compact car, best midsize sedan, Honda Accord, Toyota Camry, luxury sedan',
};

function formatPrice(price: number): string {
  return `$${(price * 1000).toLocaleString()}`;
}

export default function BestSedansPage() {
  const sedans = vehicleDatabase
    .filter(v => v.bodyType === 'sedan')
    .sort((a, b) => a.price - b.price);
  
  const compactSedans = sedans.filter(v => v.size === 'compact' || v.size === 'subcompact');
  const midsizeSedans = sedans.filter(v => v.size === 'midsize');
  const luxurySedans = sedans.filter(v => v.segment === 'luxury' || v.segment === 'premium');
  const hybridSedans = sedans.filter(v => v.powertrain === 'hybrid' || v.powertrain === 'phev');
  const affordableSedans = sedans.filter(v => v.price <= 30);
  
  const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => (
    <Link
      href={`/cars/${vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
      className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group"
    >
      <div className="aspect-video bg-slate-800 flex items-center justify-center">
        <span className="text-5xl">🚗</span>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors mb-1">
          {vehicle.name}
        </h3>
        <p className="text-cyan-400 font-medium mb-2">{formatPrice(vehicle.price)}</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs capitalize">{vehicle.size}</span>
          {vehicle.powertrain !== 'gas' && (
            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs capitalize">
              {vehicle.powertrain}
            </span>
          )}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-slate-200">Best Sedans</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Best Sedans 2025</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Compare {sedans.length} sedans from efficient commuters to luxury flagships.
          </p>
          
          <Link href="/quiz" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300">
            🎯 Find Your Perfect Sedan
          </Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Affordable Sedans Under $30K</h2>
          <p className="text-slate-400 mb-6">Great value sedans for everyday driving</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {affordableSedans.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Midsize Sedans</h2>
          <p className="text-slate-400 mb-6">The sweet spot of space, efficiency, and value</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {midsizeSedans.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        {hybridSedans.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Best Hybrid Sedans</h2>
            <p className="text-slate-400 mb-6">Maximum fuel efficiency</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hybridSedans.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Luxury Sedans</h2>
          <p className="text-slate-400 mb-6">Premium comfort and performance</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {luxurySedans.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Find your perfect sedan</h2>
          <Link href="/quiz" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl text-lg">
            Take the Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
