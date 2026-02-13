"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, Car, Sparkles } from 'lucide-react';
import { vehicleDatabase, Vehicle } from '../lib/vehicleDatabase';
import PageWrapper from '../components/shared/PageWrapper';

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

// Competitor mappings
const competitorMap: Record<string, string[]> = {
  'Chevrolet Suburban': ['GMC Yukon XL', 'Ford Expedition MAX', 'Toyota Sequoia', 'Nissan Armada'],
  'Chevrolet Tahoe': ['GMC Yukon', 'Ford Expedition', 'Toyota Sequoia', 'Nissan Armada'],
  'GMC Yukon': ['Chevrolet Tahoe', 'Ford Expedition', 'Toyota Sequoia', 'Nissan Armada'],
  'Ford Expedition': ['Chevrolet Tahoe', 'GMC Yukon', 'Toyota Sequoia', 'Nissan Armada'],
  'Toyota Sequoia': ['Chevrolet Tahoe', 'GMC Yukon', 'Ford Expedition', 'Nissan Armada'],
  'Kia Telluride': ['Hyundai Palisade', 'Toyota Grand Highlander', 'Mazda CX-90', 'Honda Pilot'],
  'Hyundai Palisade': ['Kia Telluride', 'Toyota Grand Highlander', 'Mazda CX-90', 'Honda Pilot'],
  'Honda Pilot': ['Toyota Highlander', 'Kia Telluride', 'Hyundai Palisade', 'Mazda CX-90'],
  'Toyota RAV4': ['Honda CR-V', 'Mazda CX-5', 'Subaru Forester', 'Hyundai Tucson'],
  'Honda CR-V': ['Toyota RAV4', 'Mazda CX-5', 'Subaru Forester', 'Hyundai Tucson'],
  'Mazda CX-5': ['Toyota RAV4', 'Honda CR-V', 'Subaru Forester', 'Hyundai Tucson'],
  'Ford F-150': ['Chevrolet Silverado 1500', 'Ram 1500', 'GMC Sierra 1500', 'Toyota Tundra'],
  'Chevrolet Silverado 1500': ['Ford F-150', 'Ram 1500', 'GMC Sierra 1500', 'Toyota Tundra'],
  'Ram 1500': ['Ford F-150', 'Chevrolet Silverado 1500', 'GMC Sierra 1500', 'Toyota Tundra'],
  'Toyota Tacoma': ['Ford Ranger', 'Chevrolet Colorado', 'GMC Canyon', 'Jeep Gladiator'],
  'Ford Ranger': ['Toyota Tacoma', 'Chevrolet Colorado', 'GMC Canyon', 'Jeep Gladiator'],
  'Toyota Camry': ['Honda Accord', 'Hyundai Sonata', 'Kia K5', 'Nissan Altima'],
  'Honda Accord': ['Toyota Camry', 'Hyundai Sonata', 'Kia K5', 'Nissan Altima'],
  'Honda Civic': ['Toyota Corolla', 'Mazda 3', 'Hyundai Elantra', 'Kia Forte'],
  'Toyota Corolla': ['Honda Civic', 'Mazda 3', 'Hyundai Elantra', 'Kia Forte'],
  'Tesla Model Y': ['Ford Mustang Mach-E', 'Hyundai Ioniq 5', 'Kia EV6', 'Volkswagen ID.4'],
  'Tesla Model 3': ['BMW i4', 'Polestar 2', 'Hyundai Ioniq 6'],
  'BMW 3 Series': ['Mercedes-Benz C-Class', 'Audi A4', 'Genesis G70', 'Lexus IS'],
  'Mercedes-Benz C-Class': ['BMW 3 Series', 'Audi A4', 'Genesis G70', 'Lexus IS'],
  'Ford Mustang': ['Chevrolet Camaro', 'Dodge Challenger', 'Nissan Z'],
  'Chevrolet Corvette': ['Porsche 911', 'Nissan GT-R', 'Jaguar F-Type'],
  'Ford Bronco': ['Jeep Wrangler', 'Toyota 4Runner', 'Jeep Gladiator'],
  'Jeep Wrangler': ['Ford Bronco', 'Toyota 4Runner', 'Jeep Gladiator'],
  'Honda Odyssey': ['Toyota Sienna', 'Kia Carnival', 'Chrysler Pacifica'],
  'Toyota Sienna': ['Honda Odyssey', 'Kia Carnival', 'Chrysler Pacifica'],
  // Land Rover / Range Rover
  'Land Rover Defender 110': ['Jeep Wrangler', 'Ford Bronco', 'Toyota 4Runner', 'Land Rover Defender 90'],
  'Land Rover Defender 90': ['Jeep Wrangler', 'Ford Bronco', 'Land Rover Defender 110'],
  'Range Rover': ['BMW X7', 'Mercedes-Benz GLS', 'Cadillac Escalade', 'Range Rover Sport'],
  'Range Rover Sport': ['BMW X5', 'Mercedes-Benz GLE', 'Porsche Cayenne', 'Range Rover Velar'],
  'Range Rover Velar': ['BMW X4', 'Mercedes-Benz GLC Coupe', 'Porsche Macan'],
  // Polestar
  'Polestar 2': ['Tesla Model 3', 'BMW i4', 'Hyundai Ioniq 6'],
  'Polestar 3': ['Tesla Model X', 'BMW iX', 'Mercedes-Benz EQE SUV'],
};

