'use client';

import { useState, useEffect } from 'react';

interface CarImageProps {
  vehicleName: string;
  brandColor: string;
  isExotic?: boolean;
  bodyType?: string;
  showLabel?: boolean;
}

// Wikipedia title mappings for accurate image fetching
const wikiTitleMappings: Record<string, string> = {
  // Toyota
  'Toyota Camry': 'Toyota_Camry',
  'Toyota Corolla': 'Toyota_Corolla',
  'Toyota RAV4': 'Toyota_RAV4',
  'Toyota Highlander': 'Toyota_Highlander',
  'Toyota 4Runner': 'Toyota_4Runner',
  'Toyota Tacoma': 'Toyota_Tacoma',
  'Toyota Tundra': 'Toyota_Tundra',
  'Toyota Sienna': 'Toyota_Sienna',
  'Toyota Prius': 'Toyota_Prius',
  'Toyota Supra': 'Toyota_Supra',
  'Toyota GR86': 'Toyota_GR86',
  'Toyota Crown': 'Toyota_Crown_(S230)',
  'Toyota Sequoia': 'Toyota_Sequoia',
  'Toyota Land Cruiser': 'Toyota_Land_Cruiser',
  'Toyota Venza': 'Toyota_Venza',
  'Toyota bZ4X': 'Toyota_bZ4X',
  // Honda
  'Honda Accord': 'Honda_Accord',
  'Honda Civic': 'Honda_Civic',
  'Honda CR-V': 'Honda_CR-V',
  'Honda Pilot': 'Honda_Pilot',
  'Honda HR-V': 'Honda_HR-V',
  'Honda Passport': 'Honda_Passport',
  'Honda Odyssey': 'Honda_Odyssey',
  'Honda Ridgeline': 'Honda_Ridgeline',
  // Ford
  'Ford F-150': 'Ford_F-Series',
  'Ford Mustang': 'Ford_Mustang',
  'Ford Bronco': 'Ford_Bronco_(sixth_generation)',
  'Ford Bronco Sport': 'Ford_Bronco_Sport',
  'Ford Explorer': 'Ford_Explorer',
  'Ford Expedition': 'Ford_Expedition',
  'Ford Ranger': 'Ford_Ranger_(Americas)',
  'Ford Maverick': 'Ford_Maverick_(2022)',
  'Ford Escape': 'Ford_Escape',
  'Ford Edge': 'Ford_Edge',
  'Ford Mustang Mach-E': 'Ford_Mustang_Mach-E',
  // Chevrolet
  'Chevrolet Corvette': 'Chevrolet_Corvette',
  'Chevrolet Camaro': 'Chevrolet_Camaro',
  'Chevrolet Silverado': 'Chevrolet_Silverado',
  'Chevrolet Silverado 1500': 'Chevrolet_Silverado',
  'Chevrolet Colorado': 'Chevrolet_Colorado',
  'Chevrolet Tahoe': 'Chevrolet_Tahoe',
  'Chevrolet Suburban': 'Chevrolet_Suburban',
  'Chevrolet Traverse': 'Chevrolet_Traverse',
  'Chevrolet Equinox': 'Chevrolet_Equinox',
  'Chevrolet Blazer': 'Chevrolet_Blazer_(crossover)',
  'Chevrolet Trax': 'Chevrolet_Trax',
  // BMW
  'BMW 3 Series': 'BMW_3_Series',
  'BMW 5 Series': 'BMW_5_Series',
  'BMW 7 Series': 'BMW_7_Series',
  'BMW X3': 'BMW_X3',
  'BMW X5': 'BMW_X5',
  'BMW X7': 'BMW_X7_(G07)',
  'BMW i4': 'BMW_i4',
  'BMW iX': 'BMW_iX',
  'BMW M3': 'BMW_M3',
  'BMW M4': 'BMW_M4',
  'BMW M5': 'BMW_M5',
  'BMW M340i': 'BMW_3_Series_(G20)',
  'BMW M550i': 'BMW_5_Series_(G30)',
  'BMW X1': 'BMW_X1',
  'BMW X4': 'BMW_X4',
  'BMW X6': 'BMW_X6',
  'BMW Z4': 'BMW_Z4',
  // Mercedes-Benz
  'Mercedes-Benz C-Class': 'Mercedes-Benz_C-Class',
  'Mercedes-Benz E-Class': 'Mercedes-Benz_E-Class',
  'Mercedes-Benz S-Class': 'Mercedes-Benz_S-Class',
  'Mercedes-Benz GLC': 'Mercedes-Benz_GLC-Class',
  'Mercedes-Benz GLE': 'Mercedes-Benz_GLE-Class',
  'Mercedes-Benz GLS': 'Mercedes-Benz_GLS-Class',
  'Mercedes-Benz G-Class': 'Mercedes-Benz_G-Class',
  'Mercedes-Benz EQS': 'Mercedes-Benz_EQS',
  'Mercedes-Benz A-Class': 'Mercedes-Benz_A-Class',
  'Mercedes-Benz CLA': 'Mercedes-Benz_CLA-Class',
  'Mercedes-Benz GLA': 'Mercedes-Benz_GLA-Class',
  'Mercedes-Benz GLB': 'Mercedes-Benz_GLB-Class',
  // Audi
  'Audi A4': 'Audi_A4',
  'Audi A6': 'Audi_A6',
  'Audi A8': 'Audi_A8',
  'Audi Q5': 'Audi_Q5',
  'Audi Q7': 'Audi_Q7',
  'Audi Q8': 'Audi_Q8',
  'Audi e-tron': 'Audi_e-tron_(brand)',
  'Audi A3': 'Audi_A3',
  'Audi A5': 'Audi_A5',
  'Audi Q3': 'Audi_Q3',
  'Audi RS5': 'Audi_RS5',
  'Audi RS7': 'Audi_RS7',
  // Tesla
  'Tesla Model 3': 'Tesla_Model_3',
  'Tesla Model Y': 'Tesla_Model_Y',
  'Tesla Model S': 'Tesla_Model_S',
  'Tesla Model X': 'Tesla_Model_X',
  'Tesla Cybertruck': 'Tesla_Cybertruck',
  // Porsche
  'Porsche 911': 'Porsche_911',
  'Porsche Cayenne': 'Porsche_Cayenne',
  'Porsche Macan': 'Porsche_Macan',
  'Porsche Panamera': 'Porsche_Panamera',
  'Porsche Taycan': 'Porsche_Taycan',
  'Porsche 718': 'Porsche_718',
  // Lexus
  'Lexus ES': 'Lexus_ES',
  'Lexus IS': 'Lexus_IS',
  'Lexus LS': 'Lexus_LS',
  'Lexus RX': 'Lexus_RX',
  'Lexus NX': 'Lexus_NX',
  'Lexus GX': 'Lexus_GX',
  'Lexus LX': 'Lexus_LX',
  'Lexus LC': 'Lexus_LC',
  // Mazda
  'Mazda3': 'Mazda3',
  'Mazda CX-5': 'Mazda_CX-5',
  'Mazda CX-30': 'Mazda_CX-30',
  'Mazda CX-50': 'Mazda_CX-50',
  'Mazda CX-90': 'Mazda_CX-90',
  'Mazda MX-5': 'Mazda_MX-5',
  // Hyundai
  'Hyundai Sonata': 'Hyundai_Sonata',
  'Hyundai Elantra': 'Hyundai_Elantra',
  'Hyundai Tucson': 'Hyundai_Tucson',
  'Hyundai Santa Fe': 'Hyundai_Santa_Fe',
  'Hyundai Palisade': 'Hyundai_Palisade',
  'Hyundai Ioniq 5': 'Hyundai_Ioniq_5',
  'Hyundai Ioniq 6': 'Hyundai_Ioniq_6',
  'Hyundai Kona': 'Hyundai_Kona',
  // Kia
  'Kia K5': 'Kia_K5',
  'Kia Forte': 'Kia_Forte',
  'Kia Sportage': 'Kia_Sportage',
  'Kia Sorento': 'Kia_Sorento',
  'Kia Telluride': 'Kia_Telluride',
  'Kia EV6': 'Kia_EV6',
  'Kia EV9': 'Kia_EV9',
  'Kia Stinger': 'Kia_Stinger',
  // Subaru
  'Subaru Outback': 'Subaru_Outback',
  'Subaru Forester': 'Subaru_Forester',
  'Subaru Crosstrek': 'Subaru_Crosstrek',
  'Subaru Impreza': 'Subaru_Impreza',
  'Subaru WRX': 'Subaru_WRX',
  'Subaru Ascent': 'Subaru_Ascent',
  'Subaru Legacy': 'Subaru_Legacy',
  'Subaru BRZ': 'Subaru_BRZ',
  // Jeep
  'Jeep Wrangler': 'Jeep_Wrangler',
  'Jeep Grand Cherokee': 'Jeep_Grand_Cherokee',
  'Jeep Cherokee': 'Jeep_Cherokee_(KL)',
  'Jeep Gladiator': 'Jeep_Gladiator_(JT)',
  'Jeep Compass': 'Jeep_Compass',
  'Jeep Renegade': 'Jeep_Renegade_(BU)',
  // Ram
  'Ram 1500': 'Ram_1500',
  'Ram 2500': 'Ram_2500',
  'Ram 3500': 'Ram_3500',
  // GMC
  'GMC Sierra': 'GMC_Sierra',
  'GMC Sierra 1500': 'GMC_Sierra',
  'GMC Yukon': 'GMC_Yukon',
  'GMC Acadia': 'GMC_Acadia',
  'GMC Canyon': 'GMC_Canyon',
  'GMC Terrain': 'GMC_Terrain',
  // Dodge
  'Dodge Challenger': 'Dodge_Challenger',
  'Dodge Charger': 'Dodge_Charger_(LX/LD)',
  'Dodge Durango': 'Dodge_Durango',
  'Dodge Hornet': 'Dodge_Hornet',
  // Volkswagen
  'Volkswagen Jetta': 'Volkswagen_Jetta',
  'Volkswagen Golf': 'Volkswagen_Golf',
  'Volkswagen Tiguan': 'Volkswagen_Tiguan',
  'Volkswagen Atlas': 'Volkswagen_Atlas',
  'Volkswagen ID.4': 'Volkswagen_ID.4',
  'Volkswagen Taos': 'Volkswagen_Taos',
  // Volvo
  'Volvo XC90': 'Volvo_XC90',
  'Volvo XC60': 'Volvo_XC60',
  'Volvo XC40': 'Volvo_XC40',
  'Volvo S60': 'Volvo_S60',
  'Volvo S90': 'Volvo_S90',
  'Volvo V60': 'Volvo_V60',
  // Genesis
  'Genesis G70': 'Genesis_G70',
  'Genesis G80': 'Genesis_G80',
  'Genesis G90': 'Genesis_G90',
  'Genesis GV70': 'Genesis_GV70',
  'Genesis GV80': 'Genesis_GV80',
  // Nissan
  'Nissan Altima': 'Nissan_Altima',
  'Nissan Sentra': 'Nissan_Sentra',
  'Nissan Maxima': 'Nissan_Maxima',
  'Nissan Rogue': 'Nissan_Rogue',
  'Nissan Murano': 'Nissan_Murano',
  'Nissan Pathfinder': 'Nissan_Pathfinder',
  'Nissan Armada': 'Nissan_Armada',
  'Nissan Frontier': 'Nissan_Frontier',
  'Nissan Titan': 'Nissan_Titan',
  'Nissan Z': 'Nissan_Z_(RZ34)',
  'Nissan Leaf': 'Nissan_Leaf',
  'Nissan Ariya': 'Nissan_Ariya',
  // Infiniti
  'Infiniti Q50': 'Infiniti_Q50',
  'Infiniti Q60': 'Infiniti_Q60',
  'Infiniti QX50': 'Infiniti_QX50',
  'Infiniti QX60': 'Infiniti_QX60',
  'Infiniti QX80': 'Infiniti_QX80',
  // Acura
  'Acura TLX': 'Acura_TLX',
  'Acura Integra': 'Acura_Integra',
  'Acura MDX': 'Acura_MDX',
  'Acura RDX': 'Acura_RDX',
  // Cadillac
  'Cadillac Escalade': 'Cadillac_Escalade',
  'Cadillac CT4': 'Cadillac_CT4',
  'Cadillac CT5': 'Cadillac_CT5',
  'Cadillac XT4': 'Cadillac_XT4',
  'Cadillac XT5': 'Cadillac_XT5',
  'Cadillac XT6': 'Cadillac_XT6',
  'Cadillac Lyriq': 'Cadillac_Lyriq',
  // Lincoln
  'Lincoln Navigator': 'Lincoln_Navigator',
  'Lincoln Aviator': 'Lincoln_Aviator',
  'Lincoln Nautilus': 'Lincoln_Nautilus',
  'Lincoln Corsair': 'Lincoln_Corsair',
  // Land Rover
  'Land Rover Range Rover': 'Range_Rover',
  'Land Rover Range Rover Sport': 'Range_Rover_Sport',
  'Land Rover Defender': 'Land_Rover_Defender',
  'Land Rover Discovery': 'Land_Rover_Discovery',
  // Rivian
  'Rivian R1T': 'Rivian_R1T',
  'Rivian R1S': 'Rivian_R1S',
  // Exotic
  'Ferrari Roma': 'Ferrari_Roma',
  'Ferrari 296 GTB': 'Ferrari_296_GTB',
  'Ferrari SF90': 'Ferrari_SF90_Stradale',
  'Ferrari Purosangue': 'Ferrari_Purosangue',
  'Ferrari F8': 'Ferrari_F8',
  'Ferrari 812': 'Ferrari_812_Superfast',
  'Lamborghini Urus': 'Lamborghini_Urus',
  'Lamborghini Huracán': 'Lamborghini_Hurac%C3%A1n',
  'Lamborghini Revuelto': 'Lamborghini_Revuelto',
  'McLaren Artura': 'McLaren_Artura',
  'McLaren 750S': 'McLaren_750S',
  'McLaren GT': 'McLaren_GT',
  'Aston Martin Vantage': 'Aston_Martin_Vantage_(2018)',
  'Aston Martin DB12': 'Aston_Martin_DB12',
  'Aston Martin DBX': 'Aston_Martin_DBX',
  'Aston Martin DBS': 'Aston_Martin_DBS_Superleggera',
  'Bentley Continental GT': 'Bentley_Continental_GT',
  'Bentley Flying Spur': 'Bentley_Flying_Spur_(2019)',
  'Bentley Bentayga': 'Bentley_Bentayga',
  'Rolls-Royce Ghost': 'Rolls-Royce_Ghost',
  'Rolls-Royce Phantom': 'Rolls-Royce_Phantom_(VIII)',
  'Rolls-Royce Cullinan': 'Rolls-Royce_Cullinan',
  'Rolls-Royce Spectre': 'Rolls-Royce_Spectre',
  'Maserati Ghibli': 'Maserati_Ghibli_(M157)',
  'Maserati Quattroporte': 'Maserati_Quattroporte',
  'Maserati MC20': 'Maserati_MC20',
  'Maserati GranTurismo': 'Maserati_GranTurismo',
  'Maserati Grecale': 'Maserati_Grecale',
  'Bugatti Chiron': 'Bugatti_Chiron',
  'Lotus Emira': 'Lotus_Emira',
  'Lotus Eletre': 'Lotus_Eletre',
  'Lucid Air': 'Lucid_Air',
  'Pagani Huayra': 'Pagani_Huayra',
  'Pagani Utopia': 'Pagani_Utopia',
  'Koenigsegg Jesko': 'Koenigsegg_Jesko',
  'Koenigsegg Gemera': 'Koenigsegg_Gemera',
};

