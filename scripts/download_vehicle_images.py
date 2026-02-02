#!/usr/bin/env python3
"""
Auto Wizard - Vehicle Image Downloader
=======================================
Downloads high-resolution vehicle images from Wikipedia/Wikimedia Commons
and manufacturer press sites for all 409+ vehicles in the database.

Usage:
    python download_vehicle_images.py                    # Download all
    python download_vehicle_images.py --brand Toyota     # Download one brand
    python download_vehicle_images.py --missing-only     # Only download missing
    python download_vehicle_images.py --resolution 1600  # Custom resolution
    python download_vehicle_images.py --press-sites      # Also try manufacturer press sites
    python download_vehicle_images.py --report           # Just show status report

Requirements:
    pip install requests beautifulsoup4 Pillow

Output:
    ./vehicle-images/
    ├── Acura/
    │   ├── Acura_Integra.jpg
    │   ├── Acura_MDX.jpg
    │   └── ...
    ├── Toyota/
    │   ├── Toyota_Camry.jpg
    │   └── ...
    ├── manifest.json          # Vehicle name → image path mapping
    └── report.txt             # Download results summary

Author: Auto Wizard Team
"""

import os
import sys
import json
import time
import hashlib
import argparse
import re
import urllib.parse
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime

try:
    import requests
except ImportError:
    print("❌ Missing 'requests' library. Install with: pip install requests")
    sys.exit(1)

try:
    from bs4 import BeautifulSoup
    HAS_BS4 = True
except ImportError:
    HAS_BS4 = False

try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False

# ============================================================================
# CONFIGURATION
# ============================================================================

OUTPUT_DIR = Path("./vehicle-images")
DEFAULT_RESOLUTION = 1200  # px width for thumbnails
MAX_WORKERS = 6            # Concurrent downloads (be respectful)
RETRY_COUNT = 3
RETRY_DELAY = 2            # seconds
REQUEST_TIMEOUT = 30       # seconds
RATE_LIMIT_DELAY = 0.3     # seconds between requests (respectful crawling)

HEADERS = {
    "User-Agent": "AutoWizardBot/1.0 (Vehicle research project; contact@autowizard.com)"
}

# ============================================================================
# WIKIPEDIA TITLE MAPPINGS (from CarImage.tsx - 486 curated mappings)
# ============================================================================

