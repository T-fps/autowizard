import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase } from '../../lib/vehicleDatabase';
import VehicleCard from '../../components/VehicleCard';
import { sortByPopularity } from '../../lib/vehicleUtils';

export const metadata: Metadata = {
  title: 'Best Luxury Cars 2025 - Premium Sedans, SUVs & Sports Cars | Auto Wizard',
  description: 'Compare the best luxury cars for 2025. BMW, Mercedes, Audi, Porsche, Lexus and more. Find luxury sedans, SUVs, and sports cars.',
  keywords: 'best luxury cars, luxury SUV, luxury sedan, BMW, Mercedes-Benz, Audi, Porsche, Lexus',
};

export default function BestLuxuryPage() {
  const luxuryCars = sortByPopularity(vehicleDatabase.filter(v => v.segment === 'luxury' || v.segment === 'premium' || v.segment === 'exotic'));
  const luxurySedans = sortByPopularity(luxuryCars.filter(v => v.bodyType === 'sedan'));
  const luxurySuvs = sortByPopularity(luxuryCars.filter(v => v.bodyType === 'suv' || v.bodyType === 'crossover'));
  const luxurySports = sortByPopularity(luxuryCars.filter(v => v.bodyType === 'coupe' || v.bodyType === 'sports' || v.bodyType === 'convertible'));
  const electricLuxury = sortByPopularity(luxuryCars.filter(v => v.powertrain === 'ev'));

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="relative bg-gradient-to-br from-purple-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-slate-200">Best Luxury Cars</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">✨ Best Luxury Cars 2025</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">Compare {luxuryCars.length} premium and luxury vehicles from the world&apos;s top brands.</p>
          <Link href="/quiz" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-400 hover:to-pink-500 transition-all">🎯 Find Your Perfect Luxury Car</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {luxurySedans.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Luxury Sedans ({luxurySedans.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{luxurySedans.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {luxurySuvs.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Luxury SUVs ({luxurySuvs.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{luxurySuvs.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {luxurySports.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Luxury Sports Cars ({luxurySports.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{luxurySports.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {electricLuxury.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Electric Luxury Cars ({electricLuxury.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{electricLuxury.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
      </div>
    </div>
  );
}
