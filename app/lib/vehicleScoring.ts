// Vehicle Scoring Algorithm
// Scores each vehicle against user preferences and returns top matches

import { Vehicle, vehicleDatabase } from './vehicleDatabase';

export interface UserPreferences {
  budget?: string;
  bodyStyle?: string[];
  brand?: string[];
  passengers?: string;
  primaryUse?: string;
  terrain?: string;
  weather?: string;
  commute?: string;
  drivingEnvironment?: string;
  towing?: string;
  cargo?: string;
  fuelEfficiency?: string;
  powertrain?: string;
  drivingStyle?: string;
  image?: string;
  weekendActivities?: string[];
  parkingSpace?: string;
  reliability?: string;
}

export interface ScoredVehicle {
  vehicle: Vehicle;
  score: number;
  matchReasons: string[];
}

// Budget mapping
const budgetRanges: Record<string, { min: number; max: number }> = {
  'under-25k': { min: 0, max: 25 },
  '25k-35k': { min: 0, max: 35 },
  '35k-50k': { min: 0, max: 50 },
  '50k-75k': { min: 0, max: 75 },
  '75k-100k': { min: 0, max: 100 },
  '100k-200k': { min: 0, max: 200 },
  '200k-plus': { min: 0, max: 10000 },
};

// Body type mapping from user selection to database types
const bodyTypeMapping: Record<string, string[]> = {
  'sedan': ['sedan'],
  'suv': ['suv', 'crossover'],
  'truck': ['truck'],
  'coupe': ['coupe', 'sports'],
  'hatchback': ['hatchback'],
  'wagon': ['wagon'],
  'minivan': ['minivan'],
  'convertible': ['convertible', 'sports'],
  'van': ['van'],
};

// Brand name normalization - maps user selection to database brand names
const brandNormalization: Record<string, string[]> = {
  'toyota': ['Toyota'],
  'honda': ['Honda'],
  'ford': ['Ford'],
  'chevrolet': ['Chevrolet'],
  'bmw': ['BMW'],
  'mercedes': ['Mercedes-Benz'],
  'audi': ['Audi'],
  'tesla': ['Tesla'],
  'lexus': ['Lexus'],
  'porsche': ['Porsche'],
  'mazda': ['Mazda'],
  'hyundai': ['Hyundai'],
  'kia': ['Kia'],
  'nissan': ['Nissan'],
  'subaru': ['Subaru'],
  'volkswagen': ['Volkswagen'],
  'dodge': ['Dodge'],
  'ram': ['Ram'],
  'jeep': ['Jeep'],
  'gmc': ['GMC'],
  'volvo': ['Volvo'],
  'jaguar': ['Jaguar'],
  'land-rover': ['Land Rover'],
  'acura': ['Acura'],
  'infiniti': ['Infiniti'],
  'genesis': ['Genesis'],
  'cadillac': ['Cadillac'],
  'lincoln': ['Lincoln'],
  'buick': ['Buick'],
  'chrysler': ['Chrysler'],
  'alfa-romeo': ['Alfa Romeo'],
  'fiat': ['Fiat'],
  'mini': ['Mini'],
  'mitsubishi': ['Mitsubishi'],
  'maserati': ['Maserati'],
  'ferrari': ['Ferrari'],
  'lamborghini': ['Lamborghini'],
  'mclaren': ['McLaren'],
  'aston-martin': ['Aston Martin'],
  'bentley': ['Bentley'],
  'rolls-royce': ['Rolls-Royce'],
  'bugatti': ['Bugatti'],
  'koenigsegg': ['Koenigsegg'],
  'rivian': ['Rivian'],
  'lucid': ['Lucid'],
  'polestar': ['Polestar'],
};