WIKI_TITLE_MAPPINGS = {
    # ACURA
    "Acura Integra": "Acura_Integra",
    "Acura MDX": "Acura_MDX",
    "Acura RDX": "Acura_RDX",
    "Acura RDX A-Spec Advance": "Acura_RDX",
    "Acura TLX": "Acura_TLX",
    "Acura NSX": "Honda_NSX_(second_generation)",
    # ALFA ROMEO
    "Alfa Romeo Giulia": "Alfa_Romeo_Giulia_(952)",
    "Alfa Romeo Stelvio": "Alfa_Romeo_Stelvio",
    "Alfa Romeo Tonale": "Alfa_Romeo_Tonale",
    # ASTON MARTIN
    "Aston Martin DB11": "Aston_Martin_DB11",
    "Aston Martin DB12": "Aston_Martin_DB12",
    "Aston Martin DB12 Volante": "Aston_Martin_DB12",
    "Aston Martin DBS": "Aston_Martin_DBS_Superleggera",
    "Aston Martin DBX": "Aston_Martin_DBX",
    "Aston Martin DBX707": "Aston_Martin_DBX",
    "Aston Martin Valhalla": "Aston_Martin_Valhalla",
    "Aston Martin Valkyrie": "Aston_Martin_Valkyrie",
    "Aston Martin Vantage": "Aston_Martin_Vantage_(2018)",
    "Aston Martin Vantage Roadster": "Aston_Martin_Vantage_(2018)",
    # AUDI
    "Audi A3": "Audi_A3",
    "Audi A4": "Audi_A4",
    "Audi A4 Allroad": "Audi_A4_allroad_quattro",
    "Audi A5": "Audi_A5",
    "Audi A6": "Audi_A6",
    "Audi A7": "Audi_A7",
    "Audi A8": "Audi_A8",
    "Audi Q3": "Audi_Q3",
    "Audi Q4 e-tron": "Audi_Q4_e-tron",
    "Audi Q5": "Audi_Q5",
    "Audi Q7": "Audi_Q7",
    "Audi Q8": "Audi_Q8",
    "Audi e-tron": "Audi_e-tron_(2018)",
    "Audi e-tron GT": "Audi_e-tron_GT",
    "Audi S3": "Audi_S3",
    "Audi S4": "Audi_S4",
    "Audi S5": "Audi_S5",
    "Audi S6": "Audi_S6",
    "Audi S7": "Audi_S7",
    "Audi SQ5": "Audi_SQ5",
    "Audi SQ7": "Audi_SQ7",
    "Audi SQ8": "Audi_SQ8",
    "Audi RS Q8": "Audi_RS_Q8",
    "Audi RS5": "Audi_RS5",
    "Audi RS6": "Audi_RS6",
    "Audi RS7": "Audi_RS7",
    "Audi R8": "Audi_R8",
    "Audi TT": "Audi_TT",
    # BENTLEY
    "Bentley Bentayga": "Bentley_Bentayga",
    "Bentley Bentayga EWB": "Bentley_Bentayga",
    "Bentley Bentayga S": "Bentley_Bentayga",
    "Bentley Continental GT": "Bentley_Continental_GT",
    "Bentley Continental GT Convertible": "Bentley_Continental_GT",
    "Bentley Continental GT Speed": "Bentley_Continental_GT",
    "Bentley Flying Spur": "Bentley_Flying_Spur_(2019)",
    "Bentley Flying Spur Speed": "Bentley_Flying_Spur_(2019)",
    # BMW
    "BMW 2 Series": "BMW_2_Series",
    "BMW 3 Series": "BMW_3_Series_(G20)",
    "BMW 4 Series": "BMW_4_Series_(G22)",
    "BMW 5 Series": "BMW_5_Series_(G60)",
    "BMW 7 Series": "BMW_7_Series_(G70)",
    "BMW 8 Series": "BMW_8_Series_(G15)",
    "BMW X1": "BMW_X1",
    "BMW X2": "BMW_X2",
    "BMW X3": "BMW_X3",
    "BMW X3 M40i": "BMW_X3",
    "BMW X4": "BMW_X4",
    "BMW X5": "BMW_X5_(G05)",
    "BMW X5 M50i": "BMW_X5_(G05)",
    "BMW X5M": "BMW_X5_(G05)",
    "BMW X6": "BMW_X6_(G06)",
    "BMW X6M": "BMW_X6_(G06)",
    "BMW X7": "BMW_X7_(G07)",
    "BMW X7 M60i": "BMW_X7_(G07)",
    "BMW Z4": "BMW_Z4_(G29)",
    "BMW i3": "BMW_i3",
    "BMW i4": "BMW_i4",
    "BMW i5": "BMW_i5",
    "BMW i7": "BMW_i7",
    "BMW iX": "BMW_iX",
    "BMW M2": "BMW_M2",
    "BMW M3": "BMW_M3",
    "BMW M4": "BMW_M4",
    "BMW M5": "BMW_M5",
    "BMW M8": "BMW_M8",
    "BMW M240i": "BMW_2_Series_(G42)",
    "BMW M340i": "BMW_3_Series_(G20)",
    "BMW M440i": "BMW_4_Series_(G22)",
    "BMW M550i": "BMW_5_Series_(G30)",
    # BUGATTI
    "Bugatti Chiron": "Bugatti_Chiron",
    "Bugatti Chiron Sport": "Bugatti_Chiron",
    "Bugatti Chiron Super Sport": "Bugatti_Chiron",
    "Bugatti Tourbillon": "Bugatti_Tourbillon",
    # BUICK
    "Buick Enclave": "Buick_Enclave",
    "Buick Encore": "Buick_Encore",
    "Buick Encore GX": "Buick_Encore_GX",
    "Buick Envision": "Buick_Envision",
    # CADILLAC
    "Cadillac CT4": "Cadillac_CT4",
    "Cadillac CT5": "Cadillac_CT5",
    "Cadillac Celestiq": "Cadillac_Celestiq",
    "Cadillac Escalade": "Cadillac_Escalade",
    "Cadillac Escalade-V": "Cadillac_Escalade",
    "Cadillac Lyriq": "Cadillac_Lyriq",
    "Cadillac Lyriq-V": "Cadillac_Lyriq",
    "Cadillac Vistiq": "Cadillac_Vistiq",
    "Cadillac XT4": "Cadillac_XT4",
    "Cadillac XT5": "Cadillac_XT5",
    "Cadillac XT6": "Cadillac_XT6",
    # CHEVROLET
    "Chevrolet Blazer": "Chevrolet_Blazer_(crossover)",
    "Chevrolet Bolt": "Chevrolet_Bolt",
    "Chevrolet Bolt EUV": "Chevrolet_Bolt_EUV",
    "Chevrolet Camaro": "Chevrolet_Camaro_(sixth_generation)",
    "Chevrolet Camaro ZL1": "Chevrolet_Camaro_(sixth_generation)",
    "Chevrolet Colorado": "Chevrolet_Colorado",
    "Chevrolet Colorado ZR2": "Chevrolet_Colorado",
    "Chevrolet Corvette": "Chevrolet_Corvette_(C8)",
    "Chevrolet Corvette Z06": "Chevrolet_Corvette_Z06",
    "Chevrolet Corvette ZR1": "Chevrolet_Corvette_ZR1",
    "Chevrolet Equinox": "Chevrolet_Equinox",
    "Chevrolet Express": "Chevrolet_Express",
    "Chevrolet Malibu": "Chevrolet_Malibu",
    "Chevrolet Silverado": "Chevrolet_Silverado",
    "Chevrolet Silverado 1500": "Chevrolet_Silverado",
    "Chevrolet Silverado 2500HD": "Chevrolet_Silverado",
    "Chevrolet Silverado EV": "Chevrolet_Silverado_EV",
    "Chevrolet Silverado ZR2": "Chevrolet_Silverado",
    "Chevrolet Spark": "Chevrolet_Spark",
    "Chevrolet Suburban": "Chevrolet_Suburban",
    "Chevrolet Tahoe": "Chevrolet_Tahoe",
    "Chevrolet Tahoe Z71": "Chevrolet_Tahoe",
    "Chevrolet Trailblazer": "Chevrolet_Trailblazer_(crossover)",
    "Chevrolet Traverse": "Chevrolet_Traverse",
    "Chevrolet Trax": "Chevrolet_Trax",
    # CHRYSLER
    "Chrysler 300": "Chrysler_300_(2011)",
    "Chrysler Pacifica": "Chrysler_Pacifica_(minivan)",
    "Chrysler Voyager": "Chrysler_Voyager_(2020)",
    # DODGE
    "Dodge Challenger": "Dodge_Challenger",
    "Dodge Challenger SRT Hellcat": "Dodge_Challenger_SRT_Hellcat",
    "Dodge Charger": "Dodge_Charger_(LX/LD)",
    "Dodge Charger SRT Hellcat": "Dodge_Charger_(LX/LD)",
    "Dodge Durango": "Dodge_Durango",
    "Dodge Durango SRT 392": "Dodge_Durango",
    "Dodge Durango SRT Hellcat": "Dodge_Durango",
    "Dodge Hornet": "Dodge_Hornet_(2023)",
    # FERRARI
    "Ferrari 296 GTB": "Ferrari_296_GTB",
    "Ferrari 296 GTS": "Ferrari_296_GTS",
    "Ferrari 812 GTS": "Ferrari_812_Superfast",
    "Ferrari 812 Superfast": "Ferrari_812_Superfast",
    "Ferrari F8": "Ferrari_F8",
    "Ferrari F8 Tributo": "Ferrari_F8",
    "Ferrari F8 Spider": "Ferrari_F8",
    "Ferrari Purosangue": "Ferrari_Purosangue",
    "Ferrari Roma": "Ferrari_Roma",
    "Ferrari Roma Spider": "Ferrari_Roma",
    "Ferrari SF90": "Ferrari_SF90_Stradale",
    "Ferrari SF90 Stradale": "Ferrari_SF90_Stradale",
    "Ferrari SF90 Spider": "Ferrari_SF90_Stradale",
    # FORD
    "Ford Bronco": "Ford_Bronco_(sixth_generation)",
    "Ford Bronco Raptor": "Ford_Bronco_(sixth_generation)",
    "Ford Bronco Sport": "Ford_Bronco_Sport",
    "Ford Edge": "Ford_Edge",
    "Ford Edge ST": "Ford_Edge",
    "Ford Escape": "Ford_Escape",
    "Ford Expedition": "Ford_Expedition",
    "Ford Explorer": "Ford_Explorer",
    "Ford Explorer ST": "Ford_Explorer",
    "Ford F-150": "Ford_F-Series",
    "Ford F-150 Lightning": "Ford_F-150_Lightning",
    "Ford F-150 Raptor": "Ford_F-150_Raptor",
    "Ford F-150 Raptor R": "Ford_F-150_Raptor",
    "Ford F-250": "Ford_Super_Duty",
    "Ford Maverick": "Ford_Maverick_(2022)",
    "Ford Mustang": "Ford_Mustang_(seventh_generation)",
    "Ford Mustang GT": "Ford_Mustang_(seventh_generation)",
    "Ford Mustang Mach-E": "Ford_Mustang_Mach-E",
    "Ford Mustang Shelby GT500": "Ford_Mustang_Shelby_GT500",
    "Ford Ranger": "Ford_Ranger_(Americas)",
    "Ford Transit": "Ford_Transit",
    # GENESIS
    "Genesis G70": "Genesis_G70",
    "Genesis G70 Shooting Brake": "Genesis_G70",
    "Genesis G80": "Genesis_G80",
    "Genesis G90": "Genesis_G90",
    "Genesis GV60": "Genesis_GV60",
    "Genesis GV60 Performance": "Genesis_GV60",
    "Genesis GV70": "Genesis_GV70",
    "Genesis GV80": "Genesis_GV80",
    # GMC
    "GMC Acadia": "GMC_Acadia",
    "GMC Canyon": "GMC_Canyon",
    "GMC Canyon AT4X": "GMC_Canyon",
    "GMC Hummer EV": "GMC_Hummer_EV",
    "GMC Sierra": "GMC_Sierra",
    "GMC Sierra 1500": "GMC_Sierra",
    "GMC Sierra 2500HD": "GMC_Sierra",
    "GMC Sierra AT4X": "GMC_Sierra",
    "GMC Terrain": "GMC_Terrain",
    "GMC Yukon": "GMC_Yukon",
    "GMC Yukon AT4": "GMC_Yukon",
    "GMC Yukon Denali Ultimate": "GMC_Yukon",
    "GMC Yukon XL": "GMC_Yukon",
    # HONDA
    "Honda Accord": "Honda_Accord",
    "Honda Accord Sport": "Honda_Accord",
    "Honda Civic": "Honda_Civic_(eleventh_generation)",
    "Honda Civic Hatchback": "Honda_Civic_(eleventh_generation)",
    "Honda Civic Si": "Honda_Civic_Si",
    "Honda Civic Type R": "Honda_Civic_Type_R",
    "Honda CR-V": "Honda_CR-V",
    "Honda CR-V Hybrid Sport Touring": "Honda_CR-V",
    "Honda CR-V Sport Touring": "Honda_CR-V",
    "Honda HR-V": "Honda_HR-V",
    "Honda Odyssey": "Honda_Odyssey_(North_America)",
    "Honda Passport": "Honda_Passport",
    "Honda Passport TrailSport": "Honda_Passport",
    "Honda Pilot": "Honda_Pilot",
    "Honda Pilot TrailSport": "Honda_Pilot",
    "Honda Ridgeline": "Honda_Ridgeline",
    "Honda Prologue": "Honda_Prologue",
    # HYUNDAI
    "Hyundai Elantra": "Hyundai_Elantra",
    "Hyundai Ioniq 5": "Hyundai_Ioniq_5",
    "Hyundai Ioniq 6": "Hyundai_Ioniq_6",
    "Hyundai Ioniq 9": "Hyundai_Ioniq_7",
    "Hyundai Kona": "Hyundai_Kona",
    "Hyundai Kona Electric": "Hyundai_Kona_Electric",
    "Hyundai Palisade": "Hyundai_Palisade",
    "Hyundai Santa Cruz": "Hyundai_Santa_Cruz",
    "Hyundai Santa Fe": "Hyundai_Santa_Fe",
    "Hyundai Sonata": "Hyundai_Sonata",
    "Hyundai Tucson": "Hyundai_Tucson",
    "Hyundai Venue": "Hyundai_Venue",
    # INFINITI
    "Infiniti Q50": "Infiniti_Q50",
    "Infiniti Q50 Red Sport 400": "Infiniti_Q50",
    "Infiniti Q60": "Infiniti_Q60",
    "Infiniti Q60 Red Sport 400": "Infiniti_Q60",
    "Infiniti QX50": "Infiniti_QX50",
    "Infiniti QX55": "Infiniti_QX55",
    "Infiniti QX60": "Infiniti_QX60",
    "Infiniti QX80": "Infiniti_QX80",
    # JAGUAR
    "Jaguar E-PACE": "Jaguar_E-Pace",
    "Jaguar F-PACE": "Jaguar_F-Pace",
    "Jaguar F-Type": "Jaguar_F-Type",
    "Jaguar I-PACE": "Jaguar_I-Pace",
    "Jaguar XE": "Jaguar_XE",
    "Jaguar XF": "Jaguar_XF_(X260)",
    # JEEP
    "Jeep Cherokee": "Jeep_Cherokee_(KL)",
    "Jeep Compass": "Jeep_Compass_(MP)",
    "Jeep Gladiator": "Jeep_Gladiator_(JT)",
    "Jeep Grand Cherokee": "Jeep_Grand_Cherokee_(WL)",
    "Jeep Grand Cherokee L": "Jeep_Grand_Cherokee_(WL)",
    "Jeep Grand Cherokee Summit": "Jeep_Grand_Cherokee_(WL)",
    "Jeep Grand Cherokee Trailhawk": "Jeep_Grand_Cherokee_(WL)",
    "Jeep Grand Wagoneer": "Jeep_Grand_Wagoneer_(WS)",
    "Jeep Wagoneer": "Jeep_Wagoneer_(WS)",
    "Jeep Wrangler": "Jeep_Wrangler_(JL)",
    "Jeep Wrangler Rubicon 392": "Jeep_Wrangler_(JL)",
    # KIA
    "Kia Carnival": "Kia_Carnival",
    "Kia EV5": "Kia_EV5",
    "Kia EV6": "Kia_EV6",
    "Kia EV9": "Kia_EV9",
    "Kia Forte": "Kia_Forte",
    "Kia K5": "Kia_K5",
    "Kia Niro": "Kia_Niro",
    "Kia Seltos": "Kia_Seltos",
    "Kia Sorento": "Kia_Sorento",
    "Kia Sorento SX Prestige": "Kia_Sorento",
    "Kia Soul": "Kia_Soul",
    "Kia Sportage": "Kia_Sportage",
    "Kia Telluride": "Kia_Telluride",
    # KOENIGSEGG
    "Koenigsegg CC850": "Koenigsegg_CC850",
    "Koenigsegg Gemera": "Koenigsegg_Gemera",
    "Koenigsegg Jesko": "Koenigsegg_Jesko",
    "Koenigsegg Jesko Absolut": "Koenigsegg_Jesko",
    "Koenigsegg Regera": "Koenigsegg_Regera",
    # LAMBORGHINI
    "Lamborghini Huracán": "Lamborghini_Hurac%C3%A1n",
    "Lamborghini Huracán STO": "Lamborghini_Hurac%C3%A1n_STO",
    "Lamborghini Huracán Sterrato": "Lamborghini_Hurac%C3%A1n",
    "Lamborghini Huracán Tecnica": "Lamborghini_Hurac%C3%A1n",
    "Lamborghini Revuelto": "Lamborghini_Revuelto",
    "Lamborghini Urus": "Lamborghini_Urus",
    "Lamborghini Urus SE": "Lamborghini_Urus",
    # LEXUS
    "Lexus ES": "Lexus_ES",
    "Lexus ES 350": "Lexus_ES",
    "Lexus GX": "Lexus_GX",
    "Lexus IS": "Lexus_IS",
    "Lexus IS 300": "Lexus_IS",
    "Lexus IS 500": "Lexus_IS",
    "Lexus LC": "Lexus_LC",
    "Lexus LC 500": "Lexus_LC",
    "Lexus LC 500 Convertible": "Lexus_LC",
    "Lexus LX": "Lexus_LX",
    "Lexus NX": "Lexus_NX",
    "Lexus NX 350 F Sport": "Lexus_NX",
    "Lexus RC": "Lexus_RC",
    "Lexus RC F": "Lexus_RC_F",
    "Lexus RX": "Lexus_RX",
    "Lexus RX 350 F Sport": "Lexus_RX",
    "Lexus RX 500h F Sport": "Lexus_RX",
    "Lexus TX": "Lexus_TX",
    "Lexus UX": "Lexus_UX",
    # LINCOLN
    "Lincoln Aviator": "Lincoln_Aviator",
    "Lincoln Aviator Black Label": "Lincoln_Aviator",
    "Lincoln Corsair": "Lincoln_Corsair",
    "Lincoln Corsair Reserve": "Lincoln_Corsair",
    "Lincoln Nautilus": "Lincoln_Nautilus",
    "Lincoln Nautilus Reserve": "Lincoln_Nautilus",
    "Lincoln Navigator": "Lincoln_Navigator",
    "Lincoln Navigator Black Label": "Lincoln_Navigator",
    # LOTUS
    "Lotus Eletre": "Lotus_Eletre",
    "Lotus Eletre R": "Lotus_Eletre",
    "Lotus Emeya": "Lotus_Emeya",
    "Lotus Emeya R": "Lotus_Emeya",
    "Lotus Emira": "Lotus_Emira",
    "Lotus Emira V6 First Edition": "Lotus_Emira",
    "Lotus Evija": "Lotus_Evija",
    # LUCID
    "Lucid Air": "Lucid_Air",
    "Lucid Air Grand Touring": "Lucid_Air",
    "Lucid Air Pure": "Lucid_Air",
    "Lucid Air Sapphire": "Lucid_Air",
    "Lucid Air Touring": "Lucid_Air",
    "Lucid Gravity": "Lucid_Gravity",
    # MASERATI
    "Maserati Ghibli": "Maserati_Ghibli_(M157)",
    "Maserati Ghibli Trofeo": "Maserati_Ghibli_(M157)",
    "Maserati GranCabrio": "Maserati_GranTurismo",
    "Maserati GranTurismo": "Maserati_GranTurismo",
    "Maserati GranTurismo Folgore": "Maserati_GranTurismo",
    "Maserati GranTurismo Trofeo": "Maserati_GranTurismo",
    "Maserati Grecale": "Maserati_Grecale",
    "Maserati Grecale Folgore": "Maserati_Grecale",
    "Maserati Grecale Trofeo": "Maserati_Grecale",
    "Maserati MC20": "Maserati_MC20",
    "Maserati MC20 Cielo": "Maserati_MC20",
    "Maserati Quattroporte": "Maserati_Quattroporte",
    "Maserati Quattroporte Trofeo": "Maserati_Quattroporte",
    # MAZDA
    "Mazda 3": "Mazda3",
    "Mazda 3 Hatchback": "Mazda3",
    "Mazda CX-30": "Mazda_CX-30",
    "Mazda CX-5": "Mazda_CX-5",
    "Mazda CX-5 Turbo": "Mazda_CX-5",
    "Mazda CX-50": "Mazda_CX-50",
    "Mazda CX-50 Meridian": "Mazda_CX-50",
    "Mazda CX-50 Meridian Edition": "Mazda_CX-50",
    "Mazda CX-70": "Mazda_CX-70",
    "Mazda CX-90": "Mazda_CX-90",
    "Mazda CX-90 PHEV": "Mazda_CX-90",
    "Mazda CX-90 PHEV Premium": "Mazda_CX-90",
    "Mazda MX-5 Miata": "Mazda_MX-5_(ND)",
    "Mazda6": "Mazda6",
    # MCLAREN
    "McLaren 750S": "McLaren_750S",
    "McLaren 750S Spider": "McLaren_750S",
    "McLaren Artura": "McLaren_Artura",
    "McLaren Artura Spider": "McLaren_Artura",
    "McLaren GT": "McLaren_GT",
    # MERCEDES-BENZ
    "Mercedes-Benz A-Class": "Mercedes-Benz_A-Class",
    "Mercedes-Benz C-Class": "Mercedes-Benz_C-Class_(W206)",
    "Mercedes-Benz CLA": "Mercedes-Benz_CLA-Class",
    "Mercedes-Benz E-Class": "Mercedes-Benz_E-Class_(W214)",
    "Mercedes-Benz EQB": "Mercedes-Benz_EQB",
    "Mercedes-Benz EQE": "Mercedes-Benz_EQE",
    "Mercedes-Benz EQS": "Mercedes-Benz_EQS",
    "Mercedes-Benz G-Class": "Mercedes-Benz_G-Class",
    "Mercedes-Benz GLA": "Mercedes-Benz_GLA-Class",
    "Mercedes-Benz GLB": "Mercedes-Benz_GLB-Class",
    "Mercedes-Benz GLC": "Mercedes-Benz_GLC-Class",
    "Mercedes-Benz GLE": "Mercedes-Benz_GLE-Class",
    "Mercedes-Benz GLS": "Mercedes-Benz_GLS-Class",
    "Mercedes-Benz S-Class": "Mercedes-Benz_S-Class_(W223)",
    # MERCEDES-AMG
    "Mercedes-AMG A35": "Mercedes-AMG_A35",
    "Mercedes-AMG C43": "Mercedes-AMG_C43",
    "Mercedes-AMG C63": "Mercedes-AMG_C63",
    "Mercedes-AMG E53": "Mercedes-AMG_E53",
    "Mercedes-AMG E63 S": "Mercedes-AMG_E63",
    "Mercedes-AMG GLC43": "Mercedes-AMG_GLC43",
    "Mercedes-AMG GLC63": "Mercedes-AMG_GLC63",
    "Mercedes-AMG GLE53": "Mercedes-AMG_GLE53",
    "Mercedes-AMG GLE63 S": "Mercedes-AMG_GLE63",
    "Mercedes-AMG GLS63": "Mercedes-AMG_GLS63",
    "Mercedes-AMG GT": "Mercedes-AMG_GT",
    "Mercedes-AMG SL": "Mercedes-Benz_SL-Class_(R232)",
    # NISSAN
    "Nissan Altima": "Nissan_Altima",
    "Nissan Ariya": "Nissan_Ariya",
    "Nissan Frontier": "Nissan_Frontier",
    "Nissan Kicks": "Nissan_Kicks",
    "Nissan Leaf": "Nissan_Leaf",
    "Nissan Murano": "Nissan_Murano",
    "Nissan Pathfinder": "Nissan_Pathfinder",
    "Nissan Pathfinder Rock Creek": "Nissan_Pathfinder",
    "Nissan Rogue": "Nissan_Rogue",
    "Nissan Rogue SL": "Nissan_Rogue",
    "Nissan Sentra": "Nissan_Sentra",
    "Nissan Titan": "Nissan_Titan",
    "Nissan Versa": "Nissan_Versa",
    "Nissan Z": "Nissan_Z_(RZ34)",
    "Nissan Z Nismo": "Nissan_Z_(RZ34)",
    # PAGANI
    "Pagani Huayra": "Pagani_Huayra",
    "Pagani Huayra Roadster": "Pagani_Huayra",
    "Pagani Utopia": "Pagani_Utopia",
    # PORSCHE
    "Porsche 718 Boxster": "Porsche_718_Boxster",
    "Porsche 718 Cayman": "Porsche_718_Cayman",
    "Porsche 911": "Porsche_911",
    "Porsche Cayenne": "Porsche_Cayenne",
    "Porsche Macan": "Porsche_Macan",
    "Porsche Panamera": "Porsche_Panamera",
    "Porsche Taycan": "Porsche_Taycan",
    # RAM
    "Ram 1500": "Ram_1500",
    "Ram 1500 Limited": "Ram_1500",
    "Ram 1500 Rebel": "Ram_1500",
    "Ram 1500 TRX": "Ram_1500_TRX",
    "Ram 2500": "Ram_2500",
    "Ram 3500": "Ram_3500",
    # RIVIAN
    "Rivian R1S": "Rivian_R1S",
    "Rivian R1T": "Rivian_R1T",
    # ROLLS-ROYCE
    "Rolls-Royce Cullinan": "Rolls-Royce_Cullinan",
    "Rolls-Royce Cullinan Black Badge": "Rolls-Royce_Cullinan",
    "Rolls-Royce Ghost": "Rolls-Royce_Ghost",
    "Rolls-Royce Ghost Black Badge": "Rolls-Royce_Ghost",
    "Rolls-Royce Ghost Extended": "Rolls-Royce_Ghost",
    "Rolls-Royce Phantom": "Rolls-Royce_Phantom_(VIII)",
    "Rolls-Royce Phantom Extended": "Rolls-Royce_Phantom_(VIII)",
    "Rolls-Royce Spectre": "Rolls-Royce_Spectre",
    # SUBARU
    "Subaru Ascent": "Subaru_Ascent",
    "Subaru BRZ": "Subaru_BRZ",
    "Subaru Crosstrek": "Subaru_Crosstrek",
    "Subaru Crosstrek Wilderness": "Subaru_Crosstrek",
    "Subaru Forester": "Subaru_Forester",
    "Subaru Forester Wilderness": "Subaru_Forester",
    "Subaru Impreza": "Subaru_Impreza",
    "Subaru Legacy": "Subaru_Legacy",
    "Subaru Outback": "Subaru_Outback",
    "Subaru Outback Wilderness": "Subaru_Outback",
    "Subaru WRX": "Subaru_WRX",
    "Subaru WRX TR": "Subaru_WRX",
    "Subaru Solterra": "Subaru_Solterra",
    # TESLA
    "Tesla Cybertruck": "Tesla_Cybertruck",
    "Tesla Model 3": "Tesla_Model_3",
    "Tesla Model S": "Tesla_Model_S",
    "Tesla Model X": "Tesla_Model_X",
    "Tesla Model Y": "Tesla_Model_Y",
    # TOYOTA
    "Toyota 4Runner": "Toyota_4Runner",
    "Toyota 4Runner TRD Pro": "Toyota_4Runner",
    "Toyota Camry": "Toyota_Camry",
    "Toyota Corolla": "Toyota_Corolla_(E210)",
    "Toyota Corolla Cross": "Toyota_Corolla_Cross",
    "Toyota Corolla Hatchback": "Toyota_Corolla_(E210)",
    "Toyota Crown": "Toyota_Crown_(S230)",
    "Toyota Crown Signia": "Toyota_Crown_(S230)",
    "Toyota GR Corolla": "Toyota_GR_Corolla",
    "Toyota GR Supra": "Toyota_Supra_(J29/DB)",
    "Toyota GR86": "Toyota_GR86",
    "Toyota Grand Highlander": "Toyota_Grand_Highlander",
    "Toyota Highlander": "Toyota_Highlander",
    "Toyota Land Cruiser": "Toyota_Land_Cruiser_(J300)",
    "Toyota Land Cruiser 250": "Toyota_Land_Cruiser_Prado",
    "Toyota Prius": "Toyota_Prius_(XW60)",
    "Toyota RAV4": "Toyota_RAV4",
    "Toyota RAV4 TRD Off-Road": "Toyota_RAV4",
    "Toyota Sequoia": "Toyota_Sequoia",
    "Toyota Sienna": "Toyota_Sienna",
    "Toyota Tacoma": "Toyota_Tacoma",
    "Toyota Tacoma TRD Pro": "Toyota_Tacoma",
    "Toyota Tundra": "Toyota_Tundra",
    "Toyota Tundra TRD Pro": "Toyota_Tundra",
    "Toyota Venza": "Toyota_Venza",
    "Toyota bZ4X": "Toyota_bZ4X",
    # VOLKSWAGEN
    "Volkswagen Atlas": "Volkswagen_Atlas",
    "Volkswagen Atlas Peak Edition": "Volkswagen_Atlas",
    "Volkswagen Golf": "Volkswagen_Golf_Mk8",
    "Volkswagen Golf GTI": "Volkswagen_Golf_GTI",
    "Volkswagen Golf R": "Volkswagen_Golf_R",
    "Volkswagen ID.4": "Volkswagen_ID.4",
    "Volkswagen ID.4 Pro S": "Volkswagen_ID.4",
    "Volkswagen ID.Buzz": "Volkswagen_ID._Buzz",
    "Volkswagen ID.Buzz LWB": "Volkswagen_ID._Buzz",
    "Volkswagen Jetta": "Volkswagen_Jetta",
    "Volkswagen Jetta Sport": "Volkswagen_Jetta",
    "Volkswagen Taos": "Volkswagen_Taos",
    "Volkswagen Tiguan": "Volkswagen_Tiguan",
    # VOLVO
    "Volvo C40 Recharge": "Volvo_C40",
    "Volvo EX30": "Volvo_EX30",
    "Volvo EX90": "Volvo_EX90",
    "Volvo S60": "Volvo_S60",
    "Volvo S90": "Volvo_S90",
    "Volvo V60": "Volvo_V60",
    "Volvo V90": "Volvo_V90",
    "Volvo XC40": "Volvo_XC40",
    "Volvo XC40 Recharge": "Volvo_XC40",
    "Volvo XC60": "Volvo_XC60",
    "Volvo XC60 Recharge": "Volvo_XC60",
    "Volvo XC90": "Volvo_XC90",
    "Volvo XC90 Recharge": "Volvo_XC90",
}

