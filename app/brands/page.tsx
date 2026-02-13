"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, X, SlidersHorizontal, Car, Search, RotateCcw } from 'lucide-react';
import { vehicleDatabase, Vehicle } from '../lib/vehicleDatabase';
import CarImage from '../components/CarImage';
import PageWrapper from '../components/shared/PageWrapper';

// Get all unique values for filters
function getFilterOptions() {
  const brands = new Set<string>();
  const bodyTypes = new Set<string>();
  const powertrains = new Set<string>();
  const segments = new Set<string>();
  const seatingOptions = new Set<number>();
  
  vehicleDatabase.forEach(v => {
    brands.add(v.brand);
    bodyTypes.add(v.bodyType);
    powertrains.add(v.powertrain);
    segments.add(v.segment);
    seatingOptions.add(v.seats);
  });
  
  return {
    brands: Array.from(brands).sort(),
    bodyTypes: Array.from(bodyTypes).sort(),
    powertrains: Array.from(powertrains),
    segments: Array.from(segments),
    seatingOptions: Array.from(seatingOptions).sort((a, b) => a - b),
  };
}

const filterOptions = getFilterOptions();

// Display names
const bodyTypeLabels: Record<string, string> = {
  'sedan': 'Sedan',
  'suv': 'SUV',
  'crossover': 'Crossover',
  'truck': 'Truck',
  'hatchback': 'Hatchback',
  'coupe': 'Coupe',
  'wagon': 'Wagon',
  'minivan': 'Minivan',
  'van': 'Van',
  'convertible': 'Convertible',
  'sports': 'Sports Car',
};

const powertrainLabels: Record<string, string> = {
  'gas': 'Gasoline',
  'hybrid': 'Hybrid',
  'phev': 'Plug-in Hybrid',
  'ev': 'Electric',
};

const segmentLabels: Record<string, string> = {
  'economy': 'Economy',
  'mainstream': 'Mainstream',
  'premium': 'Premium',
  'luxury': 'Luxury',
  'exotic': 'Exotic',
};

// Price ranges
const priceRanges = [
  { label: 'Under $25K', min: 0, max: 25 },
  { label: '$25K - $35K', min: 25, max: 35 },
  { label: '$35K - $50K', min: 35, max: 50 },
  { label: '$50K - $75K', min: 50, max: 75 },
  { label: '$75K - $100K', min: 75, max: 100 },
  { label: '$100K - $150K', min: 100, max: 150 },
  { label: '$150K+', min: 150, max: Infinity },
];

