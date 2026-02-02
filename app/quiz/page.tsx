"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Check, ArrowLeft, ArrowRight, Shield, Clock, Mail, Target, Star, FileText, RefreshCw, X, Send } from 'lucide-react';
import Navigation from '../components/shared/Navigation';

export default function QuizPage() {
  const [testStep, setTestStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEmailCollection, setShowEmailCollection] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const [emailAddress, setEmailAddress] = useState('');
  const [vehicleImageIndex, setVehicleImageIndex] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Vehicle images cache
  const [imageCache, setImageCache] = useState<Record<string, string>>({});
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

  // Build Wikipedia article title from vehicle name
  const getWikipediaTitle = (vehicle: string): string => {
    const cleanVehicle = vehicle.startsWith('Used ') ? vehicle.slice(5) : vehicle;
    
    const titleMappings: Record<string, string> = {
      'Tesla Model 3': 'Tesla_Model_3',
      'Tesla Model Y': 'Tesla_Model_Y',
      'Tesla Model S': 'Tesla_Model_S',
      'Tesla Model X': 'Tesla_Model_X',
      'Tesla Cybertruck': 'Tesla_Cybertruck',
      'Ford F-150': 'Ford_F-Series',
      'Ford F-150 Lightning': 'Ford_F-150_Lightning',
      'Ford Mustang Mach-E': 'Ford_Mustang_Mach-E',
      'Chevrolet Corvette': 'Chevrolet_Corvette',
      'Chevrolet Camaro': 'Chevrolet_Camaro',
      'Chevrolet Silverado': 'Chevrolet_Silverado',
      'Porsche 911': 'Porsche_911',
      'Porsche Taycan': 'Porsche_Taycan',
      'Porsche Cayenne': 'Porsche_Cayenne',
      'Porsche Macan': 'Porsche_Macan',
      'BMW 3 Series': 'BMW_3_Series',
      'BMW 5 Series': 'BMW_5_Series',
      'BMW 7 Series': 'BMW_7_Series',
      'BMW X3': 'BMW_X3',
      'BMW X5': 'BMW_X5',
      'BMW X7': 'BMW_X7',
      'BMW i4': 'BMW_i4',
      'BMW iX': 'BMW_iX',
      'BMW M3': 'BMW_M3',
      'BMW M5': 'BMW_M5',
      'Mercedes-Benz C-Class': 'Mercedes-Benz_C-Class',
      'Mercedes-Benz E-Class': 'Mercedes-Benz_E-Class',
      'Mercedes-Benz S-Class': 'Mercedes-Benz_S-Class',
      'Mercedes-Benz GLE': 'Mercedes-Benz_GLE-Class',
      'Mercedes-Benz GLS': 'Mercedes-Benz_GLS-Class',
      'Mercedes-Benz GLC': 'Mercedes-Benz_GLC-Class',
      'Mercedes-Benz EQS': 'Mercedes-Benz_EQS',
      'Mercedes-Benz EQE': 'Mercedes-Benz_EQE',
      'Mercedes-Benz AMG GT': 'Mercedes-AMG_GT',
      'Audi A4': 'Audi_A4',
      'Audi A6': 'Audi_A6',
      'Audi A8': 'Audi_A8',
      'Audi Q5': 'Audi_Q5',
      'Audi Q7': 'Audi_Q7',
      'Audi Q8': 'Audi_Q8',
      'Audi e-tron': 'Audi_e-tron_(brand)',
      'Audi e-tron GT': 'Audi_e-tron_GT',
      'Audi R8': 'Audi_R8',
      'Audi RS6': 'Audi_RS_6',
      'Toyota Camry': 'Toyota_Camry',
      'Toyota Corolla': 'Toyota_Corolla',
      'Toyota RAV4': 'Toyota_RAV4',
      'Toyota Highlander': 'Toyota_Highlander',
      'Toyota 4Runner': 'Toyota_4Runner',
      'Toyota Tacoma': 'Toyota_Tacoma',
      'Toyota Tundra': 'Toyota_Tundra',
      'Toyota Supra': 'Toyota_Supra',
      'Toyota Prius': 'Toyota_Prius',
      'Honda Civic': 'Honda_Civic',
      'Honda Accord': 'Honda_Accord',
      'Honda CR-V': 'Honda_CR-V',
      'Honda Pilot': 'Honda_Pilot',
      'Honda Odyssey': 'Honda_Odyssey',
      'Honda Ridgeline': 'Honda_Ridgeline',
      'Lexus ES': 'Lexus_ES',
      'Lexus RX': 'Lexus_RX',
      'Lexus NX': 'Lexus_NX',
      'Lexus GX': 'Lexus_GX',
      'Lexus LX': 'Lexus_LX',
      'Lexus LC': 'Lexus_LC',
      'Lexus IS': 'Lexus_IS',
    };
    
    return titleMappings[cleanVehicle] || cleanVehicle.replace(/ /g, '_');
  };

  const fetchWikipediaImage = useCallback(async (vehicle: string) => {
    if (imageCache[vehicle] || loadingImages.has(vehicle)) {
      return;
    }

    setLoadingImages(prev => new Set(prev).add(vehicle));

    try {
      const title = getWikipediaTitle(vehicle);
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.thumbnail?.source) {
          const imageUrl = data.thumbnail.source.replace(/\/\d+px-/, '/800px-');
          setImageCache(prev => ({ ...prev, [vehicle]: imageUrl }));
        } else {
          setImageCache(prev => ({ ...prev, [vehicle]: 'fallback' }));
        }
      } else {
        setImageCache(prev => ({ ...prev, [vehicle]: 'fallback' }));
      }
    } catch (error) {
      console.error('Failed to fetch Wikipedia image:', error);
      setImageCache(prev => ({ ...prev, [vehicle]: 'fallback' }));
    } finally {
      setLoadingImages(prev => {
        const next = new Set(prev);
        next.delete(vehicle);
        return next;
      });
    }
  }, [imageCache, loadingImages]);

  const getVehicleImage = (vehicle: string): string => {
    if (!imageCache[vehicle] && !loadingImages.has(vehicle)) {
      fetchWikipediaImage(vehicle);
    }
    
    const cached = imageCache[vehicle];
    if (cached && cached !== 'fallback') {
      return cached;
    }
    return `https://placehold.co/800x500/1e293b/f59e0b?text=${encodeURIComponent(vehicle)}&font=roboto`;
  };

  const isImageLoading = (vehicle: string): boolean => {
    return loadingImages.has(vehicle) && !imageCache[vehicle];
  };

  useEffect(() => {
    if (result?.vehicles) {
      result.vehicles.forEach((vehicle: string) => {
        if (!imageCache[vehicle] && !loadingImages.has(vehicle)) {
          fetchWikipediaImage(vehicle);
        }
      });
    }
  }, [result, imageCache, loadingImages, fetchWikipediaImage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [showTips, showEmailCollection, result]);

  useEffect(() => { 
    setIsAnimating(true); 
    window.scrollTo(0, 0); 
    const t = setTimeout(() => setIsAnimating(false), 150); 
    return () => clearTimeout(t); 
  }, [testStep]);

  useEffect(() => {
    setCanSkip(true);
  }, [testStep]);

  useEffect(() => {
    setVehicleImageIndex(0);
  }, [result]);

  // Vehicle MSRP data (approximate new prices in thousands)
  const vehiclePrices: Record<string, number> = {
    // Acura
    'Acura Integra': 32, 'Acura TLX': 40, 'Acura RDX': 42, 'Acura MDX': 52,
    // Alfa Romeo
    'Alfa Romeo Giulia': 45, 'Alfa Romeo Stelvio': 48, 'Alfa Romeo Tonale': 43,
    // Aston Martin
    'Aston Martin Vantage': 155, 'Aston Martin DB11': 210, 'Aston Martin DB11 Volante': 240,
    'Aston Martin DB12': 250, 'Aston Martin DBS Superleggera': 330, 'Aston Martin DBX': 195,
    'Aston Martin DBX707': 240,
    // Audi
    'Audi A4': 42, 'Audi A4 Allroad': 48, 'Audi A5': 48, 'Audi A6': 58, 'Audi A6 Allroad': 70,
    'Audi A8': 90, 'Audi Q3': 40, 'Audi Q5': 48, 'Audi Q7': 62, 'Audi Q8': 72,
    'Audi R8': 160, 'Audi RS5': 78, 'Audi RS6': 125, 'Audi RS e-tron GT': 150,
    'Audi e-tron': 70, 'Audi e-tron GT': 105,
    // Bentley
    'Bentley Bentayga': 200, 'Bentley Continental GT': 225, 'Bentley Flying Spur': 220,
    // BMW
    'BMW 3 Series': 45, 'BMW 4 Series': 50, 'BMW 5 Series': 58, 'BMW 7 Series': 95,
    'BMW M2': 65, 'BMW M3': 75, 'BMW M3/M4': 78, 'BMW M4': 78, 'BMW M5': 110,
    'BMW X1': 40, 'BMW X3': 50, 'BMW X5': 65, 'BMW X7': 80, 'BMW Z4': 55,
    'BMW i4': 55, 'BMW iX': 85,
    // Bugatti
    'Bugatti Chiron': 3500, 'Bugatti Veyron': 1900,
    // Cadillac
    'Cadillac CT5': 42, 'Cadillac Escalade': 85, 'Cadillac Lyriq': 60,
    // Chevrolet
    'Chevrolet Bolt EUV': 28, 'Chevrolet Camaro': 30, 'Chevrolet Colorado': 30,
    'Chevrolet Corvette': 68, 'Chevrolet Equinox EV': 35, 'Chevrolet Express': 42,
    'Chevrolet Silverado': 40, 'Chevrolet Silverado 1500': 40, 'Chevrolet Silverado 2500HD': 48,
    'Chevrolet Silverado 3500HD': 52, 'Chevrolet Silverado EV': 75, 'Chevrolet Spark': 15,
    'Chevrolet Suburban': 62, 'Chevrolet Tahoe': 58,
    // Chrysler
    'Chrysler Pacifica': 42, 'Chrysler Voyager': 35,
    // Dodge
    'Dodge Challenger': 35, 'Dodge Charger': 35, 'Dodge Durango': 42,
    // Ferrari
    'Ferrari 296 GTB': 350, 'Ferrari 812 Superfast': 380, 'Ferrari F8 Tributo': 320,
    'Ferrari Portofino': 240, 'Ferrari Purosangue': 410, 'Ferrari Roma': 245,
    'Ferrari SF90 Stradale': 530,
    // Fiat
    'Fiat 500X': 28, 'Fiat 500e': 35,
    // Ford
    'Ford Bronco': 38, 'Ford EcoSport': 24, 'Ford Edge': 40, 'Ford Escape': 30,
    'Ford Expedition': 60, 'Ford Explorer': 40, 'Ford F-150': 38, 'Ford F-150 Lightning': 60,
    'Ford Maverick': 25, 'Ford Mustang': 32, 'Ford Mustang GT': 45, 'Ford Mustang Mach-E': 48,
    'Ford Ranger': 32, 'Ford Transit': 45, 'Ford Transit Connect': 32,
    // Genesis
    'Genesis G70': 45, 'Genesis G80': 58, 'Genesis G90': 92, 'Genesis GV70': 48,
    'Genesis GV80': 58,
    // GMC
    'GMC Canyon': 32, 'GMC Hummer EV': 115, 'GMC Savana': 45, 'GMC Sierra 1500': 42,
    'GMC Sierra 2500HD': 52, 'GMC Sierra 3500HD': 55, 'GMC Yukon': 62, 'GMC Yukon XL': 68,
    // Honda
    'Honda Accord': 30, 'Honda Civic': 25, 'Honda CR-V': 32, 'Honda HR-V': 25,
    'Honda Odyssey': 40, 'Honda Passport': 42, 'Honda Pilot': 42, 'Honda Ridgeline': 42,
    // Hyundai
    'Hyundai Elantra': 22, 'Hyundai Ioniq 5': 45, 'Hyundai Ioniq 6': 48, 'Hyundai Kona': 25,
    'Hyundai Palisade': 42, 'Hyundai Santa Fe': 35, 'Hyundai Sonata': 28, 'Hyundai Tucson': 30,
    'Hyundai Veloster N': 35,
    // Jaguar
    'Jaguar E-PACE': 48, 'Jaguar F-PACE': 55, 'Jaguar F-Type': 78, 'Jaguar I-PACE': 72,
    'Jaguar XF': 52,
    // Jeep
    'Jeep Cherokee': 35, 'Jeep Compass': 30, 'Jeep Gladiator': 42, 'Jeep Grand Cherokee': 45,
    'Jeep Grand Cherokee L': 48, 'Jeep Grand Wagoneer': 95, 'Jeep Wagoneer': 72,
    'Jeep Wrangler': 35,
    // Kia
    'Kia Carnival': 38, 'Kia EV6': 48, 'Kia EV9': 58, 'Kia Forte': 22, 'Kia K5': 28,
    'Kia Niro': 30, 'Kia Seltos': 25, 'Kia Sorento': 35, 'Kia Soul': 22, 'Kia Sportage': 32,
    'Kia Stinger': 42, 'Kia Telluride': 40,
    // Koenigsegg
    'Koenigsegg Agera RS': 2100, 'Koenigsegg Jesko': 3000, 'Koenigsegg Regera': 2200,
    // Lamborghini
    'Lamborghini Aventador': 500, 'Lamborghini Huracán': 250, 'Lamborghini Urus': 235,
    'Lamborghini Revuelto': 600,
    // Land Rover
    'Land Rover Defender': 58, 'Land Rover Discovery': 62, 'Land Rover Range Rover': 105,
    'Land Rover Range Rover Sport': 85, 'Land Rover Range Rover Velar': 62,
    // Lexus
    'Lexus ES': 45, 'Lexus GX': 65, 'Lexus IS': 42, 'Lexus LC': 98, 'Lexus LM': 130,
    'Lexus LS': 82, 'Lexus LX': 98, 'Lexus NX': 42, 'Lexus RC': 48, 'Lexus RX': 52,
    'Lexus RZ': 62, 'Lexus TX': 58, 'Lexus UX': 38,
    // Lincoln
    'Lincoln Aviator': 58, 'Lincoln Corsair': 42, 'Lincoln Nautilus': 48,
    'Lincoln Navigator': 85,
    // Lucid
    'Lucid Air': 88,
    // Maserati
    'Maserati Ghibli': 82, 'Maserati GranTurismo': 185, 'Maserati Grecale': 68,
    'Maserati Levante': 88, 'Maserati MC20': 225, 'Maserati Quattroporte': 98,
    // Mazda
    'Mazda 3': 25, 'Mazda CX-30': 28, 'Mazda CX-5': 32, 'Mazda CX-50': 32,
    'Mazda CX-70': 42, 'Mazda CX-90': 45, 'Mazda MX-5 Miata': 30,
    // McLaren
    'McLaren 720S': 315, 'McLaren 765LT': 420, 'McLaren Artura': 250, 'McLaren GT': 225,
    // Mercedes-Benz
    'Mercedes-Benz A-Class': 38, 'Mercedes-Benz AMG GT': 130, 'Mercedes-Benz C-Class': 48,
    'Mercedes-Benz CLA': 42, 'Mercedes-Benz CLE': 62, 'Mercedes-Benz E-Class': 62,
    'Mercedes-Benz EQB': 55, 'Mercedes-Benz EQE': 80, 'Mercedes-Benz EQS': 105,
    'Mercedes-Benz G-Class': 145, 'Mercedes-Benz GLA': 42, 'Mercedes-Benz GLB': 45,
    'Mercedes-Benz GLC': 52, 'Mercedes-Benz GLE': 62, 'Mercedes-Benz GLS': 85,
    'Mercedes-Benz Maybach S-Class': 195, 'Mercedes-Benz S-Class': 115,
    'Mercedes-Benz SL': 115, 'Mercedes-Benz Sprinter': 52,
    // Mini
    'Mini Clubman': 32, 'Mini Convertible': 35, 'Mini Cooper': 28, 'Mini Countryman': 35,
    // Mitsubishi
    'Mitsubishi Eclipse Cross': 30, 'Mitsubishi Mirage': 18, 'Mitsubishi Outlander': 32,
    // Nissan
    'Nissan Altima': 28, 'Nissan Ariya': 48, 'Nissan Frontier': 32, 'Nissan GT-R': 125,
    'Nissan Kicks': 22, 'Nissan Leaf': 32, 'Nissan Maxima': 40, 'Nissan Murano': 40,
    'Nissan NV Cargo': 45, 'Nissan Pathfinder': 40, 'Nissan Rogue': 32, 'Nissan Sentra': 22,
    'Nissan Titan': 45, 'Nissan Versa': 18, 'Nissan Z': 45,
    // Pagani
    'Pagani Huayra': 2600, 'Pagani Utopia': 2200,
    // Polestar
    'Polestar 2': 52, 'Polestar 3': 78,
    // Porsche
    'Porsche 718 Boxster': 75, 'Porsche 718 Cayman': 72, 'Porsche 911': 115,
    'Porsche 911 GT3': 185, 'Porsche 911 Turbo': 185, 'Porsche Cayenne': 78,
    'Porsche Macan': 62, 'Porsche Panamera': 98, 'Porsche Taycan': 95,
    // Ram
    'Ram 1500': 42, 'Ram 2500': 48, 'Ram 3500': 52, 'Ram ProMaster': 45,
    'Ram ProMaster City': 32,
    // Rimac
    'Rimac Nevera': 2400,
    // Rivian
    'Rivian R1S': 82, 'Rivian R1T': 78,
    // Rolls-Royce
    'Rolls-Royce Cullinan': 365, 'Rolls-Royce Ghost': 350, 'Rolls-Royce Phantom': 480,
    'Rolls-Royce Spectre': 430,
    // Subaru
    'Subaru Ascent': 38, 'Subaru BRZ': 32, 'Subaru Crosstrek': 28, 'Subaru Forester': 32,
    'Subaru Impreza': 25, 'Subaru Legacy': 28, 'Subaru Outback': 32, 'Subaru Solterra': 48,
    'Subaru WRX': 35,
    // Tesla
    'Tesla Cybertruck': 78, 'Tesla Model 3': 42, 'Tesla Model S': 82, 'Tesla Model X': 92,
    'Tesla Model Y': 48,
    // Toyota
    'Toyota 4Runner': 42, 'Toyota Camry': 28, 'Toyota Corolla': 22, 'Toyota Corolla Cross': 25,
    'Toyota Crown': 45, 'Toyota GR Corolla': 38, 'Toyota GR Supra': 55,
    'Toyota GR86': 32, 'Toyota Grand Highlander': 48, 'Toyota Highlander': 42,
    'Toyota Land Cruiser': 62, 'Toyota Mirai': 52, 'Toyota Prius': 32,
    'Toyota RAV4': 32, 'Toyota Sequoia': 62, 'Toyota Sienna': 42, 'Toyota Tacoma': 32,
    'Toyota Tundra': 42, 'Toyota Venza': 38, 'Toyota bZ4X': 48,
    // Volkswagen
    'Volkswagen Arteon': 45, 'Volkswagen Atlas': 40, 'Volkswagen Golf GTI': 35,
    'Volkswagen Golf R': 48, 'Volkswagen ID.4': 42, 'Volkswagen ID.Buzz': 62,
    'Volkswagen Jetta': 22, 'Volkswagen Taos': 28, 'Volkswagen Tiguan': 32,
    // Volvo
    'Volvo C40 Recharge': 58, 'Volvo EX30': 38, 'Volvo EX90': 82, 'Volvo S60': 45,
    'Volvo S90': 58, 'Volvo V60': 48, 'Volvo V90': 58, 'Volvo XC40': 42,
    'Volvo XC60': 48, 'Volvo XC90': 62,
  };

  // Budget level mapping
  const budgetLevels: Record<string, number> = {
    'under-25k': 1,
    '25k-35k': 2,
    '35k-50k': 3,
    '50k-75k': 4,
    '75k-100k': 5,
    '100k-200k': 6,
    '200k-plus': 7
  };

  const getBudgetMax = (budgetLevel: number): number => {
    switch(budgetLevel) {
      case 1: return 25;
      case 2: return 35;
      case 3: return 50;
      case 4: return 75;
      case 5: return 100;
      case 6: return 200;
      case 7: return 10000;
      default: return 10000;
    }
  };

  // Filter vehicles by budget
  const filterVehiclesByBudget = (vehicles: string[], budgetLevel: number): string[] => {
    const maxBudget = getBudgetMax(budgetLevel);
    return vehicles.map(v => {
      const price = vehiclePrices[v] || 50;
      if (price <= maxBudget) return v;
      return `Used ${v}`;
    });
  };

  // Questions array
  const allQuestions = [
    { id: 'budget', question: 'What is your budget?', icon: '💰', type: 'single', options: [
      { label: 'Under $25,000', value: 'under-25k' },
      { label: '$25,000 - $35,000', value: '25k-35k' },
      { label: '$35,000 - $50,000', value: '35k-50k' },
      { label: '$50,000 - $75,000', value: '50k-75k' },
      { label: '$75,000 - $100,000', value: '75k-100k' },
      { label: '$100,000 - $200,000', value: '100k-200k' },
      { label: '$200,000+', value: '200k-plus' }
    ] },
    { id: 'body-style', question: 'Any specific body style preferences?', icon: '🚗', type: 'multiple', options: [
      { label: 'Sedan', value: 'sedan' }, { label: 'SUV/Crossover', value: 'suv' }, { label: 'Truck', value: 'truck' },
      { label: 'Coupe', value: 'coupe' }, { label: 'Hatchback', value: 'hatchback' }, { label: 'Wagon', value: 'wagon' },
      { label: 'Minivan', value: 'minivan' }, { label: 'Convertible', value: 'convertible' }, { label: 'No preference', value: 'none' }
    ] },
    { id: 'brand', question: 'Any brand preferences?', icon: '🏷️', type: 'multiple', options: [
      { label: 'Toyota', value: 'toyota' }, { label: 'Honda', value: 'honda' }, { label: 'Ford', value: 'ford' },
      { label: 'Chevrolet', value: 'chevrolet' }, { label: 'BMW', value: 'bmw' }, { label: 'Mercedes', value: 'mercedes' },
      { label: 'Audi', value: 'audi' }, { label: 'Tesla', value: 'tesla' }, { label: 'Lexus', value: 'lexus' },
      { label: 'Porsche', value: 'porsche' }, { label: 'No preference', value: 'none' }
    ] },
    { id: 'gender', question: 'What is your gender?', icon: '👤', type: 'single', options: [
      { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }, { label: 'Other', value: 'other' }, { label: 'Prefer not to say', value: 'skip' }
    ] },
    { id: 'zip-code', question: 'What is your zip code?', icon: '📍', type: 'text', options: [] },
    { id: 'terrain', question: 'What terrain do you mostly drive on?', icon: '🛣️', type: 'single', options: [
      { label: 'Paved roads only', value: 'paved' }, { label: 'Mix of paved and unpaved', value: 'mixed' },
      { label: 'Frequent off-road/gravel', value: 'offroad' }, { label: 'Mountain/hilly terrain', value: 'mountain' }
    ] },
    { id: 'weather', question: 'What weather conditions do you drive in?', icon: '🌤️', type: 'single', options: [
      { label: 'Mostly sunny/dry', value: 'dry' }, { label: 'Frequent rain', value: 'rain' },
      { label: 'Heavy snow/ice', value: 'snow' }, { label: 'All seasons equally', value: 'all' }
    ] },
    { id: 'passengers', question: 'How many passengers do you typically carry?', icon: '👥', type: 'single', options: [
      { label: 'Just me', value: '1' }, { label: '1-2 passengers', value: '2-3' },
      { label: '3-4 passengers', value: '4-5' }, { label: '5+ passengers', value: '6+' }
    ] },
    { id: 'primary-use', question: 'What is the primary use of the vehicle?', icon: '🎯', type: 'single', options: [
      { label: 'Daily commuting', value: 'commute' }, { label: 'Family transportation', value: 'family' },
      { label: 'Work/business', value: 'work' }, { label: 'Weekend/recreation', value: 'recreation' },
      { label: 'Adventure/off-road', value: 'adventure' }
    ] },
    { id: 'commute-distance', question: 'How far is your daily commute?', icon: '📏', type: 'single', options: [
      { label: 'Under 10 miles', value: 'short' }, { label: '10-30 miles', value: 'medium' },
      { label: '30-50 miles', value: 'long' }, { label: '50+ miles', value: 'very-long' },
      { label: 'No regular commute', value: 'none' }
    ] },
    { id: 'driving-environment', question: 'Where do you drive most?', icon: '🏙️', type: 'single', options: [
      { label: 'City/urban', value: 'city' }, { label: 'Suburban', value: 'suburban' },
      { label: 'Rural', value: 'rural' }, { label: 'Highway', value: 'highway' }
    ] },
    { id: 'cargo-needs', question: 'How important is cargo space?', icon: '📦', type: 'single', options: [
      { label: 'Minimal - personal items only', value: 'minimal' }, { label: 'Moderate - groceries and luggage', value: 'moderate' },
      { label: 'Large - sports equipment, big items', value: 'large' }, { label: 'Maximum - hauling, moving', value: 'maximum' }
    ] },
    { id: 'activities', question: 'What activities require your vehicle?', icon: '🎿', type: 'multiple', options: [
      { label: 'Road trips', value: 'road-trips' }, { label: 'Camping', value: 'camping' }, { label: 'Sports equipment', value: 'sports' },
      { label: 'Home improvement', value: 'home' }, { label: 'Pet transportation', value: 'pets' }, { label: 'None specific', value: 'none' }
    ] },
    { id: 'towing', question: 'Do you need towing capability?', icon: '🚚', type: 'single', options: [
      { label: 'No towing needed', value: 'none' }, { label: 'Light trailer/boat', value: 'light' },
      { label: 'Medium trailer/camper', value: 'medium' }, { label: 'Heavy duty towing', value: 'heavy' }
    ] },
    { id: 'parking', question: 'What is your parking situation?', icon: '🅿️', type: 'single', options: [
      { label: 'Garage - any size works', value: 'garage' }, { label: 'Street parking - prefer compact', value: 'street' },
      { label: 'Parking lot - standard spaces', value: 'lot' }, { label: 'Mix of situations', value: 'mixed' }
    ] },
    { id: 'new-used', question: 'New or used vehicle preference?', icon: '✨', type: 'single', options: [
      { label: 'New only', value: 'new' }, { label: 'Certified pre-owned', value: 'cpo' },
      { label: 'Used is fine', value: 'used' }, { label: 'No preference', value: 'any' }
    ] },
    { id: 'ownership-length', question: 'How long do you plan to keep the vehicle?', icon: '📅', type: 'single', options: [
      { label: '1-2 years', value: 'short' }, { label: '3-5 years', value: 'medium' },
      { label: '5-10 years', value: 'long' }, { label: '10+ years', value: 'very-long' }
    ] },
    { id: 'fuel-priority', question: 'How important is fuel efficiency?', icon: '⛽', type: 'single', options: [
      { label: 'Top priority', value: 'high' }, { label: 'Important but not critical', value: 'medium' },
      { label: 'Not a major concern', value: 'low' }, { label: "Don't care at all", value: 'none' }
    ] },
    { id: 'powertrain', question: 'Powertrain preference?', icon: '🔋', type: 'single', options: [
      { label: 'Traditional gas', value: 'gas' }, { label: 'Hybrid', value: 'hybrid' },
      { label: 'Plug-in hybrid', value: 'phev' }, { label: 'Full electric', value: 'electric' },
      { label: 'No preference', value: 'any' }
    ] },
    { id: 'driving-style', question: 'How would you describe your driving style?', icon: '🏎️', type: 'single', options: [
      { label: 'Relaxed and economical', value: 'relaxed' }, { label: 'Balanced and practical', value: 'balanced' },
      { label: 'Spirited and engaging', value: 'spirited' }, { label: 'Performance-focused', value: 'performance' }
    ] },
    { id: 'tech-features', question: 'Which tech features matter most?', icon: '📱', type: 'multiple', maxSelect: 3, options: [
      { label: 'Apple CarPlay/Android Auto', value: 'carplay' }, { label: 'Large touchscreen', value: 'touchscreen' },
      { label: 'Premium audio', value: 'audio' }, { label: 'Digital instrument cluster', value: 'digital' },
      { label: 'Head-up display', value: 'hud' }, { label: 'Wireless charging', value: 'wireless' }
    ] },
    { id: 'safety-features', question: 'Which safety features are essential?', icon: '🛡️', type: 'multiple', maxSelect: 3, options: [
      { label: 'Blind spot monitoring', value: 'blind-spot' }, { label: 'Automatic emergency braking', value: 'aeb' },
      { label: 'Adaptive cruise control', value: 'acc' }, { label: 'Lane keeping assist', value: 'lka' },
      { label: '360° camera', value: '360-camera' }, { label: 'Parking sensors', value: 'parking' }
    ] },
    { id: 'comfort-features', question: 'Which comfort features are important?', icon: '🛋️', type: 'multiple', maxSelect: 3, options: [
      { label: 'Heated seats', value: 'heated-seats' }, { label: 'Cooled/ventilated seats', value: 'cooled-seats' },
      { label: 'Panoramic sunroof', value: 'sunroof' }, { label: 'Leather interior', value: 'leather' },
      { label: 'Quiet cabin', value: 'quiet' }, { label: 'Adjustable suspension', value: 'suspension' }
    ] },
    { id: 'priorities', question: 'Rank your top 3 priorities:', icon: '⭐', type: 'multiple', maxSelect: 3, options: [
      { label: 'Reliability', value: 'reliability' }, { label: 'Performance', value: 'performance' },
      { label: 'Fuel efficiency', value: 'efficiency' }, { label: 'Safety', value: 'safety' },
      { label: 'Technology', value: 'technology' }, { label: 'Comfort', value: 'comfort' },
      { label: 'Style/appearance', value: 'style' }, { label: 'Resale value', value: 'resale' }
    ] },
    { id: 'image', question: 'What image do you want your car to project?', icon: '😎', type: 'single', options: [
      { label: 'Practical and sensible', value: 'practical' }, { label: 'Sporty and fun', value: 'sporty' },
      { label: 'Luxurious and refined', value: 'luxury' }, { label: 'Rugged and capable', value: 'rugged' },
      { label: 'Eco-conscious', value: 'eco' }, { label: 'Unique and standout', value: 'unique' }
    ] }
  ];

  // Vehicle type definitions
  const vehicleTypes = {
    micro: { name: 'City Car', vehicles: ['Chevrolet Spark', 'Mitsubishi Mirage', 'Fiat 500e', 'Mini Cooper', 'Nissan Versa'], description: 'Compact, fuel-efficient vehicles perfect for urban environments', features: ['Easy parking', 'Excellent fuel economy', 'Low cost of ownership', 'Perfect for city driving', 'Affordable pricing'] },
    hatchback: { name: 'Hatchback', vehicles: ['Volkswagen Golf GTI', 'Mazda 3', 'Honda Civic Hatchback', 'Toyota Corolla Hatchback', 'Hyundai Veloster N'], description: 'Versatile cars combining practicality with fun driving dynamics', features: ['Versatile cargo space', 'Fun to drive', 'Good fuel economy', 'Practical daily driver', 'Sporty handling'] },
    crossover: { name: 'Compact Crossover', vehicles: ['Mazda CX-30', 'Kia Seltos', 'Hyundai Kona', 'Toyota Corolla Cross', 'Honda HR-V'], description: 'The perfect blend of sedan efficiency and SUV versatility', features: ['Higher seating position', 'Good cargo space', 'Fuel efficient', 'Easy to maneuver', 'Modern styling'] },
    sedan: { name: 'Sedan', vehicles: ['Honda Accord', 'Toyota Camry', 'Mazda 6', 'Hyundai Sonata', 'Nissan Altima'], description: 'Classic four-door comfort with excellent value and reliability', features: ['Comfortable ride', 'Good trunk space', 'Fuel efficient', 'Reliable', 'Smooth handling'] },
    coupe: { name: 'Sports Coupe', vehicles: ['Ford Mustang', 'Chevrolet Camaro', 'BMW 4 Series', 'Nissan Z', 'Toyota GR86'], description: 'Sporty two-door vehicles focused on style and performance', features: ['Head-turning style', 'Powerful engines', 'Engaging driving', 'Sport-tuned suspension', 'Premium interiors'] },
    midsizeSuv: { name: 'Midsize SUV', vehicles: ['Toyota RAV4', 'Honda CR-V', 'Mazda CX-5', 'Ford Bronco Sport', 'Hyundai Tucson'], description: 'Popular family vehicles with excellent space and capability', features: ['Spacious interior', 'Good cargo capacity', 'Available AWD', 'Family friendly', 'Safety features'] },
    suv: { name: 'Full-Size SUV', vehicles: ['Toyota Highlander', 'Honda Pilot', 'Ford Explorer', 'Chevrolet Tahoe', 'Kia Telluride'], description: 'Large SUVs offering maximum space and towing capability', features: ['Third row seating', 'Towing capacity', 'Premium features', 'Commanding presence', 'Family oriented'] },
    midsizeTruck: { name: 'Midsize Truck', vehicles: ['Toyota Tacoma', 'Ford Ranger', 'Chevrolet Colorado', 'Jeep Gladiator', 'GMC Canyon'], description: 'Versatile trucks that balance capability with daily drivability', features: ['Truck bed utility', 'Off-road capability', 'Manageable size', 'Towing capacity', 'Adventure ready'] },
    truck: { name: 'Full-Size Truck', vehicles: ['Ford F-150', 'Chevrolet Silverado 1500', 'Ram 1500', 'Toyota Tundra', 'GMC Sierra 1500'], description: 'Maximum capability for work and play', features: ['Heavy towing', 'Large bed', 'Powerful engines', 'Work capability', 'Premium options'] },
    minivan: { name: 'Minivan', vehicles: ['Honda Odyssey', 'Toyota Sienna', 'Kia Carnival', 'Chrysler Pacifica', 'Chrysler Voyager'], description: 'The ultimate family vehicle with unmatched practicality', features: ['Sliding doors', 'Maximum interior space', 'Family features', 'Comfortable seating', 'Storage solutions'] },
    van: { name: 'Cargo/Passenger Van', vehicles: ['Ford Transit', 'Mercedes-Benz Sprinter', 'Ram ProMaster', 'Chevrolet Express', 'Nissan NV Cargo'], description: 'Commercial-grade vehicles for work or conversion', features: ['Maximum cargo space', 'High roof options', 'Customizable', 'Commercial ready', 'Conversion friendly'] },
    wagon: { name: 'Wagon', vehicles: ['Volvo V60', 'Audi A4 Allroad', 'Subaru Outback', 'Volvo V90', 'Mercedes-Benz E-Class Wagon'], description: 'Car-like driving with SUV-level cargo space', features: ['Low loading floor', 'Excellent handling', 'Cargo versatility', 'Unique styling', 'Premium feel'] },
    sport: { name: 'Sports Car', vehicles: ['Chevrolet Corvette', 'Porsche 911', 'BMW M3', 'Audi RS5', 'Mercedes-AMG GT'], description: 'High-performance vehicles for enthusiasts', features: ['Thrilling performance', 'Track capable', 'Precise handling', 'Premium materials', 'Head-turning design'] },
    roadster: { name: 'Roadster', vehicles: ['Mazda MX-5 Miata', 'Porsche 718 Boxster', 'BMW Z4', 'Chevrolet Corvette Convertible', 'Jaguar F-Type'], description: 'Open-top driving pleasure in pure form', features: ['Convertible top', 'Engaging driving', 'Lightweight', 'Classic styling', 'Wind in your hair'] },
    hyper: { name: 'Hypercar', vehicles: ['Bugatti Chiron', 'Koenigsegg Jesko', 'Lamborghini Revuelto', 'Lamborghini Aventador', 'Ferrari SF90 Stradale', 'McLaren 765LT'], description: 'The absolute pinnacle of automotive engineering and performance', features: ['Extreme performance', 'Cutting-edge tech', 'Exclusive', 'Investment grade', 'Breathtaking design'] },
    muscle: { name: 'Muscle Car', vehicles: ['Dodge Challenger', 'Ford Mustang GT', 'Chevrolet Camaro SS', 'Dodge Charger', 'Ford Mustang Mach 1'], description: 'American power and heritage with modern capability', features: ['V8 power', 'Aggressive styling', 'American heritage', 'Straight-line speed', 'Bold presence'] }
  };

  // Calculate recommendation
  const calculateRecommendation = () => {
    const scores: Record<string, number> = {};
    Object.keys(vehicleTypes).forEach(type => { scores[type] = 0; });

    // Passengers scoring
    const passengers = answers['passengers'];
    if (passengers === '1') { scores.micro += 3; scores.coupe += 2; scores.roadster += 3; scores.sport += 2; }
    else if (passengers === '2-3') { scores.sedan += 2; scores.coupe += 2; scores.hatchback += 2; scores.crossover += 2; }
    else if (passengers === '4-5') { scores.sedan += 2; scores.midsizeSuv += 3; scores.wagon += 2; scores.minivan += 1; }
    else if (passengers === '6+') { scores.suv += 3; scores.minivan += 4; scores.van += 2; }

    // Primary use scoring
    const primaryUse = answers['primary-use'];
    if (primaryUse === 'commute') { scores.sedan += 2; scores.hatchback += 2; scores.crossover += 2; scores.micro += 2; }
    else if (primaryUse === 'family') { scores.midsizeSuv += 3; scores.suv += 3; scores.minivan += 4; scores.wagon += 2; }
    else if (primaryUse === 'work') { scores.truck += 3; scores.midsizeTruck += 2; scores.van += 3; }
    else if (primaryUse === 'recreation') { scores.coupe += 2; scores.sport += 2; scores.roadster += 2; scores.muscle += 2; }
    else if (primaryUse === 'adventure') { scores.suv += 2; scores.midsizeTruck += 3; scores.truck += 2; }

    // Commute distance scoring
    const commuteDistance = answers['commute-distance'];
    if (commuteDistance === 'short') { scores.micro += 2; scores.hatchback += 1; }
    else if (commuteDistance === 'medium' || commuteDistance === 'long') { scores.sedan += 2; scores.crossover += 2; }
    else if (commuteDistance === 'very-long') { scores.sedan += 3; scores.wagon += 2; }

    // Driving environment scoring
    const drivingEnv = answers['driving-environment'];
    if (drivingEnv === 'city') { scores.micro += 3; scores.hatchback += 2; scores.crossover += 1; }
    else if (drivingEnv === 'suburban') { scores.sedan += 2; scores.crossover += 2; scores.midsizeSuv += 2; }
    else if (drivingEnv === 'rural') { scores.truck += 2; scores.suv += 2; scores.midsizeTruck += 2; }
    else if (drivingEnv === 'highway') { scores.sedan += 2; scores.wagon += 2; scores.suv += 1; }

    // Weather scoring
    const weather = answers['weather'];
    if (weather === 'snow') { scores.suv += 2; scores.crossover += 2; scores.midsizeSuv += 2; scores.truck += 1; }

    // Terrain scoring
    const terrain = answers['terrain'];
    if (terrain === 'offroad' || terrain === 'mountain') { scores.suv += 3; scores.truck += 2; scores.midsizeTruck += 2; }

    // Cargo needs scoring
    const cargoNeeds = answers['cargo-needs'];
    if (cargoNeeds === 'minimal') { scores.micro += 2; scores.coupe += 2; scores.sedan += 1; }
    else if (cargoNeeds === 'moderate') { scores.sedan += 2; scores.crossover += 2; scores.hatchback += 2; }
    else if (cargoNeeds === 'large') { scores.suv += 2; scores.wagon += 3; scores.midsizeSuv += 2; }
    else if (cargoNeeds === 'maximum') { scores.truck += 3; scores.van += 4; scores.suv += 2; }

    // Activities scoring
    const activities = answers['activities'] || [];
    if (activities.includes('road-trips')) { scores.sedan += 1; scores.suv += 2; scores.wagon += 2; }
    if (activities.includes('camping')) { scores.suv += 2; scores.truck += 2; scores.midsizeTruck += 2; }
    if (activities.includes('sports')) { scores.midsizeSuv += 2; scores.wagon += 2; scores.suv += 1; }
    if (activities.includes('home')) { scores.truck += 3; scores.midsizeTruck += 2; scores.van += 2; }
    if (activities.includes('pets')) { scores.suv += 1; scores.crossover += 1; scores.wagon += 2; }

    // Towing scoring
    const towing = answers['towing'];
    if (towing === 'light') { scores.midsizeSuv += 2; scores.crossover += 1; }
    else if (towing === 'medium') { scores.suv += 3; scores.truck += 2; scores.midsizeTruck += 2; }
    else if (towing === 'heavy') { scores.truck += 4; scores.suv += 2; }

    // Parking scoring
    const parking = answers['parking'];
    if (parking === 'street') { scores.micro += 3; scores.hatchback += 2; scores.sedan += 1; }

    // Fuel priority scoring
    const fuelPriority = answers['fuel-priority'];
    if (fuelPriority === 'high') { scores.micro += 2; scores.hatchback += 2; scores.sedan += 1; scores.hyper -= 3; scores.muscle -= 2; }
    else if (fuelPriority === 'none') { scores.truck += 1; scores.muscle += 2; scores.sport += 1; }

    // Driving style scoring
    const drivingStyle = answers['driving-style'];
    if (drivingStyle === 'relaxed') { scores.sedan += 2; scores.minivan += 2; scores.crossover += 2; }
    else if (drivingStyle === 'spirited') { scores.hatchback += 2; scores.coupe += 2; scores.sport += 1; }
    else if (drivingStyle === 'performance') { scores.sport += 4; scores.muscle += 3; scores.coupe += 2; scores.hyper += 2; scores.roadster += 2; }

    // Comfort features scoring
    const comfortFeatures = answers['comfort-features'] || [];
    if (comfortFeatures.includes('quiet')) { scores.sedan += 2; scores.suv += 1; }
    if (comfortFeatures.includes('suspension')) { scores.sport += 2; scores.suv += 1; }

    // Priorities scoring
    const priorities = answers['priorities'] || [];
    if (priorities.includes('reliability')) { scores.sedan += 2; scores.crossover += 2; }
    if (priorities.includes('performance')) { scores.sport += 3; scores.muscle += 2; scores.coupe += 2; }
    if (priorities.includes('efficiency')) { scores.micro += 2; scores.hatchback += 2; }
    if (priorities.includes('safety')) { scores.suv += 2; scores.midsizeSuv += 2; }
    if (priorities.includes('comfort')) { scores.sedan += 2; scores.suv += 2; }
    if (priorities.includes('style')) { scores.coupe += 2; scores.sport += 2; scores.roadster += 2; }

    // Image scoring
    const image = answers['image'];
    if (image === 'practical') { scores.sedan += 2; scores.crossover += 2; scores.minivan += 2; }
    else if (image === 'sporty') { scores.coupe += 3; scores.sport += 3; scores.muscle += 2; scores.hatchback += 1; }
    else if (image === 'luxury') { scores.sedan += 1; scores.suv += 2; scores.sport += 2; scores.hyper += 2; }
    else if (image === 'rugged') { scores.truck += 3; scores.suv += 2; scores.midsizeTruck += 2; }
    else if (image === 'eco') { scores.hatchback += 2; scores.micro += 2; scores.crossover += 1; }
    else if (image === 'unique') { scores.roadster += 2; scores.wagon += 2; scores.hyper += 1; }

    // Body style preferences
    const bodyStyle = answers['body-style'] || [];
    if (bodyStyle.includes('sedan')) scores.sedan += 5;
    if (bodyStyle.includes('suv')) { scores.midsizeSuv += 3; scores.suv += 3; scores.crossover += 2; }
    if (bodyStyle.includes('truck')) { scores.truck += 5; scores.midsizeTruck += 3; }
    if (bodyStyle.includes('coupe')) { scores.coupe += 5; scores.sport += 2; }
    if (bodyStyle.includes('hatchback')) scores.hatchback += 5;
    if (bodyStyle.includes('wagon')) scores.wagon += 5;
    if (bodyStyle.includes('minivan')) scores.minivan += 5;
    if (bodyStyle.includes('convertible')) { scores.roadster += 5; scores.sport += 2; }

    // Brand preferences
    const brandPref = answers['brand'] || [];
    if (brandPref.includes('porsche') || brandPref.includes('bmw') || brandPref.includes('mercedes') || brandPref.includes('audi')) {
      scores.sport += 2; scores.coupe += 1;
    }
    if (brandPref.includes('tesla')) {
      scores.sedan += 1; scores.crossover += 1; scores.suv += 1;
    }

    // Powertrain preferences
    const powertrain = answers['powertrain'];
    if (powertrain === 'electric') {
      scores.sedan += 1; scores.crossover += 1; scores.suv += 1;
    }

    // Budget restrictions
    const budgetLevel = budgetLevels[answers['budget']] || 4;
    if (budgetLevel <= 2) { scores.hyper -= 10; scores.sport -= 3; }
    if (budgetLevel <= 3) { scores.hyper -= 10; }
    if (budgetLevel >= 6) { scores.micro -= 3; scores.hyper += 2; }
    if (budgetLevel >= 7) { scores.hyper += 5; }

    // Find winning type
    let maxScore = -1;
    let winningType = 'sedan';
    Object.entries(scores).forEach(([type, score]) => {
      if (score > maxScore) { maxScore = score; winningType = type; }
    });

    // Generate result
    const typeInfo = vehicleTypes[winningType as keyof typeof vehicleTypes];
    const filteredVehicles = filterVehiclesByBudget(typeInfo.vehicles, budgetLevel);

    // Generate reasoning
    const reasoning: string[] = [];
    if (passengers === '6+') reasoning.push('You need maximum seating capacity for 6+ passengers');
    if (primaryUse === 'family') reasoning.push('Optimized for family transportation needs');
    if (primaryUse === 'work') reasoning.push('Built for work and commercial use');
    if (towing === 'heavy') reasoning.push('Heavy-duty towing capability required');
    if (drivingStyle === 'performance') reasoning.push('Matches your performance-focused driving style');
    if (cargoNeeds === 'maximum') reasoning.push('Maximum cargo space for hauling');
    if (weather === 'snow') reasoning.push('Handles well in snow and winter conditions');
    if (image === 'sporty') reasoning.push('Projects the sporty image you want');
    if (image === 'eco') reasoning.push('Environmentally conscious choice');

    return {
      vehicleType: winningType,
      vehicleSizeName: typeInfo.name,
      vehicles: filteredVehicles,
      description: typeInfo.description,
      features: typeInfo.features,
      reasoning: reasoning.slice(0, 5),
      answers: answers,
      timestamp: new Date().toISOString(),
      email: emailAddress
    };
  };

  const handleAnswer = (qId: string, val: string) => {
    setAnswers({ ...answers, [qId]: val });
    if (testStep < allQuestions.length - 1) {
      setTestStep(testStep + 1);
    } else {
      setShowEmailCollection(true);
    }
  };

  const handleMultiSelect = (qId: string, val: string, maxSelect?: number) => {
    const current = answers[qId] || [];
    let updated;
    if (current.includes(val)) {
      updated = current.filter((v: string) => v !== val);
    } else {
      if (maxSelect && current.length >= maxSelect) {
        updated = [...current.slice(1), val];
      } else {
        updated = [...current, val];
      }
    }
    setAnswers({ ...answers, [qId]: updated });
  };

  const skipQuestion = () => {
    if (testStep < allQuestions.length - 1) {
      setTestStep(testStep + 1);
    } else {
      setShowEmailCollection(true);
    }
  };

  const submitEmailAndShowResults = () => {
    const recommendation = calculateRecommendation();
    setResult(recommendation);
    // Save to localStorage
    try {
      localStorage.setItem('autoWizardResult', JSON.stringify(recommendation));
    } catch (e) {
      console.error('Failed to save result:', e);
    }
  };

  const resetTest = () => {
    setTestStep(0);
    setAnswers({});
    setResult(null);
    setShowEmailCollection(false);
    setShowTips(true);
    setEmailAddress('');
    setVehicleImageIndex(0);
  };

  const beginAssessment = () => {
    setShowTips(false);
  };

  const sendEmail = () => {
    setTimeout(() => {
      setEmailSent(true);
      setTimeout(() => {
        setShowEmailModal(false);
        setEmailSent(false);
      }, 2000);
    }, 1000);
  };

  const getArr = (val: any) => Array.isArray(val) ? val : [];
  const currentQ = allQuestions[testStep];
  const isMultiple = currentQ?.type === 'multiple';
  const isText = currentQ?.type === 'text';

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Tips Screen */}
      {showTips && (
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-6">
                <FileText className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Before You Start</h2>
              <p className="text-white/60">Follow these tips for the most accurate results</p>
            </div>
            
            <div className="space-y-6 mb-10">
              {[
                { title: 'Answer Based on Your Daily Life', desc: 'Think about your typical week, not rare occasions or "what if" scenarios' },
                { title: 'Be Honest About Your Needs', desc: "Don't answer based on what sounds cool - answer what actually fits your lifestyle" },
                { title: 'Consider the Next 3-5 Years', desc: 'Will your family grow? Job change? New hobbies? Think ahead' },
                { title: 'Budget Realistically', desc: "A $50,000 budget won't match you with a Lamborghini" },
                { title: 'There Are No Wrong Answers', desc: "Every response helps us find YOUR perfect match - not someone else's" },
                { title: 'All Questions Are Optional', desc: 'But with every question you answer, our results get more impressive' }
              ].map((tip, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{tip.title}</h3>
                    <p className="text-white/60 text-sm">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4 text-white/40 text-sm mb-2">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />3-5 minutes</span>
                <span className="flex items-center gap-1"><Shield className="w-4 h-4" />Your answers are private</span>
              </div>
              <button onClick={beginAssessment} className="group px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-lg font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25">
                <span className="flex items-center justify-center gap-2">Begin Assessment<ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              </button>
              <Link href="/" className="text-white/50 hover:text-amber-400 flex items-center gap-2 mt-2"><ArrowLeft className="w-4 h-4" />Back to Home</Link>
            </div>
          </div>
        </div>
      )}

      {/* Questions */}
      {!showTips && !result && !showEmailCollection && (
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className={`transition-opacity duration-200 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-white/50">Question {testStep + 1} of {allQuestions.length}</span>
                  <span className="text-sm font-medium text-amber-400">{Math.round(((testStep + 1) / allQuestions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500" style={{ width: `${((testStep + 1) / allQuestions.length) * 100}%` }} />
                </div>
              </div>
              
              {currentQ && (
                <>
                  <div className="mb-6">
                    <span className="text-4xl mb-4 block">{currentQ.icon}</span>
                    <h2 className="text-2xl font-semibold text-white">{currentQ.question}</h2>
                    {isMultiple && <p className="text-amber-400/80 text-sm mt-2">{currentQ.maxSelect ? `Select up to ${currentQ.maxSelect}` : 'Select all that apply'}</p>}
                  </div>
                  
                  {isText ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={answers[currentQ.id] || ''}
                        onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
                        placeholder="Enter your 5-digit zip code"
                        maxLength={5}
                        className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-4 text-white text-center text-2xl tracking-widest focus:outline-none focus:border-amber-500"
                        onKeyDown={(e) => { if (e.key === 'Enter' && answers[currentQ.id]?.length === 5) { if (testStep < allQuestions.length - 1) setTestStep(testStep + 1); else setShowEmailCollection(true); }}}
                      />
                      <button 
                        onClick={() => { if (testStep < allQuestions.length - 1) setTestStep(testStep + 1); else setShowEmailCollection(true); }} 
                        disabled={!answers[currentQ.id] || answers[currentQ.id].length !== 5} 
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        Continue <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  ) : isMultiple ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentQ.options.map((o, i) => {
                          const selected = getArr(answers[currentQ.id]).includes(o.value);
                          return (
                            <button key={i} onClick={() => handleMultiSelect(currentQ.id, o.value, currentQ.maxSelect)} className={`text-left p-3 border rounded-xl transition-all ${selected ? 'bg-amber-500/20 border-amber-500/60' : 'bg-black/30 border-white/10 hover:border-amber-500/30'}`}>
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'bg-amber-500 border-amber-500' : 'border-white/30'}`}>{selected && <Check className="w-3 h-3 text-black" />}</div>
                                <span className={`text-sm ${selected ? 'text-white' : 'text-white/70'}`}>{o.label}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button onClick={() => { if (testStep < allQuestions.length - 1) setTestStep(testStep + 1); else { setShowEmailCollection(true); }}} disabled={getArr(answers[currentQ.id]).length === 0} className="flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">Continue <ChevronRight className="w-5 h-5" /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {currentQ.options.map((o, i) => (
                        <button key={i} onClick={() => handleAnswer(currentQ.id, o.value)} className="w-full text-left p-4 bg-black/30 border border-white/10 rounded-xl hover:border-amber-500/50 hover:bg-white/5 transition-all group">
                          <div className="flex items-center justify-between">
                            <span className="text-white/80 group-hover:text-white">{o.label}</span>
                            <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
              
              <div className="mt-6 flex items-center justify-between">
                {testStep > 0 ? <button onClick={() => setTestStep(testStep - 1)} className="text-white/50 hover:text-amber-400 flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Back</button> : <div></div>}
                {canSkip && <button onClick={skipQuestion} className="text-white/50 hover:text-amber-400 flex items-center gap-2">Skip<ArrowRight className="w-4 h-4" /></button>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Collection */}
      {showEmailCollection && !result && (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-6">
                <Mail className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Almost There!</h2>
              <p className="text-white/60 max-w-md mx-auto">Enter your email to see your personalized vehicle recommendation. We'll also send you a copy of your results.</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <input 
                type="email" 
                value={emailAddress} 
                onChange={(e) => setEmailAddress(e.target.value)} 
                placeholder="Enter your email address" 
                className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-4 text-white mb-4 focus:outline-none focus:border-amber-500 text-center"
                onKeyDown={(e) => { if (e.key === 'Enter' && emailAddress.includes('@') && emailAddress.includes('.')) submitEmailAndShowResults(); }}
              />
              <button 
                onClick={submitEmailAndShowResults} 
                disabled={!emailAddress.includes('@') || !emailAddress.includes('.')} 
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
              >
                See My Results <ChevronRight className="w-5 h-5" />
              </button>
              <p className="text-white/40 text-xs text-center mt-4">We respect your privacy. No spam, ever.</p>
            </div>
            
            <button onClick={() => { setShowEmailCollection(false); }} className="mt-8 text-white/50 hover:text-amber-400 flex items-center gap-2 mx-auto"><ArrowLeft className="w-4 h-4" />Back to questions</button>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 text-sm mb-4"><Check className="w-4 h-4" />Complete</div>
            <h2 className="text-4xl font-bold text-white mb-2">Your Perfect Match</h2>
            <p className="text-2xl font-semibold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">{result.vehicleSizeName}</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-lg text-white/70 mb-8 text-center max-w-3xl mx-auto">{result.description}</p>
            
            <div className="mb-10">
              <h3 className="text-lg font-semibold mb-4 text-amber-400 text-center">Recommended Vehicles</h3>
              
              {/* Image Carousel */}
              <div className="relative max-w-2xl mx-auto">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
                  {isImageLoading(result.vehicles[vehicleImageIndex]) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-10">
                      <div className="flex flex-col items-center gap-3">
                        <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
                        <span className="text-white/60 text-sm">Loading image...</span>
                      </div>
                    </div>
                  )}
                  <img 
                    src={getVehicleImage(result.vehicles[vehicleImageIndex])} 
                    alt={result.vehicles[vehicleImageIndex]}
                    className="w-full h-full object-contain bg-zinc-900"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x400/1a1a1a/ffd700?text=' + encodeURIComponent(result.vehicles[vehicleImageIndex]);
                    }}
                  />
                  
                  <button 
                    onClick={() => setVehicleImageIndex(prev => prev === 0 ? result.vehicles.length - 1 : prev - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button 
                    onClick={() => setVehicleImageIndex(prev => prev === result.vehicles.length - 1 ? 0 : prev + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-white text-sm">
                    {vehicleImageIndex + 1} / {result.vehicles.length}
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <h4 className="text-2xl font-bold text-white">{result.vehicles[vehicleImageIndex]}</h4>
                </div>
                
                <div className="flex justify-center gap-2 mt-4">
                  {result.vehicles.map((_: string, i: number) => (
                    <button 
                      key={i}
                      onClick={() => setVehicleImageIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all ${i === vehicleImageIndex ? 'bg-amber-400 scale-110' : 'bg-white/30 hover:bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {result.reasoning.length > 0 && (
              <div className="bg-black/30 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4 text-amber-400 flex items-center gap-2"><Target className="w-5 h-5" />Why This Recommendation</h3>
                <ul className="space-y-2">{result.reasoning.map((r: string, i: number) => <li key={i} className="flex items-start gap-3 text-white/70"><Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />{r}</li>)}</ul>
              </div>
            )}
            
            <div className="bg-black/30 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-amber-400 flex items-center gap-2"><Star className="w-5 h-5" />Key Features</h3>
              <div className="grid md:grid-cols-2 gap-3">{result.features.map((f: string, i: number) => <div key={i} className="flex items-center gap-3 text-white/70"><div className="w-2 h-2 rounded-full bg-amber-400" />{f}</div>)}</div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowEmailModal(true)} className="px-6 py-3 rounded-xl border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 flex items-center justify-center gap-2"><Mail className="w-5 h-5" />Email</button>
              <Link href="/consultation" className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 text-center">Schedule Consultation</Link>
              <button onClick={resetTest} className="px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:border-amber-500/50 hover:text-amber-400">Retake</button>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Email Results</h3>
              <button onClick={() => setShowEmailModal(false)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            {emailSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-amber-400" />
                </div>
                <p className="text-lg text-white">Sent!</p>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white mb-4 focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={sendEmail}
                  disabled={!emailAddress.includes('@')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />Send
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/80 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="Auto Wizard" className="h-16 w-auto" />
              </div>
              <p className="text-white/50 text-sm">Your partner in finding the perfect vehicle.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><Link href="/services" className="hover:text-amber-400">Expert Consultation - $119</Link></li>
                <li><Link href="/services" className="hover:text-amber-400">Customization Support - $49</Link></li>
                <li><Link href="/services" className="hover:text-amber-400">Purchase Assistance - $79</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><Link href="/expertise" className="hover:text-amber-400">Our Expertise</Link></li>
                <li><Link href="/blog" className="hover:text-amber-400">Wizard's Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><Link href="/consultation" className="flex items-center gap-2 hover:text-amber-400"><Mail className="w-4 h-4 text-amber-400" />autowizardcompany@gmail.com</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-white/40 text-sm">© 2026 Auto Wizard. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