# ============================================================================
# ALL VEHICLES IN DATABASE (409 total)
# ============================================================================

ALL_VEHICLES = [
    "Acura Integra", "Acura TLX", "Acura RDX", "Acura RDX A-Spec Advance", "Acura MDX",
    "Alfa Romeo Giulia", "Alfa Romeo Stelvio",
    "Aston Martin DB12", "Aston Martin DB12 Volante", "Aston Martin DBS", "Aston Martin DBX",
    "Aston Martin DBX707", "Aston Martin Vantage", "Aston Martin Vantage Roadster",
    "Audi A4", "Audi A4 Allroad", "Audi A5", "Audi A6", "Audi Q3", "Audi Q5", "Audi Q7",
    "Audi Q8", "Audi e-tron", "Audi e-tron GT", "Audi S3", "Audi S4", "Audi S5", "Audi S6",
    "Audi S7", "Audi SQ5", "Audi SQ7", "Audi SQ8", "Audi RS Q8",
    "Bentley Bentayga", "Bentley Bentayga EWB", "Bentley Bentayga S",
    "Bentley Continental GT", "Bentley Continental GT Convertible", "Bentley Continental GT Speed",
    "Bentley Flying Spur", "Bentley Flying Spur Speed",
    "BMW 3 Series", "BMW 4 Series", "BMW 5 Series", "BMW 7 Series", "BMW M3", "BMW M4",
    "BMW M240i", "BMW M340i", "BMW M440i", "BMW M550i", "BMW X1", "BMW X3", "BMW X3 M40i",
    "BMW X5", "BMW X7", "BMW Z4", "BMW i4", "BMW i5", "BMW i7", "BMW iX",
    "Bugatti Chiron", "Bugatti Chiron Sport", "Bugatti Chiron Super Sport", "Bugatti Tourbillon",
    "Cadillac CT4", "Cadillac CT5", "Cadillac Escalade", "Cadillac Escalade-V",
    "Cadillac Lyriq", "Cadillac XT4", "Cadillac XT5", "Cadillac XT6",
    "Chevrolet Blazer", "Chevrolet Colorado", "Chevrolet Colorado ZR2", "Chevrolet Corvette",
    "Chevrolet Corvette Z06", "Chevrolet Equinox", "Chevrolet Malibu", "Chevrolet Silverado 1500",
    "Chevrolet Silverado 2500HD", "Chevrolet Silverado EV", "Chevrolet Suburban", "Chevrolet Tahoe",
    "Chevrolet Trailblazer", "Chevrolet Traverse", "Chevrolet Trax",
    "Chrysler Pacifica",
    "Dodge Challenger", "Dodge Challenger SRT Hellcat", "Dodge Charger", "Dodge Charger SRT Hellcat",
    "Dodge Durango", "Dodge Durango SRT Hellcat", "Dodge Hornet",
    "Ferrari 296 GTB", "Ferrari 296 GTS", "Ferrari 812 Superfast", "Ferrari F8 Tributo",
    "Ferrari Purosangue", "Ferrari Roma", "Ferrari SF90 Stradale",
    "Ford Bronco", "Ford Bronco Sport", "Ford Escape", "Ford Expedition", "Ford Explorer",
    "Ford F-150", "Ford F-150 Lightning", "Ford F-150 Raptor", "Ford F-250", "Ford Maverick",
    "Ford Mustang", "Ford Mustang GT", "Ford Mustang Mach-E", "Ford Ranger",
    "Genesis G70", "Genesis G80", "Genesis G90", "Genesis GV60", "Genesis GV70", "Genesis GV80",
    "GMC Acadia", "GMC Canyon", "GMC Hummer EV", "GMC Sierra 1500", "GMC Sierra 2500HD",
    "GMC Terrain", "GMC Yukon", "GMC Yukon XL",
    "Honda Accord", "Honda Civic", "Honda Civic Type R", "Honda CR-V", "Honda HR-V",
    "Honda Odyssey", "Honda Passport", "Honda Pilot", "Honda Ridgeline", "Honda Prologue",
    "Hyundai Elantra", "Hyundai Ioniq 5", "Hyundai Ioniq 6", "Hyundai Kona",
    "Hyundai Kona Electric", "Hyundai Palisade", "Hyundai Santa Cruz", "Hyundai Santa Fe",
    "Hyundai Sonata", "Hyundai Tucson", "Hyundai Venue",
    "Infiniti Q50", "Infiniti QX50", "Infiniti QX55", "Infiniti QX60", "Infiniti QX80",
    "Jaguar F-PACE", "Jaguar F-Type", "Jaguar I-PACE",
    "Jeep Cherokee", "Jeep Compass", "Jeep Gladiator", "Jeep Grand Cherokee",
    "Jeep Grand Cherokee L", "Jeep Grand Wagoneer", "Jeep Wagoneer", "Jeep Wrangler",
    "Kia Carnival", "Kia EV6", "Kia EV9", "Kia Forte", "Kia K5", "Kia Niro",
    "Kia Seltos", "Kia Sorento", "Kia Soul", "Kia Sportage", "Kia Telluride",
    "Koenigsegg Gemera", "Koenigsegg Jesko", "Koenigsegg Regera",
    "Lamborghini Huracán", "Lamborghini Huracán STO", "Lamborghini Revuelto",
    "Lamborghini Urus",
    "Lexus ES", "Lexus GX", "Lexus IS", "Lexus IS 500", "Lexus LC 500",
    "Lexus LC 500 Convertible", "Lexus LX", "Lexus NX", "Lexus RC F", "Lexus RX",
    "Lexus TX", "Lexus UX",
    "Lincoln Aviator", "Lincoln Corsair", "Lincoln Nautilus", "Lincoln Navigator",
    "Lotus Eletre", "Lotus Emeya", "Lotus Emira", "Lotus Evija",
    "Lucid Air", "Lucid Air Grand Touring", "Lucid Air Sapphire", "Lucid Gravity",
    "Maserati GranTurismo", "Maserati Grecale", "Maserati MC20",
    "Mazda 3", "Mazda CX-30", "Mazda CX-5", "Mazda CX-50", "Mazda CX-70",
    "Mazda CX-90", "Mazda MX-5 Miata",
    "McLaren 750S", "McLaren Artura", "McLaren GT",
    "Mercedes-Benz C-Class", "Mercedes-Benz E-Class", "Mercedes-Benz EQB",
    "Mercedes-Benz EQE", "Mercedes-Benz EQS", "Mercedes-Benz G-Class", "Mercedes-Benz GLA",
    "Mercedes-Benz GLB", "Mercedes-Benz GLC", "Mercedes-Benz GLE", "Mercedes-Benz GLS",
    "Mercedes-Benz S-Class",
    "Mercedes-AMG C63", "Mercedes-AMG E63 S", "Mercedes-AMG GLE63 S", "Mercedes-AMG GT",
    "Mercedes-AMG SL",
    "Nissan Altima", "Nissan Ariya", "Nissan Frontier", "Nissan Kicks", "Nissan Leaf",
    "Nissan Murano", "Nissan Pathfinder", "Nissan Rogue", "Nissan Sentra", "Nissan Versa",
    "Nissan Z",
    "Pagani Huayra", "Pagani Utopia",
    "Porsche 718 Cayman", "Porsche 911", "Porsche Cayenne", "Porsche Macan",
    "Porsche Panamera", "Porsche Taycan",
    "Ram 1500", "Ram 1500 TRX", "Ram 2500", "Ram 3500",
    "Rivian R1S", "Rivian R1T",
    "Rolls-Royce Cullinan", "Rolls-Royce Ghost", "Rolls-Royce Phantom", "Rolls-Royce Spectre",
    "Subaru Ascent", "Subaru BRZ", "Subaru Crosstrek", "Subaru Forester", "Subaru Impreza",
    "Subaru Legacy", "Subaru Outback", "Subaru WRX", "Subaru Solterra",
    "Tesla Cybertruck", "Tesla Model 3", "Tesla Model S", "Tesla Model X", "Tesla Model Y",
    "Toyota 4Runner", "Toyota Camry", "Toyota Corolla", "Toyota Corolla Cross",
    "Toyota Crown", "Toyota GR Corolla", "Toyota GR Supra", "Toyota GR86",
    "Toyota Grand Highlander", "Toyota Highlander", "Toyota Land Cruiser",
    "Toyota Prius", "Toyota RAV4", "Toyota Sequoia", "Toyota Sienna",
    "Toyota Tacoma", "Toyota Tundra", "Toyota Venza", "Toyota bZ4X",
    "Volkswagen Atlas", "Volkswagen Golf GTI", "Volkswagen Golf R", "Volkswagen ID.4",
    "Volkswagen ID.Buzz", "Volkswagen Jetta", "Volkswagen Taos", "Volkswagen Tiguan",
    "Volvo C40 Recharge", "Volvo EX30", "Volvo EX90", "Volvo S60", "Volvo S90",
    "Volvo V60", "Volvo XC40", "Volvo XC60", "Volvo XC90",
]

