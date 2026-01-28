import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase } from '../../lib/vehicleDatabase';
import VehicleCard from '../../components/VehicleCard';

export const metadata: Metadata = {
  title: 'Best Cars Under $30,000 in 2025 | Auto Wizard',
  description: 'Find the best new cars under $30,000. Compare affordable sedans, SUVs, trucks, and hatchbacks. Get the most value for your money.',
  keywords: 'best cars under 30000, affordable cars 2025, cheap new cars, budget SUV, affordable sedan',
};

export default function BestUnder30kPage() {
  const cars = vehicleDatabase.filter(v => v.price <= 30).sort((a, b) => b.price - a.price);
  const sedans = cars.filter(v => v.bodyType === 'sedan');
  const suvs = cars.filter(v => v.bodyType === 'suv' || v.bodyType === 'crossover');
  const hatchbacks = cars.filter(v => v.bodyType === 'hatchback');
  const trucks = cars.filter(v => v.bodyType === 'truck');

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="relative bg-gradient-to-br from-green-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-slate-200">Best Cars Under $30k</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">💰 Best Cars Under $30,000</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">Compare {cars.length} affordable vehicles with the best value for your money.</p>
          <Link href="/quiz" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all">🎯 Find Your Perfect Car</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {sedans.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Sedans Under $30k ({sedans.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{sedans.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {suvs.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">SUVs & Crossovers Under $30k ({suvs.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{suvs.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {hatchbacks.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Hatchbacks Under $30k ({hatchbacks.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{hatchbacks.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {trucks.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Trucks Under $30k ({trucks.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{trucks.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
      </div>
    </div>
  );
}
