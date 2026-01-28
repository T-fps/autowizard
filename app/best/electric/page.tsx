import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase, Vehicle } from '../../lib/vehicleDatabase';

export const metadata: Metadata = {
  title: 'Best Electric Cars 2025 - EVs Ranked by Range & Value | Auto Wizard',
  description: 'Compare the best electric vehicles for 2025. Tesla, Rivian, BMW, Mercedes, and more. Find EV prices, range estimates, and the perfect electric car for you.',
  keywords: 'best electric cars, best EVs 2025, Tesla, electric SUV, electric truck, longest range EV, affordable electric car',
};

function formatPrice(price: number): string {
  return `$${(price * 1000).toLocaleString()}`;
}

function getBodyTypeDisplay(bodyType: string): string {
  const displays: Record<string, string> = {
    'sedan': 'Sedan', 'suv': 'SUV', 'crossover': 'Crossover', 'truck': 'Truck',
    'hatchback': 'Hatchback', 'coupe': 'Coupe', 'wagon': 'Wagon',
  };
  return displays[bodyType] || bodyType;
}

export default function BestElectricPage() {
  const evs = vehicleDatabase
    .filter(v => v.powertrain === 'ev')
    .sort((a, b) => a.price - b.price);
  
  const affordableEvs = evs.filter(v => v.price <= 50);
  const luxuryEvs = evs.filter(v => v.segment === 'luxury' || v.segment === 'premium');
  const evSuvs = evs.filter(v => v.bodyType === 'suv' || v.bodyType === 'crossover');
  const evTrucks = evs.filter(v => v.bodyType === 'truck');
  const evSedans = evs.filter(v => v.bodyType === 'sedan');
  
  const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => (
    <Link
      href={`/cars/${vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
      className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group"
    >
      <div className="aspect-video bg-slate-800 flex items-center justify-center">
        <span className="text-5xl">⚡</span>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors mb-1">
          {vehicle.name}
        </h3>
        <p className="text-cyan-400 font-medium mb-2">{formatPrice(vehicle.price)}</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
            Electric
          </span>
          <span className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs">
            {getBodyTypeDisplay(vehicle.bodyType)}
          </span>
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
              <li className="text-slate-200">Best Electric Cars</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Best Electric Cars 2025
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Compare {evs.length} electric vehicles from affordable commuters to luxury performance EVs.
          </p>
          
          <Link
            href="/quiz"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
          >
            🎯 Find Your Perfect EV
          </Link>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{evs.length}</div>
              <div className="text-slate-400 text-sm">Electric Models</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{evSuvs.length}</div>
              <div className="text-slate-400 text-sm">Electric SUVs</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{evTrucks.length}</div>
              <div className="text-slate-400 text-sm">Electric Trucks</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{formatPrice(Math.min(...evs.map(v => v.price)))}</div>
              <div className="text-slate-400 text-sm">Starting Price</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Affordable EVs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Affordable Electric Cars Under $50K</h2>
          <p className="text-slate-400 mb-6">Zero-emission driving that won&apos;t break the bank</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {affordableEvs.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        {/* Electric SUVs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Electric SUVs</h2>
          <p className="text-slate-400 mb-6">Family-friendly EVs with space and versatility</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {evSuvs.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        {/* Electric Sedans */}
        {evSedans.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Best Electric Sedans</h2>
            <p className="text-slate-400 mb-6">Sleek design meets electric efficiency</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {evSedans.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}
        
        {/* Electric Trucks */}
        {evTrucks.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Best Electric Trucks</h2>
            <p className="text-slate-400 mb-6">Truck capability with electric power</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {evTrucks.map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}
        
        {/* Luxury EVs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Luxury Electric Cars</h2>
          <p className="text-slate-400 mb-6">Premium features and performance</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {luxuryEvs.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        {/* CTA */}
        <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-2xl p-8 border border-green-500/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to go electric?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Tell us about your driving habits and we&apos;ll find the perfect EV for your lifestyle.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 text-lg"
          >
            Take the Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