# ============================================================================
# MANUFACTURER PRESS SITE URLs (for fallback scraping)
# ============================================================================

PRESS_SITES = {
    "Acura": "https://acuranews.com",
    "Alfa Romeo": "https://media.stellantis.com/em-en/alfa-romeo",
    "Aston Martin": "https://media.astonmartin.com",
    "Audi": "https://www.audiusa.com/us/web/en/models.html",
    "Bentley": "https://www.bentleymedia.com",
    "BMW": "https://www.bmwusanews.com",
    "Bugatti": "https://www.bugatti.com/models/",
    "Cadillac": "https://media.cadillac.com",
    "Chevrolet": "https://media.chevrolet.com",
    "Chrysler": "https://media.stellantis.com/em-en/chrysler",
    "Dodge": "https://media.stellantis.com/em-en/dodge",
    "Ferrari": "https://www.ferrari.com/en-US/auto",
    "Ford": "https://media.ford.com",
    "Genesis": "https://www.genesisnewsusa.com",
    "GMC": "https://media.gmc.com",
    "Honda": "https://hondanews.com",
    "Hyundai": "https://www.hyundainews.com",
    "Infiniti": "https://usa.infinitinews.com",
    "Jaguar": "https://media.jaguar.com",
    "Jeep": "https://media.stellantis.com/em-en/jeep",
    "Kia": "https://www.kiamedia.com",
    "Koenigsegg": "https://www.koenigsegg.com/cars",
    "Lamborghini": "https://www.lamborghini.com/en-en/models",
    "Lexus": "https://pressroom.lexus.com",
    "Lincoln": "https://media.lincoln.com",
    "Lotus": "https://www.lotuscars.com/models/",
    "Lucid": "https://lucidmotors.com/media",
    "Maserati": "https://www.maserati.com/us/en/models",
    "Mazda": "https://insidemazda.mazdausa.com",
    "McLaren": "https://www.mclaren.com/us/",
    "Mercedes-Benz": "https://media.mbusa.com",
    "Mercedes-AMG": "https://media.mbusa.com",
    "Nissan": "https://usa.nissannews.com",
    "Pagani": "https://www.pagani.com/models/",
    "Porsche": "https://presskit.porsche.de/models/en/",
    "Ram": "https://media.stellantis.com/em-en/ram",
    "Rivian": "https://rivian.com/R1S",
    "Rolls-Royce": "https://www.press.rolls-roycemotorcars.com",
    "Subaru": "https://media.subaru.com",
    "Tesla": "https://www.tesla.com/presskit",
    "Toyota": "https://pressroom.toyota.com",
    "Volkswagen": "https://newsroom.vw.com",
    "Volvo": "https://www.media.volvocars.com",
}

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def get_brand(vehicle_name: str) -> str:
    """Extract brand name from vehicle name."""
    # Handle multi-word brands
    multi_word_brands = [
        "Alfa Romeo", "Aston Martin", "Mercedes-Benz", "Mercedes-AMG",
        "Rolls-Royce", "Land Rover"
    ]
    for brand in multi_word_brands:
        if vehicle_name.startswith(brand):
            return brand
    return vehicle_name.split()[0]


