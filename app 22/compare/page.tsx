"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, Car } from 'lucide-react';
import { vehicleDatabase } from '../lib/vehicleDatabase';

function formatPrice(price: number): string {
  return `$${(price * 1000).toLocaleString()}`;
}

function getBodyTypeDisplay(bodyType: string): string {
  const displays: Record<string, string> = {
    'sedan': 'Sedan', 'suv': 'SUV', 'crossover': 'Crossover', 'truck': 'Truck',
    'hatchback': 'Hatchback', 'coupe': 'Coupe', 'wagon': 'Wagon', 'minivan': 'Minivan',
    'convertible': 'Convertible', 'sports': 'Sports Car', 'van': 'Van',
  };
  return displays[bodyType] || bodyType;
}

function getVehicleSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Popular comparisons
const popularComparisons = [
  { cars: ['Toyota Camry', 'Honda Accord'], category: 'Midsize Sedans' },
  { cars: ['Toyota RAV4', 'Honda CR-V'], category: 'Compact SUVs' },
  { cars: ['Ford F-150', 'Chevrolet Silverado 1500'], category: 'Full-Size Trucks' },
  { cars: ['Tesla Model Y', 'Ford Mustang Mach-E'], category: 'Electric SUVs' },
  { cars: ['BMW 3 Series', 'Mercedes-Benz C-Class'], category: 'Luxury Sedans' },
  { cars: ['Toyota Tacoma', 'Ford Ranger'], category: 'Midsize Trucks' },
  { cars: ['Kia Telluride', 'Hyundai Palisade'], category: '3-Row SUVs' },
  { cars: ['Mazda CX-5', 'Subaru Forester'], category: 'Compact SUVs' },
];

export default function ComparePage() {
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filteredVehicles = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return vehicleDatabase
      .filter(v => 
        v.name.toLowerCase().includes(query) ||
        v.brand.toLowerCase().includes(query)
      )
      .slice(0, 10);
  }, [searchQuery]);

  const addVehicle = (vehicleName: string) => {
    if (selectedVehicles.length < 3 && !selectedVehicles.includes(vehicleName)) {
      setSelectedVehicles([...selectedVehicles, vehicleName]);
    }
    setSearchQuery('');
    setShowSearch(false);
  };

  const removeVehicle = (vehicleName: string) => {
    setSelectedVehicles(selectedVehicles.filter(v => v !== vehicleName));
  };

  const compareUrl = selectedVehicles.length >= 2 
    ? `/compare/${selectedVehicles.map(getVehicleSlug).join('-vs-')}`
    : null;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-cyan-600 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-slate-200">Compare Cars</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Compare Cars Side-by-Side
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl">
            Select 2-3 vehicles to compare specs, features, and pricing. Find out which car is right for you.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Vehicle Selection */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6 mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Select Vehicles to Compare</h2>
          
          {/* Selected Vehicles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[0, 1, 2].map((index) => {
              const vehicle = selectedVehicles[index];
              const vehicleData = vehicle ? vehicleDatabase.find(v => v.name === vehicle) : null;
              
              return (
                <div 
                  key={index}
                  className={`relative rounded-xl border-2 border-dashed p-4 min-h-[140px] flex flex-col items-center justify-center transition-all ${
                    vehicle 
                      ? 'border-cyan-500/50 bg-cyan-500/5' 
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  {vehicle && vehicleData ? (
                    <>
                      <button
                        onClick={() => removeVehicle(vehicle)}
                        className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div className="text-3xl mb-2">🚗</div>
                      <h3 className="text-white font-semibold text-center">{vehicle}</h3>
                      <p className="text-cyan-600 text-sm">{formatPrice(vehicleData.price)}</p>
                      <p className="text-slate-400 text-xs">{getBodyTypeDisplay(vehicleData.bodyType)}</p>
                    </>
                  ) : (
                    <button
                      onClick={() => setShowSearch(true)}
                      className="w-full h-full flex flex-col items-center justify-center text-slate-400 hover:text-cyan-600 transition-colors"
                    >
                      <Car className="w-8 h-8 mb-2" />
                      <span className="text-sm">
                        {index === 0 ? 'Add first vehicle' : index === 1 ? 'Add second vehicle' : 'Add third (optional)'}
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Search Input */}
          {showSearch && (
            <div className="relative mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search vehicles... (e.g., Toyota Camry, Honda CR-V)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery('');
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Search Results */}
              {filteredVehicles.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-600 rounded-xl shadow-xl overflow-hidden">
                  {filteredVehicles.map((vehicle) => (
                    <button
                      key={vehicle.name}
                      onClick={() => addVehicle(vehicle.name)}
                      disabled={selectedVehicles.includes(vehicle.name)}
                      className={`w-full px-4 py-3 flex items-center justify-between hover:bg-slate-700 transition-colors ${
                        selectedVehicles.includes(vehicle.name) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="text-left">
                        <div className="text-white font-medium">{vehicle.name}</div>
                        <div className="text-slate-400 text-sm">{getBodyTypeDisplay(vehicle.bodyType)} • {formatPrice(vehicle.price)}</div>
                      </div>
                      {selectedVehicles.includes(vehicle.name) ? (
                        <span className="text-slate-500 text-sm">Already added</span>
                      ) : (
                        <span className="text-cyan-600 text-sm">Add</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Compare Button */}
          {compareUrl ? (
            <Link
              href={compareUrl}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all"
            >
              Compare {selectedVehicles.length} Vehicles
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <div className="text-center text-slate-400 py-4">
              Select at least 2 vehicles to compare
            </div>
          )}
        </div>

        {/* Popular Comparisons */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Popular Comparisons</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {popularComparisons.map((comparison) => {
              const url = `/compare/${comparison.cars.map(getVehicleSlug).join('-vs-')}`;
              return (
                <Link
                  key={comparison.cars.join('-')}
                  href={url}
                  className="bg-slate-900/50 rounded-xl border border-slate-700 p-5 hover:border-cyan-500/50 transition-all group"
                >
                  <div className="text-slate-400 text-sm mb-2">{comparison.category}</div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-600 transition-colors">
                    {comparison.cars[0]} vs {comparison.cars[1]}
                  </h3>
                  <div className="mt-3 text-cyan-600 text-sm flex items-center gap-1">
                    Compare now <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quiz CTA */}
        <div className="mt-12 bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Not Sure What to Compare?</h3>
          <p className="text-slate-300 mb-6">Take our quiz and we&apos;ll recommend the best vehicles for your specific needs.</p>
          <Link
            href="/quiz"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all"
          >
            Take the Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
