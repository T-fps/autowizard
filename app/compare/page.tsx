"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, Car, Sparkles } from 'lucide-react';
import { vehicleDatabase } from '../lib/vehicleDatabase';
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

// Competitor mappings - vehicles commonly cross-shopped together
const competitorMap: Record<string, string[]> = {
  // Full-size SUVs
  'Chevrolet Suburban': ['GMC Yukon XL', 'Ford Expedition MAX', 'Toyota Sequoia', 'Nissan Armada'],
  'Chevrolet Tahoe': ['GMC Yukon', 'Ford Expedition', 'Toyota Sequoia', 'Nissan Armada'],
  'GMC Yukon': ['Chevrolet Tahoe', 'Ford Expedition', 'Toyota Sequoia', 'Nissan Armada'],
  'GMC Yukon XL': ['Chevrolet Suburban', 'Ford Expedition MAX', 'Toyota Sequoia', 'Nissan Armada'],
  'Ford Expedition': ['Chevrolet Tahoe', 'GMC Yukon', 'Toyota Sequoia', 'Nissan Armada'],
  'Ford Expedition MAX': ['Chevrolet Suburban', 'GMC Yukon XL', 'Toyota Sequoia', 'Nissan Armada'],
  'Toyota Sequoia': ['Chevrolet Tahoe', 'GMC Yukon', 'Ford Expedition', 'Nissan Armada'],
  'Nissan Armada': ['Chevrolet Tahoe', 'GMC Yukon', 'Ford Expedition', 'Toyota Sequoia'],
  
  // 3-Row Midsize SUVs
  'Kia Telluride': ['Hyundai Palisade', 'Toyota Grand Highlander', 'Mazda CX-90', 'Honda Pilot'],
  'Hyundai Palisade': ['Kia Telluride', 'Toyota Grand Highlander', 'Mazda CX-90', 'Honda Pilot'],
  'Toyota Highlander': ['Honda Pilot', 'Mazda CX-90', 'Kia Telluride', 'Hyundai Palisade'],
  'Toyota Grand Highlander': ['Kia Telluride', 'Hyundai Palisade', 'Honda Pilot', 'Mazda CX-90'],
  'Honda Pilot': ['Toyota Highlander', 'Kia Telluride', 'Hyundai Palisade', 'Mazda CX-90'],
  'Mazda CX-90': ['Kia Telluride', 'Hyundai Palisade', 'Toyota Grand Highlander', 'Honda Pilot'],
  'Ford Explorer': ['Chevrolet Traverse', 'Honda Pilot', 'Toyota Highlander', 'Jeep Grand Cherokee'],
  'Chevrolet Traverse': ['Ford Explorer', 'Honda Pilot', 'Toyota Highlander', 'Kia Telluride'],
  'Jeep Grand Cherokee': ['Ford Explorer', 'Toyota 4Runner', 'Honda Pilot', 'Chevrolet Traverse'],
  'Jeep Grand Cherokee L': ['Kia Telluride', 'Hyundai Palisade', 'Ford Explorer', 'Chevrolet Traverse'],
  
  // Compact SUVs
  'Toyota RAV4': ['Honda CR-V', 'Mazda CX-5', 'Subaru Forester', 'Hyundai Tucson'],
  'Honda CR-V': ['Toyota RAV4', 'Mazda CX-5', 'Subaru Forester', 'Hyundai Tucson'],
  'Mazda CX-5': ['Toyota RAV4', 'Honda CR-V', 'Subaru Forester', 'Hyundai Tucson'],
  'Subaru Forester': ['Toyota RAV4', 'Honda CR-V', 'Mazda CX-5', 'Hyundai Tucson'],
  'Hyundai Tucson': ['Toyota RAV4', 'Honda CR-V', 'Kia Sportage', 'Mazda CX-5'],
  'Kia Sportage': ['Hyundai Tucson', 'Toyota RAV4', 'Honda CR-V', 'Mazda CX-5'],
  'Ford Bronco Sport': ['Mazda CX-50', 'Subaru Forester', 'Toyota RAV4', 'Jeep Compass'],
  'Mazda CX-50': ['Ford Bronco Sport', 'Subaru Outback', 'Subaru Forester', 'Toyota RAV4'],
  
  // Off-Road SUVs
  'Ford Bronco': ['Jeep Wrangler', 'Toyota 4Runner', 'Land Rover Defender 90', 'Jeep Gladiator'],
  'Jeep Wrangler': ['Ford Bronco', 'Toyota 4Runner', 'Land Rover Defender 90', 'Jeep Gladiator'],
  'Toyota 4Runner': ['Jeep Wrangler', 'Ford Bronco', 'Jeep Grand Cherokee', 'Land Rover Defender 110'],
  'Land Rover Defender 90': ['Jeep Wrangler', 'Ford Bronco', 'Toyota 4Runner', 'Land Rover Defender 110'],
  'Land Rover Defender 110': ['Toyota 4Runner', 'Jeep Wrangler', 'Ford Bronco', 'Land Rover Defender 90'],
  
  // Full-size Trucks
  'Ford F-150': ['Chevrolet Silverado 1500', 'Ram 1500', 'GMC Sierra 1500', 'Toyota Tundra'],
  'Chevrolet Silverado 1500': ['Ford F-150', 'Ram 1500', 'GMC Sierra 1500', 'Toyota Tundra'],
  'Ram 1500': ['Ford F-150', 'Chevrolet Silverado 1500', 'GMC Sierra 1500', 'Toyota Tundra'],
  'GMC Sierra 1500': ['Ford F-150', 'Chevrolet Silverado 1500', 'Ram 1500', 'Toyota Tundra'],
  'Toyota Tundra': ['Ford F-150', 'Chevrolet Silverado 1500', 'Ram 1500', 'GMC Sierra 1500'],
  'Nissan Titan': ['Toyota Tundra', 'Ford F-150', 'Chevrolet Silverado 1500', 'Ram 1500'],
  
  // Midsize Trucks
  'Toyota Tacoma': ['Ford Ranger', 'Chevrolet Colorado', 'GMC Canyon', 'Jeep Gladiator'],
  'Ford Ranger': ['Toyota Tacoma', 'Chevrolet Colorado', 'GMC Canyon', 'Jeep Gladiator'],
  'Chevrolet Colorado': ['Toyota Tacoma', 'Ford Ranger', 'GMC Canyon', 'Jeep Gladiator'],
  'GMC Canyon': ['Toyota Tacoma', 'Chevrolet Colorado', 'Ford Ranger', 'Jeep Gladiator'],
  'Jeep Gladiator': ['Toyota Tacoma', 'Ford Ranger', 'Chevrolet Colorado', 'Ford Bronco'],
  'Honda Ridgeline': ['Toyota Tacoma', 'Ford Ranger', 'Hyundai Santa Cruz', 'Chevrolet Colorado'],
  'Hyundai Santa Cruz': ['Honda Ridgeline', 'Ford Maverick', 'Toyota Tacoma', 'Ford Ranger'],
  'Ford Maverick': ['Hyundai Santa Cruz', 'Honda Ridgeline', 'Toyota Tacoma', 'Ford Ranger'],
  
  // Midsize Sedans
  'Toyota Camry': ['Honda Accord', 'Mazda 6', 'Hyundai Sonata', 'Kia K5'],
  'Honda Accord': ['Toyota Camry', 'Mazda 6', 'Hyundai Sonata', 'Kia K5'],
  'Hyundai Sonata': ['Toyota Camry', 'Honda Accord', 'Kia K5', 'Nissan Altima'],
  'Kia K5': ['Hyundai Sonata', 'Toyota Camry', 'Honda Accord', 'Mazda 6'],
  'Nissan Altima': ['Toyota Camry', 'Honda Accord', 'Hyundai Sonata', 'Kia K5'],
  'Subaru Legacy': ['Toyota Camry', 'Honda Accord', 'Mazda 6', 'Volkswagen Passat'],
  
  // Compact Sedans
  'Honda Civic': ['Toyota Corolla', 'Mazda 3', 'Hyundai Elantra', 'Kia Forte'],
  'Toyota Corolla': ['Honda Civic', 'Mazda 3', 'Hyundai Elantra', 'Kia Forte'],
  'Mazda 3': ['Honda Civic', 'Toyota Corolla', 'Hyundai Elantra', 'Volkswagen Jetta'],
  'Hyundai Elantra': ['Honda Civic', 'Toyota Corolla', 'Kia Forte', 'Mazda 3'],
  'Kia Forte': ['Hyundai Elantra', 'Honda Civic', 'Toyota Corolla', 'Nissan Sentra'],
  
  // Electric SUVs
  'Tesla Model Y': ['Ford Mustang Mach-E', 'Chevrolet Equinox EV', 'Hyundai Ioniq 5', 'Kia EV6'],
  'Tesla Model X': ['Rivian R1S', 'BMW iX', 'Mercedes-Benz EQS SUV', 'Cadillac Lyriq'],
  'Ford Mustang Mach-E': ['Tesla Model Y', 'Chevrolet Equinox EV', 'Hyundai Ioniq 5', 'Kia EV6'],
  'Chevrolet Equinox EV': ['Tesla Model Y', 'Ford Mustang Mach-E', 'Hyundai Ioniq 5', 'Kia EV6'],
  'Hyundai Ioniq 5': ['Tesla Model Y', 'Kia EV6', 'Ford Mustang Mach-E', 'Volkswagen ID.4'],
  'Kia EV6': ['Hyundai Ioniq 5', 'Tesla Model Y', 'Ford Mustang Mach-E', 'Volkswagen ID.4'],
  'Kia EV9': ['Hyundai Ioniq 9', 'Rivian R1S', 'Tesla Model X', 'Mercedes-Benz EQS SUV'],
  'Rivian R1S': ['Tesla Model X', 'Kia EV9', 'BMW iX', 'Mercedes-Benz EQS SUV'],
  
  // Electric Sedans
  'Tesla Model 3': ['BMW i4', 'Polestar 2', 'Hyundai Ioniq 6', 'Mercedes-Benz EQE'],
  'Tesla Model S': ['Mercedes-Benz EQS', 'BMW i7', 'Lucid Air', 'Porsche Taycan'],
  'Hyundai Ioniq 6': ['Tesla Model 3', 'BMW i4', 'Polestar 2', 'Mercedes-Benz EQE'],
  
  // Electric Trucks
  'Ford F-150 Lightning': ['Chevrolet Silverado EV', 'Rivian R1T', 'Tesla Cybertruck', 'GMC Hummer EV Pickup'],
  'Chevrolet Silverado EV': ['Ford F-150 Lightning', 'Rivian R1T', 'Tesla Cybertruck', 'GMC Hummer EV Pickup'],
  'Rivian R1T': ['Ford F-150 Lightning', 'Chevrolet Silverado EV', 'Tesla Cybertruck', 'GMC Hummer EV Pickup'],
  'Tesla Cybertruck': ['Ford F-150 Lightning', 'Rivian R1T', 'Chevrolet Silverado EV', 'GMC Hummer EV Pickup'],
  'GMC Hummer EV Pickup': ['Ford F-150 Lightning', 'Rivian R1T', 'Tesla Cybertruck', 'Chevrolet Silverado EV'],
  
  // Luxury Sedans
  'BMW 3 Series': ['Mercedes-Benz C-Class', 'Audi A4', 'Genesis G70', 'Lexus IS'],
  'Mercedes-Benz C-Class': ['BMW 3 Series', 'Audi A4', 'Genesis G70', 'Lexus IS'],
  'Audi A4': ['BMW 3 Series', 'Mercedes-Benz C-Class', 'Genesis G70', 'Lexus IS'],
  'Genesis G70': ['BMW 3 Series', 'Mercedes-Benz C-Class', 'Audi A4', 'Lexus IS'],
  'Lexus IS': ['BMW 3 Series', 'Mercedes-Benz C-Class', 'Audi A4', 'Genesis G70'],
  'BMW 5 Series': ['Mercedes-Benz E-Class', 'Audi A6', 'Genesis G80', 'Lexus ES'],
  'Mercedes-Benz E-Class': ['BMW 5 Series', 'Audi A6', 'Genesis G80', 'Lexus ES'],
  'Audi A6': ['BMW 5 Series', 'Mercedes-Benz E-Class', 'Genesis G80', 'Lexus ES'],
  'Genesis G80': ['BMW 5 Series', 'Mercedes-Benz E-Class', 'Audi A6', 'Lexus ES'],
  
  // Luxury SUVs
  'BMW X3': ['Mercedes-Benz GLC', 'Audi Q5', 'Genesis GV70', 'Lexus NX'],
  'Mercedes-Benz GLC': ['BMW X3', 'Audi Q5', 'Genesis GV70', 'Lexus NX'],
  'Audi Q5': ['BMW X3', 'Mercedes-Benz GLC', 'Genesis GV70', 'Lexus NX'],
  'Genesis GV70': ['BMW X3', 'Mercedes-Benz GLC', 'Audi Q5', 'Lexus NX'],
  'Lexus NX': ['BMW X3', 'Mercedes-Benz GLC', 'Audi Q5', 'Genesis GV70'],
  'BMW X5': ['Mercedes-Benz GLE', 'Audi Q7', 'Genesis GV80', 'Lexus RX'],
  'Mercedes-Benz GLE': ['BMW X5', 'Audi Q7', 'Genesis GV80', 'Lexus RX'],
  'Audi Q7': ['BMW X5', 'Mercedes-Benz GLE', 'Genesis GV80', 'Volvo XC90'],
  'Genesis GV80': ['BMW X5', 'Mercedes-Benz GLE', 'Audi Q7', 'Lexus RX'],
  'Lexus RX': ['BMW X5', 'Mercedes-Benz GLE', 'Audi Q7', 'Genesis GV80'],
  
  // Sports Cars
  'Ford Mustang': ['Chevrolet Camaro', 'Dodge Challenger', 'Nissan Z', 'Toyota GR Supra'],
  'Chevrolet Camaro': ['Ford Mustang', 'Dodge Challenger', 'Nissan Z', 'Toyota GR Supra'],
  'Dodge Challenger': ['Ford Mustang', 'Chevrolet Camaro', 'Dodge Charger', 'Nissan Z'],
  'Nissan Z': ['Toyota GR Supra', 'Ford Mustang', 'Chevrolet Camaro', 'BMW Z4'],
  'Toyota GR Supra': ['Nissan Z', 'BMW Z4', 'Ford Mustang', 'Porsche 718 Cayman'],
  'Toyota GR86': ['Subaru BRZ', 'Mazda MX-5 Miata', 'Nissan Z', 'Ford Mustang'],
  'Subaru BRZ': ['Toyota GR86', 'Mazda MX-5 Miata', 'Nissan Z', 'Ford Mustang'],
  'Mazda MX-5 Miata': ['Toyota GR86', 'Subaru BRZ', 'Porsche 718 Boxster', 'BMW Z4'],
  'Chevrolet Corvette': ['Porsche 911', 'Nissan GT-R', 'Jaguar F-Type', 'BMW M4'],
  'Porsche 911': ['Chevrolet Corvette', 'Nissan GT-R', 'Jaguar F-Type', 'Audi R8'],
  
  // Minivans
  'Honda Odyssey': ['Toyota Sienna', 'Kia Carnival', 'Chrysler Pacifica', 'Chrysler Voyager'],
  'Toyota Sienna': ['Honda Odyssey', 'Kia Carnival', 'Chrysler Pacifica', 'Chrysler Voyager'],
  'Kia Carnival': ['Honda Odyssey', 'Toyota Sienna', 'Chrysler Pacifica', 'Chrysler Voyager'],
  'Chrysler Pacifica': ['Honda Odyssey', 'Toyota Sienna', 'Kia Carnival', 'Chrysler Voyager'],
};