def sanitize_filename(name: str) -> str:
    """Make a string safe for use as a filename."""
    return re.sub(r'[^\w\-.]', '_', name)


def get_wiki_title(vehicle_name: str) -> str:
    """Get the Wikipedia article title for a vehicle."""
    # Check explicit mappings first
    if vehicle_name in WIKI_TITLE_MAPPINGS:
        return WIKI_TITLE_MAPPINGS[vehicle_name]
    
    # Check partial matches (e.g., "Acura RDX A-Spec" matches "Acura RDX")
    for key, value in WIKI_TITLE_MAPPINGS.items():
        if vehicle_name.startswith(key):
            return value
    
    # Default: convert name to Wikipedia format
    return vehicle_name.replace(" ", "_")


def progress_bar(current: int, total: int, prefix: str = "", width: int = 40) -> str:
    """Generate a text progress bar."""
    pct = current / total if total > 0 else 0
    filled = int(width * pct)
    bar = "█" * filled + "░" * (width - filled)
    return f"\r{prefix} [{bar}] {current}/{total} ({pct*100:.0f}%)"


# ============================================================================
# WIKIPEDIA IMAGE FETCHER
# ============================================================================

class WikiImageFetcher:
    """Fetches vehicle images from Wikipedia/Wikimedia Commons."""
    
    def __init__(self, resolution: int = DEFAULT_RESOLUTION):
        self.resolution = resolution
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
        self._cache = {}  # Cache wiki_title -> image_url to avoid duplicate API calls
    
    def get_page_image_url(self, wiki_title: str) -> dict | None:
        """
        Get the main image URL from a Wikipedia article.
        Uses the exact same API call as CarImage.tsx (which works at runtime).
        Returns dict with 'thumbnail' URL, or None.
        """
        if wiki_title in self._cache:
            return self._cache[wiki_title]
        
        # Match the exact API call from CarImage.tsx that works in production
        # Key: NO piprop parameter, include origin=*
        params = {
            "action": "query",
            "titles": wiki_title,
            "prop": "pageimages",
            "format": "json",
            "pithumbsize": self.resolution,
            "origin": "*",
        }
        
        try:
            resp = self.session.get(
                "https://en.wikipedia.org/w/api.php",
                params=params,
                timeout=REQUEST_TIMEOUT
            )
            resp.raise_for_status()
            data = resp.json()
            
            pages = data.get("query", {}).get("pages", {})
            for page_id, page_data in pages.items():
                if page_id == "-1":
                    continue
                
                result = {}
                
                # Get thumbnail (same path as CarImage.tsx: pages[pageId]?.thumbnail?.source)
                thumb = page_data.get("thumbnail", {})
                if thumb.get("source"):
                    result["thumbnail"] = thumb["source"]
                    result["thumb_width"] = thumb.get("width", 0)
                    result["thumb_height"] = thumb.get("height", 0)
                
                if result:
                    self._cache[wiki_title] = result
                    return result
            
            return None
            
        except Exception as e:
            print(f"    ⚠️  API error for {wiki_title}: {e}")
            return None
    
    def get_high_res_from_thumbnail(self, thumb_url: str) -> str | None:
        """
        Given a Wikipedia thumbnail URL, try to get the original full-res image.
        Wikipedia thumbnail URLs follow a predictable pattern:
        .../thumb/a/ab/Filename.jpg/800px-Filename.jpg
        The original is at: .../a/ab/Filename.jpg
        """
        try:
            # Pattern: /thumb/[hash1]/[hash2]/[filename]/[size]px-[filename]
            if "/thumb/" in thumb_url:
                # Remove the /thumb/ part and the size suffix
                original = thumb_url.replace("/thumb/", "/")
                # Remove the last path segment (e.g., /800px-Filename.jpg)
                original = "/".join(original.split("/")[:-1])
                return original
        except Exception:
            pass
        return None
    
    def get_all_images(self, wiki_title: str, limit: int = 10) -> list:
        """
        Get ALL images from a Wikipedia article (not just the main one).
        Useful as a fallback when the main image isn't a car photo.
        """
        params = {
            "action": "query",
            "titles": wiki_title,
            "prop": "images",
            "format": "json",
            "imlimit": limit,
            "origin": "*",
        }
        
        try:
            resp = self.session.get(
                "https://en.wikipedia.org/w/api.php",
                params=params,
                timeout=REQUEST_TIMEOUT
            )
            resp.raise_for_status()
            data = resp.json()
            
            pages = data.get("query", {}).get("pages", {})
            images = []
            for page_data in pages.values():
                for img in page_data.get("images", []):
                    title = img.get("title", "")
                    # Filter out icons, logos, flags, etc.
                    if any(skip in title.lower() for skip in [
                        "flag", "logo", "icon", "commons-logo", "wikidata",
                        "edit-clear", "question_book", "ambox", "crystal",
                        "disambig", "folder", ".svg", "padlock"
                    ]):
                        continue
                    images.append(title)
            
            return images
            
        except Exception:
            return []
    
    def get_commons_image_url(self, file_title: str) -> str | None:
        """Get the direct URL for a Wikimedia Commons file."""
        params = {
            "action": "query",
            "titles": file_title,
            "prop": "imageinfo",
            "iiprop": "url|size",
            "format": "json",
            "iiurlwidth": self.resolution,
            "origin": "*",
        }
        
        try:
            resp = self.session.get(
                "https://en.wikipedia.org/w/api.php",
                params=params,
                timeout=REQUEST_TIMEOUT
            )
            resp.raise_for_status()
            data = resp.json()
            
            pages = data.get("query", {}).get("pages", {})
            for page_data in pages.values():
                imageinfo = page_data.get("imageinfo", [{}])[0]
                # Prefer thumburl (resized) over url (original, could be huge)
                return imageinfo.get("thumburl") or imageinfo.get("url")
            
            return None
            
        except Exception:
            return None
    
    def search_commons(self, vehicle_name: str) -> str | None:
        """
        Search Wikimedia Commons directly for a vehicle image.
        Useful when the Wikipedia article doesn't have a pageimage.
        """
        # Clean up the search term
        search_term = vehicle_name.replace("-", " ")
        
        params = {
            "action": "query",
            "generator": "search",
            "gsrsearch": f"{search_term} car",
            "gsrnamespace": "6",  # File namespace
            "gsrlimit": "5",
            "prop": "imageinfo",
            "iiprop": "url|size|mime",
            "iiurlwidth": self.resolution,
            "format": "json",
            "origin": "*",
        }
        
        try:
            resp = self.session.get(
                "https://commons.wikimedia.org/w/api.php",
                params=params,
                timeout=REQUEST_TIMEOUT
            )
            resp.raise_for_status()
            data = resp.json()
            
            pages = data.get("query", {}).get("pages", {})
            for page_data in sorted(pages.values(), key=lambda p: p.get("index", 999)):
                imageinfo = page_data.get("imageinfo", [{}])[0]
                mime = imageinfo.get("mime", "")
                
                # Only accept actual photos (not SVGs, etc.)
                if "image/jpeg" in mime or "image/png" in mime:
                    width = imageinfo.get("width", 0)
                    if width >= 400:  # Skip tiny images
                        return imageinfo.get("thumburl") or imageinfo.get("url")
            
            return None
            
        except Exception:
            return None


