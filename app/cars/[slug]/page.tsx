import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase, Vehicle } from '../../lib/vehicleDatabase';
import { getVehicleTrims } from '../../lib/vehicleTrims';
import { getVehicleHeritage } from '../../lib/vehicleHeritage';
import { notFound } from 'next/navigation';
import CarImage from '../../components/CarImage';
import TrimSelector from '../../components/TrimSelector';

// Generate static params for all vehicles
export async function generateStaticParams() {
  return vehicleDatabase.map((vehicle) => ({
    slug: vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  }));
}

// Helper to find vehicle by slug
function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicleDatabase.find(
    (v) => v.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === slug
  );
}

// Brand gradient colors
function getBrandGradient(brand: string): string {
  const gradients: Record<string, string> = {
    'Ferrari': 'from-red-600 to-red-900',
    'Lamborghini': 'from-yellow-500 to-orange-600',
    'McLaren': 'from-orange-500 to-orange-700',
    'Porsche': 'from-slate-600 to-slate-800',
    'Aston Martin': 'from-emerald-700 to-emerald-900',
    'Bentley': 'from-slate-700 to-slate-900',
    'Rolls-Royce': 'from-purple-900 to-slate-900',
    'Bugatti': 'from-blue-800 to-blue-950',
    'Maserati': 'from-blue-700 to-blue-900',
    'Lotus': 'from-green-600 to-green-800',
    'Pagani': 'from-slate-600 to-blue-900',
    'Koenigsegg': 'from-amber-600 to-amber-800',
    'BMW': 'from-blue-600 to-blue-800',
    'Mercedes-Benz': 'from-slate-600 to-slate-800',
    'Audi': 'from-slate-700 to-slate-900',
    'Tesla': 'from-red-600 to-slate-800',
    'Lexus': 'from-slate-700 to-slate-900',
    'Toyota': 'from-red-600 to-red-800',
    'Honda': 'from-red-500 to-red-700',
    'Ford': 'from-blue-600 to-blue-800',
    'Chevrolet': 'from-yellow-500 to-yellow-700',
    'Lucid': 'from-slate-600 to-slate-800',
  };
  return gradients[brand] || 'from-slate-700 to-slate-900';
}

// Helper to get similar vehicles
function getSimilarVehicles(vehicle: Vehicle): Vehicle[] {
  return vehicleDatabase
    .filter(v => 
      v.name !== vehicle.name && 
      v.bodyType === vehicle.bodyType &&
      Math.abs(v.price - vehicle.price) <= 15
    )
    .slice(0, 4);
}

// Helper to get vehicles in same brand
function getSameBrandVehicles(vehicle: Vehicle): Vehicle[] {
  return vehicleDatabase
    .filter(v => v.name !== vehicle.name && v.brand === vehicle.brand)
    .slice(0, 4);
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  
  if (!vehicle) {
    return { title: 'Vehicle Not Found | Auto Wizard' };
  }
  
  const year = new Date().getFullYear();
  
  return {
    title: `${year} ${vehicle.name} Review, Specs & Price | Auto Wizard`,
    description: `Is the ${year} ${vehicle.name} right for you? Starting at $${vehicle.price.toLocaleString()}. See specs, features, pros & cons, and find out if it matches your needs with our free quiz.`,
    keywords: `${vehicle.name}, ${vehicle.brand}, ${vehicle.bodyType}, ${year} ${vehicle.name} review, ${vehicle.name} price, ${vehicle.name} specs, best ${vehicle.bodyType}`,
    openGraph: {
      title: `${year} ${vehicle.name} | Auto Wizard`,
      description: `${vehicle.name} starting at $${vehicle.price.toLocaleString()}. Find out if it's the right car for you.`,
      type: 'article',
    },
  };
}

