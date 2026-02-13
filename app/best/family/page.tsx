import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase } from '../../lib/vehicleDatabase';
import VehicleCard from '../../components/VehicleCard';
import { sortByPopularity } from '../../lib/vehicleUtils';

export const metadata: Metadata = {
  title: 'Best Family Cars 2025 - SUVs, Minivans & Sedans for Families | Auto Wizard',
  description: 'Find the best family cars for 2025. Compare 3-row SUVs, minivans, and family sedans. Safety ratings, cargo space, and features for families.',
  keywords: 'best family cars, family SUV, best minivan, 3 row SUV, family sedan, car for kids',
};

export default function BestFamilyPage() {
  const familyCars = sortByPopularity(vehicleDatabase.filter(v => v.useCases.includes('family') || v.seats >= 6));
  const threeRowSuvs = sortByPopularity(familyCars.filter(v => (v.bodyType === 'suv' || v.bodyType === 'crossover') && v.seats >= 7));
  const minivans = sortByPopularity(vehicleDatabase.filter(v => v.bodyType === 'minivan'));
  const familySedans = sortByPopularity(familyCars.filter(v => v.bodyType === 'sedan'));
  const affordableFamily = sortByPopularity(familyCars.filter(v => v.price <= 45));

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="relative bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-slate-200">Best Family Cars</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">👨‍👩‍👧‍👦 Best Family Cars 2025</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">Compare {familyCars.length} family-friendly vehicles from spacious SUVs to practical minivans.</p>
          <Link href="/quiz" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all">🎯 Find Your Perfect Family Car</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {threeRowSuvs.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">3-Row SUVs ({threeRowSuvs.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{threeRowSuvs.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {minivans.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Minivans ({minivans.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{minivans.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {familySedans.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Family Sedans ({familySedans.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{familySedans.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {affordableFamily.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Affordable Family Cars Under $45k ({affordableFamily.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{affordableFamily.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
      </div>
    </div>
  );
}
