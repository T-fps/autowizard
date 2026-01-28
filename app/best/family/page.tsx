import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase, Vehicle } from '../../lib/vehicleDatabase';

export const metadata: Metadata = {
  title: 'Best Family Cars 2025 - SUVs, Minivans & Sedans for Families | Auto Wizard',
  description: 'Find the best family cars for 2025. Compare 3-row SUVs, minivans, and family sedans. Safety ratings, cargo space, and features for families.',
  keywords: 'best family cars, family SUV, best minivan, 3 row SUV, family sedan, car for kids, safe family car',
};

function formatPrice(price: number): string {
  return `$${(price * 1000).toLocaleString()}`;
}

function getBodyTypeDisplay(bodyType: string): string {
  const displays: Record<string, string> = {
    'sedan': 'Sedan', 'suv': 'SUV', 'crossover': 'Crossover', 'minivan': 'Minivan',
  };
  return displays[bodyType] || bodyType;
}

export default function BestFamilyPage() {
  const familyCars = vehicleDatabase
    .filter(v => v.useCases.includes('family') || v.seats >= 6)
    .sort((a, b) => a.price - b.price);
  
  const threeRowSuvs = familyCars.filter(v => (v.bodyType === 'suv' || v.bodyType === 'crossover') && v.seats >= 7);
  const minivans = vehicleDatabase.filter(v => v.bodyType === 'minivan');
  const familySedans = familyCars.filter(v => v.bodyType === 'sedan');
  const affordableFamily = familyCars.filter(v => v.price <= 45);
  const hybridFamily = familyCars.filter(v => v.powertrain === 'hybrid' || v.powertrain === 'phev');
  
  const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => (
    <Link
      href={`/cars/${vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
      className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group"
    >
      <div className="aspect-video bg-slate-800 flex items-center justify-center">
        <span className="text-5xl">👨‍👩‍👧‍👦</span>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors mb-1">
          {vehicle.name}
        </h3>
        <p className="text-cyan-400 font-medium mb-2">{formatPrice(vehicle.price)}</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">{vehicle.seats} seats</span>
          <span className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs">{getBodyTypeDisplay(vehicle.bodyType)}</span>
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
              <li className="text-slate-200">Best Family Cars</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Best Family Cars 2025</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            {familyCars.length} vehicles designed for families of all sizes.
          </p>
          
          <Link href="/quiz" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl">
            🎯 Find Your Perfect Family Car
          </Link>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">{threeRowSuvs.length}</div>
              <div className="text-slate-400 text-sm">3-Row SUVs</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">{minivans.length}</div>
              <div className="text-slate-400 text-sm">Minivans</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">{hybridFamily.length}</div>
              <div className="text-slate-400 text-sm">Hybrid Options</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">{formatPrice(Math.min(...familyCars.map(v => v.price)))}</div>
              <div className="text-slate-400 text-sm">Starting From</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Minivans</h2>
          <p className="text-slate-400 mb-6">Maximum space and family-friendly features</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {minivans.map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best 3-Row SUVs</h2>
          <p className="text-slate-400 mb-6">SUV style with room for the whole family</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {threeRowSuvs.slice(0, 12).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Affordable Family Cars Under $45K</h2>
          <p className="text-slate-400 mb-6">Great value for growing families</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {affordableFamily.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        {hybridFamily.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Best Hybrid Family Cars</h2>
            <p className="text-slate-400 mb-6">Fuel efficiency for busy families</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hybridFamily.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}
        
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Find the perfect car for your family</h2>
          <p className="text-slate-300 mb-6">Tell us about your family size, budget, and needs.</p>
          <Link href="/quiz" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl text-lg">
            Take the Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
