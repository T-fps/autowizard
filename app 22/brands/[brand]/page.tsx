import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase, Vehicle } from '../../lib/vehicleDatabase';
import { notFound } from 'next/navigation';
import CarImage from '../../components/CarImage';
import BrandLogo from '../../components/BrandLogo';

// Get all unique brands
function getAllBrands(): string[] {
  const brands = new Set(vehicleDatabase.map(v => v.brand));
  return Array.from(brands);
}

// Generate static params for all brands
export async function generateStaticParams() {
  const brands = getAllBrands();
  return brands.map((brand) => ({
    brand: brand.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Helper to find brand
function getBrandInfo(slug: string): { name: string, vehicles: Vehicle[] } | null {
  const brands = getAllBrands();
  const brandName = brands.find(
    b => b.toLowerCase().replace(/\s+/g, '-') === slug
  );
  
  if (!brandName) return null;
  
  const vehicles = vehicleDatabase.filter(v => v.brand === brandName);
  return { name: brandName, vehicles };
}

// Brand logo URLs (using Wikipedia Commons)
const brandLogos: Record<string, string> = {
  'Toyota': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carance_logo.svg/200px-Toyota_carancy_logo.svg.png',
  'Honda': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/200px-Honda.svg.png',
  'Ford': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/200px-Ford_logo_flat.svg.png',
  'Chevrolet': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo-2013.png/200px-Chevrolet-logo-2013.png',
  'BMW': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/200px-BMW.svg.png',
  'Mercedes-Benz': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/200px-Mercedes-Logo.svg.png',
  'Audi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/200px-Audi-Logo_2016.svg.png',
  'Tesla': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/200px-Tesla_Motors.svg.png',
  'Lexus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Lexus_division_emblem.svg/200px-Lexus_division_emblem.svg.png',
  'Porsche': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Porsche_logo.svg/200px-Porsche_logo.svg.png',
  'Ferrari': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Scuderia_Ferrari_Logo.svg/200px-Scuderia_Ferrari_Logo.svg.png',
  'Lamborghini': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Lamborghini_Logo.svg/200px-Lamborghini_Logo.svg.png',
  'McLaren': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/McLaren_logo.svg/200px-McLaren_logo.svg.png',
  'Aston Martin': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Aston_Martin_Logo_2021.svg/200px-Aston_Martin_Logo_2021.svg.png',
  'Bentley': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bentley_logo_2.svg/200px-Bentley_logo_2.svg.png',
  'Rolls-Royce': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Rolls_Royce_Phantom_Drophead_Coup%C3%A9_%286322641115%29_%28cropped%29.png/200px-Rolls_Royce_Phantom_Drophead_Coup%C3%A9_%286322641115%29_%28cropped%29.png',
  'Bugatti': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Bugatti_logo.svg/200px-Bugatti_logo.svg.png',
  'Maserati': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Maserati_logo.svg/200px-Maserati_logo.svg.png',
  'Lotus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Lotus_Cars.svg/200px-Lotus_Cars.svg.png',
  'Pagani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Pagani_logo.svg/200px-Pagani_logo.svg.png',
  'Koenigsegg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Koenigsegg_logo.svg/200px-Koenigsegg_logo.svg.png',
  'Mazda': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Mazda_logo_with_emblem.svg/200px-Mazda_logo_with_emblem.svg.png',
  'Hyundai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/200px-Hyundai_Motor_Company_logo.svg.png',
  'Kia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/KIA_logo2.svg/200px-KIA_logo2.svg.png',
  'Nissan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nissan_2020_logo.svg/200px-Nissan_2020_logo.svg.png',
  'Subaru': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Subaru_Logo.svg/200px-Subaru_Logo.svg.png',
  'Jeep': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Jeep_logo.svg/200px-Jeep_logo.svg.png',
  'Ram': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Ram_Trucks_logo.svg/200px-Ram_Trucks_logo.svg.png',
  'GMC': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/GMC_logo.svg/200px-GMC_logo.svg.png',
  'Volvo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Volvo_Cars_logo.svg/200px-Volvo_Cars_logo.svg.png',
  'Genesis': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Genesis_motors_logo.svg/200px-Genesis_motors_logo.svg.png',
  'Cadillac': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Cadillac_logo.svg/200px-Cadillac_logo.svg.png',
  'Lincoln': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Lincoln_Motor_Company_Logo.svg/200px-Lincoln_Motor_Company_Logo.svg.png',
  'Acura': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Acura_logo.svg/200px-Acura_logo.svg.png',
  'Infiniti': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Infiniti_logo.svg/200px-Infiniti_logo.svg.png',
  'Rivian': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Rivian-wordmark.svg/200px-Rivian-wordmark.svg.png',
  'Lucid': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Lucid_Motors_Logo.svg/200px-Lucid_Motors_Logo.svg.png',
  'Volkswagen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Volkswagen_Logo_till_1995.svg/200px-Volkswagen_Logo_till_1995.svg.png',
  'Dodge': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Dodge_logo.svg/200px-Dodge_logo.svg.png',
  'Chrysler': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Chrysler_logo.svg/200px-Chrysler_logo.svg.png',
  'Jaguar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Jaguar_logo.svg/200px-Jaguar_logo.svg.png',
  'Alfa Romeo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Alfa_Romeo_2015.svg/200px-Alfa_Romeo_2015.svg.png',
  'Land Rover': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Land_Rover_logo.svg/200px-Land_Rover_logo.svg.png',
  'Polestar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Polestar_logo.svg/200px-Polestar_logo.svg.png',
  'Buick': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Buick_logo.svg/200px-Buick_logo.svg.png',
  'Mitsubishi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/200px-Mitsubishi_logo.svg.png',
  'Mini': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Mini_logo.svg/200px-Mini_logo.svg.png',
};

// Brand colors for gradients
const brandColors: Record<string, { primary: string, secondary: string, gradient: string }> = {
  'Ferrari': { primary: '#DC0000', secondary: '#8B0000', gradient: 'from-red-600 to-red-900' },
  'Lamborghini': { primary: '#DDB321', secondary: '#B8860B', gradient: 'from-yellow-500 to-amber-700' },
  'McLaren': { primary: '#FF8000', secondary: '#CC6600', gradient: 'from-orange-500 to-orange-700' },
  'Porsche': { primary: '#8B0000', secondary: '#4A0000', gradient: 'from-slate-700 to-slate-900' },
  'Aston Martin': { primary: '#006847', secondary: '#004D35', gradient: 'from-emerald-700 to-emerald-900' },
  'Bentley': { primary: '#333333', secondary: '#1A1A1A', gradient: 'from-slate-700 to-slate-900' },
  'Rolls-Royce': { primary: '#1C1C1C', secondary: '#4B0082', gradient: 'from-purple-900 to-slate-900' },
  'Bugatti': { primary: '#1E3A5F', secondary: '#0D1B2A', gradient: 'from-blue-800 to-blue-950' },
  'Maserati': { primary: '#0033A0', secondary: '#001F5C', gradient: 'from-blue-700 to-blue-900' },
  'Lotus': { primary: '#00843D', secondary: '#005A28', gradient: 'from-green-600 to-green-800' },
  'Pagani': { primary: '#4A5568', secondary: '#2D3748', gradient: 'from-slate-600 to-blue-900' },
  'Koenigsegg': { primary: '#D4A017', secondary: '#B8860B', gradient: 'from-amber-600 to-amber-800' },
  'BMW': { primary: '#1C69D4', secondary: '#0D4A9C', gradient: 'from-blue-600 to-blue-800' },
  'Mercedes-Benz': { primary: '#000000', secondary: '#333333', gradient: 'from-slate-700 to-slate-900' },
  'Audi': { primary: '#BB0A30', secondary: '#8B0000', gradient: 'from-slate-800 to-slate-950' },
  'Tesla': { primary: '#CC0000', secondary: '#990000', gradient: 'from-red-600 to-slate-800' },
  'Toyota': { primary: '#EB0A1E', secondary: '#B80818', gradient: 'from-red-600 to-red-800' },
  'Honda': { primary: '#E40521', secondary: '#B80418', gradient: 'from-red-500 to-red-700' },
  'Ford': { primary: '#003478', secondary: '#00254D', gradient: 'from-blue-700 to-blue-900' },
  'Chevrolet': { primary: '#D4A017', secondary: '#B8860B', gradient: 'from-yellow-500 to-yellow-700' },
  'Lucid': { primary: '#1A1A1A', secondary: '#333333', gradient: 'from-slate-700 to-slate-900' },
  'default': { primary: '#1E293B', secondary: '#0F172A', gradient: 'from-slate-700 to-slate-900' },
};

// Brand descriptions
const brandDescriptions: Record<string, string> = {
  'Toyota': 'Known for legendary reliability and excellent resale value, Toyota offers vehicles for every lifestyle from efficient sedans to rugged trucks.',
  'Honda': 'Honda combines practicality with driving enjoyment, delivering reliable vehicles with excellent fuel efficiency and smart packaging.',
  'Ford': 'America\'s truck leader, Ford also offers exciting sports cars and a growing lineup of electric vehicles.',
  'Chevrolet': 'From the iconic Corvette to capable trucks, Chevrolet delivers performance and value across all segments.',
  'BMW': 'The Ultimate Driving Machine - BMW combines luxury with engaging driving dynamics in every model.',
  'Mercedes-Benz': 'The best or nothing - Mercedes-Benz sets the standard for automotive luxury and innovation.',
  'Audi': 'Progressive luxury with Quattro all-wheel drive and cutting-edge technology.',
  'Tesla': 'Leading the electric revolution with innovative technology and impressive performance.',
  'Lexus': 'Toyota\'s luxury division delivers exceptional quality, reliability, and craftsmanship.',
  'Porsche': 'Sports car DNA in every vehicle - from the iconic 911 to electric Taycans.',
  'Mazda': 'Japanese craftsmanship meets driving passion, offering premium experiences at mainstream prices.',
  'Hyundai': 'Remarkable transformation into a design and technology leader with industry-best warranty.',
  'Kia': 'Bold design, great value, and an unbeatable warranty make Kia a smart choice.',
  'Nissan': 'Innovative technology and diverse lineup from efficient sedans to capable trucks.',
  'Subaru': 'Standard all-wheel drive and rugged capability for outdoor enthusiasts.',
  'Jeep': 'Legendary off-road capability and iconic design for adventure seekers.',
  'Ram': 'Luxury and capability combine in America\'s fastest-growing truck brand.',
  'GMC': 'Professional-grade trucks and SUVs with premium features and capability.',
  'Volvo': 'Swedish safety leadership combined with Scandinavian luxury design.',
  'Land Rover': 'Unmatched off-road capability with British luxury refinement.',
  'Genesis': 'Korean luxury that rivals the Germans at a better value.',
  'Cadillac': 'American luxury reimagined with bold design and advanced technology.',
  'Lincoln': 'Quiet luxury and serene comfort define the modern Lincoln experience.',
  'Acura': 'Honda\'s premium brand delivers sporty performance with everyday practicality.',
  'Infiniti': 'Japanese luxury with a focus on performance and bold styling.',
  'Rivian': 'Adventure-focused electric vehicles designed for outdoor enthusiasts.',
  'Lucid': 'Ultra-luxury electric sedans with record-breaking range and performance.',
  'Polestar': 'Scandinavian electric performance brand from Volvo.',
  // Exotic & Hypercar Brands
  'Lamborghini': 'Italian exotic supercars with aggressive styling and screaming V10 and V12 engines. The Urus SUV brings Lamborghini DNA to daily driving.',
  'Ferrari': 'The prancing horse - Italian passion and racing heritage in every handcrafted supercar. The Purosangue marks Ferrari\'s first SUV.',
  'McLaren': 'British precision engineering and Formula 1 technology in lightweight, driver-focused supercars.',
  'Aston Martin': 'British grand touring elegance - handcrafted luxury sports cars and the DBX SUV for those who demand distinction.',
  'Bentley': 'Extraordinary British craftsmanship and effortless performance. Continental GT redefined the grand tourer category.',
  'Rolls-Royce': 'The pinnacle of automotive luxury - handcrafted excellence for those who demand the absolute best.',
  'Bugatti': 'The ultimate in automotive engineering - quad-turbo W16 hypercars pushing the boundaries of speed and luxury.',
  'Maserati': 'Italian passion and racing heritage combine in elegant grand tourers and sport sedans with distinctive exhaust notes.',
  'Lotus': 'Lightweight British sports cars focused on pure driving dynamics, now expanding into electric luxury with Eletre and Emeya.',
  'Pagani': 'Boutique Italian hypercars handcrafted as rolling works of art with obsessive attention to detail.',
  'Koenigsegg': 'Swedish hypercar innovators pushing the boundaries of speed, technology, and engineering excellence.',
};

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
  const { brand } = await params;
  const brandInfo = getBrandInfo(brand);
  
  if (!brandInfo) {
    return { title: 'Brand Not Found | Auto Wizard' };
  }
  
  const year = new Date().getFullYear();
  
  return {
    title: `${year} ${brandInfo.name} Vehicles - All Models & Prices | Auto Wizard`,
    description: `Explore all ${year} ${brandInfo.name} vehicles. Compare ${brandInfo.vehicles.length} models with prices, specs, and features. Find your perfect ${brandInfo.name} with our free quiz.`,
    keywords: `${brandInfo.name}, ${brandInfo.name} cars, ${brandInfo.name} vehicles, ${year} ${brandInfo.name}, ${brandInfo.name} SUV, ${brandInfo.name} truck, ${brandInfo.name} prices`,
    openGraph: {
      title: `${year} ${brandInfo.name} Vehicles | Auto Wizard`,
      description: `Compare all ${brandInfo.vehicles.length} ${brandInfo.name} models. Find the perfect one for you.`,
      type: 'website',
    },
  };
}

// Format price
function formatPrice(price: number): string {
  return `$${(price * 1000).toLocaleString()}`;
}

// Get body type display
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

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const brandInfo = getBrandInfo(brand);
  
  if (!brandInfo) {
    notFound();
  }
  
  const { name, vehicles } = brandInfo;
  const year = new Date().getFullYear();
  
  // Group vehicles by body type
  const vehiclesByType: Record<string, Vehicle[]> = {};
  vehicles.forEach(v => {
    const type = v.bodyType;
    if (!vehiclesByType[type]) vehiclesByType[type] = [];
    vehiclesByType[type].push(v);
  });
  
  // Sort each group by price
  Object.values(vehiclesByType).forEach(arr => arr.sort((a, b) => a.price - b.price));
  
  // Order of body types to display
  const typeOrder = ['sedan', 'suv', 'crossover', 'truck', 'hatchback', 'coupe', 'wagon', 'minivan', 'convertible', 'sports', 'van'];
  const sortedTypes = Object.keys(vehiclesByType).sort((a, b) => {
    return typeOrder.indexOf(a) - typeOrder.indexOf(b);
  });
  
  // Stats
  const minPrice = Math.min(...vehicles.map(v => v.price));
  const maxPrice = Math.max(...vehicles.map(v => v.price));
  const evCount = vehicles.filter(v => v.powertrain === 'ev').length;
  const hybridCount = vehicles.filter(v => v.powertrain === 'hybrid' || v.powertrain === 'phev').length;
  const brandColor = brandColors[name] || brandColors['default'];
  const logoUrl = brandLogos[name];
  
  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    'name': name,
    'description': brandDescriptions[name] || `${name} vehicles`,
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-slate-950">
        {/* Hero */}
        <div className={`relative bg-gradient-to-br ${brandColor.gradient} border-b border-slate-700`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-slate-400">
                <li><Link href="/" className="hover:text-cyan-600 transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link href="/brands" className="hover:text-cyan-600 transition-colors">Brands</Link></li>
                <li>/</li>
                <li className="text-slate-200">{name}</li>
              </ol>
            </nav>
            
            <div className="flex items-center gap-6 mb-6">
              {logoUrl && (
                <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-2xl p-3 flex items-center justify-center shadow-lg">
                  <img 
                    src={logoUrl} 
                    alt={`${name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {year} {name}
                </h1>
                <p className="text-lg text-white/80">
                  {vehicles.length} Models Available
                </p>
              </div>
            </div>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl">
              {brandDescriptions[name] || `Explore all ${name} vehicles available today.`}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200">
                <div className="text-3xl font-bold text-slate-900">{vehicles.length}</div>
                <div className="text-slate-600 text-sm">Models</div>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200">
                <div className="text-3xl font-bold text-slate-900">{formatPrice(minPrice)}</div>
                <div className="text-slate-600 text-sm">Starting From</div>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200">
                <div className="text-3xl font-bold text-slate-900">{evCount}</div>
                <div className="text-slate-600 text-sm">Electric Models</div>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200">
                <div className="text-3xl font-bold text-slate-900">{hybridCount}</div>
                <div className="text-slate-600 text-sm">Hybrid Models</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vehicle Listings */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Quick Quiz CTA */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Not sure which {name} is right for you?</h2>
                <p className="text-slate-300">Take our quiz to get personalized recommendations based on your needs.</p>
              </div>
              <Link
                href="/quiz"
                className="shrink-0 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
              >
                Take the Quiz →
              </Link>
            </div>
          </div>
          
          {/* Vehicles by Type */}
          {sortedTypes.map(type => (
            <div key={type} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span>{getBodyTypeDisplay(type)}s</span>
                <span className="text-sm font-normal text-slate-400">({vehiclesByType[type].length} models)</span>
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {vehiclesByType[type].map(vehicle => (
                  <Link
                    key={vehicle.name}
                    href={`/cars/${vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                    className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <div className={`aspect-video bg-gradient-to-br ${brandColor.gradient} relative overflow-hidden`}>
                      <CarImage 
                        vehicleName={vehicle.name}
                        brandColor={brandColor.gradient}
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
                      <h3 className="text-white font-semibold group-hover:text-cyan-600 transition-colors mb-1">
                        {vehicle.name}
                      </h3>
                      <p className="text-cyan-600 font-medium mb-2">{formatPrice(vehicle.price)}</p>
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
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                            AWD
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
