"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ChevronDown, X, Search, Plus } from 'lucide-react';
import { vehicleDatabase, Vehicle } from '../../lib/vehicleDatabase';
import { getVehicleTrims, Trim } from '../../lib/vehicleTrims';
import CarImage from '../../components/CarImage';
import PageWrapper from '../../components/shared/PageWrapper';

// Helper functions
function getVehicleSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicleDatabase.find((v) => getVehicleSlug(v.name) === slug);
}

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

function getPowertrainDisplay(powertrain: string): string {
  const displays: Record<string, string> = {
    'gas': 'Gasoline', 'hybrid': 'Hybrid', 'phev': 'Plug-in Hybrid', 'ev': 'Electric',
  };
  return displays[powertrain] || powertrain;
}

function getReliabilityDisplay(rating: number): string {
  const displays: Record<number, string> = {
    1: 'Poor', 2: 'Below Average', 3: 'Average', 4: 'Above Average', 5: 'Excellent',
  };
  return displays[rating] || 'Unknown';
}

function getReliabilityStars(rating: number): string {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Brand gradients
const brandGradients: Record<string, string> = {
  'Toyota': 'from-red-600 to-red-800',
  'Honda': 'from-red-500 to-red-700',
  'Ford': 'from-blue-600 to-blue-800',
  'Chevrolet': 'from-yellow-500 to-yellow-700',
  'BMW': 'from-blue-600 to-blue-800',
  'Mercedes-Benz': 'from-slate-600 to-slate-800',
  'Audi': 'from-slate-700 to-slate-900',
  'Tesla': 'from-red-600 to-slate-800',
  'Lexus': 'from-slate-700 to-slate-900',
  'Hyundai': 'from-blue-600 to-blue-800',
  'Kia': 'from-red-600 to-red-800',
  'Mazda': 'from-red-600 to-red-800',
  'Subaru': 'from-blue-600 to-blue-800',
  'Jeep': 'from-green-700 to-green-900',
  'Land Rover': 'from-green-700 to-green-900',
  'Mini': 'from-slate-700 to-slate-900',
  'Mitsubishi': 'from-red-600 to-red-800',
  'Buick': 'from-slate-600 to-slate-800',
  'Polestar': 'from-amber-500 to-amber-700',
  'GMC': 'from-red-700 to-red-900',
};

function getBrandGradient(brand: string): string {
  return brandGradients[brand] || 'from-slate-700 to-slate-900';
}

function allSame(values: number[]): boolean {
  return values.every(v => v === values[0]);
}

// Trim selector component
function TrimSelector({ 
  vehicleName, 
  selectedTrim, 
  onTrimChange 
}: { 
  vehicleName: string; 
  selectedTrim: Trim | null;
  onTrimChange: (trim: Trim | null) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const trimData = getVehicleTrims(vehicleName);
  
  if (!trimData || trimData.trims.length <= 1) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-sm transition-colors"
      >
        <span className="text-slate-700 truncate">
          {selectedTrim ? selectedTrim.name : 'Select Trim'}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {trimData.trims.map((trim) => (
            <button
              key={trim.name}
              onClick={() => {
                onTrimChange(trim);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-amber-50 transition-colors flex justify-between items-center ${
                selectedTrim?.name === trim.name ? 'bg-amber-100 text-amber-800' : 'text-slate-700'
              }`}
            >
              <span className="truncate">{trim.name}</span>
              <span className="text-amber-600 font-medium ml-2">{formatPrice(trim.price)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Vehicle Search Modal
function VehicleSearchModal({
  isOpen,
  onClose,
  onSelect,
  excludeVehicles
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (vehicleName: string) => void;
  excludeVehicles: string[];
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVehicles = useMemo(() => {
    if (!searchQuery.trim()) return vehicleDatabase.filter(v => !excludeVehicles.includes(v.name)).slice(0, 10);
    const query = searchQuery.toLowerCase();
    return vehicleDatabase
      .filter(v => 
        !excludeVehicles.includes(v.name) &&
        (v.name.toLowerCase().includes(query) || v.brand.toLowerCase().includes(query))
      )
      .slice(0, 10);
  }, [searchQuery, excludeVehicles]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Add Vehicle to Compare</h3>
            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
        </div>
        <div className="overflow-y-auto max-h-[50vh]">
          {filteredVehicles.map((vehicle) => (
            <button
              key={vehicle.name}
              onClick={() => {
                onSelect(vehicle.name);
                onClose();
              }}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-amber-50 transition-colors border-b border-slate-100 last:border-0"
            >
              <div className="text-left">
                <div className="text-slate-900 font-medium">{vehicle.name}</div>
                <div className="text-slate-500 text-sm">{getBodyTypeDisplay(vehicle.bodyType)}</div>
              </div>
              <div className="text-right">
                <div className="text-amber-600 font-semibold">{formatPrice(vehicle.price)}</div>
                <span className="text-amber-600 text-xs font-medium">+ Add</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Vehicle Card with hover remove button
function VehicleCard({
  vehicle,
  effectivePrice,
  selectedTrim,
  onTrimChange,
  onRemove,
  canRemove
}: {
  vehicle: Vehicle;
  effectivePrice: number;
  selectedTrim: Trim | null;
  onTrimChange: (trim: Trim | null) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const trimData = getVehicleTrims(vehicle.name);
  const hasTrimOptions = trimData && trimData.trims.length > 1;

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`aspect-video bg-gradient-to-br ${getBrandGradient(vehicle.brand)} relative`}>
        <CarImage 
          vehicleName={vehicle.name}
          brandColor={getBrandGradient(vehicle.brand)}
          isExotic={vehicle.segment === 'exotic'}
          bodyType={vehicle.bodyType}
        />
        {/* Hover X button */}
        {canRemove && (
          <button
            onClick={onRemove}
            className={`absolute top-3 right-3 p-2 bg-black/60 hover:bg-red-600 rounded-full transition-all duration-200 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            title="Remove from comparison"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        )}
      </div>
      <div className="p-6 bg-white">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{vehicle.name}</h2>
        
        {/* Trim Selector */}
        {hasTrimOptions && (
          <div className="mb-3">
            <TrimSelector
              vehicleName={vehicle.name}
              selectedTrim={selectedTrim}
              onTrimChange={onTrimChange}
            />
          </div>
        )}
        
        {/* Price display */}
        <div className="mb-4">
          <p className="text-2xl md:text-3xl font-bold text-amber-600">
            {formatPrice(effectivePrice)}
          </p>
          {selectedTrim && selectedTrim.features && (
            <p className="text-xs text-slate-500 mt-1">
              {selectedTrim.features.join(' • ')}
            </p>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">{getBodyTypeDisplay(vehicle.bodyType)}</span>
          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">{vehicle.seats} seats</span>
          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">{getPowertrainDisplay(vehicle.powertrain)}</span>
        </div>
        <Link href={`/cars/${getVehicleSlug(vehicle.name)}`} className="text-amber-600 hover:text-amber-500 font-medium">
          View Full Details →
        </Link>
      </div>
    </div>
  );
}

// Add Vehicle Card placeholder
function AddVehicleCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 hover:border-amber-400 hover:bg-amber-50/50 transition-all min-h-[400px] flex flex-col items-center justify-center gap-3"
    >
      <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
        <Plus className="w-8 h-8 text-amber-600" />
      </div>
      <span className="text-slate-600 font-medium">Add Vehicle</span>
      <span className="text-slate-400 text-sm">Compare up to 3 vehicles</span>
    </button>
  );
}

export default function CompareVehiclesPage() {
  const params = useParams();
  const router = useRouter();
  const vehiclesParam = params.vehicles as string;
  
  const [selectedTrims, setSelectedTrims] = useState<Record<string, Trim | null>>({});
  const [showSearchModal, setShowSearchModal] = useState(false);
  
  // Parse vehicle slugs and find vehicles
  const slugs = vehiclesParam ? vehiclesParam.split('-vs-') : [];
  const vehicles = slugs.map(getVehicleBySlug).filter(Boolean) as Vehicle[];
  
  // Initialize trims on mount
  useEffect(() => {
    const initialTrims: Record<string, Trim | null> = {};
    vehicles.forEach(v => {
      const trimData = getVehicleTrims(v.name);
      if (trimData && trimData.trims.length > 0) {
        initialTrims[v.name] = trimData.trims[0];
      } else {
        initialTrims[v.name] = null;
      }
    });
    setSelectedTrims(initialTrims);
  }, [vehiclesParam]);
  
  // Get effective prices based on selected trims
  const effectivePrices = useMemo(() => {
    return vehicles.map(v => {
      const trim = selectedTrims[v.name];
      return trim ? trim.price : v.price;
    });
  }, [vehicles, selectedTrims]);

  // Remove vehicle and navigate to new URL
  const removeVehicle = (vehicleName: string) => {
    const remaining = vehicles.filter(v => v.name !== vehicleName);
    if (remaining.length >= 2) {
      const newUrl = `/compare/${remaining.map(v => getVehicleSlug(v.name)).join('-vs-')}`;
      router.push(newUrl);
    } else if (remaining.length === 1) {
      // Only one vehicle left, show search modal to add another
      setShowSearchModal(true);
    } else {
      // No vehicles left, go back to compare page
      router.push('/compare');
    }
  };

  // Add vehicle and navigate to new URL
  const addVehicle = (vehicleName: string) => {
    const newVehicles = [...vehicles.map(v => v.name), vehicleName];
    const newUrl = `/compare/${newVehicles.map(getVehicleSlug).join('-vs-')}`;
    router.push(newUrl);
  };
  
  if (vehicles.length < 2) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Vehicles Not Found</h1>
            <p className="text-slate-600 mb-6">Please select at least 2 vehicles to compare.</p>
            <Link href="/compare" className="text-amber-600 hover:text-amber-500 font-medium">
              ← Back to Compare
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const year = new Date().getFullYear();
  const numVehicles = vehicles.length;
  const canAddMore = numVehicles < 3;
  
  // Calculate best values
  const lowestPrice = Math.min(...effectivePrices);
  const highestSeats = Math.max(...vehicles.map(v => v.seats));
  const highestHP = Math.max(...vehicles.map(v => v.hp));
  const highestMPGCity = Math.max(...vehicles.map(v => v.mpgCity));
  const highestMPGHwy = Math.max(...vehicles.map(v => v.mpgHighway));
  const highestReliability = Math.max(...vehicles.map(v => v.reliability));

  // Dynamic grid classes
  const gridCols = numVehicles === 2 ? 'grid-cols-3' : 'grid-cols-4';
  const cardGridCols = numVehicles === 2 
    ? (canAddMore ? 'md:grid-cols-3' : 'md:grid-cols-2')
    : 'md:grid-cols-3';

  return (
    <PageWrapper>
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative bg-gradient-to-br from-slate-100 via-slate-50 to-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-slate-500">
                <li><Link href="/" className="hover:text-amber-600 transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link href="/compare" className="hover:text-amber-600 transition-colors">Compare</Link></li>
                <li>/</li>
                <li className="text-slate-700 truncate max-w-xs">{vehicles.map(v => v.name).join(' vs ')}</li>
              </ol>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {vehicles.map((v, i) => (
                <span key={v.name}>
                  {v.name}
                  {i < vehicles.length - 1 && <span className="text-amber-600"> vs </span>}
                </span>
              ))}
            </h1>
            <p className="text-lg text-slate-600">Side-by-side comparison of {year} models • Hover over vehicles to remove • Select trims for accurate pricing</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Vehicle Cards */}
          <div className={`grid gap-6 mb-12 ${cardGridCols}`}>
            {vehicles.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.name}
                vehicle={vehicle}
                effectivePrice={effectivePrices[index]}
                selectedTrim={selectedTrims[vehicle.name] || null}
                onTrimChange={(trim) => setSelectedTrims(prev => ({ ...prev, [vehicle.name]: trim }))}
                onRemove={() => removeVehicle(vehicle.name)}
                canRemove={vehicles.length > 1}
              />
            ))}
            {canAddMore && (
              <AddVehicleCard onClick={() => setShowSearchModal(true)} />
            )}
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-200 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900">Specifications Comparison</h3>
              <p className="text-sm text-slate-500 mt-1">Prices update based on selected trims</p>
            </div>
            
            <div className="divide-y divide-slate-200 overflow-x-auto">
              {/* Price Row */}
              <div className={`grid ${gridCols} p-4 bg-amber-50/50 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Starting MSRP</div>
                {vehicles.map((v, i) => {
                  const price = effectivePrices[i];
                  const isLowest = price === lowestPrice && !allSame(effectivePrices);
                  return (
                    <div key={v.name} className={`text-center font-bold ${isLowest ? 'text-green-600' : 'text-slate-900'}`}>
                      {formatPrice(price)}
                      {isLowest && <span className="ml-2 text-xs">✓ Lower</span>}
                    </div>
                  );
                })}
              </div>

              {/* Selected Trim Row */}
              <div className={`grid ${gridCols} p-4 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Selected Trim</div>
                {vehicles.map((v) => (
                  <div key={v.name} className="text-center text-slate-900">
                    {selectedTrims[v.name]?.name || 'Base'}
                  </div>
                ))}
              </div>

              {/* Horsepower Row */}
              <div className={`grid ${gridCols} p-4 bg-slate-50/50 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Horsepower</div>
                {vehicles.map((v) => (
                  <div key={v.name} className={`text-center font-medium ${v.hp === highestHP && !allSame(vehicles.map(x => x.hp)) ? 'text-green-600' : 'text-slate-900'}`}>
                    {v.hp.toLocaleString()} hp
                    {v.hp === highestHP && !allSame(vehicles.map(x => x.hp)) && <span className="ml-2 text-xs">✓ More</span>}
                  </div>
                ))}
              </div>

              {/* MPG City Row */}
              <div className={`grid ${gridCols} p-4 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">MPG City</div>
                {vehicles.map((v) => (
                  <div key={v.name} className={`text-center font-medium ${v.mpgCity === highestMPGCity && !allSame(vehicles.map(x => x.mpgCity)) ? 'text-green-600' : 'text-slate-900'}`}>
                    {v.powertrain === 'ev' ? `${v.mpgCity} MPGe` : `${v.mpgCity} mpg`}
                    {v.mpgCity === highestMPGCity && !allSame(vehicles.map(x => x.mpgCity)) && <span className="ml-2 text-xs">✓ Better</span>}
                  </div>
                ))}
              </div>

              {/* MPG Highway Row */}
              <div className={`grid ${gridCols} p-4 bg-slate-50/50 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">MPG Highway</div>
                {vehicles.map((v) => (
                  <div key={v.name} className={`text-center font-medium ${v.mpgHighway === highestMPGHwy && !allSame(vehicles.map(x => x.mpgHighway)) ? 'text-green-600' : 'text-slate-900'}`}>
                    {v.powertrain === 'ev' ? `${v.mpgHighway} MPGe` : `${v.mpgHighway} mpg`}
                    {v.mpgHighway === highestMPGHwy && !allSame(vehicles.map(x => x.mpgHighway)) && <span className="ml-2 text-xs">✓ Better</span>}
                  </div>
                ))}
              </div>

              {/* Reliability Row */}
              <div className={`grid ${gridCols} p-4 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Reliability Rating</div>
                {vehicles.map((v) => (
                  <div key={v.name} className={`text-center ${v.reliability === highestReliability && !allSame(vehicles.map(x => x.reliability)) ? 'text-green-600' : 'text-slate-900'}`}>
                    <div className="text-amber-500 text-lg">{getReliabilityStars(v.reliability)}</div>
                    <div className="text-sm font-medium">{getReliabilityDisplay(v.reliability)}</div>
                    {v.reliability === highestReliability && !allSame(vehicles.map(x => x.reliability)) && <span className="text-xs text-green-600">✓ Better</span>}
                  </div>
                ))}
              </div>

              {/* Body Style */}
              <div className={`grid ${gridCols} p-4 bg-slate-50/50 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Body Style</div>
                {vehicles.map((v) => (
                  <div key={v.name} className="text-center text-slate-900">{getBodyTypeDisplay(v.bodyType)}</div>
                ))}
              </div>

              {/* Seating */}
              <div className={`grid ${gridCols} p-4 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Seating Capacity</div>
                {vehicles.map((v) => (
                  <div key={v.name} className={`text-center font-medium ${v.seats === highestSeats && !allSame(vehicles.map(x => x.seats)) ? 'text-green-600' : 'text-slate-900'}`}>
                    {v.seats} passengers
                    {v.seats === highestSeats && !allSame(vehicles.map(x => x.seats)) && <span className="ml-2 text-xs">✓ More</span>}
                  </div>
                ))}
              </div>

              {/* Powertrain */}
              <div className={`grid ${gridCols} p-4 bg-slate-50/50 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Powertrain</div>
                {vehicles.map((v) => (
                  <div key={v.name} className="text-center text-slate-900">{getPowertrainDisplay(v.powertrain)}</div>
                ))}
              </div>

              {/* Size */}
              <div className={`grid ${gridCols} p-4 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Size Class</div>
                {vehicles.map((v) => (
                  <div key={v.name} className="text-center text-slate-900 capitalize">{v.size}</div>
                ))}
              </div>

              {/* Segment */}
              <div className={`grid ${gridCols} p-4 bg-slate-50/50 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Market Segment</div>
                {vehicles.map((v) => (
                  <div key={v.name} className="text-center text-slate-900 capitalize">{v.segment}</div>
                ))}
              </div>

              {/* AWD */}
              <div className={`grid ${gridCols} p-4 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">AWD Available</div>
                {vehicles.map((v) => (
                  <div key={v.name} className={`text-center font-medium ${v.features.includes('awd') || v.features.includes('awd-available') ? 'text-green-600' : 'text-slate-400'}`}>
                    {v.features.includes('awd') || v.features.includes('awd-available') ? '✓ Yes' : '✗ No'}
                  </div>
                ))}
              </div>

              {/* Towing */}
              <div className={`grid ${gridCols} p-4 bg-slate-50/50 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Towing Capable</div>
                {vehicles.map((v) => (
                  <div key={v.name} className={`text-center font-medium ${v.features.includes('towing') || v.features.includes('heavy-towing') ? 'text-green-600' : 'text-slate-400'}`}>
                    {v.features.includes('towing') || v.features.includes('heavy-towing') ? '✓ Yes' : '✗ No'}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Not sure which one is right for you?</p>
            <Link href="/quiz" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg hover:shadow-xl">
              🎯 Take Our Quiz for Personalized Recommendations
            </Link>
          </div>
        </div>

        {/* Search Modal */}
        <VehicleSearchModal
          isOpen={showSearchModal}
          onClose={() => setShowSearchModal(false)}
          onSelect={addVehicle}
          excludeVehicles={vehicles.map(v => v.name)}
        />
      </div>
    </PageWrapper>
  );
}
