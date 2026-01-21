"use client";

import React, { useState, useEffect } from 'react';
import { Car, Calendar, Users, Wrench, MapPin, ChevronRight, ChevronLeft, Check, ArrowLeft, Sparkles, Shield, CreditCard, Star, Phone, Mail, Clock, Zap, Heart, Target, Building2, CarFront, Gauge, Send, X, Eye, FileText, DollarSign, Award, TrendingUp, BookOpen, Calculator, RefreshCw, Briefcase, SkipForward } from 'lucide-react';

export default function AutoWizard() {
  const [currentPage, setCurrentPage] = useState('home');
  const [testStep, setTestStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [consultForm, setConsultForm] = useState<Record<string, any>>({ name: '', email: '', phone: '', dates: [], times: [], notes: '', services: [] });

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => { setIsAnimating(true); const t = setTimeout(() => setIsAnimating(false), 150); return () => clearTimeout(t); }, [testStep]);

  // 13-question test
  const allQuestions = [
    { id: 'passengers', question: 'How many passengers do you need to accommodate?', icon: '👥', type: 'single',
      options: [{ value: '1-2', label: '1-2 people' }, { value: '3-4', label: '3-4 people' }, { value: '5', label: '5 people' }, { value: '6+', label: '6 or more' }] },
    { id: 'primary-use', question: 'What is the PRIMARY purpose of this vehicle?', icon: '🎯', type: 'single',
      options: [{ value: 'commute', label: 'Daily commuting' }, { value: 'family', label: 'Family transportation' }, { value: 'work', label: 'Work vehicle (trades/construction/farm)' }, { value: 'adventure', label: 'Adventure & outdoor activities' }, { value: 'towing', label: 'Towing boats/campers/trailers' }, { value: 'fun', label: 'Weekend fun / performance' }] },
    { id: 'cargo-needs', question: 'What are your cargo/hauling needs?', icon: '📦', type: 'single',
      options: [{ value: 'minimal', label: 'Minimal - groceries, bags' }, { value: 'moderate', label: 'Moderate - sports gear, luggage' }, { value: 'large', label: 'Large items - furniture, equipment' }, { value: 'truck-bed', label: 'Need open truck bed for materials' }, { value: 'commercial', label: 'Commercial cargo/deliveries' }] },
    { id: 'towing', question: 'Do you need towing capability?', icon: '🚤', type: 'single',
      options: [{ value: 'none', label: 'No towing needed' }, { value: 'light', label: 'Light (under 5,000 lbs)' }, { value: 'heavy', label: 'Heavy (5,000-12,000 lbs)' }, { value: 'max', label: 'Maximum (12,000+ lbs)' }] },
    { id: 'terrain', question: 'What conditions do you drive in? (Select all)', icon: '🛣️', type: 'multiple',
      options: [{ value: 'city', label: 'City/urban' }, { value: 'highway', label: 'Highway' }, { value: 'snow', label: 'Snow/ice' }, { value: 'offroad', label: 'Off-road/trails' }, { value: 'worksite', label: 'Construction/farm sites' }] },
    { id: 'parking', question: 'What is your parking situation?', icon: '🅿️', type: 'single',
      options: [{ value: 'tight', label: 'Tight city spaces' }, { value: 'normal', label: 'Normal suburban' }, { value: 'spacious', label: 'Spacious/rural' }] },
    { id: 'powertrain', question: 'Powertrain preference?', icon: '⚡', type: 'single',
      options: [{ value: 'gas', label: 'Gasoline' }, { value: 'hybrid', label: 'Hybrid' }, { value: 'electric', label: 'Electric' }, { value: 'diesel', label: 'Diesel' }, { value: 'any', label: 'No preference' }] },
    { id: 'budget', question: 'What is your budget?', icon: '💰', type: 'single',
      options: [{ value: 'under-10k', label: 'Under $10,000' }, { value: '10k-20k', label: '$10,000 - $20,000' }, { value: '20k-30k', label: '$20,000 - $30,000' }, { value: '30k-40k', label: '$30,000 - $40,000' }, { value: '40k-50k', label: '$40,000 - $50,000' }, { value: '50k-75k', label: '$50,000 - $75,000' }, { value: '75k-100k', label: '$75,000 - $100,000' }, { value: '100k-200k', label: '$100,000 - $200,000' }, { value: '200k-400k', label: '$200,000 - $400,000' }, { value: '400k-plus', label: '$400,000+' }] },
    { id: 'driving-style', question: 'How would you describe your driving style?', icon: '🏎️', type: 'single',
      options: [{ value: 'relaxed', label: 'Relaxed & comfortable' }, { value: 'practical', label: 'Practical & efficient' }, { value: 'spirited', label: 'Spirited & fun' }, { value: 'performance', label: 'Performance-focused' }, { value: 'rugged', label: 'Rugged & tough' }] },
    { id: 'important-features', question: 'What features matter most to you? (Select up to 3)', icon: '✨', type: 'multiple', maxSelect: 3,
      options: [{ value: 'luxury', label: 'Luxury & premium materials' }, { value: 'all-terrain', label: 'All-terrain capability' }, { value: 'comfort', label: 'Comfort & smooth ride' }, { value: 'power', label: 'Power & engine sound' }, { value: 'technology', label: 'Technology & infotainment' }, { value: 'fuel-efficiency', label: 'Fuel efficiency' }, { value: 'safety', label: 'Advanced safety features' }, { value: 'cargo', label: 'Cargo space & versatility' }, { value: 'towing-capability', label: 'Towing & hauling capability' }, { value: 'off-road', label: 'Off-road performance' }] },
    { id: 'priorities', question: 'Top priorities? (Select up to 3)', icon: '⭐', type: 'multiple', maxSelect: 3,
      options: [{ value: 'reliability', label: 'Reliability' }, { value: 'fuel-economy', label: 'Fuel economy' }, { value: 'safety', label: 'Safety' }, { value: 'comfort', label: 'Comfort' }, { value: 'performance', label: 'Performance' }, { value: 'capability', label: 'Capability (tow/haul)' }, { value: 'luxury', label: 'Luxury' }, { value: 'value', label: 'Value for money' }, { value: 'style', label: 'Style/looks' }] },
    { id: 'brand', question: 'Brand preference?', icon: '🏷️', type: 'single',
      options: [{ value: 'domestic', label: 'American (Ford, Chevy, Ram)' }, { value: 'japanese', label: 'Japanese (Toyota, Honda)' }, { value: 'european', label: 'European (BMW, Mercedes)' }, { value: 'luxury', label: 'Luxury brands' }, { value: 'any', label: 'No preference' }] },
    { id: 'body-style', question: 'Body style preferences? (Select all that interest you)', icon: '🚗', type: 'multiple',
      options: [{ value: 'any', label: 'No preference - recommend best fit' }, { value: 'small', label: 'Small car / hatchback' }, { value: 'sedan', label: 'Sedan' }, { value: 'suv', label: 'SUV / Crossover' }, { value: 'truck', label: 'Pickup truck' }, { value: 'van', label: 'Van / Minivan' }, { value: 'sports', label: 'Sports car / Coupe' }, { value: 'convertible', label: 'Convertible' }] }
  ];

  const vehicleSizeNames = { micro: 'Micro / City Car', hatchback: 'Hatchback', crossover: 'Compact Crossover', sedan: 'Sedan', coupe: 'Coupe', midsizeSuv: 'Midsize SUV', suv: 'Full-Size SUV', midsizeTruck: 'Midsize Truck', truck: 'Full-Size Truck', minivan: 'Minivan', van: 'Full-Size Van', wagon: 'Wagon', sport: 'Sports Car', roadster: 'Roadster', hyper: 'Supercar / Hypercar', muscle: 'Muscle Car' };
  const getArr = (val: any): any[] => Array.isArray(val) ? val : (val ? [val] : []);

  const calculateRecommendation = () => {
    const scores = { micro: 0, hatchback: 0, crossover: 0, sedan: 0, coupe: 0, midsizeSuv: 0, suv: 0, midsizeTruck: 0, truck: 0, minivan: 0, van: 0, wagon: 0, sport: 0, roadster: 0, hyper: 0, muscle: 0 };
    
    const p = answers.passengers;
    if (p === '1-2') { scores.micro += 8; scores.hatchback += 7; scores.coupe += 8; scores.sport += 9; scores.roadster += 10; scores.muscle += 8; scores.sedan += 5; scores.midsizeTruck += 5; }
    else if (p === '3-4') { scores.sedan += 8; scores.hatchback += 6; scores.crossover += 7; scores.midsizeSuv += 7; scores.wagon += 7; scores.midsizeTruck += 6; scores.truck += 5; scores.muscle += 5; }
    else if (p === '5') { scores.midsizeSuv += 8; scores.suv += 7; scores.wagon += 6; scores.minivan += 7; scores.truck += 5; }
    else if (p === '6+') { scores.suv += 10; scores.minivan += 10; scores.van += 8; }

    const use = answers['primary-use'];
    if (use === 'commute') { scores.micro += 8; scores.hatchback += 8; scores.sedan += 9; scores.crossover += 7; scores.wagon += 6; }
    else if (use === 'family') { scores.midsizeSuv += 9; scores.suv += 8; scores.minivan += 10; scores.crossover += 6; scores.wagon += 6; }
    else if (use === 'work') { scores.truck += 15; scores.van += 10; scores.midsizeTruck += 6; scores.suv += 4; }
    else if (use === 'adventure') { scores.midsizeTruck += 12; scores.suv += 9; scores.midsizeSuv += 7; scores.truck += 5; scores.wagon += 5; }
    else if (use === 'towing') { scores.truck += 14; scores.suv += 8; scores.midsizeTruck += 4; }
    else if (use === 'fun') { scores.sport += 10; scores.roadster += 10; scores.muscle += 9; scores.coupe += 8; scores.hyper += 7; }

    const cargo = answers['cargo-needs'];
    if (cargo === 'minimal') { scores.micro += 5; scores.coupe += 5; scores.sport += 5; scores.roadster += 5; scores.sedan += 4; }
    else if (cargo === 'moderate') { scores.midsizeSuv += 5; scores.wagon += 6; scores.crossover += 5; scores.hatchback += 5; scores.midsizeTruck += 4; }
    else if (cargo === 'large') { scores.suv += 6; scores.minivan += 7; scores.midsizeTruck += 6; scores.truck += 5; scores.van += 6; }
    else if (cargo === 'truck-bed') { scores.truck += 8; scores.midsizeTruck += 10; scores.micro = 0; scores.sedan = 0; scores.coupe = 0; scores.sport = 0; scores.roadster = 0; scores.hyper = 0; }
    else if (cargo === 'commercial') { scores.van += 12; scores.truck += 10; scores.midsizeTruck += 3; }

    const tow = answers.towing;
    if (tow === 'light') { scores.midsizeTruck += 6; scores.suv += 5; scores.midsizeSuv += 4; scores.truck += 3; }
    else if (tow === 'heavy') { scores.truck += 12; scores.suv += 6; scores.midsizeTruck += 2; scores.micro = 0; scores.hatchback = 0; scores.sedan = 0; scores.coupe = 0; scores.sport = 0; scores.roadster = 0; }
    else if (tow === 'max') { scores.truck += 18; scores.micro = 0; scores.hatchback = 0; scores.sedan = 0; scores.coupe = 0; scores.crossover = 0; scores.midsizeSuv = 0; scores.sport = 0; scores.roadster = 0; scores.hyper = 0; scores.muscle = 0; scores.minivan = 0; scores.wagon = 0; scores.midsizeTruck = 0; }

    const terrain = getArr(answers.terrain);
    if (terrain.includes('city')) { scores.micro += 4; scores.hatchback += 4; scores.sedan += 3; }
    if (terrain.includes('offroad')) { scores.midsizeTruck += 10; scores.suv += 8; scores.midsizeSuv += 5; scores.truck += 4; scores.micro = 0; scores.sedan -= 3; scores.sport -= 3; }
    if (terrain.includes('worksite')) { scores.truck += 10; scores.midsizeTruck += 5; scores.van += 5; }
    if (terrain.includes('snow')) { scores.suv += 4; scores.midsizeSuv += 4; scores.crossover += 4; scores.wagon += 4; scores.midsizeTruck += 3; scores.roadster -= 2; }

    const park = answers.parking;
    if (park === 'tight') { scores.micro += 10; scores.hatchback += 6; scores.sedan += 4; scores.coupe += 5; scores.truck -= 5; scores.suv -= 3; scores.van -= 5; scores.midsizeTruck += 2; }
    else if (park === 'spacious') { scores.truck += 3; scores.suv += 3; scores.van += 3; }

    const style = answers['driving-style'];
    if (style === 'performance') { scores.sport += 10; scores.hyper += 10; scores.muscle += 8; scores.roadster += 7; scores.coupe += 5; }
    else if (style === 'spirited') { scores.sport += 6; scores.muscle += 6; scores.coupe += 5; scores.hatchback += 4; scores.roadster += 5; }
    else if (style === 'rugged') { scores.midsizeTruck += 8; scores.truck += 7; scores.suv += 8; }
    else if (style === 'relaxed') { scores.sedan += 5; scores.midsizeSuv += 4; scores.suv += 4; scores.minivan += 5; scores.wagon += 4; }
    else if (style === 'practical') { scores.hatchback += 5; scores.crossover += 5; scores.sedan += 4; scores.wagon += 5; scores.midsizeTruck += 4; }

    // Important features scoring
    const importantFeatures = getArr(answers['important-features']);
    if (importantFeatures.includes('luxury')) { scores.sedan += 5; scores.suv += 5; scores.coupe += 4; scores.hyper += 6; scores.roadster += 3; }
    if (importantFeatures.includes('all-terrain')) { scores.midsizeTruck += 8; scores.suv += 8; scores.truck += 6; scores.midsizeSuv += 5; scores.crossover += 3; scores.micro -= 3; scores.sedan -= 2; scores.sport -= 3; }
    if (importantFeatures.includes('comfort')) { scores.sedan += 6; scores.suv += 5; scores.midsizeSuv += 5; scores.minivan += 5; scores.wagon += 4; scores.crossover += 3; }
    if (importantFeatures.includes('power')) { scores.muscle += 10; scores.sport += 9; scores.hyper += 10; scores.truck += 6; scores.coupe += 5; scores.roadster += 5; scores.micro -= 3; scores.hatchback -= 2; }
    if (importantFeatures.includes('technology')) { scores.sedan += 4; scores.crossover += 4; scores.midsizeSuv += 4; scores.suv += 4; scores.hyper += 3; }
    if (importantFeatures.includes('fuel-efficiency')) { scores.micro += 8; scores.hatchback += 7; scores.sedan += 5; scores.crossover += 4; scores.truck -= 4; scores.suv -= 3; scores.muscle -= 3; }
    if (importantFeatures.includes('safety')) { scores.midsizeSuv += 5; scores.suv += 5; scores.sedan += 4; scores.crossover += 4; scores.minivan += 4; }
    if (importantFeatures.includes('cargo')) { scores.suv += 6; scores.minivan += 7; scores.wagon += 6; scores.midsizeSuv += 5; scores.midsizeTruck += 5; scores.van += 6; scores.coupe -= 3; scores.sport -= 3; scores.roadster -= 3; }
    if (importantFeatures.includes('towing-capability')) { scores.truck += 10; scores.suv += 7; scores.midsizeTruck += 5; scores.micro = 0; scores.hatchback -= 2; scores.sedan -= 2; scores.coupe -= 2; scores.sport -= 3; }
    if (importantFeatures.includes('off-road')) { scores.midsizeTruck += 10; scores.suv += 9; scores.truck += 7; scores.midsizeSuv += 4; scores.micro = 0; scores.sedan -= 3; scores.coupe -= 3; scores.sport -= 3; scores.roadster -= 3; }

    const priorities = getArr(answers.priorities);
    if (priorities.includes('capability')) { if (use === 'work' || tow === 'heavy' || tow === 'max') { scores.truck += 8; scores.suv += 5; } else { scores.midsizeTruck += 7; scores.suv += 6; scores.truck += 4; } }
    if (priorities.includes('performance')) { scores.sport += 7; scores.muscle += 6; scores.hyper += 7; scores.coupe += 4; }
    if (priorities.includes('fuel-economy')) { scores.micro += 6; scores.hatchback += 5; scores.sedan += 4; scores.crossover += 3; scores.truck -= 3; scores.suv -= 2; scores.midsizeTruck += 2; }
    if (priorities.includes('comfort')) { scores.sedan += 4; scores.suv += 4; scores.minivan += 4; scores.wagon += 3; scores.truck += 2; }
    if (priorities.includes('luxury')) { scores.sedan += 3; scores.suv += 3; scores.coupe += 3; scores.hyper += 4; }
    if (priorities.includes('style')) { scores.coupe += 4; scores.sport += 4; scores.muscle += 4; scores.roadster += 4; scores.hyper += 4; }

    const bodyPref = getArr(answers['body-style']);
    if (!bodyPref.includes('any') && bodyPref.length > 0) {
      if (bodyPref.includes('small')) { scores.micro += 8; scores.hatchback += 8; }
      if (bodyPref.includes('sedan')) { scores.sedan += 8; }
      if (bodyPref.includes('suv')) { scores.crossover += 6; scores.midsizeSuv += 7; scores.suv += 8; }
      if (bodyPref.includes('truck')) { if (use === 'work' || tow === 'heavy' || tow === 'max' || cargo === 'commercial') { scores.truck += 10; scores.midsizeTruck += 4; } else { scores.midsizeTruck += 10; scores.truck += 5; } }
      if (bodyPref.includes('van')) { scores.minivan += 7; scores.van += 8; }
      if (bodyPref.includes('sports')) { scores.sport += 8; scores.coupe += 7; scores.muscle += 6; scores.hyper += 6; }
      if (bodyPref.includes('convertible')) { scores.roadster += 10; scores.muscle += 3; }
    }

    const budget = answers.budget;
    const bLvl = { 'under-10k': 1, '10k-20k': 2, '20k-30k': 3, '30k-40k': 4, '40k-50k': 5, '50k-75k': 6, '75k-100k': 7, '100k-200k': 8, '200k-400k': 9, '400k-plus': 10 }[budget] || 4;
    if (bLvl < 8) { scores.hyper = 0; }
    if (bLvl < 5) { scores.sport = Math.min(scores.sport, 5); }

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return generateModels(sorted[0][0]);
  };

  const generateModels = (vType) => {
    const budget = answers.budget;
    const priorities = getArr(answers.priorities);
    const terrain = getArr(answers.terrain);
    const towing = answers.towing;
    const use = answers['primary-use'];
    const cargo = answers['cargo-needs'];
    const brand = answers.brand;
    const importantFeatures = getArr(answers['important-features']);
    
    let vehicles = [], description = '', features = [], reasoning = [];
    const bLvl = { 'under-10k': 1, '10k-20k': 2, '20k-30k': 3, '30k-40k': 4, '40k-50k': 5, '50k-75k': 6, '75k-100k': 7, '100k-200k': 8, '200k-400k': 9, '400k-plus': 10 }[budget] || 4;
    const needsOffroad = terrain.includes('offroad');
    const isWork = use === 'work';

    switch(vType) {
      case 'micro': vehicles = bLvl <= 2 ? ['Chevrolet Spark', 'Mitsubishi Mirage', 'Nissan Versa'] : ['Mini Cooper', 'Fiat 500']; description = 'Perfect for city driving with excellent fuel efficiency.'; features = ['Great MPG', 'Easy parking', 'Low costs', 'Nimble']; reasoning.push('Ideal for urban commuting'); break;
      case 'hatchback': vehicles = bLvl <= 3 ? ['Honda Civic', 'Mazda3', 'Toyota Corolla'] : bLvl <= 5 ? ['Volkswagen Golf', 'Honda Civic', 'Mazda3'] : ['Volkswagen Golf', 'Mercedes-Benz A-Class']; description = 'Versatile hatchbacks with great cargo flexibility.'; features = ['Flexible cargo', 'Fun to drive', 'Good MPG', 'Practical']; reasoning.push('Great balance of fun and practicality'); break;
      case 'crossover': vehicles = priorities.includes('reliability') ? ['Toyota Corolla Cross', 'Honda HR-V', 'Mazda CX-30'] : bLvl >= 6 ? ['BMW X1', 'Audi Q3', 'Volvo XC40'] : ['Mazda CX-30', 'Hyundai Kona', 'Kia Seltos', 'Subaru Crosstrek']; description = 'Compact crossovers with SUV versatility.'; features = ['Elevated seating', 'Available AWD', 'Versatile', 'Easy to maneuver']; reasoning.push('SUV capability in compact size'); break;
      case 'sedan': vehicles = priorities.includes('reliability') ? (bLvl <= 3 ? ['Honda Civic', 'Toyota Camry', 'Mazda3'] : ['Lexus ES', 'Toyota Camry']) : bLvl >= 7 ? ['BMW 5 Series', 'Mercedes-Benz E-Class', 'Genesis G80'] : bLvl >= 5 ? ['BMW 3 Series', 'Mercedes-Benz C-Class', 'Genesis G70'] : ['Honda Accord', 'Toyota Camry', 'Hyundai Sonata']; description = 'Comfortable sedans for daily driving.'; features = ['Comfortable', 'Good MPG', 'Refined', 'Practical trunk']; reasoning.push('Excellent for commuting'); break;
      case 'coupe': vehicles = bLvl <= 3 ? ['Hyundai Elantra', 'Subaru BRZ', 'Toyota GR86'] : bLvl <= 5 ? ['BMW 2 Series', 'Audi A5', 'Infiniti Q60'] : ['BMW 4 Series', 'Lexus RC']; description = 'Sporty coupes with style.'; features = ['Sporty design', 'Great handling', 'Premium feel', 'Performance']; reasoning.push('Style and sport combined'); break;
      case 'midsizeSuv': vehicles = needsOffroad ? ['Mazda CX-50', 'Subaru Forester', 'Toyota RAV4'] : priorities.includes('reliability') ? ['Toyota RAV4', 'Honda CR-V', 'Mazda CX-5'] : bLvl >= 6 ? ['BMW X3', 'Mercedes-Benz GLC', 'Porsche Macan'] : ['Honda CR-V', 'Toyota RAV4', 'Mazda CX-5', 'Hyundai Tucson']; description = 'Versatile midsize SUVs.'; features = ['Flexible cargo', 'Available AWD', 'Comfortable', 'Family-friendly']; reasoning.push('Versatile for families'); break;
      case 'suv': vehicles = needsOffroad ? ['Jeep Wrangler', 'Ford Bronco', 'Toyota 4Runner', 'Land Rover Defender'] : bLvl >= 8 ? ['Cadillac Escalade', 'Lincoln Navigator', 'BMW X7', 'Range Rover'] : bLvl >= 6 ? ['BMW X5', 'Mercedes-Benz GLE', 'Audi Q7'] : ['Toyota Highlander', 'Honda Pilot', 'Ford Explorer', 'Kia Telluride']; description = 'Full-size SUVs with maximum space.'; features = ['3-row seating', 'Strong towing', 'Commanding presence', 'Premium space']; reasoning.push('Maximum space and capability'); break;
      case 'midsizeTruck': vehicles = needsOffroad ? ['Toyota Tacoma', 'Jeep Gladiator', 'Chevrolet Colorado', 'Ford Ranger'] : bLvl <= 3 ? ['Ford Maverick', 'Hyundai Santa Cruz', 'Nissan Frontier'] : brand === 'japanese' ? ['Toyota Tacoma', 'Honda Ridgeline', 'Nissan Frontier'] : ['Ford Ranger', 'Chevrolet Colorado', 'GMC Canyon', 'Jeep Gladiator']; description = 'Midsize trucks offer excellent capability with better maneuverability and fuel economy than full-size trucks. Ideal for off-roading, outdoor adventures, and everyday hauling.'; features = ['Versatile bed', 'Better fuel economy', 'Easier to park', 'Great off-road capability', '4WD available']; reasoning.push('Right-sized for most truck needs'); reasoning.push('More maneuverable than full-size'); if (needsOffroad) reasoning.push('Excellent off-road capability'); break;
      case 'truck': const needsHD = towing === 'max'; vehicles = needsHD ? ['Ford F-250', 'Ram 2500', 'Chevrolet Silverado 2500'] : bLvl >= 7 ? ['Ram 1500', 'Ford F-150', 'GMC Sierra'] : isWork ? ['Ford F-150', 'Ram 1500', 'Chevrolet Silverado'] : brand === 'japanese' ? ['Toyota Tundra', 'Nissan Titan'] : ['Ford F-150', 'Ram 1500', 'Chevrolet Silverado', 'Toyota Tundra']; description = needsHD ? 'Heavy-duty trucks for maximum towing and payload. Built for serious work demands.' : 'Full-size trucks deliver maximum towing capacity, payload, and power. Best for work use, heavy towing, or when you need the most capability.'; features = needsHD ? ['Max towing capacity', 'Heavy payload', 'Diesel available', 'Built for work'] : ['Strong towing (10,000+ lbs)', 'Large payload capacity', 'Spacious cab', 'V8 power available']; reasoning.push(needsHD ? 'Heavy-duty capability required' : 'Full-size power and capability needed'); if (isWork) reasoning.push('Built for work demands'); if (towing === 'heavy' || towing === 'max') reasoning.push('Heavy towing requirement'); if (importantFeatures.includes('power')) reasoning.push('Power and engine sound priority'); break;
      case 'minivan': vehicles = ['Honda Odyssey', 'Toyota Sienna', 'Kia Carnival', 'Chrysler Pacifica']; description = 'Family-focused minivans.'; features = ['Sliding doors', 'Flat-folding seats', 'Maximum interior', 'Family features']; reasoning.push('Ultimate family vehicle'); break;
      case 'van': vehicles = isWork ? ['Ford Transit', 'Mercedes-Benz Sprinter', 'Ram ProMaster'] : ['Ford Transit', 'Mercedes-Benz Sprinter']; description = 'Full-size cargo vans.'; features = ['Maximum cargo', 'Standing height', 'Commercial ready']; reasoning.push('Maximum cargo capacity'); break;
      case 'wagon': vehicles = bLvl >= 6 ? ['Porsche Taycan', 'Audi A6 Allroad', 'Mercedes-Benz E-Class'] : ['Subaru Outback', 'Volvo V60']; description = 'Wagons: sedan driving, SUV cargo.'; features = ['Low center of gravity', 'Great cargo', 'Car handling', 'AWD available']; reasoning.push('Best of both worlds'); break;
      case 'sport': vehicles = bLvl >= 8 ? ['Porsche 911', 'BMW M4', 'Mercedes-AMG GT', 'Audi R8'] : bLvl >= 6 ? ['Porsche 718 Cayman', 'BMW M2', 'Toyota GR Supra', 'Chevrolet Corvette'] : ['Toyota GR86', 'Subaru BRZ', 'Mazda MX-5 Miata', 'Nissan Z']; description = 'Pure driving excitement.'; features = ['Sharp handling', 'Engaging drive', 'Performance focused']; reasoning.push('Pure driving joy'); if (importantFeatures.includes('power')) reasoning.push('Power and engine sound priority'); break;
      case 'roadster': vehicles = bLvl >= 8 ? ['Porsche 911', 'Mercedes-AMG SL', 'BMW M4'] : bLvl >= 6 ? ['Porsche 718 Boxster', 'BMW Z4', 'Jaguar F-Type'] : ['Mazda MX-5 Miata', 'Ford Mustang']; description = 'Open-air driving experience.'; features = ['Convertible top', 'Great handling', 'Head-turning']; reasoning.push('Open-air thrills'); break;
      case 'hyper': vehicles = bLvl >= 9 ? ['Bugatti Chiron', 'Rimac Nevera', 'Ferrari SF90', 'McLaren 765LT'] : ['McLaren 720S', 'Ferrari 296', 'Lamborghini Huracán', 'Porsche 911 Turbo S']; description = 'Pinnacle of performance.'; features = ['Extreme performance', 'Exotic engineering', 'Exclusive']; reasoning.push('Ultimate automotive experience'); if (importantFeatures.includes('power')) reasoning.push('Maximum power and engine sound'); break;
      case 'muscle': vehicles = bLvl >= 6 ? ['Ford Mustang', 'Dodge Challenger', 'Chevrolet Camaro'] : bLvl >= 4 ? ['Ford Mustang', 'Dodge Challenger', 'Chevrolet Camaro'] : ['Ford Mustang', 'Dodge Challenger', 'Chevrolet Camaro']; description = 'American muscle power.'; features = ['V8 power', 'Iconic styling', 'Rear-wheel drive', 'Affordable performance']; reasoning.push('Classic American muscle'); if (importantFeatures.includes('power')) reasoning.push('Power and engine sound priority'); break;
      default: vehicles = ['Honda Accord', 'Toyota Camry', 'Honda CR-V', 'Toyota RAV4']; description = 'Reliable vehicles with great value.'; features = ['Reliability', 'Good MPG', 'Versatile'];
    }
    
    // Add feature-based reasoning
    if (importantFeatures.includes('luxury')) reasoning.push('Luxury features prioritized');
    if (importantFeatures.includes('all-terrain')) reasoning.push('All-terrain capability important');
    if (importantFeatures.includes('comfort')) reasoning.push('Comfort and smooth ride valued');
    if (importantFeatures.includes('off-road')) reasoning.push('Off-road performance needed');
    
    reasoning.push('Budget: ' + budget);
    return { vehicleType: vType, vehicleSizeName: vehicleSizeNames[vType], vehicles: vehicles.slice(0, 5), description, features, reasoning, answers: { ...answers }, timestamp: new Date().toISOString() };
  };

  const saveResult = (r) => { const d = { ...r, id: Date.now().toString(), savedAt: new Date().toISOString() }; const e = JSON.parse(localStorage.getItem('autoWizardResults') || '[]'); e.push(d); localStorage.setItem('autoWizardResults', JSON.stringify(e)); };
  const sendEmail = () => { setTimeout(() => { setEmailSent(true); setTimeout(() => { setShowEmailModal(false); setEmailSent(false); setEmailAddress(''); }, 2000); }, 1000); };
  const handleAnswer = (qId, val) => { setAnswers({ ...answers, [qId]: val }); if (testStep < allQuestions.length - 1) setTestStep(testStep + 1); else { const r = calculateRecommendation(); setResult(r); saveResult(r); } };
  const handleMultiSelect = (qId: string, val: string, maxSelect?: number) => { const current = getArr(answers[qId]); let newVal; if (current.includes(val)) { newVal = current.filter((v: string) => v !== val); } else { if (maxSelect && current.length >= maxSelect) { newVal = [...current.slice(1), val]; } else { newVal = [...current, val]; } } setAnswers({ ...answers, [qId]: newVal }); };
  const skipQuestion = () => { if (testStep < allQuestions.length - 1) setTestStep(testStep + 1); else { const r = calculateRecommendation(); setResult(r); saveResult(r); } };
  const resetTest = () => { setTestStep(0); setAnswers({}); setResult(null); };
  
  const toggleService = (val) => {
    const current = consultForm.services || [];
    if (current.includes(val)) {
      setConsultForm({ ...consultForm, services: current.filter((v: any) => v !== val) });
    } else {
      setConsultForm({ ...consultForm, services: [...current, val] });
    }
  };
  
  const toggleTime = (val) => {
    const current = consultForm.times || [];
    if (current.includes(val)) {
      setConsultForm({ ...consultForm, times: current.filter((v: any) => v !== val) });
    } else {
      setConsultForm({ ...consultForm, times: [...current, val] });
    }
  };
  
  const addDate = (date) => {
    if (!date) return;
    const current = consultForm.dates || [];
    if (!current.includes(date)) {
      setConsultForm({ ...consultForm, dates: [...current, date] });
    }
  };
  
  const removeDate = (date) => {
    const current = consultForm.dates || [];
    setConsultForm({ ...consultForm, dates: current.filter((d: any) => d !== date) });
  };
  
  const handleConsult = () => { 
    if (!consultForm.name || !consultForm.email || !consultForm.phone || consultForm.dates.length === 0 || consultForm.times.length === 0) { 
      alert('Please fill in all required fields'); 
      return; 
    } 
    alert('Thank you! We will contact you to confirm your appointment.'); 
    setConsultForm({ name: '', email: '', phone: '', dates: [], times: [], notes: '', services: [] }); 
    setCurrentPage('home'); 
  };
  
  const currentQ = allQuestions[testStep];
  const isMultiple = currentQ?.type === 'multiple';

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden"><div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px]" /><div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[100px]" /></div>

      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setCurrentPage('home')}>
            <div className="relative"><div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" /><div className="relative bg-gradient-to-br from-amber-400 to-amber-500 p-2.5 rounded-xl"><Sparkles className="w-6 h-6 text-black" /></div></div>
            <h1 className="text-2xl font-bold"><span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Auto</span><span className="text-white"> Wizard</span></h1>
          </div>
          <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            <button onClick={() => { setCurrentPage('test'); resetTest(); }} className="px-4 py-2 rounded-lg text-white/70 hover:text-amber-400 hover:bg-white/5 transition-all">Take Test</button>
            <button onClick={() => setCurrentPage('services')} className="px-4 py-2 rounded-lg text-white/70 hover:text-amber-400 hover:bg-white/5 transition-all">Services</button>
            <button onClick={() => setCurrentPage('expertise')} className="px-4 py-2 rounded-lg text-white/70 hover:text-amber-400 hover:bg-white/5 transition-all">Our Expertise</button>
          </nav>
          <button onClick={() => setCurrentPage('consultation')} className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25">Book Consultation</button>
        </div>
      </header>

      {showEmailModal && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-md w-full"><div className="flex justify-between items-center mb-6"><h3 className="text-xl font-semibold">Email Results</h3><button onClick={() => setShowEmailModal(false)} className="text-white/50 hover:text-white"><X className="w-5 h-5" /></button></div>{emailSent ? <div className="text-center py-8"><div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-amber-400" /></div><p className="text-lg text-white">Sent!</p></div> : <><input type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} placeholder="Enter your email" className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white mb-4 focus:outline-none focus:border-amber-500" /><button onClick={sendEmail} disabled={!emailAddress.includes('@')} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold disabled:opacity-50 flex items-center justify-center gap-2"><Send className="w-4 h-4" />Send</button></>}</div></div>}

      {currentPage === 'home' && (
        <div className="relative">
          <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
            <div className="relative text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-8"><Sparkles className="w-4 h-4 text-amber-400" />Quick & Accurate Vehicle Matching</div>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight"><span className="text-white">Find Your </span><span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Perfect</span><br /><span className="text-white">Vehicle</span></h2>
              <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">Our quick {allQuestions.length}-question assessment analyzes your needs to recommend from 16 vehicle categories.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => { setCurrentPage('test'); resetTest(); }} className="group px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-lg font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-2xl shadow-amber-500/30 hover:scale-105"><span className="flex items-center justify-center gap-2">Start Your Free Assessment<ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span></button>
                <button onClick={() => setCurrentPage('consultation')} className="px-8 py-4 rounded-xl border border-white/20 text-white hover:border-amber-500/50 hover:text-amber-400 transition-all">Contact One of Our Experts</button>
              </div>
            </div>
            <div className="relative mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[{ value: allQuestions.length.toString(), label: 'Questions', icon: Target }, { value: '16', label: 'Categories', icon: CarFront }, { value: '200+', label: 'Models', icon: Gauge }, { value: '100%', label: 'Free', icon: Heart }].map((s, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/20 transition-all">
                  <s.icon className="w-6 h-6 text-amber-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
                  <div className="text-sm text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-5xl mx-auto px-6 py-16">
            <div className="space-y-4">
              {[
                { icon: Car, title: 'Advanced Matching', desc: 'Sophisticated algorithm analyzes 20+ factors for precise recommendations' },
                { icon: Users, title: 'Expert Consultation', desc: 'Schedule one-on-one sessions with automotive specialists' },
                { icon: Wrench, title: 'Aftermarket Support', desc: 'Connect with trusted customization and accessory providers' },
                { icon: MapPin, title: 'Dealership Network', desc: 'Direct connections to dealerships, financing, and sales' }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-amber-500/30 transition-all">
                  <item.icon className="w-10 h-10 text-amber-400 mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Comprehensive Services</h2>
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
                <h3 className="text-xl font-semibold text-amber-400 mb-6">Consultation Services</h3>
                <ul className="space-y-4">
                  {['In-depth lifestyle analysis', 'Budget and financing guidance', 'Feature comparison and recommendations'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80"><Check className="w-5 h-5 text-amber-400 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
                <h3 className="text-xl font-semibold text-amber-400 mb-6">Customization Support</h3>
                <ul className="space-y-4">
                  {['Aftermarket product recommendations', 'Trusted installer network', 'Style and functionality planning'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80"><Check className="w-5 h-5 text-amber-400 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
                <h3 className="text-xl font-semibold text-amber-400 mb-6">Purchase Assistance</h3>
                <ul className="space-y-4">
                  {['Dealership connections', 'Financing and loan office referrals', 'Certified pre-owned options'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80"><Check className="w-5 h-5 text-amber-400 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}

      {currentPage === 'services' && (
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Comprehensive automotive guidance from selection to ownership</p>
          </div>
          
          <div className="space-y-6">
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0"><Users className="w-6 h-6 text-amber-400" /></div>
                <div><h3 className="text-xl font-semibold text-amber-400 mb-2">Expert Consultation</h3><p className="text-white/60">One-on-one sessions with certified automotive specialists</p></div>
              </div>
              <ul className="space-y-3 mb-6">
                {['In-depth lifestyle and needs analysis', 'Personalized vehicle recommendations', 'Budget optimization strategies', 'Feature comparison and prioritization', 'Customization with trim and options'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80"><Check className="w-5 h-5 text-amber-400 flex-shrink-0" />{item}</li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-amber-400 font-semibold text-lg">$79 / session</span>
                <button onClick={() => setCurrentPage('consultation')} className="px-6 py-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all">Book Now</button>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0"><Wrench className="w-6 h-6 text-amber-400" /></div>
                <div><h3 className="text-xl font-semibold text-amber-400 mb-2">Customization Support</h3><p className="text-white/60">Personalize your vehicle with expert guidance</p></div>
              </div>
              <ul className="space-y-3 mb-6">
                {['Aftermarket product recommendations', 'Trusted installer network access', 'Performance upgrade planning', 'Aesthetic customization guidance', 'Warranty-safe modification advice'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80"><Check className="w-5 h-5 text-amber-400 flex-shrink-0" />{item}</li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-amber-400 font-semibold text-lg">$49 / consultation</span>
                <button onClick={() => setCurrentPage('consultation')} className="px-6 py-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all">Get Started</button>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0"><Briefcase className="w-6 h-6 text-amber-400" /></div>
                <div><h3 className="text-xl font-semibold text-amber-400 mb-2">Purchase Assistance</h3><p className="text-white/60">Navigate the buying process with confidence</p></div>
              </div>
              <ul className="space-y-3 mb-6">
                {['Dealership introductions and connections', 'Financing and loan office referrals', 'Price negotiation strategies', 'Certified pre-owned verification', 'Paperwork and documentation guidance'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80"><Check className="w-5 h-5 text-amber-400 flex-shrink-0" />{item}</li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-amber-400 font-semibold text-lg">$119 / package</span>
                <button onClick={() => setCurrentPage('consultation')} className="px-6 py-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'expertise' && (
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Expertise</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Helpful guides and tools for your car buying journey</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: BookOpen, title: 'Buying Guide', desc: 'Complete guide to navigating the car buying process', items: ['New vs. used comparison', 'Timing your purchase', 'Inspection checklist', 'Negotiation tips'] },
              { icon: Calculator, title: 'Financing Options', desc: 'Understanding loans, leases, and payments', items: ['Loan vs. lease calculator', 'Credit score impact', 'Down payment strategies', 'Interest rate comparison'] },
              { icon: RefreshCw, title: 'Trade-In Values', desc: 'Maximize the value of your current vehicle', items: ['Value estimation tools', 'Preparation tips', 'Timing strategies', 'Negotiation tactics'] },
              { icon: Shield, title: 'Warranty & Protection', desc: 'Understanding coverage options', items: ['Factory warranty details', 'Extended warranty options', 'GAP insurance explained', 'Maintenance plans'] }
            ].map((resource, i) => (
              <div key={i} className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-amber-500/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4"><resource.icon className="w-6 h-6 text-amber-400" /></div>
                <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
                <p className="text-white/60 mb-4">{resource.desc}</p>
                <ul className="space-y-2">
                  {resource.items.map((item, j) => (<li key={j} className="flex items-center gap-2 text-white/70 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" />{item}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentPage === 'test' && !result && (
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
                  
                  {isMultiple ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-2">
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
                        <button onClick={() => { if (testStep < allQuestions.length - 1) setTestStep(testStep + 1); else { const r = calculateRecommendation(); setResult(r); saveResult(r); }}} disabled={getArr(answers[currentQ.id]).length === 0} className="flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">Continue <ChevronRight className="w-5 h-5" /></button>
                        <button onClick={skipQuestion} className="px-6 py-4 rounded-xl border border-white/20 text-white/60 hover:text-amber-400 hover:border-amber-500/50 transition-all flex items-center gap-2"><SkipForward className="w-5 h-5" />Skip</button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                        {currentQ.options.map((o, i) => (
                          <button key={i} onClick={() => handleAnswer(currentQ.id, o.value)} className="w-full text-left p-4 bg-black/30 border border-white/10 rounded-xl hover:border-amber-500/50 hover:bg-white/5 transition-all group">
                            <div className="flex items-center justify-between">
                              <span className="text-white/80 group-hover:text-white">{o.label}</span>
                              <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                            </div>
                          </button>
                        ))}
                      </div>
                      <button onClick={skipQuestion} className="w-full mt-4 py-3 rounded-xl border border-white/20 text-white/60 hover:text-amber-400 hover:border-amber-500/50 transition-all flex items-center justify-center gap-2"><SkipForward className="w-5 h-5" />Skip this question</button>
                    </div>
                  )}
                </>
              )}
              
              {testStep > 0 && <button onClick={() => setTestStep(testStep - 1)} className="mt-6 text-white/50 hover:text-amber-400 flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Back</button>}
            </div>
          </div>
        </div>
      )}

      {currentPage === 'test' && result && (
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
              <div className="flex flex-wrap justify-center gap-3">
                {result.vehicles.map((v, i) => (
                  <div key={i} className="px-5 py-3 rounded-xl bg-zinc-800 border border-white/10 text-white font-medium">{v}</div>
                ))}
              </div>
            </div>
            
            {result.reasoning.length > 0 && (
              <div className="bg-black/30 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4 text-amber-400 flex items-center gap-2"><Target className="w-5 h-5" />Why This Recommendation</h3>
                <ul className="space-y-2">{result.reasoning.map((r, i) => <li key={i} className="flex items-start gap-3 text-white/70"><Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />{r}</li>)}</ul>
              </div>
            )}
            
            <div className="bg-black/30 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-amber-400 flex items-center gap-2"><Star className="w-5 h-5" />Key Features</h3>
              <div className="grid md:grid-cols-2 gap-3">{result.features.map((f, i) => <div key={i} className="flex items-center gap-3 text-white/70"><div className="w-2 h-2 rounded-full bg-amber-400" />{f}</div>)}</div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowEmailModal(true)} className="px-6 py-3 rounded-xl border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 flex items-center justify-center gap-2"><Mail className="w-5 h-5" />Email</button>
              <button onClick={() => setCurrentPage('consultation')} className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20">Schedule Consultation</button>
              <button onClick={resetTest} className="px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:border-amber-500/50 hover:text-amber-400">Retake</button>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'consultation' && (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6"><Calendar className="w-8 h-8 text-amber-400" /></div>
              <h2 className="text-3xl font-bold text-white mb-3">Schedule Consultation</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3 text-white/70">Services (Select all that apply)</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { value: 'consultation', label: 'Expert Consultation - $79', icon: Car },
                    { value: 'customization', label: 'Customization Support - $49', icon: Wrench },
                    { value: 'purchase', label: 'Purchase Assistance - $119', icon: Briefcase },
                    { value: 'bundle', label: 'Full Bundle - $319', icon: Star }
                  ].map((s) => {
                    const selected = (consultForm.services || []).includes(s.value);
                    return (
                      <button key={s.value} onClick={() => toggleService(s.value)} className={`p-4 rounded-xl border transition-all text-left flex items-center gap-3 ${selected ? 'bg-amber-500/15 border-amber-500/60' : 'bg-black/30 border-white/10 hover:border-amber-500/40'}`}>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'bg-amber-500 border-amber-500' : 'border-white/30'}`}>{selected && <Check className="w-3 h-3 text-black" />}</div>
                        <s.icon className={`w-5 h-5 ${selected ? 'text-amber-400' : 'text-white/50'}`} />
                        <span className={selected ? 'text-amber-400' : 'text-white/70'}>{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium mb-2 text-white/70">Name *</label><input type="text" value={consultForm.name} onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })} className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500" /></div>
                <div><label className="block text-sm font-medium mb-2 text-white/70">Email *</label><input type="email" value={consultForm.email} onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })} className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500" /></div>
              </div>
              
              <div><label className="block text-sm font-medium mb-2 text-white/70">Phone *</label><input type="tel" value={consultForm.phone} onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })} className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500" /></div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-white/70">Preferred Date(s) *</label>
                <div className="flex gap-3 mb-3">
                  <input type="date" id="date-picker" className="flex-1 bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500" />
                  <button onClick={() => { const input = document.getElementById('date-picker') as HTMLInputElement; if (input) { addDate(input.value); input.value = ''; } }} className="px-4 py-3 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all">Add Date</button>
                </div>
                {consultForm.dates && consultForm.dates.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {consultForm.dates.map((date, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30">
                        <span className="text-amber-400 text-sm">{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        <button onClick={() => removeDate(date)} className="text-amber-400/60 hover:text-amber-400"><X className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-3 text-white/70">Preferred Time of Day *</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'morning', label: 'Morning', desc: '9 AM - 12 PM' },
                    { value: 'midday', label: 'Mid-Day', desc: '12 PM - 3 PM' },
                    { value: 'afternoon', label: 'Afternoon', desc: '3 PM - 6 PM' }
                  ].map((t) => {
                    const selected = (consultForm.times || []).includes(t.value);
                    return (
                      <button key={t.value} onClick={() => toggleTime(t.value)} className={`p-4 rounded-xl border transition-all text-center ${selected ? 'bg-amber-500/15 border-amber-500/60' : 'bg-black/30 border-white/10 hover:border-amber-500/40'}`}>
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'bg-amber-500 border-amber-500' : 'border-white/30'}`}>{selected && <Check className="w-2.5 h-2.5 text-black" />}</div>
                          <span className={`font-medium ${selected ? 'text-amber-400' : 'text-white/70'}`}>{t.label}</span>
                        </div>
                        <span className="text-xs text-white/50">{t.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div><label className="block text-sm font-medium mb-2 text-white/70">Notes</label><textarea value={consultForm.notes} onChange={(e) => setConsultForm({ ...consultForm, notes: e.target.value })} className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 h-24 resize-none" /></div>
              
              <button onClick={handleConsult} className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-lg font-semibold hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20">Schedule</button>
              
              <div className="pt-6 border-t border-white/10 flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 text-white/60"><Phone className="w-4 h-4 text-amber-400" />(413) 333-8401</div>
                <div className="flex items-center gap-2 text-white/60"><Mail className="w-4 h-4 text-amber-400" />autowizardcompany@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-white/10 bg-black/80 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-amber-400 to-amber-500 p-2 rounded-lg"><Sparkles className="w-5 h-5 text-black" /></div>
                <span className="font-bold text-lg">Auto Wizard</span>
              </div>
              <p className="text-white/50 text-sm">Your partner in finding the perfect vehicle.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li onClick={() => setCurrentPage('services')} className="hover:text-amber-400 cursor-pointer">Expert Consultation - $79</li>
                <li onClick={() => setCurrentPage('services')} className="hover:text-amber-400 cursor-pointer">Customization Support - $49</li>
                <li onClick={() => setCurrentPage('services')} className="hover:text-amber-400 cursor-pointer">Purchase Assistance - $119</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Our Expertise</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li onClick={() => setCurrentPage('expertise')} className="hover:text-amber-400 cursor-pointer">Buying Guide</li>
                <li onClick={() => setCurrentPage('expertise')} className="hover:text-amber-400 cursor-pointer">Financing Options</li>
                <li onClick={() => setCurrentPage('expertise')} className="hover:text-amber-400 cursor-pointer">Trade-In Values</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-400" />autowizardcompany@gmail.com</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-400" />(413) 333-8401</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-white/40 text-sm">© 2026 Auto Wizard. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