# ============================================================================
# IMAGE DOWNLOADER
# ============================================================================

class ImageDownloader:
    """Downloads and saves vehicle images."""
    
    def __init__(self, output_dir: Path, resolution: int = DEFAULT_RESOLUTION):
        self.output_dir = output_dir
        self.resolution = resolution
        self.wiki = WikiImageFetcher(resolution)
        self.results = {
            "success": [],
            "failed": [],
            "skipped": [],
        }
    
    def download_image(self, url: str, filepath: Path) -> bool:
        """Download an image from a URL to a file path."""
        for attempt in range(RETRY_COUNT):
            try:
                resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT, stream=True)
                resp.raise_for_status()
                
                # Verify it's actually an image
                content_type = resp.headers.get("Content-Type", "")
                if "image" not in content_type and "octet-stream" not in content_type:
                    return False
                
                # Check minimum size (skip tiny images/icons)
                content_length = int(resp.headers.get("Content-Length", 0))
                if content_length > 0 and content_length < 2000:  # < 2KB probably not a real photo
                    return False
                
                filepath.parent.mkdir(parents=True, exist_ok=True)
                with open(filepath, "wb") as f:
                    for chunk in resp.iter_content(chunk_size=8192):
                        f.write(chunk)
                
                # Verify the downloaded file
                if filepath.stat().st_size < 2000:
                    filepath.unlink()
                    return False
                
                return True
                
            except Exception as e:
                if attempt < RETRY_COUNT - 1:
                    time.sleep(RETRY_DELAY)
                else:
                    return False
        
        return False
    
    def process_vehicle(self, vehicle_name: str, missing_only: bool = False) -> dict:
        """
        Download image for a single vehicle.
        Returns result dict with status info.
        """
        brand = get_brand(vehicle_name)
        filename = sanitize_filename(vehicle_name) + ".jpg"
        filepath = self.output_dir / brand / filename
        
        result = {
            "vehicle": vehicle_name,
            "brand": brand,
            "filepath": str(filepath),
            "source": None,
            "url": None,
            "status": "failed",
            "wiki_title": None,
        }
        
        # Skip if already downloaded
        if missing_only and filepath.exists() and filepath.stat().st_size > 2000:
            result["status"] = "skipped"
            result["source"] = "already_downloaded"
            return result
        
        wiki_title = get_wiki_title(vehicle_name)
        result["wiki_title"] = wiki_title
        
        # Strategy 1: Get main page image (same method as CarImage.tsx)
        image_info = self.wiki.get_page_image_url(wiki_title)
        if image_info:
            url = image_info.get("thumbnail")
            if url:
                # Try to get higher res by manipulating the thumbnail URL
                # Wikipedia thumbnails: .../thumb/.../800px-File.jpg
                # We can request a bigger size by changing the px value
                high_res_url = url
                if f"/{self.wiki.resolution}px-" in url or "px-" in url:
                    # Replace any NNNpx- with our desired resolution
                    import re as _re
                    high_res_url = _re.sub(r'/\d+px-', f'/{self.wiki.resolution}px-', url)
                
                result["url"] = high_res_url
                if self.download_image(high_res_url, filepath):
                    result["status"] = "success"
                    result["source"] = "wikipedia_main"
                    return result
                
                # Fallback to original thumbnail URL if resize failed
                if high_res_url != url:
                    result["url"] = url
                    if self.download_image(url, filepath):
                        result["status"] = "success"
                        result["source"] = "wikipedia_main"
                        return result
        
        # Strategy 2: Try all images on the page, pick the first real photo
        all_images = self.wiki.get_all_images(wiki_title)
        for img_title in all_images[:5]:  # Try first 5 non-icon images
            url = self.wiki.get_commons_image_url(img_title)
            if url:
                result["url"] = url
                if self.download_image(url, filepath):
                    result["status"] = "success"
                    result["source"] = f"wikipedia_gallery ({img_title})"
                    return result
            time.sleep(RATE_LIMIT_DELAY)
        
        # Strategy 3: Try alternative wiki titles
        alt_titles = self._generate_alt_titles(vehicle_name, wiki_title)
        for alt_title in alt_titles:
            image_info = self.wiki.get_page_image_url(alt_title)
            if image_info:
                url = image_info.get("thumbnail")
                if url:
                    result["url"] = url
                    if self.download_image(url, filepath):
                        result["status"] = "success"
                        result["source"] = f"wikipedia_alt ({alt_title})"
                        return result
            time.sleep(RATE_LIMIT_DELAY)
        
        # Strategy 4: Search Wikimedia Commons directly
        commons_url = self.wiki.search_commons(vehicle_name)
        if commons_url:
            result["url"] = commons_url
            if self.download_image(commons_url, filepath):
                result["status"] = "success"
                result["source"] = "wikimedia_commons_search"
                return result
        
        return result
    
    def _generate_alt_titles(self, vehicle_name: str, primary_title: str) -> list:
        """Generate alternative Wikipedia titles to try."""
        alts = []
        base = vehicle_name.replace(" ", "_")
        brand = get_brand(vehicle_name)
        model_part = vehicle_name.replace(brand, "").strip()
        
        # Try without generation/trim suffixes
        parts = vehicle_name.split()
        if len(parts) > 2:
            # Just brand + model (e.g., "BMW X5" from "BMW X5 M50i")
            alts.append(f"{parts[0]}_{parts[1]}")
            # Brand + first two model words (e.g., "Ford F-150" from "Ford F-150 Raptor R")
            if len(parts) > 3:
                alts.append(f"{parts[0]}_{parts[1]}_{parts[2]}")
        
        # Multi-word brands (e.g., "Aston Martin Vantage" from "Aston Martin Vantage Roadster")
        multi_word_brands = ["Alfa_Romeo", "Aston_Martin", "Mercedes-Benz", "Mercedes-AMG", "Rolls-Royce"]
        for mb in multi_word_brands:
            if base.startswith(mb) and base != mb:
                model_words = base.replace(mb + "_", "").split("_")
                if len(model_words) > 1:
                    alts.append(f"{mb}_{model_words[0]}")
        
        # Try with year prefixes
        alts.append(f"2025_{base}")
        alts.append(f"2024_{base}")
        
        # Try common Wikipedia disambiguation patterns
        alts.append(f"{base}_(automobile)")
        alts.append(f"{base}_(car)")
        
        # For specific patterns: "BMW X5 M50i" → try "BMW_X5_(G05)" style
        # These are already in WIKI_TITLE_MAPPINGS but just in case
        
        # Remove duplicates and primary
        seen = set()
        unique_alts = []
        for a in alts:
            if a != primary_title and a not in seen:
                seen.add(a)
                unique_alts.append(a)
        
        return unique_alts
    
    def run(self, vehicles: list = None, missing_only: bool = False,
            brand_filter: str = None, max_workers: int = MAX_WORKERS):
        """
        Download images for all vehicles.
        """
        if vehicles is None:
            vehicles = ALL_VEHICLES
        
        if brand_filter:
            vehicles = [v for v in vehicles if get_brand(v).lower() == brand_filter.lower()]
        
        total = len(vehicles)
        print(f"\n🚗 Auto Wizard Image Downloader")
        print(f"{'='*50}")
        print(f"📊 Vehicles to process: {total}")
        print(f"📐 Target resolution: {self.resolution}px")
        print(f"📁 Output directory: {self.output_dir}")
        print(f"🔄 Missing only: {missing_only}")
        if brand_filter:
            print(f"🏷️  Brand filter: {brand_filter}")
        print(f"{'='*50}\n")
        
        # Process sequentially with rate limiting (respectful crawling)
        completed = 0
        for vehicle in vehicles:
            completed += 1
            brand = get_brand(vehicle)
            print(f"\r[{completed}/{total}] {vehicle}...", end="", flush=True)
            
            result = self.process_vehicle(vehicle, missing_only)
            
            if result["status"] == "success":
                self.results["success"].append(result)
                print(f"\r✅ [{completed}/{total}] {vehicle} <- {result['source']}")
            elif result["status"] == "skipped":
                self.results["skipped"].append(result)
                print(f"\r⏭️  [{completed}/{total}] {vehicle} (already exists)")
            else:
                self.results["failed"].append(result)
                print(f"\r❌ [{completed}/{total}] {vehicle} (no image found)")
            
            # Rate limiting
            if result["status"] != "skipped":
                time.sleep(RATE_LIMIT_DELAY)
        
        print(f"\n{'='*50}")
        self._print_summary()
        self._save_manifest()
        self._save_report()
    
    def _print_summary(self):
        """Print download summary."""
        s = len(self.results["success"])
        f = len(self.results["failed"])
        sk = len(self.results["skipped"])
        total = s + f + sk
        
        print(f"\n📊 DOWNLOAD SUMMARY")
        print(f"{'─'*40}")
        print(f"  ✅ Downloaded: {s}")
        print(f"  ⏭️  Skipped:    {sk}")
        print(f"  ❌ Failed:     {f}")
        print(f"  📊 Total:      {total}")
        print(f"  📈 Success:    {((s+sk)/(total or 1))*100:.1f}%")
        
        if self.results["failed"]:
            print(f"\n❌ FAILED VEHICLES ({f}):")
            for r in self.results["failed"]:
                print(f"   • {r['vehicle']} (wiki: {r['wiki_title']})")
    
    def _save_manifest(self):
        """Save manifest.json mapping vehicle names to image paths."""
        manifest = {}
        
        for r in self.results["success"] + self.results["skipped"]:
            vehicle = r["vehicle"]
            # Use relative path from output dir
            rel_path = os.path.relpath(r["filepath"], self.output_dir)
            manifest[vehicle] = {
                "path": rel_path,
                "source": r.get("source", "unknown"),
            }
        
        manifest_path = self.output_dir / "manifest.json"
        with open(manifest_path, "w") as f:
            json.dump(manifest, f, indent=2, sort_keys=True)
        
        print(f"\n📋 Manifest saved: {manifest_path}")
    
    def _save_report(self):
        """Save detailed report."""
        report_path = self.output_dir / "report.txt"
        
        with open(report_path, "w") as f:
            f.write(f"Auto Wizard Image Download Report\n")
            f.write(f"Generated: {datetime.now().isoformat()}\n")
            f.write(f"Resolution: {self.resolution}px\n")
            f.write(f"{'='*60}\n\n")
            
            f.write(f"SUMMARY\n")
            f.write(f"{'─'*40}\n")
            f.write(f"Downloaded: {len(self.results['success'])}\n")
            f.write(f"Skipped:    {len(self.results['skipped'])}\n")
            f.write(f"Failed:     {len(self.results['failed'])}\n\n")
            
            f.write(f"SUCCESSFUL DOWNLOADS\n")
            f.write(f"{'─'*40}\n")
            for r in sorted(self.results["success"], key=lambda x: x["vehicle"]):
                f.write(f"✅ {r['vehicle']}\n")
                f.write(f"   Source: {r['source']}\n")
                f.write(f"   Path: {r['filepath']}\n")
                f.write(f"   URL: {r['url']}\n\n")
            
            f.write(f"\nFAILED DOWNLOADS\n")
            f.write(f"{'─'*40}\n")
            for r in sorted(self.results["failed"], key=lambda x: x["vehicle"]):
                f.write(f"❌ {r['vehicle']}\n")
                f.write(f"   Wiki title: {r['wiki_title']}\n")
                f.write(f"   Press site: {PRESS_SITES.get(r['brand'], 'N/A')}\n\n")
        
        print(f"📝 Report saved: {report_path}")


