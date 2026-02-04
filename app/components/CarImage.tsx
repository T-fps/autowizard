'use client';

import { useState, useEffect } from 'react';

interface CarImageProps {
  vehicleName: string;
  brandColor: string;
  isExotic?: boolean;
  bodyType?: string;
  showLabel?: boolean;
}

// Complete Wikipedia title mappings for all vehicles in database
const wikiTitleMappings: Record<string, string> = {
  // ==================== ACURA ====================
  'Acura Integra': 'Acura_Integra',
  'Acura MDX': 'Acura_MDX',
  'Acura RDX': 'Acura_RDX',
  'Acura RDX A-Spec Advance': 'Acura_RDX',
  'Acura TLX': 'Acura_TLX',
  'Acura NSX': 'Honda_NSX_(second_generation)',

  // ==================== ALFA ROMEO ====================
  'Alfa Romeo Giulia': 'Alfa_Romeo_Giulia_(952)',
  'Alfa Romeo Stelvio': 'Alfa_Romeo_Stelvio',
  'Alfa Romeo Tonale': 'Alfa_Romeo_Tonale',

  // ==================== ASTON MARTIN ====================
  'Aston Martin DB11': 'Aston_Martin_DB11',
  'Aston Martin DB12': 'Aston_Martin_DB12',
  'Aston Martin DB12 Volante': 'Aston_Martin_DB12',
  'Aston Martin DBS': 'Aston_Martin_DBS_Superleggera',
  'Aston Martin DBX': 'Aston_Martin_DBX',
  'Aston Martin DBX707': 'Aston_Martin_DBX',
  'Aston Martin Valhalla': 'Aston_Martin_Valhalla',
  'Aston Martin Valkyrie': 'Aston_Martin_Valkyrie',
  'Aston Martin Vantage': 'Aston_Martin_Vantage_(2018)',
  'Aston Martin Vantage Roadster': 'Aston_Martin_Vantage_(2018)',

  // ==================== AUDI ====================
  'Audi A3': 'Audi_A3',
  'Audi A4': 'Audi_A4',
  'Audi A4 Allroad': 'Audi_A4_allroad_quattro',
  'Audi A5': 'Audi_A5',
  'Audi A6': 'Audi_A6',
  'Audi A7': 'Audi_A7',
  'Audi A8': 'Audi_A8',
  'Audi Q3': 'Audi_Q3',
  'Audi Q4 e-tron': 'Audi_Q4_e-tron',
  'Audi Q5': 'Audi_Q5',
  'Audi Q7': 'Audi_Q7',
  'Audi Q8': 'Audi_Q8',
  'Audi e-tron': 'Audi_e-tron_(2018)',
  'Audi e-tron GT': 'Audi_e-tron_GT',
  'Audi S3': 'Audi_S3',
  'Audi S4': 'Audi_S4',
  'Audi S5': 'Audi_S5',
  'Audi S6': 'Audi_S6',
  'Audi S7': 'Audi_S7',
  'Audi SQ5': 'Audi_SQ5',
  'Audi SQ7': 'Audi_SQ7',
  'Audi SQ8': 'Audi_SQ8',
  'Audi RS Q8': 'Audi_RS_Q8',
  'Audi RS5': 'Audi_RS5',
  'Audi RS6': 'Audi_RS6',
  'Audi RS7': 'Audi_RS7',
  'Audi R8': 'Audi_R8',
  'Audi TT': 'Audi_TT',

  // ==================== BENTLEY ====================
  'Bentley Bentayga': 'Bentley_Bentayga',
  'Bentley Bentayga EWB': 'Bentley_Bentayga',
  'Bentley Bentayga S': 'Bentley_Bentayga',
  'Bentley Continental GT': 'Bentley_Continental_GT',
  'Bentley Continental GT Convertible': 'Bentley_Continental_GT',
  'Bentley Continental GT Speed': 'Bentley_Continental_GT',
  'Bentley Flying Spur': 'Bentley_Flying_Spur_(2019)',
  'Bentley Flying Spur Speed': 'Bentley_Flying_Spur_(2019)',

  // ==================== BMW ====================
  'BMW 2 Series': 'BMW_2_Series',
  'BMW 3 Series': 'BMW_3_Series_(G20)',
  'BMW 4 Series': 'BMW_4_Series_(G22)',
  'BMW 5 Series': 'BMW_5_Series_(G60)',
  'BMW 7 Series': 'BMW_7_Series_(G70)',
  'BMW 8 Series': 'BMW_8_Series_(G15)',
  'BMW X1': 'BMW_X1',
  'BMW X2': 'BMW_X2',
  'BMW X3': 'BMW_X3',
  'BMW X3 M40i': 'BMW_X3',
  'BMW X4': 'BMW_X4',
  'BMW X5': 'BMW_X5_(G05)',
  'BMW X5 M50i': 'BMW_X5_(G05)',
  'BMW X5M': 'BMW_X5_(G05)',
  'BMW X6': 'BMW_X6_(G06)',
  'BMW X6M': 'BMW_X6_(G06)',
  'BMW X7': 'BMW_X7_(G07)',
  'BMW X7 M60i': 'BMW_X7_(G07)',
  'BMW Z4': 'BMW_Z4_(G29)',
  'BMW i3': 'BMW_i3',
  'BMW i4': 'BMW_i4',
  'BMW i5': 'BMW_i5',
  'BMW i7': 'BMW_i7',
  'BMW iX': 'BMW_iX',
  'BMW M2': 'BMW_M2',
  'BMW M3': 'BMW_M3',
  'BMW M4': 'BMW_M4',
  'BMW M5': 'BMW_M5',
  'BMW M8': 'BMW_M8',
  'BMW M240i': 'BMW_2_Series_(G42)',
  'BMW M340i': 'BMW_3_Series_(G20)',
  'BMW M440i': 'BMW_4_Series_(G22)',
  'BMW M550i': 'BMW_5_Series_(G30)',

  // ==================== BUGATTI ====================
  'Bugatti Chiron': 'Bugatti_Chiron',
  'Bugatti Chiron Sport': 'Bugatti_Chiron',
  'Bugatti Chiron Super Sport': 'Bugatti_Chiron',
  'Bugatti Tourbillon': 'Bugatti_Tourbillon',

  // ==================== BUICK ====================
  'Buick Enclave': 'Buick_Enclave',
  'Buick Encore': 'Buick_Encore',
  'Buick Encore GX': 'Buick_Encore_GX',
  'Buick Envision': 'Buick_Envision',

  // ==================== CADILLAC ====================
  'Cadillac CT4': 'Cadillac_CT4',
  'Cadillac CT5': 'Cadillac_CT5',
  'Cadillac Celestiq': 'Cadillac_Celestiq',
  'Cadillac Escalade': 'Cadillac_Escalade',
  'Cadillac Escalade-V': 'Cadillac_Escalade',
  'Cadillac Lyriq': 'Cadillac_Lyriq',
  'Cadillac Lyriq-V': 'Cadillac_Lyriq',
  'Cadillac Vistiq': 'Cadillac_Vistiq',
  'Cadillac XT4': 'Cadillac_XT4',
  'Cadillac XT5': 'Cadillac_XT5',
  'Cadillac XT6': 'Cadillac_XT6',

  // ==================== CHEVROLET ====================
  'Chevrolet Blazer': 'Chevrolet_Blazer_(crossover)',
  'Chevrolet Bolt': 'Chevrolet_Bolt',
  'Chevrolet Bolt EUV': 'Chevrolet_Bolt_EUV',
  'Chevrolet Camaro': 'Chevrolet_Camaro_(sixth_generation)',
  'Chevrolet Camaro ZL1': 'Chevrolet_Camaro_(sixth_generation)',
  'Chevrolet Colorado': 'Chevrolet_Colorado',
  'Chevrolet Colorado ZR2': 'Chevrolet_Colorado',
  'Chevrolet Corvette': 'Chevrolet_Corvette_(C8)',
  'Chevrolet Corvette Z06': 'Chevrolet_Corvette_Z06',
  'Chevrolet Corvette ZR1': 'Chevrolet_Corvette_ZR1',
  'Chevrolet Equinox': 'Chevrolet_Equinox',
  'Chevrolet Express': 'Chevrolet_Express',
  'Chevrolet Malibu': 'Chevrolet_Malibu',
  'Chevrolet Silverado': 'Chevrolet_Silverado',
  'Chevrolet Silverado 1500': 'Chevrolet_Silverado',
  'Chevrolet Silverado 2500HD': 'Chevrolet_Silverado',
  'Chevrolet Silverado EV': 'Chevrolet_Silverado_EV',
  'Chevrolet Silverado ZR2': 'Chevrolet_Silverado',
  'Chevrolet Spark': 'Chevrolet_Spark',
  'Chevrolet Suburban': 'Chevrolet_Suburban',
  'Chevrolet Tahoe': 'Chevrolet_Tahoe',
  'Chevrolet Tahoe Z71': 'Chevrolet_Tahoe',
  'Chevrolet Trailblazer': 'Chevrolet_Trailblazer_(crossover)',
  'Chevrolet Traverse': 'Chevrolet_Traverse',
  'Chevrolet Trax': 'Chevrolet_Trax',

  // ==================== CHRYSLER ====================
  'Chrysler 300': 'Chrysler_300_(2011)',
  'Chrysler Pacifica': 'Chrysler_Pacifica_(minivan)',
  'Chrysler Voyager': 'Chrysler_Voyager_(2020)',

  // ==================== DODGE ====================
  'Dodge Challenger': 'Dodge_Challenger',
  'Dodge Challenger SRT Hellcat': 'Dodge_Challenger_SRT_Hellcat',
  'Dodge Charger': 'Dodge_Charger_(LX/LD)',
  'Dodge Charger SRT Hellcat': 'Dodge_Charger_(LX/LD)',
  'Dodge Durango': 'Dodge_Durango',
  'Dodge Durango SRT 392': 'Dodge_Durango',
  'Dodge Durango SRT Hellcat': 'Dodge_Durango',
  'Dodge Hornet': 'Dodge_Hornet_(2023)',

  // ==================== FERRARI ====================
  'Ferrari 296 GTB': 'Ferrari_296_GTB',
  'Ferrari 296 GTS': 'Ferrari_296_GTS',
  'Ferrari 812 GTS': 'Ferrari_812_Superfast',
  'Ferrari 812 Superfast': 'Ferrari_812_Superfast',
  'Ferrari F8': 'Ferrari_F8',
  'Ferrari F8 Tributo': 'Ferrari_F8',
  'Ferrari F8 Spider': 'Ferrari_F8',
  'Ferrari Purosangue': 'Ferrari_Purosangue',
  'Ferrari Roma': 'Ferrari_Roma',
  'Ferrari Roma Spider': 'Ferrari_Roma',
  'Ferrari SF90': 'Ferrari_SF90_Stradale',
  'Ferrari SF90 Stradale': 'Ferrari_SF90_Stradale',
  'Ferrari SF90 Spider': 'Ferrari_SF90_Stradale',

  // ==================== FORD ====================
  'Ford Bronco': 'Ford_Bronco_(sixth_generation)',
  'Ford Bronco Raptor': 'Ford_Bronco_(sixth_generation)',
  'Ford Bronco Sport': 'Ford_Bronco_Sport',
  'Ford Edge': 'Ford_Edge',
  'Ford Edge ST': 'Ford_Edge',
  'Ford Escape': 'Ford_Escape',
  'Ford Expedition': 'Ford_Expedition',
  'Ford Explorer': 'Ford_Explorer',
  'Ford Explorer ST': 'Ford_Explorer',
  'Ford F-150': 'Ford_F-Series',
  'Ford F-150 Lightning': 'Ford_F-150_Lightning',
  'Ford F-150 Raptor': 'Ford_F-150_Raptor',
  'Ford F-150 Raptor R': 'Ford_F-150_Raptor',
  'Ford F-250': 'Ford_Super_Duty',
  'Ford Maverick': 'Ford_Maverick_(2022)',
  'Ford Mustang': 'Ford_Mustang_(seventh_generation)',
  'Ford Mustang GT': 'Ford_Mustang_(seventh_generation)',
  'Ford Mustang Mach-E': 'Ford_Mustang_Mach-E',
  'Ford Mustang Shelby GT500': 'Ford_Mustang_Shelby_GT500',
  'Ford Ranger': 'Ford_Ranger_(Americas)',
  'Ford Transit': 'Ford_Transit',

  // ==================== GENESIS ====================
  'Genesis G70': 'Genesis_G70',
  'Genesis G70 Shooting Brake': 'Genesis_G70',
  'Genesis G80': 'Genesis_G80',
  'Genesis G90': 'Genesis_G90',
  'Genesis GV60': 'Genesis_GV60',
  'Genesis GV60 Performance': 'Genesis_GV60',
  'Genesis GV70': 'Genesis_GV70',
  'Genesis GV80': 'Genesis_GV80',

  // ==================== GMC ====================
  'GMC Acadia': 'GMC_Acadia',
  'GMC Canyon': 'GMC_Canyon',
  'GMC Canyon AT4X': 'GMC_Canyon',
  'GMC Hummer EV': 'GMC_Hummer_EV',
  'GMC Sierra': 'GMC_Sierra',
  'GMC Sierra 1500': 'GMC_Sierra',
  'GMC Sierra 2500HD': 'GMC_Sierra',
  'GMC Sierra AT4X': 'GMC_Sierra',
  'GMC Terrain': 'GMC_Terrain',
  'GMC Yukon': 'GMC_Yukon',
  'GMC Yukon AT4': 'GMC_Yukon',
  'GMC Yukon Denali Ultimate': 'GMC_Yukon',
  'GMC Yukon XL': 'GMC_Yukon',

  // ==================== HONDA ====================
  'Honda Accord': 'Honda_Accord',
  'Honda Accord Sport': 'Honda_Accord',
  'Honda Civic': 'Honda_Civic_(eleventh_generation)',
  'Honda Civic Hatchback': 'Honda_Civic_(eleventh_generation)',
  'Honda Civic Si': 'Honda_Civic_Si',
  'Honda Civic Type R': 'Honda_Civic_Type_R',
  'Honda CR-V': 'Honda_CR-V',
  'Honda CR-V Hybrid Sport Touring': 'Honda_CR-V',
  'Honda CR-V Sport Touring': 'Honda_CR-V',
  'Honda HR-V': 'Honda_HR-V',
  'Honda Odyssey': 'Honda_Odyssey_(North_America)',
  'Honda Passport': 'Honda_Passport',
  'Honda Passport TrailSport': 'Honda_Passport',
  'Honda Pilot': 'Honda_Pilot',
  'Honda Pilot TrailSport': 'Honda_Pilot',
  'Honda Ridgeline': 'Honda_Ridgeline',
  'Honda Prologue': 'Honda_Prologue',

  // ==================== HYUNDAI ====================
  'Hyundai Elantra': 'Hyundai_Elantra',
  'Hyundai Ioniq 5': 'Hyundai_Ioniq_5',
  'Hyundai Ioniq 6': 'Hyundai_Ioniq_6',
  'Hyundai Ioniq 9': 'Hyundai_Ioniq_7',
  'Hyundai Kona': 'Hyundai_Kona',
  'Hyundai Kona Electric': 'Hyundai_Kona_Electric',
  'Hyundai Palisade': 'Hyundai_Palisade',
  'Hyundai Santa Cruz': 'Hyundai_Santa_Cruz',
  'Hyundai Santa Fe': 'Hyundai_Santa_Fe',
  'Hyundai Sonata': 'Hyundai_Sonata',
  'Hyundai Tucson': 'Hyundai_Tucson',
  'Hyundai Venue': 'Hyundai_Venue',

  // ==================== INFINITI ====================
  'Infiniti Q50': 'Infiniti_Q50',
  'Infiniti Q50 Red Sport 400': 'Infiniti_Q50',
  'Infiniti Q60': 'Infiniti_Q60',
  'Infiniti Q60 Red Sport 400': 'Infiniti_Q60',
  'Infiniti QX50': 'Infiniti_QX50',
  'Infiniti QX55': 'Infiniti_QX55',
  'Infiniti QX60': 'Infiniti_QX60',
  'Infiniti QX80': 'Infiniti_QX80',

  // ==================== JAGUAR ====================
  'Jaguar E-PACE': 'Jaguar_E-Pace',
  'Jaguar F-PACE': 'Jaguar_F-Pace',
  'Jaguar F-Type': 'Jaguar_F-Type',
  'Jaguar I-PACE': 'Jaguar_I-Pace',
  'Jaguar XE': 'Jaguar_XE',
  'Jaguar XF': 'Jaguar_XF_(X260)',

  // ==================== JEEP ====================
  'Jeep Cherokee': 'Jeep_Cherokee_(KL)',
  'Jeep Compass': 'Jeep_Compass_(MP)',
  'Jeep Gladiator': 'Jeep_Gladiator_(JT)',
  'Jeep Grand Cherokee': 'Jeep_Grand_Cherokee_(WL)',
  'Jeep Grand Cherokee L': 'Jeep_Grand_Cherokee_(WL)',
  'Jeep Grand Cherokee Summit': 'Jeep_Grand_Cherokee_(WL)',
  'Jeep Grand Cherokee Trailhawk': 'Jeep_Grand_Cherokee_(WL)',
  'Jeep Grand Wagoneer': 'Jeep_Grand_Wagoneer_(WS)',
  'Jeep Wagoneer': 'Jeep_Wagoneer_(WS)',
  'Jeep Wrangler': 'Jeep_Wrangler_(JL)',
  'Jeep Wrangler Rubicon 392': 'Jeep_Wrangler_(JL)',

  // ==================== KIA ====================
  'Kia Carnival': 'Kia_Carnival',
  'Kia EV5': 'Kia_EV5',
  'Kia EV6': 'Kia_EV6',
  'Kia EV9': 'Kia_EV9',
  'Kia Forte': 'Kia_Forte',
  'Kia K5': 'Kia_K5',
  'Kia Niro': 'Kia_Niro',
  'Kia Seltos': 'Kia_Seltos',
  'Kia Sorento': 'Kia_Sorento',
  'Kia Sorento SX Prestige': 'Kia_Sorento',
  'Kia Soul': 'Kia_Soul',
  'Kia Sportage': 'Kia_Sportage',
  'Kia Telluride': 'Kia_Telluride',

  // ==================== KOENIGSEGG ====================
  'Koenigsegg CC850': 'Koenigsegg_CC850',
  'Koenigsegg Gemera': 'Koenigsegg_Gemera',
  'Koenigsegg Jesko': 'Koenigsegg_Jesko',
  'Koenigsegg Jesko Absolut': 'Koenigsegg_Jesko',
  'Koenigsegg Regera': 'Koenigsegg_Regera',

  // ==================== LAMBORGHINI ====================
  'Lamborghini Huracán': 'Lamborghini_Hurac%C3%A1n',
  'Lamborghini Huracán STO': 'Lamborghini_Hurac%C3%A1n_STO',
  'Lamborghini Huracán Sterrato': 'Lamborghini_Hurac%C3%A1n',
  'Lamborghini Huracán Tecnica': 'Lamborghini_Hurac%C3%A1n',
  'Lamborghini Aventador': 'Lamborghini_Aventador',
  'Lamborghini Revuelto': 'Lamborghini_Revuelto',
  'Lamborghini Urus': 'Lamborghini_Urus',
  'Lamborghini Urus SE': 'Lamborghini_Urus',

  // ==================== LEXUS ====================
  'Lexus ES': 'Lexus_ES',
  'Lexus ES 350': 'Lexus_ES',
  'Lexus GX': 'Lexus_GX',
  'Lexus IS': 'Lexus_IS',
  'Lexus IS 300': 'Lexus_IS',
  'Lexus IS 500': 'Lexus_IS',
  'Lexus LC': 'Lexus_LC',
  'Lexus LC 500': 'Lexus_LC',
  'Lexus LC 500 Convertible': 'Lexus_LC',
  'Lexus LX': 'Lexus_LX',
  'Lexus NX': 'Lexus_NX',
  'Lexus NX 350 F Sport': 'Lexus_NX',
  'Lexus RC': 'Lexus_RC',
  'Lexus RC F': 'Lexus_RC_F',
  'Lexus RX': 'Lexus_RX',
  'Lexus RX 350 F Sport': 'Lexus_RX',
  'Lexus RX 500h F Sport': 'Lexus_RX',
  'Lexus TX': 'Lexus_TX',
  'Lexus UX': 'Lexus_UX',

  // ==================== LINCOLN ====================
  'Lincoln Aviator': 'Lincoln_Aviator',
  'Lincoln Aviator Black Label': 'Lincoln_Aviator',
  'Lincoln Corsair': 'Lincoln_Corsair',
  'Lincoln Corsair Reserve': 'Lincoln_Corsair',
  'Lincoln Nautilus': 'Lincoln_Nautilus',
  'Lincoln Nautilus Reserve': 'Lincoln_Nautilus',
  'Lincoln Navigator': 'Lincoln_Navigator',
  'Lincoln Navigator Black Label': 'Lincoln_Navigator',

  // ==================== LOTUS ====================
  'Lotus Eletre': 'Lotus_Eletre',
  'Lotus Eletre R': 'Lotus_Eletre',
  'Lotus Emeya': 'Lotus_Emeya',
  'Lotus Emeya R': 'Lotus_Emeya',
  'Lotus Emira': 'Lotus_Emira',
  'Lotus Emira V6 First Edition': 'Lotus_Emira',
  'Lotus Evija': 'Lotus_Evija',

  // ==================== LUCID ====================
  'Lucid Air': 'Lucid_Air',
  'Lucid Air Grand Touring': 'Lucid_Air',
  'Lucid Air Pure': 'Lucid_Air',
  'Lucid Air Sapphire': 'Lucid_Air',
  'Lucid Air Touring': 'Lucid_Air',
  'Lucid Gravity': 'Lucid_Gravity',

  // ==================== MASERATI ====================
  'Maserati Ghibli': 'Maserati_Ghibli_(M157)',
  'Maserati Ghibli Trofeo': 'Maserati_Ghibli_(M157)',
  'Maserati GranCabrio': 'Maserati_GranTurismo',
  'Maserati GranTurismo': 'Maserati_GranTurismo',
  'Maserati GranTurismo Folgore': 'Maserati_GranTurismo',
  'Maserati GranTurismo Trofeo': 'Maserati_GranTurismo',
  'Maserati Grecale': 'Maserati_Grecale',
  'Maserati Grecale Folgore': 'Maserati_Grecale',
  'Maserati Grecale Trofeo': 'Maserati_Grecale',
  'Maserati MC20': 'Maserati_MC20',
  'Maserati MC20 Cielo': 'Maserati_MC20',
  'Maserati Quattroporte': 'Maserati_Quattroporte',
  'Maserati Quattroporte Trofeo': 'Maserati_Quattroporte',

  // ==================== MAZDA ====================
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
  'Mazda MX-5 Miata': 'Mazda_MX-5_(ND)',
  'Mazda6': 'Mazda6',

  // ==================== MCLAREN ====================
  'McLaren 750S': 'McLaren_750S',
  'McLaren 750S Spider': 'McLaren_750S',
  'McLaren Artura': 'McLaren_Artura',
  'McLaren Artura Spider': 'McLaren_Artura',
  'McLaren GT': 'McLaren_GT',

  // ==================== MERCEDES-BENZ ====================
  'Mercedes-Benz A-Class': 'Mercedes-Benz_A-Class',
  'Mercedes-Benz C-Class': 'Mercedes-Benz_C-Class_(W206)',
  'Mercedes-Benz CLA': 'Mercedes-Benz_CLA-Class',
  'Mercedes-Benz E-Class': 'Mercedes-Benz_E-Class_(W214)',
  'Mercedes-Benz EQB': 'Mercedes-Benz_EQB',
  'Mercedes-Benz EQE': 'Mercedes-Benz_EQE',
  'Mercedes-Benz EQS': 'Mercedes-Benz_EQS',
  'Mercedes-Benz G-Class': 'Mercedes-Benz_G-Class',
  'Mercedes-Benz GLA': 'Mercedes-Benz_GLA-Class',
  'Mercedes-Benz GLB': 'Mercedes-Benz_GLB-Class',
  'Mercedes-Benz GLC': 'Mercedes-Benz_GLC-Class',
  'Mercedes-Benz GLE': 'Mercedes-Benz_GLE-Class',
  'Mercedes-Benz GLS': 'Mercedes-Benz_GLS-Class',
  'Mercedes-Benz S-Class': 'Mercedes-Benz_S-Class_(W223)',
  'Mercedes-AMG A35': 'Mercedes-AMG_A35',
  'Mercedes-AMG C43': 'Mercedes-AMG_C43',
  'Mercedes-AMG C63': 'Mercedes-AMG_C63',
  'Mercedes-AMG E53': 'Mercedes-AMG_E53',
  'Mercedes-AMG E63 S': 'Mercedes-AMG_E63',
  'Mercedes-AMG GLC43': 'Mercedes-AMG_GLC43',
  'Mercedes-AMG GLC63': 'Mercedes-AMG_GLC63',
  'Mercedes-AMG GLE53': 'Mercedes-AMG_GLE53',
  'Mercedes-AMG GLE63 S': 'Mercedes-AMG_GLE63',
  'Mercedes-AMG GLS63': 'Mercedes-AMG_GLS63',
  'Mercedes-AMG GT': 'Mercedes-AMG_GT',
  'Mercedes-AMG SL': 'Mercedes-Benz_SL-Class_(R232)',

  // ==================== NISSAN ====================
  'Nissan Altima': 'Nissan_Altima',
  'Nissan Ariya': 'Nissan_Ariya',
  'Nissan Frontier': 'Nissan_Frontier',
  'Nissan Kicks': 'Nissan_Kicks',
  'Nissan Leaf': 'Nissan_Leaf',
  'Nissan Murano': 'Nissan_Murano',
  'Nissan Pathfinder': 'Nissan_Pathfinder',
  'Nissan Pathfinder Rock Creek': 'Nissan_Pathfinder',
  'Nissan Rogue': 'Nissan_Rogue',
  'Nissan Rogue SL': 'Nissan_Rogue',
  'Nissan Sentra': 'Nissan_Sentra',
  'Nissan Titan': 'Nissan_Titan',
  'Nissan Versa': 'Nissan_Versa',
  'Nissan Z': 'Nissan_Z_(RZ34)',
  'Nissan Z Nismo': 'Nissan_Z_(RZ34)',

  // ==================== PAGANI ====================
  'Pagani Huayra': 'Pagani_Huayra',
  'Pagani Huayra Roadster': 'Pagani_Huayra',
  'Pagani Utopia': 'Pagani_Utopia',

  // ==================== PORSCHE ====================
  'Porsche 718 Boxster': 'Porsche_718_Boxster',
  'Porsche 718 Cayman': 'Porsche_718_Cayman',
  'Porsche 911': 'Porsche_911',
  'Porsche Cayenne': 'Porsche_Cayenne',
  'Porsche Macan': 'Porsche_Macan',
  'Porsche Panamera': 'Porsche_Panamera',
  'Porsche Taycan': 'Porsche_Taycan',

  // ==================== RAM ====================
  'Ram 1500': 'Ram_1500',
  'Ram 1500 Limited': 'Ram_1500',
  'Ram 1500 Rebel': 'Ram_1500',
  'Ram 1500 TRX': 'Ram_1500_TRX',
  'Ram 2500': 'Ram_2500',
  'Ram 3500': 'Ram_3500',

  // ==================== RIVIAN ====================
  'Rivian R1S': 'Rivian_R1S',
  'Rivian R1T': 'Rivian_R1T',

  // ==================== ROLLS-ROYCE ====================
  'Rolls-Royce Cullinan': 'Rolls-Royce_Cullinan',
  'Rolls-Royce Cullinan Black Badge': 'Rolls-Royce_Cullinan',
  'Rolls-Royce Ghost': 'Rolls-Royce_Ghost',
  'Rolls-Royce Ghost Black Badge': 'Rolls-Royce_Ghost',
  'Rolls-Royce Ghost Extended': 'Rolls-Royce_Ghost',
  'Rolls-Royce Phantom': 'Rolls-Royce_Phantom_(VIII)',
  'Rolls-Royce Phantom Extended': 'Rolls-Royce_Phantom_(VIII)',
  'Rolls-Royce Spectre': 'Rolls-Royce_Spectre',

  // ==================== SUBARU ====================
  'Subaru Ascent': 'Subaru_Ascent',
  'Subaru BRZ': 'Subaru_BRZ',
  'Subaru Crosstrek': 'Subaru_Crosstrek',
  'Subaru Crosstrek Wilderness': 'Subaru_Crosstrek',
  'Subaru Forester': 'Subaru_Forester',
  'Subaru Forester Wilderness': 'Subaru_Forester',
  'Subaru Impreza': 'Subaru_Impreza',
  'Subaru Legacy': 'Subaru_Legacy',
  'Subaru Outback': 'Subaru_Outback',
  'Subaru Outback Wilderness': 'Subaru_Outback',
  'Subaru WRX': 'Subaru_WRX',
  'Subaru WRX TR': 'Subaru_WRX',
  'Subaru Solterra': 'Subaru_Solterra',

  // ==================== TESLA ====================
  'Tesla Cybertruck': 'Tesla_Cybertruck',
  'Tesla Model 3': 'Tesla_Model_3',
  'Tesla Model S': 'Tesla_Model_S',
  'Tesla Model X': 'Tesla_Model_X',
  'Tesla Model Y': 'Tesla_Model_Y',

  // ==================== TOYOTA ====================
  'Toyota 4Runner': 'Toyota_4Runner',
  'Toyota 4Runner TRD Pro': 'Toyota_4Runner',
  'Toyota Camry': 'Toyota_Camry',
  'Toyota Corolla': 'Toyota_Corolla_(E210)',
  'Toyota Corolla Cross': 'Toyota_Corolla_Cross',
  'Toyota Corolla Hatchback': 'Toyota_Corolla_(E210)',
  'Toyota Crown': 'Toyota_Crown_(S230)',
  'Toyota Crown Signia': 'Toyota_Crown_(S230)',
  'Toyota GR Corolla': 'Toyota_GR_Corolla',
  'Toyota GR Supra': 'Toyota_Supra_(J29/DB)',
  'Toyota GR86': 'Toyota_GR86',
  'Toyota Grand Highlander': 'Toyota_Grand_Highlander',
  'Toyota Highlander': 'Toyota_Highlander',
  'Toyota Land Cruiser': 'Toyota_Land_Cruiser_(J300)',
  'Toyota Land Cruiser 250': 'Toyota_Land_Cruiser_Prado',
  'Toyota Prius': 'Toyota_Prius_(XW60)',
  'Toyota RAV4': 'Toyota_RAV4',
  'Toyota RAV4 TRD Off-Road': 'Toyota_RAV4',
  'Toyota Sequoia': 'Toyota_Sequoia',
  'Toyota Sienna': 'Toyota_Sienna',
  'Toyota Tacoma': 'Toyota_Tacoma',
  'Toyota Tacoma TRD Pro': 'Toyota_Tacoma',
  'Toyota Tundra': 'Toyota_Tundra',
  'Toyota Tundra TRD Pro': 'Toyota_Tundra',
  'Toyota Venza': 'Toyota_Venza',
  'Toyota bZ4X': 'Toyota_bZ4X',

  // ==================== VOLKSWAGEN ====================
  'Volkswagen Atlas': 'Volkswagen_Atlas',
  'Volkswagen Atlas Peak Edition': 'Volkswagen_Atlas',
  'Volkswagen Golf': 'Volkswagen_Golf_Mk8',
  'Volkswagen Golf GTI': 'Volkswagen_Golf_GTI',
  'Volkswagen Golf R': 'Volkswagen_Golf_R',
  'Volkswagen ID.4': 'Volkswagen_ID.4',
  'Volkswagen ID.4 Pro S': 'Volkswagen_ID.4',
  'Volkswagen ID.Buzz': 'Volkswagen_ID._Buzz',
  'Volkswagen ID.Buzz LWB': 'Volkswagen_ID._Buzz',
  'Volkswagen Jetta': 'Volkswagen_Jetta',
  'Volkswagen Jetta Sport': 'Volkswagen_Jetta',
  'Volkswagen Taos': 'Volkswagen_Taos',
  'Volkswagen Tiguan': 'Volkswagen_Tiguan',

  // ==================== VOLVO ====================
  'Volvo C40 Recharge': 'Volvo_C40',
  'Volvo EX30': 'Volvo_EX30',
  'Volvo EX90': 'Volvo_EX90',
  'Volvo S60': 'Volvo_S60',
  'Volvo S90': 'Volvo_S90',
  'Volvo V60': 'Volvo_V60',
  'Volvo V90': 'Volvo_V90',
  'Volvo XC40': 'Volvo_XC40',
  'Volvo XC40 Recharge': 'Volvo_XC40',
  'Volvo XC60': 'Volvo_XC60',
  'Volvo XC60 Recharge': 'Volvo_XC60',
  'Volvo XC90': 'Volvo_XC90',
  'Volvo XC90 Recharge': 'Volvo_XC90',
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
