import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase, Vehicle } from '../../lib/vehicleDatabase';
import VehicleCard from '../../components/VehicleCard';

export const metadata: Metadata = {
  title: 'Best Trucks 2025 - Full-Size & Midsize Pickups | Auto Wizard',
  description: 'Compare the best trucks for 2025. Full-size pickups like F-150, Silverado, and Ram plus midsize options like Tacoma and Colorado. Find prices and specs.',
  keywords: 'best trucks, best pickup trucks 2025, Ford F-150, Chevrolet Silverado, Toyota Tacoma, Ram 1500, midsize trucks',
};

export default function BestTrucksPage() {
  const trucks = vehicleDatabase
    .filter(v => v.bodyType === 'truck')
    .sort((a, b) => a.price - b.price);
  
  const midsizeTrucks = trucks.filter(v => v.size === 'midsize' || v.price < 45);
  const fullsizeTrucks = trucks.filter(v => v.size === 'fullsize' || v.price >= 45);
  const electricTrucks = trucks.filter(v => v.powertrain === 'ev');
  const offroadTrucks = trucks.filter(v => v.features.includes('offroad'));

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-slate-200">Best Trucks</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Best Trucks 2025
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Compare {trucks.length} pickup trucks from midsize daily drivers to heavy-duty workhorses.
          </p>
          
          <Link
            href="/quiz"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
          >
            🎯 Find Your Perfect Truck
          </Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Midsize Trucks */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Midsize Trucks</h2>
          <p className="text-slate-400 mb-6">Versatile pickups with everyday drivability</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {midsizeTrucks.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        {/* Full-size Trucks */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Full-Size Trucks</h2>
          <p className="text-slate-400 mb-6">Maximum capability for work and towing</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fullsizeTrucks.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        {/* Off-Road Trucks */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Best Off-Road Trucks</h2>
          <p className="text-slate-400 mb-6">Built to tackle any terrain</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offroadTrucks.slice(0, 8).map(v => <VehicleCard key={v.name} vehicle={v} />)}
          </div>
        </section>
        
        {/* Electric Trucks */}
        {electricTrucks.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Best Electric Trucks</h2>
            <p className="text-slate-400 mb-6">Zero-emission power with instant torque</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {electricTrucks.map(v => <VehicleCard key={v.name} vehicle={v} />)}
            </div>
          </section>
        )}
        
        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Find your perfect truck</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Tell us about your towing needs, work requirements, and driving style.
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