# ============================================================================
# PRESS SITE SCRAPER (Optional fallback)
# ============================================================================

class PressSiteScraper:
    """
    Attempts to scrape manufacturer press/media sites for vehicle images.
    This is much more brittle than Wikipedia but useful as a fallback.
    """
    
    def __init__(self):
        if not HAS_BS4:
            print("⚠️  beautifulsoup4 not installed. Press site scraping disabled.")
            print("   Install with: pip install beautifulsoup4")
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
    
    def scrape_for_vehicle(self, vehicle_name: str) -> str | None:
        """Try to find an image URL from manufacturer press sites."""
        if not HAS_BS4:
            return None
        
        brand = get_brand(vehicle_name)
        model = vehicle_name.replace(brand, "").strip()
        
        # Try the manufacturer's model page
        base_url = PRESS_SITES.get(brand)
        if not base_url:
            return None
        
        # Generic search approach - try common URL patterns
        search_term = urllib.parse.quote(model.lower().replace(" ", "-"))
        urls_to_try = [
            f"{base_url}/models/{search_term}",
            f"{base_url}/vehicles/{search_term}",
            f"{base_url}/{search_term}",
        ]
        
        for url in urls_to_try:
            try:
                resp = self.session.get(url, timeout=REQUEST_TIMEOUT, allow_redirects=True)
                if resp.status_code == 200:
                    soup = BeautifulSoup(resp.text, "html.parser")
                    
                    # Look for og:image meta tag (usually the best image)
                    og_image = soup.find("meta", property="og:image")
                    if og_image and og_image.get("content"):
                        return og_image["content"]
                    
                    # Look for large images in the page
                    for img in soup.find_all("img"):
                        src = img.get("src", "")
                        alt = img.get("alt", "").lower()
                        if model.lower() in alt and ("jpg" in src or "jpeg" in src or "png" in src):
                            if src.startswith("//"):
                                src = "https:" + src
                            elif src.startswith("/"):
                                src = base_url + src
                            return src
                            
            except Exception:
                continue
        
        return None