// Best Sellers Rankings based on 2025 US Sales Data
// Sources: Car and Driver, Best-Selling-Cars.com, KBB, Motor1
const bestSellersRank: Record<string, number> = {
  // Top 10 - Massive volume sellers
  'Ford F-150': 1,
  'Chevrolet Silverado 1500': 2,
  'Toyota RAV4': 3,
  'Honda CR-V': 4,
  'Ram 1500': 5,
  'GMC Sierra 1500': 6,
  'Chevrolet Equinox': 7,
  'Toyota Camry': 8,
  'Tesla Model Y': 9,
  'Toyota Tacoma': 10,
  
  // 11-25 - Strong sellers
  'Honda Civic': 11,
  'Toyota Corolla': 12,
  'Chevrolet Trax': 13,
  'Jeep Grand Cherokee': 14,
  'Nissan Rogue': 15,
  'Ford Explorer': 16,
  'Hyundai Tucson': 17,
  'Tesla Model 3': 18,
  'Subaru Crosstrek': 19,
  'Kia Sportage': 20,
  'Subaru Forester': 21,
  'Jeep Wrangler': 22,
  'Ford Bronco': 23,
  'Subaru Outback': 24,
  'Ford Escape': 25,
  
  // 26-50 - Popular models
  'Toyota Highlander': 26,
  'Honda Accord': 27,
  'Mazda CX-5': 28,
  'Ford Maverick': 29,
  'Toyota 4Runner': 30,
  'Kia Telluride': 31,
  'Hyundai Santa Fe': 32,
  'Honda Pilot': 33,
  'Chevrolet Traverse': 34,
  'GMC Terrain': 35,
  'Hyundai Elantra': 36,
  'Kia Forte': 37,
  'Toyota Tundra': 38,
  'Mazda CX-50': 39,
  'Honda HR-V': 40,
  'Nissan Altima': 41,
  'Toyota Grand Highlander': 42,
  'Jeep Grand Cherokee L': 43,
  'Chevrolet Colorado': 44,
  'Ford Ranger': 45,
  'Volkswagen Tiguan': 46,
  'Hyundai Palisade': 47,
  'Mazda CX-90': 48,
  'Kia Sorento': 49,
  'Honda Odyssey': 50,
  
  // 51-75 - Solid performers
  'Toyota Sienna': 51,
  'Nissan Sentra': 52,
  'Chevrolet Tahoe': 53,
  'Ford Mustang': 54,
  'Toyota Crown': 55,
  'Subaru Ascent': 56,
  'Kia Carnival': 57,
  'GMC Yukon': 58,
  'Volkswagen Jetta': 59,
  'Hyundai Kona': 60,
  'Lexus RX': 61,
  'Lexus NX': 62,
  'Acura MDX': 63,
  'BMW X3': 64,
  'Mercedes-Benz GLC': 65,
  'Audi Q5': 66,
  'BMW X5': 67,
  'Lexus TX': 68,
  'Cadillac XT4': 69,
  'Chevrolet Suburban': 70,
  'Lincoln Nautilus': 71,
  'Volvo XC60': 72,
  'Volvo XC90': 73,
  'Infiniti QX60': 74,
  'Nissan Pathfinder': 75,
  
  // 76-100 - Niche/specialty models
  'Toyota GR86': 76,
  'Mazda MX-5 Miata': 77,
  'Ford Bronco Sport': 78,
  'Jeep Compass': 79,
  'Kia EV6': 80,
  'Hyundai Ioniq 5': 81,
  'Hyundai Ioniq 6': 82,
  'Chevrolet Camaro': 83,
  'Dodge Challenger': 84,
  'Dodge Charger': 85,
  'Toyota Prius': 86,
  'Honda Passport': 87,
  'Acura RDX': 88,
  'Acura Integra': 89,
  'Lexus ES': 90,
  'Lexus IS': 91,
  'BMW 3 Series': 92,
  'Mercedes-Benz C-Class': 93,
  'Audi A4': 94,
  'Genesis GV70': 95,
  'Genesis GV80': 96,
  'Rivian R1S': 97,
  'Rivian R1T': 98,
  'Ford Mustang Mach-E': 99,
  'Chevrolet Bolt EV': 100,
  
  // 101-150 - Lower volume but notable
  'Porsche Cayenne': 101,
  'Porsche Macan': 102,
  'BMW X1': 103,
  'Mercedes-Benz GLE': 104,
  'Audi Q7': 105,
  'Lexus GX': 106,
  'Land Rover Defender': 107,
  'Land Rover Range Rover Sport': 108,
  'Land Rover Range Rover': 109,
  'Jeep Gladiator': 110,
  'Toyota Sequoia': 111,
  'Nissan Frontier': 112,
  'Nissan Titan': 113,
  'GMC Canyon': 114,
  'Cadillac Escalade': 115,
  'Lincoln Navigator': 116,
  'BMW 5 Series': 117,
  'Mercedes-Benz E-Class': 118,
  'Audi A6': 119,
  'Genesis G70': 120,
  'Genesis G80': 121,
  'Alfa Romeo Giulia': 122,
  'Alfa Romeo Stelvio': 123,
  'Maserati Ghibli': 124,
  'Maserati Levante': 125,
  'Jaguar F-Pace': 126,
  'Jaguar E-Pace': 127,
  'Volvo S60': 128,
  'Volvo V60': 129,
  'Mini Cooper': 130,
  'Mini Countryman': 131,
  'Fiat 500e': 132,
  'Volkswagen ID.4': 133,
  'Volkswagen Atlas': 134,
  'Volkswagen Taos': 135,
  'Mitsubishi Outlander': 136,
  'Mitsubishi Eclipse Cross': 137,
  'Nissan Murano': 138,
  'Nissan Kicks': 139,
  'Kia Seltos': 140,
  'Kia Niro': 141,
  'Hyundai Venue': 142,
  'Hyundai Sonata': 143,
  'Toyota Supra': 144,
  'Nissan Z': 145,
  'Chevrolet Corvette': 146,
  'Ford GT': 147,
  'Dodge Durango': 148,
  'Chrysler Pacifica': 149,
  'Buick Encore GX': 150,
  
  // Luxury/Exotic (lower volume by nature)
  'Porsche 911': 160,
  'Porsche Taycan': 161,
  'Porsche Panamera': 162,
  'BMW 7 Series': 163,
  'Mercedes-Benz S-Class': 164,
  'Audi A8': 165,
  'Lexus LC': 166,
  'Lexus LS': 167,
  'BMW i4': 168,
  'BMW iX': 169,
  'Mercedes-Benz EQS': 170,
  'Mercedes-Benz EQE': 171,
  'Audi e-tron GT': 172,
  'Lucid Air': 173,
  'Polestar 2': 174,
  'Lotus Eletre': 175,
  'Genesis Electrified GV70': 176,
  'Cadillac Lyriq': 177,
  'BMW M3': 178,
  'BMW M4': 179,
  'Mercedes-AMG GT': 180,
  'Audi RS6': 181,
  'Audi RS7': 182,
  
  // Supercars/Hypercars (very low volume)
  'Ferrari Roma': 200,
  'Ferrari 296 GTB': 201,
  'Ferrari SF90': 202,
  'Ferrari Purosangue': 203,
  'Lamborghini Huracan': 210,
  'Lamborghini Urus': 211,
  'Lamborghini Revuelto': 212,
  'McLaren 720S': 220,
  'McLaren Artura': 221,
  'McLaren 750S': 222,
  'Aston Martin DB12': 230,
  'Aston Martin Vantage': 231,
  'Aston Martin DBX': 232,
  'Bentley Continental GT': 240,
  'Bentley Bentayga': 241,
  'Bentley Flying Spur': 242,
  'Rolls-Royce Ghost': 250,
  'Rolls-Royce Cullinan': 251,
  'Rolls-Royce Spectre': 252,
  'Bugatti Chiron': 260,
  'Pagani Huayra': 270,
  'Koenigsegg Jesko': 280,
};

