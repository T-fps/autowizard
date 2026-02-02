#!/usr/bin/env python3
"""
Auto Wizard - Image Rescue Script
===================================
Targeted script to fill in the ~160 missing vehicle images.

Strategy 1: Copy from base model (if "BMW X5 M50i" failed but "BMW X5" exists, just copy it)
Strategy 2: Scrape actual Wikipedia HTML page for the infobox/lead image (bypasses flaky pageimages API)
Strategy 3: Search Wikimedia Commons directly
Strategy 4: Generate a manual download guide with direct URLs

Usage:
    python rescue_missing_images.py
    python rescue_missing_images.py --image-dir ./vehicle-images   # custom path

Requirements:
    pip install requests beautifulsoup4
"""

import os
import sys
import re
import json
import time
import shutil
import argparse
from pathlib import Path

try:
    import requests
except ImportError:
    print("❌ pip install requests")
    sys.exit(1)

try:
    from bs4 import BeautifulSoup
    HAS_BS4 = True
except ImportError:
    HAS_BS4 = False
    print("⚠️  beautifulsoup4 not installed. HTML scraping disabled.")
    print("   pip install beautifulsoup4")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

RATE_LIMIT = 0.5  # seconds between requests
TIMEOUT = 30
MIN_SIZE = 2000  # minimum file size in bytes

# ============================================================================
# COMPLETE MAPPING: vehicle name → Wikipedia article title
# ============================================================================