// Pros and cons generator based on vehicle attributes
function generateProsAndCons(vehicle: Vehicle): { pros: string[], cons: string[] } {
  const pros: string[] = [];
  const cons: string[] = [];
  
  // Reliability
  const reliableBrands = ['Toyota', 'Lexus', 'Honda', 'Acura', 'Mazda'];
  if (reliableBrands.includes(vehicle.brand)) {
    pros.push('Excellent reliability reputation');
  }
  
  // Warranty
  if (['Hyundai', 'Kia', 'Genesis'].includes(vehicle.brand)) {
    pros.push('Industry-leading warranty coverage');
  }
  
  // Powertrain
  if (vehicle.powertrain === 'ev') {
    pros.push('Zero emissions and low running costs');
    cons.push('Charging infrastructure dependency');
  } else if (vehicle.powertrain === 'hybrid') {
    pros.push('Excellent fuel efficiency');
  } else if (vehicle.powertrain === 'phev') {
    pros.push('Electric commuting with gas backup');
  }
  
  // Features
  if (vehicle.features.includes('awd')) {
    pros.push('All-wheel drive capability');
  }
  if (vehicle.features.includes('offroad')) {
    pros.push('Genuine off-road capability');
  }
  if (vehicle.features.includes('performance')) {
    pros.push('Engaging performance and handling');
    cons.push('May require premium fuel');
  }
  if (vehicle.features.includes('cargo')) {
    pros.push('Generous cargo space');
  }
  if (vehicle.features.includes('towing')) {
    pros.push('Strong towing capacity');
  }
  if (vehicle.features.includes('comfort')) {
    pros.push('Comfortable ride quality');
  }
  
  // Segment
  if (vehicle.segment === 'luxury' || vehicle.segment === 'premium') {
    pros.push('Premium interior materials and features');
    cons.push('Higher maintenance costs');
  }
  if (vehicle.segment === 'mainstream') {
    pros.push('Good value for money');
  }
  
  // Body type specific
  if (vehicle.bodyType === 'truck') {
    pros.push('Versatile bed for hauling');
    cons.push('Larger size can be challenging in tight spaces');
  }
  if (vehicle.bodyType === 'minivan') {
    pros.push('Unmatched family practicality');
    cons.push('Less sporty image');
  }
  if (vehicle.bodyType === 'coupe' || vehicle.bodyType === 'sports') {
    pros.push('Head-turning styling');
    cons.push('Limited rear passenger space');
  }
  
  // Seats
  if (vehicle.seats >= 7) {
    pros.push(`Seats up to ${vehicle.seats} passengers`);
  }
  
  // Size cons
  if (vehicle.size === 'fullsize') {
    cons.push('May be difficult to park in tight spaces');
  }
  if (vehicle.size === 'subcompact') {
    cons.push('Limited cargo and passenger space');
  }
  
  // Price
  if (vehicle.price < 30) {
    pros.push('Affordable entry price');
  } else if (vehicle.price > 80) {
    cons.push('Premium pricing');
  }
  
  // Ensure we have at least some pros and cons
  if (pros.length < 3) {
    pros.push('Modern safety features');
  }
  if (cons.length < 2) {
    cons.push('Competition is strong in this segment');
  }
  
  return { pros: pros.slice(0, 5), cons: cons.slice(0, 4) };
}

// Format price
function formatPrice(price: number): string {
  return `$${(price * 1000).toLocaleString()}`;
}