function getSuggestedVehicles(selectedVehicle: string, alreadySelected: string[]): string[] {
  if (competitorMap[selectedVehicle]) {
    return competitorMap[selectedVehicle].filter(v => 
      !alreadySelected.includes(v) && vehicleDatabase.some(veh => veh.name === v)
    );
  }
  
  const vehicle = vehicleDatabase.find(v => v.name === selectedVehicle);
  if (!vehicle) return [];
  
  const priceRange = 0.2;
  const minPrice = vehicle.price * (1 - priceRange);
  const maxPrice = vehicle.price * (1 + priceRange);
  
  return vehicleDatabase
    .filter(v => 
      v.name !== selectedVehicle &&
      !alreadySelected.includes(v.name) &&
      v.bodyType === vehicle.bodyType &&
      v.price >= minPrice &&
      v.price <= maxPrice
    )
    .sort((a, b) => Math.abs(a.price - vehicle.price) - Math.abs(b.price - vehicle.price))
    .slice(0, 4)
    .map(v => v.name);
}

const popularComparisons = [
  { cars: ['Toyota Camry', 'Honda Accord'], category: 'Midsize Sedans' },
  { cars: ['Toyota RAV4', 'Honda CR-V'], category: 'Compact SUVs' },
  { cars: ['Ford F-150', 'Chevrolet Silverado 1500'], category: 'Full-Size Trucks' },
  { cars: ['Tesla Model Y', 'Ford Mustang Mach-E'], category: 'Electric SUVs' },
  { cars: ['BMW 3 Series', 'Mercedes-Benz C-Class'], category: 'Luxury Sedans' },
  { cars: ['Toyota Tacoma', 'Ford Ranger'], category: 'Midsize Trucks' },
  { cars: ['Kia Telluride', 'Hyundai Palisade'], category: '3-Row SUVs' },
  { cars: ['Range Rover Sport', 'BMW X5'], category: 'Luxury SUVs' },
];