WIKI_TITLES = {
    "Acura Integra": "Acura_Integra",
    "Acura MDX": "Acura_MDX",
    "Acura RDX": "Acura_RDX",
    "Acura RDX A-Spec Advance": "Acura_RDX",
    "Acura TLX": "Acura_TLX",
    "Alfa Romeo Giulia": "Alfa_Romeo_Giulia_(952)",
    "Alfa Romeo Stelvio": "Alfa_Romeo_Stelvio",
    "Alfa Romeo Tonale": "Alfa_Romeo_Tonale",
    "Aston Martin DB12": "Aston_Martin_DB12",
    "Aston Martin DB12 Volante": "Aston_Martin_DB12",
    "Aston Martin DBS": "Aston_Martin_DBS_Superleggera",
    "Aston Martin DBX": "Aston_Martin_DBX",
    "Aston Martin DBX707": "Aston_Martin_DBX",
    "Aston Martin Vantage": "Aston_Martin_Vantage_(2018)",
    "Aston Martin Vantage Roadster": "Aston_Martin_Vantage_(2018)",
    "Audi A4": "Audi_A4",
    "Audi A4 Allroad": "Audi_A4_allroad_quattro",
    "Audi A5": "Audi_A5",
    "Audi A6": "Audi_A6",
    "Audi Q3": "Audi_Q3",
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
    "Bentley Bentayga": "Bentley_Bentayga",
    "Bentley Bentayga EWB": "Bentley_Bentayga",
    "Bentley Bentayga S": "Bentley_Bentayga",
    "Bentley Continental GT": "Bentley_Continental_GT",
    "Bentley Continental GT Convertible": "Bentley_Continental_GT",
    "Bentley Continental GT Speed": "Bentley_Continental_GT",
    "Bentley Flying Spur": "Bentley_Flying_Spur_(2019)",
    "Bentley Flying Spur Speed": "Bentley_Flying_Spur_(2019)",
    "BMW 3 Series": "BMW_3_Series_(G20)",
    "BMW 4 Series": "BMW_4_Series_(G22)",
    "BMW 5 Series": "BMW_5_Series_(G60)",
    "BMW 7 Series": "BMW_7_Series_(G70)",
    "BMW M3": "BMW_M3",
    "BMW M4": "BMW_M4",
    "BMW M240i": "BMW_2_Series_(G42)",
    "BMW M340i": "BMW_3_Series_(G20)",
    "BMW M440i": "BMW_4_Series_(G22)",
    "BMW M550i": "BMW_5_Series_(G30)",
    "BMW X1": "BMW_X1",
    "BMW X3": "BMW_X3",
    "BMW X3 M40i": "BMW_X3",
    "BMW X5": "BMW_X5_(G05)",
    "BMW X5 M50i": "BMW_X5_(G05)",
    "BMW X5M": "BMW_X5_(G05)",
    "BMW X6M": "BMW_X6_(G06)",
    "BMW X7": "BMW_X7_(G07)",
    "BMW X7 M60i": "BMW_X7_(G07)",
    "BMW Z4": "BMW_Z4_(G29)",
    "BMW i4": "BMW_i4",
    "BMW i5": "BMW_i5",
    "BMW i7": "BMW_i7",
    "BMW iX": "BMW_iX",
    "BMW M2": "BMW_M2",
    "BMW M5": "BMW_M5",
    "Bugatti Chiron": "Bugatti_Chiron",
    "Bugatti Chiron Sport": "Bugatti_Chiron",
    "Bugatti Chiron Super Sport": "Bugatti_Chiron",
    "Bugatti Tourbillon": "Bugatti_Tourbillon",
    "Cadillac CT4": "Cadillac_CT4",
    "Cadillac CT5": "Cadillac_CT5",
    "Cadillac Escalade": "Cadillac_Escalade",
    "Cadillac Escalade-V": "Cadillac_Escalade",
    "Cadillac Lyriq": "Cadillac_Lyriq",
    "Cadillac Lyriq-V": "Cadillac_Lyriq",
    "Cadillac XT4": "Cadillac_XT4",
    "Cadillac XT5": "Cadillac_XT5",
    "Cadillac XT6": "Cadillac_XT6",
    "Chevrolet Blazer": "Chevrolet_Blazer_(crossover)",
    "Chevrolet Bolt EUV": "Chevrolet_Bolt_EUV",
    "Chevrolet Camaro": "Chevrolet_Camaro_(sixth_generation)",
    "Chevrolet Camaro ZL1": "Chevrolet_Camaro_(sixth_generation)",
    "Chevrolet Colorado": "Chevrolet_Colorado",
    "Chevrolet Colorado ZR2": "Chevrolet_Colorado",
    "Chevrolet Corvette": "Chevrolet_Corvette_(C8)",
    "Chevrolet Corvette Z06": "Chevrolet_Corvette_Z06",
    "Chevrolet Corvette ZR1": "Chevrolet_Corvette_ZR1",
    "Chevrolet Equinox": "Chevrolet_Equinox",
    "Chevrolet Malibu": "Chevrolet_Malibu",
    "Chevrolet Silverado 1500": "Chevrolet_Silverado",
    "Chevrolet Silverado 2500HD": "Chevrolet_Silverado",
    "Chevrolet Silverado EV": "Chevrolet_Silverado_EV",
    "Chevrolet Silverado ZR2": "Chevrolet_Silverado",
    "Chevrolet Suburban": "Chevrolet_Suburban",
    "Chevrolet Tahoe": "Chevrolet_Tahoe",
    "Chevrolet Tahoe Z71": "Chevrolet_Tahoe",
    "Chevrolet Trailblazer": "Chevrolet_Trailblazer_(crossover)",
    "Chevrolet Traverse": "Chevrolet_Traverse",
    "Chevrolet Trax": "Chevrolet_Trax",
    "Chrysler Pacifica": "Chrysler_Pacifica_(minivan)",
    "Chrysler Voyager": "Chrysler_Voyager_(2020)",
    "Dodge Challenger": "Dodge_Challenger",
    "Dodge Challenger SRT Hellcat": "Dodge_Challenger_SRT_Hellcat",
    "Dodge Charger": "Dodge_Charger_(LX/LD)",
    "Dodge Charger SRT Hellcat": "Dodge_Charger_(LX/LD)",
    "Dodge Durango": "Dodge_Durango",
    "Dodge Durango SRT 392": "Dodge_Durango",
    "Dodge Durango SRT Hellcat": "Dodge_Durango",
    "Dodge Hornet": "Dodge_Hornet_(2023)",
    "Ferrari 296 GTB": "Ferrari_296_GTB",
    "Ferrari 296 GTS": "Ferrari_296_GTS",
    "Ferrari 812 Superfast": "Ferrari_812_Superfast",
    "Ferrari F8 Tributo": "Ferrari_F8",
    "Ferrari F8 Spider": "Ferrari_F8",
    "Ferrari Purosangue": "Ferrari_Purosangue",
    "Ferrari Roma": "Ferrari_Roma_(car)",
    "Ferrari Roma Spider": "Ferrari_Roma_(car)",
    "Ferrari SF90 Stradale": "Ferrari_SF90_Stradale",
    "Ferrari SF90 Spider": "Ferrari_SF90_Stradale",
    "Ford Bronco": "Ford_Bronco_(sixth_generation)",
    "Ford Bronco Raptor": "Ford_Bronco_(sixth_generation)",
    "Ford Bronco Sport": "Ford_Bronco_Sport",
    "Ford Edge": "Ford_Edge",
    "Ford Edge ST": "Ford_Edge",
    "Ford Escape": "Ford_Escape",
    "Ford Expedition": "Ford_Expedition",
    "Ford Explorer": "Ford_Explorer",
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
    "Genesis G70": "Genesis_G70",
    "Genesis G70 Shooting Brake": "Genesis_G70",
    "Genesis G80": "Genesis_G80",
    "Genesis G90": "Genesis_G90",
    "Genesis GV60": "Genesis_GV60",
    "Genesis GV70": "Genesis_GV70",
    "Genesis GV80": "Genesis_GV80",
    "GMC Acadia": "GMC_Acadia",
    "GMC Canyon": "GMC_Canyon",
    "GMC Canyon AT4X": "GMC_Canyon",
    "GMC Hummer EV": "GMC_Hummer_EV",
    "GMC Sierra 1500": "GMC_Sierra",
    "GMC Sierra 2500HD": "GMC_Sierra",
    "GMC Sierra AT4X": "GMC_Sierra",
    "GMC Terrain": "GMC_Terrain",
    "GMC Yukon": "GMC_Yukon",
    "GMC Yukon AT4": "GMC_Yukon",
    "GMC Yukon Denali Ultimate": "GMC_Yukon",
    "GMC Yukon XL": "GMC_Yukon",
    "Honda Accord": "Honda_Accord",
    "Honda Civic": "Honda_Civic_(eleventh_generation)",
    "Honda Civic Type R": "Honda_Civic_Type_R",
    "Honda CR-V": "Honda_CR-V",
    "Honda CR-V Hybrid Sport Touring": "Honda_CR-V",
    "Honda HR-V": "Honda_HR-V",
    "Honda Odyssey": "Honda_Odyssey_(North_America)",
    "Honda Passport": "Honda_Passport",
    "Honda Pilot": "Honda_Pilot",
    "Honda Pilot TrailSport": "Honda_Pilot",
    "Honda Ridgeline": "Honda_Ridgeline",
    "Honda Prologue": "Honda_Prologue",
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
    "Infiniti Q50": "Infiniti_Q50",
    "Infiniti Q60": "Infiniti_Q60",
    "Infiniti Q60 Red Sport 400": "Infiniti_Q60",
    "Infiniti QX50": "Infiniti_QX50",
    "Infiniti QX55": "Infiniti_QX55",
    "Infiniti QX60": "Infiniti_QX60",
    "Infiniti QX80": "Infiniti_QX80",
    "Jaguar F-PACE": "Jaguar_F-Pace",
    "Jaguar F-Type": "Jaguar_F-Type",
    "Jaguar I-PACE": "Jaguar_I-Pace",
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
    "Kia Carnival": "Kia_Carnival",
    "Kia EV5": "Kia_EV5",
    "Kia EV6": "Kia_EV6",
    "Kia EV9": "Kia_EV9",
    "Kia Forte": "Kia_Forte",
    "Kia K5": "Kia_K5",
    "Kia Niro": "Kia_Niro",
    "Kia Seltos": "Kia_Seltos",
    "Kia Sorento": "Kia_Sorento",
    "Kia Soul": "Kia_Soul",
    "Kia Sportage": "Kia_Sportage",
    "Kia Telluride": "Kia_Telluride",
    "Koenigsegg Gemera": "Koenigsegg_Gemera",
    "Koenigsegg Jesko": "Koenigsegg_Jesko",
    "Koenigsegg Jesko Absolut": "Koenigsegg_Jesko",
    "Koenigsegg Regera": "Koenigsegg_Regera",
    "Lamborghini Huracán": "Lamborghini_Hurac%C3%A1n",
    "Lamborghini Huracán STO": "Lamborghini_Hurac%C3%A1n_STO",
    "Lamborghini Huracán Tecnica": "Lamborghini_Hurac%C3%A1n",
    "Lamborghini Revuelto": "Lamborghini_Revuelto",
    "Lamborghini Urus": "Lamborghini_Urus",
    "Lamborghini Urus SE": "Lamborghini_Urus",
    "Lexus ES": "Lexus_ES",
    "Lexus GX": "Lexus_GX",
    "Lexus IS": "Lexus_IS",
    "Lexus IS 300": "Lexus_IS",
    "Lexus IS 500": "Lexus_IS",
    "Lexus LC 500": "Lexus_LC",
    "Lexus LC 500 Convertible": "Lexus_LC",
    "Lexus LX": "Lexus_LX",
    "Lexus NX": "Lexus_NX",
    "Lexus NX 350 F Sport": "Lexus_NX",
    "Lexus RC F": "Lexus_RC_F",
    "Lexus RX": "Lexus_RX",
    "Lexus RX 350 F Sport": "Lexus_RX",
    "Lexus RX 500h F Sport": "Lexus_RX",
    "Lexus TX": "Lexus_TX",
    "Lexus UX": "Lexus_UX",
    "Lincoln Aviator": "Lincoln_Aviator",
    "Lincoln Aviator Black Label": "Lincoln_Aviator",
    "Lincoln Corsair": "Lincoln_Corsair",
    "Lincoln Corsair Reserve": "Lincoln_Corsair",
    "Lincoln Nautilus": "Lincoln_Nautilus",
    "Lincoln Nautilus Reserve": "Lincoln_Nautilus",
    "Lincoln Navigator": "Lincoln_Navigator",
    "Lincoln Navigator Black Label": "Lincoln_Navigator",
    "Lotus Eletre": "Lotus_Eletre",
    "Lotus Eletre R": "Lotus_Eletre",
    "Lotus Emeya": "Lotus_Emeya",
    "Lotus Emeya R": "Lotus_Emeya",
    "Lotus Emira": "Lotus_Emira",
    "Lotus Emira V6 First Edition": "Lotus_Emira",
    "Lotus Evija": "Lotus_Evija",
    "Lucid Air": "Lucid_Air",
    "Lucid Air Grand Touring": "Lucid_Air",
    "Lucid Air Pure": "Lucid_Air",
    "Lucid Air Sapphire": "Lucid_Air",
    "Lucid Air Touring": "Lucid_Air",
    "Lucid Gravity": "Lucid_Gravity",
    "Maserati GranTurismo": "Maserati_GranTurismo",
    "Maserati Grecale": "Maserati_Grecale",
    "Maserati MC20": "Maserati_MC20",
    "Mazda 3": "Mazda3",
    "Mazda CX-30": "Mazda_CX-30",
    "Mazda CX-5": "Mazda_CX-5",
    "Mazda CX-50": "Mazda_CX-50",
    "Mazda CX-70": "Mazda_CX-70",
    "Mazda CX-90": "Mazda_CX-90",
    "Mazda MX-5 Miata": "Mazda_MX-5_(ND)",
    "McLaren 750S": "McLaren_750S",
    "McLaren 750S Spider": "McLaren_750S",
    "McLaren Artura": "McLaren_Artura",
    "McLaren GT": "McLaren_GT",
    "Mercedes-Benz C-Class": "Mercedes-Benz_C-Class_(W206)",
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
    "Nissan Altima": "Nissan_Altima",
    "Nissan Ariya": "Nissan_Ariya",
    "Nissan Frontier": "Nissan_Frontier",
    "Nissan Kicks": "Nissan_Kicks",
    "Nissan Leaf": "Nissan_Leaf",
    "Nissan Murano": "Nissan_Murano",
    "Nissan Pathfinder": "Nissan_Pathfinder",
    "Nissan Rogue": "Nissan_Rogue",
    "Nissan Sentra": "Nissan_Sentra",
    "Nissan Versa": "Nissan_Versa",
    "Nissan Z": "Nissan_Z_(RZ34)",
    "Pagani Huayra": "Pagani_Huayra",
    "Pagani Utopia": "Pagani_Utopia",
    "Porsche 718 Boxster": "Porsche_718_Boxster",
    "Porsche 718 Cayman": "Porsche_718_Cayman",
    "Porsche 911": "Porsche_911",
    "Porsche Cayenne": "Porsche_Cayenne",
    "Porsche Macan": "Porsche_Macan",
    "Porsche Panamera": "Porsche_Panamera",
    "Porsche Taycan": "Porsche_Taycan",
    "Ram 1500": "Ram_1500",
    "Ram 1500 Limited": "Ram_1500",
    "Ram 1500 Rebel": "Ram_1500",
    "Ram 1500 TRX": "Ram_1500_TRX",
    "Ram 2500": "Ram_2500",
    "Ram 3500": "Ram_3500",
    "Rivian R1S": "Rivian_R1S",
    "Rivian R1T": "Rivian_R1T",
    "Rolls-Royce Cullinan": "Rolls-Royce_Cullinan",
    "Rolls-Royce Ghost": "Rolls-Royce_Ghost",
    "Rolls-Royce Phantom": "Rolls-Royce_Phantom_(VIII)",
    "Rolls-Royce Phantom Extended": "Rolls-Royce_Phantom_(VIII)",
    "Rolls-Royce Spectre": "Rolls-Royce_Spectre",
    "Subaru Ascent": "Subaru_Ascent",
    "Subaru BRZ": "Subaru_BRZ",
    "Subaru Crosstrek": "Subaru_Crosstrek",
    "Subaru Forester": "Subaru_Forester",
    "Subaru Impreza": "Subaru_Impreza",
    "Subaru Legacy": "Subaru_Legacy",
    "Subaru Outback": "Subaru_Outback",
    "Subaru WRX": "Subaru_WRX",
    "Subaru Solterra": "Subaru_Solterra",
    "Tesla Cybertruck": "Tesla_Cybertruck",
    "Tesla Model 3": "Tesla_Model_3",
    "Tesla Model S": "Tesla_Model_S",
    "Tesla Model X": "Tesla_Model_X",
    "Tesla Model Y": "Tesla_Model_Y",
    "Toyota 4Runner": "Toyota_4Runner",
    "Toyota Camry": "Toyota_Camry",
    "Toyota Corolla": "Toyota_Corolla_(E210)",
    "Toyota Corolla Cross": "Toyota_Corolla_Cross",
    "Toyota Crown": "Toyota_Crown_(S230)",
    "Toyota Crown Signia": "Toyota_Crown_(S230)",
    "Toyota GR Corolla": "Toyota_GR_Corolla",
    "Toyota GR Supra": "Toyota_Supra_(J29/DB)",
    "Toyota GR86": "Toyota_GR86",
    "Toyota Grand Highlander": "Toyota_Grand_Highlander",
    "Toyota Highlander": "Toyota_Highlander",
    "Toyota Land Cruiser": "Toyota_Land_Cruiser_(J300)",
    "Toyota Prius": "Toyota_Prius_(XW60)",
    "Toyota RAV4": "Toyota_RAV4",
    "Toyota Sequoia": "Toyota_Sequoia",
    "Toyota Sienna": "Toyota_Sienna",
    "Toyota Tacoma": "Toyota_Tacoma",
    "Toyota Tacoma TRD Pro": "Toyota_Tacoma",
    "Toyota Tundra": "Toyota_Tundra",
    "Toyota Tundra TRD Pro": "Toyota_Tundra",
    "Toyota Venza": "Toyota_Venza",
    "Toyota bZ4X": "Toyota_bZ4X",
    "Volkswagen Atlas": "Volkswagen_Atlas",
    "Volkswagen Golf GTI": "Volkswagen_Golf_GTI",
    "Volkswagen Golf R": "Volkswagen_Golf_R",
    "Volkswagen ID.4": "Volkswagen_ID.4",
    "Volkswagen ID.Buzz": "Volkswagen_ID._Buzz",
    "Volkswagen Jetta": "Volkswagen_Jetta",
    "Volkswagen Taos": "Volkswagen_Taos",
    "Volkswagen Tiguan": "Volkswagen_Tiguan",
    "Volvo C40 Recharge": "Volvo_C40",
    "Volvo EX30": "Volvo_EX30",
    "Volvo EX90": "Volvo_EX90",
    "Volvo S60": "Volvo_S60",
    "Volvo S90": "Volvo_S90",
    "Volvo V60": "Volvo_V60",
    "Volvo XC40": "Volvo_XC40",
    "Volvo XC60": "Volvo_XC60",
    "Volvo XC90": "Volvo_XC90",
}

