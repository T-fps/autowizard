import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase } from '../../lib/vehicleDatabase';
import VehicleCard from '../../components/VehicleCard';

export const metadata: Metadata = {
  title: 'Best Electric Cars 2025 - EVs Ranked by Range & Value | Auto Wizard',
  description: 'Compare the best electric vehicles for 2025. Tesla, Rivian, BMW, Mercedes, and more. Find EV prices, range estimates, and the perfect electric car.',
  keywords: 'best electric cars, best EVs 2025, Tesla, electric SUV, electric truck, longest range EV',
};

export default function BestElectricPage() {
  const evs = vehicleDatabase.filter(v => v.powertrain === 'ev').sort((a, b) => a.price - b.price);
  const affordableEvs = evs.filter(v => v.price <= 50);
  const luxuryEvs = evs.filter(v => v.segment === 'luxury' || v.segment === 'premium');
  const evSuvs = evs.filter(v => v.bodyType === 'suv' || v.bodyType === 'crossover');
  const evTrucks = evs.filter(v => v.bodyType === 'truck');

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="relative bg-gradient-to-br from-green-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-slate-200">Best Electric Cars</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">⚡ Best Electric Cars 2025</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">Compare {evs.length} electric vehicles from affordable EVs to luxury electric cars.</p>
          <Link href="/quiz" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-cyan-500 transition-all">🎯 Find Your Perfect EV</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {affordableEvs.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Affordable EVs Under $50k ({affordableEvs.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{affordableEvs.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {evSuvs.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Electric SUVs & Crossovers ({evSuvs.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{evSuvs.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {evTrucks.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Electric Trucks ({evTrucks.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{evTrucks.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {luxuryEvs.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Luxury Electric Cars ({luxuryEvs.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{luxuryEvs.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
      </div>
    </div>
  );
}
