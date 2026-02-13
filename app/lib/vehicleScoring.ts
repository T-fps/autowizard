// Vehicle scoring system for quiz recommendations
import { Vehicle, vehicleDatabase } from './vehicleDatabase';

export interface ScoredVehicle {
  vehicle: Vehicle;
  score: number;
  matchReasons: string[];
}

export interface UserPreferences {
  budget?: string;
  bodyStyle?: string[];
  brand?: string[];
  passengers?: string;
  primaryUse?: string[] | string;
  weather?: string[] | string;
  commute?: string;
  drivingEnvironment?: string[] | string;
  cargoTowing?: string[] | string;
  powertrain?: string;
  parkingSpace?: string;
  mustHaves?: string[];
  drivingExperience?: string;
  vehicleCharacter?: string[] | string;
  capabilityPreference?: string;
  statusImage?: string;
  environmentalValues?: string;
  reliabilityVsInnovation?: string;
  emotionalConnection?: string;
  ownershipPriorities?: string[];
}

const budgetRanges: Record<string, { min: number; max: number }> = {
  'under-25k': { min: 0, max: 25 },
  '25k-35k': { min: 25, max: 35 },
  '35k-50k': { min: 35, max: 50 },
  '50k-75k': { min: 50, max: 75 },
  '75k-100k': { min: 75, max: 100 },
  '100k-200k': { min: 100, max: 200 },
  '200k-plus': { min: 200, max: 10000 },
};

export function scoreVehicles(preferences: UserPreferences): ScoredVehicle[] {
  const scoredVehicles: ScoredVehicle[] = [];

  for (const vehicle of vehicleDatabase) {
    let score = 0;
    const matchReasons: string[] = [];

    // Budget scoring (most important)
    if (preferences.budget && budgetRanges[preferences.budget]) {
      const range = budgetRanges[preferences.budget];
      if (vehicle.price >= range.min && vehicle.price <= range.max) {
        score += 30;
        matchReasons.push(`Within your ${preferences.budget.replace(/-/g, ' ')} budget`);
      } else if (vehicle.price < range.min) {
        score += 20; // Under budget is okay
        matchReasons.push('Under budget - great value');
      } else if (vehicle.price <= range.max * 1.1) {
        score += 10; // Slightly over budget
      }
    }

    // Body style matching
    const bodyStyles = Array.isArray(preferences.bodyStyle) ? preferences.bodyStyle : [];
    if (bodyStyles.length > 0 && !bodyStyles.includes('recommend')) {
      if (bodyStyles.includes(vehicle.bodyType)) {
        score += 20;
        matchReasons.push(`Matches your preferred ${vehicle.bodyType} body style`);
      }
      if (bodyStyles.includes('offroad-suv') && vehicle.features.includes('offroad')) {
        score += 15;
        matchReasons.push('Off-road capable SUV');
      }
    }

    // Brand preference
    const brands = Array.isArray(preferences.brand) ? preferences.brand : [];
    if (brands.length > 0 && !brands.includes('none')) {
      if (brands.includes(vehicle.brand.toLowerCase())) {
        score += 15;
        matchReasons.push(`${vehicle.brand} - one of your preferred brands`);
      }
    }

    // Passenger capacity
    if (preferences.passengers) {
      const requiredSeats = preferences.passengers === '6+' ? 6 : 
        preferences.passengers === '4-5' ? 5 :
        preferences.passengers === '2-3' ? 3 : 2;
      
      if (vehicle.seats >= requiredSeats) {
        score += 15;
        if (vehicle.seats >= 7 && requiredSeats >= 5) {
          matchReasons.push(`Seats ${vehicle.seats} - perfect for your family`);
        }
      }
    }

    // Primary use matching
    const primaryUses = Array.isArray(preferences.primaryUse) ? preferences.primaryUse : 
      preferences.primaryUse ? [preferences.primaryUse] : [];
    
    for (const use of primaryUses) {
      if (use === 'commute' && (vehicle.mpgCity >= 25 || vehicle.powertrain === 'ev' || vehicle.powertrain === 'hybrid')) {
        score += 10;
        matchReasons.push('Great for daily commuting');
      }
      if (use === 'family' && vehicle.useCases.includes('family')) {
        score += 10;
        matchReasons.push('Family-friendly features');
      }
      if (use === 'adventure' && vehicle.features.includes('offroad')) {
        score += 10;
        matchReasons.push('Adventure-ready capability');
      }
      if (use === 'work' && (vehicle.features.includes('towing') || vehicle.bodyType === 'truck')) {
        score += 10;
        matchReasons.push('Built for work tasks');
      }
    }

    // Weather/AWD
    const weatherPrefs = Array.isArray(preferences.weather) ? preferences.weather :
      preferences.weather ? [preferences.weather] : [];
    
    if (weatherPrefs.includes('snow') || weatherPrefs.includes('all')) {
      if (vehicle.features.includes('awd') || vehicle.features.includes('4wd')) {
        score += 10;
        matchReasons.push('All-wheel drive for all-weather confidence');
      }
    }

    // Powertrain preference
    if (preferences.powertrain && preferences.powertrain !== 'any') {
      if (preferences.powertrain === 'electric' && vehicle.powertrain === 'ev') {
        score += 15;
        matchReasons.push('Zero-emission electric powertrain');
      }
      if (preferences.powertrain === 'hybrid' && (vehicle.powertrain === 'hybrid' || vehicle.powertrain === 'phev')) {
        score += 15;
        matchReasons.push('Hybrid efficiency');
      }
      if (preferences.powertrain === 'gas' && vehicle.powertrain === 'gas') {
        score += 10;
      }
    }

    // Environmental values
    if (preferences.environmentalValues === 'top-priority') {
      if (vehicle.powertrain === 'ev') {
        score += 15;
        matchReasons.push('Zero emissions - aligns with your environmental values');
      } else if (vehicle.powertrain === 'hybrid' || vehicle.powertrain === 'phev') {
        score += 10;
      }
    }

    // Driving experience
    if (preferences.drivingExperience === 'engaging' && vehicle.features.includes('performance')) {
      score += 10;
      matchReasons.push('Engaging driving dynamics');
    }
    if (preferences.drivingExperience === 'comfort' && vehicle.features.includes('comfort')) {
      score += 10;
      matchReasons.push('Comfortable ride quality');
    }
    if (preferences.drivingExperience === 'commanding' && (vehicle.bodyType === 'suv' || vehicle.bodyType === 'truck')) {
      score += 10;
      matchReasons.push('Commanding driving position');
    }

    // Vehicle character
    const characters = Array.isArray(preferences.vehicleCharacter) ? preferences.vehicleCharacter :
      preferences.vehicleCharacter ? [preferences.vehicleCharacter] : [];
    
    for (const char of characters) {
      if (char === 'rugged' && vehicle.features.includes('offroad')) {
        score += 8;
      }
      if (char === 'sophisticated' && (vehicle.segment === 'luxury' || vehicle.segment === 'premium')) {
        score += 8;
        matchReasons.push('Sophisticated luxury experience');
      }
      if (char === 'sporty' && vehicle.features.includes('performance')) {
        score += 8;
      }
      if (char === 'practical' && vehicle.useCases.includes('family')) {
        score += 8;
      }
    }

    // Reliability preference
    const reliableBrands = ['Toyota', 'Lexus', 'Honda', 'Acura', 'Mazda'];
    if (preferences.reliabilityVsInnovation === 'reliability' && reliableBrands.includes(vehicle.brand)) {
      score += 10;
      matchReasons.push(`${vehicle.brand}'s excellent reliability reputation`);
    }

    // Must-haves
    const mustHaves = preferences.mustHaves || [];
    if (mustHaves.includes('awd') && (vehicle.features.includes('awd') || vehicle.features.includes('4wd'))) {
      score += 10;
    }
    if (mustHaves.includes('third-row') && vehicle.seats >= 7) {
      score += 10;
      matchReasons.push('Third-row seating');
    }

    scoredVehicles.push({
      vehicle,
      score,
      matchReasons: matchReasons.slice(0, 5),
    });
  }

  // Sort by score descending
  scoredVehicles.sort((a, b) => b.score - a.score);

  return scoredVehicles;
}

