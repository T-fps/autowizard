'use client';

import Link from 'next/link';
import CarImage from './CarImage';
import { getBrandGradient } from '../lib/vehicleUtils';

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