// Get popularity rank - lower is better, unknown models get high rank
function getPopularityRank(vehicleName: string): number {
  return bestSellersRank[vehicleName] || 500;
}

// Sort options
const sortOptions = [
  { value: 'popularity', label: 'Best Sellers' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'brand-asc', label: 'Brand: A to Z' },
  { value: 'seats-desc', label: 'Most Seats' },
];

function formatPrice(price: number): string {
  return `$${(price * 1000).toLocaleString()}`;
}

// Brand gradients for cards
const brandGradients: Record<string, string> = {
  'Ferrari': 'from-red-600 to-red-900',
  'Lamborghini': 'from-yellow-500 to-amber-700',
  'McLaren': 'from-orange-500 to-orange-700',
  'Porsche': 'from-slate-700 to-slate-900',
  'BMW': 'from-blue-600 to-blue-800',
  'Mercedes-Benz': 'from-slate-700 to-slate-900',
  'Audi': 'from-slate-800 to-slate-950',
  'Tesla': 'from-red-600 to-slate-800',
  'Toyota': 'from-red-600 to-red-800',
  'Honda': 'from-red-500 to-red-700',
  'Ford': 'from-blue-700 to-blue-900',
  'Chevrolet': 'from-yellow-500 to-yellow-700',
  'default': 'from-slate-600 to-slate-800',
};

function getBrandGradient(brand: string): string {
  return brandGradients[brand] || brandGradients.default;
}

