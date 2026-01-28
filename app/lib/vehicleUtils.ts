// Vehicle utility functions for sorting and filtering
import { Vehicle } from './vehicleDatabase';

// Brand popularity rankings (lower = more popular)
export const brandPopularity: Record<string, number> = {
  'Toyota': 1, 'Honda': 2, 'Ford': 3, 'Chevrolet': 4, 'Nissan': 5,
  'Hyundai': 6, 'Kia': 7, 'Jeep': 8, 'Subaru': 9, 'GMC': 10,
  'Ram': 11, 'Mazda': 12, 'Volkswagen': 13, 'BMW': 14, 'Mercedes-Benz': 15,
  'Lexus': 16, 'Audi': 17, 'Tesla': 18, 'Dodge': 19, 'Chrysler': 20,
  'Buick': 21, 'Cadillac': 22, 'Acura': 23, 'Infiniti': 24, 'Lincoln': 25,
  'Volvo': 26, 'Genesis': 27, 'Mitsubishi': 28, 'Mini': 29, 'Jaguar': 30,
  'Land Rover': 31, 'Alfa Romeo': 32, 'Porsche': 33, 'Rivian': 34, 'Lucid': 35,
  'Polestar': 36, 'Maserati': 37, 'Lotus': 38, 'Aston Martin': 39, 'Bentley': 40,
  'Ferrari': 41, 'Lamborghini': 42, 'McLaren': 43, 'Rolls-Royce': 44,
  'Bugatti': 45, 'Pagani': 46, 'Koenigsegg': 47,
};

// Model popularity boost (specific popular models get priority)
export const modelPopularityBoost: Record<string, number> = {
  'Toyota RAV4': -50, 'Toyota Camry': -50, 'Toyota Corolla': -45, 'Toyota Highlander': -40,
  'Honda CR-V': -50, 'Honda Civic': -45, 'Honda Accord': -45, 'Honda Pilot': -35,
  'Ford F-150': -55, 'Ford Explorer': -40, 'Ford Bronco': -35, 'Ford Mustang': -35,
  'Chevrolet Silverado 1500': -50, 'Chevrolet Equinox': -35, 'Chevrolet Tahoe': -30,
  'Tesla Model Y': -45, 'Tesla Model 3': -45,
  'Jeep Wrangler': -40, 'Jeep Grand Cherokee': -40,
  'Ram 1500': -45,
  'Nissan Rogue': -35, 'Hyundai Tucson': -30, 'Kia Telluride': -35,
  'Toyota Tacoma': -40, 'Toyota Tundra': -30,
  'Mazda CX-5': -30, 'Subaru Outback': -30, 'Subaru Forester': -25,
};

export function getPopularityScore(vehicle: Vehicle): number {
  const brandScore = brandPopularity[vehicle.brand] || 50;
  const modelBoost = modelPopularityBoost[vehicle.name] || 0;
  return brandScore + modelBoost;
}

export function sortByPopularity<T extends Vehicle>(vehicles: T[]): T[] {
  return [...vehicles].sort((a, b) => getPopularityScore(a) - getPopularityScore(b));
}

// Brand color gradients
export const brandGradients: Record<string, string> = {
  'Acura': 'from-slate-700 to-slate-900',
  'Alfa Romeo': 'from-red-800 to-red-950',
  'Aston Martin': 'from-emerald-700 to-emerald-900',
  'Audi': 'from-slate-700 to-slate-900',
  'Bentley': 'from-slate-700 to-slate-900',
  'BMW': 'from-blue-600 to-blue-800',
  'Bugatti': 'from-blue-800 to-blue-950',
  'Buick': 'from-slate-600 to-slate-800',
  'Cadillac': 'from-slate-700 to-slate-900',
  'Chevrolet': 'from-yellow-500 to-yellow-700',
  'Chrysler': 'from-blue-700 to-blue-900',
  'Dodge': 'from-red-600 to-red-800',
  'Ferrari': 'from-red-600 to-red-900',
  'Ford': 'from-blue-600 to-blue-800',
  'Genesis': 'from-slate-700 to-slate-900',
  'GMC': 'from-red-700 to-red-900',
  'Honda': 'from-red-500 to-red-700',
  'Hyundai': 'from-blue-600 to-blue-800',
  'Infiniti': 'from-slate-600 to-slate-800',
  'Jaguar': 'from-green-700 to-green-900',
  'Jeep': 'from-green-700 to-green-900',
  'Kia': 'from-red-600 to-red-800',
  'Koenigsegg': 'from-amber-600 to-amber-800',
  'Lamborghini': 'from-yellow-500 to-orange-600',
  'Land Rover': 'from-green-700 to-green-900',
  'Lexus': 'from-slate-700 to-slate-900',
  'Lincoln': 'from-slate-700 to-slate-900',
  'Lotus': 'from-green-600 to-green-800',
  'Lucid': 'from-slate-600 to-slate-800',
  'Maserati': 'from-blue-700 to-blue-900',
  'Mazda': 'from-red-600 to-red-800',
  'McLaren': 'from-orange-500 to-orange-700',
  'Mercedes-Benz': 'from-slate-600 to-slate-800',
  'Mercedes-AMG': 'from-slate-600 to-slate-800',
  'Mini': 'from-slate-700 to-slate-900',
  'Mitsubishi': 'from-red-600 to-red-800',
  'Nissan': 'from-red-600 to-red-800',
  'Pagani': 'from-slate-600 to-blue-900',
  'Polestar': 'from-amber-500 to-amber-700',
  'Porsche': 'from-slate-600 to-slate-800',
  'Ram': 'from-slate-700 to-slate-900',
  'Rivian': 'from-amber-600 to-amber-800',
  'Rolls-Royce': 'from-purple-900 to-slate-900',
  'Subaru': 'from-blue-600 to-blue-800',
  'Tesla': 'from-red-600 to-slate-800',
  'Toyota': 'from-red-600 to-red-800',
  'Volkswagen': 'from-blue-600 to-blue-800',
  'Volvo': 'from-blue-700 to-blue-900',
};

export function getBrandGradient(brand: string): string {
  return brandGradients[brand] || 'from-slate-700 to-slate-900';
}