# ============================================================================
# VARIANT → BASE MODEL MAPPING
# When a variant fails, copy from the base model's image
# ============================================================================

VARIANT_TO_BASE = {
    "Aston Martin DB12 Volante": "Aston Martin DB12",
    "Aston Martin DBX707": "Aston Martin DBX",
    "Aston Martin Vantage Roadster": "Aston Martin Vantage",
    "Audi A4 Allroad": "Audi A4",
    "Audi S3": "Audi A3",
    "Audi S4": "Audi A4",
    "Audi S5": "Audi A5",
    "Audi S7": "Audi A7",
    "Audi SQ5": "Audi Q5",
    "Audi SQ7": "Audi Q7",
    "Audi SQ8": "Audi Q8",
    "Audi RS Q8": "Audi Q8",
    "Bentley Bentayga EWB": "Bentley Bentayga",
    "Bentley Bentayga S": "Bentley Bentayga",
    "Bentley Continental GT Convertible": "Bentley Continental GT",
    "Bentley Continental GT Speed": "Bentley Continental GT",
    "Bentley Flying Spur Speed": "Bentley Flying Spur",
    "BMW M440i": "BMW 4 Series",
    "BMW X5 M50i": "BMW X5",
    "BMW X5M": "BMW X5",
    "BMW X6M": "BMW X6",
    "BMW X7 M60i": "BMW X7",
    "Bugatti Chiron Super Sport": "Bugatti Chiron",
    "Cadillac Escalade-V": "Cadillac Escalade",
    "Cadillac Lyriq-V": "Cadillac Lyriq",
    "Chevrolet Camaro ZL1": "Chevrolet Camaro",
    "Chevrolet Corvette Z06": "Chevrolet Corvette",
    "Chevrolet Corvette ZR1": "Chevrolet Corvette",
    "Chevrolet Tahoe Z71": "Chevrolet Tahoe",
    "Chevrolet Colorado ZR2": "Chevrolet Colorado",
    "Chevrolet Silverado ZR2": "Chevrolet Silverado 1500",
    "Dodge Challenger SRT Hellcat": "Dodge Challenger",
    "Dodge Charger SRT Hellcat": "Dodge Charger",
    "Dodge Durango SRT 392": "Dodge Durango",
    "Dodge Durango SRT Hellcat": "Dodge Durango",
    "Ferrari 296 GTS": "Ferrari 296 GTB",
    "Ferrari F8 Spider": "Ferrari F8 Tributo",
    "Ferrari Roma Spider": "Ferrari Roma",
    "Ferrari SF90 Spider": "Ferrari SF90 Stradale",
    "Ford Bronco Raptor": "Ford Bronco",
    "Ford Mustang GT": "Ford Mustang",
    "Ford Mustang Shelby GT500": "Ford Mustang",
    "Ford Edge ST": "Ford Edge",
    "Ford F-150 Raptor": "Ford F-150",
    "Ford F-150 Raptor R": "Ford F-150",
    "Genesis G70 Shooting Brake": "Genesis G70",
    "GMC Canyon AT4X": "GMC Canyon",
    "GMC Sierra AT4X": "GMC Sierra 1500",
    "GMC Yukon XL": "GMC Yukon",
    "GMC Yukon AT4": "GMC Yukon",
    "GMC Yukon Denali Ultimate": "GMC Yukon",
    "Honda CR-V Hybrid Sport Touring": "Honda CR-V",
    "Honda Pilot TrailSport": "Honda Pilot",
    "Hyundai Kona Electric": "Hyundai Kona",
    "Infiniti Q60 Red Sport 400": "Infiniti Q60",
    "Jeep Grand Cherokee L": "Jeep Grand Cherokee",
    "Jeep Grand Cherokee Trailhawk": "Jeep Grand Cherokee",
    "Jeep Grand Cherokee Summit": "Jeep Grand Cherokee",
    "Kia EV5": "Kia EV6",
    "Koenigsegg Jesko Absolut": "Koenigsegg Jesko",
    "Lamborghini Huracán STO": "Lamborghini Huracán",
    "Lamborghini Huracán Tecnica": "Lamborghini Huracán",
    "Lamborghini Urus SE": "Lamborghini Urus",
    "Lexus IS 300": "Lexus IS",
    "Lexus IS 500": "Lexus IS",
    "Lexus NX 350 F Sport": "Lexus NX",
    "Lexus RX 350 F Sport": "Lexus RX",
    "Lexus RX 500h F Sport": "Lexus RX",
    "Lexus LC 500 Convertible": "Lexus LC 500",
    "Lincoln Corsair Reserve": "Lincoln Corsair",
    "Lincoln Nautilus Reserve": "Lincoln Nautilus",
    "Lincoln Aviator Black Label": "Lincoln Aviator",
    "Lincoln Navigator Black Label": "Lincoln Navigator",
    "Lotus Eletre R": "Lotus Eletre",
    "Lotus Emeya R": "Lotus Emeya",
    "Lotus Emira V6 First Edition": "Lotus Emira",
    "Lucid Air Pure": "Lucid Air",
    "Lucid Air Touring": "Lucid Air",
    "Lucid Air Grand Touring": "Lucid Air",
    "Lucid Air Sapphire": "Lucid Air",
    "McLaren 750S Spider": "McLaren 750S",
    "Mercedes-AMG C43": "Mercedes-Benz C-Class",
    "Mercedes-AMG C63": "Mercedes-Benz C-Class",
    "Mercedes-AMG E53": "Mercedes-Benz E-Class",
    "Mercedes-AMG E63 S": "Mercedes-Benz E-Class",
    "Mercedes-AMG GLC43": "Mercedes-Benz GLC",
    "Mercedes-AMG GLC63": "Mercedes-Benz GLC",
    "Mercedes-AMG GLE53": "Mercedes-Benz GLE",
    "Mercedes-AMG GLE63 S": "Mercedes-Benz GLE",
    "Mercedes-AMG GLS63": "Mercedes-Benz GLS",
    "Rolls-Royce Phantom Extended": "Rolls-Royce Phantom",
    "Ram 1500 Limited": "Ram 1500",
    "Ram 1500 Rebel": "Ram 1500",
    "Toyota Crown Signia": "Toyota Crown",
    "Toyota Tacoma TRD Pro": "Toyota Tacoma",
    "Toyota Tundra TRD Pro": "Toyota Tundra",
}