export default function FindMyCarPage() {
  // Filter states
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [selectedPowertrains, setSelectedPowertrains] = useState<string[]>([]);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [hasAWD, setHasAWD] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  
  // Collapsible filter sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    brand: false,
    bodyType: true,
    price: true,
    powertrain: true,
    segment: false,
    seats: false,
    features: false,
  });
  
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleArrayFilter = <T,>(array: T[], value: T, setter: (arr: T[]) => void) => {
    if (array.includes(value)) {
      setter(array.filter(v => v !== value));
    } else {
      setter([...array, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedBodyTypes([]);
    setSelectedPowertrains([]);
    setSelectedSegments([]);
    setSelectedSeats([]);
    setSelectedPriceRange(null);
    setHasAWD(null);
    setSearchQuery('');
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedBrands.length) count += selectedBrands.length;
    if (selectedBodyTypes.length) count += selectedBodyTypes.length;
    if (selectedPowertrains.length) count += selectedPowertrains.length;
    if (selectedSegments.length) count += selectedSegments.length;
    if (selectedSeats.length) count += selectedSeats.length;
    if (selectedPriceRange) count += 1;
    if (hasAWD !== null) count += 1;
    if (searchQuery) count += 1;
    return count;
  }, [selectedBrands, selectedBodyTypes, selectedPowertrains, selectedSegments, selectedSeats, selectedPriceRange, hasAWD, searchQuery]);

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    let results = vehicleDatabase.filter(vehicle => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!vehicle.name.toLowerCase().includes(query) && 
            !vehicle.brand.toLowerCase().includes(query)) {
          return false;
        }
      }
      
      // Brand filter
      if (selectedBrands.length && !selectedBrands.includes(vehicle.brand)) {
        return false;
      }
      
      // Body type filter
      if (selectedBodyTypes.length && !selectedBodyTypes.includes(vehicle.bodyType)) {
        return false;
      }
      
      // Powertrain filter
      if (selectedPowertrains.length && !selectedPowertrains.includes(vehicle.powertrain)) {
        return false;
      }
      
      // Segment filter
      if (selectedSegments.length && !selectedSegments.includes(vehicle.segment)) {
        return false;
      }
      
      // Seats filter
      if (selectedSeats.length && !selectedSeats.includes(vehicle.seats)) {
        return false;
      }
      
      // Price range filter
      if (selectedPriceRange) {
        if (vehicle.price < selectedPriceRange.min || vehicle.price > selectedPriceRange.max) {
          return false;
        }
      }
      
      // AWD filter
      if (hasAWD === true && !vehicle.features.includes('awd')) {
        return false;
      }
      if (hasAWD === false && vehicle.features.includes('awd')) {
        return false;
      }
      
      return true;
    });
    
    // Sort results
    results.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return getPopularityRank(a.name) - getPopularityRank(b.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'brand-asc':
          return a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name);
        case 'seats-desc':
          return b.seats - a.seats;
        default:
          return 0;
      }
    });
    
    return results;
  }, [selectedBrands, selectedBodyTypes, selectedPowertrains, selectedSegments, selectedSeats, selectedPriceRange, hasAWD, searchQuery, sortBy]);

  // Filter section component
  const FilterSection = ({ title, section, children }: { title: string; section: string; children: React.ReactNode }) => (
    <div className="border-b border-slate-200 pb-4 mb-4">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full text-left font-semibold text-slate-900 mb-3"
      >
        {title}
        {expandedSections[section] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {expandedSections[section] && children}
    </div>
  );

  const FiltersPanel = () => (
    <div className="space-y-2">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search vehicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 text-slate-900"
          />
        </div>
      </div>

      {/* Clear filters button */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-500 text-sm font-medium mb-4"
        >
          <RotateCcw className="w-4 h-4" />
          Clear all filters ({activeFilterCount})
        </button>
      )}

      {/* Body Type */}
      <FilterSection title="Body Style" section="bodyType">
        <div className="grid grid-cols-2 gap-2">
          {filterOptions.bodyTypes.map(type => (
            <button
              key={type}
              onClick={() => toggleArrayFilter(selectedBodyTypes, type, setSelectedBodyTypes)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedBodyTypes.includes(type)
                  ? 'bg-amber-100 text-amber-700 border border-amber-300'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {bodyTypeLabels[type] || type}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" section="price">
        <div className="space-y-2">
          {priceRanges.map((range, i) => (
            <button
              key={i}
              onClick={() => setSelectedPriceRange(
                selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max 
                  ? null 
                  : range
              )}
              className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-all ${
                selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max
                  ? 'bg-amber-100 text-amber-700 border border-amber-300'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Powertrain */}
      <FilterSection title="Powertrain" section="powertrain">
        <div className="space-y-2">
          {filterOptions.powertrains.map(powertrain => (
            <button
              key={powertrain}
              onClick={() => toggleArrayFilter(selectedPowertrains, powertrain, setSelectedPowertrains)}
              className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-all ${
                selectedPowertrains.includes(powertrain)
                  ? 'bg-amber-100 text-amber-700 border border-amber-300'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {powertrainLabels[powertrain] || powertrain}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Brand" section="brand">
        <div className="max-h-64 overflow-y-auto space-y-1">
          {filterOptions.brands.map(brand => (
            <button
              key={brand}
              onClick={() => toggleArrayFilter(selectedBrands, brand, setSelectedBrands)}
              className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-all ${
                selectedBrands.includes(brand)
                  ? 'bg-amber-100 text-amber-700 border border-amber-300'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Segment */}
      <FilterSection title="Segment" section="segment">
        <div className="space-y-2">
          {filterOptions.segments.map(segment => (
            <button
              key={segment}
              onClick={() => toggleArrayFilter(selectedSegments, segment, setSelectedSegments)}
              className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-all ${
                selectedSegments.includes(segment)
                  ? 'bg-amber-100 text-amber-700 border border-amber-300'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {segmentLabels[segment] || segment}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Seating */}
      <FilterSection title="Seating Capacity" section="seats">
        <div className="flex flex-wrap gap-2">
          {filterOptions.seatingOptions.map(seats => (
            <button
              key={seats}
              onClick={() => toggleArrayFilter(selectedSeats, seats, setSelectedSeats)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedSeats.includes(seats)
                  ? 'bg-amber-100 text-amber-700 border border-amber-300'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {seats} seats
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Features */}
      <FilterSection title="Features" section="features">
        <div className="space-y-2">
          <button
            onClick={() => setHasAWD(hasAWD === true ? null : true)}
            className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-all ${
              hasAWD === true
                ? 'bg-amber-100 text-amber-700 border border-amber-300'
                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            AWD / 4WD Available
          </button>
          <button
            onClick={() => setHasAWD(hasAWD === false ? null : false)}
            className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-all ${
              hasAWD === false
                ? 'bg-amber-100 text-amber-700 border border-amber-300'
                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            FWD / RWD Only
          </button>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="mb-4">
            <ol className="flex items-center space-x-2 text-sm text-slate-500">
              <li><Link href="/" className="hover:text-amber-600 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-slate-900">Find My Car</li>
            </ol>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Find My Car</h1>
              <p className="text-slate-600">
                Browse {vehicleDatabase.length} vehicles from {filterOptions.brands.length} brands
              </p>
            </div>
            
            <Link
              href="/quiz"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all"
            >
              🎯 Try CarMatch™ Quiz
            </Link>
          </div>
        </div>

        <div className="flex gap-8" style={{ height: 'calc(100vh - 220px)' }}>
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="h-full bg-white border border-slate-200 rounded-xl p-6 overflow-y-auto">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="w-5 h-5 text-slate-700" />
                <h2 className="font-bold text-slate-900">Filters</h2>
              </div>
              <FiltersPanel />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Mobile Filter Button & Sort */}
            <div className="flex items-center justify-between gap-4 mb-6 sticky top-0 bg-white py-2 z-10">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
              
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-slate-500 hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-amber-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters Tags */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedBodyTypes.map(type => (
                  <span key={type} className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                    {bodyTypeLabels[type] || type}
                    <button onClick={() => toggleArrayFilter(selectedBodyTypes, type, setSelectedBodyTypes)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedPowertrains.map(p => (
                  <span key={p} className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                    {powertrainLabels[p] || p}
                    <button onClick={() => toggleArrayFilter(selectedPowertrains, p, setSelectedPowertrains)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedPriceRange && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                    {priceRanges.find(r => r.min === selectedPriceRange.min)?.label}
                    <button onClick={() => setSelectedPriceRange(null)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedBrands.map(brand => (
                  <span key={brand} className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                    {brand}
                    <button onClick={() => toggleArrayFilter(selectedBrands, brand, setSelectedBrands)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {hasAWD !== null && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                    {hasAWD ? 'AWD/4WD' : 'FWD/RWD Only'}
                    <button onClick={() => setHasAWD(null)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Results Count */}
            <p className="text-sm text-slate-500 mb-4">
              Showing {filteredVehicles.length} of {vehicleDatabase.length} vehicles
            </p>

            {/* Vehicle Grid */}
            {filteredVehicles.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
                {filteredVehicles.map(vehicle => (
                  <Link
                    key={vehicle.name}
                    href={`/cars/${vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                    className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className={`aspect-video bg-gradient-to-br ${getBrandGradient(vehicle.brand)} relative overflow-hidden`}>
                      <CarImage 
                        vehicleName={vehicle.name}
                        brandColor={getBrandGradient(vehicle.brand)}
                        isExotic={vehicle.segment === 'exotic'}
                        bodyType={vehicle.bodyType}
                      />
                      {vehicle.segment === 'exotic' && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold z-10">
                          EXOTIC
                        </div>
                      )}
                      {vehicle.powertrain === 'ev' && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold z-10">
                          ELECTRIC
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-slate-500 mb-1">{vehicle.brand}</div>
                      <h3 className="text-slate-900 font-semibold group-hover:text-amber-600 transition-colors mb-1">
                        {vehicle.name}
                      </h3>
                      <p className="text-amber-600 font-medium mb-3">{formatPrice(vehicle.price)}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                          {bodyTypeLabels[vehicle.bodyType] || vehicle.bodyType}
                        </span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                          {vehicle.seats} seats
                        </span>
                        {vehicle.powertrain !== 'gas' && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            {powertrainLabels[vehicle.powertrain] || vehicle.powertrain}
                          </span>
                        )}
                        {vehicle.features.includes('awd') && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            AWD
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200">
                <Car className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No vehicles found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your filters to see more results.</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-400 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between">
                <h2 className="font-bold text-slate-900">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <FiltersPanel />
              </div>
              <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-400 transition-colors"
                >
                  Show {filteredVehicles.length} Results
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