export function scoreVehicles(preferences: UserPreferences): ScoredVehicle[] {
  let candidates = [...vehicleDatabase];
  
  // Get budget range
  const budgetRange = preferences.budget ? budgetRanges[preferences.budget] : { min: 0, max: 10000 };
  
  // Get preferred body types
  const preferredBodyTypes: string[] = [];
  if (preferences.bodyStyle && preferences.bodyStyle.length > 0 && !preferences.bodyStyle.includes('none')) {
    preferences.bodyStyle.forEach(style => {
      const mapped = bodyTypeMapping[style];
      if (mapped) preferredBodyTypes.push(...mapped);
    });
  }
  
  // Get preferred brands
  const preferredBrands: string[] = [];
  if (preferences.brand && preferences.brand.length > 0 && !preferences.brand.includes('none')) {
    preferences.brand.forEach(brand => {
      const normalized = brandNormalization[brand.toLowerCase()];
      if (normalized) preferredBrands.push(...normalized);
    });
  }

  // =============================================
  // TIER 1: HARD FILTERS (Must Match)
  // =============================================
  
  // Budget filter - exclude vehicles more than 15% over budget
  candidates = candidates.filter(v => v.price <= budgetRange.max * 1.15);
  
  // Passenger capacity filter
  if (preferences.passengers) {
    const minSeats = preferences.passengers === '1' ? 1 : 
                     preferences.passengers === '2-3' ? 2 :
                     preferences.passengers === '4-5' ? 4 :
                     preferences.passengers === '6+' ? 6 : 1;
    candidates = candidates.filter(v => v.seats >= minSeats);
  }
  
  // Heavy towing filter - this is a hard requirement
  if (preferences.towing === 'heavy') {
    candidates = candidates.filter(v => 
      v.features.includes('heavy-towing') || v.features.includes('towing')
    );
  }

  // =============================================
  // TIER 2: EXPLICIT PREFERENCE FILTERS
  // When user specifies body style or brand, FILTER to only those
  // =============================================
  
  let bodyStyleFiltered = candidates;
  let brandFiltered = candidates;
  
  // Body style filter (if specified)
  if (preferredBodyTypes.length > 0) {
    bodyStyleFiltered = candidates.filter(v => preferredBodyTypes.includes(v.bodyType));
  }
  
  // Brand filter (if specified)  
  if (preferredBrands.length > 0) {
    brandFiltered = candidates.filter(v => preferredBrands.includes(v.brand));
  }
  
  // Determine final candidate pool based on filters
  let finalCandidates: Vehicle[];
  
  if (preferredBodyTypes.length > 0 && preferredBrands.length > 0) {
    // Both specified: intersection (must match both)
    finalCandidates = candidates.filter(v => 
      preferredBodyTypes.includes(v.bodyType) && preferredBrands.includes(v.brand)
    );
    
    // Fallback: if no vehicles match both, try body style only, then brand only
    if (finalCandidates.length < 3) {
      if (bodyStyleFiltered.length >= brandFiltered.length) {
        finalCandidates = bodyStyleFiltered; // Prioritize body style
      } else {
        finalCandidates = brandFiltered; // Prioritize brand
      }
    }
  } else if (preferredBodyTypes.length > 0) {
    finalCandidates = bodyStyleFiltered;
  } else if (preferredBrands.length > 0) {
    finalCandidates = brandFiltered;
  } else {
    finalCandidates = candidates;
  }
  
  // Final fallback: if we have fewer than 3 candidates, use original filtered candidates
  if (finalCandidates.length < 3) {
    finalCandidates = candidates;
  }

  // =============================================
  // TIER 3: WEIGHTED SCORING (Refinement)
  // =============================================
  
  const scoredVehicles: ScoredVehicle[] = [];
  
  for (const vehicle of finalCandidates) {
    let score = 50; // Base score
    const matchReasons: string[] = [];

    // --- BUDGET SCORING ---
    if (vehicle.price > budgetRange.max) {
      score -= 20; // Penalty for being over budget
    } else if (vehicle.price <= budgetRange.max * 0.7) {
      score += 15; // Bonus for being well within budget
      matchReasons.push('Within your budget');
    } else {
      score += 10;
    }

    // --- BODY STYLE SCORING ---
    if (preferredBodyTypes.length > 0) {
      if (preferredBodyTypes.includes(vehicle.bodyType)) {
        score += 40;
        matchReasons.push(`Matches your ${vehicle.bodyType} preference`);
      }
      // No penalty since we already filtered
    }

    // --- BRAND SCORING ---
    if (preferredBrands.length > 0) {
      if (preferredBrands.includes(vehicle.brand)) {
        score += 35;
        matchReasons.push(`Your preferred brand: ${vehicle.brand}`);
      }
      // No penalty since we already filtered
    }

    // --- PASSENGER CAPACITY BONUS ---
    if (preferences.passengers === '6+' && vehicle.seats >= 7) {
      score += 15;
      matchReasons.push(`Seats ${vehicle.seats} passengers`);
    } else if (preferences.passengers === '6+' && vehicle.seats >= 6) {
      score += 8;
    }

    // --- PRIMARY USE ---
    if (preferences.primaryUse) {
      const use = preferences.primaryUse;
      const vehicleUses = vehicle.useCases || [];
      
      if (use === 'commute' && vehicleUses.includes('commuter')) {
        score += 25;
        matchReasons.push('Great for commuting');
      } else if (use === 'family' && vehicleUses.includes('family')) {
        score += 25;
        matchReasons.push('Family-friendly');
      } else if (use === 'work' && vehicleUses.includes('work')) {
        score += 25;
        matchReasons.push('Built for work');
      } else if (use === 'recreation' && (vehicleUses.includes('fun') || vehicleUses.includes('enthusiast'))) {
        score += 25;
        matchReasons.push('Fun for recreation');
      } else if (use === 'adventure' && (vehicleUses.includes('adventure') || vehicleUses.includes('offroad'))) {
        score += 25;
        matchReasons.push('Adventure-ready');
      }
    }

    // --- TOWING ---
    if (preferences.towing === 'heavy') {
      if (vehicle.features.includes('heavy-towing')) {
        score += 25;
        matchReasons.push('Heavy towing capability');
      }
    } else if (preferences.towing === 'light' || preferences.towing === 'occasional') {
      if (vehicle.features.includes('towing') || vehicle.features.includes('heavy-towing')) {
        score += 15;
        matchReasons.push('Towing capable');
      }
    }

    // --- TERRAIN / OFF-ROAD ---
    if (preferences.terrain === 'offroad' || preferences.terrain === 'mountain') {
      if (vehicle.features.includes('offroad')) {
        score += 25;
        matchReasons.push('Off-road capable');
      } else if (vehicle.features.includes('awd')) {
        score += 15;
      }
    }

    // --- WEATHER (AWD for snow) ---
    if (preferences.weather === 'snow') {
      if (vehicle.features.includes('awd')) {
        score += 20;
        matchReasons.push('AWD for winter driving');
      } else if (vehicle.features.includes('awd-available')) {
        score += 10;
      }
    }

    // --- POWERTRAIN ---
    if (preferences.powertrain) {
      if (preferences.powertrain === 'electric' && vehicle.powertrain === 'ev') {
        score += 30;
        matchReasons.push('Fully electric');
      } else if (preferences.powertrain === 'hybrid' && (vehicle.powertrain === 'hybrid' || vehicle.powertrain === 'phev')) {
        score += 25;
        matchReasons.push('Hybrid efficiency');
      } else if (preferences.powertrain === 'phev' && vehicle.powertrain === 'phev') {
        score += 30;
        matchReasons.push('Plug-in hybrid flexibility');
      } else if (preferences.powertrain === 'gas' && vehicle.powertrain === 'gas') {
        score += 5;
      } else if (preferences.powertrain === 'electric' && vehicle.powertrain !== 'ev') {
        score -= 15; // Penalty for non-EV when EV requested
      }
    }

    // --- CARGO NEEDS ---
    if (preferences.cargo === 'maximum') {
      if (vehicle.features.includes('cargo') || 
          ['suv', 'truck', 'wagon', 'van', 'minivan'].includes(vehicle.bodyType)) {
        score += 20;
        matchReasons.push('Excellent cargo space');
      }
    }

    // --- DRIVING STYLE ---
    if (preferences.drivingStyle === 'performance' || preferences.drivingStyle === 'sporty') {
      if (vehicle.features.includes('performance') || vehicle.features.includes('sporty') || 
          vehicle.segment === 'exotic' || vehicle.useCases.includes('enthusiast')) {
        score += 20;
        matchReasons.push('Performance oriented');
      }
    } else if (preferences.drivingStyle === 'comfort') {
      if (vehicle.features.includes('comfort') || vehicle.segment === 'luxury' || vehicle.segment === 'premium') {
        score += 15;
        matchReasons.push('Comfortable ride');
      }
    }

    // --- IMAGE PREFERENCE ---
    if (preferences.image === 'luxury') {
      if (vehicle.segment === 'luxury' || vehicle.segment === 'exotic') {
        score += 15;
        matchReasons.push('Luxury status');
      }
    } else if (preferences.image === 'eco') {
      if (vehicle.powertrain === 'ev' || vehicle.powertrain === 'hybrid' || vehicle.useCases.includes('eco')) {
        score += 15;
        matchReasons.push('Eco-friendly choice');
      }
    } else if (preferences.image === 'rugged') {
      if (vehicle.features.includes('offroad') || vehicle.bodyType === 'truck' || vehicle.useCases.includes('adventure')) {
        score += 15;
        matchReasons.push('Rugged capability');
      }
    }

    // --- FUEL EFFICIENCY ---
    if (preferences.fuelEfficiency === 'very-important') {
      if (vehicle.powertrain === 'ev') {
        score += 20;
        matchReasons.push('Zero emissions');
      } else if (vehicle.powertrain === 'hybrid' || vehicle.powertrain === 'phev') {
        score += 15;
        matchReasons.push('Excellent fuel efficiency');
      } else if (vehicle.features.includes('efficient')) {
        score += 10;
      }
    }

    // --- RELIABILITY ---
    if (preferences.reliability === 'very-important') {
      const reliableBrands = ['Toyota', 'Lexus', 'Honda', 'Acura', 'Mazda', 'Subaru'];
      if (reliableBrands.includes(vehicle.brand)) {
        score += 15;
        matchReasons.push('Known for reliability');
      } else if (vehicle.features.includes('reliable')) {
        score += 10;
      }
    }

    // --- DRIVING ENVIRONMENT ---
    if (preferences.drivingEnvironment === 'city') {
      if (vehicle.size === 'subcompact' || vehicle.size === 'compact') {
        score += 10;
        matchReasons.push('Perfect for city driving');
      }
    }

    // --- PARKING ---
    if (preferences.parkingSpace === 'tight') {
      if (vehicle.size === 'subcompact' || vehicle.size === 'compact') {
        score += 10;
      }
      if (vehicle.size === 'fullsize') {
        score -= 10;
      }
    }

    // --- SEGMENT BONUS ---
    if (vehicle.segment === 'premium') score += 3;
    if (vehicle.segment === 'luxury') score += 5;

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
// Get category name based on top vehicle types
export function getCategoryName(vehicles: ScoredVehicle[]): { name: string; description: string } {
  if (vehicles.length === 0) {
    return { name: 'Vehicle', description: 'We found some matches for you' };
  }

  const topVehicle = vehicles[0].vehicle;
  const bodyTypeCounts: Record<string, number> = {};
  
  vehicles.slice(0, 5).forEach(sv => {
    bodyTypeCounts[sv.vehicle.bodyType] = (bodyTypeCounts[sv.vehicle.bodyType] || 0) + 1;
  });

  const dominantType = Object.entries(bodyTypeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || topVehicle.bodyType;

  const categoryInfo: Record<string, { name: string; description: string }> = {
    'sedan': { name: 'Sedan', description: 'Classic four-door comfort with excellent value and reliability' },
    'suv': { name: 'SUV', description: 'Versatile family vehicles with space and capability' },
    'crossover': { name: 'Crossover', description: 'The perfect blend of sedan efficiency and SUV versatility' },
    'truck': { name: 'Truck', description: 'Built for work and play with maximum capability' },
    'hatchback': { name: 'Hatchback', description: 'Versatile cars combining practicality with fun driving' },
    'coupe': { name: 'Sports Coupe', description: 'Sporty two-doors focused on style and performance' },
    'wagon': { name: 'Wagon', description: 'Car-like driving with SUV-level cargo space' },
    'minivan': { name: 'Minivan', description: 'Ultimate family vehicle with unmatched practicality' },
    'van': { name: 'Van', description: 'Maximum cargo and passenger capacity' },
    'convertible': { name: 'Convertible', description: 'Open-top driving pleasure' },
    'sports': { name: 'Sports Car', description: 'High-performance vehicles for enthusiasts' },
  };

  return categoryInfo[dominantType] || { name: 'Vehicle', description: 'Matched to your preferences' };
}
