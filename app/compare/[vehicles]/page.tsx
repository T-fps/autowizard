import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase, Vehicle } from '../../lib/vehicleDatabase';
import { notFound } from 'next/navigation';

// Helper functions
function getVehicleSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicleDatabase.find(
    (v) => getVehicleSlug(v.name) === slug
  );
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

// Generate popular comparisons for static generation
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

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ vehicles: string }> }): Promise<Metadata> {
  const { vehicles: vehiclesParam } = await params;
  const slugs = vehiclesParam.split('-vs-');
  const vehicles = slugs.map(getVehicleBySlug).filter(Boolean) as Vehicle[];
  
  if (vehicles.length < 2) {
    return { title: 'Compare Vehicles | Auto Wizard' };
  }
  
  const names = vehicles.map(v => v.name).join(' vs ');
  
  return {
    title: `${names} Comparison | Auto Wizard`,
    description: `Compare the ${names}. Side-by-side specs, features, pricing, and which one is right for you.`,
    keywords: `${names}, car comparison, ${vehicles.map(v => v.name).join(', ')}, which is better`,
  };
}

// Comparison row component
function ComparisonRow({ 
  label, 
  values, 
  highlight = false,
  format = (v: string | number) => String(v)
}: { 
  label: string; 
  values: (string | number | boolean | undefined)[]; 
  highlight?: boolean;
  format?: (v: string | number) => string;
}) {
  // Find best value for highlighting (lowest price, highest seats, etc.)
  const displayValues = values.map(v => v === undefined ? '—' : typeof v === 'boolean' ? (v ? '✓' : '✗') : format(v));
  
  return (
    <div className={`grid grid-cols-${values.length + 1} gap-4 py-4 border-b border-slate-700/50 ${highlight ? 'bg-slate-800/30' : ''}`}>
      <div className="text-slate-400 font-medium">{label}</div>
      {displayValues.map((value, i) => (
        <div key={i} className={`text-center font-medium ${value === '✓' ? 'text-green-400' : value === '✗' ? 'text-slate-500' : 'text-white'}`}>
          {value}
        </div>
      ))}
    </div>
  );
}

