// Vehicle Trims Data - Complete Database for All 410 Vehicles
// Maps base model names to their available trims with pricing

export interface Trim {
  name: string;
  price: number; // in thousands
  features?: string[];
}

export interface VehicleTrims {
  basePrice: number;
  trims: Trim[];
}

export const vehicleTrims: Record<string, VehicleTrims> = {
  // ==================== ACURA ====================
  'Acura Integra': { basePrice: 32, trims: [{ name: 'Base', price: 32 }, { name: 'A-Spec', price: 36, features: ['Sport styling'] }, { name: 'A-Spec Tech', price: 38, features: ['ELS audio'] }, { name: 'Type S', price: 52, features: ['320 hp turbo'] }] },
  'Acura TLX': { basePrice: 40, trims: [{ name: 'Base', price: 40 }, { name: 'Technology', price: 45, features: ['ELS audio'] }, { name: 'A-Spec', price: 48, features: ['Sport styling'] }, { name: 'Advance', price: 52, features: ['Head-up display'] }, { name: 'Type S', price: 55, features: ['355 hp V6'] }] },
  'Acura RDX': { basePrice: 42, trims: [{ name: 'Base', price: 42 }, { name: 'Technology', price: 46, features: ['ELS audio'] }, { name: 'A-Spec', price: 49, features: ['Sport styling'] }, { name: 'Advance', price: 52, features: ['16-speaker audio'] }] },
  'Acura RDX A-Spec Advance': { basePrice: 52, trims: [{ name: 'A-Spec Advance', price: 52, features: ['Full luxury package'] }] },
  'Acura MDX': { basePrice: 52, trims: [{ name: 'Base', price: 52 }, { name: 'Technology', price: 56, features: ['ELS audio'] }, { name: 'A-Spec', price: 60, features: ['Sport styling'] }, { name: 'Advance', price: 64, features: ['Surround view'] }, { name: 'Type S', price: 72, features: ['355 hp turbo V6'] }, { name: 'Type S Advance', price: 78, features: ['Full luxury'] }] },

  // ==================== ALFA ROMEO ====================
  'Alfa Romeo Giulia': { basePrice: 45, trims: [{ name: 'Sprint', price: 45 }, { name: 'Ti', price: 48, features: ['Leather'] }, { name: 'Veloce', price: 52, features: ['Sport suspension'] }, { name: 'Quadrifoglio', price: 82, features: ['505 hp V6'] }] },
  'Alfa Romeo Stelvio': { basePrice: 48, trims: [{ name: 'Sprint', price: 48 }, { name: 'Ti', price: 52, features: ['Leather'] }, { name: 'Veloce', price: 56, features: ['Sport suspension'] }, { name: 'Quadrifoglio', price: 92, features: ['505 hp V6'] }] },

  // ==================== ASTON MARTIN ====================
  'Aston Martin DB12': { basePrice: 245, trims: [{ name: 'Base', price: 245, features: ['671 hp twin-turbo V8'] }] },
  'Aston Martin DB12 Volante': { basePrice: 265, trims: [{ name: 'Base', price: 265, features: ['671 hp', 'Convertible'] }] },
  'Aston Martin DBS': { basePrice: 335, trims: [{ name: 'Base', price: 335, features: ['715 hp V12'] }] },
  'Aston Martin DBX': { basePrice: 195, trims: [{ name: 'Base', price: 195, features: ['542 hp V8'] }, { name: '707', price: 239, features: ['697 hp'] }] },
  'Aston Martin DBX707': { basePrice: 239, trims: [{ name: 'Base', price: 239, features: ['697 hp V8'] }] },
  'Aston Martin Vantage': { basePrice: 165, trims: [{ name: 'Base', price: 165, features: ['656 hp V8'] }] },
  'Aston Martin Vantage Roadster': { basePrice: 185, trims: [{ name: 'Base', price: 185, features: ['656 hp', 'Convertible'] }] },

  // ==================== AUDI ====================
  'Audi A4': { basePrice: 42, trims: [{ name: '40 Premium', price: 42 }, { name: '40 Premium Plus', price: 46, features: ['Virtual cockpit'] }, { name: '45 Premium Plus quattro', price: 50, features: ['261 hp', 'AWD'] }, { name: 'S Line Prestige', price: 54, features: ['Sport styling'] }] },
  'Audi A4 Allroad': { basePrice: 48, trims: [{ name: 'Premium', price: 48 }, { name: 'Premium Plus', price: 52, features: ['Virtual cockpit'] }, { name: 'Prestige', price: 56, features: ['B&O audio'] }] },
  'Audi A5': { basePrice: 48, trims: [{ name: '45 Premium', price: 48 }, { name: '45 Premium Plus', price: 52 }, { name: 'S Line Prestige', price: 56, features: ['B&O audio'] }] },
  'Audi A6': { basePrice: 58, trims: [{ name: 'Premium', price: 58 }, { name: 'Premium Plus', price: 62, features: ['Matrix LED'] }, { name: 'Prestige', price: 68, features: ['B&O 3D audio'] }] },
  'Audi Q3': { basePrice: 38, trims: [{ name: '40 Premium', price: 38 }, { name: '40 Premium Plus', price: 42 }, { name: '45 S Line Prestige', price: 48, features: ['228 hp'] }] },
  'Audi Q5': { basePrice: 46, trims: [{ name: '40 Premium', price: 46 }, { name: '40 Premium Plus', price: 50 }, { name: '45 Premium Plus', price: 54, features: ['261 hp'] }, { name: '45 Prestige', price: 58, features: ['Air suspension'] }] },
  'Audi Q7': { basePrice: 60, trims: [{ name: '45 Premium', price: 60 }, { name: '45 Premium Plus', price: 65 }, { name: '55 Premium Plus', price: 70, features: ['335 hp V6'] }, { name: '55 Prestige', price: 78, features: ['Air suspension'] }] },
  'Audi Q8': { basePrice: 72, trims: [{ name: '55 Premium', price: 72 }, { name: '55 Premium Plus', price: 78, features: ['HD Matrix LED'] }, { name: '55 Prestige', price: 85, features: ['Night vision'] }] },
  'Audi e-tron': { basePrice: 70, trims: [{ name: 'Premium', price: 70 }, { name: 'Premium Plus', price: 76, features: ['Virtual mirrors'] }, { name: 'Prestige', price: 82, features: ['Air suspension'] }] },
  'Audi e-tron GT': { basePrice: 108, trims: [{ name: 'Premium Plus', price: 108 }, { name: 'Prestige', price: 115, features: ['Carbon roof'] }, { name: 'RS', price: 152, features: ['637 hp'] }] },
  'Audi S3': { basePrice: 48, trims: [{ name: 'Premium', price: 48 }, { name: 'Premium Plus', price: 52 }, { name: 'Prestige', price: 56, features: ['B&O audio'] }] },
  'Audi S4': { basePrice: 55, trims: [{ name: 'Premium', price: 55 }, { name: 'Premium Plus', price: 60, features: ['Sport diff'] }, { name: 'Prestige', price: 65, features: ['Carbon trim'] }] },
  'Audi S5': { basePrice: 58, trims: [{ name: 'Premium', price: 58 }, { name: 'Premium Plus', price: 63 }, { name: 'Prestige', price: 68, features: ['Massage seats'] }] },
  'Audi S6': { basePrice: 78, trims: [{ name: 'Premium', price: 78 }, { name: 'Premium Plus', price: 82, features: ['21" wheels'] }, { name: 'Prestige', price: 88, features: ['Sport diff'] }] },
  'Audi S7': { basePrice: 85, trims: [{ name: 'Premium', price: 85 }, { name: 'Premium Plus', price: 90 }, { name: 'Prestige', price: 96, features: ['Night vision'] }] },
  'Audi SQ5': { basePrice: 58, trims: [{ name: 'Premium', price: 58 }, { name: 'Premium Plus', price: 62 }, { name: 'Prestige', price: 68, features: ['Sport diff'] }] },
  'Audi SQ7': { basePrice: 92, trims: [{ name: 'Premium', price: 92 }, { name: 'Premium Plus', price: 98, features: ['22" wheels'] }, { name: 'Prestige', price: 105 }] },
  'Audi SQ8': { basePrice: 95, trims: [{ name: 'Premium', price: 95 }, { name: 'Premium Plus', price: 102 }, { name: 'Prestige', price: 110, features: ['Carbon trim'] }] },
  'Audi RS Q8': { basePrice: 125, trims: [{ name: 'Base', price: 125, features: ['591 hp V8'] }] },

  // ==================== BENTLEY ====================
  'Bentley Bentayga': { basePrice: 205, trims: [{ name: 'V8', price: 205 }, { name: 'S', price: 225, features: ['Sport suspension'] }, { name: 'Speed', price: 275, features: ['626 hp W12'] }] },
  'Bentley Bentayga EWB': { basePrice: 240, trims: [{ name: 'Base', price: 240, features: ['Extended wheelbase'] }, { name: 'Azure', price: 265, features: ['Wellness features'] }] },
  'Bentley Bentayga S': { basePrice: 225, trims: [{ name: 'Base', price: 225, features: ['Sport suspension'] }] },
  'Bentley Continental GT': { basePrice: 235, trims: [{ name: 'V8', price: 235 }, { name: 'Speed', price: 285, features: ['650 hp W12'] }, { name: 'Mulliner', price: 320, features: ['Bespoke luxury'] }] },
  'Bentley Continental GT Convertible': { basePrice: 260, trims: [{ name: 'V8', price: 260 }, { name: 'Speed', price: 310, features: ['650 hp W12'] }] },
  'Bentley Continental GT Speed': { basePrice: 285, trims: [{ name: 'Base', price: 285, features: ['650 hp W12'] }] },
  'Bentley Flying Spur': { basePrice: 225, trims: [{ name: 'V8', price: 225 }, { name: 'Speed', price: 285, features: ['626 hp W12'] }, { name: 'Mulliner', price: 320 }] },
  'Bentley Flying Spur Speed': { basePrice: 285, trims: [{ name: 'Base', price: 285, features: ['626 hp W12'] }] },

  // ==================== BMW ====================
  'BMW 3 Series': { basePrice: 45, trims: [{ name: '330i', price: 45 }, { name: '330i xDrive', price: 48, features: ['AWD'] }, { name: 'M340i', price: 58, features: ['382 hp'] }, { name: 'M340i xDrive', price: 60, features: ['382 hp', 'AWD'] }] },
  'BMW 4 Series': { basePrice: 50, trims: [{ name: '430i', price: 50 }, { name: '430i xDrive', price: 53, features: ['AWD'] }, { name: 'M440i', price: 62, features: ['382 hp'] }, { name: 'M440i xDrive', price: 65 }] },
  'BMW 5 Series': { basePrice: 58, trims: [{ name: '530i', price: 58 }, { name: '530i xDrive', price: 61, features: ['AWD'] }, { name: '540i xDrive', price: 68, features: ['335 hp'] }, { name: 'M550i xDrive', price: 78, features: ['523 hp V8'] }] },
  'BMW 7 Series': { basePrice: 95, trims: [{ name: '740i', price: 95 }, { name: '740i xDrive', price: 100, features: ['AWD'] }, { name: '760i xDrive', price: 115, features: ['536 hp V8'] }, { name: 'M760e xDrive', price: 110, features: ['PHEV'] }] },
  'BMW M3': { basePrice: 75, trims: [{ name: 'Base', price: 75 }, { name: 'Competition', price: 80, features: ['503 hp'] }, { name: 'Competition xDrive', price: 83, features: ['AWD'] }, { name: 'CS', price: 115, features: ['543 hp'] }] },
  'BMW M4': { basePrice: 78, trims: [{ name: 'Base', price: 78 }, { name: 'Competition', price: 83 }, { name: 'Competition xDrive', price: 86, features: ['AWD'] }, { name: 'CS', price: 120, features: ['543 hp'] }] },
  'BMW M240i': { basePrice: 52, trims: [{ name: 'Base', price: 52, features: ['382 hp'] }, { name: 'xDrive', price: 54, features: ['AWD'] }] },
  'BMW M340i': { basePrice: 58, trims: [{ name: 'Base', price: 58 }, { name: 'xDrive', price: 60, features: ['AWD'] }] },
  'BMW M440i': { basePrice: 62, trims: [{ name: 'Base', price: 62 }, { name: 'xDrive', price: 65, features: ['AWD'] }] },
  'BMW M550i': { basePrice: 78, trims: [{ name: 'xDrive', price: 78, features: ['523 hp V8'] }] },
  'BMW X1': { basePrice: 40, trims: [{ name: 'sDrive28i', price: 40 }, { name: 'xDrive28i', price: 42, features: ['AWD'] }, { name: 'M35i xDrive', price: 50, features: ['312 hp'] }] },
  'BMW X3': { basePrice: 50, trims: [{ name: 'sDrive30i', price: 50 }, { name: 'xDrive30i', price: 52, features: ['AWD'] }, { name: 'M40i', price: 62, features: ['382 hp'] }] },
  'BMW X3 M40i': { basePrice: 62, trims: [{ name: 'Base', price: 62, features: ['382 hp'] }] },
  'BMW X5': { basePrice: 65, trims: [{ name: 'sDrive40i', price: 65 }, { name: 'xDrive40i', price: 68, features: ['AWD'] }, { name: 'xDrive50e', price: 75, features: ['PHEV'] }, { name: 'M60i', price: 90, features: ['523 hp V8'] }] },
  'BMW X5 M50i': { basePrice: 85, trims: [{ name: 'Base', price: 85, features: ['523 hp V8'] }] },
  'BMW X5M': { basePrice: 115, trims: [{ name: 'Base', price: 115, features: ['600 hp'] }, { name: 'Competition', price: 125, features: ['617 hp'] }] },
  'BMW X6M': { basePrice: 115, trims: [{ name: 'Base', price: 115, features: ['600 hp'] }, { name: 'Competition', price: 125, features: ['617 hp'] }] },
  'BMW X7': { basePrice: 80, trims: [{ name: 'xDrive40i', price: 80 }, { name: 'xDrive60i', price: 95, features: ['523 hp V8'] }, { name: 'M60i', price: 105 }] },
  'BMW X7 M60i': { basePrice: 105, trims: [{ name: 'Base', price: 105, features: ['523 hp V8'] }] },
  'BMW Z4': { basePrice: 55, trims: [{ name: 'sDrive30i', price: 55 }, { name: 'M40i', price: 68, features: ['382 hp'] }] },
  'BMW i4': { basePrice: 55, trims: [{ name: 'eDrive35', price: 55, features: ['281 hp'] }, { name: 'eDrive40', price: 58, features: ['335 hp'] }, { name: 'xDrive40', price: 62, features: ['AWD'] }, { name: 'M50', price: 70, features: ['536 hp'] }] },
  'BMW iX': { basePrice: 85, trims: [{ name: 'xDrive50', price: 85, features: ['516 hp'] }, { name: 'M60', price: 110, features: ['610 hp'] }] },

  // ==================== BUGATTI ====================
  'Bugatti Chiron': { basePrice: 3000, trims: [{ name: 'Base', price: 3000, features: ['1479 hp W16'] }] },
  'Bugatti Chiron Sport': { basePrice: 3200, trims: [{ name: 'Base', price: 3200, features: ['Lighter weight'] }] },
  'Bugatti Chiron Super Sport': { basePrice: 3900, trims: [{ name: 'Base', price: 3900, features: ['1578 hp', 'Longtail'] }] },
  'Bugatti Tourbillon': { basePrice: 4100, trims: [{ name: 'Base', price: 4100, features: ['1800 hp hybrid V16'] }] },

  // ==================== CADILLAC ====================
  'Cadillac CT5': { basePrice: 38, trims: [{ name: 'Luxury', price: 38 }, { name: 'Premium Luxury', price: 42, features: ['Bose audio'] }, { name: 'Sport', price: 44 }, { name: 'V-Series', price: 52, features: ['360 hp V6'] }, { name: 'Blackwing', price: 92, features: ['668 hp V8'] }] },
  'Cadillac Escalade': { basePrice: 82, trims: [{ name: 'Luxury', price: 82 }, { name: 'Premium Luxury', price: 92, features: ['AKG audio'] }, { name: 'Sport', price: 94 }, { name: 'Premium Luxury Platinum', price: 105, features: ['36-speaker AKG'] }] },
  'Cadillac Escalade-V': { basePrice: 155, trims: [{ name: 'Base', price: 155, features: ['682 hp supercharged V8'] }] },
  'Cadillac Lyriq': { basePrice: 58, trims: [{ name: 'Tech', price: 58 }, { name: 'Luxury', price: 62, features: ['Premium leather'] }, { name: 'Sport', price: 65, features: ['500 hp dual motor'] }] },
  'Cadillac Lyriq-V': { basePrice: 82, trims: [{ name: 'Base', price: 82, features: ['615 hp dual motor'] }] },
  'Cadillac Vistiq': { basePrice: 75, trims: [{ name: 'Luxury', price: 75 }, { name: 'Sport', price: 82, features: ['615 hp'] }] },

  // ==================== CHEVROLET ====================
  'Chevrolet Bolt EUV': { basePrice: 28, trims: [{ name: 'LT', price: 28 }, { name: 'Premier', price: 32, features: ['Leather'] }] },
  'Chevrolet Camaro': { basePrice: 32, trims: [{ name: '1LS', price: 32 }, { name: '1LT', price: 35 }, { name: '2LT', price: 38, features: ['Leather'] }, { name: 'LT1', price: 40, features: ['455 hp V8'] }, { name: 'SS', price: 48, features: ['Magnetic ride'] }, { name: 'ZL1', price: 72, features: ['650 hp'] }] },
  'Chevrolet Camaro ZL1': { basePrice: 72, trims: [{ name: 'Base', price: 72, features: ['650 hp'] }, { name: '1LE', price: 78, features: ['Track package'] }] },
  'Chevrolet Colorado': { basePrice: 30, trims: [{ name: 'WT', price: 30 }, { name: 'LT', price: 35 }, { name: 'Z71', price: 42, features: ['Off-road'] }, { name: 'Trail Boss', price: 45 }, { name: 'ZR2', price: 52, features: ['Multimatic DSSV'] }] },
  'Chevrolet Colorado ZR2': { basePrice: 52, trims: [{ name: 'Base', price: 52 }, { name: 'Desert Boss', price: 58 }, { name: 'Bison', price: 62, features: ['AEV upgrades'] }] },
  'Chevrolet Corvette': { basePrice: 68, trims: [{ name: '1LT', price: 68 }, { name: '2LT', price: 76, features: ['Leather'] }, { name: '3LT', price: 82, features: ['Napa leather'] }] },
  'Chevrolet Corvette Z06': { basePrice: 115, trims: [{ name: '1LZ', price: 115, features: ['670 hp flat-plane V8'] }, { name: '2LZ', price: 125, features: ['Carbon trim'] }, { name: '3LZ', price: 135, features: ['Full leather'] }] },
  'Chevrolet Corvette ZR1': { basePrice: 150, trims: [{ name: '1ZR', price: 150, features: ['850 hp'] }, { name: '2ZR', price: 162 }, { name: '3ZR', price: 175, features: ['ZTK package'] }] },
  'Chevrolet Equinox': { basePrice: 30, trims: [{ name: 'LT', price: 30 }, { name: 'RS', price: 35 }, { name: 'Premier', price: 38, features: ['Bose audio'] }] },
  'Chevrolet Silverado 1500': { basePrice: 38, trims: [{ name: 'WT', price: 38 }, { name: 'Custom', price: 42 }, { name: 'LT', price: 48 }, { name: 'RST', price: 52 }, { name: 'LT Trail Boss', price: 58, features: ['Off-road'] }, { name: 'LTZ', price: 58, features: ['Leather'] }, { name: 'High Country', price: 65 }, { name: 'ZR2', price: 72, features: ['Multimatic'] }] },
  'Chevrolet Silverado 2500HD': { basePrice: 45, trims: [{ name: 'WT', price: 45 }, { name: 'Custom', price: 50 }, { name: 'LT', price: 55 }, { name: 'LTZ', price: 65 }, { name: 'High Country', price: 75 }] },
  'Chevrolet Silverado EV': { basePrice: 75, trims: [{ name: 'WT', price: 75 }, { name: 'LT', price: 85, features: ['Super Cruise'] }, { name: 'RST', price: 95, features: ['664 hp'] }] },
  'Chevrolet Silverado ZR2': { basePrice: 72, trims: [{ name: 'Base', price: 72, features: ['Multimatic DSSV'] }, { name: 'Bison', price: 82, features: ['AEV upgrades'] }] },
  'Chevrolet Spark': { basePrice: 15, trims: [{ name: 'LS', price: 15 }, { name: '1LT', price: 17 }, { name: '2LT', price: 19, features: ['Sunroof'] }] },
  'Chevrolet Suburban': { basePrice: 60, trims: [{ name: 'LS', price: 60 }, { name: 'LT', price: 65 }, { name: 'RST', price: 72 }, { name: 'Z71', price: 75 }, { name: 'Premier', price: 78 }, { name: 'High Country', price: 85 }] },
  'Chevrolet Tahoe': { basePrice: 58, trims: [{ name: 'LS', price: 58 }, { name: 'LT', price: 62 }, { name: 'RST', price: 68 }, { name: 'Z71', price: 72 }, { name: 'Premier', price: 75 }, { name: 'High Country', price: 82 }] },
  'Chevrolet Tahoe Z71': { basePrice: 72, trims: [{ name: 'Base', price: 72, features: ['Off-road suspension'] }] },
  'Chevrolet Traverse': { basePrice: 36, trims: [{ name: 'LS', price: 36 }, { name: 'LT Cloth', price: 40 }, { name: 'LT Leather', price: 45 }, { name: 'RS', price: 48 }, { name: 'Premier', price: 52 }, { name: 'High Country', price: 56 }] },

  // ==================== CHRYSLER ====================
  'Chrysler Pacifica': { basePrice: 40, trims: [{ name: 'Touring', price: 40 }, { name: 'Touring L', price: 45 }, { name: 'Limited', price: 52 }, { name: 'Pinnacle', price: 58, features: ['AWD'] }] },
  'Chrysler Voyager': { basePrice: 35, trims: [{ name: 'L', price: 35 }, { name: 'LX', price: 38, features: ['Power doors'] }] },

  // ==================== DODGE ====================
  'Dodge Challenger': { basePrice: 35, trims: [{ name: 'SXT', price: 35 }, { name: 'GT', price: 38 }, { name: 'R/T', price: 42, features: ['375 hp HEMI'] }, { name: 'R/T Scat Pack', price: 48, features: ['485 hp'] }, { name: 'SRT Hellcat', price: 72, features: ['717 hp'] }, { name: 'SRT Hellcat Redeye', price: 82, features: ['797 hp'] }] },
  'Dodge Challenger SRT Hellcat': { basePrice: 72, trims: [{ name: 'Base', price: 72, features: ['717 hp'] }, { name: 'Redeye', price: 82, features: ['797 hp'] }, { name: 'Jailbreak', price: 88, features: ['807 hp'] }] },
  'Dodge Charger': { basePrice: 35, trims: [{ name: 'SXT', price: 35 }, { name: 'GT', price: 38 }, { name: 'R/T', price: 42, features: ['370 hp'] }, { name: 'Scat Pack', price: 48, features: ['485 hp'] }, { name: 'SRT Hellcat', price: 78, features: ['717 hp'] }] },
  'Dodge Charger SRT Hellcat': { basePrice: 78, trims: [{ name: 'Base', price: 78, features: ['717 hp'] }, { name: 'Redeye', price: 88, features: ['797 hp'] }] },
  'Dodge Durango': { basePrice: 42, trims: [{ name: 'SXT', price: 42 }, { name: 'GT', price: 48 }, { name: 'R/T', price: 55, features: ['360 hp'] }, { name: 'SRT 392', price: 70, features: ['475 hp'] }, { name: 'SRT Hellcat', price: 85, features: ['710 hp'] }] },
  'Dodge Durango SRT 392': { basePrice: 70, trims: [{ name: 'Base', price: 70, features: ['475 hp 6.4L HEMI'] }] },
  'Dodge Durango SRT Hellcat': { basePrice: 85, trims: [{ name: 'Base', price: 85, features: ['710 hp'] }] },

  // ==================== FERRARI ====================
  'Ferrari 296 GTB': { basePrice: 320, trims: [{ name: 'Base', price: 320, features: ['819 hp hybrid'] }, { name: 'Assetto Fiorano', price: 365, features: ['Track package'] }] },
  'Ferrari 296 GTS': { basePrice: 350, trims: [{ name: 'Base', price: 350, features: ['819 hp', 'Retractable hardtop'] }] },
  'Ferrari 812 GTS': { basePrice: 420, trims: [{ name: 'Base', price: 420, features: ['789 hp V12'] }] },
  'Ferrari F8 Tributo': { basePrice: 280, trims: [{ name: 'Base', price: 280, features: ['710 hp V8'] }] },
  'Ferrari F8 Spider': { basePrice: 310, trims: [{ name: 'Base', price: 310, features: ['710 hp', 'Convertible'] }] },
  'Ferrari Purosangue': { basePrice: 400, trims: [{ name: 'Base', price: 400, features: ['715 hp V12'] }] },
  'Ferrari Roma': { basePrice: 245, trims: [{ name: 'Base', price: 245, features: ['612 hp V8'] }] },
  'Ferrari Roma Spider': { basePrice: 285, trims: [{ name: 'Base', price: 285, features: ['612 hp', 'Soft top'] }] },
  'Ferrari SF90 Stradale': { basePrice: 525, trims: [{ name: 'Base', price: 525, features: ['986 hp hybrid'] }, { name: 'Assetto Fiorano', price: 580, features: ['Track package'] }] },
  'Ferrari SF90 Spider': { basePrice: 575, trims: [{ name: 'Base', price: 575, features: ['986 hp', 'Convertible'] }] },

  // ==================== FORD ====================
  'Ford Bronco': { basePrice: 38, trims: [{ name: 'Base', price: 38 }, { name: 'Big Bend', price: 42 }, { name: 'Black Diamond', price: 45, features: ['Steel bumpers'] }, { name: 'Outer Banks', price: 48, features: ['Leather'] }, { name: 'Badlands', price: 50 }, { name: 'Wildtrak', price: 55, features: ['Sasquatch'] }, { name: 'Everglades', price: 58, features: ['Snorkel', 'Winch'] }, { name: 'Raptor', price: 82, features: ['418 hp'] }] },
  'Ford Bronco Raptor': { basePrice: 82, trims: [{ name: 'Base', price: 82, features: ['418 hp', '37" tires'] }] },
  'Ford Bronco Sport': { basePrice: 32, trims: [{ name: 'Base', price: 32 }, { name: 'Big Bend', price: 35 }, { name: 'Outer Banks', price: 38 }, { name: 'Badlands', price: 42, features: ['250 hp'] }, { name: 'Heritage', price: 40 }] },
  'Ford Edge': { basePrice: 38, trims: [{ name: 'SE', price: 38 }, { name: 'SEL', price: 42 }, { name: 'Titanium', price: 48 }, { name: 'ST', price: 50, features: ['335 hp'] }] },
  'Ford Edge ST': { basePrice: 50, trims: [{ name: 'Base', price: 50, features: ['335 hp V6'] }] },
  'Ford Escape': { basePrice: 30, trims: [{ name: 'Base', price: 30 }, { name: 'Active', price: 33 }, { name: 'ST-Line', price: 35, features: ['250 hp'] }, { name: 'Platinum', price: 42, features: ['B&O audio'] }] },
  'Ford Expedition': { basePrice: 58, trims: [{ name: 'XLT', price: 58 }, { name: 'Limited', price: 72 }, { name: 'Timberline', price: 75, features: ['Off-road'] }, { name: 'King Ranch', price: 82 }, { name: 'Platinum', price: 88 }] },
  'Ford Explorer': { basePrice: 40, trims: [{ name: 'Base', price: 40 }, { name: 'XLT', price: 45 }, { name: 'Limited', price: 52 }, { name: 'Timberline', price: 55, features: ['Off-road'] }, { name: 'ST', price: 58, features: ['400 hp'] }, { name: 'Platinum', price: 62 }] },
  'Ford Explorer ST': { basePrice: 58, trims: [{ name: 'Base', price: 58, features: ['400 hp V6'] }] },
  'Ford F-150': { basePrice: 38, trims: [{ name: 'XL', price: 38 }, { name: 'XLT', price: 45 }, { name: 'Lariat', price: 55 }, { name: 'King Ranch', price: 65 }, { name: 'Platinum', price: 68 }, { name: 'Tremor', price: 58, features: ['Off-road'] }, { name: 'Raptor', price: 78, features: ['450 hp'] }, { name: 'Raptor R', price: 115, features: ['700 hp'] }, { name: 'Limited', price: 75 }] },
  'Ford F-150 Lightning': { basePrice: 55, trims: [{ name: 'Pro', price: 55 }, { name: 'XLT', price: 65 }, { name: 'Lariat', price: 78 }, { name: 'Platinum', price: 95, features: ['580 hp'] }] },
  'Ford F-150 Raptor': { basePrice: 78, trims: [{ name: 'Base', price: 78, features: ['450 hp V6'] }] },
  'Ford F-150 Raptor R': { basePrice: 115, trims: [{ name: 'Base', price: 115, features: ['700 hp V8'] }] },
  'Ford F-250': { basePrice: 45, trims: [{ name: 'XL', price: 45 }, { name: 'XLT', price: 52 }, { name: 'Lariat', price: 65 }, { name: 'King Ranch', price: 78 }, { name: 'Platinum', price: 85 }, { name: 'Limited', price: 95 }, { name: 'Tremor', price: 70, features: ['Off-road'] }] },
  'Ford Maverick': { basePrice: 25, trims: [{ name: 'XL', price: 25 }, { name: 'XLT', price: 28 }, { name: 'Lariat', price: 32 }, { name: 'Tremor', price: 35, features: ['Off-road', '250 hp'] }] },
  'Ford Mustang': { basePrice: 32, trims: [{ name: 'EcoBoost', price: 32 }, { name: 'EcoBoost Premium', price: 38 }, { name: 'GT', price: 45, features: ['480 hp V8'] }, { name: 'GT Premium', price: 50 }, { name: 'Dark Horse', price: 60, features: ['500 hp'] }] },
  'Ford Mustang GT': { basePrice: 45, trims: [{ name: 'Base', price: 45, features: ['480 hp V8'] }, { name: 'Premium', price: 50, features: ['B&O audio'] }] },
  'Ford Mustang Mach-E': { basePrice: 45, trims: [{ name: 'Select', price: 45 }, { name: 'Premium', price: 52 }, { name: 'California Route 1', price: 55, features: ['312 mi range'] }, { name: 'GT', price: 65, features: ['480 hp'] }, { name: 'GT Performance', price: 70, features: ['MagneRide'] }] },
  'Ford Mustang Shelby GT500': { basePrice: 78, trims: [{ name: 'Base', price: 78, features: ['760 hp'] }, { name: 'Carbon Fiber Track Pack', price: 92, features: ['Carbon wheels'] }] },
  'Ford Ranger': { basePrice: 32, trims: [{ name: 'XL', price: 32 }, { name: 'XLT', price: 36 }, { name: 'Lariat', price: 42 }, { name: 'Raptor', price: 58, features: ['405 hp', 'Fox shocks'] }] },
  'Ford Transit': { basePrice: 45, trims: [{ name: 'Cargo Van', price: 45 }, { name: 'Crew Van', price: 50 }, { name: 'Passenger Wagon', price: 55 }] },

  // ==================== GENESIS ====================
  'Genesis G70': { basePrice: 42, trims: [{ name: '2.0T', price: 42 }, { name: '2.0T Prestige', price: 46 }, { name: '3.3T Sport', price: 52, features: ['365 hp'] }, { name: '3.3T Sport Prestige', price: 56 }] },
  'Genesis G70 Shooting Brake': { basePrice: 45, trims: [{ name: '2.0T', price: 45 }, { name: '3.3T Sport', price: 55, features: ['365 hp'] }] },
  'Genesis G80': { basePrice: 55, trims: [{ name: '2.5T', price: 55 }, { name: '2.5T Prestige', price: 62 }, { name: '3.5T Sport', price: 68, features: ['375 hp'] }, { name: 'E', price: 82, features: ['Electric'] }] },
  'Genesis G90': { basePrice: 90, trims: [{ name: '3.5T', price: 90 }, { name: '3.5T E-Supercharger', price: 100, features: ['Mild hybrid'] }, { name: 'Long Wheelbase', price: 105 }] },
  'Genesis GV60': { basePrice: 55, trims: [{ name: 'Advanced', price: 55 }, { name: 'Performance', price: 68, features: ['429 hp', 'Boost mode'] }] },
  'Genesis GV60 Performance': { basePrice: 68, trims: [{ name: 'Base', price: 68, features: ['429 hp dual motor'] }] },
  'Genesis GV70': { basePrice: 45, trims: [{ name: '2.5T', price: 45 }, { name: '2.5T Prestige', price: 52 }, { name: '3.5T Sport', price: 58, features: ['375 hp'] }, { name: 'Electrified', price: 68, features: ['429 hp'] }] },
  'Genesis GV80': { basePrice: 58, trims: [{ name: '2.5T', price: 58 }, { name: '2.5T Prestige', price: 65 }, { name: '3.5T Sport', price: 75, features: ['375 hp'] }, { name: '3.5T Prestige', price: 78 }] },

  // ==================== GMC ====================
  'GMC Canyon': { basePrice: 32, trims: [{ name: 'Elevation', price: 32 }, { name: 'AT4', price: 42, features: ['Off-road'] }, { name: 'Denali', price: 48 }, { name: 'AT4X', price: 58, features: ['Multimatic'] }] },
  'GMC Canyon AT4X': { basePrice: 58, trims: [{ name: 'Base', price: 58 }, { name: 'Edition 1', price: 68, features: ['AEV upgrades'] }] },
  'GMC Hummer EV': { basePrice: 100, trims: [{ name: 'EV2', price: 100 }, { name: 'EV2X', price: 110, features: ['Air suspension'] }, { name: 'EV3X', price: 115, features: ['830 hp'] }, { name: 'Edition 1', price: 115, features: ['1000 hp', 'CrabWalk'] }] },
  'GMC Sierra 1500': { basePrice: 40, trims: [{ name: 'Pro', price: 40 }, { name: 'SLE', price: 48 }, { name: 'Elevation', price: 52 }, { name: 'SLT', price: 55 }, { name: 'AT4', price: 62, features: ['Off-road'] }, { name: 'Denali', price: 65 }, { name: 'Denali Ultimate', price: 82, features: ['Super Cruise'] }] },
  'GMC Sierra 2500HD': { basePrice: 48, trims: [{ name: 'Pro', price: 48 }, { name: 'SLE', price: 55 }, { name: 'SLT', price: 62 }, { name: 'AT4', price: 70, features: ['Off-road'] }, { name: 'Denali', price: 78 }] },
  'GMC Sierra AT4X': { basePrice: 78, trims: [{ name: 'Base', price: 78, features: ['Multimatic DSSV'] }, { name: 'AEV Edition', price: 88, features: ['AEV bumpers'] }] },
  'GMC Terrain': { basePrice: 32, trims: [{ name: 'SLE', price: 32 }, { name: 'SLT', price: 38 }, { name: 'AT4', price: 40 }, { name: 'Denali', price: 42 }] },
  'GMC Yukon': { basePrice: 62, trims: [{ name: 'SLE', price: 62 }, { name: 'SLT', price: 70 }, { name: 'AT4', price: 75 }, { name: 'Denali', price: 82 }, { name: 'Denali Ultimate', price: 95, features: ['Super Cruise'] }] },
  'GMC Yukon AT4': { basePrice: 75, trims: [{ name: 'Base', price: 75, features: ['Off-road suspension'] }] },
  'GMC Yukon Denali Ultimate': { basePrice: 95, trims: [{ name: 'Base', price: 95, features: ['Super Cruise', 'Paldao wood'] }] },
  'GMC Yukon XL': { basePrice: 65, trims: [{ name: 'SLE', price: 65 }, { name: 'SLT', price: 72 }, { name: 'AT4', price: 78 }, { name: 'Denali', price: 85 }, { name: 'Denali Ultimate', price: 98 }] },

  // ==================== HONDA ====================
  'Honda Accord': { basePrice: 29, trims: [{ name: 'LX', price: 29 }, { name: 'EX', price: 32, features: ['Sunroof'] }, { name: 'Sport', price: 33 }, { name: 'EX-L', price: 35, features: ['Leather'] }, { name: 'Sport-L', price: 36 }, { name: 'Touring', price: 40 }] },
  'Honda Accord Sport': { basePrice: 33, trims: [{ name: 'Base', price: 33 }, { name: 'Hybrid', price: 35, features: ['204 hp hybrid'] }] },
  'Honda Civic': { basePrice: 25, trims: [{ name: 'LX', price: 25 }, { name: 'Sport', price: 27 }, { name: 'EX', price: 29, features: ['Sunroof'] }, { name: 'Touring', price: 32, features: ['Leather'] }] },
  'Honda Civic Hatchback': { basePrice: 26, trims: [{ name: 'LX', price: 26 }, { name: 'Sport', price: 28, features: ['180 hp'] }, { name: 'EX-L', price: 32 }, { name: 'Sport Touring', price: 34 }] },
  'Honda Civic Type R': { basePrice: 45, trims: [{ name: 'Base', price: 45, features: ['315 hp turbo', 'Manual'] }] },
  'Honda CR-V': { basePrice: 32, trims: [{ name: 'LX', price: 32 }, { name: 'EX', price: 35, features: ['Sunroof'] }, { name: 'EX-L', price: 38, features: ['Leather'] }, { name: 'Sport', price: 37 }, { name: 'Sport-L', price: 40 }, { name: 'Touring', price: 42 }] },
  'Honda CR-V Hybrid Sport Touring': { basePrice: 42, trims: [{ name: 'Base', price: 42, features: ['204 hp hybrid'] }] },
  'Honda CR-V Sport Touring': { basePrice: 40, trims: [{ name: 'Base', price: 40, features: ['Full features'] }] },
  'Honda HR-V': { basePrice: 25, trims: [{ name: 'LX', price: 25 }, { name: 'Sport', price: 28 }, { name: 'EX-L', price: 32, features: ['Leather'] }] },
  'Honda Odyssey': { basePrice: 40, trims: [{ name: 'LX', price: 40 }, { name: 'EX', price: 45, features: ['Power doors'] }, { name: 'EX-L', price: 48 }, { name: 'Touring', price: 52 }, { name: 'Elite', price: 55 }] },
  'Honda Passport': { basePrice: 42, trims: [{ name: 'Sport', price: 42 }, { name: 'EX-L', price: 46 }, { name: 'TrailSport', price: 50, features: ['Off-road styling'] }, { name: 'Touring', price: 52 }, { name: 'Elite', price: 55 }] },
  'Honda Passport TrailSport': { basePrice: 50, trims: [{ name: 'Base', price: 50, features: ['TrailWatch cameras'] }] },
  'Honda Pilot': { basePrice: 42, trims: [{ name: 'LX', price: 42 }, { name: 'EX', price: 45 }, { name: 'EX-L', price: 48 }, { name: 'Sport', price: 49 }, { name: 'TrailSport', price: 52, features: ['Off-road tuned'] }, { name: 'Touring', price: 54 }, { name: 'Elite', price: 58 }] },
  'Honda Pilot TrailSport': { basePrice: 52, trims: [{ name: 'Base', price: 52, features: ['All-terrain tires'] }] },
  'Honda Ridgeline': { basePrice: 42, trims: [{ name: 'Sport', price: 42 }, { name: 'RTL', price: 45 }, { name: 'RTL-E', price: 48 }, { name: 'TrailSport', price: 50 }, { name: 'Black Edition', price: 52 }] },

  // ==================== HYUNDAI ====================
  'Hyundai Elantra': { basePrice: 22, trims: [{ name: 'SE', price: 22 }, { name: 'SEL', price: 24 }, { name: 'Limited', price: 28, features: ['Leather'] }, { name: 'N Line', price: 28, features: ['201 hp'] }, { name: 'N', price: 35, features: ['276 hp'] }] },
  'Hyundai Ioniq 5': { basePrice: 45, trims: [{ name: 'SE Standard Range', price: 45 }, { name: 'SE Long Range', price: 50 }, { name: 'SEL', price: 52 }, { name: 'Limited', price: 58, features: ['Vision roof'] }, { name: 'N', price: 68, features: ['641 hp'] }] },
  'Hyundai Ioniq 6': { basePrice: 45, trims: [{ name: 'SE Standard Range', price: 45 }, { name: 'SE Long Range', price: 50 }, { name: 'SEL', price: 52 }, { name: 'Limited', price: 58 }] },
  'Hyundai Ioniq 9': { basePrice: 58, trims: [{ name: 'SE', price: 58 }, { name: 'SEL', price: 65 }, { name: 'Limited', price: 75 }] },
  'Hyundai Kona': { basePrice: 25, trims: [{ name: 'SE', price: 25 }, { name: 'SEL', price: 27 }, { name: 'N Line', price: 30, features: ['195 hp'] }, { name: 'Limited', price: 32 }, { name: 'N', price: 38, features: ['276 hp'] }] },
  'Hyundai Kona Electric': { basePrice: 35, trims: [{ name: 'SE', price: 35 }, { name: 'SEL', price: 38 }, { name: 'Limited', price: 42, features: ['Harman Kardon'] }] },
  'Hyundai Palisade': { basePrice: 38, trims: [{ name: 'SE', price: 38 }, { name: 'SEL', price: 42 }, { name: 'XRT', price: 48, features: ['Rugged styling'] }, { name: 'Limited', price: 52, features: ['Nappa leather'] }, { name: 'Calligraphy', price: 55 }] },
  'Hyundai Santa Cruz': { basePrice: 30, trims: [{ name: 'SE', price: 30 }, { name: 'SEL', price: 35 }, { name: 'SEL Premium', price: 40 }, { name: 'Limited', price: 45, features: ['281 hp turbo'] }] },
  'Hyundai Santa Fe': { basePrice: 35, trims: [{ name: 'SE', price: 35 }, { name: 'SEL', price: 38 }, { name: 'XRT', price: 42 }, { name: 'Limited', price: 48, features: ['Nappa leather'] }, { name: 'Calligraphy', price: 52 }] },
  'Hyundai Sonata': { basePrice: 28, trims: [{ name: 'SE', price: 28 }, { name: 'SEL', price: 30 }, { name: 'SEL Plus', price: 33 }, { name: 'Limited', price: 38 }, { name: 'N Line', price: 35, features: ['290 hp'] }] },
  'Hyundai Tucson': { basePrice: 30, trims: [{ name: 'SE', price: 30 }, { name: 'SEL', price: 33 }, { name: 'XRT', price: 36 }, { name: 'Limited', price: 40, features: ['Nappa leather'] }, { name: 'N Line', price: 38, features: ['290 hp'] }] },

  // ==================== INFINITI ====================
  'Infiniti Q50 Red Sport 400': { basePrice: 58, trims: [{ name: 'Base', price: 58, features: ['400 hp V6'] }, { name: 'Sensory', price: 62 }] },
  'Infiniti Q60 Red Sport 400': { basePrice: 60, trims: [{ name: 'Base', price: 60, features: ['400 hp V6'] }] },

  // ==================== JAGUAR ====================
  'Jaguar F-PACE': { basePrice: 58, trims: [{ name: 'P250', price: 58 }, { name: 'P340', price: 65, features: ['335 hp'] }, { name: 'P400', price: 72, features: ['395 hp'] }, { name: 'SVR', price: 88, features: ['550 hp V8'] }] },
  'Jaguar F-Type': { basePrice: 75, trims: [{ name: 'P300', price: 75 }, { name: 'P450', price: 90, features: ['444 hp V8'] }, { name: 'R', price: 110, features: ['575 hp'] }] },
  'Jaguar I-PACE': { basePrice: 72, trims: [{ name: 'S', price: 72 }, { name: 'SE', price: 78 }, { name: 'HSE', price: 82, features: ['Windsor leather'] }] },

  // ==================== JEEP ====================
  'Jeep Cherokee': { basePrice: 35, trims: [{ name: 'Latitude', price: 35 }, { name: 'Latitude Lux', price: 38 }, { name: 'Altitude', price: 40 }, { name: 'Limited', price: 42 }, { name: 'Trailhawk', price: 44, features: ['Off-road'] }] },
  'Jeep Compass': { basePrice: 32, trims: [{ name: 'Sport', price: 32 }, { name: 'Latitude', price: 35 }, { name: 'Limited', price: 40 }, { name: 'Trailhawk', price: 42, features: ['Off-road'] }] },
  'Jeep Gladiator': { basePrice: 42, trims: [{ name: 'Sport', price: 42 }, { name: 'Sport S', price: 45 }, { name: 'Willys', price: 48 }, { name: 'Rubicon', price: 58, features: ['Lockers'] }, { name: 'Mojave', price: 60, features: ['Desert Rated'] }] },
  'Jeep Grand Cherokee': { basePrice: 45, trims: [{ name: 'Laredo', price: 45 }, { name: 'Altitude', price: 50 }, { name: 'Limited', price: 55 }, { name: 'Overland', price: 62, features: ['Air suspension'] }, { name: 'Trailhawk', price: 60, features: ['Off-road'] }, { name: 'Summit', price: 68 }, { name: 'Summit Reserve', price: 75 }] },
  'Jeep Grand Cherokee L': { basePrice: 48, trims: [{ name: 'Laredo', price: 48 }, { name: 'Limited', price: 58 }, { name: 'Overland', price: 65 }, { name: 'Summit', price: 72 }, { name: 'Summit Reserve', price: 78 }] },
  'Jeep Grand Cherokee Summit': { basePrice: 68, trims: [{ name: 'Base', price: 68 }, { name: 'Reserve', price: 75, features: ['Palermo leather'] }] },
  'Jeep Grand Cherokee Trailhawk': { basePrice: 60, trims: [{ name: 'Base', price: 60, features: ['Off-road package'] }] },
  'Jeep Grand Wagoneer': { basePrice: 92, trims: [{ name: 'Series I', price: 92 }, { name: 'Series II', price: 98, features: ['McIntosh audio'] }, { name: 'Series III', price: 105 }, { name: 'L', price: 110, features: ['Extended wheelbase'] }] },
  'Jeep Wagoneer': { basePrice: 62, trims: [{ name: 'Series I', price: 62 }, { name: 'Series II', price: 72 }, { name: 'Series III', price: 82 }, { name: 'L', price: 85 }] },
  'Jeep Wrangler': { basePrice: 35, trims: [{ name: 'Sport', price: 35 }, { name: 'Sport S', price: 38 }, { name: 'Willys', price: 42 }, { name: 'Sahara', price: 48 }, { name: 'Rubicon', price: 55, features: ['Lockers'] }, { name: 'Rubicon 392', price: 82, features: ['470 hp V8'] }] },
  'Jeep Wrangler Rubicon 392': { basePrice: 82, trims: [{ name: 'Base', price: 82, features: ['470 hp 6.4L V8'] }] },

  // ==================== KIA ====================
  'Kia Carnival': { basePrice: 38, trims: [{ name: 'LX', price: 38 }, { name: 'LX Seat Package', price: 40 }, { name: 'EX', price: 45 }, { name: 'SX', price: 50 }, { name: 'SX Prestige', price: 52, features: ['VIP lounge seats'] }] },
  'Kia EV5': { basePrice: 42, trims: [{ name: 'Standard Range', price: 42 }, { name: 'Long Range', price: 48 }, { name: 'GT-Line', price: 52 }] },
  'Kia EV6': { basePrice: 48, trims: [{ name: 'Light', price: 48 }, { name: 'Wind', price: 52 }, { name: 'GT-Line', price: 58 }, { name: 'GT', price: 65, features: ['576 hp'] }] },
  'Kia EV9': { basePrice: 58, trims: [{ name: 'Light', price: 58 }, { name: 'Wind', price: 62 }, { name: 'Land', price: 68 }, { name: 'GT-Line', price: 75, features: ['379 hp'] }] },
  'Kia Forte': { basePrice: 20, trims: [{ name: 'FE', price: 20 }, { name: 'LXS', price: 22 }, { name: 'GT-Line', price: 25 }, { name: 'GT', price: 28, features: ['201 hp turbo'] }] },
  'Kia K5': { basePrice: 28, trims: [{ name: 'LXS', price: 28 }, { name: 'GT-Line', price: 32 }, { name: 'EX', price: 32 }, { name: 'GT', price: 35, features: ['290 hp'] }] },
  'Kia Niro': { basePrice: 30, trims: [{ name: 'LX', price: 30, features: ['139 hp hybrid'] }, { name: 'EX', price: 34 }, { name: 'SX Touring', price: 38, features: ['Harman Kardon'] }] },
  'Kia Seltos': { basePrice: 25, trims: [{ name: 'LX', price: 25 }, { name: 'S', price: 27 }, { name: 'EX', price: 30 }, { name: 'SX', price: 32 }, { name: 'X-Line', price: 33, features: ['Off-road styling'] }] },
  'Kia Sorento': { basePrice: 35, trims: [{ name: 'LX', price: 35 }, { name: 'S', price: 38 }, { name: 'EX', price: 42 }, { name: 'SX', price: 46 }, { name: 'SX Prestige', price: 50, features: ['Nappa leather'] }, { name: 'X-Line', price: 48 }] },
  'Kia Sorento SX Prestige': { basePrice: 50, trims: [{ name: 'Base', price: 50, features: ['Nappa leather'] }, { name: 'X-Line', price: 52 }] },
  'Kia Soul': { basePrice: 22, trims: [{ name: 'LX', price: 22 }, { name: 'S', price: 24 }, { name: 'GT-Line', price: 26 }, { name: 'EX', price: 27 }, { name: 'Turbo', price: 30, features: ['201 hp'] }] },
  'Kia Sportage': { basePrice: 32, trims: [{ name: 'LX', price: 32 }, { name: 'EX', price: 36 }, { name: 'SX', price: 40 }, { name: 'SX Prestige', price: 42 }, { name: 'X-Pro', price: 44, features: ['Off-road'] }, { name: 'X-Pro Prestige', price: 48 }] },
  'Kia Telluride': { basePrice: 38, trims: [{ name: 'LX', price: 38 }, { name: 'S', price: 42 }, { name: 'EX', price: 46 }, { name: 'SX', price: 50 }, { name: 'SX Prestige', price: 52 }, { name: 'X-Line', price: 54, features: ['Off-road styling'] }, { name: 'X-Pro', price: 56, features: ['Off-road'] }] },

  // ==================== KOENIGSEGG ====================
  'Koenigsegg CC850': { basePrice: 3650, trims: [{ name: 'Base', price: 3650, features: ['1385 hp V8'] }] },
  'Koenigsegg Gemera': { basePrice: 1700, trims: [{ name: 'Base', price: 1700, features: ['2300 hp', '4-seater'] }] },
  'Koenigsegg Jesko': { basePrice: 3000, trims: [{ name: 'Base', price: 3000, features: ['1600 hp'] }, { name: 'Attack', price: 3200, features: ['Track package'] }] },
  'Koenigsegg Jesko Absolut': { basePrice: 3300, trims: [{ name: 'Base', price: 3300, features: ['Top speed focused'] }] },
  'Koenigsegg Regera': { basePrice: 2000, trims: [{ name: 'Base', price: 2000, features: ['1500 hp hybrid'] }] },

  // ==================== LAMBORGHINI ====================
  'Lamborghini Huracán STO': { basePrice: 330, trims: [{ name: 'Base', price: 330, features: ['640 hp'] }] },
  'Lamborghini Huracán Sterrato': { basePrice: 275, trims: [{ name: 'Base', price: 275, features: ['602 hp', 'Off-road'] }] },
  'Lamborghini Huracán Tecnica': { basePrice: 275, trims: [{ name: 'Base', price: 275, features: ['631 hp', 'RWD'] }] },
  'Lamborghini Aventador': { basePrice: 498, trims: [{ name: 'LP 780-4 Ultimae Coupe', price: 498, features: ['769 hp', 'V12', 'AWD', 'Scissor doors'] }, { name: 'LP 780-4 Ultimae Roadster', price: 547, features: ['769 hp', 'V12', 'Removable roof panels'] }, { name: 'SVJ Coupe', price: 515, features: ['770 hp', 'Active aero', 'Nürburgring record'] }, { name: 'SVJ Roadster', price: 577, features: ['770 hp', 'Active aero', 'Open-top'] }] },
  'Lamborghini Revuelto': { basePrice: 600, trims: [{ name: 'Base', price: 600, features: ['1001 hp hybrid V12'] }] },
  'Lamborghini Urus': { basePrice: 240, trims: [{ name: 'Base', price: 240 }, { name: 'S', price: 260 }, { name: 'Performante', price: 280, features: ['666 hp'] }] },
  'Lamborghini Urus SE': { basePrice: 275, trims: [{ name: 'Base', price: 275, features: ['789 hp plug-in hybrid'] }] },

  // ==================== LEXUS ====================
  'Lexus ES': { basePrice: 42, trims: [{ name: '250', price: 42 }, { name: '300h', price: 45, features: ['Hybrid'] }, { name: '350', price: 48, features: ['302 hp V6'] }, { name: '350 F Sport', price: 52 }] },
  'Lexus GX': { basePrice: 65, trims: [{ name: 'Premium', price: 65 }, { name: 'Premium+', price: 72 }, { name: 'Luxury', price: 78 }, { name: 'Overtrail', price: 75, features: ['Off-road'] }, { name: 'Overtrail+', price: 80 }] },
  'Lexus IS': { basePrice: 42, trims: [{ name: '300', price: 42 }, { name: '300 AWD', price: 44 }, { name: '350 F Sport', price: 48, features: ['311 hp'] }, { name: '500 F Sport', price: 58, features: ['472 hp V8'] }] },
  'Lexus IS 300': { basePrice: 42, trims: [{ name: 'Base', price: 42 }, { name: 'F Sport', price: 46 }] },
  'Lexus LC 500': { basePrice: 98, trims: [{ name: 'Base', price: 98, features: ['471 hp V8'] }, { name: 'Inspiration Series', price: 108 }] },
  'Lexus LC 500 Convertible': { basePrice: 105, trims: [{ name: 'Base', price: 105, features: ['471 hp V8'] }] },
  'Lexus LX': { basePrice: 92, trims: [{ name: '600', price: 92 }, { name: '600 Premium', price: 98 }, { name: '600 Luxury', price: 105, features: ['4-seat'] }, { name: '600 Ultra Luxury', price: 130 }] },
  'Lexus NX': { basePrice: 42, trims: [{ name: '250', price: 42 }, { name: '350', price: 48, features: ['275 hp'] }, { name: '350h', price: 50, features: ['Hybrid'] }, { name: '450h+', price: 58, features: ['PHEV'] }] },
  'Lexus NX 350 F Sport': { basePrice: 52, trims: [{ name: 'Base', price: 52, features: ['275 hp turbo'] }] },
  'Lexus RC F': { basePrice: 68, trims: [{ name: 'Base', price: 68, features: ['472 hp V8'] }, { name: 'Track Edition', price: 98, features: ['Carbon fiber'] }] },
  'Lexus RX': { basePrice: 50, trims: [{ name: '350', price: 50 }, { name: '350h', price: 52, features: ['Hybrid'] }, { name: '450h+', price: 60, features: ['PHEV'] }, { name: '500h', price: 62, features: ['366 hp'] }] },
  'Lexus RX 350 F Sport': { basePrice: 56, trims: [{ name: 'Base', price: 56, features: ['Sport suspension'] }] },
  'Lexus RX 500h F Sport': { basePrice: 62, trims: [{ name: 'Base', price: 62, features: ['366 hp hybrid'] }] },
  'Lexus TX': { basePrice: 58, trims: [{ name: '350', price: 58 }, { name: '500h', price: 65, features: ['366 hp hybrid'] }, { name: '550h+', price: 72, features: ['406 hp PHEV'] }] },

  // ==================== LINCOLN ====================
  'Lincoln Aviator': { basePrice: 58, trims: [{ name: 'Standard', price: 58 }, { name: 'Reserve', price: 65, features: ['30-way seats'] }, { name: 'Grand Touring', price: 72, features: ['494 hp PHEV'] }, { name: 'Black Label', price: 82 }] },
  'Lincoln Aviator Black Label': { basePrice: 82, trims: [{ name: 'Base', price: 82 }, { name: 'Grand Touring', price: 92, features: ['PHEV'] }] },
  'Lincoln Corsair': { basePrice: 42, trims: [{ name: 'Standard', price: 42 }, { name: 'Reserve', price: 48 }, { name: 'Grand Touring', price: 52, features: ['266 hp PHEV'] }] },
  'Lincoln Corsair Reserve': { basePrice: 48, trims: [{ name: 'Base', price: 48, features: ['24-way seats'] }] },
  'Lincoln Nautilus': { basePrice: 48, trims: [{ name: 'Standard', price: 48 }, { name: 'Reserve', price: 55 }, { name: 'Black Label', price: 65 }] },
  'Lincoln Nautilus Reserve': { basePrice: 55, trims: [{ name: 'Base', price: 55, features: ['24-way seats'] }] },
  'Lincoln Navigator': { basePrice: 82, trims: [{ name: 'Standard', price: 82 }, { name: 'Reserve', price: 92 }, { name: 'Black Label', price: 108 }] },
  'Lincoln Navigator Black Label': { basePrice: 108, trims: [{ name: 'Base', price: 108, features: ['Exclusive themes'] }] },

  // ==================== LOTUS ====================
  'Lotus Eletre': { basePrice: 108, trims: [{ name: 'Base', price: 108, features: ['603 hp'] }, { name: 'S', price: 125, features: ['905 hp'] }, { name: 'R', price: 155, features: ['Track focused'] }] },
  'Lotus Eletre R': { basePrice: 155, trims: [{ name: 'Base', price: 155, features: ['905 hp'] }] },
  'Lotus Emeya': { basePrice: 115, trims: [{ name: 'Base', price: 115, features: ['603 hp'] }, { name: 'S', price: 132, features: ['905 hp'] }, { name: 'R', price: 165, features: ['Track focused'] }] },
  'Lotus Emeya R': { basePrice: 165, trims: [{ name: 'Base', price: 165, features: ['905 hp'] }] },
  'Lotus Emira': { basePrice: 82, trims: [{ name: 'Turbo', price: 82, features: ['360 hp turbo-4'] }, { name: 'V6', price: 92, features: ['400 hp supercharged V6'] }, { name: 'V6 First Edition', price: 98 }] },
  'Lotus Emira V6 First Edition': { basePrice: 98, trims: [{ name: 'Base', price: 98, features: ['400 hp V6'] }] },

  // ==================== LUCID ====================
  'Lucid Air Grand Touring': { basePrice: 115, trims: [{ name: 'Base', price: 115, features: ['819 hp', '516 mi'] }, { name: 'Performance', price: 130, features: ['1050 hp'] }] },
  'Lucid Air Pure': { basePrice: 75, trims: [{ name: 'Base', price: 75, features: ['480 hp', '419 mi'] }] },
  'Lucid Air Sapphire': { basePrice: 250, trims: [{ name: 'Base', price: 250, features: ['1234 hp tri-motor'] }] },
  'Lucid Air Touring': { basePrice: 92, trims: [{ name: 'Base', price: 92, features: ['620 hp dual motor'] }] },
  'Lucid Gravity': { basePrice: 95, trims: [{ name: 'Touring', price: 95 }, { name: 'Grand Touring', price: 115 }, { name: 'Dream Edition', price: 150, features: ['Tri-motor'] }] },

  // ==================== MASERATI ====================
  'Maserati Ghibli': { basePrice: 80, trims: [{ name: 'Base', price: 80 }, { name: 'Modena', price: 88 }, { name: 'Trofeo', price: 115, features: ['580 hp V8'] }] },
  'Maserati Ghibli Trofeo': { basePrice: 115, trims: [{ name: 'Base', price: 115, features: ['580 hp V8'] }] },
  'Maserati GranCabrio': { basePrice: 190, trims: [{ name: 'Modena', price: 190, features: ['490 hp'] }, { name: 'Trofeo', price: 225, features: ['542 hp'] }] },
  'Maserati GranTurismo': { basePrice: 175, trims: [{ name: 'Modena', price: 175 }, { name: 'Trofeo', price: 210, features: ['542 hp'] }, { name: 'Folgore', price: 220, features: ['750 hp EV'] }] },
  'Maserati GranTurismo Folgore': { basePrice: 220, trims: [{ name: 'Base', price: 220, features: ['750 hp tri-motor'] }] },
  'Maserati GranTurismo Trofeo': { basePrice: 210, trims: [{ name: 'Base', price: 210, features: ['542 hp Nettuno V6'] }] },
  'Maserati Grecale': { basePrice: 68, trims: [{ name: 'GT', price: 68 }, { name: 'Modena', price: 78 }, { name: 'Trofeo', price: 98, features: ['523 hp'] }, { name: 'Folgore', price: 85, features: ['550 hp EV'] }] },
  'Maserati Grecale Folgore': { basePrice: 85, trims: [{ name: 'Base', price: 85, features: ['550 hp dual motor'] }] },
  'Maserati Grecale Trofeo': { basePrice: 98, trims: [{ name: 'Base', price: 98, features: ['523 hp Nettuno V6'] }] },
  'Maserati MC20': { basePrice: 225, trims: [{ name: 'Base', price: 225, features: ['621 hp Nettuno V6'] }] },
  'Maserati MC20 Cielo': { basePrice: 265, trims: [{ name: 'Base', price: 265, features: ['621 hp', 'Glass roof'] }] },
  'Maserati Quattroporte': { basePrice: 105, trims: [{ name: 'GT', price: 105 }, { name: 'Modena', price: 118 }, { name: 'Trofeo', price: 148, features: ['580 hp V8'] }] },
  'Maserati Quattroporte Trofeo': { basePrice: 148, trims: [{ name: 'Base', price: 148, features: ['580 hp V8'] }] },

  // ==================== MAZDA ====================
  'Mazda 3': { basePrice: 24, trims: [{ name: '2.5 S', price: 24 }, { name: '2.5 S Select', price: 26 }, { name: '2.5 S Preferred', price: 28, features: ['Sunroof'] }, { name: '2.5 Turbo', price: 32, features: ['250 hp'] }, { name: '2.5 Turbo Premium Plus', price: 36, features: ['Bose'] }] },
  'Mazda 3 Hatchback': { basePrice: 25, trims: [{ name: '2.5 S', price: 25 }, { name: '2.5 S Select', price: 27 }, { name: '2.5 S Preferred', price: 29 }, { name: '2.5 Turbo', price: 33, features: ['250 hp'] }, { name: '2.5 Turbo Premium Plus', price: 37 }] },
  'Mazda CX-30': { basePrice: 26, trims: [{ name: '2.5 S', price: 26 }, { name: '2.5 S Select', price: 28 }, { name: '2.5 S Preferred', price: 30 }, { name: '2.5 Turbo', price: 34, features: ['250 hp'] }, { name: '2.5 Turbo Premium Plus', price: 38 }] },
  'Mazda CX-5': { basePrice: 30, trims: [{ name: '2.5 S', price: 30 }, { name: '2.5 S Select', price: 32 }, { name: '2.5 S Preferred', price: 34 }, { name: '2.5 S Carbon Edition', price: 35 }, { name: '2.5 Turbo', price: 38, features: ['256 hp'] }, { name: '2.5 Turbo Signature', price: 42, features: ['Nappa leather'] }] },
  'Mazda CX-5 Turbo': { basePrice: 38, trims: [{ name: 'Base', price: 38 }, { name: 'Signature', price: 42, features: ['Nappa leather'] }] },
  'Mazda CX-50': { basePrice: 32, trims: [{ name: '2.5 S', price: 32 }, { name: '2.5 S Select', price: 34 }, { name: '2.5 S Preferred', price: 36 }, { name: '2.5 Turbo', price: 40 }, { name: '2.5 Turbo Meridian', price: 44, features: ['Off-road'] }, { name: '2.5 Turbo Premium Plus', price: 48 }] },
  'Mazda CX-50 Meridian': { basePrice: 44, trims: [{ name: 'Base', price: 44, features: ['Off-road package'] }] },
  'Mazda CX-50 Meridian Edition': { basePrice: 44, trims: [{ name: 'Base', price: 44, features: ['Off-road suspension'] }] },
  'Mazda CX-70': { basePrice: 42, trims: [{ name: '3.3 Turbo S', price: 42 }, { name: '3.3 Turbo S Select', price: 46 }, { name: '3.3 Turbo S Premium', price: 50 }, { name: 'PHEV Premium Plus', price: 56, features: ['323 hp'] }] },
  'Mazda CX-90': { basePrice: 42, trims: [{ name: '3.3 Turbo S', price: 42 }, { name: '3.3 Turbo S Select', price: 46 }, { name: '3.3 Turbo S Premium', price: 50 }, { name: '3.3 Turbo S Premium Plus', price: 54, features: ['Bose'] }, { name: 'PHEV Premium Plus', price: 52, features: ['323 hp'] }] },
  'Mazda CX-90 PHEV': { basePrice: 50, trims: [{ name: 'Preferred', price: 50 }, { name: 'Premium Plus', price: 56, features: ['Nappa leather'] }] },
  'Mazda CX-90 PHEV Premium': { basePrice: 52, trims: [{ name: 'Base', price: 52 }, { name: 'Plus', price: 56, features: ['Nappa leather'] }] },
  'Mazda MX-5 Miata': { basePrice: 30, trims: [{ name: 'Sport', price: 30 }, { name: 'Club', price: 34, features: ['Bilstein', 'LSD'] }, { name: 'Grand Touring', price: 38, features: ['Leather', 'Bose'] }] },

  // ==================== MCLAREN ====================
  'McLaren 750S': { basePrice: 330, trims: [{ name: 'Coupe', price: 330, features: ['750 hp'] }, { name: 'Spider', price: 360, features: ['Retractable hardtop'] }] },
  'McLaren 750S Spider': { basePrice: 360, trims: [{ name: 'Base', price: 360, features: ['750 hp', 'Convertible'] }] },
  'McLaren Artura': { basePrice: 242, trims: [{ name: 'Base', price: 242, features: ['671 hp hybrid'] }, { name: 'Spider', price: 272 }] },
  'McLaren Artura Spider': { basePrice: 272, trims: [{ name: 'Base', price: 272, features: ['671 hp hybrid'] }] },
  'McLaren GT': { basePrice: 222, trims: [{ name: 'Base', price: 222, features: ['612 hp V8'] }] },

  // ==================== MERCEDES-BENZ ====================
  'Mercedes-Benz C-Class': { basePrice: 48, trims: [{ name: 'C 300', price: 48 }, { name: 'C 300 4MATIC', price: 52, features: ['AWD'] }] },
  'Mercedes-Benz E-Class': { basePrice: 58, trims: [{ name: 'E 350', price: 58 }, { name: 'E 350 4MATIC', price: 62, features: ['AWD'] }, { name: 'E 450 4MATIC', price: 72, features: ['375 hp'] }] },
  'Mercedes-Benz EQB': { basePrice: 55, trims: [{ name: '250+', price: 55, features: ['FWD'] }, { name: '300 4MATIC', price: 58, features: ['AWD'] }, { name: '350 4MATIC', price: 62, features: ['288 hp'] }] },
  'Mercedes-Benz EQS': { basePrice: 108, trims: [{ name: '450+', price: 108, features: ['RWD'] }, { name: '450 4MATIC', price: 112, features: ['AWD'] }, { name: '580 4MATIC', price: 130, features: ['516 hp'] }] },
  'Mercedes-Benz G-Class': { basePrice: 145, trims: [{ name: 'G 550', price: 145, features: ['416 hp V8'] }] },
  'Mercedes-Benz GLA': { basePrice: 42, trims: [{ name: 'GLA 250', price: 42 }, { name: 'GLA 250 4MATIC', price: 44, features: ['AWD'] }] },
  'Mercedes-Benz GLB': { basePrice: 45, trims: [{ name: 'GLB 250', price: 45 }, { name: 'GLB 250 4MATIC', price: 47, features: ['AWD'] }] },
  'Mercedes-Benz GLC': { basePrice: 50, trims: [{ name: 'GLC 300', price: 50 }, { name: 'GLC 300 4MATIC', price: 52, features: ['AWD'] }] },
  'Mercedes-Benz GLE': { basePrice: 62, trims: [{ name: 'GLE 350', price: 62 }, { name: 'GLE 350 4MATIC', price: 65, features: ['AWD'] }, { name: 'GLE 450 4MATIC', price: 72, features: ['375 hp'] }, { name: 'GLE 580 4MATIC', price: 88, features: ['483 hp V8'] }] },
  'Mercedes-Benz GLS': { basePrice: 85, trims: [{ name: 'GLS 450 4MATIC', price: 85 }, { name: 'GLS 580 4MATIC', price: 105, features: ['483 hp V8'] }, { name: 'Maybach GLS 600', price: 175, features: ['550 hp'] }] },
  'Mercedes-Benz S-Class': { basePrice: 118, trims: [{ name: 'S 500 4MATIC', price: 118 }, { name: 'S 580 4MATIC', price: 135, features: ['496 hp V8'] }, { name: 'Maybach S 580', price: 195 }, { name: 'Maybach S 680', price: 250, features: ['621 hp V12'] }] },
  'Mercedes-AMG C43': { basePrice: 62, trims: [{ name: '4MATIC', price: 62, features: ['402 hp'] }] },
  'Mercedes-AMG C63': { basePrice: 85, trims: [{ name: 'S E Performance', price: 85, features: ['671 hp hybrid'] }] },
  'Mercedes-AMG E53': { basePrice: 82, trims: [{ name: '4MATIC+', price: 82, features: ['429 hp'] }] },
  'Mercedes-AMG E63 S': { basePrice: 115, trims: [{ name: '4MATIC+', price: 115, features: ['603 hp V8'] }] },
  'Mercedes-AMG GLC43': { basePrice: 65, trims: [{ name: '4MATIC', price: 65, features: ['402 hp'] }] },
  'Mercedes-AMG GLC63': { basePrice: 88, trims: [{ name: 'S E Performance', price: 88, features: ['671 hp hybrid'] }] },
  'Mercedes-AMG GLE53': { basePrice: 82, trims: [{ name: '4MATIC+', price: 82, features: ['429 hp'] }] },
  'Mercedes-AMG GLE63 S': { basePrice: 125, trims: [{ name: '4MATIC+', price: 125, features: ['603 hp V8'] }] },
  'Mercedes-AMG GLS63': { basePrice: 138, trims: [{ name: '4MATIC+', price: 138, features: ['603 hp V8'] }] },

  // ==================== NISSAN ====================
  'Nissan Altima': { basePrice: 28, trims: [{ name: 'S', price: 28 }, { name: 'SV', price: 30 }, { name: 'SR', price: 32 }, { name: 'SL', price: 35, features: ['Leather', 'Bose'] }, { name: 'Platinum', price: 38 }] },
  'Nissan Ariya': { basePrice: 45, trims: [{ name: 'Engage', price: 45, features: ['FWD'] }, { name: 'Venture+', price: 50 }, { name: 'Evolve+', price: 52 }, { name: 'e-4ORCE', price: 55, features: ['389 hp dual motor'] }, { name: 'Platinum+ e-4ORCE', price: 62 }] },
  'Nissan Frontier': { basePrice: 32, trims: [{ name: 'S', price: 32 }, { name: 'SV', price: 38 }, { name: 'PRO-4X', price: 45, features: ['Off-road'] }, { name: 'PRO-X', price: 42 }] },
  'Nissan Kicks': { basePrice: 22, trims: [{ name: 'S', price: 22 }, { name: 'SV', price: 24 }, { name: 'SR', price: 26, features: ['Bose'] }] },
  'Nissan Leaf': { basePrice: 32, trims: [{ name: 'S', price: 32, features: ['149 mi range'] }, { name: 'SV Plus', price: 38, features: ['214 hp', '212 mi'] }] },
  'Nissan Murano': { basePrice: 38, trims: [{ name: 'S', price: 38 }, { name: 'SV', price: 42 }, { name: 'SL', price: 48, features: ['Leather', 'Bose'] }, { name: 'Platinum', price: 52 }] },
  'Nissan Pathfinder': { basePrice: 38, trims: [{ name: 'S', price: 38 }, { name: 'SV', price: 42 }, { name: 'SL', price: 48 }, { name: 'Rock Creek', price: 50, features: ['Off-road'] }, { name: 'Platinum', price: 52 }] },
  'Nissan Pathfinder Rock Creek': { basePrice: 50, trims: [{ name: 'Base', price: 50, features: ['Off-road package'] }] },
  'Nissan Rogue': { basePrice: 32, trims: [{ name: 'S', price: 32 }, { name: 'SV', price: 35 }, { name: 'SL', price: 42, features: ['Leather', 'Bose'] }, { name: 'Platinum', price: 45, features: ['ProPilot 2.0'] }] },
  'Nissan Rogue SL': { basePrice: 42, trims: [{ name: 'Base', price: 42, features: ['Leather', 'Bose'] }] },
  'Nissan Sentra': { basePrice: 22, trims: [{ name: 'S', price: 22 }, { name: 'SV', price: 24 }, { name: 'SR', price: 26, features: ['Bose'] }] },
  'Nissan Titan': { basePrice: 48, trims: [{ name: 'S', price: 48 }, { name: 'SV', price: 52 }, { name: 'PRO-4X', price: 58, features: ['Off-road'] }, { name: 'Platinum Reserve', price: 65 }] },
  'Nissan Versa': { basePrice: 18, trims: [{ name: 'S', price: 18 }, { name: 'SV', price: 20 }, { name: 'SR', price: 22 }] },
  'Nissan Z': { basePrice: 45, trims: [{ name: 'Sport', price: 45, features: ['400 hp V6'] }, { name: 'Performance', price: 52, features: ['Bigger brakes', 'LSD'] }, { name: 'Nismo', price: 68, features: ['420 hp'] }] },
  'Nissan Z Nismo': { basePrice: 68, trims: [{ name: 'Base', price: 68, features: ['420 hp V6'] }] },

  // ==================== PAGANI ====================
  'Pagani Huayra': { basePrice: 2500, trims: [{ name: 'Base', price: 2500, features: ['730 hp V12'] }, { name: 'Roadster', price: 2800 }, { name: 'BC', price: 3000, features: ['789 hp'] }] },
  'Pagani Huayra Roadster': { basePrice: 2800, trims: [{ name: 'Base', price: 2800, features: ['730 hp V12'] }] },
  'Pagani Utopia': { basePrice: 2200, trims: [{ name: 'Base', price: 2200, features: ['852 hp V12', 'Manual'] }] },

  // ==================== PORSCHE ====================
  'Porsche 718 Boxster': { basePrice: 68, trims: [{ name: 'Base', price: 68 }, { name: 'T', price: 72, features: ['Sport Chrono'] }, { name: 'S', price: 82, features: ['350 hp'] }, { name: 'GTS 4.0', price: 95, features: ['394 hp flat-6'] }, { name: 'Spyder', price: 105, features: ['Lightweight'] }] },
  'Porsche 718 Cayman': { basePrice: 66, trims: [{ name: 'Base', price: 66 }, { name: 'T', price: 70 }, { name: 'S', price: 80, features: ['350 hp'] }, { name: 'GTS 4.0', price: 92, features: ['394 hp'] }, { name: 'GT4', price: 105, features: ['414 hp'] }, { name: 'GT4 RS', price: 145, features: ['493 hp'] }] },
  'Porsche 911': { basePrice: 115, trims: [{ name: 'Carrera', price: 115 }, { name: 'Carrera S', price: 130, features: ['443 hp'] }, { name: 'Carrera 4S', price: 140, features: ['AWD'] }, { name: 'Carrera GTS', price: 150, features: ['473 hp'] }, { name: 'Turbo', price: 185, features: ['572 hp'] }, { name: 'Turbo S', price: 220, features: ['640 hp'] }, { name: 'GT3', price: 185, features: ['502 hp NA'] }, { name: 'GT3 RS', price: 230, features: ['518 hp'] }] },
  'Porsche Cayenne': { basePrice: 78, trims: [{ name: 'Base', price: 78 }, { name: 'S', price: 95, features: ['468 hp'] }, { name: 'E-Hybrid', price: 95, features: ['PHEV'] }, { name: 'GTS', price: 115, features: ['453 hp'] }, { name: 'Turbo', price: 145, features: ['631 hp V8'] }, { name: 'Turbo E-Hybrid', price: 165, features: ['729 hp'] }, { name: 'Turbo GT', price: 195 }] },
  'Porsche Macan': { basePrice: 62, trims: [{ name: 'Base', price: 62 }, { name: 'S', price: 75, features: ['375 hp'] }, { name: 'GTS', price: 88, features: ['434 hp'] }, { name: 'T', price: 68, features: ['Sport tuning'] }] },
  'Porsche Panamera': { basePrice: 98, trims: [{ name: 'Base', price: 98 }, { name: '4', price: 105, features: ['AWD'] }, { name: '4 E-Hybrid', price: 115, features: ['455 hp PHEV'] }, { name: 'GTS', price: 135, features: ['473 hp V8'] }, { name: 'Turbo', price: 165, features: ['620 hp V8'] }, { name: 'Turbo S E-Hybrid', price: 195, features: ['690 hp'] }] },
  'Porsche Taycan': { basePrice: 92, trims: [{ name: 'Base', price: 92, features: ['RWD'] }, { name: '4S', price: 108, features: ['536 hp', 'AWD'] }, { name: 'GTS', price: 135, features: ['590 hp'] }, { name: 'Turbo', price: 160, features: ['670 hp'] }, { name: 'Turbo S', price: 195, features: ['750 hp'] }] },

  // ==================== RAM ====================
  'Ram 1500': { basePrice: 40, trims: [{ name: 'Tradesman', price: 40 }, { name: 'Big Horn', price: 48, features: ['395 hp V8'] }, { name: 'Laramie', price: 55, features: ['Leather'] }, { name: 'Rebel', price: 58, features: ['Off-road'] }, { name: 'Limited', price: 65 }, { name: 'TRX', price: 85, features: ['702 hp'] }] },
  'Ram 1500 Limited': { basePrice: 65, trims: [{ name: 'Base', price: 65 }, { name: 'Longhorn', price: 68, features: ['Western luxury'] }] },
  'Ram 1500 Rebel': { basePrice: 58, trims: [{ name: 'Base', price: 58, features: ['Off-road suspension'] }] },
  'Ram 1500 TRX': { basePrice: 85, trims: [{ name: 'Base', price: 85, features: ['702 hp supercharged V8'] }] },
  'Ram 2500': { basePrice: 45, trims: [{ name: 'Tradesman', price: 45 }, { name: 'Big Horn', price: 52 }, { name: 'Power Wagon', price: 62, features: ['Off-road'] }, { name: 'Laramie', price: 65 }, { name: 'Limited', price: 78 }] },
  'Ram 3500': { basePrice: 48, trims: [{ name: 'Tradesman', price: 48 }, { name: 'Big Horn', price: 55 }, { name: 'Laramie', price: 68 }, { name: 'Limited', price: 82 }] },

  // ==================== RIVIAN ====================
  'Rivian R1S': { basePrice: 82, trims: [{ name: 'Dual-Motor', price: 82, features: ['533 hp'] }, { name: 'Performance Dual-Motor', price: 95, features: ['600 hp'] }, { name: 'Quad-Motor', price: 115, features: ['835 hp'] }] },
  'Rivian R1T': { basePrice: 78, trims: [{ name: 'Dual-Motor', price: 78, features: ['533 hp'] }, { name: 'Performance Dual-Motor', price: 92, features: ['600 hp'] }, { name: 'Quad-Motor', price: 105, features: ['835 hp'] }] },

  // ==================== ROLLS-ROYCE ====================
  'Rolls-Royce Cullinan': { basePrice: 370, trims: [{ name: 'Base', price: 370, features: ['563 hp V12'] }, { name: 'Black Badge', price: 420, features: ['591 hp'] }] },
  'Rolls-Royce Cullinan Black Badge': { basePrice: 420, trims: [{ name: 'Base', price: 420, features: ['591 hp V12'] }] },
  'Rolls-Royce Ghost': { basePrice: 350, trims: [{ name: 'Base', price: 350, features: ['563 hp V12'] }, { name: 'Extended', price: 385, features: ['Extended wheelbase'] }, { name: 'Black Badge', price: 415, features: ['591 hp'] }] },
  'Rolls-Royce Ghost Black Badge': { basePrice: 415, trims: [{ name: 'Base', price: 415, features: ['591 hp V12'] }] },
  'Rolls-Royce Ghost Extended': { basePrice: 385, trims: [{ name: 'Base', price: 385, features: ['Extended wheelbase'] }] },
  'Rolls-Royce Phantom': { basePrice: 475, trims: [{ name: 'Base', price: 475, features: ['563 hp V12'] }, { name: 'Extended', price: 530, features: ['Extended wheelbase'] }] },
  'Rolls-Royce Phantom Extended': { basePrice: 530, trims: [{ name: 'Base', price: 530, features: ['Extended wheelbase'] }] },
  'Rolls-Royce Spectre': { basePrice: 430, trims: [{ name: 'Base', price: 430, features: ['577 hp dual motor EV'] }] },

  // ==================== SUBARU ====================
  'Subaru Ascent': { basePrice: 35, trims: [{ name: 'Base', price: 35 }, { name: 'Premium', price: 38 }, { name: 'Limited', price: 42 }, { name: 'Touring', price: 48, features: ['Nappa leather'] }, { name: 'Onyx Edition', price: 44 }] },
  'Subaru BRZ': { basePrice: 30, trims: [{ name: 'Premium', price: 30 }, { name: 'Limited', price: 34, features: ['Leather/Alcantara'] }, { name: 'tS', price: 36, features: ['STI parts', 'Brembo'] }] },
  'Subaru Crosstrek': { basePrice: 27, trims: [{ name: 'Base', price: 27 }, { name: 'Premium', price: 30 }, { name: 'Sport', price: 32, features: ['182 hp'] }, { name: 'Limited', price: 34 }, { name: 'Wilderness', price: 36, features: ['Off-road'] }] },
  'Subaru Crosstrek Wilderness': { basePrice: 36, trims: [{ name: 'Base', price: 36, features: ['Off-road suspension'] }] },
  'Subaru Forester': { basePrice: 32, trims: [{ name: 'Base', price: 32 }, { name: 'Premium', price: 35 }, { name: 'Sport', price: 38 }, { name: 'Limited', price: 40 }, { name: 'Touring', price: 42 }, { name: 'Wilderness', price: 38, features: ['Off-road'] }] },
  'Subaru Forester Wilderness': { basePrice: 38, trims: [{ name: 'Base', price: 38, features: ['Off-road package'] }] },
  'Subaru Impreza': { basePrice: 24, trims: [{ name: 'Base', price: 24 }, { name: 'Sport', price: 27, features: ['18" wheels'] }, { name: 'RS', price: 30, features: ['Sport suspension'] }] },
  'Subaru Legacy': { basePrice: 26, trims: [{ name: 'Base', price: 26 }, { name: 'Premium', price: 30, features: ['Sunroof'] }, { name: 'Sport', price: 32 }, { name: 'Limited', price: 35 }, { name: 'Touring', price: 38, features: ['Nappa leather'] }, { name: 'GT', price: 40, features: ['260 hp turbo'] }] },
  'Subaru Outback': { basePrice: 31, trims: [{ name: 'Base', price: 31 }, { name: 'Premium', price: 34 }, { name: 'Limited', price: 38 }, { name: 'Touring', price: 42, features: ['Nappa leather'] }, { name: 'Onyx Edition', price: 40 }, { name: 'Onyx Edition XT', price: 44, features: ['260 hp turbo'] }, { name: 'Wilderness', price: 42, features: ['Off-road'] }] },
  'Subaru Outback Wilderness': { basePrice: 42, trims: [{ name: 'Base', price: 42, features: ['260 hp turbo', 'Off-road'] }] },
  'Subaru WRX': { basePrice: 32, trims: [{ name: 'Base', price: 32 }, { name: 'Premium', price: 35 }, { name: 'Limited', price: 38 }, { name: 'GT', price: 45, features: ['Adaptive dampers'] }, { name: 'TR', price: 36, features: ['Track ready'] }] },
  'Subaru WRX TR': { basePrice: 36, trims: [{ name: 'Base', price: 36, features: ['Manual', 'Track ready'] }] },

  // ==================== TESLA ====================
  'Tesla Cybertruck': { basePrice: 80, trims: [{ name: 'Dual Motor', price: 80, features: ['600 hp'] }, { name: 'Tri Motor', price: 100, features: ['845 hp'] }, { name: 'Cyberbeast', price: 120, features: ['845 hp', 'Performance'] }] },
  'Tesla Model 3': { basePrice: 43, trims: [{ name: 'Standard Range', price: 43, features: ['272 mi range'] }, { name: 'Long Range', price: 48, features: ['333 mi', 'AWD'] }, { name: 'Performance', price: 52, features: ['315 mi', 'Track mode'] }] },
  'Tesla Model S': { basePrice: 90, trims: [{ name: 'Base', price: 90, features: ['405 mi', '670 hp'] }, { name: 'Plaid', price: 110, features: ['396 mi', '1020 hp'] }] },
  'Tesla Model X': { basePrice: 95, trims: [{ name: 'Base', price: 95, features: ['348 mi', '670 hp'] }, { name: 'Plaid', price: 115, features: ['326 mi', '1020 hp'] }] },
  'Tesla Model Y': { basePrice: 48, trims: [{ name: 'Standard Range', price: 48, features: ['260 mi range'] }, { name: 'Long Range', price: 52, features: ['310 mi', 'AWD'] }, { name: 'Performance', price: 55, features: ['303 mi', 'Track mode'] }] },

  // ==================== TOYOTA ====================
  'Toyota 4Runner': { basePrice: 42, trims: [{ name: 'SR5', price: 42 }, { name: 'SR5 Premium', price: 45, features: ['Moonroof'] }, { name: 'TRD Sport', price: 48 }, { name: 'TRD Off-Road', price: 50, features: ['Crawl control'] }, { name: 'TRD Off-Road Premium', price: 54 }, { name: 'Limited', price: 56 }, { name: 'Platinum', price: 58 }, { name: 'TRD Pro', price: 62, features: ['Fox shocks'] }] },
  'Toyota 4Runner TRD Pro': { basePrice: 62, trims: [{ name: 'Base', price: 62, features: ['326 hp hybrid', 'Fox shocks'] }] },
  'Toyota Camry': { basePrice: 28, trims: [{ name: 'LE', price: 28 }, { name: 'SE', price: 30, features: ['Sport suspension'] }, { name: 'XLE', price: 32, features: ['Leather', 'Sunroof'] }, { name: 'XSE', price: 33, features: ['Sport + Luxury'] }] },
  'Toyota Corolla': { basePrice: 23, trims: [{ name: 'LE', price: 23 }, { name: 'SE', price: 25, features: ['Sport styling'] }, { name: 'XLE', price: 27, features: ['Premium audio'] }, { name: 'XSE', price: 28 }] },
  'Toyota Corolla Cross': { basePrice: 25, trims: [{ name: 'L', price: 25 }, { name: 'LE', price: 27 }, { name: 'XLE', price: 30, features: ['Leather', 'Sunroof'] }, { name: 'S', price: 28, features: ['Sport styling'] }] },
  'Toyota Corolla Hatchback': { basePrice: 24, trims: [{ name: 'SE', price: 24 }, { name: 'XSE', price: 28, features: ['Premium features'] }, { name: 'Nightshade', price: 26 }] },
  'Toyota Crown': { basePrice: 42, trims: [{ name: 'XLE', price: 42 }, { name: 'Limited', price: 48, features: ['JBL audio'] }, { name: 'Platinum', price: 55, features: ['340 hp', 'AWD'] }] },
  'Toyota Crown Signia': { basePrice: 45, trims: [{ name: 'XLE', price: 45, features: ['243 hp hybrid'] }, { name: 'Limited', price: 52, features: ['JBL audio'] }, { name: 'Platinum', price: 58 }] },
  'Toyota GR Corolla': { basePrice: 37, trims: [{ name: 'Core', price: 37, features: ['300 hp turbo'] }, { name: 'Premium', price: 40, features: ['JBL audio'] }, { name: 'Circuit Edition', price: 45, features: ['Carbon roof'] }, { name: 'Morizo Edition', price: 52, features: ['Lightweight'] }] },
  'Toyota GR Supra': { basePrice: 52, trims: [{ name: '2.0', price: 52, features: ['255 hp turbo-4'] }, { name: '3.0', price: 56, features: ['382 hp turbo-6'] }, { name: '3.0 Premium', price: 58, features: ['JBL audio'] }, { name: 'A91-MT Edition', price: 60, features: ['Manual'] }] },
  'Toyota GR86': { basePrice: 30, trims: [{ name: 'Base', price: 30 }, { name: 'Premium', price: 34, features: ['Leather/Alcantara'] }, { name: 'Trueno Edition', price: 35, features: ['Special livery'] }] },
  'Toyota Grand Highlander': { basePrice: 45, trims: [{ name: 'XLE', price: 45 }, { name: 'Limited', price: 52, features: ['JBL audio'] }, { name: 'Platinum', price: 58 }, { name: 'Hybrid Max XLE', price: 50, features: ['362 hp hybrid'] }, { name: 'Hybrid Max Platinum', price: 62 }] },
  'Toyota Highlander': { basePrice: 40, trims: [{ name: 'LE', price: 40, features: ['243 hp hybrid'] }, { name: 'XLE', price: 45, features: ['Power liftgate'] }, { name: 'XSE', price: 48, features: ['Sport styling'] }, { name: 'Limited', price: 52 }, { name: 'Platinum', price: 55 }] },
  'Toyota Land Cruiser': { basePrice: 58, trims: [{ name: '1958', price: 58, features: ['Heritage styling'] }, { name: 'Land Cruiser', price: 62 }, { name: 'First Edition', price: 75 }] },
  'Toyota Land Cruiser 250': { basePrice: 62, trims: [{ name: 'Base', price: 62, features: ['326 hp hybrid'] }, { name: 'Premium', price: 68, features: ['Premium audio'] }] },
  'Toyota Prius': { basePrice: 30, trims: [{ name: 'LE', price: 30, features: ['196 hp hybrid'] }, { name: 'XLE', price: 34, features: ['Heated seats'] }, { name: 'Limited', price: 38, features: ['Head-up display'] }, { name: 'Prime', price: 36, features: ['220 hp PHEV'] }] },
  'Toyota RAV4': { basePrice: 32, trims: [{ name: 'LE', price: 32 }, { name: 'XLE', price: 34, features: ['Power liftgate'] }, { name: 'XLE Premium', price: 36, features: ['Moonroof'] }, { name: 'Adventure', price: 38, features: ['Orange accents'] }, { name: 'TRD Off-Road', price: 42, features: ['Off-road suspension'] }, { name: 'Limited', price: 42 }] },
  'Toyota RAV4 TRD Off-Road': { basePrice: 42, trims: [{ name: 'Base', price: 42, features: ['Off-road suspension'] }] },
  'Toyota Sequoia': { basePrice: 62, trims: [{ name: 'SR5', price: 62, features: ['437 hp hybrid'] }, { name: 'Limited', price: 70, features: ['JBL audio'] }, { name: 'Platinum', price: 78 }, { name: 'TRD Pro', price: 82, features: ['Off-road'] }, { name: 'Capstone', price: 85, features: ['Semi-aniline leather'] }] },
  'Toyota Sienna': { basePrice: 38, trims: [{ name: 'LE', price: 38, features: ['245 hp hybrid'] }, { name: 'XLE', price: 42, features: ['Power doors'] }, { name: 'XSE', price: 48, features: ['Sport styling'] }, { name: 'Limited', price: 52 }, { name: 'Platinum', price: 55 }, { name: 'Woodland', price: 50, features: ['Rugged styling'] }] },
  'Toyota Tacoma': { basePrice: 32, trims: [{ name: 'SR', price: 32, features: ['278 hp turbo'] }, { name: 'SR5', price: 35 }, { name: 'TRD Sport', price: 40 }, { name: 'TRD Off-Road', price: 43, features: ['Locking diff'] }, { name: 'Limited', price: 48, features: ['Leather'] }, { name: 'TRD Pro', price: 58, features: ['Fox shocks'] }, { name: 'Trailhunter', price: 62, features: ['Overlanding'] }] },
  'Toyota Tacoma TRD Pro': { basePrice: 58, trims: [{ name: 'Base', price: 58, features: ['326 hp hybrid', 'Fox shocks'] }] },
  'Toyota Tundra': { basePrice: 42, trims: [{ name: 'SR', price: 42, features: ['389 hp twin-turbo V6'] }, { name: 'SR5', price: 45 }, { name: 'Limited', price: 52 }, { name: 'Platinum', price: 58 }, { name: '1794 Edition', price: 60, features: ['Western luxury'] }, { name: 'TRD Pro', price: 68, features: ['Fox shocks'] }, { name: 'Capstone', price: 75, features: ['Semi-aniline leather'] }] },
  'Toyota Tundra TRD Pro': { basePrice: 68, trims: [{ name: 'Base', price: 68, features: ['437 hp hybrid', 'Fox shocks'] }] },
  'Toyota Venza': { basePrice: 35, trims: [{ name: 'LE', price: 35, features: ['219 hp hybrid'] }, { name: 'XLE', price: 40 }, { name: 'Limited', price: 45, features: ['Premium audio'] }] },
  'Toyota bZ4X': { basePrice: 43, trims: [{ name: 'XLE', price: 43, features: ['201 hp', 'FWD'] }, { name: 'XLE AWD', price: 46, features: ['AWD'] }, { name: 'Limited', price: 50, features: ['Premium features'] }] },

  // ==================== VOLKSWAGEN ====================
  'Volkswagen Atlas': { basePrice: 38, trims: [{ name: 'S', price: 38 }, { name: 'SE', price: 42, features: ['Digital cockpit'] }, { name: 'SE w/Tech', price: 46, features: ['Navigation'] }, { name: 'SEL', price: 48, features: ['Leather'] }, { name: 'SEL Premium', price: 52, features: ['Fender audio'] }] },
  'Volkswagen Atlas Peak Edition': { basePrice: 42, trims: [{ name: 'Base', price: 42, features: ['Rugged styling'] }] },
  'Volkswagen Golf GTI': { basePrice: 32, trims: [{ name: 'S', price: 32, features: ['241 hp turbo'] }, { name: 'SE', price: 36, features: ['Digital cockpit'] }, { name: 'Autobahn', price: 40, features: ['Harman Kardon'] }] },
  'Volkswagen Golf R': { basePrice: 46, trims: [{ name: 'Base', price: 46, features: ['315 hp turbo', 'AWD'] }] },
  'Volkswagen ID.4': { basePrice: 40, trims: [{ name: 'Standard', price: 40, features: ['201 hp', 'RWD'] }, { name: 'Pro', price: 44 }, { name: 'Pro S', price: 48 }, { name: 'Pro S Plus', price: 52, features: ['Premium audio'] }] },
  'Volkswagen ID.4 Pro S': { basePrice: 48, trims: [{ name: 'Base', price: 48, features: ['295 hp dual motor'] }, { name: 'Plus', price: 52, features: ['Premium audio'] }] },
  'Volkswagen ID.Buzz': { basePrice: 60, trims: [{ name: 'Pro S', price: 60, features: ['282 hp', 'RWD'] }, { name: 'Pro S Plus', price: 65, features: ['Premium audio'] }] },
  'Volkswagen ID.Buzz LWB': { basePrice: 65, trims: [{ name: 'Pro S Plus', price: 65, features: ['335 hp dual motor'] }] },
  'Volkswagen Jetta': { basePrice: 22, trims: [{ name: 'S', price: 22, features: ['158 hp turbo'] }, { name: 'SE', price: 25, features: ['Digital cockpit'] }, { name: 'SEL', price: 28, features: ['Leather'] }, { name: 'GLI', price: 32, features: ['228 hp turbo'] }] },
  'Volkswagen Jetta Sport': { basePrice: 26, trims: [{ name: 'Base', price: 26, features: ['Sport styling'] }] },
  'Volkswagen Taos': { basePrice: 25, trims: [{ name: 'S', price: 25, features: ['158 hp turbo'] }, { name: 'SE', price: 28, features: ['Digital cockpit'] }, { name: 'SEL', price: 32, features: ['Leather'] }] },
  'Volkswagen Tiguan': { basePrice: 30, trims: [{ name: 'S', price: 30, features: ['184 hp turbo'] }, { name: 'SE', price: 34, features: ['Digital cockpit'] }, { name: 'SE R-Line', price: 38, features: ['R-Line styling'] }, { name: 'SEL', price: 40, features: ['Leather'] }, { name: 'SEL Premium R-Line', price: 45, features: ['Fender audio'] }] },

  // ==================== VOLVO ====================
  'Volvo C40 Recharge': { basePrice: 55, trims: [{ name: 'Core', price: 55, features: ['402 hp dual motor'] }, { name: 'Plus', price: 58, features: ['Pilot Assist'] }, { name: 'Ultimate', price: 62, features: ['Bowers & Wilkins'] }] },
  'Volvo EX30': { basePrice: 38, trims: [{ name: 'Core', price: 38, features: ['268 hp single motor'] }, { name: 'Plus', price: 42, features: ['Panoramic roof'] }, { name: 'Ultra', price: 48, features: ['Harman Kardon'] }, { name: 'Twin Motor', price: 52, features: ['422 hp dual motor'] }] },
  'Volvo EX90': { basePrice: 80, trims: [{ name: 'Plus', price: 80, features: ['402 hp dual motor'] }, { name: 'Ultra', price: 90, features: ['Bowers & Wilkins'] }, { name: 'Twin Motor Performance', price: 85, features: ['496 hp'] }] },
  'Volvo S60': { basePrice: 42, trims: [{ name: 'Core', price: 42, features: ['247 hp turbo'] }, { name: 'Plus', price: 46, features: ['Harman Kardon'] }, { name: 'Ultimate', price: 52, features: ['Bowers & Wilkins'] }, { name: 'Polestar Engineered', price: 58, features: ['455 hp PHEV'] }] },
  'Volvo S90': { basePrice: 58, trims: [{ name: 'Core', price: 58, features: ['295 hp turbo'] }, { name: 'Plus', price: 65, features: ['Premium leather'] }, { name: 'Ultimate', price: 72, features: ['Bowers & Wilkins'] }] },
  'Volvo V60': { basePrice: 46, trims: [{ name: 'Core', price: 46, features: ['247 hp turbo'] }, { name: 'Plus', price: 50, features: ['Harman Kardon'] }, { name: 'Ultimate', price: 55, features: ['Bowers & Wilkins'] }, { name: 'Cross Country', price: 52, features: ['Raised suspension'] }] },
  'Volvo V90': { basePrice: 62, trims: [{ name: 'Cross Country', price: 62, features: ['295 hp turbo'] }, { name: 'Cross Country Plus', price: 68, features: ['Premium leather'] }, { name: 'Cross Country Ultimate', price: 75, features: ['Bowers & Wilkins'] }] },
  'Volvo XC40': { basePrice: 38, trims: [{ name: 'Core', price: 38, features: ['247 hp turbo'] }, { name: 'Plus', price: 42, features: ['Harman Kardon'] }, { name: 'Ultimate', price: 48, features: ['Pixel headlights'] }] },
  'Volvo XC40 Recharge': { basePrice: 55, trims: [{ name: 'Core', price: 55, features: ['402 hp dual motor'] }, { name: 'Plus', price: 58, features: ['Pilot Assist'] }, { name: 'Ultimate', price: 62, features: ['Bowers & Wilkins'] }] },
  'Volvo XC60': { basePrice: 48, trims: [{ name: 'Core', price: 48, features: ['247 hp turbo'] }, { name: 'Plus', price: 52, features: ['Harman Kardon'] }, { name: 'Ultimate', price: 58, features: ['Air suspension'] }, { name: 'Polestar Engineered', price: 72, features: ['455 hp PHEV'] }] },
  'Volvo XC60 Recharge': { basePrice: 58, trims: [{ name: 'Plus', price: 58, features: ['455 hp PHEV'] }, { name: 'Ultimate', price: 65, features: ['Bowers & Wilkins'] }] },
  'Volvo XC90': { basePrice: 58, trims: [{ name: 'Core', price: 58, features: ['295 hp turbo'] }, { name: 'Plus', price: 65, features: ['Premium leather'] }, { name: 'Ultimate', price: 75, features: ['Air suspension'] }] },
  'Volvo XC90 Recharge': { basePrice: 72, trims: [{ name: 'Plus', price: 72, features: ['455 hp PHEV'] }, { name: 'Ultimate', price: 82, features: ['Bowers & Wilkins'] }] },

  // ==================== LAND ROVER ====================
  'Land Rover Defender 90': { basePrice: 57, trims: [{ name: 'S', price: 57, features: ['296 hp turbo'] }, { name: 'SE', price: 62, features: ['Premium audio'] }, { name: 'X-Dynamic SE', price: 68, features: ['Dynamic styling'] }, { name: 'X', price: 78, features: ['Premium leather'] }, { name: 'V8', price: 105, features: ['493 hp V8'] }] },
  'Land Rover Defender 110': { basePrice: 60, trims: [{ name: 'S', price: 60, features: ['296 hp turbo'] }, { name: 'SE', price: 65, features: ['Premium audio'] }, { name: 'X-Dynamic SE', price: 72, features: ['Dynamic styling'] }, { name: 'X', price: 82, features: ['Premium leather'] }, { name: 'V8', price: 108, features: ['493 hp V8'] }] },
  'Land Rover Defender 130': { basePrice: 70, trims: [{ name: 'SE', price: 70, features: ['296 hp turbo', '8 seats'] }, { name: 'X-Dynamic SE', price: 78, features: ['Dynamic styling'] }, { name: 'X', price: 88, features: ['Premium leather'] }, { name: 'Outbound', price: 82, features: ['Adventure package'] }] },
  'Land Rover Defender PHEV': { basePrice: 85, trims: [{ name: 'SE', price: 85, features: ['398 hp PHEV'] }, { name: 'X-Dynamic SE', price: 92, features: ['Dynamic styling'] }, { name: 'X', price: 102, features: ['Premium leather'] }] },
  'Land Rover Discovery': { basePrice: 60, trims: [{ name: 'S', price: 60, features: ['296 hp turbo'] }, { name: 'SE', price: 68, features: ['Premium leather'] }, { name: 'HSE', price: 75, features: ['Meridian audio'] }, { name: 'Metropolitan Edition', price: 80, features: ['Unique styling'] }] },
  'Land Rover Discovery Sport': { basePrice: 48, trims: [{ name: 'S', price: 48, features: ['246 hp turbo'] }, { name: 'SE', price: 52, features: ['Premium audio'] }, { name: 'Dynamic SE', price: 56, features: ['Sport styling'] }, { name: 'R-Dynamic HSE', price: 58, features: ['Meridian audio'] }] },

  // ==================== RANGE ROVER ====================
  'Range Rover': { basePrice: 105, trims: [{ name: 'SE', price: 105, features: ['395 hp mild-hybrid'] }, { name: 'HSE', price: 115, features: ['Meridian audio'] }, { name: 'Autobiography', price: 145, features: ['Executive seats'] }, { name: 'SV', price: 215, features: ['Handcrafted luxury'] }, { name: 'First Edition', price: 178, features: ['Exclusive options'] }] },
  'Range Rover LWB': { basePrice: 115, trims: [{ name: 'SE', price: 115, features: ['395 hp', '7 seats'] }, { name: 'HSE', price: 125, features: ['Meridian audio'] }, { name: 'Autobiography', price: 158, features: ['Executive rear'] }, { name: 'SV', price: 225, features: ['Ultimate luxury'] }] },
  'Range Rover PHEV': { basePrice: 115, trims: [{ name: 'SE P440e', price: 115, features: ['434 hp PHEV'] }, { name: 'HSE P440e', price: 125, features: ['Meridian audio'] }, { name: 'Autobiography P440e', price: 155, features: ['Executive seats'] }, { name: 'P510e', price: 135, features: ['503 hp PHEV'] }] },
  'Range Rover Sport': { basePrice: 85, trims: [{ name: 'SE', price: 85, features: ['355 hp turbo'] }, { name: 'Dynamic SE', price: 92, features: ['Sport styling'] }, { name: 'Dynamic HSE', price: 98, features: ['Meridian audio'] }, { name: 'Autobiography', price: 115, features: ['Premium leather'] }, { name: 'First Edition', price: 125, features: ['Exclusive options'] }] },
  'Range Rover Sport PHEV': { basePrice: 95, trims: [{ name: 'Autobiography P440e', price: 95, features: ['434 hp PHEV'] }, { name: 'P510e', price: 105, features: ['503 hp PHEV'] }] },
  'Range Rover Sport SV': { basePrice: 185, trims: [{ name: 'Edition One', price: 185, features: ['626 hp twin-turbo V8'] }, { name: 'Edition Two', price: 195, features: ['Carbon fiber'] }] },
  'Range Rover Velar': { basePrice: 60, trims: [{ name: 'S', price: 60, features: ['247 hp turbo'] }, { name: 'SE', price: 65, features: ['Premium audio'] }, { name: 'Dynamic SE', price: 70, features: ['Sport styling'] }, { name: 'Dynamic HSE', price: 78, features: ['Meridian 3D audio'] }, { name: 'R-Dynamic HSE', price: 82, features: ['Black pack'] }] },
  'Range Rover Evoque': { basePrice: 50, trims: [{ name: 'S', price: 50, features: ['246 hp turbo'] }, { name: 'SE', price: 54, features: ['Premium leather'] }, { name: 'Dynamic SE', price: 58, features: ['Sport styling'] }, { name: 'Autobiography', price: 62, features: ['Meridian audio'] }] },

  // ==================== BUICK ====================
  'Buick Enclave': { basePrice: 48, trims: [{ name: 'Preferred', price: 48, features: ['310 hp V6'] }, { name: 'Essence', price: 52, features: ['Leather'] }, { name: 'Premium', price: 56, features: ['Bose audio'] }, { name: 'Avenir', price: 62, features: ['Premium everything'] }] },
  'Buick Enclave Avenir': { basePrice: 62, trims: [{ name: 'Base', price: 62, features: ['310 hp V6', 'Premium luxury'] }] },
  'Buick Encore GX': { basePrice: 28, trims: [{ name: 'Preferred', price: 28, features: ['137 hp turbo'] }, { name: 'Select', price: 30, features: ['Leatherette'] }, { name: 'Essence', price: 32, features: ['Leather'] }, { name: 'Sport Touring', price: 31, features: ['Sport styling'] }, { name: 'Avenir', price: 35, features: ['Premium package'] }] },
  'Buick Envista': { basePrice: 25, trims: [{ name: 'Preferred', price: 25, features: ['137 hp turbo'] }, { name: 'Sport Touring', price: 27, features: ['Sport styling'] }, { name: 'Avenir', price: 30, features: ['Premium features'] }] },
  'Buick Envision': { basePrice: 38, trims: [{ name: 'Preferred', price: 38, features: ['228 hp turbo'] }, { name: 'Essence', price: 42, features: ['Leather'] }, { name: 'Avenir', price: 48, features: ['Bose audio', 'Premium leather'] }] },

  // ==================== MINI ====================
  'Mini Cooper': { basePrice: 32, trims: [{ name: 'Classic', price: 32, features: ['161 hp turbo'] }, { name: 'Signature', price: 35, features: ['Navigation'] }, { name: 'Iconic', price: 38, features: ['Harman Kardon'] }] },
  'Mini Cooper S': { basePrice: 36, trims: [{ name: 'Classic', price: 36, features: ['189 hp turbo'] }, { name: 'Signature', price: 39, features: ['Navigation'] }, { name: 'Iconic', price: 42, features: ['Harman Kardon'] }] },
  'Mini Cooper Convertible': { basePrice: 38, trims: [{ name: 'Classic', price: 38, features: ['161 hp turbo'] }, { name: 'Signature', price: 41, features: ['Navigation'] }, { name: 'Iconic', price: 44, features: ['Harman Kardon'] }] },
  'Mini Cooper SE': { basePrice: 35, trims: [{ name: 'Classic', price: 35, features: ['181 hp electric'] }, { name: 'Signature', price: 38, features: ['Navigation'] }, { name: 'Iconic', price: 42, features: ['Harman Kardon'] }] },
  'Mini Countryman': { basePrice: 38, trims: [{ name: 'Classic', price: 38, features: ['189 hp turbo'] }, { name: 'Signature', price: 42, features: ['Navigation'] }, { name: 'Iconic', price: 46, features: ['Harman Kardon'] }] },
  'Mini Countryman SE ALL4': { basePrice: 45, trims: [{ name: 'Classic', price: 45, features: ['221 hp PHEV'] }, { name: 'Signature', price: 48, features: ['Navigation'] }, { name: 'Iconic', price: 52, features: ['Harman Kardon'] }] },
  'Mini John Cooper Works': { basePrice: 42, trims: [{ name: 'Base', price: 42, features: ['228 hp turbo'] }, { name: 'Iconic', price: 48, features: ['Harman Kardon', 'Premium leather'] }] },

  // ==================== MITSUBISHI ====================
  'Mitsubishi Outlander': { basePrice: 32, trims: [{ name: 'ES', price: 32, features: ['181 hp'] }, { name: 'SE', price: 35, features: ['Power liftgate'] }, { name: 'SEL', price: 38, features: ['Leather'] }, { name: 'SEL Premium', price: 42, features: ['Panoramic roof'] }, { name: 'Black Edition', price: 40, features: ['Black styling'] }] },
  'Mitsubishi Outlander PHEV': { basePrice: 42, trims: [{ name: 'ES', price: 42, features: ['248 hp PHEV'] }, { name: 'SE', price: 46, features: ['Power liftgate'] }, { name: 'SEL', price: 50, features: ['Leather'] }, { name: 'SEL Premium', price: 55, features: ['Full premium'] }] },
  'Mitsubishi Outlander Sport': { basePrice: 26, trims: [{ name: 'ES', price: 26, features: ['148 hp'] }, { name: 'SE', price: 28, features: ['Alloy wheels'] }, { name: 'GT', price: 32, features: ['Leather', '181 hp'] }] },
  'Mitsubishi Eclipse Cross': { basePrice: 28, trims: [{ name: 'ES', price: 28, features: ['152 hp turbo'] }, { name: 'SE', price: 30, features: ['Moonroof'] }, { name: 'SEL', price: 34, features: ['Leather'] }] },
  'Mitsubishi Mirage': { basePrice: 18, trims: [{ name: 'ES', price: 18, features: ['78 hp'] }, { name: 'SE', price: 20, features: ['Apple CarPlay'] }] },

  // ==================== POLESTAR ====================
  'Polestar 2': { basePrice: 48, trims: [{ name: 'Standard Range Single Motor', price: 48, features: ['272 hp', 'RWD'] }, { name: 'Long Range Single Motor', price: 52, features: ['299 hp', 'RWD'] }, { name: 'Long Range Dual Motor', price: 58, features: ['421 hp', 'AWD'] }] },
  'Polestar 2 Performance': { basePrice: 58, trims: [{ name: 'Performance Pack', price: 58, features: ['Öhlins dampers'] }, { name: 'Performance Pack + Pilot', price: 62, features: ['Pilot Assist'] }] },
  'Polestar 3': { basePrice: 75, trims: [{ name: 'Long Range Dual Motor', price: 75, features: ['489 hp', 'AWD'] }, { name: 'Long Range Dual Motor w/Performance', price: 82, features: ['517 hp'] }] },
  'Polestar 4': { basePrice: 60, trims: [{ name: 'Long Range Single Motor', price: 60, features: ['272 hp', 'RWD'] }, { name: 'Long Range Dual Motor', price: 68, features: ['544 hp', 'AWD'] }] },

  // ==================== GMC HUMMER EV ====================
  'GMC Hummer EV': { basePrice: 115, trims: [{ name: 'EV2', price: 98, features: ['625 hp dual motor'] }, { name: 'EV2X', price: 108, features: ['830 hp tri motor'] }, { name: 'EV3X', price: 115, features: ['1000 hp'] }, { name: 'Edition 1', price: 115, features: ['Full loaded'] }] },
  'GMC Hummer EV SUV': { basePrice: 105, trims: [{ name: 'EV2', price: 95, features: ['625 hp dual motor'] }, { name: 'EV2X', price: 100, features: ['830 hp tri motor'] }, { name: 'EV3X', price: 105, features: ['830 hp'] }, { name: 'Edition 1', price: 110, features: ['Fully loaded'] }] },
};

// Helper function to get trims for a vehicle
export function getVehicleTrims(vehicleName: string): VehicleTrims | null {
  // Check for exact match
  if (vehicleTrims[vehicleName]) {
    return vehicleTrims[vehicleName];
  }
  
  // Try to find base model match
  for (const [key, value] of Object.entries(vehicleTrims)) {
    if (vehicleName.startsWith(key)) {
      return value;
    }
  }
  
  return null;
}