def sanitize_filename(name):
    return re.sub(r'[^\w\-.]', '_', name)


def get_brand(name):
    for b in ["Alfa Romeo", "Aston Martin", "Mercedes-Benz", "Mercedes-AMG", "Rolls-Royce"]:
        if name.startswith(b):
            return b
    return name.split()[0]


def image_path(base_dir, vehicle_name):
    brand = get_brand(vehicle_name)
    filename = sanitize_filename(vehicle_name) + ".jpg"
    return base_dir / brand / filename


def has_image(base_dir, vehicle_name):
    p = image_path(base_dir, vehicle_name)
    return p.exists() and p.stat().st_size > MIN_SIZE


def download_file(url, filepath):
    """Download a file, return True on success."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=TIMEOUT, stream=True)
        resp.raise_for_status()
        
        content_type = resp.headers.get("Content-Type", "")
        if "image" not in content_type and "octet-stream" not in content_type:
            return False
        
        filepath.parent.mkdir(parents=True, exist_ok=True)
        with open(filepath, "wb") as f:
            for chunk in resp.iter_content(8192):
                f.write(chunk)
        
        if filepath.stat().st_size < MIN_SIZE:
            filepath.unlink()
            return False
        
        return True
    except Exception as e:
        if filepath.exists():
            filepath.unlink()
        return False


# ============================================================================
# STRATEGY 1: Copy from base model
# ============================================================================

def try_copy_from_base(base_dir, vehicle_name):
    """If this is a variant, copy from the base model's image."""
    base_model = VARIANT_TO_BASE.get(vehicle_name)
    if not base_model:
        return False
    
    base_path = image_path(base_dir, base_model)
    target_path = image_path(base_dir, vehicle_name)
    
    if base_path.exists() and base_path.stat().st_size > MIN_SIZE:
        target_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(base_path, target_path)
        return True
    
    return False