function getWikiTitle(vehicleName: string): string {
  // Check for exact match first
  if (wikiTitleMappings[vehicleName]) {
    return wikiTitleMappings[vehicleName];
  }
  
  // Try to find partial match (e.g., "Toyota Camry XSE" -> "Toyota Camry")
  for (const [key, value] of Object.entries(wikiTitleMappings)) {
    if (vehicleName.startsWith(key)) {
      return value;
    }
  }
  
  // Default: convert name to Wikipedia format
  return vehicleName.replace(/\s+/g, '_');
}

export default function CarImage({ 
  vehicleName, 
  brandColor,
  isExotic = false,
  bodyType = 'car',
  showLabel = false
}: CarImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get emoji based on body type
  const getEmoji = () => {
    if (isExotic) return '🏎️';
    switch (bodyType) {
      case 'truck': return '🛻';
      case 'suv': case 'crossover': return '🚙';
      case 'convertible': return '🚗';
      case 'sports': return '🏎️';
      case 'minivan': case 'van': return '🚐';
      default: return '🚗';
    }
  };

  // Get short name for fallback display
  const getShortName = () => {
    const parts = vehicleName.split(' ');
    if (parts.length > 1) {
      return parts.slice(1).join(' '); // Remove brand name
    }
    return vehicleName;
  };

  useEffect(() => {
    const fetchWikiImage = async () => {
      try {
        const wikiTitle = getWikiTitle(vehicleName);
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&titles=${wikiTitle}&prop=pageimages&format=json&pithumbsize=800&origin=*`
        );
        const data = await response.json();
        const pages = data.query?.pages;
        if (pages) {
          const pageId = Object.keys(pages)[0];
          const thumbnail = pages[pageId]?.thumbnail?.source;
          if (thumbnail) {
            setImageUrl(thumbnail);
          } else {
            setHasError(true);
          }
        } else {
          setHasError(true);
        }
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWikiImage();
  }, [vehicleName]);

  return (
    <div className={`w-full h-full bg-gradient-to-br ${brandColor} flex items-center justify-center relative overflow-hidden`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <span className="text-4xl opacity-50">{getEmoji()}</span>
        </div>
      )}
      {!isLoading && imageUrl && !hasError && (
        <img 
          src={imageUrl}
          alt={vehicleName}
          className="w-full h-full object-cover object-center"
          onError={() => setHasError(true)}
        />
      )}
      {(hasError || (!isLoading && !imageUrl)) && (
        <div className="text-center">
          <span className="text-5xl drop-shadow-lg">{getEmoji()}</span>
          {showLabel && (
            <p className="text-white/60 text-sm mt-2 font-medium px-4 truncate max-w-[200px]">
              {getShortName()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
