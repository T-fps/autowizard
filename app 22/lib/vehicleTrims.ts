// Vehicle Trims Data
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
  // ==================== TOYOTA ====================
  'Toyota Camry': {
    basePrice: 28,
    trims: [
      { name: 'LE', price: 28 },
      { name: 'SE', price: 30, features: ['Sport-tuned suspension', 'Paddle shifters'] },
      { name: 'XLE', price: 32, features: ['Leather seats', 'Sunroof'] },
      { name: 'XSE', price: 33, features: ['Sport + Luxury', 'Two-tone exterior'] },
      { name: 'TRD', price: 35, features: ['Track-tuned', 'Cat-back exhaust'] },
    ]
  },
  'Toyota Corolla': {
    basePrice: 23,
    trims: [
      { name: 'LE', price: 23 },
      { name: 'SE', price: 25, features: ['Sport styling', '18" wheels'] },
      { name: 'XLE', price: 27, features: ['Premium audio', 'Heated seats'] },
      { name: 'XSE', price: 28, features: ['Sport + Luxury features'] },
    ]
  },
  'Toyota RAV4': {
    basePrice: 32,
    trims: [
      { name: 'LE', price: 32 },
      { name: 'XLE', price: 34, features: ['Power liftgate', 'Roof rails'] },
      { name: 'XLE Premium', price: 36, features: ['Leather', 'Moonroof'] },
      { name: 'Adventure', price: 38, features: ['Orange accents', 'Tow hitch'] },
      { name: 'TRD Off-Road', price: 42, features: ['Off-road suspension', 'Multi-terrain select'] },
      { name: 'Limited', price: 42, features: ['Premium everything', 'JBL audio'] },
    ]
  },
  'Toyota Highlander': {
    basePrice: 40,
    trims: [
      { name: 'LE', price: 40 },
      { name: 'XLE', price: 45, features: ['Power liftgate', 'Leather'] },
      { name: 'XSE', price: 48, features: ['Sport styling', 'Black accents'] },
      { name: 'Limited', price: 52, features: ['Premium audio', 'Panoramic roof'] },
      { name: 'Platinum', price: 55, features: ['Premium everything'] },
    ]
  },
  'Toyota 4Runner': {
    basePrice: 42,
    trims: [
      { name: 'SR5', price: 42 },
      { name: 'SR5 Premium', price: 45, features: ['Leather', 'Moonroof'] },
      { name: 'TRD Sport', price: 47, features: ['Sport suspension', 'Hood scoop'] },
      { name: 'TRD Off-Road', price: 49, features: ['Crawl control', 'Multi-terrain'] },
      { name: 'TRD Off-Road Premium', price: 52, features: ['Off-road + Luxury'] },
      { name: 'Limited', price: 54, features: ['Premium features', 'Chrome'] },
      { name: 'TRD Pro', price: 58, features: ['Fox shocks', 'Skid plates', 'TRD exhaust'] },
    ]
  },
  'Toyota Tacoma': {
    basePrice: 32,
    trims: [
      { name: 'SR', price: 32 },
      { name: 'SR5', price: 35 },
      { name: 'TRD Sport', price: 40, features: ['Sport suspension', 'Hood scoop'] },
      { name: 'TRD Off-Road', price: 43, features: ['Locking diff', 'Crawl control'] },
      { name: 'Limited', price: 48, features: ['Leather', 'Premium audio'] },
      { name: 'TRD Pro', price: 58, features: ['Fox shocks', 'TRD exhaust', 'Skid plates'] },
    ]
  },
  'Toyota Tundra': {
    basePrice: 42,
    trims: [
      { name: 'SR', price: 42 },
      { name: 'SR5', price: 45 },
      { name: 'Limited', price: 52, features: ['Leather', 'Premium audio'] },
      { name: 'Platinum', price: 58, features: ['Premium everything'] },
      { name: '1794 Edition', price: 60, features: ['Western-themed luxury'] },
      { name: 'TRD Pro', price: 68, features: ['Fox shocks', 'TRD exhaust', 'Heritage grille'] },
      { name: 'Capstone', price: 75, features: ['Top trim', 'Semi-aniline leather'] },
    ]
  },
  'Toyota Supra': {
    basePrice: 52,
    trims: [
      { name: '2.0', price: 52, features: ['255 hp turbo-4'] },
      { name: '3.0', price: 56, features: ['382 hp turbo-6'] },
      { name: '3.0 Premium', price: 58, features: ['Leather', 'JBL audio'] },
      { name: 'A91-MT Edition', price: 60, features: ['Manual transmission', 'Limited'] },
    ]
  },
  'Toyota GR86': {
    basePrice: 30,
    trims: [
      { name: 'Base', price: 30 },
      { name: 'Premium', price: 34, features: ['Leather/Alcantara', 'Heated seats'] },
    ]
  },

  // ==================== HONDA ====================
  'Honda Accord': {
    basePrice: 29,
    trims: [
      { name: 'LX', price: 29 },
      { name: 'EX', price: 32, features: ['Sunroof', 'Power seat'] },
      { name: 'Sport', price: 33, features: ['19" wheels', 'Sport styling'] },
      { name: 'EX-L', price: 35, features: ['Leather', 'Memory seats'] },
      { name: 'Sport-L', price: 36, features: ['Sport + Leather'] },
      { name: 'Touring', price: 40, features: ['Premium audio', 'Wireless CarPlay'] },
    ]
  },
  'Honda Civic': {
    basePrice: 25,
    trims: [
      { name: 'LX', price: 25 },
      { name: 'Sport', price: 27, features: ['Sport styling', '18" wheels'] },
      { name: 'EX', price: 29, features: ['Sunroof', 'Alloy pedals'] },
      { name: 'Touring', price: 32, features: ['Leather', 'Navigation'] },
      { name: 'Si', price: 30, features: ['200 hp turbo', 'Manual', 'LSD'] },
      { name: 'Type R', price: 45, features: ['315 hp', 'Track-focused'] },
    ]
  },
  'Honda CR-V': {
    basePrice: 32,
    trims: [
      { name: 'LX', price: 32 },
      { name: 'EX', price: 35, features: ['Sunroof', 'Power liftgate'] },
      { name: 'EX-L', price: 38, features: ['Leather', 'Heated steering'] },
      { name: 'Sport', price: 37, features: ['Sport styling'] },
      { name: 'Sport-L', price: 40, features: ['Sport + Leather'] },
      { name: 'Touring', price: 42, features: ['Premium everything'] },
    ]
  },
  'Honda Pilot': {
    basePrice: 42,
    trims: [
      { name: 'LX', price: 42 },
      { name: 'EX', price: 45, features: ['Power liftgate', 'Sunroof'] },
      { name: 'EX-L', price: 48, features: ['Leather', 'Heated seats'] },
      { name: 'Sport', price: 49, features: ['Sport styling', 'Black accents'] },
      { name: 'TrailSport', price: 52, features: ['Off-road tuned', 'All-terrain tires'] },
      { name: 'Touring', price: 54, features: ['Premium audio', 'Wireless charging'] },
      { name: 'Elite', price: 58, features: ['Premium everything', 'Panoramic roof'] },
    ]
  },

  // ==================== FORD ====================
  'Ford F-150': {
    basePrice: 38,
    trims: [
      { name: 'XL', price: 38 },
      { name: 'XLT', price: 45, features: ['Chrome bumpers', 'SYNC 4'] },
      { name: 'Lariat', price: 55, features: ['Leather', 'B&O audio'] },
      { name: 'King Ranch', price: 65, features: ['Western luxury', 'Mesa leather'] },
      { name: 'Platinum', price: 68, features: ['Premium everything'] },
      { name: 'Tremor', price: 58, features: ['Off-road package', 'Locking diff'] },
      { name: 'Raptor', price: 78, features: ['450 hp', 'Fox shocks', 'Terrain management'] },
      { name: 'Raptor R', price: 115, features: ['700 hp supercharged V8', 'Ultimate off-road'] },
      { name: 'Limited', price: 75, features: ['Top luxury trim'] },
    ]
  },
  'Ford Mustang': {
    basePrice: 32,
    trims: [
      { name: 'EcoBoost', price: 32, features: ['310 hp turbo-4'] },
      { name: 'EcoBoost Premium', price: 38, features: ['Leather', 'B&O audio'] },
      { name: 'GT', price: 45, features: ['480 hp 5.0L V8'] },
      { name: 'GT Premium', price: 50, features: ['V8 + Premium features'] },
      { name: 'Dark Horse', price: 60, features: ['500 hp', 'Track-focused'] },
      { name: 'Shelby GT500', price: 78, features: ['760 hp supercharged', 'DCT'] },
    ]
  },
  'Ford Bronco': {
    basePrice: 38,
    trims: [
      { name: 'Base', price: 38 },
      { name: 'Big Bend', price: 42, features: ['17" wheels', 'Cloth seats'] },
      { name: 'Black Diamond', price: 45, features: ['Steel bumpers', 'Washout floors'] },
      { name: 'Outer Banks', price: 48, features: ['Leather', 'Lux package'] },
      { name: 'Badlands', price: 50, features: ['Sasquatch-capable', 'Front sway disconnect'] },
      { name: 'Wildtrak', price: 55, features: ['Sasquatch package', 'High package'] },
      { name: 'Everglades', price: 58, features: ['Snorkel', 'Warn winch'] },
      { name: 'Raptor', price: 82, features: ['418 hp', 'FOX shocks', '37" tires'] },
    ]
  },
  'Ford Explorer': {
    basePrice: 40,
    trims: [
      { name: 'Base', price: 40 },
      { name: 'XLT', price: 45, features: ['Leather', 'Power liftgate'] },
      { name: 'Limited', price: 52, features: ['Premium audio', 'Hands-free liftgate'] },
      { name: 'ST', price: 58, features: ['400 hp twin-turbo', 'Sport suspension'] },
      { name: 'Timberline', price: 55, features: ['Off-road suspension', 'Skid plates'] },
      { name: 'Platinum', price: 62, features: ['Luxury everything', 'Massaging seats'] },
    ]
  },

  // ==================== CHEVROLET ====================
  'Chevrolet Silverado 1500': {
    basePrice: 40,
    trims: [
      { name: 'Work Truck', price: 40 },
      { name: 'Custom', price: 45, features: ['20" wheels', 'Body color bumpers'] },
      { name: 'LT', price: 50, features: ['Chrome accents', 'Remote start'] },
      { name: 'RST', price: 52, features: ['Sport styling', 'Black accents'] },
      { name: 'LT Trail Boss', price: 55, features: ['Off-road suspension', '2" lift'] },
      { name: 'LTZ', price: 58, features: ['Leather', 'Bose audio'] },
      { name: 'ZR2', price: 78, features: ['Multimatic DSSV shocks', 'Front/rear lockers'] },
      { name: 'High Country', price: 65, features: ['Premium luxury', 'Power tailgate'] },
    ]
  },
  'Chevrolet Colorado': {
    basePrice: 32,
    trims: [
      { name: 'WT', price: 32 },
      { name: 'LT', price: 38, features: ['Chrome bumpers', 'Infotainment'] },
      { name: 'Z71', price: 42, features: ['Off-road suspension', 'Skid plates'] },
      { name: 'Trail Boss', price: 48, features: ['2" lift', 'Off-road tires'] },
      { name: 'ZR2', price: 52, features: ['Multimatic shocks', 'Front/rear lockers', '35" tires'] },
    ]
  },
  'Chevrolet Corvette': {
    basePrice: 68,
    trims: [
      { name: '1LT', price: 68, features: ['490 hp V8', 'Base features'] },
      { name: '2LT', price: 78, features: ['GT2 seats', 'Head-up display'] },
      { name: '3LT', price: 82, features: ['Premium audio', 'Leather everywhere'] },
      { name: 'Z06', price: 115, features: ['670 hp flat-plane V8', 'Track focused'] },
      { name: 'E-Ray', price: 108, features: ['AWD hybrid', '655 hp combined'] },
      { name: 'ZR1', price: 150, features: ['1000+ hp', 'Twin-turbo'] },
    ]
  },
  'Chevrolet Tahoe': {
    basePrice: 58,
    trims: [
      { name: 'LS', price: 58 },
      { name: 'LT', price: 65, features: ['Leather', 'Power liftgate'] },
      { name: 'RST', price: 68, features: ['Sport appearance', 'Black accents'] },
      { name: 'Z71', price: 70, features: ['Off-road suspension', 'Skid plates'] },
      { name: 'Premier', price: 75, features: ['Premium audio', 'Magnetic ride'] },
      { name: 'High Country', price: 82, features: ['Luxury everything'] },
    ]
  },

  // ==================== JEEP ====================
  'Jeep Wrangler': {
    basePrice: 35,
    trims: [
      { name: 'Sport', price: 35 },
      { name: 'Sport S', price: 38, features: ['Air conditioning', 'Power windows'] },
      { name: 'Willys', price: 40, features: ['Off-road tires', 'Limited slip'] },
      { name: 'Sahara', price: 45, features: ['Leather', 'Body color top'] },
      { name: 'Rubicon', price: 52, features: ['Lockers', 'Disconnecting sway bar', '4:1 low range'] },
      { name: 'Rubicon 392', price: 85, features: ['470 hp V8', 'Xtreme Recon capable'] },
    ]
  },
  'Jeep Grand Cherokee': {
    basePrice: 45,
    trims: [
      { name: 'Laredo', price: 45 },
      { name: 'Altitude', price: 48, features: ['Blacked out trim'] },
      { name: 'Limited', price: 52, features: ['Leather', 'Power liftgate'] },
      { name: 'Trailhawk', price: 58, features: ['Off-road suspension', 'Skid plates'] },
      { name: 'Overland', price: 62, features: ['Air suspension', 'Premium audio'] },
      { name: 'Summit', price: 68, features: ['Premium everything', 'Massaging seats'] },
      { name: 'Summit Reserve', price: 72, features: ['Top luxury trim'] },
    ]
  },
  'Jeep Gladiator': {
    basePrice: 42,
    trims: [
      { name: 'Sport', price: 42 },
      { name: 'Sport S', price: 45, features: ['Power windows', 'Remote start'] },
      { name: 'Willys', price: 48, features: ['Off-road tires', 'Limited slip'] },
      { name: 'Mojave', price: 58, features: ['Desert-rated', 'FOX shocks'] },
      { name: 'Rubicon', price: 58, features: ['Lockers', 'Rock rails', '4:1 low range'] },
    ]
  },

  // ==================== RAM ====================
  'Ram 1500': {
    basePrice: 42,
    trims: [
      { name: 'Tradesman', price: 42 },
      { name: 'Big Horn', price: 48, features: ['Chrome grille', 'Remote start'] },
      { name: 'Laramie', price: 55, features: ['Leather', 'Uconnect 12"'] },
      { name: 'Rebel', price: 58, features: ['Off-road suspension', 'Bilstein shocks'] },
      { name: 'Limited', price: 65, features: ['Premium everything'] },
      { name: 'Limited Longhorn', price: 68, features: ['Western luxury'] },
      { name: 'TRX', price: 88, features: ['702 hp supercharged', 'Baja-ready'] },
      { name: 'Tungsten', price: 75, features: ['Ultra luxury'] },
    ]
  },

  // ==================== GMC ====================
  'GMC Sierra 1500': {
    basePrice: 42,
    trims: [
      { name: 'Pro', price: 42 },
      { name: 'SLE', price: 48, features: ['Chrome bumpers', 'Remote start'] },
      { name: 'Elevation', price: 52, features: ['Black accents'] },
      { name: 'SLT', price: 58, features: ['Leather', 'Bose audio'] },
      { name: 'AT4', price: 62, features: ['Off-road package', 'Rancho shocks'] },
      { name: 'AT4X', price: 78, features: ['Multimatic DSSV shocks', 'Lockers'] },
      { name: 'Denali', price: 68, features: ['Premium luxury'] },
      { name: 'Denali Ultimate', price: 82, features: ['Super Cruise', 'Ultimate luxury'] },
    ]
  },

  // ==================== DODGE ====================
  'Dodge Challenger': {
    basePrice: 36,
    trims: [
      { name: 'SXT', price: 36, features: ['303 hp V6'] },
      { name: 'GT', price: 38, features: ['AWD available', 'Performance hood'] },
      { name: 'R/T', price: 45, features: ['375 hp 5.7L HEMI'] },
      { name: 'R/T Scat Pack', price: 52, features: ['485 hp 6.4L HEMI'] },
      { name: 'R/T Scat Pack Widebody', price: 58, features: ['Widebody fenders', 'Brembo brakes'] },
      { name: 'SRT Hellcat', price: 72, features: ['717 hp supercharged'] },
      { name: 'SRT Hellcat Widebody', price: 78, features: ['Hellcat + Widebody'] },
      { name: 'SRT Demon 170', price: 110, features: ['1025 hp', 'Drag-focused'] },
    ]
  },
  'Dodge Charger': {
    basePrice: 38,
    trims: [
      { name: 'SXT', price: 38, features: ['303 hp V6'] },
      { name: 'GT', price: 42, features: ['AWD', 'Performance hood'] },
      { name: 'R/T', price: 48, features: ['375 hp 5.7L HEMI'] },
      { name: 'Scat Pack', price: 55, features: ['485 hp 6.4L HEMI'] },
      { name: 'Scat Pack Widebody', price: 62, features: ['Widebody fenders'] },
      { name: 'SRT Hellcat', price: 78, features: ['717 hp supercharged'] },
      { name: 'SRT Hellcat Widebody', price: 82, features: ['Hellcat + Widebody'] },
    ]
  },

  // ==================== BMW ====================
  'BMW 3 Series': {
    basePrice: 45,
    trims: [
      { name: '330i', price: 45, features: ['255 hp turbo-4'] },
      { name: '330i xDrive', price: 48, features: ['AWD'] },
      { name: 'M340i', price: 58, features: ['382 hp turbo-6', 'M Sport diff'] },
      { name: 'M340i xDrive', price: 60, features: ['M340i + AWD'] },
    ]
  },
  'BMW M3': {
    basePrice: 78,
    trims: [
      { name: 'Base', price: 78, features: ['473 hp', 'Manual available'] },
      { name: 'Competition', price: 82, features: ['503 hp', 'Track mode'] },
      { name: 'Competition xDrive', price: 85, features: ['Competition + AWD'] },
      { name: 'CS', price: 115, features: ['543 hp', 'Lightweight'] },
    ]
  },
  'BMW X5': {
    basePrice: 65,
    trims: [
      { name: 'sDrive40i', price: 65, features: ['335 hp turbo-6', 'RWD'] },
      { name: 'xDrive40i', price: 68, features: ['AWD'] },
      { name: 'xDrive50e', price: 75, features: ['Plug-in hybrid'] },
      { name: 'M60i', price: 90, features: ['523 hp V8'] },
    ]
  },
  'BMW X5 M': {
    basePrice: 115,
    trims: [
      { name: 'Base', price: 115, features: ['600 hp twin-turbo V8'] },
      { name: 'Competition', price: 125, features: ['617 hp', 'Track mode'] },
    ]
  },

  // ==================== MERCEDES-BENZ ====================
  'Mercedes-Benz C-Class': {
    basePrice: 48,
    trims: [
      { name: 'C 300', price: 48, features: ['255 hp turbo-4'] },
      { name: 'C 300 4MATIC', price: 52, features: ['AWD'] },
    ]
  },
  'Mercedes-AMG C 63': {
    basePrice: 85,
    trims: [
      { name: 'C 63 S E Performance', price: 85, features: ['671 hp hybrid', 'AWD'] },
    ]
  },
  'Mercedes-Benz G-Class': {
    basePrice: 145,
    trims: [
      { name: 'G 550', price: 145, features: ['416 hp V8', '3 locking diffs'] },
    ]
  },
  'Mercedes-AMG G 63': {
    basePrice: 185,
    trims: [
      { name: 'Base', price: 185, features: ['577 hp twin-turbo V8'] },
    ]
  },

  // ==================== AUDI ====================
  'Audi A4': {
    basePrice: 45,
    trims: [
      { name: '40 Premium', price: 45, features: ['201 hp turbo-4'] },
      { name: '40 Premium Plus', price: 48, features: ['Virtual cockpit plus'] },
      { name: '45 Premium Plus quattro', price: 52, features: ['261 hp', 'AWD'] },
      { name: 'S4 Prestige', price: 60, features: ['349 hp', 'Sport diff'] },
    ]
  },
  'Audi RS5': {
    basePrice: 78,
    trims: [
      { name: 'Base', price: 78, features: ['444 hp twin-turbo V6', 'Sport diff'] },
    ]
  },

  // ==================== PORSCHE ====================
  'Porsche 911': {
    basePrice: 115,
    trims: [
      { name: 'Carrera', price: 115, features: ['379 hp', 'RWD'] },
      { name: 'Carrera S', price: 130, features: ['443 hp'] },
      { name: 'Carrera 4S', price: 140, features: ['443 hp', 'AWD'] },
      { name: 'Carrera GTS', price: 150, features: ['473 hp', 'Sport Chrono'] },
      { name: 'Turbo', price: 185, features: ['572 hp twin-turbo'] },
      { name: 'Turbo S', price: 220, features: ['640 hp', 'Sport Chrono'] },
      { name: 'GT3', price: 185, features: ['502 hp NA', 'Track focused'] },
      { name: 'GT3 RS', price: 230, features: ['518 hp', 'Extreme aero'] },
    ]
  },
  'Porsche Cayenne': {
    basePrice: 78,
    trims: [
      { name: 'Base', price: 78, features: ['348 hp turbo V6'] },
      { name: 'S', price: 95, features: ['468 hp twin-turbo V6'] },
      { name: 'E-Hybrid', price: 95, features: ['Plug-in hybrid'] },
      { name: 'GTS', price: 115, features: ['453 hp', 'Sport exhaust'] },
      { name: 'Turbo', price: 145, features: ['631 hp twin-turbo V8'] },
      { name: 'Turbo E-Hybrid', price: 165, features: ['729 hp hybrid'] },
      { name: 'Turbo GT', price: 195, features: ['631 hp', 'Track focused'] },
    ]
  },

  // ==================== TESLA ====================
  'Tesla Model 3': {
    basePrice: 40,
    trims: [
      { name: 'Standard Range', price: 40, features: ['272 mi range', 'RWD'] },
      { name: 'Long Range', price: 48, features: ['333 mi range', 'AWD'] },
      { name: 'Performance', price: 52, features: ['315 mi range', 'Track mode'] },
    ]
  },
  'Tesla Model Y': {
    basePrice: 45,
    trims: [
      { name: 'Standard Range', price: 45, features: ['260 mi range', 'RWD'] },
      { name: 'Long Range', price: 50, features: ['310 mi range', 'AWD'] },
      { name: 'Performance', price: 55, features: ['303 mi range', 'Track mode'] },
    ]
  },
  'Tesla Model S': {
    basePrice: 85,
    trims: [
      { name: 'Base', price: 85, features: ['405 mi range', 'AWD'] },
      { name: 'Plaid', price: 110, features: ['396 mi range', '1,020 hp'] },
    ]
  },

  // ==================== EXOTIC / LUXURY ====================
  'Ferrari Roma': {
    basePrice: 245,
    trims: [
      { name: 'Base', price: 245, features: ['612 hp twin-turbo V8'] },
    ]
  },
  'Ferrari 296 GTB': {
    basePrice: 350,
    trims: [
      { name: 'Base', price: 350, features: ['819 hp hybrid V6'] },
      { name: 'Assetto Fiorano', price: 380, features: ['Track package', 'Multimatic shocks'] },
    ]
  },
  'Lamborghini Urus': {
    basePrice: 240,
    trims: [
      { name: 'Base', price: 240, features: ['657 hp twin-turbo V8'] },
      { name: 'S', price: 260, features: ['Improved handling'] },
      { name: 'Performante', price: 280, features: ['666 hp', 'Track focused'] },
      { name: 'SE', price: 275, features: ['Plug-in hybrid', '789 hp'] },
    ]
  },
  'Lamborghini Huracán': {
    basePrice: 250,
    trims: [
      { name: 'EVO RWD', price: 250, features: ['602 hp', 'RWD'] },
      { name: 'EVO AWD', price: 270, features: ['631 hp', 'AWD'] },
      { name: 'Tecnica', price: 275, features: ['RWD', 'Rear-steer'] },
      { name: 'STO', price: 330, features: ['640 hp', 'Super Trofeo'] },
      { name: 'Sterrato', price: 275, features: ['Off-road capable'] },
    ]
  },
  'McLaren 750S': {
    basePrice: 330,
    trims: [
      { name: 'Coupe', price: 330, features: ['740 hp twin-turbo V8'] },
      { name: 'Spider', price: 360, features: ['Convertible'] },
    ]
  },
  'Porsche Taycan': {
    basePrice: 92,
    trims: [
      { name: 'Base', price: 92, features: ['402 hp', 'RWD'] },
      { name: '4S', price: 108, features: ['536 hp', 'AWD'] },
      { name: 'GTS', price: 135, features: ['590 hp'] },
      { name: 'Turbo', price: 160, features: ['670 hp'] },
      { name: 'Turbo S', price: 195, features: ['750 hp', 'Launch control'] },
    ]
  },
  'Bentley Continental GT': {
    basePrice: 240,
    trims: [
      { name: 'V8', price: 240, features: ['542 hp twin-turbo V8'] },
      { name: 'Speed', price: 305, features: ['650 hp W12'] },
      { name: 'Mulliner', price: 350, features: ['Bespoke luxury'] },
    ]
  },
  'Rolls-Royce Ghost': {
    basePrice: 355,
    trims: [
      { name: 'Base', price: 355, features: ['563 hp twin-turbo V12'] },
      { name: 'Extended', price: 400, features: ['Extended wheelbase'] },
      { name: 'Black Badge', price: 430, features: ['592 hp', 'Dark theme'] },
    ]
  },
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
