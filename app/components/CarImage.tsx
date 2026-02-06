'use client';

import { useState, useEffect } from 'react';

interface CarImageProps {
  vehicleName: string;
  brandColor: string;
  isExotic?: boolean;
  bodyType?: string;
  showLabel?: boolean;
}

// ============================================================================
// WIKIPEDIA TITLE MAPPINGS — Every vehicle mapped to the correct article
// Key fixes: Acura_Integra_(2023), BMW_X5_(F95) for X5M, unique articles
// for variants like Corvette Z06, Civic Type R, Mustang Shelby GT500, etc.
// ============================================================================
const wikiTitleMappings: Record<string, string> = {
  // ==================== ACURA ====================
  'Acura Integra': 'Acura_Integra_(2023)',           // FIXED: was Acura_Integra (old/disambiguation)
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
  'Aston Martin DBX707': 'Aston_Martin_DBX707',            // FIXED: has own article
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
  'Audi e-tron': 'Audi_e-tron_(brand)',                     // FIXED: was Audi_e-tron_(2018)
  'Audi e-tron GT': 'Audi_e-tron_GT',
  'Audi S3': 'Audi_S3',
  'Audi S4': 'Audi_S4',
  'Audi S5': 'Audi_S5',
  'Audi S6': 'Audi_S6',
  'Audi S7': 'Audi_S7',
  'Audi SQ5': 'Audi_SQ5',
  'Audi SQ7': 'Audi_Q7',                                    // FIXED: SQ7 redirects to Q7
  'Audi SQ8': 'Audi_Q8',                                    // FIXED: SQ8 redirects to Q8
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
  'BMW X5M': 'BMW_X5_M',                                    // FIXED: own article for X5 M
  'BMW X6': 'BMW_X6_(G06)',
  'BMW X6M': 'BMW_X6_M',                                    // FIXED: own article for X6 M
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
  'Bugatti Chiron Super Sport': 'Bugatti_Chiron_Super_Sport_300+',  // FIXED: unique article
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
  'Chevrolet Corvette ZR1': 'Chevrolet_Corvette_ZR1_(C8)',       // FIXED: specific gen
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
  'Chrysler Voyager': 'Chrysler_Voyager',

  // ==================== DODGE ====================
  'Dodge Challenger': 'Dodge_Challenger_(2008)',               // FIXED: specify generation
  'Dodge Challenger SRT Hellcat': 'Dodge_Challenger_SRT_Demon',  // FIXED: Hellcat is covered here
  'Dodge Charger': 'Dodge_Charger_(LD)',                       // FIXED: was LX/LD (slash in URL)
  'Dodge Charger SRT Hellcat': 'Dodge_Charger_(LD)',
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
  'Ferrari F8 Spider': 'Ferrari_F8_Spider',                   // FIXED: F8 Spider has coverage
  'Ferrari Purosangue': 'Ferrari_Purosangue',
  'Ferrari Roma': 'Ferrari_Roma_(car)',                        // FIXED: was just Ferrari_Roma
  'Ferrari Roma Spider': 'Ferrari_Roma_(car)',
  'Ferrari SF90': 'Ferrari_SF90_Stradale',
  'Ferrari SF90 Stradale': 'Ferrari_SF90_Stradale',
  'Ferrari SF90 Spider': 'Ferrari_SF90_Stradale',

  // ==================== FORD ====================
  'Ford Bronco': 'Ford_Bronco_(sixth_generation)',
  'Ford Bronco Raptor': 'Ford_Bronco_Raptor',                 // FIXED: has own article
  'Ford Bronco Sport': 'Ford_Bronco_Sport',
  'Ford Edge': 'Ford_Edge',
  'Ford Edge ST': 'Ford_Edge',
  'Ford Escape': 'Ford_Escape',
  'Ford Expedition': 'Ford_Expedition',
  'Ford Explorer': 'Ford_Explorer',
  'Ford Explorer ST': 'Ford_Explorer',
  'Ford F-150': 'Ford_F-Series_(fourteenth_generation)',       // FIXED: specific gen
  'Ford F-150 Lightning': 'Ford_F-150_Lightning',
  'Ford F-150 Raptor': 'Ford_F-150_Raptor',
  'Ford F-150 Raptor R': 'Ford_F-150_Raptor',
  'Ford F-250': 'Ford_Super_Duty',
  'Ford Maverick': 'Ford_Maverick_(2022)',
  'Ford Mustang': 'Ford_Mustang_(seventh_generation)',
  'Ford Mustang GT': 'Ford_Mustang_(seventh_generation)',
  'Ford Mustang Mach-E': 'Ford_Mustang_Mach-E',
  'Ford Mustang Shelby GT500': 'Shelby_Mustang',              // FIXED: better article
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
  'GMC Yukon Denali Ultimate': 'GMC_Yukon_Denali',            // FIXED: Denali has own article
  'GMC Yukon XL': 'GMC_Yukon_XL',                             // FIXED: XL has own article

  // ==================== HONDA ====================
  'Honda Accord': 'Honda_Accord',
  'Honda Accord Sport': 'Honda_Accord',
  'Honda Civic': 'Honda_Civic_(eleventh_generation)',
  'Honda Civic Hatchback': 'Honda_Civic_(eleventh_generation)',
  'Honda Civic Si': 'Honda_Civic_Si',
  'Honda Civic Type R': 'Honda_Civic_Type_R_(FL5)',            // FIXED: specific gen
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
  'Hyundai Ioniq 9': 'Hyundai_Ioniq_9',                       // FIXED: was Hyundai_Ioniq_7
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
  'Jeep Compass': 'Jeep_Compass',                             // FIXED: removed (MP)
  'Jeep Gladiator': 'Jeep_Gladiator_(JT)',
  'Jeep Grand Cherokee': 'Jeep_Grand_Cherokee_(WL)',
  'Jeep Grand Cherokee L': 'Jeep_Grand_Cherokee_L',           // FIXED: has own article
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
  'Lamborghini Huracán': 'Lamborghini_Huracán',
  'Lamborghini Huracán STO': 'Lamborghini_Huracán_STO',
  'Lamborghini Huracán Sterrato': 'Lamborghini_Huracán_Sterrato',
  'Lamborghini Huracán Tecnica': 'Lamborghini_Huracán_Tecnica',  // FIXED: has own article
  'Lamborghini Revuelto': 'Lamborghini_Revuelto',
  'Lamborghini Urus': 'Lamborghini_Urus',
  'Lamborghini Urus SE': 'Lamborghini_Urus_SE',                  // FIXED: try unique

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
  'Lucid Air Sapphire': 'Lucid_Air_Sapphire',                 // FIXED: Sapphire has coverage
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
  'Mercedes-Benz GLA': 'Mercedes-Benz_GLA-Class_(H247)',      // FIXED: specify gen
  'Mercedes-Benz GLB': 'Mercedes-Benz_GLB-Class',
  'Mercedes-Benz GLC': 'Mercedes-Benz_GLC-Class_(X254)',      // FIXED: specify gen
  'Mercedes-Benz GLE': 'Mercedes-Benz_GLE-Class_(W167)',      // FIXED: specify gen
  'Mercedes-Benz GLS': 'Mercedes-Benz_GLS-Class_(X167)',      // FIXED: specify gen
  'Mercedes-Benz S-Class': 'Mercedes-Benz_S-Class_(W223)',
  'Mercedes-AMG C43': 'Mercedes-Benz_C-Class_(W206)',          // FIXED: redirect to C-Class
  'Mercedes-AMG C63': 'Mercedes-AMG_C63',
  'Mercedes-AMG E53': 'Mercedes-Benz_E-Class_(W214)',          // AMG variants covered in base
  'Mercedes-AMG E63 S': 'Mercedes-AMG_E63',
  'Mercedes-AMG GLC43': 'Mercedes-Benz_GLC-Class_(X254)',
  'Mercedes-AMG GLC63': 'Mercedes-AMG_GLC63',
  'Mercedes-AMG GLE53': 'Mercedes-Benz_GLE-Class_(W167)',
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
  'Porsche 718 Boxster': 'Porsche_Boxster/Cayman_(982)',       // FIXED: combined article
  'Porsche 718 Cayman': 'Porsche_Boxster/Cayman_(982)',        // FIXED: combined article
  'Porsche 911': 'Porsche_911',
  'Porsche Cayenne': 'Porsche_Cayenne',
  'Porsche Macan': 'Porsche_Macan',
  'Porsche Panamera': 'Porsche_Panamera',
  'Porsche Taycan': 'Porsche_Taycan',

  // ==================== RAM ====================
  'Ram 1500': 'Ram_pickup',                                    // FIXED: Ram_1500 is less reliable
  'Ram 1500 Limited': 'Ram_pickup',
  'Ram 1500 Rebel': 'Ram_pickup',
  'Ram 1500 TRX': 'Ram_1500_TRX',
  'Ram 2500': 'Ram_pickup',
  'Ram 3500': 'Ram_pickup',

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
  'Toyota Crown Signia': 'Toyota_Crown_Signia',               // FIXED: has own article
  'Toyota GR Corolla': 'Toyota_GR_Corolla',
  'Toyota GR Supra': 'Toyota_GR_Supra',                       // FIXED: was Toyota_Supra_(J29/DB)
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
  'Toyota Tacoma': 'Toyota_Tacoma_(N300)',                     // FIXED: latest gen
  'Toyota Tacoma TRD Pro': 'Toyota_Tacoma_(N300)',
  'Toyota Tundra': 'Toyota_Tundra_(XK70)',                    // FIXED: latest gen
  'Toyota Tundra TRD Pro': 'Toyota_Tundra_(XK70)',
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

// ============================================================================
// COMMONS SEARCH OVERRIDES — Unique search terms for variants that share
// a Wikipedia article with their base model. Ensures every variant gets
// a UNIQUE photo from Wikimedia Commons (not the same as the base model).
// ============================================================================
const commonsSearchOverrides: Record<string, string> = {
  // Aston Martin
  'Aston Martin DB12 Volante': '"Aston Martin DB12" Volante convertible',
  'Aston Martin Vantage Roadster': '"Aston Martin Vantage" Roadster 2024',
  'Aston Martin DBX707': '"Aston Martin DBX" 707',

  // Audi variants
  'Audi A4 Allroad': '"Audi A4 allroad" quattro',
  'Audi e-tron': '"Audi e-tron" SUV 55 quattro',
  'Audi S3': '"Audi S3" Sportback 2024',
  'Audi S4': '"Audi S4" B9 Avant sedan',
  'Audi S5': '"Audi S5" Sportback',
  'Audi S7': '"Audi S7" Sportback C8',
  'Audi SQ5': '"Audi SQ5" TDI facelift front',
  'Audi SQ7': '"Audi SQ7" TDI',
  'Audi SQ8': '"Audi SQ8" front',
  'Audi RS Q8': '"Audi RS Q8" front',

  // Bentley variants (each needs unique photo)
  'Bentley Bentayga EWB': '"Bentley Bentayga" EWB "Extended Wheelbase"',
  'Bentley Bentayga S': '"Bentley Bentayga" 2023 2024',
  'Bentley Continental GT Convertible': '"Bentley Continental" GTC convertible',
  'Bentley Continental GT Speed': '"Bentley Continental GT" Speed 2024',
  'Bentley Flying Spur Speed': '"Bentley Flying Spur" Speed',

  // BMW variants
  'BMW 4 Series': '"BMW 4 Series" Gran Coupe G26',
  'BMW M440i': '"BMW M440i" Gran Coupe',
  'BMW X5 M50i': '"BMW X5" M50i M Sport',
  'BMW X5M': '"BMW X5 M" Competition F95',
  'BMW X6M': '"BMW X6 M" Competition F96',
  'BMW X7 M60i': '"BMW X7" M60i',

  // Bugatti
  'Bugatti Chiron Super Sport': '"Bugatti Chiron" "Super Sport" 300',

  // Cadillac variants
  'Cadillac Escalade-V': '"Cadillac Escalade-V" 2024',
  'Cadillac Lyriq-V': '"Cadillac Lyriq" 2025',

  // Chevrolet variants
  'Chevrolet Camaro ZL1': '"Chevrolet Camaro ZL1" 2023',
  'Chevrolet Corvette Z06': '"Chevrolet Corvette Z06" C8',
  'Chevrolet Corvette ZR1': '"Chevrolet Corvette ZR1" C8 2025',
  'Chevrolet Tahoe Z71': '"Chevrolet Tahoe" Z71 2024',
  'Chevrolet Bolt EUV': '"Chevrolet Bolt EUV"',
  'Chevrolet Silverado ZR2': '"Chevrolet Silverado" ZR2 off-road',
  'Chevrolet Colorado ZR2': '"Chevrolet Colorado" ZR2',

  // Chrysler
  'Chrysler Voyager': '"Chrysler Voyager" 2023 minivan',

  // Dodge variants
  'Dodge Challenger SRT Hellcat': '"Dodge Challenger" SRT Hellcat widebody',
  'Dodge Charger SRT Hellcat': '"Dodge Charger" SRT Hellcat',
  'Dodge Durango SRT 392': '"Dodge Durango SRT" 392',
  'Dodge Durango SRT Hellcat': '"Dodge Durango SRT Hellcat"',

  // Ferrari variants
  'Ferrari 296 GTS': '"Ferrari 296 GTS" spider',
  'Ferrari F8 Spider': '"Ferrari F8" Spider convertible',
  'Ferrari Roma Spider': '"Ferrari Roma" Spider',
  'Ferrari SF90 Spider': '"Ferrari SF90" Spider',

  // Ford variants
  'Ford Mustang GT': '"Ford Mustang GT" 2024 S650 seventh generation',
  'Ford Mustang Shelby GT500': '"Ford Mustang Shelby GT500" 2020',
  'Ford Edge ST': '"Ford Edge ST" 2024',
  'Ford F-150 Raptor': '"Ford F-150 Raptor" 2024',
  'Ford F-150 Raptor R': '"Ford F-150 Raptor R" V8',

  // Genesis
  'Genesis G70 Shooting Brake': '"Genesis G70" "Shooting Brake"',

  // GMC variants
  'GMC Canyon AT4X': '"GMC Canyon" AT4X off-road',
  'GMC Sierra 2500HD': '"GMC Sierra" 2500HD heavy duty',
  'GMC Sierra AT4X': '"GMC Sierra" AT4X',
  'GMC Yukon AT4': '"GMC Yukon" AT4 2024',
  'GMC Yukon XL': '"GMC Yukon XL" 2024',
  'GMC Yukon Denali Ultimate': '"GMC Yukon Denali" 2024',

  // Honda variants
  'Honda Civic Type R': '"Honda Civic Type R" FL5',
  'Honda CR-V Hybrid Sport Touring': '"Honda CR-V" 2024 hybrid',
  'Honda Pilot TrailSport': '"Honda Pilot" TrailSport',
  'Honda Ridgeline': '"Honda Ridgeline" 2022 Touring front',

  // Hyundai
  'Hyundai Ioniq 9': '"Hyundai Ioniq 9" electric SUV',
  'Hyundai Kona Electric': '"Hyundai Kona Electric" 2024',

  // Infiniti
  'Infiniti Q60 Red Sport 400': '"Infiniti Q60" "Red Sport" 400',

  // Jeep variants
  'Jeep Cherokee': '"Jeep Cherokee KL" 2023',
  'Jeep Grand Cherokee Trailhawk': '"Jeep Grand Cherokee" Trailhawk 4xe',
  'Jeep Grand Cherokee Summit': '"Jeep Grand Cherokee" Summit Reserve',
  'Jeep Wagoneer': '"Jeep Wagoneer" 2023 2024',
  'Jeep Grand Wagoneer': '"Jeep Grand Wagoneer" 2023 L',

  // Kia
  'Kia K5': '"Kia K5" 2024 sedan',
  'Kia Soul': '"Kia Soul" 2020 2023 SK3 front',
  'Kia EV5': '"Kia EV5" electric',
  'Kia EV9': '"Kia EV9" electric SUV',

  // Koenigsegg
  'Koenigsegg Jesko Absolut': '"Koenigsegg Jesko" Absolut',
  'Koenigsegg Gemera': '"Koenigsegg Gemera" four-seater',

  // Lamborghini variants
  'Lamborghini Huracán STO': '"Lamborghini Huracán STO"',
  'Lamborghini Huracán Tecnica': '"Lamborghini Huracán Tecnica"',
  'Lamborghini Urus SE': '"Lamborghini Urus SE" hybrid',

  // Lexus variants
  'Lexus IS 300': '"Lexus IS" 300 2024 sedan',
  'Lexus NX 350 F Sport': '"Lexus NX" "F Sport" 350',
  'Lexus RX 500h F Sport': '"Lexus RX" 500h "F Sport"',
  'Lexus RC F': '"Lexus RC F" coupe',
  'Lexus LC 500': '"Lexus LC 500" coupe',
  'Lexus LC 500 Convertible': '"Lexus LC" 500 convertible',

  // Lincoln variants
  'Lincoln Corsair': '"Lincoln Corsair" 2024',
  'Lincoln Corsair Reserve': '"Lincoln Corsair" Reserve AWD',
  'Lincoln Nautilus Reserve': '"Lincoln Nautilus" 2024 Reserve',
  'Lincoln Aviator': '"Lincoln Aviator" 2024',
  'Lincoln Aviator Black Label': '"Lincoln Aviator" "Black Label"',
  'Lincoln Navigator Black Label': '"Lincoln Navigator" "Black Label"',

  // Lotus variants
  'Lotus Emira': '"Lotus Emira" 2024 front',
  'Lotus Emira V6 First Edition': '"Lotus Emira" "First Edition"',
  'Lotus Eletre R': '"Lotus Eletre" R performance',
  'Lotus Emeya': '"Lotus Emeya" electric sedan',
  'Lotus Emeya R': '"Lotus Emeya" 2024',

  // Lucid variants
  'Lucid Air Pure': '"Lucid Air" 2023 sedan white',
  'Lucid Air Touring': '"Lucid Air" 2024 Touring',
  'Lucid Air Grand Touring': '"Lucid Air" Dream Edition Grand Touring',
  'Lucid Air Sapphire': '"Lucid Air Sapphire" blue',
  'Lucid Gravity': '"Lucid Gravity" SUV electric',

  // Mazda
  'Mazda CX-70': '"Mazda CX-70" 2025 SUV',

  // McLaren
  'McLaren 750S Spider': '"McLaren 750S" Spider convertible',

  // Mercedes variants (standard and AMG)
  'Mercedes-Benz GLA': '"Mercedes-Benz GLA" H247 2024',
  'Mercedes-Benz GLB': '"Mercedes-Benz GLB" 2024',
  'Mercedes-Benz GLS': '"Mercedes-Benz GLS" X167',
  'Mercedes-AMG C43': '"Mercedes-AMG C43" W206',
  'Mercedes-AMG C63': '"Mercedes-AMG C 63" W206 front',
  'Mercedes-AMG E53': '"Mercedes-AMG E53" W214',
  'Mercedes-AMG E63 S': '"Mercedes-AMG E63 S" sedan',
  'Mercedes-AMG GLC43': '"Mercedes-AMG GLC 43" X254',
  'Mercedes-AMG GLC63': '"Mercedes-AMG GLC63" coupe',
  'Mercedes-AMG GLE53': '"Mercedes-AMG GLE 53" coupe',
  'Mercedes-AMG GLE63 S': '"Mercedes-AMG GLE63" S',
  'Mercedes-AMG GLS63': '"Mercedes-AMG GLS 63" X167 front',

  // Porsche (718 Boxster vs Cayman need different images)
  'Porsche 718 Boxster': '"Porsche 718 Boxster" front 2023',
  'Porsche 718 Cayman': '"Porsche 718 Cayman" GT4 coupe',

  // Ram variants
  'Ram 1500 Rebel': '"Ram 1500" Rebel off-road',
  'Ram 1500 Limited': '"Ram 1500" Limited luxury',
  'Ram 2500': '"Ram 2500" 2024 Heavy Duty Laramie front',
  'Ram 3500': '"Ram 3500" dually Heavy Duty',

  // Rolls-Royce
  'Rolls-Royce Phantom': '"Rolls-Royce Phantom VIII" front',
  'Rolls-Royce Phantom Extended': '"Rolls-Royce Phantom" Extended Wheelbase',

  // Subaru
  'Subaru BRZ': '"Subaru BRZ" 2024 coupe',

  // Toyota variants
  'Toyota Crown Signia': '"Toyota Crown Signia" 2025 crossover',
  'Toyota GR Supra': '"Toyota GR Supra" A90 2024',
  'Toyota Land Cruiser': '"Toyota Land Cruiser" 2024 J300',
  'Toyota Tacoma TRD Pro': '"Toyota Tacoma" "TRD Pro" 2024 N300',
  'Toyota Tundra TRD Pro': '"Toyota Tundra" "TRD Pro" 2024',

  // Volkswagen
  'Volkswagen Golf GTI': '"Volkswagen Golf GTI" Mk8 2024',
  'Volkswagen Golf R': '"Volkswagen Golf R" Mk8 2024',

  // Volvo
  'Volvo C40 Recharge': '"Volvo C40" Recharge electric',
};

// ============================================================================
// DIRECT COMMONS FILES — Known Wikimedia Commons filenames for vehicles that
// are hardest to find via search. Uses Special:FilePath for permanent URLs.
// Format: vehicleName → Commons filename (without "File:" prefix)
// URL pattern: https://commons.wikimedia.org/wiki/Special:FilePath/FILENAME?width=800
// ============================================================================
const directCommonsFiles: Record<string, string> = {
  // Audi variants that share Q7/Q8 Wikipedia articles
  'Audi SQ5': 'Audi_SQ5_TDI_(Facelift)_–_Frontansicht,_27._April_2014,_Düsseldorf.jpg',
  'Audi SQ7': 'Audi_SQ7_TDI_Facelift_IAA_2019_JM_0468.jpg',
  'Audi SQ8': 'Audi_SQ8.jpg',
  'Audi RS Q8': '2020_Audi_RS_Q8_Front_(1).jpg',

  // BMW M variants  
  'BMW X5M': 'BMW_X5_M_Competition_(F95)_1X7A5950.jpg',
  'BMW X6M': 'BMW_X6_M_Competition_(F96)_IMG_3316.jpg',

  // Chevrolet trucks and performance variants
  'Chevrolet Silverado 1500': 'Chevrolet_Silverado_High_Country_2025.jpg',
  'Chevrolet Corvette Z06': '2023_Chevrolet_Corvette_Z06_in_Rapid_Blue,_Front_Left,_02-05-2023.jpg',
  'Chevrolet Corvette ZR1': '2025_Chevrolet_Corvette_ZR1.jpg',
  'Chevrolet Camaro ZL1': '2020_Chevrolet_Camaro_ZL1_in_Red_Hot,_Front_Left,_02-26-2023.jpg',

  // Dodge SRT / Hellcat
  'Dodge Challenger SRT Hellcat': 'White_Dodge_Challenger_SRT_three-quarter_front_view.jpg',
  'Dodge Charger SRT Hellcat': '2021_Dodge_Charger_SRT_Hellcat_Redeye_Widebody_in_Sinamon_Stick,_Front_Left,_09-02-2023.jpg',
  'Dodge Durango SRT Hellcat': '2021_Dodge_Durango_SRT_Hellcat_in_Octane_Red,_Front_Left,_11-21-2022.jpg',
  'Dodge Durango SRT 392': '2021_Dodge_Durango_R-T_in_DB_Black_Clear_Coat,_Front_Left,_05-30-2022.jpg',

  // Ferrari spider/convertible variants
  'Ferrari 296 GTS': 'Ferrari_296_GTS_1X7A5896.jpg',
  'Ferrari SF90 Spider': '2022_Ferrari_SF90_Spider.jpg',

  // Ford performance variants
  'Ford Mustang Shelby GT500': '2020_Ford_Mustang_Shelby_GT500_in_Iconic_Silver,_Front_Right,_09-10-2023.jpg',
  'Ford F-150 Raptor': '2021_Ford_F-150_Raptor_37_in_Antimatter_Blue,_Front_Left,_12-25-2021.jpg',
  'Ford F-150 Raptor R': '2024_Ford_F-150_Raptor_R_in_Area_51,_Front_Left,_04-06-2024.jpg',

  // Genesis
  'Genesis G70 Shooting Brake': 'Genesis_G70_Shooting_Brake.jpg',

  // GMC variants
  'GMC Sierra 1500': '2019_GMC_Sierra_1500_Denali_au_SIAM_2019.jpg',
  'GMC Canyon': '2023_GMC_Canyon_Elevation_in_Sterling_Metallic,_Front_Left,_08-26-2023.jpg',
  'GMC Canyon AT4X': '2023_GMC_Canyon_AT4X_in_Summit_White,_Front_Left,_02-04-2024.jpg',
  'GMC Yukon': '2021_GMC_Yukon_SLT_in_Dark_Sky_Metallic,_Front_Left,_12-31-2021.jpg',
  'GMC Yukon XL': '2021_GMC_Yukon_XL_SLT_in_Onyx_Black,_Front_Left,_09-04-2021.jpg',
  'GMC Yukon Denali Ultimate': '2023_GMC_Yukon_Denali_in_White_Frost_Tricoat,_Front_Left,_04-23-2023.jpg',

  // Honda variants
  'Honda Civic Type R': '2023_Honda_Civic_Type_R_in_Championship_White,_front_7.11.22.jpg',
  'Honda Ridgeline': '2022_Honda_Ridgeline_Touring_in_Sonic_Gray_Pearl,_front_left,_2024-05-11.jpg',

  // Jeep wagon variants
  'Jeep Grand Wagoneer': '2023_Jeep_Grand_Wagoneer_Series_III_in_Bright_White_Clear_Coat,_Front_Left,_08-05-2023.jpg',
  'Jeep Wagoneer': '2022_Jeep_Wagoneer_Series_III_in_Bright_White,_Front_Left,_01-15-2023.jpg',

  // Kia
  'Kia Soul': '2020_Kia_Soul_EX_in_Cherry_Black,_Front_Left,_09-13-2020.jpg',

  // Koenigsegg variants
  'Koenigsegg Jesko Absolut': 'Koenigsegg_Jesko_Absolut_at_Monterey_Car_Week_2021.jpg',

  // Lamborghini variants
  'Lamborghini Huracán STO': 'Lamborghini_Huracán_STO.jpg',
  'Lamborghini Huracán Tecnica': 'Lamborghini_Huracán_Tecnica_IMG_5186.jpg',

  // Lincoln Black Label variants
  'Lincoln Navigator Black Label': 'Lincoln_Navigator_Black_Label.jpg',

  // Lotus - V6 First Edition vs standard
  'Lotus Emira V6 First Edition': '2024_Lotus_Emira_First_Edition_in_Seneca_Blue,_front_right.jpg',

  // Lucid variants (all share the Lucid_Air article)
  'Lucid Air Pure': '2022_Lucid_Air_(65592).jpg',
  'Lucid Air Touring': '2022_Lucid_Air_(66341).jpg',
  'Lucid Air Grand Touring': 'Lucid_Air_Dream_Edition_front.jpg',

  // Mercedes-AMG variants
  'Mercedes-AMG C63': 'Mercedes-AMG_C_63_(W206)_IMG_0305.jpg',
  'Mercedes-AMG GLS63': '2021_Mercedes-AMG_GLS_63_in_Obsidian_Black_Metallic,_Front_Left,_12-04-2021.jpg',

  // Porsche 718 variants
  'Porsche 718 Boxster': 'Porsche_718_Boxster_1X7A1677.jpg',
  'Porsche 718 Cayman': '2024_Porsche_718_Cayman_GT4.jpg',

  // Ram variants
  'Ram 1500 Rebel': '2024_Ram_1500_Rebel_in_Hydro_Blue_Pearl_Coat,_Front_Left,_04-20-2024.jpg',
  'Ram 1500 Limited': '2024_Ram_1500_Limited_in_Ivory_White_Tri-Coat_Pearl,_Front_Left,_07-03-2024.jpg',
  'Ram 2500': '2024_Ram_2500_Laramie_in_Diamond_Black_Crystal_Pearl_Coat,_Front_Left,_09-28-2024.jpg',

  // Rolls-Royce
  'Rolls-Royce Phantom': 'Rolls-Royce_Phantom_VIII_Series_II_(front),_2024.jpg',
  'Rolls-Royce Phantom Extended': 'Rolls-Royce_Phantom_VIII_Extended.jpg',

  // Toyota performance variants
  'Toyota 4Runner TRD Pro': '2025_Toyota_4Runner_TRD_Pro_in_Mudbath,_Front_Left,_01-11-2025.jpg',
  'Toyota Tacoma TRD Pro': '2024_Toyota_Tacoma_TRD_Pro_in_Ice_Cap,_Front_Left,_07-06-2024.jpg',
  'Toyota Tundra TRD Pro': '2022_Toyota_Tundra_TRD_Pro_in_Lunar_Rock,_Front_Left,_01-22-2023.jpg',
  'Toyota GR Supra': 'Toyota_GR_Supra_at_Goodwood_Festival_of_Speed_2019.jpg',
  'Toyota Land Cruiser': '2024_Toyota_Land_Cruiser_1958_Edition_in_Heritage_Blue_with_Black_Roof,_Front_Left,_09-21-2024.jpg',
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

// Simple in-memory cache to avoid duplicate API calls across re-renders
const imageCache: Record<string, string> = {};

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
    const fetchImage = async () => {
      // Check cache first
      if (imageCache[vehicleName]) {
        setImageUrl(imageCache[vehicleName]);
        setIsLoading(false);
        return;
      }

      const wikiTitle = getWikiTitle(vehicleName);
      const hasCommonsOverride = vehicleName in commonsSearchOverrides;
      const hasDirectFile = vehicleName in directCommonsFiles;

      // ====================================================================
      // STRATEGY 0: Direct Wikimedia Commons file URL (highest priority)
      // For vehicles with known exact filenames on Commons. Uses the
      // Special:FilePath redirect which is a permanent, stable URL.
      // ====================================================================
      if (hasDirectFile) {
        try {
          const filename = directCommonsFiles[vehicleName];
          const encoded = encodeURIComponent(filename);
          // Use the Commons imageinfo API to get the actual thumbnail URL
          const resp = await fetch(
            `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encoded}&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json&origin=*`
          );
          if (resp.ok) {
            const data = await resp.json();
            const pages = data.query?.pages;
            if (pages) {
              const pageId = Object.keys(pages)[0];
              const info = (pages as any)[pageId]?.imageinfo?.[0];
              const url = info?.thumburl || info?.url;
              if (url && pageId !== '-1') {
                imageCache[vehicleName] = url;
                setImageUrl(url);
                setIsLoading(false);
                return;
              }
            }
          }
        } catch {
          // Continue to next strategy
        }
      }

      // ====================================================================
      // STRATEGY 1: Wikimedia Commons search (FIRST for variant vehicles)
      // For vehicles in commonsSearchOverrides, this runs BEFORE Wikipedia
      // strategies. This prevents variants from getting the same photo as
      // their base model (e.g., BMW X5 M50i getting the X5 photo).
      // ====================================================================
      if (hasCommonsOverride) {
        try {
          const searchTerm = commonsSearchOverrides[vehicleName];
          const resp = await fetch(
            `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|mime&iiurlwidth=800&format=json&origin=*`
          );
          if (resp.ok) {
            const data = await resp.json();
            const pages = data.query?.pages;
            if (pages) {
              const sorted = Object.values(pages).sort(
                (a: any, b: any) => (a.index || 999) - (b.index || 999)
              );
              for (const page of sorted) {
                const info = (page as any).imageinfo?.[0];
                if (info) {
                  const mime = info.mime || '';
                  if (mime.includes('jpeg') || mime.includes('png')) {
                    const url = info.thumburl || info.url;
                    if (url) {
                      imageCache[vehicleName] = url;
                      setImageUrl(url);
                      setIsLoading(false);
                      return;
                    }
                  }
                }
              }
            }
          }
        } catch {
          // Continue to Wikipedia strategies
        }
      }

      // ====================================================================
      // STRATEGY 2: Wikipedia REST API (most reliable for lead images)
      // This is the same API used by Wikipedia's mobile apps and previews.
      // It handles redirects automatically and returns images more reliably
      // than the older pageimages prop API.
      // ====================================================================
      try {
        const encoded = encodeURIComponent(wikiTitle);
        const resp = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`,
          { headers: { 'Accept': 'application/json' } }
        );
        if (resp.ok) {
          const data = await resp.json();
          if (data.thumbnail?.source) {
            // Request a higher-res version by modifying the thumbnail URL
            const highRes = data.thumbnail.source.replace(/\/\d+px-/, '/800px-');
            imageCache[vehicleName] = highRes;
            setImageUrl(highRes);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Continue to next strategy
      }

      // ====================================================================
      // STRATEGY 3: Wikipedia pageimages API with redirects enabled
      // The original method, but now with &redirects= to follow redirects
      // ====================================================================
      try {
        const resp = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=800&origin=*&redirects=`
        );
        if (resp.ok) {
          const data = await resp.json();
          const pages = data.query?.pages;
          if (pages) {
            const pageId = Object.keys(pages)[0];
            const thumbnail = pages[pageId]?.thumbnail?.source;
            if (thumbnail) {
              imageCache[vehicleName] = thumbnail;
              setImageUrl(thumbnail);
              setIsLoading(false);
              return;
            }
          }
        }
      } catch {
        // Continue to next strategy
      }

      // ====================================================================
      // STRATEGY 4: Wikimedia Commons search (fallback for all vehicles)
      // Only runs if Strategies 2-3 failed. Uses the vehicle name or
      // a specific override search term to find photos on Commons.
      // If we already tried Commons via override (Strategy 1), skip this.
      // ====================================================================
      if (!hasCommonsOverride) {
        try {
          const searchTerm = vehicleName;
          const resp = await fetch(
            `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|mime&iiurlwidth=800&format=json&origin=*`
          );
          if (resp.ok) {
            const data = await resp.json();
            const pages = data.query?.pages;
            if (pages) {
              // Sort by search relevance (index) and find first suitable image
              const sorted = Object.values(pages).sort(
                (a: any, b: any) => (a.index || 999) - (b.index || 999)
              );
              for (const page of sorted) {
                const info = (page as any).imageinfo?.[0];
                if (info) {
                  const mime = info.mime || '';
                  // Only accept real photos, not SVGs or icons
                  if (mime.includes('jpeg') || mime.includes('png')) {
                    const url = info.thumburl || info.url;
                    if (url) {
                      imageCache[vehicleName] = url;
                      setImageUrl(url);
                      setIsLoading(false);
                      return;
                    }
                  }
                }
              }
            }
          }
        } catch {
          // All strategies failed
        }
      }

      // ====================================================================
      // STRATEGY 5: Commons category search (last resort)
      // If everything else failed, search within known Commons categories
      // using the brand name + model pattern
      // ====================================================================
      try {
        const parts = vehicleName.split(' ');
        const brand = parts[0];
        const model = parts.slice(1).join('_');
        // Try searching with just brand and core model name for broader results
        const broadSearch = `${brand} ${parts[1] || ''} ${parts[2] || ''} car`.trim();
        const resp = await fetch(
          `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(broadSearch)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=800&format=json&origin=*`
        );
        if (resp.ok) {
          const data = await resp.json();
          const pages = data.query?.pages;
          if (pages) {
            const sorted = Object.values(pages).sort(
              (a: any, b: any) => (a.index || 999) - (b.index || 999)
            );
            for (const page of sorted) {
              const info = (page as any).imageinfo?.[0];
              if (info) {
                const mime = info.mime || '';
                if (mime.includes('jpeg') || mime.includes('png')) {
                  const url = info.thumburl || info.url;
                  if (url) {
                    imageCache[vehicleName] = url;
                    setImageUrl(url);
                    setIsLoading(false);
                    return;
                  }
                }
              }
            }
          }
        }
      } catch {
        // All strategies exhausted
      }

      // All strategies exhausted
      setHasError(true);
      setIsLoading(false);
    };

    fetchImage();
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
          className="w-full h-full object-contain object-center"
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
