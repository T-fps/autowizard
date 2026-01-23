"use client";

import React, { useState, useEffect } from 'react';
import { Car, Calendar, Users, Wrench, MapPin, ChevronRight, ChevronLeft, Check, ArrowLeft, ArrowRight, Sparkles, Shield, CreditCard, Star, Phone, Mail, Clock, Zap, Heart, Target, Building2, CarFront, Gauge, Send, X, Eye, FileText, DollarSign, Award, TrendingUp, BookOpen, Calculator, RefreshCw, Briefcase } from 'lucide-react';

export default function AutoWizard() {
  const [currentPage, setCurrentPage] = useState('home');
  const [testStep, setTestStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [showEmailCollection, setShowEmailCollection] = useState(false);
  const [consultForm, setConsultForm] = useState<Record<string, any>>({ name: '', email: '', phone: '', dates: [], times: [], notes: '', services: [] });
  const [canSkip, setCanSkip] = useState(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => { setIsAnimating(true); const t = setTimeout(() => setIsAnimating(false), 150); return () => clearTimeout(t); }, [testStep]);

  // Always allow Next button since all options are visible
  useEffect(() => {
    setCanSkip(true);
  }, [testStep]);

  // 23-question comprehensive assessment
  const allQuestions = [
    { id: 'passengers', question: 'How many passengers do you regularly need to accommodate?', icon: '👥', type: 'single',
      options: [{ value: '1-2', label: '1-2 people (just me or with a partner)' }, { value: '3-4', label: '3-4 people (small family/friends)' }, { value: '5', label: '5 people (family with kids)' }, { value: '6-7', label: '6-7 people (large family)' }, { value: '8+', label: '8+ people (extended family/groups)' }] },
    { id: 'primary-use', question: 'What is the PRIMARY purpose of this vehicle?', icon: '🎯', type: 'single',
      options: [{ value: 'commute', label: 'Daily commuting to work/school' }, { value: 'family', label: 'Family transportation & activities' }, { value: 'work', label: 'Work vehicle (trades/construction/farm)' }, { value: 'adventure', label: 'Adventure & outdoor activities' }, { value: 'towing', label: 'Towing boats/campers/trailers' }, { value: 'fun', label: 'Weekend fun / performance driving' }, { value: 'luxury', label: 'Luxury & status' }, { value: 'errands', label: 'General errands & around town' }] },
    { id: 'commute-distance', question: 'How many miles do you drive on a typical day?', icon: '📍', type: 'single',
      options: [{ value: 'minimal', label: 'Under 10 miles' }, { value: 'short', label: '10-25 miles' }, { value: 'medium', label: '25-50 miles' }, { value: 'long', label: '50-100 miles' }, { value: 'very-long', label: 'Over 100 miles' }] },
    { id: 'driving-environment', question: 'Where do you do most of your driving?', icon: '🛣️', type: 'single',
      options: [{ value: 'city', label: 'Mostly city/urban streets' }, { value: 'suburban', label: 'Suburban neighborhoods' }, { value: 'highway', label: 'Mostly highway/interstate' }, { value: 'mixed', label: 'Mix of city and highway' }, { value: 'rural', label: 'Rural roads & countryside' }] },
    { id: 'weather', question: 'What weather conditions do you regularly drive in? (Select all)', icon: '🌦️', type: 'multiple',
      options: [{ value: 'sunny', label: 'Mostly sunny/dry climate' }, { value: 'rain', label: 'Frequent rain' }, { value: 'snow', label: 'Snow & ice in winter' }, { value: 'extreme-cold', label: 'Extreme cold (below 0°F)' }, { value: 'extreme-heat', label: 'Extreme heat (above 100°F)' }, { value: 'flooding', label: 'Occasional flooding' }] },
    { id: 'terrain', question: 'What road conditions do you encounter? (Select all)', icon: '⛰️', type: 'multiple',
      options: [{ value: 'paved', label: 'Paved roads only' }, { value: 'gravel', label: 'Gravel/dirt roads' }, { value: 'offroad', label: 'Off-road trails' }, { value: 'steep', label: 'Steep hills/mountains' }, { value: 'worksite', label: 'Construction/farm sites' }, { value: 'beach', label: 'Beach/sand driving' }] },
    { id: 'cargo-needs', question: 'What are your typical cargo/hauling needs?', icon: '📦', type: 'single',
      options: [{ value: 'minimal', label: 'Minimal - groceries, bags, small items' }, { value: 'moderate', label: 'Moderate - sports gear, luggage, strollers' }, { value: 'large', label: 'Large items - furniture, appliances, bikes' }, { value: 'truck-bed', label: 'Need open truck bed for materials/equipment' }, { value: 'commercial', label: 'Commercial cargo/deliveries' }] },
    { id: 'activities', question: 'What activities do you need your vehicle to support? (Select all)', icon: '🏄', type: 'multiple',
      options: [{ value: 'none', label: 'No special activities' }, { value: 'camping', label: 'Camping & overlanding' }, { value: 'water-sports', label: 'Boating/kayaking/surfing' }, { value: 'winter-sports', label: 'Skiing/snowboarding' }, { value: 'biking', label: 'Mountain biking/cycling' }, { value: 'golf', label: 'Golf' }, { value: 'pets', label: 'Transporting pets' }, { value: 'kids-sports', label: 'Kids sports & activities' }, { value: 'home-improvement', label: 'Home improvement projects' }] },
    { id: 'towing', question: 'Do you need towing capability?', icon: '🚤', type: 'single',
      options: [{ value: 'none', label: 'No towing needed' }, { value: 'light', label: 'Light - small trailer/jet skis (under 3,500 lbs)' }, { value: 'medium', label: 'Medium - boat/small camper (3,500-7,000 lbs)' }, { value: 'heavy', label: 'Heavy - large boat/travel trailer (7,000-12,000 lbs)' }, { value: 'max', label: 'Maximum - 5th wheel/horse trailer (12,000+ lbs)' }] },
    { id: 'parking', question: 'What is your typical parking situation?', icon: '🅿️', type: 'single',
      options: [{ value: 'tight', label: 'Tight city spaces & parking garages' }, { value: 'street', label: 'Street parking in neighborhoods' }, { value: 'normal', label: 'Standard driveways & parking lots' }, { value: 'garage', label: 'Personal garage' }, { value: 'spacious', label: 'Large driveway or rural property' }] },
    { id: 'budget', question: 'What is your total budget for this vehicle?', icon: '💰', type: 'single',
      options: [{ value: 'under-25k', label: 'Under $25,000' }, { value: '25k-35k', label: '$25,000 - $35,000' }, { value: '35k-50k', label: '$35,000 - $50,000' }, { value: '50k-75k', label: '$50,000 - $75,000' }, { value: '75k-100k', label: '$75,000 - $100,000' }, { value: '100k-200k', label: '$100,000 - $200,000' }, { value: '200k-plus', label: 'Over $200,000' }] },
    { id: 'new-used', question: 'Are you considering new, used, or certified pre-owned?', icon: '🔑', type: 'single',
      options: [{ value: 'new-only', label: 'New only' }, { value: 'cpo', label: 'New or Certified Pre-Owned' }, { value: 'any', label: 'Open to new or used' }, { value: 'used-only', label: 'Used only (to maximize value)' }] },
    { id: 'ownership-length', question: 'How long do you plan to keep this vehicle?', icon: '📅', type: 'single',
      options: [{ value: 'short', label: '1-2 years (lease or flip)' }, { value: 'medium', label: '3-5 years' }, { value: 'long', label: '5-10 years' }, { value: 'forever', label: '10+ years (drive it until it dies)' }] },
    { id: 'fuel-priority', question: 'How important is fuel efficiency to you?', icon: '⛽', type: 'single',
      options: [{ value: 'critical', label: 'Critical - top priority, want best MPG possible' }, { value: 'important', label: 'Important - prefer good fuel economy' }, { value: 'moderate', label: 'Moderate - nice to have but not essential' }, { value: 'not-important', label: 'Not important - performance matters more' }] },
    { id: 'powertrain', question: 'What powertrain are you interested in?', icon: '⚡', type: 'single',
      options: [{ value: 'gas', label: 'Traditional gasoline' }, { value: 'hybrid', label: 'Hybrid (gas + electric)' }, { value: 'plugin-hybrid', label: 'Plug-in hybrid (short EV range + gas)' }, { value: 'electric', label: 'Fully electric (EV)' }, { value: 'diesel', label: 'Diesel' }, { value: 'any', label: 'Open to any powertrain' }] },
    { id: 'driving-style', question: 'How would you describe your driving personality?', icon: '🏎️', type: 'single',
      options: [{ value: 'cautious', label: 'Cautious & safety-focused' }, { value: 'relaxed', label: 'Relaxed & comfortable cruiser' }, { value: 'practical', label: 'Practical & efficient' }, { value: 'confident', label: 'Confident & assertive' }, { value: 'spirited', label: 'Spirited & enjoys driving' }, { value: 'performance', label: 'Performance enthusiast' }] },
    { id: 'tech-features', question: 'Which technology features are most important? (Select up to 4)', icon: '📱', type: 'multiple', maxSelect: 4,
      options: [{ value: 'basic', label: 'Just the basics - don\'t need fancy tech' }, { value: 'apple-android', label: 'Apple CarPlay / Android Auto' }, { value: 'premium-audio', label: 'Premium sound system' }, { value: 'navigation', label: 'Built-in navigation' }, { value: 'digital-dash', label: 'Digital instrument cluster' }, { value: 'hud', label: 'Head-up display' }, { value: 'wireless-charging', label: 'Wireless phone charging' }, { value: 'wifi', label: 'Built-in WiFi hotspot' }, { value: 'remote-start', label: 'Remote start & app control' }] },
    { id: 'safety-features', question: 'Which safety features are essential? (Select all that apply)', icon: '🛡️', type: 'multiple',
      options: [{ value: 'basic', label: 'Standard safety is fine' }, { value: 'blind-spot', label: 'Blind spot monitoring' }, { value: 'lane-keep', label: 'Lane keeping assist' }, { value: 'adaptive-cruise', label: 'Adaptive cruise control' }, { value: 'auto-brake', label: 'Automatic emergency braking' }, { value: 'parking-sensors', label: 'Parking sensors & cameras' }, { value: 'surround-view', label: '360° surround view camera' }, { value: 'self-driving', label: 'Semi-autonomous driving features' }] },
    { id: 'comfort-features', question: 'Which comfort features matter most? (Select up to 4)', icon: '🛋️', type: 'multiple', maxSelect: 4,
      options: [{ value: 'basic', label: 'Basic comfort is fine' }, { value: 'leather', label: 'Leather/premium seats' }, { value: 'heated-seats', label: 'Heated seats' }, { value: 'cooled-seats', label: 'Ventilated/cooled seats' }, { value: 'heated-wheel', label: 'Heated steering wheel' }, { value: 'pano-roof', label: 'Panoramic sunroof' }, { value: 'quiet-cabin', label: 'Quiet, well-insulated cabin' }, { value: 'massage', label: 'Massage seats' }, { value: 'air-suspension', label: 'Adjustable air suspension' }] },
    { id: 'priorities', question: 'What are your TOP priorities in a vehicle? (Select exactly 3)', icon: '⭐', type: 'multiple', maxSelect: 3,
      options: [{ value: 'reliability', label: 'Reliability & dependability' }, { value: 'safety', label: 'Safety ratings & features' }, { value: 'fuel-economy', label: 'Fuel economy' }, { value: 'performance', label: 'Performance & acceleration' }, { value: 'comfort', label: 'Comfort & ride quality' }, { value: 'luxury', label: 'Luxury & premium feel' }, { value: 'capability', label: 'Off-road/towing capability' }, { value: 'value', label: 'Value for money' }, { value: 'style', label: 'Style & design' }, { value: 'tech', label: 'Technology & features' }, { value: 'resale', label: 'Resale value' }, { value: 'brand', label: 'Brand reputation' }] },
    { id: 'brand', question: 'Do you have brand preferences or requirements?', icon: '🏷️', type: 'single',
      options: [{ value: 'domestic', label: 'Prefer American (Ford, Chevy, Ram, Jeep)' }, { value: 'japanese', label: 'Prefer Japanese (Toyota, Honda, Mazda, Subaru)' }, { value: 'korean', label: 'Prefer Korean (Hyundai, Kia, Genesis)' }, { value: 'german', label: 'Prefer German (BMW, Mercedes, Audi, VW, Porsche)' }, { value: 'european', label: 'Prefer European luxury (Land Rover, Volvo, Jaguar)' }, { value: 'any', label: 'No preference - best vehicle for my needs' }] },
    { id: 'image', question: 'How important is the image/status your vehicle projects?', icon: '✨', type: 'single',
      options: [{ value: 'not-important', label: 'Not important - just needs to work well' }, { value: 'somewhat', label: 'Somewhat - want something respectable' }, { value: 'important', label: 'Important - want to make a good impression' }, { value: 'very-important', label: 'Very important - want a head-turner' }] },
    { id: 'body-style', question: 'Which body styles appeal to you? (Select all that interest you)', icon: '🚗', type: 'multiple',
      options: [{ value: 'any', label: 'No preference - recommend the best fit' }, { value: 'sedan', label: 'Sedan' }, { value: 'hatchback', label: 'Hatchback' }, { value: 'wagon', label: 'Wagon / Estate' }, { value: 'compact-suv', label: 'Compact SUV / Crossover' }, { value: 'midsize-suv', label: 'Midsize SUV' }, { value: 'fullsize-suv', label: 'Full-size SUV' }, { value: 'truck', label: 'Pickup truck' }, { value: 'minivan', label: 'Minivan' }, { value: 'sports', label: 'Sports car / Coupe' }, { value: 'convertible', label: 'Convertible / Roadster' }] }
  ];

  const vehicleSizeNames = { micro: 'Micro / City Car', hatchback: 'Hatchback', crossover: 'Compact Crossover', sedan: 'Sedan', coupe: 'Coupe', midsizeSuv: 'Midsize SUV', suv: 'Full-Size SUV', midsizeTruck: 'Midsize Truck', truck: 'Full-Size Truck', minivan: 'Minivan', van: 'Full-Size Van', wagon: 'Wagon', sport: 'Sports Car', roadster: 'Roadster', hyper: 'Supercar / Hypercar', muscle: 'Muscle Car' };
  const getArr = (val: any): any[] => Array.isArray(val) ? val : (val ? [val] : []);

  const calculateRecommendation = () => {
    const scores: Record<string, number> = { micro: 0, hatchback: 0, crossover: 0, sedan: 0, coupe: 0, midsizeSuv: 0, suv: 0, midsizeTruck: 0, truck: 0, minivan: 0, van: 0, wagon: 0, sport: 0, roadster: 0, hyper: 0, muscle: 0 };
    
    // PASSENGER SCORING
    const p = answers.passengers;
    if (p === '1-2') { scores.micro += 10; scores.hatchback += 8; scores.coupe += 10; scores.sport += 12; scores.roadster += 12; scores.muscle += 10; scores.sedan += 6; scores.midsizeTruck += 6; }
    else if (p === '3-4') { scores.sedan += 10; scores.hatchback += 7; scores.crossover += 8; scores.midsizeSuv += 8; scores.wagon += 8; scores.midsizeTruck += 7; scores.truck += 6; scores.muscle += 5; scores.coupe += 4; }
    else if (p === '5') { scores.midsizeSuv += 10; scores.suv += 9; scores.wagon += 7; scores.minivan += 9; scores.truck += 6; scores.crossover += 5; }
    else if (p === '6-7') { scores.suv += 12; scores.minivan += 12; scores.van += 8; scores.midsizeSuv += 4; }
    else if (p === '8+') { scores.suv += 10; scores.minivan += 14; scores.van += 12; }

    // PRIMARY USE SCORING
    const use = answers['primary-use'];
    if (use === 'commute') { scores.micro += 10; scores.hatchback += 10; scores.sedan += 12; scores.crossover += 8; scores.wagon += 7; scores.midsizeSuv += 5; }
    else if (use === 'family') { scores.midsizeSuv += 12; scores.suv += 10; scores.minivan += 14; scores.crossover += 7; scores.wagon += 7; scores.sedan += 5; }
    else if (use === 'work') { scores.truck += 18; scores.van += 14; scores.midsizeTruck += 10; scores.suv += 5; }
    else if (use === 'adventure') { scores.midsizeTruck += 14; scores.suv += 12; scores.midsizeSuv += 9; scores.truck += 7; scores.wagon += 6; scores.crossover += 5; }
    else if (use === 'towing') { scores.truck += 16; scores.suv += 10; scores.midsizeTruck += 6; }
    else if (use === 'fun') { scores.sport += 14; scores.roadster += 14; scores.muscle += 12; scores.coupe += 10; scores.hyper += 10; }
    else if (use === 'luxury') { scores.sedan += 10; scores.suv += 10; scores.coupe += 8; scores.hyper += 12; scores.roadster += 6; }
    else if (use === 'errands') { scores.hatchback += 8; scores.crossover += 10; scores.midsizeSuv += 8; scores.sedan += 6; scores.micro += 6; }

    // COMMUTE DISTANCE SCORING
    const commute = answers['commute-distance'];
    if (commute === 'minimal') { scores.micro += 6; scores.sport += 4; scores.roadster += 4; }
    else if (commute === 'short') { scores.hatchback += 5; scores.crossover += 4; scores.sedan += 4; }
    else if (commute === 'medium') { scores.sedan += 6; scores.crossover += 5; scores.midsizeSuv += 4; scores.wagon += 4; }
    else if (commute === 'long' || commute === 'very-long') { scores.sedan += 8; scores.suv += 6; scores.midsizeSuv += 6; scores.wagon += 5; scores.truck += 4; scores.micro -= 4; scores.sport -= 3; }

    // DRIVING ENVIRONMENT SCORING
    const drivingEnv = answers['driving-environment'];
    if (drivingEnv === 'city') { scores.micro += 10; scores.hatchback += 8; scores.sedan += 6; scores.crossover += 5; scores.truck -= 4; scores.suv -= 3; }
    else if (drivingEnv === 'suburban') { scores.crossover += 6; scores.midsizeSuv += 6; scores.sedan += 5; scores.minivan += 5; }
    else if (drivingEnv === 'highway') { scores.sedan += 8; scores.suv += 6; scores.wagon += 6; scores.truck += 5; scores.midsizeSuv += 5; }
    else if (drivingEnv === 'mixed') { scores.crossover += 5; scores.midsizeSuv += 5; scores.sedan += 5; scores.hatchback += 4; }
    else if (drivingEnv === 'rural') { scores.truck += 8; scores.midsizeTruck += 8; scores.suv += 7; scores.midsizeSuv += 5; scores.micro -= 3; }

    // WEATHER SCORING
    const weather = getArr(answers.weather);
    if (weather.includes('snow')) { scores.suv += 6; scores.midsizeSuv += 6; scores.crossover += 6; scores.wagon += 5; scores.midsizeTruck += 4; scores.truck += 4; scores.roadster -= 4; scores.sport -= 3; scores.micro -= 2; }
    if (weather.includes('extreme-cold')) { scores.suv += 4; scores.truck += 4; scores.midsizeTruck += 4; scores.roadster -= 3; }
    if (weather.includes('extreme-heat')) { scores.sedan += 3; scores.suv += 3; scores.midsizeSuv += 3; }
    if (weather.includes('flooding')) { scores.truck += 5; scores.suv += 5; scores.midsizeTruck += 4; scores.micro -= 3; scores.sedan -= 2; scores.sport -= 4; }

    // TERRAIN SCORING
    const terrain = getArr(answers.terrain);
    if (terrain.includes('gravel')) { scores.midsizeTruck += 6; scores.suv += 5; scores.truck += 5; scores.crossover += 3; }
    if (terrain.includes('offroad')) { scores.midsizeTruck += 14; scores.suv += 12; scores.truck += 8; scores.midsizeSuv += 5; scores.micro = -10; scores.sedan -= 5; scores.sport -= 5; scores.hatchback -= 3; }
    if (terrain.includes('steep')) { scores.suv += 5; scores.midsizeTruck += 5; scores.truck += 5; scores.crossover += 3; }
    if (terrain.includes('worksite')) { scores.truck += 12; scores.midsizeTruck += 8; scores.van += 8; }
    if (terrain.includes('beach')) { scores.midsizeTruck += 6; scores.suv += 6; scores.truck += 4; }

    // CARGO SCORING
    const cargo = answers['cargo-needs'];
    if (cargo === 'minimal') { scores.micro += 6; scores.coupe += 6; scores.sport += 6; scores.roadster += 6; scores.sedan += 4; }
    else if (cargo === 'moderate') { scores.midsizeSuv += 6; scores.wagon += 7; scores.crossover += 6; scores.hatchback += 6; scores.midsizeTruck += 5; scores.minivan += 4; }
    else if (cargo === 'large') { scores.suv += 8; scores.minivan += 10; scores.midsizeTruck += 7; scores.truck += 7; scores.van += 8; scores.wagon += 5; }
    else if (cargo === 'truck-bed') { scores.truck += 12; scores.midsizeTruck += 14; scores.micro = -10; scores.sedan = -10; scores.coupe = -10; scores.sport = -10; scores.roadster = -10; scores.hyper = -10; scores.minivan -= 5; }
    else if (cargo === 'commercial') { scores.van += 16; scores.truck += 12; scores.midsizeTruck += 5; }

    // ACTIVITIES SCORING
    const activities = getArr(answers.activities);
    if (activities.includes('camping')) { scores.midsizeTruck += 8; scores.suv += 7; scores.truck += 6; scores.midsizeSuv += 5; scores.wagon += 4; }
    if (activities.includes('water-sports')) { scores.midsizeTruck += 8; scores.truck += 10; scores.suv += 6; }
    if (activities.includes('winter-sports')) { scores.suv += 6; scores.midsizeSuv += 6; scores.wagon += 5; scores.crossover += 4; }
    if (activities.includes('biking')) { scores.midsizeTruck += 6; scores.suv += 5; scores.wagon += 5; scores.midsizeSuv += 4; scores.van += 4; }
    if (activities.includes('golf')) { scores.sedan += 4; scores.suv += 4; scores.midsizeSuv += 3; }
    if (activities.includes('pets')) { scores.suv += 5; scores.midsizeSuv += 5; scores.wagon += 5; scores.crossover += 4; scores.minivan += 4; }
    if (activities.includes('kids-sports')) { scores.minivan += 8; scores.suv += 6; scores.midsizeSuv += 5; }
    if (activities.includes('home-improvement')) { scores.truck += 8; scores.midsizeTruck += 10; scores.van += 6; }

    // TOWING SCORING
    const tow = answers.towing;
    if (tow === 'light') { scores.midsizeTruck += 6; scores.suv += 6; scores.midsizeSuv += 5; scores.truck += 4; scores.crossover += 2; }
    else if (tow === 'medium') { scores.truck += 10; scores.suv += 8; scores.midsizeTruck += 6; scores.micro = -10; scores.hatchback -= 3; scores.sedan -= 3; }
    else if (tow === 'heavy') { scores.truck += 14; scores.suv += 8; scores.midsizeTruck += 2; scores.micro = -10; scores.hatchback = -10; scores.sedan = -10; scores.coupe = -10; scores.sport = -10; scores.roadster = -10; }
    else if (tow === 'max') { scores.truck += 20; Object.keys(scores).forEach(k => { if (k !== 'truck' && k !== 'suv') scores[k] = -10; }); scores.suv = 5; }

    // PARKING SCORING
    const park = answers.parking;
    if (park === 'tight') { scores.micro += 12; scores.hatchback += 8; scores.sedan += 5; scores.coupe += 6; scores.truck -= 6; scores.suv -= 5; scores.van -= 6; }
    else if (park === 'street') { scores.sedan += 4; scores.hatchback += 4; scores.crossover += 3; scores.truck -= 2; }
    else if (park === 'spacious') { scores.truck += 4; scores.suv += 4; scores.van += 4; }

    // FUEL PRIORITY SCORING
    const fuelPriority = answers['fuel-priority'];
    if (fuelPriority === 'critical') { scores.micro += 10; scores.hatchback += 8; scores.sedan += 6; scores.crossover += 4; scores.truck -= 6; scores.suv -= 5; scores.muscle -= 5; scores.hyper -= 5; }
    else if (fuelPriority === 'important') { scores.micro += 5; scores.hatchback += 5; scores.sedan += 4; scores.crossover += 3; scores.truck -= 3; scores.suv -= 2; }
    else if (fuelPriority === 'not-important') { scores.truck += 3; scores.muscle += 4; scores.sport += 3; scores.hyper += 3; }

    // DRIVING STYLE SCORING
    const style = answers['driving-style'];
    if (style === 'cautious') { scores.sedan += 6; scores.crossover += 5; scores.midsizeSuv += 5; scores.minivan += 4; }
    else if (style === 'relaxed') { scores.sedan += 6; scores.midsizeSuv += 5; scores.suv += 5; scores.minivan += 6; scores.wagon += 5; }
    else if (style === 'practical') { scores.hatchback += 6; scores.crossover += 6; scores.sedan += 5; scores.wagon += 6; scores.midsizeTruck += 5; }
    else if (style === 'confident') { scores.suv += 5; scores.truck += 5; scores.midsizeSuv += 4; scores.sedan += 3; }
    else if (style === 'spirited') { scores.sport += 8; scores.muscle += 7; scores.coupe += 6; scores.hatchback += 5; scores.roadster += 6; }
    else if (style === 'performance') { scores.sport += 12; scores.hyper += 12; scores.muscle += 10; scores.roadster += 8; scores.coupe += 6; }

    // COMFORT FEATURES SCORING
    const comfortFeatures = getArr(answers['comfort-features']);
    if (comfortFeatures.includes('leather')) { scores.sedan += 3; scores.suv += 3; scores.coupe += 3; }
    if (comfortFeatures.includes('cooled-seats')) { scores.sedan += 4; scores.suv += 4; scores.truck += 3; }
    if (comfortFeatures.includes('pano-roof')) { scores.crossover += 3; scores.midsizeSuv += 3; scores.suv += 3; scores.sedan += 2; }
    if (comfortFeatures.includes('quiet-cabin')) { scores.sedan += 5; scores.suv += 4; scores.midsizeSuv += 4; scores.truck -= 2; }
    if (comfortFeatures.includes('massage') || comfortFeatures.includes('air-suspension')) { scores.sedan += 4; scores.suv += 5; scores.hyper += 3; }

    // PRIORITIES SCORING
    const priorities = getArr(answers.priorities);
    if (priorities.includes('reliability')) { scores.sedan += 5; scores.midsizeSuv += 5; scores.crossover += 4; scores.minivan += 4; scores.midsizeTruck += 4; }
    if (priorities.includes('safety')) { scores.midsizeSuv += 6; scores.suv += 6; scores.sedan += 5; scores.crossover += 5; scores.minivan += 5; }
    if (priorities.includes('fuel-economy')) { scores.micro += 7; scores.hatchback += 6; scores.sedan += 5; scores.crossover += 4; scores.truck -= 4; scores.suv -= 3; }
    if (priorities.includes('performance')) { scores.sport += 8; scores.muscle += 7; scores.hyper += 8; scores.coupe += 5; scores.roadster += 5; }
    if (priorities.includes('comfort')) { scores.sedan += 5; scores.suv += 5; scores.minivan += 5; scores.wagon += 4; }
    if (priorities.includes('luxury')) { scores.sedan += 4; scores.suv += 4; scores.coupe += 4; scores.hyper += 5; scores.roadster += 3; }
    if (priorities.includes('capability')) { scores.truck += 8; scores.midsizeTruck += 7; scores.suv += 6; }
    if (priorities.includes('value')) { scores.hatchback += 5; scores.crossover += 5; scores.sedan += 4; scores.midsizeTruck += 4; scores.hyper -= 5; }
    if (priorities.includes('style')) { scores.coupe += 5; scores.sport += 5; scores.muscle += 5; scores.roadster += 5; scores.hyper += 5; scores.minivan -= 3; }
    if (priorities.includes('resale')) { scores.midsizeTruck += 5; scores.truck += 4; scores.midsizeSuv += 4; scores.suv += 3; }

    // IMAGE/STATUS SCORING
    const image = answers.image;
    if (image === 'important') { scores.sedan += 4; scores.suv += 5; scores.coupe += 4; scores.sport += 4; scores.micro -= 3; scores.minivan -= 3; }
    else if (image === 'very-important') { scores.hyper += 10; scores.sport += 8; scores.suv += 6; scores.coupe += 6; scores.roadster += 5; scores.sedan += 4; scores.micro -= 5; scores.minivan -= 5; scores.hatchback -= 3; }

    // BODY STYLE PREFERENCE SCORING
    const bodyPref = getArr(answers['body-style']);
    if (!bodyPref.includes('any') && bodyPref.length > 0) {
      if (bodyPref.includes('sedan')) { scores.sedan += 10; }
      if (bodyPref.includes('hatchback')) { scores.hatchback += 10; scores.micro += 5; }
      if (bodyPref.includes('wagon')) { scores.wagon += 10; }
      if (bodyPref.includes('compact-suv')) { scores.crossover += 10; scores.midsizeSuv += 5; }
      if (bodyPref.includes('midsize-suv')) { scores.midsizeSuv += 10; scores.crossover += 4; }
      if (bodyPref.includes('fullsize-suv')) { scores.suv += 10; }
      if (bodyPref.includes('truck')) { 
        if (use === 'work' || tow === 'heavy' || tow === 'max' || cargo === 'commercial') { scores.truck += 12; scores.midsizeTruck += 5; } 
        else { scores.midsizeTruck += 12; scores.truck += 6; } 
      }
      if (bodyPref.includes('minivan')) { scores.minivan += 10; }
      if (bodyPref.includes('sports')) { scores.sport += 10; scores.coupe += 8; scores.muscle += 7; scores.hyper += 7; }
      if (bodyPref.includes('convertible')) { scores.roadster += 12; scores.muscle += 4; scores.sport += 3; }
    }

    // BUDGET SCORING & RESTRICTIONS
    const budget = answers.budget;
    const bLvl: Record<string, number> = { 'under-25k': 1, '25k-35k': 2, '35k-50k': 3, '50k-75k': 4, '75k-100k': 5, '100k-200k': 6, '200k-plus': 7 };
    const budgetLevel = bLvl[budget] || 3;
    
    // Restrict vehicles by budget
    if (budgetLevel < 6) { scores.hyper = -10; }
    if (budgetLevel < 3) { scores.sport = Math.min(scores.sport, 5); scores.roadster = Math.min(scores.roadster, 5); }
    if (budgetLevel < 2) { scores.suv = Math.min(scores.suv, 5); scores.truck = Math.min(scores.truck, 5); }
    
    // Boost luxury options at high budgets
    if (budgetLevel >= 5) { scores.hyper += 5; scores.sport += 3; scores.roadster += 3; }
    if (budgetLevel >= 6) { scores.hyper += 5; }

    // Find top recommendation
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return generateModels(sorted[0][0], budgetLevel);
  };

  const generateModels = (vType: string, budgetLevel: number) => {
    const priorities = getArr(answers.priorities);
    const terrain = getArr(answers.terrain);
    const towing = answers.towing;
    const use = answers['primary-use'];
    const cargo = answers['cargo-needs'];
    const brand = answers.brand;
    const activities = getArr(answers.activities);
    const weather = getArr(answers.weather);
    const comfortFeatures = getArr(answers['comfort-features']);
    
    let vehicles: string[] = [], description = '', features: string[] = [], reasoning: string[] = [];
    const needsOffroad = terrain.includes('offroad') || terrain.includes('gravel');
    const isWork = use === 'work';
    const needsSnow = weather.includes('snow');
    const wantsLuxury = priorities.includes('luxury') || answers.image === 'very-important';

    switch(vType) {
      case 'micro': 
        vehicles = budgetLevel <= 2 ? ['Chevrolet Spark', 'Mitsubishi Mirage', 'Nissan Versa', 'Kia Rio'] : ['Mini Cooper', 'Fiat 500', 'Mini Cooper'];
        description = 'Perfect for city driving with excellent fuel efficiency and easy maneuverability. Ideal for urban commuters who need easy parking and low running costs.';
        features = ['Excellent fuel economy (35+ MPG)', 'Easy parking & tight turns', 'Low insurance costs', 'Nimble handling', 'Affordable maintenance'];
        reasoning.push('Ideal for urban commuting with tight parking');
        if (answers['fuel-priority'] === 'critical') reasoning.push('Maximizes fuel efficiency');
        break;
      case 'hatchback': 
        vehicles = brand === 'japanese' ? ['Honda Civic', 'Mazda3', 'Toyota Corolla'] :
                   budgetLevel >= 4 ? ['Volkswagen Golf', 'Mini Cooper', 'Mercedes-Benz A-Class'] :
                   ['Honda Civic', 'Mazda3', 'Hyundai Elantra GT', 'Kia Forte5'];
        description = 'Versatile hatchbacks combine sedan comfort with SUV-like cargo flexibility. Great for active lifestyles that need occasional hauling without the bulk.';
        features = ['Flexible fold-flat cargo area', 'Fun-to-drive dynamics', 'Good fuel economy (30+ MPG)', 'Practical yet sporty', 'Easy city maneuverability'];
        reasoning.push('Great balance of practicality and driving enjoyment');
        break;
      case 'crossover': 
        vehicles = priorities.includes('reliability') ? ['Toyota Corolla Cross', 'Honda HR-V', 'Mazda CX-30', 'Subaru Crosstrek'] :
                   needsSnow ? ['Subaru Crosstrek', 'Mazda CX-30 AWD', 'Toyota Corolla Cross AWD'] :
                   budgetLevel >= 4 ? ['BMW X1', 'Audi Q3', 'Volvo XC40', 'Lexus UX'] :
                   ['Mazda CX-30', 'Hyundai Kona', 'Kia Seltos', 'Honda HR-V'];
        description = 'Compact crossovers offer SUV versatility in a manageable size. Perfect for those who want elevated seating and cargo space without a large footprint.';
        features = ['Elevated driving position', 'Available AWD for weather confidence', 'Versatile cargo area', 'Car-like handling', 'Better fuel economy than larger SUVs'];
        reasoning.push('SUV capability in a compact, efficient package');
        if (needsSnow) reasoning.push('AWD available for winter weather confidence');
        break;
      case 'sedan': 
        vehicles = priorities.includes('reliability') ? (budgetLevel <= 3 ? ['Honda Civic', 'Toyota Camry', 'Mazda3'] : ['Lexus ES', 'Toyota Avalon', 'Honda Accord']) :
                   wantsLuxury && budgetLevel >= 5 ? ['BMW 5 Series', 'Mercedes-Benz E-Class', 'Genesis G80', 'Audi A6'] :
                   budgetLevel >= 4 ? ['BMW 3 Series', 'Mercedes-Benz C-Class', 'Genesis G70', 'Audi A4'] :
                   brand === 'korean' ? ['Hyundai Sonata', 'Kia K5', 'Genesis G70'] :
                   ['Honda Accord', 'Toyota Camry', 'Mazda6', 'Hyundai Sonata'];
        description = 'Sedans offer the best combination of comfort, efficiency, and refined driving. Ideal for commuters and those who prioritize a smooth, quiet ride.';
        features = ['Comfortable highway cruising', 'Good fuel economy', 'Refined ride quality', 'Spacious trunk', 'Advanced safety features'];
        reasoning.push('Excellent for daily commuting and long trips');
        if (priorities.includes('comfort')) reasoning.push('Optimized for ride comfort');
        break;
      case 'coupe': 
        vehicles = budgetLevel >= 5 ? ['BMW M4', 'Mercedes-AMG C63', 'Audi RS5', 'Lexus LC'] :
                   budgetLevel >= 3 ? ['BMW 4 Series', 'Audi A5', 'Mercedes-Benz C-Class', 'Lexus RC'] :
                   ['Toyota GR86', 'Subaru BRZ', 'Honda Civic', 'Hyundai Elantra'];
        description = 'Coupes prioritize style and driving dynamics over practicality. Perfect for enthusiasts who want a sporty daily driver with head-turning looks.';
        features = ['Sporty, aggressive styling', 'Sharp handling dynamics', 'Performance-oriented', 'Premium interior feel', 'Engaging driving experience'];
        reasoning.push('Style and driving enjoyment prioritized');
        break;
      case 'midsizeSuv': 
        vehicles = needsOffroad ? ['Subaru Forester', 'Toyota RAV4', 'Mazda CX-50', 'Jeep Cherokee'] :
                   priorities.includes('reliability') ? ['Toyota RAV4', 'Honda CR-V', 'Mazda CX-5', 'Subaru Forester'] :
                   wantsLuxury && budgetLevel >= 4 ? ['BMW X3', 'Mercedes-Benz GLC', 'Porsche Macan', 'Audi Q5'] :
                   brand === 'korean' ? ['Hyundai Tucson', 'Kia Sportage', 'Genesis GV70'] :
                   ['Honda CR-V', 'Toyota RAV4', 'Mazda CX-5', 'Hyundai Tucson'];
        description = 'Midsize SUVs are the versatile sweet spot - enough space for family life without being too large. Great for those balancing practicality with maneuverability.';
        features = ['Flexible cargo space', 'Available AWD', 'Comfortable for 5 passengers', 'Family-friendly features', 'Good fuel economy for an SUV'];
        reasoning.push('Versatile size for families and active lifestyles');
        if (needsSnow) reasoning.push('AWD provides winter weather capability');
        break;
      case 'suv': 
        vehicles = needsOffroad ? ['Jeep Wrangler', 'Ford Bronco', 'Toyota 4Runner', 'Land Rover Defender', 'Jeep Grand Cherokee'] :
                   wantsLuxury && budgetLevel >= 6 ? ['Cadillac Escalade', 'Lincoln Navigator', 'BMW X7', 'Range Rover', 'Mercedes-Benz GLS'] :
                   budgetLevel >= 4 ? ['BMW X5', 'Mercedes-Benz GLE', 'Audi Q7', 'Genesis GV80', 'Volvo XC90'] :
                   ['Toyota Highlander', 'Honda Pilot', 'Ford Explorer', 'Kia Telluride', 'Hyundai Palisade'];
        description = 'Full-size SUVs deliver maximum passenger and cargo space with strong towing capability. Ideal for large families or those who need serious hauling ability.';
        features = ['3-row seating (7-8 passengers)', 'Strong towing capacity (5,000+ lbs)', 'Commanding road presence', 'Maximum cargo space', 'Premium comfort features'];
        reasoning.push('Maximum space and capability for families');
        if (towing === 'medium' || towing === 'heavy') reasoning.push('Towing capability for your needs');
        break;
      case 'midsizeTruck': 
        vehicles = needsOffroad ? ['Toyota Tacoma', 'Jeep Gladiator', 'Chevrolet Colorado', 'Ford Ranger'] :
                   budgetLevel <= 3 ? ['Ford Maverick', 'Hyundai Santa Cruz', 'Nissan Frontier'] :
                   brand === 'japanese' ? ['Toyota Tacoma', 'Honda Ridgeline', 'Nissan Frontier'] :
                   ['Ford Ranger', 'Chevrolet Colorado', 'GMC Canyon', 'Jeep Gladiator'];
        description = 'Midsize trucks offer the best balance of capability and daily drivability. Better fuel economy and easier parking than full-size trucks while still handling most hauling needs.';
        features = ['Versatile truck bed (5-6 ft)', 'Better fuel economy than full-size', 'Easier to park and maneuver', 'Excellent off-road capability', '4WD/AWD available', 'Towing up to 7,500 lbs'];
        reasoning.push('Right-sized truck for most needs');
        reasoning.push('More maneuverable and efficient than full-size');
        if (needsOffroad) reasoning.push('Excellent off-road capability');
        if (activities.includes('camping') || activities.includes('home-improvement')) reasoning.push('Perfect for your outdoor/DIY lifestyle');
        break;
      case 'truck': 
        const needsHD = towing === 'max';
        vehicles = needsHD ? ['Ford F-250', 'Ram 2500', 'Chevrolet Silverado 2500HD', 'GMC Sierra 2500HD'] :
                   wantsLuxury && budgetLevel >= 5 ? ['Ram 1500', 'Ford F-150', 'GMC Sierra', 'Chevrolet Silverado'] :
                   isWork ? ['Ford F-150', 'Ram 1500', 'Chevrolet Silverado 1500', 'GMC Sierra 1500'] :
                   brand === 'japanese' ? ['Toyota Tundra', 'Nissan Titan'] :
                   ['Ford F-150', 'Ram 1500', 'Chevrolet Silverado 1500', 'Toyota Tundra'];
        description = needsHD ? 'Heavy-duty trucks for maximum towing and payload. Built for serious work demands including 5th wheel trailers, horse trailers, and heavy equipment.' :
                      'Full-size trucks deliver maximum capability with comfortable daily driving. Best for work use, heavy towing, or when you need the most power and payload.';
        features = needsHD ? ['Max towing (15,000-20,000+ lbs)', 'Heavy payload capacity', 'Diesel engine available', 'Built for commercial work', 'Gooseneck/5th wheel ready'] :
                   ['Strong towing (10,000-14,000 lbs)', 'Large payload capacity', 'Spacious crew cab', 'V8/V6 twin-turbo power', 'Luxury interior available'];
        reasoning.push(needsHD ? 'Heavy-duty capability required for your towing needs' : 'Full-size power and capability');
        if (isWork) reasoning.push('Built for professional work demands');
        if (towing === 'heavy' || towing === 'max') reasoning.push('Heavy towing requirement');
        break;
      case 'minivan': 
        vehicles = budgetLevel >= 3 ? ['Toyota Sienna', 'Honda Odyssey', 'Kia Carnival', 'Chrysler Pacifica'] :
                   ['Honda Odyssey', 'Toyota Sienna', 'Kia Carnival', 'Chrysler Pacifica'];
        description = 'Minivans are the ultimate family vehicles - unmatched interior space, easy access with sliding doors, and features designed for family life. Nothing else comes close for family practicality.';
        features = ['Sliding doors for easy kid access', 'Flat-folding seats for max cargo', 'Best-in-class interior space', 'Entertainment systems available', 'Stow-and-go seating', 'Built-in vacuum (some models)'];
        reasoning.push('Ultimate family vehicle - nothing matches the practicality');
        if (activities.includes('kids-sports')) reasoning.push('Perfect for hauling kids and their gear');
        break;
      case 'van': 
        vehicles = isWork ? ['Ford Transit', 'Mercedes-Benz Sprinter', 'Ram ProMaster', 'Chevrolet Express'] :
                   ['Ford Transit Connect', 'Mercedes-Benz Metris', 'Ram ProMaster City'];
        description = 'Full-size cargo vans for commercial use or serious hauling needs. Standing-height cargo areas and maximum payload capacity.';
        features = ['Maximum cargo volume', 'Standing height available', 'Commercial-grade durability', 'Multiple wheelbase options', 'Upfit-ready'];
        reasoning.push('Maximum cargo capacity for work needs');
        break;
      case 'wagon': 
        vehicles = wantsLuxury && budgetLevel >= 5 ? ['Porsche Taycan', 'Audi A6', 'Mercedes-Benz E-Class', 'Audi RS6'] :
                   needsSnow ? ['Subaru Outback', 'Volvo V60', 'Audi A4'] :
                   ['Subaru Outback', 'Volvo V60', 'Volkswagen Golf Alltrack'];
        description = 'Wagons combine sedan driving dynamics with SUV-like cargo space. Lower center of gravity means better handling than crossovers while matching their practicality.';
        features = ['Sedan driving dynamics', 'SUV-level cargo space', 'Lower center of gravity', 'Standard AWD (most models)', 'Better fuel economy than SUVs'];
        reasoning.push('Best of both worlds: car handling with SUV cargo');
        break;
      case 'sport': 
        vehicles = budgetLevel >= 6 ? ['Porsche 911', 'BMW M3/M4', 'Mercedes-AMG GT', 'Audi R8', 'Chevrolet Corvette'] :
                   budgetLevel >= 4 ? ['Porsche 718 Cayman', 'BMW M2', 'Toyota GR Supra', 'Chevrolet Corvette'] :
                   ['Toyota GR86', 'Subaru BRZ', 'Mazda MX-5 Miata', 'Nissan Z'];
        description = 'Pure driving excitement - sports cars deliver the most engaging driving experience available. Perfect for enthusiasts who prioritize driving joy above all else.';
        features = ['Sharp, precise handling', 'Exhilarating acceleration', 'Driver-focused cockpit', 'Performance brakes', 'Aggressive styling'];
        reasoning.push('Pure driving pleasure prioritized');
        break;
      case 'roadster': 
        vehicles = budgetLevel >= 6 ? ['Porsche 911', 'Mercedes-AMG SL', 'BMW M4', 'Chevrolet Corvette'] :
                   budgetLevel >= 4 ? ['Porsche 718 Boxster', 'BMW Z4', 'Jaguar F-Type'] :
                   ['Mazda MX-5 Miata', 'Ford Mustang', 'Chevrolet Camaro'];
        description = 'Open-air driving experience - roadsters and convertibles combine sports car dynamics with the thrill of wind-in-your-hair driving.';
        features = ['Convertible top (power or manual)', 'Engaging driving dynamics', 'Head-turning style', 'Pure driving connection', 'Weekend escape vehicle'];
        reasoning.push('Open-air driving experience');
        break;
      case 'hyper': 
        vehicles = budgetLevel >= 7 ? ['Bugatti Chiron', 'Rimac Nevera', 'Ferrari SF90 Stradale', 'McLaren 765LT', 'Lamborghini Revuelto'] :
                   ['McLaren 720S', 'Ferrari 296 GTB', 'Lamborghini Huracán', 'Porsche 911', 'Aston Martin Vantage'];
        description = 'The pinnacle of automotive engineering - supercars and hypercars deliver extreme performance, exotic design, and exclusivity that few vehicles can match.';
        features = ['Extreme performance (600+ HP)', 'Exotic engineering & materials', 'Exclusive ownership experience', 'Investment potential', 'Head-turning presence'];
        reasoning.push('Ultimate automotive experience');
        break;
      case 'muscle': 
        vehicles = budgetLevel >= 5 ? ['Ford Mustang', 'Dodge Challenger', 'Chevrolet Camaro', 'Ford Mustang'] :
                   ['Ford Mustang', 'Dodge Challenger', 'Chevrolet Camaro', 'Dodge Charger'];
        description = 'American muscle cars deliver V8 power, iconic styling, and attainable performance. The most accessible way to experience serious horsepower.';
        features = ['V8 power (300-700+ HP)', 'Iconic American styling', 'Rear-wheel drive thrills', 'Affordable performance', 'Daily drivable'];
        reasoning.push('Classic American muscle power');
        break;
      default: 
        vehicles = ['Honda Accord', 'Toyota Camry', 'Honda CR-V', 'Toyota RAV4'];
        description = 'Reliable vehicles with great value.';
        features = ['Proven reliability', 'Good fuel economy', 'Versatile'];
    }
    
    // Add contextual reasoning
    if (priorities.includes('reliability')) reasoning.push('Reliability prioritized in selection');
    if (priorities.includes('safety')) reasoning.push('Top safety ratings considered');
    if (wantsLuxury) reasoning.push('Premium features and materials included');
    if (needsSnow) reasoning.push('All-weather capability considered');
    
    const budgetLabels: Record<number, string> = { 1: 'Under $25K', 2: '$25K-$35K', 3: '$35K-$50K', 4: '$50K-$75K', 5: '$75K-$100K', 6: '$100K-$200K', 7: 'Over $200K' };
    reasoning.push('Budget: ' + (budgetLabels[budgetLevel] || 'Not specified'));
    
    return { vehicleType: vType, vehicleSizeName: vehicleSizeNames[vType], vehicles: vehicles.slice(0, 5), description, features, reasoning, answers: { ...answers }, timestamp: new Date().toISOString() };
  };

  const saveResult = (r, email) => { const d = { ...r, id: Date.now().toString(), savedAt: new Date().toISOString(), email: email }; const e = JSON.parse(localStorage.getItem('autoWizardResults') || '[]'); e.push(d); localStorage.setItem('autoWizardResults', JSON.stringify(e)); };
  const submitEmailAndShowResults = () => { const r = calculateRecommendation(); setResult({ ...r, email: emailAddress }); saveResult(r, emailAddress); setShowEmailCollection(false); };
  const sendEmail = () => { setTimeout(() => { setEmailSent(true); setTimeout(() => { setShowEmailModal(false); setEmailSent(false); setEmailAddress(''); }, 2000); }, 1000); };
  const handleAnswer = (qId, val) => { setAnswers({ ...answers, [qId]: val }); if (testStep < allQuestions.length - 1) setTestStep(testStep + 1); else { setShowEmailCollection(true); } };
  const handleMultiSelect = (qId: string, val: string, maxSelect?: number) => { const current = getArr(answers[qId]); let newVal; if (current.includes(val)) { newVal = current.filter((v: string) => v !== val); } else { if (maxSelect && current.length >= maxSelect) { newVal = [...current.slice(1), val]; } else { newVal = [...current, val]; } } setAnswers({ ...answers, [qId]: newVal }); };
  const skipQuestion = () => { if (testStep < allQuestions.length - 1) setTestStep(testStep + 1); else { setShowEmailCollection(true); } };
  const resetTest = () => { setTestStep(0); setAnswers({}); setResult(null); setShowEmailCollection(false); setEmailAddress(''); };
  
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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setCurrentPage('home')}>
              <div className="relative"><div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" /><div className="relative bg-gradient-to-br from-amber-400 to-amber-500 p-2.5 rounded-xl"><Sparkles className="w-6 h-6 text-black" /></div></div>
              <h1 className="text-2xl font-bold"><span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Auto</span><span className="text-white"> Wizard</span></h1>
            </div>
            <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-2">
              <button onClick={() => { setCurrentPage('test'); resetTest(); }} className="px-4 py-2 rounded-lg text-white/70 hover:text-amber-400 hover:bg-white/5 transition-all">Take Test</button>
              <button onClick={() => setCurrentPage('services')} className="px-4 py-2 rounded-lg text-white/70 hover:text-amber-400 hover:bg-white/5 transition-all">Services</button>
              <button onClick={() => setCurrentPage('expertise')} className="px-4 py-2 rounded-lg text-white/70 hover:text-amber-400 hover:bg-white/5 transition-all">Our Expertise</button>
            </nav>
            <button onClick={() => setCurrentPage('consultation')} className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25 text-sm md:text-base">Book Consultation</button>
          </div>
          <nav className="md:hidden flex items-center justify-center gap-2 mt-3 pt-3 border-t border-white/10">
            <button onClick={() => { setCurrentPage('test'); resetTest(); }} className="px-3 py-1.5 rounded-lg text-sm text-white/70 hover:text-amber-400 hover:bg-white/5 transition-all">Take Test</button>
            <button onClick={() => setCurrentPage('services')} className="px-3 py-1.5 rounded-lg text-sm text-white/70 hover:text-amber-400 hover:bg-white/5 transition-all">Services</button>
            <button onClick={() => setCurrentPage('expertise')} className="px-3 py-1.5 rounded-lg text-sm text-white/70 hover:text-amber-400 hover:bg-white/5 transition-all">Our Expertise</button>
          </nav>
        </div>
      </header>

      {showEmailModal && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-md w-full"><div className="flex justify-between items-center mb-6"><h3 className="text-xl font-semibold">Email Results</h3><button onClick={() => setShowEmailModal(false)} className="text-white/50 hover:text-white"><X className="w-5 h-5" /></button></div>{emailSent ? <div className="text-center py-8"><div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-amber-400" /></div><p className="text-lg text-white">Sent!</p></div> : <><input type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} placeholder="Enter your email" className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white mb-4 focus:outline-none focus:border-amber-500" /><button onClick={sendEmail} disabled={!emailAddress.includes('@')} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold disabled:opacity-50 flex items-center justify-center gap-2"><Send className="w-4 h-4" />Send</button></>}</div></div>}

      {currentPage === 'home' && (
        <div className="relative">
          <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
            <div className="relative text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-8"><Sparkles className="w-4 h-4 text-amber-400" />Quick & Easy Vehicle Matching Assessment</div>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight"><span className="text-white">Find The </span><span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Perfect</span><br /><span className="text-white">Vehicle</span></h2>
              <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">Our quick and easy vehicle matching assessment analyzes your lifestyle, needs, and preferences to match you with the car of your dreams from 16 categories and 200+ models.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => { setCurrentPage('test'); resetTest(); }} className="group px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-lg font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-2xl shadow-amber-500/30 hover:scale-105"><span className="flex items-center justify-center gap-2">Find Your Dream Car<ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span></button>
                <button onClick={() => setCurrentPage('consultation')} className="px-8 py-4 rounded-xl border border-white/20 text-white hover:border-amber-500/50 hover:text-amber-400 transition-all">Contact One of Our Experts</button>
              </div>
            </div>
            <div className="relative mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[{ value: allQuestions.length.toString(), label: 'Questions', icon: Target }, { value: '16', label: 'Categories', icon: CarFront }, { value: '200+', label: 'Models', icon: Gauge }, { value: '100%', label: 'Free', icon: Heart }].map((s, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
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
                <div key={i} className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
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
              <div key={i} className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
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

      {currentPage === 'test' && !result && !showEmailCollection && (
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
                    </div>
                  )}
                </>
              )}
              
              <div className="mt-6 flex items-center justify-between">
                {testStep > 0 ? <button onClick={() => setTestStep(testStep - 1)} className="text-white/50 hover:text-amber-400 flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Back</button> : <div></div>}
                {canSkip && <button onClick={skipQuestion} className="text-white/50 hover:text-amber-400 flex items-center gap-2">Next<ArrowRight className="w-4 h-4" /></button>}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'test' && showEmailCollection && !result && (
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
                <li><button onClick={() => setCurrentPage('consultation')} className="flex items-center gap-2 hover:text-amber-400 transition-colors"><Mail className="w-4 h-4 text-amber-400" />autowizardcompany@gmail.com</button></li>
                <li><button onClick={() => setCurrentPage('consultation')} className="flex items-center gap-2 hover:text-amber-400 transition-colors"><Phone className="w-4 h-4 text-amber-400" />(413) 333-8401</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-white/40 text-sm">© 2026 Auto Wizard. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
