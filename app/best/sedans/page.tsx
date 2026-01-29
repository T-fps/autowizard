import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase } from '../../lib/vehicleDatabase';
import VehicleCard from '../../components/VehicleCard';
import { sortByPopularity } from '../../lib/vehicleUtils';

export const metadata: Metadata = {
  title: 'Best Sedans 2025 - Compact to Full-Size Cars | Auto Wizard',
  description: 'Compare the best sedans for 2025. From efficient compacts to luxury flagships. Toyota Camry, Honda Accord, BMW 3 Series and more.',
  keywords: 'best sedans 2025, best compact car, best midsize sedan, Honda Accord, Toyota Camry, luxury sedan',
};

export default function BestSedansPage() {
  const sedans = sortByPopularity(vehicleDatabase.filter(v => v.bodyType === 'sedan'));
  const compactSedans = sortByPopularity(sedans.filter(v => v.size === 'compact' || v.size === 'subcompact'));
  const midsizeSedans = sortByPopularity(sedans.filter(v => v.size === 'midsize'));
  const luxurySedans = sortByPopularity(sedans.filter(v => v.segment === 'luxury' || v.segment === 'premium'));

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
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">Compare {sedans.length} sedans from efficient compacts to luxury flagships.</p>
          <Link href="/quiz" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all">🎯 Find Your Perfect Sedan</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {compactSedans.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Compact Sedans ({compactSedans.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{compactSedans.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {midsizeSedans.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Midsize Sedans ({midsizeSedans.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{midsizeSedans.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {luxurySedans.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Luxury Sedans ({luxurySedans.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{luxurySedans.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
      </div>
    </div>
  );
}
