import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase, Vehicle } from '../../lib/vehicleDatabase';

export const metadata: Metadata = {
  title: 'Best Luxury Cars 2025 - Premium Sedans, SUVs & Sports Cars | Auto Wizard',
  description: 'Compare the best luxury cars for 2025. BMW, Mercedes, Audi, Porsche, Lexus and more. Find luxury sedans, SUVs, and sports cars.',
  keywords: 'best luxury cars, luxury SUV, luxury sedan, BMW, Mercedes-Benz, Audi, Porsche, Lexus, premium cars',
};

function formatPrice(price: number): string {
  return `$${(price * 1000).toLocaleString()}`;
}

function getBodyTypeDisplay(bodyType: string): string {
  const displays: Record<string, string> = {
    'sedan': 'Sedan', 'suv': 'SUV', 'crossover': 'Crossover', 'coupe': 'Coupe', 'sports': 'Sports Car', 'convertible': 'Convertible',
  };
  return displays[bodyType] || bodyType;
}

export default function BestLuxuryPage() {
  const luxuryCars = vehicleDatabase
    .filter(v => v.segment === 'luxury' || v.segment === 'premium' || v.segment === 'exotic')
    .sort((a, b) => a.price - b.price);
  
  const luxurySedans = luxuryCars.filter(v => v.bodyType === 'sedan');
  const luxurySuvs = luxuryCars.filter(v => v.bodyType === 'suv' || v.bodyType === 'crossover');
  const luxurySports = luxuryCars.filter(v => v.bodyType === 'coupe' || v.bodyType === 'sports' || v.bodyType === 'convertible');
  const electricLuxury = luxuryCars.filter(v => v.powertrain === 'ev');
  const entryLuxury = luxuryCars.filter(v => v.price <= 60);
  
  const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => (
    <Link
      href={`/cars/${vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
      className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group"
    >
      <div className="aspect-video bg-slate-800 flex items-center justify-center">
        <span className="text-5xl">✨</span>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors mb-1">
          {vehicle.name}
        </h3>
        <p className="text-cyan-400 font-medium mb-2">{formatPrice(vehicle.price)}</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs capitalize">{vehicle.segment}</span>
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
              <li className="text-slate-200">Best Luxury Cars</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Best Luxury Cars 2025</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            {luxuryCars.length} premium vehicles from the world&apos;s finest automakers.
          </p>
          
          <Link href="/quiz" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl">
            🎯 Find Your Perfect Luxury Car
          </Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Entry Luxury Under $60K</h2>
          <p className="text-slate-400 mb-6">Premium experience at an accessible price</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {entryLuxury.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Luxury SUVs</h2>
          <p className="text-slate-400 mb-6">Commanding presence with premium comfort</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {luxurySuvs.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Luxury Sedans</h2>
          <p className="text-slate-400 mb-6">Classic elegance and refined comfort</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {luxurySedans.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        {luxurySports.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Best Luxury Sports Cars</h2>
            <p className="text-slate-400 mb-6">Performance meets sophistication</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {luxurySports.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}
        
        {electricLuxury.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Best Electric Luxury Cars</h2>
            <p className="text-slate-400 mb-6">The future of premium mobility</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {electricLuxury.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}
        
        <div className="bg-gradient-to-r from-amber-500/10 to-cyan-500/10 rounded-2xl p-8 border border-amber-500/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Find your perfect luxury car</h2>
          <Link href="/quiz" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl text-lg">
            Take the Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
