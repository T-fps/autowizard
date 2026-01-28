import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase, Vehicle } from '../../lib/vehicleDatabase';

export const metadata: Metadata = {
  title: 'Best Cars Under $30,000 in 2025 | Auto Wizard',
  description: 'Find the best new cars under $30,000. Compare affordable sedans, SUVs, trucks, and hatchbacks. Get the most value for your money.',
  keywords: 'best cars under 30000, affordable cars 2025, cheap new cars, budget SUV, affordable sedan',
};

function formatPrice(price: number): string {
  return `$${(price * 1000).toLocaleString()}`;
}

function getBodyTypeDisplay(bodyType: string): string {
  const displays: Record<string, string> = {
    'sedan': 'Sedan', 'suv': 'SUV', 'crossover': 'Crossover', 'truck': 'Truck',
    'hatchback': 'Hatchback', 'coupe': 'Coupe',
  };
  return displays[bodyType] || bodyType;
}

export default function BestUnder30kPage() {
  const cars = vehicleDatabase
    .filter(v => v.price <= 30)
    .sort((a, b) => b.price - a.price); // Show best value (higher price) first within budget
  
  const sedans = cars.filter(v => v.bodyType === 'sedan');
  const suvs = cars.filter(v => v.bodyType === 'suv' || v.bodyType === 'crossover');
  const trucks = cars.filter(v => v.bodyType === 'truck');
  const hatchbacks = cars.filter(v => v.bodyType === 'hatchback');
  
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
        <span className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs">
          {getBodyTypeDisplay(vehicle.bodyType)}
        </span>
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
              <li className="text-slate-200">Best Cars Under $30K</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Best Cars Under $30,000</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            {cars.length} vehicles that deliver excellent value without breaking the bank.
          </p>
          
          <Link href="/quiz" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl">
            🎯 Find Your Best Match
          </Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sedans.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Best Sedans Under $30K</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sedans.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}
        
        {suvs.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Best SUVs Under $30K</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suvs.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}
        
        {trucks.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Best Trucks Under $30K</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trucks.slice(0, 4).map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}
        
        {hatchbacks.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Best Hatchbacks Under $30K</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hatchbacks.slice(0, 4).map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}
        
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Get personalized recommendations</h2>
          <Link href="/quiz" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl text-lg">
            Take the Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