// Selected Vehicle Card with hover X
function SelectedVehicleCard({
  vehicleName,
  vehicleData,
  onRemove
}: {
  vehicleName: string;
  vehicleData: Vehicle;
  onRemove: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative rounded-xl border-2 border-amber-400 bg-amber-50 p-4 min-h-[140px] flex flex-col items-center justify-center transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover X button */}
      <button
        onClick={onRemove}
        className={`absolute top-2 right-2 p-1.5 bg-slate-200 hover:bg-red-500 hover:text-white rounded-full transition-all duration-200 ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        title="Remove vehicle"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="text-3xl mb-2">🚗</div>
      <h3 className="text-slate-900 font-semibold text-center">{vehicleName}</h3>
      <p className="text-amber-600 font-medium text-sm">{formatPrice(vehicleData.price)}</p>
      <p className="text-slate-500 text-xs">{getBodyTypeDisplay(vehicleData.bodyType)}</p>
    </div>
  );
}

export default function ComparePage() {
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filteredVehicles = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return vehicleDatabase
      .filter((v: Vehicle) => 
        v.name.toLowerCase().includes(query) ||
        v.brand.toLowerCase().includes(query)
      )
      .slice(0, 10);
  }, [searchQuery]);

  const suggestedVehicles = useMemo(() => {
    if (selectedVehicles.length === 0) return [];
    return getSuggestedVehicles(selectedVehicles[0], selectedVehicles);
  }, [selectedVehicles]);

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
    <PageWrapper>
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-slate-500">
                <li><Link href="/" className="hover:text-amber-600 transition-colors">Home</Link></li>
                <li>/</li>
                <li className="text-slate-900 font-medium">Compare Cars</li>
              </ol>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Compare Cars Side-by-Side
            </h1>
            <p className="text-xl text-slate-600 mb-4 max-w-2xl">
              Select 2-3 vehicles to compare specs, features, and pricing.
            </p>
            <p className="text-sm text-slate-500">{vehicleDatabase.length} vehicles available</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Vehicle Selection */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Select Vehicles to Compare</h2>
            <p className="text-sm text-slate-500 mb-6">Hover over selected vehicles to remove them</p>
            
            {/* Selected Vehicles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[0, 1, 2].map((index) => {
                const vehicleName = selectedVehicles[index];
                const vehicleData = vehicleName ? vehicleDatabase.find((v: Vehicle) => v.name === vehicleName) : null;
                
                if (vehicleData) {
                  return (
                    <SelectedVehicleCard
                      key={index}
                      vehicleName={vehicleName}
                      vehicleData={vehicleData}
                      onRemove={() => removeVehicle(vehicleName)}
                    />
                  );
                }
                
                return (
                  <div 
                    key={index}
                    className="relative rounded-xl border-2 border-dashed border-slate-300 hover:border-amber-300 hover:bg-amber-50/50 p-4 min-h-[140px] flex flex-col items-center justify-center transition-all"
                  >
                    <button
                      onClick={() => setShowSearch(true)}
                      className="w-full h-full flex flex-col items-center justify-center text-slate-400 hover:text-amber-600 transition-colors"
                    >
                      <Car className="w-8 h-8 mb-2" />
                      <span className="text-sm">
                        {index === 0 ? 'Add first vehicle' : index === 1 ? 'Add second vehicle' : 'Add third (optional)'}
                      </span>
                    </button>
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
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                  <button
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Search Results or Suggestions */}
                <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-80 overflow-y-auto">
                  {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle: Vehicle) => (
                      <button
                        key={vehicle.name}
                        onClick={() => addVehicle(vehicle.name)}
                        disabled={selectedVehicles.includes(vehicle.name)}
                        className={`w-full px-4 py-3 flex items-center justify-between hover:bg-amber-50 transition-colors ${
                          selectedVehicles.includes(vehicle.name) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <div className="text-left">
                          <div className="text-slate-900 font-medium">{vehicle.name}</div>
                          <div className="text-slate-500 text-sm">{getBodyTypeDisplay(vehicle.bodyType)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-amber-600 font-semibold">{formatPrice(vehicle.price)}</div>
                          {selectedVehicles.includes(vehicle.name) ? (
                            <span className="text-slate-400 text-xs">Already added</span>
                          ) : (
                            <span className="text-amber-600 text-xs font-medium">+ Add</span>
                          )}
                        </div>
                      </button>
                    ))
                  ) : suggestedVehicles.length > 0 && !searchQuery.trim() ? (
                    <>
                      <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-semibold text-slate-700">Suggested Competitors</span>
                      </div>
                      {suggestedVehicles.map((vehicleName) => {
                        const vehicleData = vehicleDatabase.find((v: Vehicle) => v.name === vehicleName);
                        if (!vehicleData) return null;
                        return (
                          <button
                            key={vehicleName}
                            onClick={() => addVehicle(vehicleName)}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-amber-50 transition-colors"
                          >
                            <div className="text-left">
                              <div className="text-slate-900 font-medium">{vehicleName}</div>
                              <div className="text-slate-500 text-sm">{getBodyTypeDisplay(vehicleData.bodyType)}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-amber-600 font-semibold">{formatPrice(vehicleData.price)}</div>
                              <span className="text-amber-600 text-xs font-medium">+ Add</span>
                            </div>
                          </button>
                        );
                      })}
                    </>
                  ) : searchQuery.trim() ? (
                    <div className="px-4 py-6 text-center text-slate-500">
                      No vehicles found for &quot;{searchQuery}&quot;
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-slate-500">
                      Start typing to search {vehicleDatabase.length} vehicles...
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Compare Button */}
            {compareUrl ? (
              <Link
                href={compareUrl}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
              >
                Compare {selectedVehicles.length} Vehicles
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <div className="text-center text-slate-500 py-4">
                Select at least 2 vehicles to compare
              </div>
            )}
          </div>

          {/* Popular Comparisons */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular Comparisons</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {popularComparisons.map((comparison) => {
                const url = `/compare/${comparison.cars.map(getVehicleSlug).join('-vs-')}`;
                return (
                  <Link
                    key={comparison.cars.join('-')}
                    href={url}
                    className="bg-white rounded-xl border border-slate-200 p-5 hover:border-amber-400 hover:shadow-md transition-all group"
                  >
                    <div className="text-slate-500 text-sm mb-2">{comparison.category}</div>
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {comparison.cars[0]} vs {comparison.cars[1]}
                    </h3>
                    <div className="mt-3 text-amber-600 text-sm flex items-center gap-1 font-medium">
                      Compare now <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Quiz CTA */}
          <div className="mt-12 bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Not Sure What to Compare?</h3>
            <p className="text-slate-600 mb-6">Take our quiz and we&apos;ll recommend the best vehicles for your specific needs.</p>
            <Link
              href="/quiz"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
            >
              Take the Quiz →
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