# ============================================================================
# STRATEGY 2: Scrape actual Wikipedia HTML page
# ============================================================================

def scrape_wiki_page_image(vehicle_name, resolution=1200):
    """
    Fetch the actual Wikipedia HTML and extract the lead/infobox image.
    This bypasses the unreliable pageimages API entirely.
    """
    if not HAS_BS4:
        return None
    
    wiki_title = WIKI_TITLES.get(vehicle_name, vehicle_name.replace(" ", "_"))
    
    # Handle URL-encoded titles (like Lamborghini Huracán)
    if "%C3" in wiki_title or "%25" in wiki_title:
        url = f"https://en.wikipedia.org/wiki/{wiki_title}"
    else:
        url = f"https://en.wikipedia.org/wiki/{wiki_title}"
    
    try:
        resp = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
        if resp.status_code != 200:
            return None
        
        soup = BeautifulSoup(resp.text, "html.parser")
        
        # Strategy A: Look for the infobox image (most reliable for cars)
        infobox = soup.find("table", class_="infobox")
        if infobox:
            img = infobox.find("img")
            if img and img.get("src"):
                return _process_wiki_img_src(img["src"], resolution)
        
        # Strategy B: Look for the first image in the article body with class mw-file-element
        for img in soup.select(".mw-parser-output .mw-file-element"):
            src = img.get("src", "")
            # Skip tiny icons and SVGs
            width = img.get("width", "0")
            try:
                if int(width) < 200:
                    continue
            except (ValueError, TypeError):
                pass
            if ".svg" in src.lower():
                continue
            return _process_wiki_img_src(src, resolution)
        
        # Strategy C: Look for ANY image in the article that seems like a car photo
        content = soup.find("div", class_="mw-parser-output")
        if content:
            for img in content.find_all("img"):
                src = img.get("src", "")
                width = img.get("width", "0")
                try:
                    if int(width) < 200:
                        continue
                except (ValueError, TypeError):
                    pass
                if ".svg" in src.lower():
                    continue
                if any(skip in src.lower() for skip in [
                    "flag", "logo", "icon", "commons-logo", "edit-clear",
                    "question_book", "ambox", "crystal", "padlock", "disambig",
                    "wiki", "mediawiki", "increase", "decrease", "steady"
                ]):
                    continue
                return _process_wiki_img_src(src, resolution)
        
        return None
        
    except Exception as e:
        return None


