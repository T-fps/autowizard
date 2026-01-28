'use client';

import { useState, useEffect } from 'react';

interface CarImageProps {
  vehicleName: string;
  brandColor: string;
  isExotic?: boolean;
  bodyType?: string;
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
  // Mercedes-Benz
  'Mercedes-Benz C-Class': 'Mercedes-Benz_C-Class',
  'Mercedes-Benz E-Class': 'Mercedes-Benz_E-Class',
  'Mercedes-Benz S-Class': 'Mercedes-Benz_S-Class',
  'Mercedes-Benz GLC': 'Mercedes-Benz_GLC-Class',
  'Mercedes-Benz GLE': 'Mercedes-Benz_GLE-Class',
  'Mercedes-Benz GLS': 'Mercedes-Benz_GLS-Class',
  'Mercedes-Benz G-Class': 'Mercedes-Benz_G-Class',
  'Mercedes-Benz EQS': 'Mercedes-Benz_EQS',
  // Audi
  'Audi A4': 'Audi_A4',
  'Audi A6': 'Audi_A6',
  'Audi A8': 'Audi_A8',
  'Audi Q5': 'Audi_Q5',
  'Audi Q7': 'Audi_Q7',
  'Audi Q8': 'Audi_Q8',
  'Audi e-tron': 'Audi_e-tron_(brand)',
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
  // Exotic
  'Ferrari Roma': 'Ferrari_Roma',
  'Ferrari 296 GTB': 'Ferrari_296_GTB',
  'Ferrari SF90': 'Ferrari_SF90_Stradale',
  'Ferrari Purosangue': 'Ferrari_Purosangue',
  'Ferrari F8': 'Ferrari_F8',
  'Lamborghini Urus': 'Lamborghini_Urus',
  'Lamborghini Huracán': 'Lamborghini_Hurac%C3%A1n',
  'Lamborghini Revuelto': 'Lamborghini_Revuelto',
  'McLaren Artura': 'McLaren_Artura',
  'McLaren 750S': 'McLaren_750S',
  'McLaren GT': 'McLaren_GT',
  'Aston Martin Vantage': 'Aston_Martin_Vantage_(2018)',
  'Aston Martin DB12': 'Aston_Martin_DB12',
  'Aston Martin DBX': 'Aston_Martin_DBX',
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
  bodyType = 'car'
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

  useEffect(() => {
    const fetchWikiImage = async () => {
      try {
        const wikiTitle = getWikiTitle(vehicleName);
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&titles=${wikiTitle}&prop=pageimages&format=json&pithumbsize=600&origin=*`
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
          <span className="text-5xl opacity-50">{getEmoji()}</span>
        </div>
      )}
      {!isLoading && imageUrl && !hasError && (
        <img 
          src={imageUrl}
          alt={vehicleName}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      )}
      {(hasError || (!isLoading && !imageUrl)) && (
        <div className="text-center">
          <span className="text-6xl drop-shadow-lg">{getEmoji()}</span>
          <p className="text-white/60 text-sm mt-2 font-medium px-4 truncate max-w-[200px]">
            {vehicleName}
          </p>
        </div>
      )}
    </div>
  );
}
