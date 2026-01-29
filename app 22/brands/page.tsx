import { Metadata } from 'next';
import Link from 'next/link';
import { vehicleDatabase } from '../lib/vehicleDatabase';

export const metadata: Metadata = {
  title: 'All Car Brands - Compare Vehicles by Manufacturer | Auto Wizard',
  description: 'Explore vehicles from all major car brands. Compare Toyota, Honda, Ford, BMW, Tesla, and 40+ more manufacturers. Find the perfect car for you.',
  keywords: 'car brands, auto manufacturers, Toyota, Honda, Ford, BMW, Mercedes, Tesla, car comparison',
};

// Get brand statistics
function getBrandStats() {
  const brandStats: Record<string, { count: number, minPrice: number, maxPrice: number, evCount: number }> = {};
  
  vehicleDatabase.forEach(v => {
    if (!brandStats[v.brand]) {
      brandStats[v.brand] = { count: 0, minPrice: Infinity, maxPrice: 0, evCount: 0 };
    }
    brandStats[v.brand].count++;
    brandStats[v.brand].minPrice = Math.min(brandStats[v.brand].minPrice, v.price);
    brandStats[v.brand].maxPrice = Math.max(brandStats[v.brand].maxPrice, v.price);
    if (v.powertrain === 'ev') brandStats[v.brand].evCount++;
  });
  
  return brandStats;
}

// Brand categories
const brandCategories = {
  'Popular': ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Hyundai', 'Kia'],
  'Luxury': ['BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Porsche', 'Genesis', 'Volvo', 'Cadillac', 'Lincoln', 'Infiniti', 'Acura'],
  'Trucks & Off-Road': ['Ford', 'Chevrolet', 'Ram', 'GMC', 'Toyota', 'Jeep', 'Land Rover'],
  'Electric': ['Tesla', 'Rivian', 'Lucid', 'Polestar', 'Lotus'],
  'European': ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Volvo', 'Volkswagen', 'Jaguar', 'Land Rover', 'Alfa Romeo'],
  'Japanese': ['Toyota', 'Honda', 'Nissan', 'Mazda', 'Subaru', 'Lexus', 'Acura', 'Infiniti'],
  'Korean': ['Hyundai', 'Kia', 'Genesis'],
  'Exotic & Hypercar': ['Ferrari', 'Lamborghini', 'McLaren', 'Aston Martin', 'Bentley', 'Rolls-Royce', 'Bugatti', 'Maserati', 'Lotus', 'Pagani', 'Koenigsegg'],
};

function formatPrice(price: number): string {
  return `$${(price * 1000).toLocaleString()}`;
}

export default function BrandsPage() {
  const brandStats = getBrandStats();
  const brands = Object.keys(brandStats).sort();
  
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-cyan-600 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-slate-200">All Brands</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All Car Brands
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Explore vehicles from {brands.length}+ manufacturers. Find detailed specs, pricing, and comparisons for every model.
          </p>
          
          <Link
            href="/quiz"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
          >
            🎯 Find Your Perfect Car
          </Link>
        </div>
      </div>
      
      {/* All Brands Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">All Brands A-Z</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {brands.map(brand => {
            const stats = brandStats[brand];
            return (
              <Link
                key={brand}
                href={`/brands/${brand.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-slate-900/50 rounded-xl p-4 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <h3 className="text-white font-semibold group-hover:text-cyan-600 transition-colors mb-2">
                  {brand}
                </h3>
                <p className="text-slate-400 text-sm">
                  {stats.count} models
                </p>
                <p className="text-cyan-600 text-sm">
                  From {formatPrice(stats.minPrice)}
                </p>
              </Link>
            );
          })}
        </div>
        
        {/* Quick Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">Browse by Category</h2>
          
          <div className="space-y-8">
            {Object.entries(brandCategories).map(([category, categoryBrands]) => {
              const availableBrands = categoryBrands.filter(b => brandStats[b]);
              if (availableBrands.length === 0) return null;
              
              return (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-slate-300 mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {availableBrands.map(brand => (
                      <Link
                        key={brand}
                        href={`/brands/${brand.toLowerCase().replace(/\s+/g, '-')}`}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-600 transition-all duration-300"
                      >
                        {brand}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
