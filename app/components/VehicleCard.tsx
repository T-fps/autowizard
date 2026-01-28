'use client';

import Link from 'next/link';
import CarImage from './CarImage';

interface Vehicle {
  name: string;
  brand: string;
  price: number;
  bodyType: string;
  seats: number;
  powertrain: string;
  segment: string;
  features: string[];
}

// Brand color gradients
const brandGradients: Record<string, string> = {
  'Acura': 'from-slate-700 to-slate-900',
  'Alfa Romeo': 'from-red-800 to-red-950',
  'Aston Martin': 'from-emerald-700 to-emerald-900',
  'Audi': 'from-slate-700 to-slate-900',
  'Bentley': 'from-slate-700 to-slate-900',
  'BMW': 'from-blue-600 to-blue-800',
  'Bugatti': 'from-blue-800 to-blue-950',
  'Buick': 'from-slate-600 to-slate-800',
  'Cadillac': 'from-slate-700 to-slate-900',
  'Chevrolet': 'from-yellow-500 to-yellow-700',
  'Chrysler': 'from-blue-700 to-blue-900',
  'Dodge': 'from-red-600 to-red-800',
  'Ferrari': 'from-red-600 to-red-900',
  'Ford': 'from-blue-600 to-blue-800',
  'Genesis': 'from-slate-700 to-slate-900',
  'GMC': 'from-red-700 to-red-900',
  'Honda': 'from-red-500 to-red-700',
  'Hyundai': 'from-blue-600 to-blue-800',
  'Infiniti': 'from-slate-600 to-slate-800',
  'Jaguar': 'from-green-700 to-green-900',
  'Jeep': 'from-green-700 to-green-900',
  'Kia': 'from-red-600 to-red-800',
  'Koenigsegg': 'from-amber-600 to-amber-800',
  'Lamborghini': 'from-yellow-500 to-orange-600',
  'Land Rover': 'from-green-700 to-green-900',
  'Lexus': 'from-slate-700 to-slate-900',
  'Lincoln': 'from-slate-700 to-slate-900',
  'Lotus': 'from-green-600 to-green-800',
  'Lucid': 'from-slate-600 to-slate-800',
  'Maserati': 'from-blue-700 to-blue-900',
  'Mazda': 'from-red-600 to-red-800',
  'McLaren': 'from-orange-500 to-orange-700',
  'Mercedes-Benz': 'from-slate-600 to-slate-800',
  'Mercedes-AMG': 'from-slate-600 to-slate-800',
  'Mini': 'from-slate-700 to-slate-900',
  'Mitsubishi': 'from-red-600 to-red-800',
  'Nissan': 'from-red-600 to-red-800',
  'Pagani': 'from-slate-600 to-blue-900',
  'Polestar': 'from-amber-500 to-amber-700',
  'Porsche': 'from-slate-600 to-slate-800',
  'Ram': 'from-slate-700 to-slate-900',
  'Rivian': 'from-amber-600 to-amber-800',
  'Rolls-Royce': 'from-purple-900 to-slate-900',
  'Subaru': 'from-blue-600 to-blue-800',
  'Tesla': 'from-red-600 to-slate-800',
  'Toyota': 'from-red-600 to-red-800',
  'Volkswagen': 'from-blue-600 to-blue-800',
  'Volvo': 'from-blue-700 to-blue-900',
};

function getBrandGradient(brand: string): string {
  return brandGradients[brand] || 'from-slate-700 to-slate-900';
}

function formatPrice(price: number): string {
  return `$${(price * 1000).toLocaleString()}`;
}

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const slug = vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const brandGradient = getBrandGradient(vehicle.brand);
  
  return (
    <Link
      href={`/cars/${slug}`}
      className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group"
    >
      <div className={`aspect-video bg-gradient-to-br ${brandGradient} relative overflow-hidden`}>
        <CarImage 
          vehicleName={vehicle.name}
          brandColor={brandGradient}
          isExotic={vehicle.segment === 'exotic'}
          bodyType={vehicle.bodyType}
        />
        {vehicle.segment === 'exotic' && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold z-10">
            EXOTIC
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors mb-1">
          {vehicle.name}
        </h3>
        <p className="text-cyan-400 font-medium mb-2">{formatPrice(vehicle.price)}</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs">
            {vehicle.seats} seats
          </span>
          {vehicle.powertrain !== 'gas' && (
            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs capitalize">
              {vehicle.powertrain === 'ev' ? 'Electric' : vehicle.powertrain}
            </span>
          )}
          {vehicle.features.includes('awd') && (
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">AWD</span>
          )}
        </div>
      </div>
    </Link>
  );
}
