"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Check, ArrowLeft, ArrowRight, Shield, Clock, Mail, Target, Star, FileText, RefreshCw, X, Send } from 'lucide-react';
import Navigation from '../components/shared/Navigation';
import { scoreVehicles, getCategoryName, ScoredVehicle } from '../lib/vehicleScoring';
import { vehicleDatabase } from '../lib/vehicleDatabase';

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
      // Tesla
      'Tesla Model 3': 'Tesla_Model_3',
      'Tesla Model Y': 'Tesla_Model_Y',
      'Tesla Model S': 'Tesla_Model_S',
      'Tesla Model X': 'Tesla_Model_X',
      'Tesla Cybertruck': 'Tesla_Cybertruck',
      
      // Ford
      'Ford F-150': 'Ford_F-Series',
      'Ford F-150 Hybrid': 'Ford_F-150',
      'Ford F-150 Lightning': 'Ford_F-150_Lightning',
      'Ford F-150 Raptor': 'Ford_F-150_Raptor',
      'Ford F-150 Raptor R': 'Ford_F-150_Raptor',
      'Ford Super Duty F-250': 'Ford_Super_Duty',
      'Ford F-250': 'Ford_Super_Duty',
      'Ford Super Duty F-350': 'Ford_Super_Duty',
      'Ford Mustang': 'Ford_Mustang',
      'Ford Mustang GT': 'Ford_Mustang',
      'Ford Mustang Dark Horse': 'Ford_Mustang',
      'Ford Mustang Convertible': 'Ford_Mustang',
      'Ford Mustang Shelby GT500': 'Ford_Mustang_Shelby_GT500',
      'Ford Mustang Mach-E': 'Ford_Mustang_Mach-E',
      'Ford Bronco': 'Ford_Bronco_(sixth_generation)',
      'Ford Bronco Sport': 'Ford_Bronco_Sport',
      'Ford Bronco Raptor': 'Ford_Bronco_(sixth_generation)',
      'Ford Explorer': 'Ford_Explorer',
      'Ford Explorer Hybrid': 'Ford_Explorer',
      'Ford Explorer ST': 'Ford_Explorer',
      'Ford Expedition': 'Ford_Expedition',
      'Ford Expedition MAX': 'Ford_Expedition',
      'Ford Ranger': 'Ford_Ranger_(Americas)',
      'Ford Maverick': 'Ford_Maverick_(2021)',
      'Ford Escape': 'Ford_Escape',
      'Ford Escape Hybrid': 'Ford_Escape',
      'Ford Escape PHEV': 'Ford_Escape',
      'Ford Edge': 'Ford_Edge',
      'Ford Edge ST': 'Ford_Edge',
      'Ford Transit': 'Ford_Transit',
      'Ford Transit Connect': 'Ford_Transit_Connect',
      
      // Chevrolet
      'Chevrolet Corvette': 'Chevrolet_Corvette',
      'Chevrolet Corvette E-Ray': 'Chevrolet_Corvette_(C8)',
      'Chevrolet Corvette Z06': 'Chevrolet_Corvette_Z06',
      'Chevrolet Corvette ZR1': 'Chevrolet_Corvette_ZR1',
      'Chevrolet Camaro': 'Chevrolet_Camaro',
      'Chevrolet Camaro ZL1': 'Chevrolet_Camaro',
      'Chevrolet Silverado 1500': 'Chevrolet_Silverado',
      'Chevrolet Silverado 2500HD': 'Chevrolet_Silverado',
      'Chevrolet Silverado 3500HD': 'Chevrolet_Silverado',
      'Chevrolet Silverado EV': 'Chevrolet_Silverado_EV',
      'Chevrolet Silverado ZR2': 'Chevrolet_Silverado',
      'Chevrolet Colorado': 'Chevrolet_Colorado',
      'Chevrolet Colorado ZR2': 'Chevrolet_Colorado',
      'Chevrolet Tahoe': 'Chevrolet_Tahoe',
      'Chevrolet Tahoe Z71': 'Chevrolet_Tahoe',
      'Chevrolet Suburban': 'Chevrolet_Suburban',
      'Chevrolet Traverse': 'Chevrolet_Traverse',
      'Chevrolet Equinox': 'Chevrolet_Equinox',
      'Chevrolet Equinox EV': 'Chevrolet_Equinox_EV',
      'Chevrolet Blazer': 'Chevrolet_Blazer_(crossover)',
      'Chevrolet Blazer EV': 'Chevrolet_Blazer_EV',
      'Chevrolet Trax': 'Chevrolet_Trax',
      'Chevrolet Trailblazer': 'Chevrolet_Trailblazer_(crossover)',
      'Chevrolet Bolt EUV': 'Chevrolet_Bolt',
      'Chevrolet Spark': 'Chevrolet_Spark',
      'Chevrolet Express': 'Chevrolet_Express',
      
      // GMC
      'GMC Sierra 1500': 'GMC_Sierra',
      'GMC Sierra 2500HD': 'GMC_Sierra',
      'GMC Sierra 3500HD': 'GMC_Sierra',
      'GMC Sierra EV': 'GMC_Sierra_EV',
      'GMC Sierra AT4X': 'GMC_Sierra',
      'GMC Canyon': 'GMC_Canyon',
      'GMC Canyon AT4X': 'GMC_Canyon',
      'GMC Yukon': 'GMC_Yukon',
      'GMC Yukon XL': 'GMC_Yukon',
      'GMC Yukon AT4': 'GMC_Yukon',
      'GMC Yukon Denali Ultimate': 'GMC_Yukon',
      'GMC Acadia': 'GMC_Acadia',
      'GMC Terrain': 'GMC_Terrain',
      'GMC Hummer EV Pickup': 'GMC_Hummer_EV',
      'GMC Hummer EV SUV': 'GMC_Hummer_EV',
      'GMC Hummer EV': 'GMC_Hummer_EV',
      'GMC Savana': 'GMC_Savana',
      
      // Dodge/Ram
      'Dodge Challenger': 'Dodge_Challenger',
      'Dodge Challenger SRT Hellcat': 'Dodge_Challenger_SRT_Hellcat',
      'Dodge Charger': 'Dodge_Charger_(seventh_generation)',
      'Dodge Charger SRT Hellcat': 'Dodge_Charger_SRT_Hellcat',
      'Dodge Charger Daytona': 'Dodge_Charger_Daytona_(2024)',
      'Dodge Durango': 'Dodge_Durango',
      'Dodge Durango SRT 392': 'Dodge_Durango',
      'Dodge Durango SRT Hellcat': 'Dodge_Durango',
      'Dodge Hornet': 'Dodge_Hornet_(2023)',
      'Dodge Hornet R/T': 'Dodge_Hornet_(2023)',
      'Ram 1500': 'Ram_1500',
      'Ram 1500 TRX': 'Ram_1500_TRX',
      'Ram 1500 Rebel': 'Ram_1500',
      'Ram 1500 Limited': 'Ram_1500',
      'Ram 1500 REV': 'Ram_1500',
      'Ram 2500': 'Ram_2500',
      'Ram 3500': 'Ram_3500',
      'Ram ProMaster': 'Ram_ProMaster',
      'Ram ProMaster City': 'Ram_ProMaster_City',
      
      // Jeep
      'Jeep Wrangler': 'Jeep_Wrangler',
      'Jeep Wrangler 4xe': 'Jeep_Wrangler_(JL)',
      'Jeep Wrangler Rubicon 392': 'Jeep_Wrangler_(JL)',
      'Jeep Gladiator': 'Jeep_Gladiator_(JT)',
      'Jeep Grand Cherokee': 'Jeep_Grand_Cherokee',
      'Jeep Grand Cherokee 4xe': 'Jeep_Grand_Cherokee_(WL)',
      'Jeep Grand Cherokee L': 'Jeep_Grand_Cherokee_(WL)',
      'Jeep Grand Cherokee Trailhawk': 'Jeep_Grand_Cherokee_(WL)',
      'Jeep Grand Cherokee Summit': 'Jeep_Grand_Cherokee_(WL)',
      'Jeep Cherokee': 'Jeep_Cherokee_(KL)',
      'Jeep Compass': 'Jeep_Compass',
      'Jeep Renegade': 'Jeep_Renegade_(BU)',
      'Jeep Wagoneer': 'Jeep_Wagoneer_(WS)',
      'Jeep Grand Wagoneer': 'Jeep_Wagoneer_(WS)',
      
      // Chrysler
      'Chrysler Pacifica': 'Chrysler_Pacifica_(minivan)',
      'Chrysler Pacifica Hybrid': 'Chrysler_Pacifica_(minivan)',
      'Chrysler Voyager': 'Chrysler_Voyager_(minivan)',
      'Chrysler 300': 'Chrysler_300_(third_generation)',
      
      // Toyota
      'Toyota Camry': 'Toyota_Camry',
      'Toyota Corolla': 'Toyota_Corolla',
      'Toyota Corolla Hatchback': 'Toyota_Corolla_(E210)',
      'Toyota Corolla Hybrid': 'Toyota_Corolla',
      'Toyota Corolla Cross': 'Toyota_Corolla_Cross',
      'Toyota Corolla Cross Hybrid': 'Toyota_Corolla_Cross',
      'Toyota GR Corolla': 'Toyota_GR_Corolla',
      'Toyota RAV4': 'Toyota_RAV4',
      'Toyota RAV4 Hybrid': 'Toyota_RAV4',
      'Toyota RAV4 Prime': 'Toyota_RAV4_Prime',
      'Toyota RAV4 TRD Off-Road': 'Toyota_RAV4',
      'Toyota Highlander': 'Toyota_Highlander',
      'Toyota Grand Highlander': 'Toyota_Grand_Highlander',
      'Toyota 4Runner': 'Toyota_4Runner',
      'Toyota 4Runner TRD Pro': 'Toyota_4Runner',
      'Toyota Sequoia': 'Toyota_Sequoia',
      'Toyota Land Cruiser': 'Toyota_Land_Cruiser',
      'Toyota Land Cruiser 250': 'Toyota_Land_Cruiser',
      'Toyota Tacoma': 'Toyota_Tacoma',
      'Toyota Tacoma Hybrid': 'Toyota_Tacoma',
      'Toyota Tacoma TRD Pro': 'Toyota_Tacoma',
      'Toyota Tundra': 'Toyota_Tundra',
      'Toyota Tundra Hybrid': 'Toyota_Tundra',
      'Toyota Tundra TRD Pro': 'Toyota_Tundra',
      'Toyota Crown': 'Toyota_Crown_(S230)',
      'Toyota Crown Signia': 'Toyota_Crown_Signia',
      'Toyota Venza': 'Toyota_Venza',
      'Toyota Sienna': 'Toyota_Sienna',
      'Toyota Prius': 'Toyota_Prius',
      'Toyota Prius Prime': 'Toyota_Prius_Plug-in_Hybrid',
      'Toyota GR Supra': 'Toyota_Supra',
      'Toyota GR86': 'Toyota_GR86',
      'Toyota bZ4X': 'Toyota_bZ4X',
      'Toyota Mirai': 'Toyota_Mirai',
      
      // Honda
      'Honda Civic': 'Honda_Civic',
      'Honda Civic Hatchback': 'Honda_Civic',
      'Honda Civic Hybrid': 'Honda_Civic',
      'Honda Civic Si': 'Honda_Civic_Si',
      'Honda Civic Type R': 'Honda_Civic_Type_R',
      'Honda Accord': 'Honda_Accord',
      'Honda Accord Hybrid': 'Honda_Accord',
      'Honda Accord Sport': 'Honda_Accord',
      'Honda CR-V': 'Honda_CR-V',
      'Honda CR-V Hybrid': 'Honda_CR-V',
      'Honda CR-V Hybrid Sport Touring': 'Honda_CR-V',
      'Honda CR-V Sport Touring': 'Honda_CR-V',
      'Honda HR-V': 'Honda_HR-V',
      'Honda Pilot': 'Honda_Pilot',
      'Honda Pilot TrailSport': 'Honda_Pilot',
      'Honda Passport': 'Honda_Passport',
      'Honda Passport TrailSport': 'Honda_Passport',
      'Honda Prologue': 'Honda_Prologue',
      'Honda Ridgeline': 'Honda_Ridgeline',
      'Honda Odyssey': 'Honda_Odyssey',
      
      // Lexus
      'Lexus ES': 'Lexus_ES',
      'Lexus ES Hybrid': 'Lexus_ES',
      'Lexus IS': 'Lexus_IS',
      'Lexus IS 300': 'Lexus_IS',
      'Lexus IS 500': 'Lexus_IS',
      'Lexus LS': 'Lexus_LS',
      'Lexus LC': 'Lexus_LC',
      'Lexus LC 500': 'Lexus_LC',
      'Lexus LC 500 Convertible': 'Lexus_LC',
      'Lexus RC': 'Lexus_RC',
      'Lexus RC F': 'Lexus_RC_F',
      'Lexus UX': 'Lexus_UX',
      'Lexus NX': 'Lexus_NX',
      'Lexus NX Hybrid': 'Lexus_NX',
      'Lexus NX 350 F Sport': 'Lexus_NX',
      'Lexus RX': 'Lexus_RX',
      'Lexus RX Hybrid': 'Lexus_RX',
      'Lexus RX 350 F Sport': 'Lexus_RX',
      'Lexus RX 500h F Sport': 'Lexus_RX',
      'Lexus RZ': 'Lexus_RZ',
      'Lexus TX': 'Lexus_TX',
      'Lexus GX': 'Lexus_GX',
      'Lexus LX': 'Lexus_LX',
      'Lexus LM': 'Lexus_LM',
      
      // Acura
      'Acura Integra': 'Acura_Integra',
      'Acura Integra Type S': 'Acura_Integra',
      'Acura TLX': 'Acura_TLX',
      'Acura TLX Type S': 'Acura_TLX',
      'Acura RDX': 'Acura_RDX',
      'Acura RDX A-Spec': 'Acura_RDX',
      'Acura RDX A-Spec Advance': 'Acura_RDX',
      'Acura ADX': 'Acura_ADX',
      'Acura ADX A-Spec': 'Acura_ADX',
      'Acura MDX': 'Acura_MDX',
      'Acura MDX Type S': 'Acura_MDX',
      'Acura ZDX': 'Acura_ZDX_(2024)',
      'Acura ZDX Type S': 'Acura_ZDX_(2024)',
      
      // BMW
      'BMW 2 Series Coupe': 'BMW_2_Series',
      'BMW 2 Series Gran Coupe': 'BMW_2_Series',
      'BMW 3 Series': 'BMW_3_Series',
      'BMW 4 Series Coupe': 'BMW_4_Series',
      'BMW 4 Series': 'BMW_4_Series',
      'BMW 4 Series Gran Coupe': 'BMW_4_Series',
      'BMW 4 Series Convertible': 'BMW_4_Series',
      'BMW 5 Series': 'BMW_5_Series',
      'BMW 7 Series': 'BMW_7_Series',
      'BMW 8 Series Coupe': 'BMW_8_Series_(G15)',
      'BMW 8 Series Gran Coupe': 'BMW_8_Series_(G15)',
      'BMW 8 Series Convertible': 'BMW_8_Series_(G15)',
      'BMW M2': 'BMW_M2',
      'BMW M3': 'BMW_M3',
      'BMW M4': 'BMW_M4',
      'BMW M5': 'BMW_M5',
      'BMW M8': 'BMW_8_Series_(G15)',
      'BMW M240i': 'BMW_2_Series',
      'BMW M340i': 'BMW_3_Series',
      'BMW M440i': 'BMW_4_Series',
      'BMW M550i': 'BMW_5_Series',
      'BMW X1': 'BMW_X1',
      'BMW X2': 'BMW_X2',
      'BMW X3': 'BMW_X3',
      'BMW X3 M40i': 'BMW_X3',
      'BMW X4': 'BMW_X4',
      'BMW X5': 'BMW_X5',
      'BMW X5 M50i': 'BMW_X5',
      'BMW X5M': 'BMW_X5',
      'BMW X6': 'BMW_X6',
      'BMW X6M': 'BMW_X6',
      'BMW X7': 'BMW_X7',
      'BMW X7 M60i': 'BMW_X7',
      'BMW XM': 'BMW_XM',
      'BMW Z4': 'BMW_Z4',
      'BMW i4': 'BMW_i4',
      'BMW i5': 'BMW_i5',
      'BMW i7': 'BMW_i7',
      'BMW iX': 'BMW_iX',
      
      // Mercedes-Benz
      'Mercedes-Benz A-Class': 'Mercedes-Benz_A-Class',
      'Mercedes-Benz C-Class': 'Mercedes-Benz_C-Class',
      'Mercedes-Benz CLA': 'Mercedes-Benz_CLA-Class',
      'Mercedes-Benz CLE Coupe': 'Mercedes-Benz_CLE-Class',
      'Mercedes-Benz CLE Cabriolet': 'Mercedes-Benz_CLE-Class',
      'Mercedes-Benz E-Class': 'Mercedes-Benz_E-Class',
      'Mercedes-Benz S-Class': 'Mercedes-Benz_S-Class',
      'Mercedes-Maybach S-Class': 'Mercedes-Maybach_S-Class',
      'Mercedes-AMG GT Coupe': 'Mercedes-AMG_GT',
      'Mercedes-AMG SL': 'Mercedes-Benz_SL-Class',
      'Mercedes-AMG C43': 'Mercedes-Benz_C-Class',
      'Mercedes-AMG C63': 'Mercedes-AMG_C63',
      'Mercedes-AMG E53': 'Mercedes-Benz_E-Class',
      'Mercedes-AMG E63 S': 'Mercedes-Benz_E-Class',
      'Mercedes-AMG GLC43': 'Mercedes-Benz_GLC-Class',
      'Mercedes-AMG GLC63': 'Mercedes-Benz_GLC-Class',
      'Mercedes-AMG GLE53': 'Mercedes-Benz_GLE-Class',
      'Mercedes-AMG GLE63 S': 'Mercedes-Benz_GLE-Class',
      'Mercedes-AMG GLS63': 'Mercedes-Benz_GLS-Class',
      'Mercedes-Benz GLA': 'Mercedes-Benz_GLA-Class',
      'Mercedes-Benz GLB': 'Mercedes-Benz_GLB-Class',
      'Mercedes-Benz GLC': 'Mercedes-Benz_GLC-Class',
      'Mercedes-Benz GLC Coupe': 'Mercedes-Benz_GLC-Class',
      'Mercedes-Benz GLE': 'Mercedes-Benz_GLE-Class',
      'Mercedes-Benz GLE Coupe': 'Mercedes-Benz_GLE-Class',
      'Mercedes-Benz GLS': 'Mercedes-Benz_GLS-Class',
      'Mercedes-Maybach GLS': 'Mercedes-Maybach_GLS',
      'Mercedes-Benz G-Class': 'Mercedes-Benz_G-Class',
      'Mercedes-AMG G63': 'Mercedes-Benz_G-Class',
      'Mercedes-Benz EQB': 'Mercedes-Benz_EQB',
      'Mercedes-Benz EQE Sedan': 'Mercedes-Benz_EQE',
      'Mercedes-Benz EQE SUV': 'Mercedes-Benz_EQE_SUV',
      'Mercedes-Benz EQS': 'Mercedes-Benz_EQS',
      'Mercedes-Benz EQS Sedan': 'Mercedes-Benz_EQS',
      'Mercedes-Benz EQS SUV': 'Mercedes-Benz_EQS_SUV',
      'Mercedes-Benz Sprinter': 'Mercedes-Benz_Sprinter',
      
      // Audi
      'Audi A3': 'Audi_A3',
      'Audi A4': 'Audi_A4',
      'Audi A4 Allroad': 'Audi_A4_allroad',
      'Audi A5': 'Audi_A5',
      'Audi A5 Sportback': 'Audi_A5',
      'Audi A6': 'Audi_A6',
      'Audi A6 Allroad': 'Audi_A6_allroad',
      'Audi A7': 'Audi_A7',
      'Audi A8': 'Audi_A8',
      'Audi Q3': 'Audi_Q3',
      'Audi Q4 e-tron': 'Audi_Q4_e-tron',
      'Audi Q5': 'Audi_Q5',
      'Audi Q5 Sportback': 'Audi_Q5',
      'Audi Q7': 'Audi_Q7',
      'Audi Q8': 'Audi_Q8',
      'Audi Q8 e-tron': 'Audi_Q8_e-tron',
      'Audi S6': 'Audi_S6',
      'Audi S7': 'Audi_S7',
      'Audi e-tron': 'Audi_e-tron_(brand)',
      'Audi e-tron GT': 'Audi_e-tron_GT',
      'Audi RS e-tron GT': 'Audi_e-tron_GT',
      'Audi RS3': 'Audi_RS_3',
      'Audi RS5': 'Audi_RS_5',
      'Audi RS6 Avant': 'Audi_RS_6',
      'Audi RS7': 'Audi_RS_7',
      'Audi RS Q8': 'Audi_RS_Q8',
      'Audi S3': 'Audi_S3',
      'Audi S4': 'Audi_S4',
      'Audi S5': 'Audi_S5',
      'Audi SQ5': 'Audi_SQ5',
      'Audi SQ7': 'Audi_SQ7',
      'Audi SQ8': 'Audi_SQ8',
      'Audi TT': 'Audi_TT',
      'Audi R8': 'Audi_R8',
      
      // Porsche
      'Porsche 718 Cayman': 'Porsche_718',
      'Porsche 718 Boxster': 'Porsche_718',
      'Porsche 911': 'Porsche_911',
      'Porsche 911 Turbo': 'Porsche_911_Turbo',
      'Porsche 911 GT3': 'Porsche_911_GT3',
      'Porsche Panamera': 'Porsche_Panamera',
      'Porsche Cayenne': 'Porsche_Cayenne',
      'Porsche Cayenne Coupe': 'Porsche_Cayenne',
      'Porsche Macan': 'Porsche_Macan',
      'Porsche Macan Electric': 'Porsche_Macan_Electric',
      'Porsche Taycan': 'Porsche_Taycan',
      'Porsche Taycan Cross Turismo': 'Porsche_Taycan',
      
      // Hyundai
      'Hyundai Elantra': 'Hyundai_Elantra',
      'Hyundai Elantra Hybrid': 'Hyundai_Elantra',
      'Hyundai Elantra N': 'Hyundai_Elantra_N',
      'Hyundai Sonata': 'Hyundai_Sonata',
      'Hyundai Sonata Hybrid': 'Hyundai_Sonata',
      'Hyundai Venue': 'Hyundai_Venue',
      'Hyundai Kona': 'Hyundai_Kona',
      'Hyundai Kona Electric': 'Hyundai_Kona_Electric',
      'Hyundai Kona N': 'Hyundai_Kona_N',
      'Hyundai Tucson': 'Hyundai_Tucson',
      'Hyundai Tucson Hybrid': 'Hyundai_Tucson',
      'Hyundai Santa Fe': 'Hyundai_Santa_Fe',
      'Hyundai Santa Fe Hybrid': 'Hyundai_Santa_Fe',
      'Hyundai Palisade': 'Hyundai_Palisade',
      'Hyundai Santa Cruz': 'Hyundai_Santa_Cruz',
      'Hyundai Ioniq 5': 'Hyundai_Ioniq_5',
      'Hyundai Ioniq 5 N': 'Hyundai_Ioniq_5_N',
      'Hyundai Ioniq 6': 'Hyundai_Ioniq_6',
      'Hyundai Ioniq 9': 'Hyundai_Ioniq_7',
      
      // Kia
      'Kia Rio': 'Kia_Rio',
      'Kia K4': 'Kia_K4',
      'Kia K5': 'Kia_K5',
      'Kia Stinger': 'Kia_Stinger',
      'Kia Soul': 'Kia_Soul',
      'Kia Seltos': 'Kia_Seltos',
      'Kia Sportage': 'Kia_Sportage',
      'Kia Sportage Hybrid': 'Kia_Sportage',
      'Kia Sorento': 'Kia_Sorento',
      'Kia Sorento Hybrid': 'Kia_Sorento',
      'Kia Sorento SX Prestige': 'Kia_Sorento',
      'Kia Telluride': 'Kia_Telluride',
      'Kia Carnival': 'Kia_Carnival',
      'Kia Niro': 'Kia_Niro',
      'Kia Niro EV': 'Kia_Niro',
      'Kia EV5': 'Kia_EV5',
      'Kia EV6': 'Kia_EV6',
      'Kia EV6 GT': 'Kia_EV6',
      'Kia EV9': 'Kia_EV9',
      'Kia Forte': 'Kia_Forte',
      
      // Genesis
      'Genesis G70': 'Genesis_G70',
      'Genesis G70 Shooting Brake': 'Genesis_G70',
      'Genesis G80': 'Genesis_G80',
      'Genesis Electrified G80': 'Genesis_G80',
      'Genesis G90': 'Genesis_G90',
      'Genesis GV60': 'Genesis_GV60',
      'Genesis GV60 Performance': 'Genesis_GV60',
      'Genesis GV70': 'Genesis_GV70',
      'Genesis Electrified GV70': 'Genesis_GV70',
      'Genesis GV80': 'Genesis_GV80',
      'Genesis GV80 Coupe': 'Genesis_GV80',
      
      // Subaru
      'Subaru Impreza': 'Subaru_Impreza',
      'Subaru Legacy': 'Subaru_Legacy',
      'Subaru Crosstrek': 'Subaru_Crosstrek',
      'Subaru Crosstrek Hybrid': 'Subaru_Crosstrek',
      'Subaru Crosstrek Wilderness': 'Subaru_Crosstrek',
      'Subaru Forester': 'Subaru_Forester',
      'Subaru Forester Wilderness': 'Subaru_Forester',
      'Subaru Outback': 'Subaru_Outback',
      'Subaru Outback Wilderness': 'Subaru_Outback',
      'Subaru Ascent': 'Subaru_Ascent',
      'Subaru Solterra': 'Subaru_Solterra',
      'Subaru BRZ': 'Subaru_BRZ',
      'Subaru WRX': 'Subaru_WRX',
      'Subaru WRX TR': 'Subaru_WRX',
      
      // Nissan
      'Nissan Versa': 'Nissan_Versa',
      'Nissan Sentra': 'Nissan_Sentra',
      'Nissan Altima': 'Nissan_Altima',
      'Nissan Z': 'Nissan_Z',
      'Nissan Z Nismo': 'Nissan_Z',
      'Nissan GT-R': 'Nissan_GT-R',
      'Nissan Kicks': 'Nissan_Kicks',
      'Nissan Rogue': 'Nissan_Rogue',
      'Nissan Rogue SL': 'Nissan_Rogue',
      'Nissan Murano': 'Nissan_Murano',
      'Nissan Pathfinder': 'Nissan_Pathfinder',
      'Nissan Pathfinder Rock Creek': 'Nissan_Pathfinder',
      'Nissan Armada': 'Nissan_Armada',
      'Nissan Frontier': 'Nissan_Frontier',
      'Nissan Leaf': 'Nissan_Leaf',
      'Nissan Ariya': 'Nissan_Ariya',
      'Nissan Titan': 'Nissan_Titan',
      
      // Mazda
      'Mazda3 Sedan': 'Mazda3',
      'Mazda3 Hatchback': 'Mazda3',
      'Mazda 3': 'Mazda3',
      'Mazda 3 Hatchback': 'Mazda3',
      'Mazda CX-30': 'Mazda_CX-30',
      'Mazda CX-5': 'Mazda_CX-5',
      'Mazda CX-5 Turbo': 'Mazda_CX-5',
      'Mazda CX-50': 'Mazda_CX-50',
      'Mazda CX-50 Meridian': 'Mazda_CX-50',
      'Mazda CX-50 Meridian Edition': 'Mazda_CX-50',
      'Mazda CX-70': 'Mazda_CX-70',
      'Mazda CX-90': 'Mazda_CX-90',
      'Mazda CX-90 PHEV': 'Mazda_CX-90',
      'Mazda CX-90 PHEV Premium': 'Mazda_CX-90',
      'Mazda MX-5 Miata': 'Mazda_MX-5',
      'Mazda MX-5 Miata RF': 'Mazda_MX-5',
      
      // Volkswagen
      'Volkswagen Jetta': 'Volkswagen_Jetta',
      'Volkswagen Jetta GLI': 'Volkswagen_Jetta',
      'Volkswagen Jetta Sport': 'Volkswagen_Jetta',
      'Volkswagen Arteon': 'Volkswagen_Arteon',
      'Volkswagen Golf GTI': 'Volkswagen_Golf',
      'Volkswagen Golf R': 'Volkswagen_Golf_R',
      'Volkswagen Taos': 'Volkswagen_Taos',
      'Volkswagen Tiguan': 'Volkswagen_Tiguan',
      'Volkswagen Atlas': 'Volkswagen_Atlas',
      'Volkswagen Atlas Cross Sport': 'Volkswagen_Atlas_Cross_Sport',
      'Volkswagen Atlas Peak Edition': 'Volkswagen_Atlas',
      'Volkswagen ID.4': 'Volkswagen_ID.4',
      'Volkswagen ID.4 Pro S': 'Volkswagen_ID.4',
      'Volkswagen ID.Buzz': 'Volkswagen_ID._Buzz',
      'Volkswagen ID.Buzz LWB': 'Volkswagen_ID._Buzz',
      
      // Volvo
      'Volvo S60': 'Volvo_S60',
      'Volvo S60 Recharge': 'Volvo_S60',
      'Volvo S90': 'Volvo_S90',
      'Volvo V60': 'Volvo_V60',
      'Volvo V60 Cross Country': 'Volvo_V60',
      'Volvo V90': 'Volvo_V90',
      'Volvo V90 Cross Country': 'Volvo_V90',
      'Volvo XC40': 'Volvo_XC40',
      'Volvo XC40 Recharge': 'Volvo_XC40',
      'Volvo C40 Recharge': 'Volvo_C40_Recharge',
      'Volvo XC60': 'Volvo_XC60',
      'Volvo XC60 Recharge': 'Volvo_XC60',
      'Volvo XC90': 'Volvo_XC90',
      'Volvo XC90 Recharge': 'Volvo_XC90',
      'Volvo EX30': 'Volvo_EX30',
      'Volvo EX90': 'Volvo_EX90',
      
      // Cadillac
      'Cadillac CT4': 'Cadillac_CT4',
      'Cadillac CT4-V': 'Cadillac_CT4',
      'Cadillac CT4-V Blackwing': 'Cadillac_CT4-V_Blackwing',
      'Cadillac CT5': 'Cadillac_CT5',
      'Cadillac CT5-V': 'Cadillac_CT5',
      'Cadillac CT5-V Blackwing': 'Cadillac_CT5-V_Blackwing',
      'Cadillac XT4': 'Cadillac_XT4',
      'Cadillac XT5': 'Cadillac_XT5',
      'Cadillac XT6': 'Cadillac_XT6',
      'Cadillac Escalade': 'Cadillac_Escalade',
      'Cadillac Escalade ESV': 'Cadillac_Escalade',
      'Cadillac Escalade-V': 'Cadillac_Escalade',
      'Cadillac Escalade IQ': 'Cadillac_Escalade_IQ',
      'Cadillac Lyriq': 'Cadillac_Lyriq',
      'Cadillac Lyriq-V': 'Cadillac_Lyriq',
      'Cadillac Optiq': 'Cadillac_Optiq',
      'Cadillac Vistiq': 'Cadillac_Vistiq',
      'Cadillac Celestiq': 'Cadillac_Celestiq',
      
      // Lincoln
      'Lincoln Corsair': 'Lincoln_Corsair',
      'Lincoln Corsair Grand Touring': 'Lincoln_Corsair',
      'Lincoln Corsair Reserve': 'Lincoln_Corsair',
      'Lincoln Nautilus': 'Lincoln_Nautilus',
      'Lincoln Nautilus Reserve': 'Lincoln_Nautilus',
      'Lincoln Aviator': 'Lincoln_Aviator',
      'Lincoln Aviator Grand Touring': 'Lincoln_Aviator',
      'Lincoln Aviator Black Label': 'Lincoln_Aviator',
      'Lincoln Navigator': 'Lincoln_Navigator',
      'Lincoln Navigator Black Label': 'Lincoln_Navigator',
      
      // Infiniti
      'Infiniti Q50': 'Infiniti_Q50',
      'Infiniti Q50 Red Sport 400': 'Infiniti_Q50',
      'Infiniti Q60': 'Infiniti_Q60',
      'Infiniti Q60 Red Sport 400': 'Infiniti_Q60',
      'Infiniti QX50': 'Infiniti_QX50',
      'Infiniti QX55': 'Infiniti_QX55',
      'Infiniti QX60': 'Infiniti_QX60',
      'Infiniti QX80': 'Infiniti_QX80',
      
      // Buick
      'Buick Envista': 'Buick_Envista',
      'Buick Encore GX': 'Buick_Encore_GX',
      'Buick Envision': 'Buick_Envision',
      'Buick Enclave': 'Buick_Enclave',
      
      // Jaguar
      'Jaguar F-Type': 'Jaguar_F-Type',
      'Jaguar E-Pace': 'Jaguar_E-Pace',
      'Jaguar F-Pace': 'Jaguar_F-Pace',
      'Jaguar F-PACE': 'Jaguar_F-Pace',
      'Jaguar I-Pace': 'Jaguar_I-Pace',
      'Jaguar I-PACE': 'Jaguar_I-Pace',
      
      // Land Rover
      'Land Rover Defender 90': 'Land_Rover_Defender',
      'Land Rover Defender 110': 'Land_Rover_Defender',
      'Land Rover Defender 130': 'Land_Rover_Defender',
      'Land Rover Discovery': 'Land_Rover_Discovery',
      'Range Rover Velar': 'Range_Rover_Velar',
      'Range Rover Sport': 'Range_Rover_Sport',
      'Range Rover': 'Range_Rover',
      
      // Rivian
      'Rivian R1T': 'Rivian_R1T',
      'Rivian R1S': 'Rivian_R1S',
      
      // Lucid
      'Lucid Air': 'Lucid_Air',
      'Lucid Air Sapphire': 'Lucid_Air',
      
      // Polestar
      'Polestar 2': 'Polestar_2',
      'Polestar 3': 'Polestar_3',
      'Polestar 4': 'Polestar_4',
      
      // Exotic brands
      'Ferrari Roma': 'Ferrari_Roma',
      'Ferrari Roma Spider': 'Ferrari_Roma',
      'Ferrari 296 GTB': 'Ferrari_296_GTB',
      'Ferrari 296 GTS': 'Ferrari_296_GTS',
      'Ferrari SF90 Stradale': 'Ferrari_SF90_Stradale',
      'Ferrari 812 Competizione': 'Ferrari_812_Competizione',
      'Ferrari Purosangue': 'Ferrari_Purosangue',
      'Lamborghini Huracán': 'Lamborghini_Huracán',
      'Lamborghini Revuelto': 'Lamborghini_Revuelto',
      'Lamborghini Urus': 'Lamborghini_Urus',
      'McLaren Artura': 'McLaren_Artura',
      'McLaren GT': 'McLaren_GT',
      'McLaren 750S': 'McLaren_750S',
      'McLaren 750S Spider': 'McLaren_750S',
      'Aston Martin Vantage': 'Aston_Martin_Vantage_(2018)',
      'Aston Martin DB12': 'Aston_Martin_DB12',
      'Aston Martin DB12 Volante': 'Aston_Martin_DB12',
      'Aston Martin DBS': 'Aston_Martin_DBS_Superleggera',
      'Aston Martin DBX': 'Aston_Martin_DBX',
      'Aston Martin DBX707': 'Aston_Martin_DBX',
      'Aston Martin Vanquish': 'Aston_Martin_Vanquish',
      'Bentley Continental GT': 'Bentley_Continental_GT',
      'Bentley Continental GTC': 'Bentley_Continental_GT',
      'Bentley Flying Spur': 'Bentley_Flying_Spur',
      'Bentley Bentayga': 'Bentley_Bentayga',
      'Rolls-Royce Ghost': 'Rolls-Royce_Ghost',
      'Rolls-Royce Phantom': 'Rolls-Royce_Phantom_(eighth_generation)',
      'Rolls-Royce Cullinan': 'Rolls-Royce_Cullinan',
      'Rolls-Royce Spectre': 'Rolls-Royce_Spectre',
      'Maserati Ghibli': 'Maserati_Ghibli_(M157)',
      'Maserati Quattroporte': 'Maserati_Quattroporte',
      'Maserati GranTurismo': 'Maserati_GranTurismo',
      'Maserati MC20': 'Maserati_MC20',
      'Maserati Grecale': 'Maserati_Grecale',
      'Maserati Levante': 'Maserati_Levante',
      
      // Others
      'Alfa Romeo Giulia': 'Alfa_Romeo_Giulia_(952)',
      'Alfa Romeo Giulia Quadrifoglio': 'Alfa_Romeo_Giulia_(952)',
      'Alfa Romeo Stelvio': 'Alfa_Romeo_Stelvio',
      'Alfa Romeo Stelvio Quadrifoglio': 'Alfa_Romeo_Stelvio',
      'Alfa Romeo Tonale': 'Alfa_Romeo_Tonale',
      'Mini Cooper': 'Mini_Cooper',
      'Mini Cooper Electric': 'Mini_Cooper',
      'Mini Convertible': 'Mini_Cooper',
      'Mini Countryman': 'Mini_Countryman',
      'Mini Countryman Electric': 'Mini_Countryman',
      'Mitsubishi Mirage': 'Mitsubishi_Mirage',
      'Mitsubishi Eclipse Cross': 'Mitsubishi_Eclipse_Cross',
      'Mitsubishi Outlander': 'Mitsubishi_Outlander',
      'Mitsubishi Outlander PHEV': 'Mitsubishi_Outlander_PHEV',
      'Fiat 500e': 'Fiat_500_electric',
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

  // Filter vehicles by budget - uses prices from vehicleDatabase
  const filterVehiclesByBudget = (vehicles: string[], budgetLevel: number): string[] => {
    const maxBudget = getBudgetMax(budgetLevel);
    return vehicles.map(v => {
      // Find vehicle in database to get accurate MSRP
      const dbVehicle = vehicleDatabase.find(dbv => dbv.name === v);
      const price = dbVehicle?.price || 50; // fallback to $50k if not found
      if (price <= maxBudget) return v;
      return `Used ${v}`;
    });
  };


  // Questions array - Redesigned with Practical Needs + Personal Values
  const allQuestions = [
    // ============================================
    // SECTION 1: PRACTICAL NEEDS (What your life requires)
    // ============================================
    { id: 'budget', question: 'What is your budget?', icon: '💰', type: 'single', section: 'practical', options: [
      { label: 'Under $25,000', value: 'under-25k' },
      { label: '$25,000 - $35,000', value: '25k-35k' },
      { label: '$35,000 - $50,000', value: '35k-50k' },
      { label: '$50,000 - $75,000', value: '50k-75k' },
      { label: '$75,000 - $100,000', value: '75k-100k' },
      { label: '$100,000 - $200,000', value: '100k-200k' },
      { label: '$200,000+', value: '200k-plus' }
    ] },
    { id: 'passengers', question: 'How many passengers do you regularly transport?', icon: '👥', type: 'single', section: 'practical', options: [
      { label: 'Just me most of the time', value: '1' },
      { label: '1-2 passengers regularly', value: '2-3' },
      { label: '3-4 passengers (family)', value: '4-5' },
      { label: '5+ passengers often', value: '6+' }
    ] },
    { id: 'primary-use', question: 'What will you primarily use this vehicle for?', icon: '🎯', type: 'multiple', maxSelect: 2, section: 'practical', options: [
      { label: 'Daily commuting to work', value: 'commute' },
      { label: 'Family transportation', value: 'family' },
      { label: 'Work/business use', value: 'work' },
      { label: 'Weekend fun & recreation', value: 'recreation' },
      { label: 'Adventure & exploration', value: 'adventure' }
    ] },
    { id: 'commute-distance', question: 'How far is your typical daily drive?', icon: '📏', type: 'single', section: 'practical', options: [
      { label: 'Under 10 miles', value: 'short' },
      { label: '10-30 miles', value: 'medium' },
      { label: '30-50 miles', value: 'long' },
      { label: '50+ miles', value: 'very-long' },
      { label: 'No regular commute', value: 'none' }
    ] },
    { id: 'driving-environment', question: 'Where do you drive most often?', icon: '🏙️', type: 'multiple', maxSelect: 2, section: 'practical', options: [
      { label: 'City streets & traffic', value: 'city' },
      { label: 'Suburban neighborhoods', value: 'suburban' },
      { label: 'Rural roads & countryside', value: 'rural' },
      { label: 'Mostly highway driving', value: 'highway' },
      { label: 'Mix of everything', value: 'mixed' }
    ] },
    { id: 'weather', question: 'What weather do you regularly drive in?', icon: '🌤️', type: 'multiple', maxSelect: 2, section: 'practical', options: [
      { label: 'Mostly sunny and dry', value: 'dry' },
      { label: 'Frequent rain', value: 'rain' },
      { label: 'Heavy snow and ice', value: 'snow' },
      { label: 'All seasons - everything', value: 'all' }
    ] },
    { id: 'cargo-towing', question: 'What do you need to haul or tow?', icon: '📦', type: 'multiple', maxSelect: 2, section: 'practical', options: [
      { label: 'Just personal items and groceries', value: 'minimal' },
      { label: 'Sports gear, luggage, larger items', value: 'moderate' },
      { label: 'Bikes, kayaks, equipment regularly', value: 'large' },
      { label: 'Need to tow trailer/boat/camper', value: 'towing' },
      { label: 'Heavy duty work hauling', value: 'heavy' }
    ] },
    { id: 'parking', question: "What's your parking situation?", icon: '🅿️', type: 'single', section: 'practical', options: [
      { label: "Garage - size doesn't matter", value: 'garage' },
      { label: 'Street parking - need to be maneuverable', value: 'street' },
      { label: 'Parking lots - standard spaces', value: 'lot' },
      { label: 'Tight urban spaces often', value: 'tight' }
    ] },

    // ============================================
    // SECTION 2: PERSONAL VALUES (What matters to YOU)
    // ============================================
    { id: 'driving-experience', question: 'What kind of driving experience do you want?', icon: '🛞', type: 'single', section: 'values', options: [
      { label: 'Smooth & comfortable - isolate me from the road', value: 'comfort' },
      { label: 'Engaging & responsive - I want to feel connected', value: 'engaging' },
      { label: 'Balanced - comfort with some fun', value: 'balanced' },
      { label: 'Efficient & economical - maximize every mile', value: 'efficient' },
      { label: 'Commanding & capable - sit high, see everything', value: 'commanding' }
    ] },
    { id: 'vehicle-character', question: 'What personality should your vehicle have?', icon: '✨', type: 'multiple', maxSelect: 2, section: 'values', options: [
      { label: 'Rugged & capable - ready for anything', value: 'rugged' },
      { label: 'Sleek & sophisticated - refined elegance', value: 'sophisticated' },
      { label: 'Sporty & aggressive - performance-focused', value: 'sporty' },
      { label: 'Practical & sensible - reliable workhorse', value: 'practical' },
      { label: 'Tech-forward & modern - cutting edge', value: 'tech' },
      { label: 'Classic & timeless - proven design', value: 'classic' }
    ] },
    { id: 'capability-preference', question: 'How do you feel about capability you might not use daily?', icon: '🏔️', type: 'single', section: 'values', options: [
      { label: 'Love it - I want off-road/towing power even if I rarely use it', value: 'want-capability' },
      { label: 'Nice to have - extra capability is a bonus', value: 'like-capability' },
      { label: "Neutral - I'll take what fits my actual needs", value: 'neutral' },
      { label: 'Prefer efficiency - extra capability is wasted weight and money', value: 'prefer-efficiency' }
    ] },
    { id: 'status-image', question: 'How important is what your vehicle says about you?', icon: '👔', type: 'single', section: 'values', options: [
      { label: 'Very important - reflects my success and taste', value: 'very-important' },
      { label: 'Somewhat - I want something respectable', value: 'somewhat' },
      { label: 'Not really - as long as it works well', value: 'not-really' },
      { label: 'Anti-status - I prefer understated and practical', value: 'anti-status' }
    ] },
    { id: 'environmental-values', question: 'How important are environmental considerations?', icon: '🌱', type: 'single', section: 'values', options: [
      { label: 'Top priority - must be electric or hybrid', value: 'top-priority' },
      { label: 'Important - prefer efficient options', value: 'important' },
      { label: 'Balanced - consider it among other factors', value: 'balanced' },
      { label: 'Not a priority - other factors matter more', value: 'not-priority' }
    ] },
    { id: 'reliability-vs-innovation', question: 'Reliability vs. cutting-edge features?', icon: '🔧', type: 'single', section: 'values', options: [
      { label: 'Proven reliability - tried and true technology', value: 'reliability' },
      { label: 'Balanced - new features on a reliable platform', value: 'balanced' },
      { label: "Cutting edge - I want the latest even if it's newer", value: 'innovation' }
    ] },
    { id: 'emotional-connection', question: 'Which statement resonates most with you?', icon: '💭', type: 'single', section: 'values', options: [
      { label: '"I want to look forward to driving every day"', value: 'driving-joy' },
      { label: '"I want something that handles everything life throws at it"', value: 'versatility' },
      { label: '"I want to feel safe and protected on the road"', value: 'safety' },
      { label: '"I want to make a smart, practical investment"', value: 'practical' },
      { label: '"I want to stand out and express my personality"', value: 'expression' },
      { label: '"I want adventure-ready capability even for weekends"', value: 'adventure' }
    ] },
    { id: 'ownership-priorities', question: 'What matters most during ownership?', icon: '📊', type: 'multiple', maxSelect: 2, section: 'values', options: [
      { label: 'Low maintenance costs', value: 'low-maintenance' },
      { label: 'Strong resale value', value: 'resale' },
      { label: 'Comprehensive warranty', value: 'warranty' },
      { label: 'Premium ownership experience', value: 'premium-experience' },
      { label: 'Lowest total cost of ownership', value: 'low-tco' },
      { label: 'Fun factor outweighs costs', value: 'fun-factor' }
    ] },

    // ============================================
    // SECTION 3: SPECIFIC PREFERENCES (Hard filters)
    // ============================================
    { id: 'body-style', question: "Any body styles you're specifically interested in?", icon: '🚗', type: 'multiple', section: 'preferences', maxSelect: 3, options: [
      { label: 'No preference - recommend based on my answers', value: 'recommend' },
      { label: 'Sedan', value: 'sedan' },
      { label: 'SUV / Crossover', value: 'suv' },
      { label: 'Truck (Full-size or Midsize)', value: 'truck' },
      { label: 'Off-Road SUV (Bronco, 4Runner, Wrangler)', value: 'offroad-suv' },
      { label: 'Coupe / Sports Car', value: 'coupe' },
      { label: 'Hatchback', value: 'hatchback' },
      { label: 'Wagon', value: 'wagon' },
      { label: 'Minivan', value: 'minivan' },
      { label: 'Convertible', value: 'convertible' }
    ] },
    { id: 'brand', question: 'Any brands you prefer?', icon: '🏷️', type: 'multiple', section: 'preferences', options: [
      { label: 'No preference', value: 'none' },
      { label: 'Toyota', value: 'toyota' }, { label: 'Honda', value: 'honda' }, { label: 'Ford', value: 'ford' },
      { label: 'Chevrolet', value: 'chevrolet' }, { label: 'BMW', value: 'bmw' }, { label: 'Mercedes', value: 'mercedes' },
      { label: 'Audi', value: 'audi' }, { label: 'Tesla', value: 'tesla' }, { label: 'Lexus', value: 'lexus' },
      { label: 'Porsche', value: 'porsche' }, { label: 'Ferrari', value: 'ferrari' }, { label: 'Lamborghini', value: 'lamborghini' },
      { label: 'McLaren', value: 'mclaren' }, { label: 'Aston Martin', value: 'aston-martin' }, { label: 'Bentley', value: 'bentley' },
      { label: 'Rolls-Royce', value: 'rolls-royce' }, { label: 'Maserati', value: 'maserati' },
      { label: 'Mazda', value: 'mazda' }, { label: 'Subaru', value: 'subaru' }, { label: 'Hyundai', value: 'hyundai' },
      { label: 'Kia', value: 'kia' }, { label: 'Jeep', value: 'jeep' }, { label: 'Ram', value: 'ram' },
      { label: 'GMC', value: 'gmc' }, { label: 'Nissan', value: 'nissan' }, { label: 'Volvo', value: 'volvo' }
    ] },
    { id: 'powertrain', question: 'Any powertrain preference?', icon: '🔋', type: 'single', section: 'preferences', options: [
      { label: 'No preference', value: 'any' },
      { label: 'Traditional gas - proven and convenient', value: 'gas' },
      { label: 'Hybrid - best of both worlds', value: 'hybrid' },
      { label: 'Plug-in hybrid - electric commute, gas for trips', value: 'phev' },
      { label: 'Full electric - zero emissions', value: 'electric' }
    ] },
    { id: 'must-haves', question: 'Any features that are absolute must-haves?', icon: '⭐', type: 'multiple', maxSelect: 4, section: 'preferences', options: [
      { label: 'None specifically', value: 'none' },
      { label: 'All-wheel drive / 4WD', value: 'awd' },
      { label: 'Apple CarPlay / Android Auto', value: 'carplay' },
      { label: 'Heated seats', value: 'heated-seats' },
      { label: 'Sunroof / moonroof', value: 'sunroof' },
      { label: 'Premium audio system', value: 'audio' },
      { label: 'Adaptive cruise control', value: 'acc' },
      { label: 'Third row seating', value: 'third-row' },
      { label: 'Leather interior', value: 'leather' }
    ] }
  ];

  // Vehicle type definitions
  const vehicleTypes = {
    micro: { name: 'City Car', vehicles: ['Chevrolet Spark', 'Mitsubishi Mirage', 'Fiat 500e', 'Mini Cooper', 'Nissan Versa'], description: 'Compact, fuel-efficient vehicles perfect for urban environments', features: ['Easy parking', 'Excellent fuel economy', 'Low cost of ownership', 'Perfect for city driving', 'Affordable pricing'] },
    hatchback: { name: 'Hatchback', vehicles: ['Volkswagen Golf GTI', 'Mazda 3', 'Honda Civic Hatchback', 'Toyota Corolla Hatchback', 'Hyundai Veloster N'], description: 'Versatile cars combining practicality with fun driving dynamics', features: ['Versatile cargo space', 'Fun to drive', 'Good fuel economy', 'Practical daily driver', 'Sporty handling'] },
    crossover: { name: 'Compact Crossover', vehicles: ['Mazda CX-30', 'Kia Seltos', 'Hyundai Kona', 'Toyota Corolla Cross', 'Honda HR-V'], description: 'The perfect blend of sedan efficiency and SUV versatility', features: ['Higher seating position', 'Good cargo space', 'Fuel efficient', 'Easy to maneuver', 'Modern styling'] },
    sedan: { name: 'Sedan', vehicles: ['Honda Accord', 'Toyota Camry', 'Mazda 6', 'Hyundai Sonata', 'Nissan Altima', 'Kia K5', 'Subaru Legacy', 'Volkswagen Passat', 'Honda Civic', 'Toyota Corolla', 'Hyundai Elantra', 'Mazda 3 Sedan'], description: 'Classic four-door comfort with excellent value and reliability', features: ['Comfortable ride', 'Good trunk space', 'Fuel efficient', 'Reliable', 'Smooth handling'] },
    coupe: { name: 'Sports Coupe', vehicles: ['Ford Mustang', 'Chevrolet Camaro', 'BMW 4 Series', 'Nissan Z', 'Toyota GR86'], description: 'Sporty two-door vehicles focused on style and performance', features: ['Head-turning style', 'Powerful engines', 'Engaging driving', 'Sport-tuned suspension', 'Premium interiors'] },
    midsizeSuv: { name: 'Midsize SUV', vehicles: ['Toyota RAV4', 'Honda CR-V', 'Mazda CX-5', 'Ford Bronco Sport', 'Hyundai Tucson', 'Kia Sportage', 'Subaru Forester', 'Nissan Rogue', 'Chevrolet Equinox', 'Volkswagen Tiguan', 'Jeep Cherokee', 'GMC Terrain'], description: 'Popular family vehicles with excellent space and capability', features: ['Spacious interior', 'Good cargo capacity', 'Available AWD', 'Family friendly', 'Safety features'] },
    suv: { name: 'Full-Size SUV', vehicles: ['Toyota Highlander', 'Honda Pilot', 'Ford Explorer', 'Chevrolet Tahoe', 'Kia Telluride', 'Hyundai Palisade', 'Mazda CX-90', 'Toyota Grand Highlander', 'Jeep Grand Cherokee', 'Nissan Pathfinder', 'Subaru Ascent', 'Chevrolet Traverse', 'GMC Yukon', 'Ford Expedition'], description: 'Large SUVs offering maximum space and towing capability', features: ['Third row seating', 'Towing capacity', 'Premium features', 'Commanding presence', 'Family oriented'] },
    midsizeTruck: { name: 'Midsize Truck', vehicles: ['Toyota Tacoma', 'Ford Ranger', 'Chevrolet Colorado', 'Jeep Gladiator', 'GMC Canyon', 'Honda Ridgeline', 'Nissan Frontier', 'Hyundai Santa Cruz'], description: 'Versatile trucks that balance capability with daily drivability', features: ['Truck bed utility', 'Off-road capability', 'Manageable size', 'Towing capacity', 'Adventure ready'] },
    truck: { name: 'Full-Size Truck', vehicles: ['Ford F-150', 'Chevrolet Silverado 1500', 'Ram 1500', 'Toyota Tundra', 'GMC Sierra 1500', 'Nissan Titan', 'Ford F-250', 'Chevrolet Silverado 2500', 'Ram 2500', 'Toyota Tundra Hybrid'], description: 'Maximum capability for work and play', features: ['Heavy towing', 'Large bed', 'Powerful engines', 'Work capability', 'Premium options'] },
    minivan: { name: 'Minivan', vehicles: ['Honda Odyssey', 'Toyota Sienna', 'Kia Carnival', 'Chrysler Pacifica', 'Chrysler Voyager'], description: 'The ultimate family vehicle with unmatched practicality', features: ['Sliding doors', 'Maximum interior space', 'Family features', 'Comfortable seating', 'Storage solutions'] },
    van: { name: 'Cargo/Passenger Van', vehicles: ['Ford Transit', 'Mercedes-Benz Sprinter', 'Ram ProMaster', 'Chevrolet Express', 'Nissan NV Cargo'], description: 'Commercial-grade vehicles for work or conversion', features: ['Maximum cargo space', 'High roof options', 'Customizable', 'Commercial ready', 'Conversion friendly'] },
    wagon: { name: 'Wagon', vehicles: ['Volvo V60', 'Audi A4 Allroad', 'Subaru Outback', 'Volvo V90', 'Mercedes-Benz E-Class Wagon'], description: 'Car-like driving with SUV-level cargo space', features: ['Low loading floor', 'Excellent handling', 'Cargo versatility', 'Unique styling', 'Premium feel'] },
    sport: { name: 'Sports Car', vehicles: ['Chevrolet Corvette', 'Porsche 911', 'BMW M3', 'Audi RS5', 'Mercedes-AMG GT'], description: 'High-performance vehicles for enthusiasts', features: ['Thrilling performance', 'Track capable', 'Precise handling', 'Premium materials', 'Head-turning design'] },
    roadster: { name: 'Roadster', vehicles: ['Mazda MX-5 Miata', 'Porsche 718 Boxster', 'BMW Z4', 'Chevrolet Corvette Convertible', 'Jaguar F-Type'], description: 'Open-top driving pleasure in pure form', features: ['Convertible top', 'Engaging driving', 'Lightweight', 'Classic styling', 'Wind in your hair'] },
    hyper: { name: 'Hypercar', vehicles: ['Bugatti Chiron', 'Koenigsegg Jesko', 'Lamborghini Revuelto', 'Ferrari SF90 Stradale', 'McLaren 765LT'], description: 'The absolute pinnacle of automotive engineering and performance', features: ['Extreme performance', 'Cutting-edge tech', 'Exclusive', 'Investment grade', 'Breathtaking design'] },
    muscle: { name: 'Muscle Car', vehicles: ['Dodge Challenger', 'Ford Mustang GT', 'Chevrolet Camaro SS', 'Dodge Charger', 'Ford Mustang Mach 1'], description: 'American power and heritage with modern capability', features: ['V8 power', 'Aggressive styling', 'American heritage', 'Straight-line speed', 'Bold presence'] }
  };

  // Calculate recommendation using new scoring system
  const calculateRecommendation = () => {
    // Map answers to preferences format - includes both practical needs AND personal values
    const preferences = {
      // Practical needs
      budget: answers['budget'],
      bodyStyle: answers['body-style'] || [],
      brand: answers['brand'] || [],
      passengers: answers['passengers'],
      primaryUse: answers['primary-use'],
      weather: answers['weather'],
      commute: answers['commute-distance'],
      drivingEnvironment: answers['driving-environment'],
      cargoTowing: answers['cargo-towing'],
      powertrain: answers['powertrain'],
      parkingSpace: answers['parking'],
      mustHaves: answers['must-haves'] || [],
      
      // Personal values - NEW
      drivingExperience: answers['driving-experience'],
      vehicleCharacter: answers['vehicle-character'],
      capabilityPreference: answers['capability-preference'],
      statusImage: answers['status-image'],
      environmentalValues: answers['environmental-values'],
      reliabilityVsInnovation: answers['reliability-vs-innovation'],
      emotionalConnection: answers['emotional-connection'],
      ownershipPriorities: answers['ownership-priorities'] || [],
    };

    // Score all vehicles
    const scoredVehicles = scoreVehicles(preferences);
    
    // Get top 10 vehicles
    const topVehicles = scoredVehicles.slice(0, 10);
    
    // Get category info
    const categoryInfo = getCategoryName(topVehicles);
    
    // Extract vehicle names for display
    const vehicleNames = topVehicles.map(sv => sv.vehicle.name);
    
    // Collect top reasons from best matches
    const allReasons: string[] = [];
    topVehicles.slice(0, 3).forEach(sv => {
      sv.matchReasons.forEach(reason => {
        if (!allReasons.includes(reason)) {
          allReasons.push(reason);
        }
      });
    });

    // Generate features based on top vehicle
    const topVehicle = topVehicles[0]?.vehicle;
    const features = topVehicle ? [
      topVehicle.features.includes('awd') || topVehicle.features.includes('awd-available') ? 'Available AWD' : null,
      topVehicle.powertrain === 'ev' ? 'Electric powertrain' : topVehicle.powertrain === 'hybrid' ? 'Hybrid efficiency' : null,
      topVehicle.seats >= 7 ? 'Third row seating' : topVehicle.seats >= 5 ? 'Comfortable seating' : null,
      topVehicle.features.includes('cargo') ? 'Good cargo space' : null,
      topVehicle.features.includes('towing') ? 'Towing capability' : null,
      topVehicle.features.includes('reliable') ? 'Known for reliability' : null,
      topVehicle.segment === 'premium' || topVehicle.segment === 'luxury' ? 'Premium quality' : null,
    ].filter(Boolean).slice(0, 5) : ['Matched to your preferences'];

    return {
      vehicleType: topVehicle?.bodyType || 'sedan',
      vehicleSizeName: categoryInfo.name,
      vehicles: vehicleNames.length > 0 ? vehicleNames : ['Honda Accord', 'Toyota Camry', 'Mazda 3'],
      description: categoryInfo.description,
      features: features as string[],
      reasoning: allReasons.slice(0, 5),
      answers: answers,
      timestamp: new Date().toISOString(),
      email: emailAddress,
      // Include scored vehicles for potential future use
      scoredVehicles: topVehicles,
    };
  };


  const handleAnswer = (qId: string, val: string) => {
    setAnswers({ ...answers, [qId]: val });
    if (testStep < allQuestions.length - 1) {
      setTestStep(testStep + 1);
    } else {
      showResults();
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
      showResults();
    }
  };

  const showResults = () => {
    const recommendation = calculateRecommendation();
    setResult(recommendation);
    // Save to localStorage
    try {
      localStorage.setItem('autoWizardResult', JSON.stringify(recommendation));
    } catch (e) {
      console.error('Failed to save result:', e);
    }
  };

  const submitEmailAndShowResults = () => {
    showResults();
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
    <div className="min-h-screen bg-white text-slate-900">
      <Navigation />

      {/* Tips Screen */}
      {showTips && (
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-6">
                <FileText className="w-8 h-8 text-amber-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Before You Start</h2>
              <p className="text-slate-500">Follow these tips for the most accurate results</p>
            </div>
            
            <div className="space-y-4 mb-10">
              {[
                { title: 'Think About Daily Life', desc: 'Your typical week, not rare occasions' },
                { title: 'Be Honest', desc: 'What fits your lifestyle, not what sounds cool' },
                { title: 'Plan Ahead', desc: 'Consider the next 3-5 years' },
                { title: 'All Questions Optional', desc: 'But more answers = better results' }
              ].map((tip, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{tip.title}</h3>
                    <p className="text-slate-500 text-sm">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4 text-slate-400 text-sm mb-2">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />3-5 minutes</span>
                <span className="flex items-center gap-1"><Shield className="w-4 h-4" />Your answers are private</span>
              </div>
              <button onClick={beginAssessment} className="group px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-lg font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25">
                <span className="flex items-center justify-center gap-2">Begin Assessment<ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              </button>
              <Link href="/" className="text-slate-400 hover:text-amber-600 flex items-center gap-2 mt-2"><ArrowLeft className="w-4 h-4" />Back to Home</Link>
            </div>
          </div>
        </div>
      )}

      {/* Questions */}
      {!showTips && !result && !showEmailCollection && (
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className={`transition-opacity duration-200 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-slate-400">Question {testStep + 1} of {allQuestions.length}</span>
                  <span className="text-sm font-medium text-amber-600">{Math.round(((testStep + 1) / allQuestions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500" style={{ width: `${((testStep + 1) / allQuestions.length) * 100}%` }} />
                </div>
              </div>
              
              {currentQ && (
                <>
                  <div className="mb-6">
                    <span className="text-4xl mb-4 block">{currentQ.icon}</span>
                    <h2 className="text-2xl font-semibold text-slate-900">{currentQ.question}</h2>
                    {isMultiple && <p className="text-amber-600/80 text-sm mt-2">{currentQ.maxSelect ? `Select up to ${currentQ.maxSelect}` : 'Select all that apply'}</p>}
                  </div>
                  
                  {isText ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={answers[currentQ.id] || ''}
                        onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
                        placeholder="Enter your 5-digit zip code"
                        maxLength={5}
                        className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-4 text-slate-900 text-center text-2xl tracking-widest focus:outline-none focus:border-amber-500"
                        onKeyDown={(e) => { if (e.key === 'Enter' && answers[currentQ.id]?.length === 5) { if (testStep < allQuestions.length - 1) setTestStep(testStep + 1); else showResults(); }}}
                      />
                      <button 
                        onClick={() => { if (testStep < allQuestions.length - 1) setTestStep(testStep + 1); else showResults(); }} 
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
                            <button key={i} onClick={() => handleMultiSelect(currentQ.id, o.value, currentQ.maxSelect)} className={`text-left p-3 border rounded-xl transition-all ${selected ? 'bg-amber-100 border-amber-500/60' : 'bg-slate-50 border-slate-200 hover:border-amber-300'}`}>
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'bg-amber-500 border-amber-500' : 'border-white/30'}`}>{selected && <Check className="w-3 h-3 text-black" />}</div>
                                <span className={`text-sm ${selected ? 'text-slate-900' : 'text-slate-600'}`}>{o.label}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button onClick={() => { if (testStep < allQuestions.length - 1) setTestStep(testStep + 1); else { showResults(); }}} disabled={getArr(answers[currentQ.id]).length === 0} className="flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">Continue <ChevronRight className="w-5 h-5" /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {currentQ.options.map((o, i) => (
                        <button key={i} onClick={() => handleAnswer(currentQ.id, o.value)} className="w-full text-left p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-amber-400 hover:bg-slate-50 transition-all group">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700 group-hover:text-slate-900">{o.label}</span>
                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
              
              <div className="mt-6 flex items-center justify-between">
                {testStep > 0 ? <button onClick={() => setTestStep(testStep - 1)} className="text-slate-400 hover:text-amber-600 flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Back</button> : <div></div>}
                {canSkip && <button onClick={skipQuestion} className="text-slate-400 hover:text-amber-600 flex items-center gap-2">Skip<ArrowRight className="w-4 h-4" /></button>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-600 text-sm mb-4"><Check className="w-4 h-4" />Complete</div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">Your Perfect Match</h2>
            <p className="text-2xl font-semibold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">{result.vehicleSizeName}</p>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
            <p className="text-lg text-slate-600 mb-8 text-center max-w-3xl mx-auto">{result.description}</p>
            
            <div className="mb-10">
              <h3 className="text-lg font-semibold mb-4 text-amber-600 text-center">Recommended Vehicles</h3>
              
              {/* Image Carousel */}
              <div className="relative max-w-2xl mx-auto">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  {isImageLoading(result.vehicles[vehicleImageIndex]) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                      <div className="flex flex-col items-center gap-3">
                        <RefreshCw className="w-8 h-8 text-amber-600 animate-spin" />
                        <span className="text-slate-500 text-sm">Loading image...</span>
                      </div>
                    </div>
                  )}
                  <img 
                    src={getVehicleImage(result.vehicles[vehicleImageIndex])} 
                    alt={result.vehicles[vehicleImageIndex]}
                    className="w-full h-full object-contain bg-slate-100"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x400/1a1a1a/ffd700?text=' + encodeURIComponent(result.vehicles[vehicleImageIndex]);
                    }}
                  />
                  
                  <button 
                    onClick={() => setVehicleImageIndex(prev => prev === 0 ? result.vehicles.length - 1 : prev - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center text-white transition-all hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button 
                    onClick={() => setVehicleImageIndex(prev => prev === result.vehicles.length - 1 ? 0 : prev + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center text-white transition-all hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-800 border border-slate-600 text-white text-sm">
                    {vehicleImageIndex + 1} / {result.vehicles.length}
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <h4 className="text-2xl font-bold text-slate-900">{result.vehicles[vehicleImageIndex]}</h4>
                </div>
                
                <div className="flex justify-center gap-2 mt-4">
                  {result.vehicles.map((_: string, i: number) => (
                    <button 
                      key={i}
                      onClick={() => setVehicleImageIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all ${i === vehicleImageIndex ? 'bg-amber-500 scale-110' : 'bg-slate-500 hover:bg-slate-600'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {result.reasoning.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4 text-amber-600 flex items-center gap-2"><Target className="w-5 h-5" />Why This Recommendation</h3>
                <ul className="space-y-2">{result.reasoning.map((r: string, i: number) => <li key={i} className="flex items-start gap-3 text-slate-600"><Check className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />{r}</li>)}</ul>
              </div>
            )}
            
            <div className="bg-slate-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-amber-600 flex items-center gap-2"><Star className="w-5 h-5" />Key Features</h3>
              <div className="grid md:grid-cols-2 gap-3">{result.features.map((f: string, i: number) => <div key={i} className="flex items-center gap-3 text-slate-600"><div className="w-2 h-2 rounded-full bg-amber-400" />{f}</div>)}</div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <button 
                onClick={() => {
                  const vehicleSlugs = result.vehicles.map((v: string) => v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')).join(',');
                  const params = new URLSearchParams();
                  params.set('vehicles', vehicleSlugs);
                  Object.entries(answers).forEach(([k, v]) => {
                    if (v) params.set(k, Array.isArray(v) ? v.join(',') : String(v));
                  });
                  const url = `${window.location.origin}/results?${params.toString()}`;
                  navigator.clipboard.writeText(url);
                  alert('Link copied! Share it with friends.');
                }} 
                className="px-6 py-3 rounded-xl border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                Share Results
              </button>
              <button onClick={() => setShowEmailModal(true)} className="px-6 py-3 rounded-xl border border-amber-500/50 text-amber-600 hover:bg-amber-500/10 flex items-center justify-center gap-2"><Mail className="w-5 h-5" />Email</button>
              <Link href="/consultation" className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 text-center">Schedule Consultation</Link>
              <button onClick={resetTest} className="px-6 py-3 rounded-xl border border-slate-300 text-slate-600 hover:border-amber-400 hover:text-amber-600">Retake</button>
            </div>
            
            {/* View Full Results Link */}
            <div className="mt-6 text-center">
              <Link 
                href={`/results?vehicles=${result.vehicles.map((v: string) => v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')).join(',')}&${Object.entries(answers).map(([k, v]) => `${k}=${Array.isArray(v) ? v.join(',') : v}`).join('&')}`}
                className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center justify-center gap-2"
              >
                View Detailed Results with Comparisons →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-slate-900 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Email Results</h3>
              <button onClick={() => setShowEmailModal(false)} className="text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            {emailSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-amber-600" />
                </div>
                <p className="text-lg text-slate-900">Sent!</p>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 mb-4 focus:outline-none focus:border-amber-500"
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
      <footer className="border-t border-slate-200 bg-slate-50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="Auto Wizard" className="h-16 w-auto" />
              </div>
              <p className="text-slate-500 text-sm">Your partner in finding the perfect vehicle.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900">Premium Services</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/services" className="hover:text-amber-600">Expert Consultation</Link></li>
                <li><Link href="/services" className="hover:text-amber-600">Customization Support</Link></li>
                <li><Link href="/services" className="hover:text-amber-600">Purchase Assistance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900">Free Services</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/" className="hover:text-amber-600">Wizard&apos;s Guide</Link></li>
                <li><Link href="/compare" className="hover:text-amber-600">Compare Cars</Link></li>
                <li><Link href="/quiz" className="hover:text-amber-600">The Car Quiz</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/consultation" className="flex items-center gap-2 hover:text-amber-600"><Mail className="w-4 h-4 text-amber-500" />autowizardcompany@gmail.com</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-6 text-center text-slate-400 text-sm">© 2026 Auto Wizard. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