export function getCategoryName(vehicles: ScoredVehicle[]): { name: string; description: string } {
  if (vehicles.length === 0) {
    return { name: 'Versatile Options', description: 'A variety of vehicles that could work for you.' };
  }

  const topVehicle = vehicles[0].vehicle;
  
  const categoryNames: Record<string, { name: string; description: string }> = {
    'sedan': { name: 'Sedan', description: 'Classic four-door comfort with excellent value and reliability.' },
    'suv': { name: 'SUV', description: 'Spacious and versatile vehicles for families and adventure.' },
    'crossover': { name: 'Crossover', description: 'The perfect blend of sedan efficiency and SUV versatility.' },
    'truck': { name: 'Pickup Truck', description: 'Capable trucks for work and play.' },
    'hatchback': { name: 'Hatchback', description: 'Practical and fun-to-drive compact cars.' },
    'coupe': { name: 'Sports Coupe', description: 'Stylish two-door vehicles focused on performance.' },
    'minivan': { name: 'Minivan', description: 'The ultimate family vehicle with unmatched practicality.' },
    'convertible': { name: 'Convertible', description: 'Open-top driving pleasure.' },
    'wagon': { name: 'Wagon', description: 'Car-like driving with SUV-level cargo space.' },
    'sports': { name: 'Sports Car', description: 'High-performance vehicles for driving enthusiasts.' },
  };

  return categoryNames[topVehicle.bodyType] || { name: 'Your Matches', description: 'Vehicles selected based on your preferences.' };
}
