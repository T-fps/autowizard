import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase } from '../../lib/vehicleDatabase';

export const metadata: Metadata = {
  title: 'Best Sports Cars & Exotics 2025 - Ferrari, Lamborghini, McLaren | Auto Wizard',
  description: 'Explore the best sports cars, supercars, and hypercars for 2025. From Porsche 911 to Ferrari, Lamborghini, McLaren, Bugatti, and more exotic brands.',
  keywords: 'sports cars, supercars, hypercars, exotic cars, Ferrari, Lamborghini, McLaren, Porsche, Aston Martin, Bugatti',
};

function formatPrice(price: number): string {
  if (price >= 1000) {
    return `$${(price / 1000).toFixed(1)}M`;
  }
  return `$${(price * 1000).toLocaleString()}`;
}

function getVehicleSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function getPowertrainBadge(powertrain: string): { text: string; color: string } {
  const badges: Record<string, { text: string; color: string }> = {
    ev: { text: 'Electric', color: 'bg-green-500/20 text-green-400' },
    hybrid: { text: 'Hybrid', color: 'bg-blue-500/20 text-blue-400' },
    phev: { text: 'Plug-in Hybrid', color: 'bg-cyan-500/20 text-cyan-400' },
    gas: { text: 'Gas', color: 'bg-slate-500/20 text-slate-400' },
  };
  return badges[powertrain] || badges.gas;
}

export default function SportsExoticsPage() {
  // Filter sports cars and exotics
  const sportsCars = vehicleDatabase.filter(v => 
    v.bodyType === 'sports' || 
    v.bodyType === 'coupe' || 
    v.bodyType === 'convertible' ||
    v.segment === 'exotic' ||
    v.features.includes('performance')
  ).sort((a, b) => a.price - b.price);
  
  // Category breakdown
  const exoticBrands = ['Ferrari', 'Lamborghini', 'McLaren', 'Bugatti', 'Pagani', 'Koenigsegg'];
  const luxurySportsBrands = ['Aston Martin', 'Bentley', 'Rolls-Royce', 'Maserati'];
  
  const exotics = sportsCars.filter(v => exoticBrands.includes(v.brand));
  const hypercars = sportsCars.filter(v => v.price >= 1000); // $1M+
  const luxurySports = sportsCars.filter(v => luxurySportsBrands.includes(v.brand));
  const porsche = sportsCars.filter(v => v.brand === 'Porsche');
  const affordableSports = sportsCars.filter(v => v.price < 60 && (v.bodyType === 'sports' || v.bodyType === 'coupe'));
  const convertibles = sportsCars.filter(v => v.bodyType === 'convertible');
  const suvExotics = sportsCars.filter(v => v.segment === 'exotic' && (v.bodyType === 'suv' || v.bodyType === 'crossover'));
  
  // Stats
  const totalCount = sportsCars.length;
  const exoticCount = exotics.length;
  const hypercarCount = hypercars.length;
  const convertibleCount = convertibles.length;
  
  const VehicleCard = ({ vehicle }: { vehicle: typeof vehicleDatabase[0] }) => {
    const powertrainBadge = getPowertrainBadge(vehicle.powertrain);
    return (
      <Link
        href={`/cars/${getVehicleSlug(vehicle.name)}`}
        className="group bg-slate-800/50 rounded-xl border border-slate-700 p-4 hover:border-amber-500/50 transition-all"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-semibold group-hover:text-amber-400 transition-colors">{vehicle.name}</h3>
            <p className="text-slate-400 text-sm">{vehicle.brand}</p>
          </div>
          <span className="text-amber-400 font-bold">{formatPrice(vehicle.price)}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className={`px-2 py-0.5 rounded-full text-xs ${powertrainBadge.color}`}>{powertrainBadge.text}</span>
          {vehicle.segment === 'exotic' && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-amber-500/20 text-amber-400">Exotic</span>
          )}
          {vehicle.bodyType === 'convertible' && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-pink-500/20 text-pink-400">Convertible</span>
          )}
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-cyan-400">Home</Link></li>
              <li>/</li>
              <li><Link href="/best" className="hover:text-cyan-400">Best Cars</Link></li>
              <li>/</li>
              <li className="text-slate-200">Sports & Exotics</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sports Cars & Exotics 🏎️
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            From affordable sports cars to million-dollar hypercars. Ferrari, Lamborghini, McLaren, Bugatti, and more.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-amber-400">{totalCount}</div>
              <div className="text-slate-400 text-sm">Sports & Performance Cars</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-red-400">{exoticCount}</div>
              <div className="text-slate-400 text-sm">Exotic Supercars</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-purple-400">{hypercarCount}</div>
              <div className="text-slate-400 text-sm">Hypercars ($1M+)</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-pink-400">{convertibleCount}</div>
              <div className="text-slate-400 text-sm">Convertibles</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hypercars ($1M+) */}
        {hypercars.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Hypercars</h2>
            <p className="text-slate-400 mb-6">The pinnacle of automotive engineering - $1 million and up</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hypercars.map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}

        {/* Italian Exotics */}
        {exotics.filter(v => ['Ferrari', 'Lamborghini'].includes(v.brand)).length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Ferrari & Lamborghini</h2>
            <p className="text-slate-400 mb-6">Italian passion and engineering excellence</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exotics.filter(v => ['Ferrari', 'Lamborghini'].includes(v.brand)).map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}

        {/* McLaren */}
        {exotics.filter(v => v.brand === 'McLaren').length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">McLaren</h2>
            <p className="text-slate-400 mb-6">British precision and Formula 1 technology</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exotics.filter(v => v.brand === 'McLaren').map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}

        {/* British Luxury Sports */}
        {luxurySports.filter(v => ['Aston Martin', 'Bentley'].includes(v.brand)).length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">British Grand Touring</h2>
            <p className="text-slate-400 mb-6">Aston Martin & Bentley - elegance meets performance</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {luxurySports.filter(v => ['Aston Martin', 'Bentley'].includes(v.brand)).map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}

        {/* Rolls-Royce */}
        {luxurySports.filter(v => v.brand === 'Rolls-Royce').length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Rolls-Royce</h2>
            <p className="text-slate-400 mb-6">The pinnacle of automotive luxury</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {luxurySports.filter(v => v.brand === 'Rolls-Royce').map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}

        {/* Maserati */}
        {luxurySports.filter(v => v.brand === 'Maserati').length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Maserati</h2>
            <p className="text-slate-400 mb-6">Italian racing heritage and style</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {luxurySports.filter(v => v.brand === 'Maserati').map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}

        {/* Porsche */}
        {porsche.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Porsche</h2>
            <p className="text-slate-400 mb-6">Sports car DNA in every model</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {porsche.map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}

        {/* Exotic SUVs */}
        {suvExotics.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Exotic SUVs</h2>
            <p className="text-slate-400 mb-6">Supercar performance with everyday practicality</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suvExotics.map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}

        {/* Affordable Sports Cars */}
        {affordableSports.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Affordable Sports Cars</h2>
            <p className="text-slate-400 mb-6">Driving thrills under $60K</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {affordableSports.map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}

        {/* Quiz CTA */}
        <div className="bg-gradient-to-r from-amber-500/10 to-red-500/10 rounded-2xl p-8 border border-amber-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Find Your Dream Machine</h3>
          <p className="text-slate-300 mb-6 max-w-xl mx-auto">
            Not sure which sports car matches your lifestyle? Our quiz considers your budget, driving preferences, and practical needs.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-red-500 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-red-400 transition-all text-lg"
          >
            Take the Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