def _process_wiki_img_src(src, resolution=1200):
    """
    Convert a Wikipedia <img> src to a high-res download URL.
    Wikipedia img srcs are usually thumbnails like:
    //upload.wikimedia.org/wikipedia/commons/thumb/a/ab/File.jpg/300px-File.jpg
    We want to request a larger size.
    """
    if src.startswith("//"):
        src = "https:" + src
    elif src.startswith("/"):
        src = "https://en.wikipedia.org" + src
    
    # If it's a thumbnail URL, we can request a different size
    if "/thumb/" in src:
        # Replace the size prefix (e.g., 300px- → 1200px-)
        parts = src.rsplit("/", 1)
        if len(parts) == 2 and "px-" in parts[1]:
            new_filename = re.sub(r'^\d+px-', f'{resolution}px-', parts[1])
            src = parts[0] + "/" + new_filename
    
    return src


# ============================================================================
# STRATEGY 3: Search Wikimedia Commons
# ============================================================================

def search_commons(vehicle_name, resolution=1200):
    """Search Wikimedia Commons for a vehicle image."""
    search_term = vehicle_name.replace("-", " ")
    
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": f'"{search_term}"',
        "gsrnamespace": "6",
        "gsrlimit": "5",
        "prop": "imageinfo",
        "iiprop": "url|size|mime",
        "iiurlwidth": resolution,
        "format": "json",
        "origin": "*",
    }
    
    try:
        resp = requests.get(
            "https://commons.wikimedia.org/w/api.php",
            params=params,
            headers=HEADERS,
            timeout=TIMEOUT,
        )
        resp.raise_for_status()
        data = resp.json()
        
        pages = data.get("query", {}).get("pages", {})
        for page_data in sorted(pages.values(), key=lambda p: p.get("index", 999)):
            imageinfo = page_data.get("imageinfo", [{}])[0]
            mime = imageinfo.get("mime", "")
            if "jpeg" in mime or "png" in mime:
                width = imageinfo.get("width", 0)
                if width >= 400:
                    return imageinfo.get("thumburl") or imageinfo.get("url")
        
        return None
    except Exception:
        return None