# ============================================================================
# NEXT.JS INTEGRATION GENERATOR
# ============================================================================

def generate_nextjs_component(output_dir: Path):
    """
    Generate an updated CarImage component that uses local images
    instead of fetching from Wikipedia at runtime.
    """
    manifest_path = output_dir / "manifest.json"
    if not manifest_path.exists():
        print("❌ No manifest.json found. Run download first.")
        return
    
    with open(manifest_path) as f:
        manifest = json.load(f)
    
    # Generate the mapping
    lines = []
    for vehicle, info in sorted(manifest.items()):
        path = info["path"]
        lines.append(f'  "{vehicle}": "/images/vehicles/{path}",')
    
    component = f'''// Auto-generated by download_vehicle_images.py
// Local image mappings for {len(manifest)} vehicles
// Drop the vehicle-images/ folder into public/images/vehicles/

const localImageMap: Record<string, string> = {{
{chr(10).join(lines)}
}};

export function getVehicleImagePath(vehicleName: string): string | null {{
  // Direct match
  if (localImageMap[vehicleName]) return localImageMap[vehicleName];
  
  // Partial match (e.g., "Acura RDX A-Spec" → "Acura RDX")
  for (const [key, path] of Object.entries(localImageMap)) {{
    if (vehicleName.startsWith(key)) return path;
  }}
  
  return null;
}}
'''
    
    component_path = output_dir / "vehicleImagePaths.ts"
    with open(component_path, "w") as f:
        f.write(component)
    
    print(f"\n🧩 Next.js integration file: {component_path}")
    print(f"   Copy vehicle-images/ to public/images/vehicles/")
    print(f"   Import getVehicleImagePath() in your CarImage component")


# ============================================================================
# MAIN
# ============================================================================

def main():
    parser = argparse.ArgumentParser(
        description="Download vehicle images for Auto Wizard",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python download_vehicle_images.py                     # Download all
  python download_vehicle_images.py --brand Toyota      # Just Toyota
  python download_vehicle_images.py --missing-only      # Fill in gaps
  python download_vehicle_images.py --resolution 1600   # Higher res
  python download_vehicle_images.py --press-sites       # Try press sites for failures
  python download_vehicle_images.py --report            # Status report only
  python download_vehicle_images.py --generate-component  # Generate Next.js file
        """
    )
    
    parser.add_argument("--brand", type=str, help="Only download for specific brand")
    parser.add_argument("--missing-only", action="store_true", help="Skip already-downloaded images")
    parser.add_argument("--resolution", type=int, default=DEFAULT_RESOLUTION, help=f"Image width in px (default: {DEFAULT_RESOLUTION})")
    parser.add_argument("--press-sites", action="store_true", help="Also try manufacturer press sites")
    parser.add_argument("--report", action="store_true", help="Just show what's downloaded/missing")
    parser.add_argument("--generate-component", action="store_true", help="Generate Next.js integration file")
    parser.add_argument("--output", type=str, default=str(OUTPUT_DIR), help=f"Output directory (default: {OUTPUT_DIR})")
    
    args = parser.parse_args()
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Report mode
    if args.report:
        print(f"\n📊 IMAGE STATUS REPORT")
        print(f"{'='*50}")
        
        found = 0
        missing = []
        for vehicle in ALL_VEHICLES:
            brand = get_brand(vehicle)
            filename = sanitize_filename(vehicle) + ".jpg"
            filepath = output_dir / brand / filename
            if filepath.exists() and filepath.stat().st_size > 2000:
                found += 1
            else:
                missing.append(vehicle)
        
        print(f"  ✅ Downloaded: {found}/{len(ALL_VEHICLES)}")
        print(f"  ❌ Missing:    {len(missing)}/{len(ALL_VEHICLES)}")
        
        if missing:
            print(f"\nMissing vehicles:")
            current_brand = None
            for v in missing:
                brand = get_brand(v)
                if brand != current_brand:
                    print(f"\n  {brand}:")
                    current_brand = brand
                print(f"    • {v}")
        
        return
    
    # Generate component mode
    if args.generate_component:
        generate_nextjs_component(output_dir)
        return
    
    # Download mode
    downloader = ImageDownloader(output_dir, args.resolution)
    downloader.run(
        missing_only=args.missing_only,
        brand_filter=args.brand,
    )
    
    # Try press sites for failures
    if args.press_sites and downloader.results["failed"]:
        print(f"\n🏭 Trying manufacturer press sites for {len(downloader.results['failed'])} failures...")
        scraper = PressSiteScraper()
        
        rescued = 0
        for result in list(downloader.results["failed"]):
            vehicle = result["vehicle"]
            print(f"  Trying press site for {vehicle}...", end="", flush=True)
            
            url = scraper.scrape_for_vehicle(vehicle)
            if url:
                filepath = Path(result["filepath"])
                if downloader.download_image(url, filepath):
                    result["status"] = "success"
                    result["source"] = "press_site"
                    result["url"] = url
                    downloader.results["failed"].remove(result)
                    downloader.results["success"].append(result)
                    rescued += 1
                    print(f" ✅ Found!")
                else:
                    print(f" ❌ Download failed")
            else:
                print(f" ❌ Not found")
            
            time.sleep(RATE_LIMIT_DELAY * 3)  # Extra polite with press sites
        
        if rescued:
            print(f"\n🎉 Rescued {rescued} images from press sites!")
            downloader._save_manifest()
            downloader._save_report()
    
    # Generate Next.js component
    generate_nextjs_component(output_dir)
    
    # Final summary
    total_success = len(downloader.results["success"]) + len(downloader.results["skipped"])
    total = total_success + len(downloader.results["failed"])
    print(f"\n{'='*50}")
    print(f"🏁 DONE! {total_success}/{total} vehicles have images ({total_success/total*100:.0f}%)")
    
    if downloader.results["failed"]:
        print(f"\n💡 For the {len(downloader.results['failed'])} missing images, you can:")
        print(f"   1. Manually find images at manufacturer press sites")
        print(f"   2. Re-run with --press-sites flag")
        print(f"   3. Check report.txt for press site URLs")
    
    print(f"\n📁 Next steps:")
    print(f"   1. Review images in {output_dir}/")
    print(f"   2. Copy to your Next.js project: cp -r {output_dir}/ public/images/vehicles/")
    print(f"   3. Update CarImage.tsx to use local images (see vehicleImagePaths.ts)")
    print()


if __name__ == "__main__":
    main()