export default async function CompareVehiclesPage({ params }: { params: Promise<{ vehicles: string }> }) {
  const { vehicles: vehiclesParam } = await params;
  const slugs = vehiclesParam.split('-vs-');
  const vehicles = slugs.map(getVehicleBySlug).filter(Boolean) as Vehicle[];
  
  if (vehicles.length < 2) {
    notFound();
  }
  
  const year = new Date().getFullYear();
  const colCount = vehicles.length + 1;
  
  // Determine winner in each category
  const lowestPrice = Math.min(...vehicles.map(v => v.price));
  const highestSeats = Math.max(...vehicles.map(v => v.seats));
  
  // JSON-LD for comparison
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': `${vehicles.map(v => v.name).join(' vs ')} Comparison`,
    'description': `Compare the ${vehicles.map(v => v.name).join(' and ')} side by side.`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-slate-950">
        {/* Hero */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-slate-400">
                <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link href="/compare" className="hover:text-cyan-400 transition-colors">Compare</Link></li>
                <li>/</li>
                <li className="text-slate-200">{vehicles.map(v => v.name).join(' vs ')}</li>
              </ol>
            </nav>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {vehicles.map(v => v.name).join(' vs ')}
            </h1>
            <p className="text-lg text-slate-300">
              Side-by-side comparison of {year} models
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Vehicle Headers */}
          <div className={`grid gap-4 mb-8`} style={{ gridTemplateColumns: `200px repeat(${vehicles.length}, 1fr)` }}>
            <div></div>
            {vehicles.map((vehicle) => (
              <div key={vehicle.name} className="text-center">
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                  <div className="text-5xl mb-4">🚗</div>
                  <h2 className="text-xl font-bold text-white mb-2">{vehicle.name}</h2>
                  <p className="text-2xl font-bold text-cyan-400 mb-2">{formatPrice(vehicle.price)}</p>
                  <p className="text-slate-400 text-sm">{getBodyTypeDisplay(vehicle.bodyType)}</p>
                  <Link
                    href={`/cars/${getVehicleSlug(vehicle.name)}`}
                    className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 overflow-hidden">
            {/* Basic Specs */}
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">Basic Specifications</h3>
              <div style={{ display: 'grid', gridTemplateColumns: `200px repeat(${vehicles.length}, 1fr)` }}>
                <ComparisonRow 
                  label="Starting MSRP" 
                  values={vehicles.map(v => v.price)} 
                  format={(v) => formatPrice(v as number)}
                  highlight
                />
                <ComparisonRow 
                  label="Body Style" 
                  values={vehicles.map(v => getBodyTypeDisplay(v.bodyType))} 
                />
                <ComparisonRow 
                  label="Seating Capacity" 
                  values={vehicles.map(v => `${v.seats} passengers`)} 
                />
                <ComparisonRow 
                  label="Size Class" 
                  values={vehicles.map(v => v.size.charAt(0).toUpperCase() + v.size.slice(1))} 
                />
                <ComparisonRow 
                  label="Segment" 
                  values={vehicles.map(v => v.segment.charAt(0).toUpperCase() + v.segment.slice(1))} 
                />
              </div>
            </div>

            {/* Powertrain */}
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">Powertrain</h3>
              <div style={{ display: 'grid', gridTemplateColumns: `200px repeat(${vehicles.length}, 1fr)` }}>
                <ComparisonRow 
                  label="Powertrain Type" 
                  values={vehicles.map(v => getPowertrainDisplay(v.powertrain))} 
                />
                <ComparisonRow 
                  label="All-Wheel Drive" 
                  values={vehicles.map(v => v.features.includes('awd'))} 
                />
              </div>
            </div>

            {/* Features */}
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">Key Features</h3>
              <div style={{ display: 'grid', gridTemplateColumns: `200px repeat(${vehicles.length}, 1fr)` }}>
                <ComparisonRow 
                  label="Off-Road Capable" 
                  values={vehicles.map(v => v.features.includes('offroad'))} 
                />
                <ComparisonRow 
                  label="Towing Capable" 
                  values={vehicles.map(v => v.features.includes('towing') || v.features.includes('heavy-towing'))} 
                />
                <ComparisonRow 
                  label="Performance Oriented" 
                  values={vehicles.map(v => v.features.includes('performance') || v.features.includes('sporty'))} 
                />
                <ComparisonRow 
                  label="Cargo Space" 
                  values={vehicles.map(v => v.features.includes('cargo') ? 'Excellent' : 'Standard')} 
                />
                <ComparisonRow 
                  label="Comfort Focused" 
                  values={vehicles.map(v => v.features.includes('comfort'))} 
                />
              </div>
            </div>

            {/* Best For */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Best For</h3>
              <div style={{ display: 'grid', gridTemplateColumns: `200px repeat(${vehicles.length}, 1fr)` }}>
                {vehicles.map((vehicle, index) => (
                  <div key={vehicle.name} className={index === 0 ? 'col-start-2' : ''}>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {vehicle.useCases.slice(0, 4).map((useCase) => (
                        <span 
                          key={useCase}
                          className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm capitalize"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verdict */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {vehicles.map((vehicle) => {
              const isPriceWinner = vehicle.price === lowestPrice;
              const isSpaceWinner = vehicle.seats === highestSeats;
              
              return (
                <div key={vehicle.name} className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Why Choose the {vehicle.name}?
                  </h3>
                  <ul className="space-y-2 text-slate-300">
                    {isPriceWinner && vehicles.length > 1 && (
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Lower starting price at {formatPrice(vehicle.price)}</span>
                      </li>
                    )}
                    {isSpaceWinner && vehicles.length > 1 && highestSeats >= 6 && (
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>More passenger capacity ({vehicle.seats} seats)</span>
                      </li>
                    )}
                    {vehicle.features.includes('awd') && (
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Available all-wheel drive</span>
                      </li>
                    )}
                    {vehicle.features.includes('reliable') && (
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Strong reliability reputation</span>
                      </li>
                    )}
                    {vehicle.features.includes('performance') && (
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Performance-oriented driving dynamics</span>
                      </li>
                    )}
                    {vehicle.features.includes('offroad') && (
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Genuine off-road capability</span>
                      </li>
                    )}
                    {(vehicle.segment === 'luxury' || vehicle.segment === 'premium') && (
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Premium interior and features</span>
                      </li>
                    )}
                    {vehicle.powertrain === 'ev' && (
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Zero emissions and lower running costs</span>
                      </li>
                    )}
                    {vehicle.powertrain === 'hybrid' && (
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Excellent fuel efficiency</span>
                      </li>
                    )}
                  </ul>
                  <Link
                    href={`/cars/${getVehicleSlug(vehicle.name)}`}
                    className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    Learn more about the {vehicle.name} →
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Quiz CTA */}
          <div className="mt-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Still Not Sure Which to Choose?</h3>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              Take our personalized quiz and we&apos;ll recommend the best vehicle based on YOUR specific needs, not just specs.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all text-lg"
            >
              Find Your Perfect Match →
            </Link>
          </div>

          {/* Compare More */}
          <div className="mt-8 text-center">
            <Link
              href="/compare"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              ← Compare Different Vehicles
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
