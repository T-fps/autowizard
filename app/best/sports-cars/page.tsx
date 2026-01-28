import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase } from '../../lib/vehicleDatabase';
import VehicleCard from '../../components/VehicleCard';

export const metadata: Metadata = {
  title: 'Best Sports Cars & Exotics 2025 - Ferrari, Lamborghini, McLaren | Auto Wizard',
  description: 'Explore the best sports cars, supercars, and hypercars for 2025. From Porsche 911 to Ferrari, Lamborghini, McLaren, Bugatti, and more.',
  keywords: 'sports cars, supercars, hypercars, exotic cars, Ferrari, Lamborghini, McLaren, Porsche',
};

export default function BestSportsCarsPage() {
  const sportsCars = vehicleDatabase.filter(v => v.bodyType === 'sports' || v.bodyType === 'coupe' || v.bodyType === 'convertible' || v.segment === 'exotic').sort((a, b) => a.price - b.price);
  const affordableSports = sportsCars.filter(v => v.price < 60);
  const premiumSports = sportsCars.filter(v => v.price >= 60 && v.price < 150);
  const supercars = sportsCars.filter(v => v.price >= 150 && v.price < 500);
  const hypercars = sportsCars.filter(v => v.price >= 500);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="relative bg-gradient-to-br from-red-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-slate-200">Best Sports Cars</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🏎️ Best Sports Cars & Exotics 2025</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">Compare {sportsCars.length} sports cars from affordable coupes to million-dollar hypercars.</p>
          <Link href="/quiz" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-xl hover:from-red-400 hover:to-orange-500 transition-all">🎯 Find Your Dream Car</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {affordableSports.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Affordable Sports Cars Under $60k ({affordableSports.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{affordableSports.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {premiumSports.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Premium Sports Cars $60k-$150k ({premiumSports.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{premiumSports.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {supercars.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Supercars $150k-$500k ({supercars.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{supercars.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
        {hypercars.length > 0 && (<section><h2 className="text-2xl font-bold text-white mb-6">Hypercars $500k+ ({hypercars.length})</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{hypercars.map(v => <VehicleCard key={v.name} vehicle={v} />)}</div></section>)}
      </div>
    </div>
  );
}
