import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase, Vehicle } from '../../lib/vehicleDatabase';
import { notFound } from 'next/navigation';
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
};

function getBrandGradient(brand: string): string {
  return brandGradients[brand] || 'from-slate-700 to-slate-900';
}

// Check if all values are the same (no winner)
function allSame(values: number[]): boolean {
  return values.every(v => v === values[0]);
}

// Generate popular comparisons
export async function generateStaticParams() {
  const popularPairs = [
    ['Toyota Camry', 'Honda Accord'],
    ['Toyota RAV4', 'Honda CR-V'],
    ['Ford F-150', 'Chevrolet Silverado 1500'],
    ['Tesla Model Y', 'Ford Mustang Mach-E'],
    ['BMW 3 Series', 'Mercedes-Benz C-Class'],
    ['Toyota Tacoma', 'Ford Ranger'],
    ['Kia Telluride', 'Hyundai Palisade'],
    ['Mazda CX-5', 'Subaru Forester'],
    ['Honda Civic', 'Toyota Corolla'],
    ['Ford Bronco', 'Jeep Wrangler'],
    ['Tesla Model 3', 'BMW i4'],
    ['Lexus RX', 'BMW X5'],
  ];
  return popularPairs.map(pair => ({
    vehicles: pair.map(getVehicleSlug).join('-vs-'),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ vehicles: string }> }): Promise<Metadata> {
  const { vehicles: vehiclesParam } = await params;
  const slugs = vehiclesParam.split('-vs-');
  const vehicles = slugs.map(getVehicleBySlug).filter(Boolean) as Vehicle[];
  if (vehicles.length < 2) return { title: 'Compare Vehicles | Auto Wizard' };
  const names = vehicles.map(v => v.name).join(' vs ');
  return {
    title: `${names} Comparison | Auto Wizard`,
    description: `Compare the ${names}. Side-by-side specs, features, pricing, and which one is right for you.`,
  };
}

export default async function CompareVehiclesPage({ params }: { params: Promise<{ vehicles: string }> }) {
  const { vehicles: vehiclesParam } = await params;
  const slugs = vehiclesParam.split('-vs-');
  const vehicles = slugs.map(getVehicleBySlug).filter(Boolean) as Vehicle[];
  
  if (vehicles.length < 2) notFound();
  
  const year = new Date().getFullYear();
  const numVehicles = vehicles.length;
  
  // Calculate best values across ALL vehicles
  const lowestPrice = Math.min(...vehicles.map(v => v.price));
  const highestSeats = Math.max(...vehicles.map(v => v.seats));
  const highestHP = Math.max(...vehicles.map(v => v.hp));
  const highestMPGCity = Math.max(...vehicles.map(v => v.mpgCity));
  const highestMPGHwy = Math.max(...vehicles.map(v => v.mpgHighway));
  const highestReliability = Math.max(...vehicles.map(v => v.reliability));

  // Dynamic grid classes based on number of vehicles
  const gridCols = numVehicles === 2 ? 'grid-cols-3' : 'grid-cols-4';
  const cardGridCols = numVehicles === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

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
            <p className="text-lg text-slate-600">Side-by-side comparison of {year} models</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Vehicle Cards */}
          <div className={`grid ${cardGridCols} gap-6 mb-12`}>
            {vehicles.map((vehicle) => (
              <div key={vehicle.name} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className={`aspect-video bg-gradient-to-br ${getBrandGradient(vehicle.brand)} relative`}>
                  <CarImage 
                    vehicleName={vehicle.name}
                    brandColor={getBrandGradient(vehicle.brand)}
                    isExotic={vehicle.segment === 'exotic'}
                    bodyType={vehicle.bodyType}
                  />
                </div>
                <div className="p-6 bg-white">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{vehicle.name}</h2>
                  <p className="text-2xl md:text-3xl font-bold text-amber-600 mb-4">{formatPrice(vehicle.price)}</p>
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
            ))}
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-200 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900">Specifications Comparison</h3>
            </div>
            
            <div className="divide-y divide-slate-200 overflow-x-auto">
              {/* Price Row */}
              <div className={`grid ${gridCols} p-4 bg-amber-50/50 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Starting MSRP</div>
                {vehicles.map((v) => (
                  <div key={v.name} className={`text-center font-bold ${v.price === lowestPrice && !allSame(vehicles.map(x => x.price)) ? 'text-green-600' : 'text-slate-900'}`}>
                    {formatPrice(v.price)}
                    {v.price === lowestPrice && !allSame(vehicles.map(x => x.price)) && <span className="ml-2 text-xs">✓ Lower</span>}
                  </div>
                ))}
              </div>

              {/* Horsepower Row */}
              <div className={`grid ${gridCols} p-4 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Horsepower</div>
                {vehicles.map((v) => (
                  <div key={v.name} className={`text-center font-medium ${v.hp === highestHP && !allSame(vehicles.map(x => x.hp)) ? 'text-green-600' : 'text-slate-900'}`}>
                    {v.hp.toLocaleString()} hp
                    {v.hp === highestHP && !allSame(vehicles.map(x => x.hp)) && <span className="ml-2 text-xs">✓ More</span>}
                  </div>
                ))}
              </div>

              {/* MPG City Row */}
              <div className={`grid ${gridCols} p-4 bg-slate-50/50 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">MPG City</div>
                {vehicles.map((v) => (
                  <div key={v.name} className={`text-center font-medium ${v.mpgCity === highestMPGCity && !allSame(vehicles.map(x => x.mpgCity)) ? 'text-green-600' : 'text-slate-900'}`}>
                    {v.powertrain === 'ev' ? `${v.mpgCity} MPGe` : `${v.mpgCity} mpg`}
                    {v.mpgCity === highestMPGCity && !allSame(vehicles.map(x => x.mpgCity)) && <span className="ml-2 text-xs">✓ Better</span>}
                  </div>
                ))}
              </div>

              {/* MPG Highway Row */}
              <div className={`grid ${gridCols} p-4 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">MPG Highway</div>
                {vehicles.map((v) => (
                  <div key={v.name} className={`text-center font-medium ${v.mpgHighway === highestMPGHwy && !allSame(vehicles.map(x => x.mpgHighway)) ? 'text-green-600' : 'text-slate-900'}`}>
                    {v.powertrain === 'ev' ? `${v.mpgHighway} MPGe` : `${v.mpgHighway} mpg`}
                    {v.mpgHighway === highestMPGHwy && !allSame(vehicles.map(x => x.mpgHighway)) && <span className="ml-2 text-xs">✓ Better</span>}
                  </div>
                ))}
              </div>

              {/* Reliability Row */}
              <div className={`grid ${gridCols} p-4 bg-amber-50/50 min-w-[600px]`}>
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
              <div className={`grid ${gridCols} p-4 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Body Style</div>
                {vehicles.map((v) => (
                  <div key={v.name} className="text-center text-slate-900">{getBodyTypeDisplay(v.bodyType)}</div>
                ))}
              </div>

              {/* Seating */}
              <div className={`grid ${gridCols} p-4 bg-slate-50/50 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Seating Capacity</div>
                {vehicles.map((v) => (
                  <div key={v.name} className={`text-center font-medium ${v.seats === highestSeats && !allSame(vehicles.map(x => x.seats)) ? 'text-green-600' : 'text-slate-900'}`}>
                    {v.seats} passengers
                    {v.seats === highestSeats && !allSame(vehicles.map(x => x.seats)) && <span className="ml-2 text-xs">✓ More</span>}
                  </div>
                ))}
              </div>

              {/* Powertrain */}
              <div className={`grid ${gridCols} p-4 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Powertrain</div>
                {vehicles.map((v) => (
                  <div key={v.name} className="text-center text-slate-900">{getPowertrainDisplay(v.powertrain)}</div>
                ))}
              </div>

              {/* Size */}
              <div className={`grid ${gridCols} p-4 bg-slate-50/50 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Size Class</div>
                {vehicles.map((v) => (
                  <div key={v.name} className="text-center text-slate-900 capitalize">{v.size}</div>
                ))}
              </div>

              {/* Segment */}
              <div className={`grid ${gridCols} p-4 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">Market Segment</div>
                {vehicles.map((v) => (
                  <div key={v.name} className="text-center text-slate-900 capitalize">{v.segment}</div>
                ))}
              </div>

              {/* AWD */}
              <div className={`grid ${gridCols} p-4 bg-slate-50/50 min-w-[600px]`}>
                <div className="text-slate-600 font-medium">AWD Available</div>
                {vehicles.map((v) => (
                  <div key={v.name} className={`text-center font-medium ${v.features.includes('awd') || v.features.includes('awd-available') ? 'text-green-600' : 'text-slate-400'}`}>
                    {v.features.includes('awd') || v.features.includes('awd-available') ? '✓ Yes' : '✗ No'}
                  </div>
                ))}
              </div>

              {/* Towing */}
              <div className={`grid ${gridCols} p-4 min-w-[600px]`}>
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
      </div>
    </PageWrapper>
  );
}