# ============================================================================
# STRATEGY 4: Wikipedia API (pageimages) - the original approach, as last try
# ============================================================================

def wiki_api_image(vehicle_name, resolution=1200):
    """The standard Wikipedia pageimages API call."""
    wiki_title = WIKI_TITLES.get(vehicle_name, vehicle_name.replace(" ", "_"))
    
    params = {
        "action": "query",
        "titles": wiki_title,
        "prop": "pageimages",
        "format": "json",
        "pithumbsize": resolution,
        "origin": "*",
    }
    
    try:
        resp = requests.get(
            "https://en.wikipedia.org/w/api.php",
            params=params,
            headers=HEADERS,
            timeout=TIMEOUT,
        )
        resp.raise_for_status()
        data = resp.json()
        
        pages = data.get("query", {}).get("pages", {})
        for page_id, page_data in pages.items():
            if page_id == "-1":
                continue
            thumb = page_data.get("thumbnail", {})
            if thumb.get("source"):
                return thumb["source"]
        
        return None
    except Exception:
        return None


# ============================================================================
# MAIN
# ============================================================================

def main():
    parser = argparse.ArgumentParser(description="Rescue missing vehicle images")
    parser.add_argument("--image-dir", type=str, default="./vehicle-images",
                        help="Path to vehicle-images directory (default: ./vehicle-images)")
    parser.add_argument("--resolution", type=int, default=1200)
    parser.add_argument("--dry-run", action="store_true", help="Show what would be done without downloading")
    args = parser.parse_args()
    
    base_dir = Path(args.image_dir)
    if not base_dir.exists():
        print(f"❌ Directory not found: {base_dir}")
        print(f"   Run download_vehicle_images.py first, or specify --image-dir")
        sys.exit(1)
    
    # Find all missing vehicles
    all_vehicles = list(WIKI_TITLES.keys())
    missing = [v for v in all_vehicles if not has_image(base_dir, v)]
    have = len(all_vehicles) - len(missing)
    
    print(f"\n🔧 Auto Wizard Image Rescue")
    print(f"{'='*55}")
    print(f"📊 Total vehicles: {len(all_vehicles)}")
    print(f"✅ Already have:   {have}")
    print(f"❌ Missing:        {len(missing)}")
    print(f"{'='*55}\n")
    
    if not missing:
        print("🎉 All vehicles have images! Nothing to do.")
        return
    
    if args.dry_run:
        print("DRY RUN - No downloads will be made\n")
    
    results = {"copied": [], "scraped": [], "commons": [], "api": [], "failed": []}
    
    for i, vehicle in enumerate(missing, 1):
        print(f"[{i}/{len(missing)}] {vehicle}...", end="", flush=True)
        
        if args.dry_run:
            if vehicle in VARIANT_TO_BASE and has_image(base_dir, VARIANT_TO_BASE[vehicle]):
                print(f" → would copy from {VARIANT_TO_BASE[vehicle]}")
            else:
                print(f" → would try scraping {WIKI_TITLES.get(vehicle, '?')}")
            continue
        
        # === STRATEGY 1: Copy from base model ===
        if try_copy_from_base(base_dir, vehicle):
            base = VARIANT_TO_BASE[vehicle]
            results["copied"].append(vehicle)
            print(f" ✅ Copied from {base}")
            continue
        
        time.sleep(RATE_LIMIT)
        
        # === STRATEGY 2: Scrape Wikipedia HTML ===
        url = scrape_wiki_page_image(vehicle, args.resolution)
        if url:
            filepath = image_path(base_dir, vehicle)
            if download_file(url, filepath):
                results["scraped"].append(vehicle)
                print(f" ✅ Scraped from Wikipedia HTML")
                continue
        
        time.sleep(RATE_LIMIT)
        
        # === STRATEGY 3: Wikipedia API (original method) ===
        url = wiki_api_image(vehicle, args.resolution)
        if url:
            filepath = image_path(base_dir, vehicle)
            if download_file(url, filepath):
                results["api"].append(vehicle)
                print(f" ✅ Wikipedia API")
                continue
        
        time.sleep(RATE_LIMIT)
        
        # === STRATEGY 4: Wikimedia Commons search ===
        url = search_commons(vehicle, args.resolution)
        if url:
            filepath = image_path(base_dir, vehicle)
            if download_file(url, filepath):
                results["commons"].append(vehicle)
                print(f" ✅ Wikimedia Commons")
                continue
        
        results["failed"].append(vehicle)
        print(f" ❌ FAILED")
    
    if args.dry_run:
        return
    
    # ===================== SUMMARY =====================
    print(f"\n{'='*55}")
    print(f"📊 RESCUE RESULTS")
    print(f"{'─'*55}")
    print(f"  📋 Copied from base model: {len(results['copied'])}")
    print(f"  🌐 Wikipedia HTML scrape:  {len(results['scraped'])}")
    print(f"  📡 Wikipedia API:          {len(results['api'])}")
    print(f"  🖼️  Wikimedia Commons:      {len(results['commons'])}")
    print(f"  ❌ Still failed:           {len(results['failed'])}")
    
    total_rescued = len(results['copied']) + len(results['scraped']) + len(results['api']) + len(results['commons'])
    total_now = have + total_rescued
    print(f"\n  📈 Coverage: {total_now}/{len(all_vehicles)} ({total_now/len(all_vehicles)*100:.1f}%)")
    
    if results["failed"]:
        print(f"\n❌ STILL MISSING ({len(results['failed'])}):")
        for v in results["failed"]:
            wiki = WIKI_TITLES.get(v, "?")
            print(f"   • {v}")
            print(f"     https://en.wikipedia.org/wiki/{wiki}")
        
        # Generate manual download helper
        print(f"\n💡 For the remaining {len(results['failed'])} vehicles:")
        print(f"   Open each Wikipedia link above in your browser,")
        print(f"   right-click the car image → 'Save image as...'")
        print(f"   Save to: {base_dir}/<Brand>/<Vehicle_Name>.jpg")
    
    # Update manifest
    print(f"\n📋 Updating manifest.json...")
    manifest = {}
    for v in all_vehicles:
        p = image_path(base_dir, v)
        if p.exists() and p.stat().st_size > MIN_SIZE:
            rel = os.path.relpath(p, base_dir)
            manifest[v] = {"path": rel, "source": "auto"}
    
    with open(base_dir / "manifest.json", "w") as f:
        json.dump(manifest, f, indent=2, sort_keys=True)
    
    print(f"   {len(manifest)} vehicles in manifest")
    print(f"\n🏁 Done!")


if __name__ == "__main__":
    main()