// Get body type display name
function getBodyTypeDisplay(bodyType: string): string {
  const displays: Record<string, string> = {
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
  return displays[bodyType] || bodyType;
}

// Get powertrain display name
function getPowertrainDisplay(powertrain: string): string {
  const displays: Record<string, string> = {
    'gas': 'Gasoline',
    'hybrid': 'Hybrid',
    'phev': 'Plug-in Hybrid',
    'ev': 'Electric',
  };
  return displays[powertrain] || powertrain;
}

// Wikipedia image URL helper
function getWikipediaImageUrl(vehicle: Vehicle): string {
  const wikiTitles: Record<string, string> = {
    'Toyota Camry': 'Toyota_Camry',
    'Toyota Corolla': 'Toyota_Corolla',
    'Toyota RAV4': 'Toyota_RAV4',
    'Honda Accord': 'Honda_Accord',
    'Honda Civic': 'Honda_Civic',
    'Honda CR-V': 'Honda_CR-V',
    'Ford F-150': 'Ford_F-Series',
    'Ford Mustang': 'Ford_Mustang',
    'Ford Bronco': 'Ford_Bronco',
    'Chevrolet Silverado': 'Chevrolet_Silverado',
    'Tesla Model 3': 'Tesla_Model_3',
    'Tesla Model Y': 'Tesla_Model_Y',
    'BMW 3 Series': 'BMW_3_Series',
    'Mercedes-Benz C-Class': 'Mercedes-Benz_C-Class',
    'Jeep Wrangler': 'Jeep_Wrangler',
    'Jeep Grand Cherokee': 'Jeep_Grand_Cherokee',
  };
  
  const wikiTitle = wikiTitles[vehicle.name] || vehicle.name.replace(/\s+/g, '_');
  return `https://en.wikipedia.org/wiki/${wikiTitle}`;
}

export default async function VehiclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  
  if (!vehicle) {
    notFound();
  }
  
  const { pros, cons } = generateProsAndCons(vehicle);
  const similarVehicles = getSimilarVehicles(vehicle);
  const sameBrandVehicles = getSameBrandVehicles(vehicle);
  const year = new Date().getFullYear();
  
  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    'name': `${year} ${vehicle.name}`,
    'brand': {
      '@type': 'Brand',
      'name': vehicle.brand,
    },
    'model': vehicle.name.replace(vehicle.brand, '').trim(),
    'vehicleConfiguration': getBodyTypeDisplay(vehicle.bodyType),
    'fuelType': getPowertrainDisplay(vehicle.powertrain),
    'seatingCapacity': vehicle.seats,
    'offers': {
      '@type': 'Offer',
      'price': vehicle.price * 1000,
      'priceCurrency': 'USD',
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-slate-100 via-slate-50 to-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-slate-500">
                <li><Link href="/" className="hover:text-amber-600 transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link href={`/brands/${vehicle.brand.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-amber-600 transition-colors">{vehicle.brand}</Link></li>
                <li>/</li>
                <li className="text-slate-900">{vehicle.name}</li>
              </ol>
            </nav>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                    {getBodyTypeDisplay(vehicle.bodyType)}
                  </span>
                  <span className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-sm">
                    {getPowertrainDisplay(vehicle.powertrain)}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  {year} {vehicle.name}
                </h1>
                
                <p className="text-2xl text-amber-600 font-semibold mb-2">
                  Starting at {formatPrice(vehicle.price)}
                </p>
                
                {getVehicleHeritage(vehicle.name) && (
                  <p className="text-slate-600 text-lg mb-6 italic">
                    {getVehicleHeritage(vehicle.name)}
                  </p>
                )}
                
                <p className="text-slate-600 text-lg mb-8">
                  The {vehicle.name} is a {vehicle.segment} {getBodyTypeDisplay(vehicle.bodyType).toLowerCase()} 
                  {vehicle.seats >= 7 ? ` with seating for up to ${vehicle.seats}` : ''} from {vehicle.brand}.
                  {vehicle.powertrain === 'ev' ? ' This all-electric model offers zero-emission driving.' : ''}
                  {vehicle.powertrain === 'hybrid' ? ' The hybrid powertrain delivers excellent fuel efficiency.' : ''}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/quiz"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/25"
                  >
                    🎯 Is This Car Right For You?
                  </Link>
                  <a
                    href={getWikipediaImageUrl(vehicle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-300 transition-all duration-300"
                  >
                    📷 View Photos
                  </a>
                </div>
              </div>
              
              <div className="relative">
                <div className={`aspect-video bg-gradient-to-br ${getBrandGradient(vehicle.brand)} rounded-2xl flex items-center justify-center border border-slate-200 overflow-hidden relative`}>
                  <CarImage 
                    vehicleName={vehicle.name}
                    brandColor={getBrandGradient(vehicle.brand)}
                    isExotic={vehicle.segment === 'exotic'}
                    bodyType={vehicle.bodyType}
                  />
                </div>
                {vehicle.segment === 'exotic' && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    EXOTIC
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Specs */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Specifications</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                    <div className="text-3xl mb-2">💰</div>
                    <div className="text-slate-500 text-sm">Starting MSRP</div>
                    <div className="text-slate-900 font-semibold">{formatPrice(vehicle.price)}</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                    <div className="text-3xl mb-2">🏎️</div>
                    <div className="text-slate-500 text-sm">Horsepower</div>
                    <div className="text-slate-900 font-semibold">{vehicle.hp.toLocaleString()} hp</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                    <div className="text-3xl mb-2">⛽</div>
                    <div className="text-slate-500 text-sm">MPG City / Hwy</div>
                    <div className="text-slate-900 font-semibold">{vehicle.powertrain === 'ev' ? `${vehicle.mpgCity}/${vehicle.mpgHighway} MPGe` : `${vehicle.mpgCity}/${vehicle.mpgHighway}`}</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="text-slate-500 text-sm">Reliability</div>
                    <div className="text-amber-500 font-semibold">{'★'.repeat(vehicle.reliability)}{'☆'.repeat(5 - vehicle.reliability)}</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                    <div className="text-3xl mb-2">👥</div>
                    <div className="text-slate-500 text-sm">Seating</div>
                    <div className="text-slate-900 font-semibold">{vehicle.seats} passengers</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="text-slate-500 text-sm">Powertrain</div>
                    <div className="text-slate-900 font-semibold">{getPowertrainDisplay(vehicle.powertrain)}</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                    <div className="text-3xl mb-2">📐</div>
                    <div className="text-slate-500 text-sm">Size Class</div>
                    <div className="text-slate-900 font-semibold capitalize">{vehicle.size}</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                    <div className="text-3xl mb-2">🚗</div>
                    <div className="text-slate-500 text-sm">Body Type</div>
                    <div className="text-slate-900 font-semibold">{getBodyTypeDisplay(vehicle.bodyType)}</div>
                  </div>
                </div>
                
                {/* Available Options Tags */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-500 mb-3">Available Options</h3>
                  <div className="flex flex-wrap gap-2">
                    {/* Powertrain Tags */}
                    {vehicle.powertrain === 'gas' && (
                      <span className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">⛽ Gas</span>
                    )}
                    {vehicle.powertrain === 'hybrid' && (
                      <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">🔋 Hybrid</span>
                    )}
                    {vehicle.powertrain === 'phev' && (
                      <>
                        <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">🔌 Plug-in Hybrid</span>
                        <span className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">⛽ Gas</span>
                      </>
                    )}
                    {vehicle.powertrain === 'ev' && (
                      <span className="px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">⚡ Electric</span>
                    )}
                    
                    {/* Drivetrain Tags */}
                    {vehicle.features.includes('fwd') && (
                      <span className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-full text-sm font-medium">FWD</span>
                    )}
                    {vehicle.features.includes('rwd') && (
                      <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">RWD</span>
                    )}
                    {(vehicle.features.includes('awd') || vehicle.features.includes('awd-available')) && (
                      <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">AWD</span>
                    )}
                    {(vehicle.features.includes('4wd') || vehicle.features.includes('offroad') || vehicle.bodyType === 'truck') && (
                      <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">4WD</span>
                    )}
                    
                    {/* Default FWD for cars without explicit drivetrain */}
                    {!vehicle.features.includes('fwd') && 
                     !vehicle.features.includes('rwd') && 
                     !vehicle.features.includes('awd') && 
                     !vehicle.features.includes('awd-available') &&
                     !vehicle.features.includes('4wd') &&
                     !vehicle.features.includes('offroad') &&
                     vehicle.bodyType !== 'truck' && (
                      <span className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-full text-sm font-medium">FWD</span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Trim Selector */}
              {(() => {
                const trimData = getVehicleTrims(vehicle.name);
                if (trimData && trimData.trims.length > 1) {
                  return (
                    <TrimSelector 
                      vehicleName={vehicle.name}
                      basePrice={trimData.basePrice}
                      trims={trimData.trims}
                    />
                  );
                }
                return null;
              })()}
              
              {/* Pros and Cons */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-green-600">✓</span> What We Like
                  </h3>
                  <ul className="space-y-3">
                    {pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <span className="text-green-600 mt-1">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-amber-600">△</span> Consider This
                  </h3>
                  <ul className="space-y-3">
                    {cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <span className="text-amber-600 mt-1">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Features */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Notable Features</h2>
                <div className="flex flex-wrap gap-3">
                  {vehicle.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm capitalize"
                    >
                      {feature.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Best For Section */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Who Is This Car Best For?</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {vehicle.useCases.map((useCase, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-white/70 text-amber-800 rounded-lg text-sm capitalize border border-amber-200"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
                <p className="text-slate-700 mb-6">
                  Not sure if the {vehicle.name} matches your specific needs? Take our quick quiz to see personalized recommendations based on your lifestyle, budget, and preferences.
                </p>
                <Link
                  href="/quiz"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
                >
                  Take the Quiz →
                </Link>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats Card */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 sticky top-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Facts</h3>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Brand</dt>
                    <dd className="text-slate-900 font-medium">{vehicle.brand}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Body Style</dt>
                    <dd className="text-slate-900 font-medium">{getBodyTypeDisplay(vehicle.bodyType)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Segment</dt>
                    <dd className="text-slate-900 font-medium capitalize">{vehicle.segment}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Seats</dt>
                    <dd className="text-slate-900 font-medium">{vehicle.seats}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Powertrain</dt>
                    <dd className="text-slate-900 font-medium">{getPowertrainDisplay(vehicle.powertrain)}</dd>
                  </div>
                </dl>
                
                <hr className="my-6 border-slate-200" />
                
                <Link
                  href="/quiz"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
                >
                  Find Your Perfect Car
                </Link>
              </div>
            </div>
          </div>
          
          {/* Similar Vehicles */}
          {similarVehicles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Similar Vehicles to Consider</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarVehicles.map((v) => (
                  <Link
                    key={v.name}
                    href={`/cars/${v.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                    className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="aspect-video">
                      <CarImage 
                        vehicleName={v.name}
                        brandColor={getBrandGradient(v.brand)}
                        bodyType={v.bodyType}
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="text-slate-900 font-semibold group-hover:text-amber-600 transition-colors">{v.name}</h3>
                      <p className="text-amber-600 font-medium">{formatPrice(v.price)}</p>
                      <p className="text-slate-500 text-sm">{getBodyTypeDisplay(v.bodyType)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* More from Brand */}
          {sameBrandVehicles.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">More from {vehicle.brand}</h2>
                <Link
                  href={`/brands/${vehicle.brand.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-amber-600 hover:text-amber-500 transition-colors"
                >
                  View all →
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sameBrandVehicles.map((v) => (
                  <Link
                    key={v.name}
                    href={`/cars/${v.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                    className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="aspect-video">
                      <CarImage 
                        vehicleName={v.name}
                        brandColor={getBrandGradient(v.brand)}
                        bodyType={v.bodyType}
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="text-slate-900 font-semibold group-hover:text-amber-600 transition-colors">{v.name}</h3>
                      <p className="text-amber-600 font-medium">{formatPrice(v.price)}</p>
                      <p className="text-slate-500 text-sm">{getBodyTypeDisplay(v.bodyType)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
