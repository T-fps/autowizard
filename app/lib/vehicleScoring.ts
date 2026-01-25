// Vehicle Scoring Algorithm v2.0
// Scores vehicles against both PRACTICAL NEEDS and PERSONAL VALUES

import { Vehicle, vehicleDatabase } from './vehicleDatabase';

export interface UserPreferences {
  // Practical needs
  budget?: string;
  bodyStyle?: string[];
  brand?: string[];
  passengers?: string;
  primaryUse?: string;
  weather?: string;
  commute?: string;
  drivingEnvironment?: string;
  cargoTowing?: string;
  powertrain?: string;
  parkingSpace?: string;
  mustHaves?: string[];
  
  // Personal values
  drivingExperience?: string;
  vehicleCharacter?: string;
  capabilityPreference?: string;
  statusImage?: string;
  environmentalValues?: string;
  reliabilityVsInnovation?: string;
  emotionalConnection?: string;
  ownershipPriorities?: string[];
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

// Off-road capable vehicles (for offroad-suv body style filter)
const offroadVehicles = [
  'Ford Bronco', 'Ford Bronco Sport', 'Ford Bronco Raptor',
  'Toyota 4Runner', 'Toyota 4Runner TRD Pro', 'Toyota Land Cruiser',
  'Jeep Wrangler', 'Jeep Wrangler 4xe', 'Jeep Wrangler Rubicon 392', 'Jeep Gladiator',
  'Jeep Grand Cherokee', 'Jeep Grand Cherokee 4xe', 'Jeep Grand Cherokee L',
  'Land Rover Defender 90', 'Land Rover Defender 110', 'Land Rover Defender 130',
  'Land Rover Discovery', 'Range Rover', 'Range Rover Sport',
  'Lexus GX', 'Lexus LX',
  'Toyota Tacoma', 'Toyota Tacoma TRD Pro', 'Toyota Tundra', 'Toyota Tundra TRD Pro',
  'Chevrolet Colorado', 'Chevrolet Colorado ZR2', 'GMC Canyon', 'GMC Canyon AT4X',
  'Ford Ranger', 'Ford F-150 Raptor', 'Ford F-150 Raptor R',
  'Ram 1500 TRX', 'Ram 1500 Rebel',
  'GMC Sierra AT4X', 'Chevrolet Silverado ZR2',
  'Rivian R1T', 'Rivian R1S',
  'GMC Hummer EV Pickup', 'GMC Hummer EV SUV',
  'Subaru Outback Wilderness', 'Subaru Forester Wilderness', 'Subaru Crosstrek Wilderness',
];

// Body type mapping from user selection to database types
const bodyTypeMapping: Record<string, string[]> = {
  'sedan': ['sedan'],
  'suv': ['suv', 'crossover'],
  'truck': ['truck'],
  'offroad-suv': ['suv', 'truck'], // Special handling - filters by offroadVehicles list
  'coupe': ['coupe', 'sports'],
  'hatchback': ['hatchback'],
  'wagon': ['wagon'],
  'minivan': ['minivan'],
  'convertible': ['convertible', 'sports'],
  'van': ['van'],
};

// Brand name normalization
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

// Determine recommended body styles based on values (when user selects "recommend")
function getRecommendedBodyStyles(preferences: UserPreferences): string[] {
  const recommended: string[] = [];
  
  // Based on vehicle character
  if (preferences.vehicleCharacter === 'rugged') {
    recommended.push('truck', 'offroad-suv');
  } else if (preferences.vehicleCharacter === 'sporty') {
    recommended.push('coupe', 'sedan');
  } else if (preferences.vehicleCharacter === 'sophisticated') {
    recommended.push('sedan', 'suv');
  } else if (preferences.vehicleCharacter === 'practical') {
    recommended.push('suv', 'sedan');
  }
  
  // Based on capability preference
  if (preferences.capabilityPreference === 'want-capability') {
    if (!recommended.includes('truck')) recommended.push('truck');
    if (!recommended.includes('offroad-suv')) recommended.push('offroad-suv');
  }
  
  // Based on emotional connection
  if (preferences.emotionalConnection === 'adventure') {
    if (!recommended.includes('offroad-suv')) recommended.push('offroad-suv');
    if (!recommended.includes('truck')) recommended.push('truck');
  } else if (preferences.emotionalConnection === 'driving-joy') {
    if (!recommended.includes('coupe')) recommended.push('coupe');
    if (!recommended.includes('sedan')) recommended.push('sedan');
  }
  
  // Based on passengers
  if (preferences.passengers === '6+') {
    recommended.length = 0; // Clear and reset
    recommended.push('suv', 'minivan');
  }
  
  // Based on cargo/towing needs
  if (preferences.cargoTowing === 'heavy' || preferences.cargoTowing === 'towing') {
    recommended.length = 0;
    recommended.push('truck', 'suv');
  }
  
  // Default to SUV + sedan if nothing specific
  if (recommended.length === 0) {
    recommended.push('suv', 'sedan');
  }
  
  // Limit to 2 body styles
  return recommended.slice(0, 2);
}

export function scoreVehicles(preferences: UserPreferences): ScoredVehicle[] {
  let candidates = [...vehicleDatabase];
  
  // Get budget range
  const budgetRange = preferences.budget ? budgetRanges[preferences.budget] : { min: 0, max: 10000 };
  
  // Handle body style - check if user wants recommendations
  let bodyStyleSelections = preferences.bodyStyle || [];
  if (bodyStyleSelections.includes('recommend') || bodyStyleSelections.length === 0) {
    bodyStyleSelections = getRecommendedBodyStyles(preferences);
  }
  
  // Get preferred body types
  const preferredBodyTypes: string[] = [];
  const wantsOffroadSuv = bodyStyleSelections.includes('offroad-suv');
  
  bodyStyleSelections.forEach(style => {
    if (style !== 'recommend' && style !== 'none') {
      const mapped = bodyTypeMapping[style];
      if (mapped) preferredBodyTypes.push(...mapped);
    }
  });
  
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
  
  // Heavy towing filter - hard requirement
  if (preferences.cargoTowing === 'heavy') {
    candidates = candidates.filter(v => 
      v.features.includes('heavy-towing') || v.features.includes('towing')
    );
  }
  
  // Third row seating requirement
  if (preferences.mustHaves?.includes('third-row')) {
    candidates = candidates.filter(v => v.seats >= 7);
  }
  
  // AWD requirement
  if (preferences.mustHaves?.includes('awd')) {
    candidates = candidates.filter(v => v.features.includes('awd') || v.features.includes('offroad'));
  }

  // =============================================
  // TIER 2: BODY STYLE FILTER (Hard filter when specified)
  // =============================================
  
  let bodyStyleFiltered = candidates;
  
  if (preferredBodyTypes.length > 0) {
    if (wantsOffroadSuv) {
      // Special handling for off-road SUV selection
      bodyStyleFiltered = candidates.filter(v => 
        offroadVehicles.some(name => v.name.includes(name) || name.includes(v.name)) ||
        (v.features.includes('offroad') && (v.bodyType === 'suv' || v.bodyType === 'truck'))
      );
    } else {
      bodyStyleFiltered = candidates.filter(v => preferredBodyTypes.includes(v.bodyType));
    }
  }
  
  // Brand filter
  let brandFiltered = candidates;
  if (preferredBrands.length > 0) {
    brandFiltered = candidates.filter(v => preferredBrands.includes(v.brand));
  }
  
  // Determine final candidate pool
  let finalCandidates: Vehicle[];
  
  if (preferredBodyTypes.length > 0 && preferredBrands.length > 0) {
    // Both specified: intersection
    if (wantsOffroadSuv) {
      finalCandidates = brandFiltered.filter(v => 
        offroadVehicles.some(name => v.name.includes(name) || name.includes(v.name)) ||
        (v.features.includes('offroad') && (v.bodyType === 'suv' || v.bodyType === 'truck'))
      );
    } else {
      finalCandidates = candidates.filter(v => 
        preferredBodyTypes.includes(v.bodyType) && preferredBrands.includes(v.brand)
      );
    }
    
    // Fallback if too few matches
    if (finalCandidates.length < 3) {
      finalCandidates = bodyStyleFiltered.length >= brandFiltered.length ? bodyStyleFiltered : brandFiltered;
    }
  } else if (preferredBodyTypes.length > 0) {
    finalCandidates = bodyStyleFiltered;
  } else if (preferredBrands.length > 0) {
    finalCandidates = brandFiltered;
  } else {
    finalCandidates = candidates;
  }
  
  // Final fallback
  if (finalCandidates.length < 3) {
    finalCandidates = candidates;
  }

  // =============================================
  // TIER 3: WEIGHTED SCORING (Practical + Values)
  // =============================================
  
  const scoredVehicles: ScoredVehicle[] = [];
  
  for (const vehicle of finalCandidates) {
    let score = 50; // Base score
    const matchReasons: string[] = [];

    // --- BUDGET SCORING ---
    if (vehicle.price > budgetRange.max) {
      score -= 20;
    } else if (vehicle.price <= budgetRange.max * 0.7) {
      score += 15;
      matchReasons.push('Well within budget');
    } else {
      score += 10;
    }

    // --- BODY STYLE SCORING ---
    if (preferredBodyTypes.length > 0 && preferredBodyTypes.includes(vehicle.bodyType)) {
      score += 40;
      matchReasons.push(`Matches your ${vehicle.bodyType} preference`);
    }
    
    // Off-road SUV bonus
    if (wantsOffroadSuv && (offroadVehicles.some(name => vehicle.name.includes(name)) || vehicle.features.includes('offroad'))) {
      score += 30;
      matchReasons.push('Off-road capable');
    }

    // --- BRAND SCORING ---
    if (preferredBrands.length > 0 && preferredBrands.includes(vehicle.brand)) {
      score += 35;
      matchReasons.push(`Your preferred brand: ${vehicle.brand}`);
    }

    // --- PASSENGER CAPACITY ---
    if (preferences.passengers === '6+' && vehicle.seats >= 7) {
      score += 15;
      matchReasons.push(`Seats ${vehicle.seats} passengers`);
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

    // --- CARGO/TOWING ---
    if (preferences.cargoTowing === 'heavy' || preferences.cargoTowing === 'towing') {
      if (vehicle.features.includes('heavy-towing')) {
        score += 25;
        matchReasons.push('Heavy towing capability');
      } else if (vehicle.features.includes('towing')) {
        score += 15;
        matchReasons.push('Towing capable');
      }
    } else if (preferences.cargoTowing === 'large') {
      if (vehicle.features.includes('cargo') || ['suv', 'truck', 'wagon', 'minivan'].includes(vehicle.bodyType)) {
        score += 15;
        matchReasons.push('Excellent cargo space');
      }
    }

    // --- WEATHER (AWD for snow) ---
    if (preferences.weather === 'snow') {
      if (vehicle.features.includes('awd')) {
        score += 20;
        matchReasons.push('AWD for winter driving');
      }
    }

    // --- POWERTRAIN ---
    if (preferences.powertrain && preferences.powertrain !== 'any') {
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
        score -= 15;
      }
    }

    // --- PARKING ---
    if (preferences.parkingSpace === 'tight' || preferences.parkingSpace === 'street') {
      if (vehicle.size === 'subcompact' || vehicle.size === 'compact') {
        score += 10;
        matchReasons.push('Easy to maneuver and park');
      }
      if (vehicle.size === 'fullsize') {
        score -= 10;
      }
    }

    // =============================================
    // VALUES-BASED SCORING (NEW)
    // =============================================

    // --- DRIVING EXPERIENCE ---
    if (preferences.drivingExperience) {
      const exp = preferences.drivingExperience;
      if (exp === 'comfort' && (vehicle.features.includes('comfort') || vehicle.segment === 'luxury')) {
        score += 20;
        matchReasons.push('Smooth, comfortable ride');
      } else if (exp === 'engaging' && (vehicle.features.includes('sporty') || vehicle.features.includes('performance'))) {
        score += 20;
        matchReasons.push('Engaging driving dynamics');
      } else if (exp === 'commanding' && (vehicle.bodyType === 'suv' || vehicle.bodyType === 'truck')) {
        score += 15;
        matchReasons.push('Commanding driving position');
      } else if (exp === 'efficient' && (vehicle.powertrain === 'hybrid' || vehicle.powertrain === 'ev' || vehicle.features.includes('efficient'))) {
        score += 20;
        matchReasons.push('Excellent efficiency');
      }
    }

    // --- VEHICLE CHARACTER ---
    if (preferences.vehicleCharacter) {
      const char = preferences.vehicleCharacter;
      if (char === 'rugged' && (vehicle.features.includes('offroad') || vehicle.bodyType === 'truck')) {
        score += 25;
        matchReasons.push('Rugged and capable');
      } else if (char === 'sophisticated' && (vehicle.segment === 'luxury' || vehicle.segment === 'premium')) {
        score += 20;
        matchReasons.push('Sophisticated and refined');
      } else if (char === 'sporty' && (vehicle.features.includes('performance') || vehicle.features.includes('sporty'))) {
        score += 25;
        matchReasons.push('Sporty character');
      } else if (char === 'practical' && vehicle.features.includes('reliable')) {
        score += 15;
        matchReasons.push('Practical and sensible');
      } else if (char === 'tech' && vehicle.powertrain === 'ev') {
        score += 20;
        matchReasons.push('Tech-forward');
      }
    }

    // --- CAPABILITY PREFERENCE ---
    if (preferences.capabilityPreference) {
      const cap = preferences.capabilityPreference;
      if ((cap === 'want-capability' || cap === 'like-capability') && 
          (vehicle.features.includes('offroad') || vehicle.features.includes('towing') || vehicle.features.includes('awd'))) {
        score += 20;
        matchReasons.push('Extra capability you want');
      } else if (cap === 'prefer-efficiency' && (vehicle.powertrain === 'hybrid' || vehicle.powertrain === 'ev')) {
        score += 15;
        matchReasons.push('Efficiency-focused');
      }
    }

    // --- STATUS/IMAGE ---
    if (preferences.statusImage) {
      const status = preferences.statusImage;
      if (status === 'very-important' && (vehicle.segment === 'luxury' || vehicle.segment === 'exotic')) {
        score += 20;
        matchReasons.push('Premium status');
      } else if (status === 'anti-status' && vehicle.segment === 'mainstream') {
        score += 10;
      }
    }

    // --- ENVIRONMENTAL VALUES ---
    if (preferences.environmentalValues) {
      const env = preferences.environmentalValues;
      if (env === 'top-priority') {
        if (vehicle.powertrain === 'ev') {
          score += 30;
          matchReasons.push('Zero emissions');
        } else if (vehicle.powertrain === 'hybrid' || vehicle.powertrain === 'phev') {
          score += 15;
        } else {
          score -= 20;
        }
      } else if (env === 'important' && (vehicle.powertrain === 'ev' || vehicle.powertrain === 'hybrid')) {
        score += 15;
        matchReasons.push('Eco-friendly');
      }
    }

    // --- RELIABILITY VS INNOVATION ---
    if (preferences.reliabilityVsInnovation) {
      const rel = preferences.reliabilityVsInnovation;
      const reliableBrands = ['Toyota', 'Lexus', 'Honda', 'Acura', 'Mazda', 'Subaru'];
      
      if (rel === 'reliability' && reliableBrands.includes(vehicle.brand)) {
        score += 20;
        matchReasons.push('Proven reliability');
      } else if (rel === 'innovation' && (vehicle.powertrain === 'ev' || vehicle.segment === 'premium' || vehicle.segment === 'luxury')) {
        score += 15;
        matchReasons.push('Cutting-edge features');
      }
    }

    // --- EMOTIONAL CONNECTION ---
    if (preferences.emotionalConnection) {
      const emo = preferences.emotionalConnection;
      if (emo === 'driving-joy' && (vehicle.features.includes('sporty') || vehicle.features.includes('performance'))) {
        score += 20;
        matchReasons.push('Pure driving enjoyment');
      } else if (emo === 'versatility' && vehicle.features.includes('cargo')) {
        score += 15;
        matchReasons.push('Handles everything');
      } else if (emo === 'safety' && vehicle.segment !== 'exotic') {
        score += 10;
      } else if (emo === 'adventure' && (vehicle.features.includes('offroad') || vehicle.features.includes('awd'))) {
        score += 25;
        matchReasons.push('Adventure-ready');
      } else if (emo === 'expression' && (vehicle.segment === 'luxury' || vehicle.segment === 'exotic')) {
        score += 15;
        matchReasons.push('Makes a statement');
      }
    }

    // --- OWNERSHIP PRIORITIES ---
    if (preferences.ownershipPriorities && preferences.ownershipPriorities.length > 0) {
      const priorities = preferences.ownershipPriorities;
      const reliableBrands = ['Toyota', 'Lexus', 'Honda', 'Acura', 'Mazda'];
      
      if (priorities.includes('low-maintenance') && reliableBrands.includes(vehicle.brand)) {
        score += 15;
        matchReasons.push('Low maintenance costs');
      }
      if (priorities.includes('resale') && ['Toyota', 'Lexus', 'Honda', 'Porsche'].includes(vehicle.brand)) {
        score += 15;
        matchReasons.push('Strong resale value');
      }
      if (priorities.includes('warranty') && ['Hyundai', 'Kia', 'Genesis'].includes(vehicle.brand)) {
        score += 15;
        matchReasons.push('Excellent warranty');
      }
      if (priorities.includes('fun-factor') && (vehicle.features.includes('performance') || vehicle.features.includes('sporty'))) {
        score += 15;
        matchReasons.push('High fun factor');
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
    'suv': { name: 'SUV', description: 'Versatile vehicles with space and capability' },
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