// Get similar vehicles based on body type and price if no direct competitors
function getSuggestedVehicles(selectedVehicle: string, alreadySelected: string[]): string[] {
  // Check for direct competitors first
  if (competitorMap[selectedVehicle]) {
    return competitorMap[selectedVehicle].filter(v => !alreadySelected.includes(v));
  }
  
  // Fallback: find similar by body type and price
  const vehicle = vehicleDatabase.find(v => v.name === selectedVehicle);
  if (!vehicle) return [];
  
  const priceRange = 0.2; // 20% price variance
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

  // Get suggestions based on first selected vehicle
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
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              Select 2-3 vehicles to compare specs, features, and pricing. Find out which car is right for you.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Vehicle Selection */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Select Vehicles to Compare</h2>
            
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
                        ? 'border-amber-400 bg-amber-50' 
                        : 'border-slate-300 hover:border-amber-300 hover:bg-amber-50/50'
                    }`}
                  >
                    {vehicle && vehicleData ? (
                      <>
                        <button
                          onClick={() => removeVehicle(vehicle)}
                          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        <div className="text-3xl mb-2">🚗</div>
                        <h3 className="text-slate-900 font-semibold text-center">{vehicle}</h3>
                        <p className="text-amber-600 font-medium text-sm">{formatPrice(vehicleData.price)}</p>
                        <p className="text-slate-500 text-xs">{getBodyTypeDisplay(vehicleData.bodyType)}</p>
                      </>
                    ) : (
                      <button
                        onClick={() => setShowSearch(true)}
                        className="w-full h-full flex flex-col items-center justify-center text-slate-400 hover:text-amber-600 transition-colors"
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

            {/* Suggested Competitors */}
            {selectedVehicles.length >= 1 && selectedVehicles.length < 3 && suggestedVehicles.length > 0 && !showSearch && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <span className="text-sm font-semibold text-slate-900">Suggested Competitors</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedVehicles.map((vehicleName) => {
                    const vehicleData = vehicleDatabase.find(v => v.name === vehicleName);
                    return (
                      <button
                        key={vehicleName}
                        onClick={() => addVehicle(vehicleName)}
                        className="px-4 py-2 bg-white border border-amber-300 rounded-lg text-sm text-slate-700 hover:bg-amber-100 hover:border-amber-400 transition-all flex items-center gap-2"
                      >
                        <span>{vehicleName}</span>
                        {vehicleData && (
                          <span className="text-amber-600 font-medium">{formatPrice(vehicleData.price)}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

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
                
                {/* Search Results */}
                {filteredVehicles.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                    {filteredVehicles.map((vehicle) => (
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
                          <div className="text-slate-500 text-sm">{getBodyTypeDisplay(vehicle.bodyType)} • {formatPrice(vehicle.price)}</div>
                        </div>
                        {selectedVehicles.includes(vehicle.name) ? (
                          <span className="text-slate-400 text-sm">Already added</span>
                        ) : (
                          <span className="text-amber-600 font-medium text-sm">+ Add</span>
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
