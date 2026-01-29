import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase, Vehicle } from '../../lib/vehicleDatabase';
import { notFound } from 'next/navigation';
import CarImage from '../../components/CarImage';

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
  const lowestPrice = Math.min(...vehicles.map(v => v.price));
  const highestSeats = Math.max(...vehicles.map(v => v.seats));

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-cyan-600 transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/compare" className="hover:text-cyan-600 transition-colors">Compare</Link></li>
              <li>/</li>
              <li className="text-slate-200 truncate max-w-xs">{vehicles.map(v => v.name).join(' vs ')}</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {vehicles[0].name} <span className="text-cyan-600">vs</span> {vehicles[1].name}
          </h1>
          <p className="text-lg text-slate-300">Side-by-side comparison of {year} models</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vehicle Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {vehicles.map((vehicle) => (
            <div key={vehicle.name} className="bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-700">
              <div className={`aspect-video bg-gradient-to-br ${getBrandGradient(vehicle.brand)} relative`}>
                <CarImage 
                  vehicleName={vehicle.name}
                  brandColor={getBrandGradient(vehicle.brand)}
                  isExotic={vehicle.segment === 'exotic'}
                  bodyType={vehicle.bodyType}
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{vehicle.name}</h2>
                <p className="text-3xl font-bold text-cyan-600 mb-4">{formatPrice(vehicle.price)}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">{getBodyTypeDisplay(vehicle.bodyType)}</span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">{vehicle.seats} seats</span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">{getPowertrainDisplay(vehicle.powertrain)}</span>
                </div>
                <Link href={`/cars/${getVehicleSlug(vehicle.name)}`} className="text-cyan-600 hover:text-cyan-300 font-medium">
                  View Full Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700 bg-slate-800/50">
            <h3 className="text-xl font-bold text-slate-900">Specifications Comparison</h3>
          </div>
          
          <div className="divide-y divide-slate-700/50">
            {/* Price Row */}
            <div className="grid grid-cols-3 p-4 bg-cyan-500/5">
              <div className="text-slate-400 font-medium">Starting MSRP</div>
              {vehicles.map((v) => (
                <div key={v.name} className={`text-center font-bold ${v.price === lowestPrice ? 'text-green-700' : 'text-slate-900'}`}>
                  {formatPrice(v.price)}
                  {v.price === lowestPrice && <span className="ml-2 text-xs">✓ Lower</span>}
                </div>
              ))}
            </div>

            {/* Body Style */}
            <div className="grid grid-cols-3 p-4">
              <div className="text-slate-400 font-medium">Body Style</div>
              {vehicles.map((v) => (
                <div key={v.name} className="text-center text-slate-900">{getBodyTypeDisplay(v.bodyType)}</div>
              ))}
            </div>

            {/* Seating */}
            <div className="grid grid-cols-3 p-4 bg-slate-800/20">
              <div className="text-slate-400 font-medium">Seating Capacity</div>
              {vehicles.map((v) => (
                <div key={v.name} className={`text-center font-medium ${v.seats === highestSeats ? 'text-green-700' : 'text-slate-900'}`}>
                  {v.seats} passengers
                  {v.seats === highestSeats && vehicles[0].seats !== vehicles[1].seats && <span className="ml-2 text-xs">✓ More</span>}
                </div>
              ))}
            </div>

            {/* Powertrain */}
            <div className="grid grid-cols-3 p-4">
              <div className="text-slate-400 font-medium">Powertrain</div>
              {vehicles.map((v) => (
                <div key={v.name} className="text-center text-slate-900">{getPowertrainDisplay(v.powertrain)}</div>
              ))}
            </div>

            {/* Size */}
            <div className="grid grid-cols-3 p-4 bg-slate-800/20">
              <div className="text-slate-400 font-medium">Size Class</div>
              {vehicles.map((v) => (
                <div key={v.name} className="text-center text-white capitalize">{v.size}</div>
              ))}
            </div>

            {/* Segment */}
            <div className="grid grid-cols-3 p-4">
              <div className="text-slate-400 font-medium">Market Segment</div>
              {vehicles.map((v) => (
                <div key={v.name} className="text-center text-white capitalize">{v.segment}</div>
              ))}
            </div>

            {/* AWD */}
            <div className="grid grid-cols-3 p-4 bg-slate-800/20">
              <div className="text-slate-400 font-medium">AWD Available</div>
              {vehicles.map((v) => (
                <div key={v.name} className={`text-center font-medium ${v.features.includes('awd') || v.features.includes('awd-available') ? 'text-green-700' : 'text-slate-500'}`}>
                  {v.features.includes('awd') || v.features.includes('awd-available') ? '✓ Yes' : '✗ No'}
                </div>
              ))}
            </div>

            {/* Towing */}
            <div className="grid grid-cols-3 p-4">
              <div className="text-slate-400 font-medium">Towing Capable</div>
              {vehicles.map((v) => (
                <div key={v.name} className={`text-center font-medium ${v.features.includes('towing') || v.features.includes('heavy-towing') ? 'text-green-700' : 'text-slate-500'}`}>
                  {v.features.includes('towing') || v.features.includes('heavy-towing') ? '✓ Yes' : '✗ No'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4">Not sure which one is right for you?</p>
          <Link href="/quiz" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all">
            🎯 Take Our Quiz for Personalized Recommendations
          </Link>
        </div>
      </div>
    </div>
  );
}
