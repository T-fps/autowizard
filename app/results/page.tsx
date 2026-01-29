"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Share2, Mail, Copy, Check, ChevronDown, ChevronUp, ArrowRight, RefreshCw } from 'lucide-react';
import { vehicleDatabase, Vehicle } from '../lib/vehicleDatabase';

function formatPrice(price: number): string {
  return `$${(price * 1000).toLocaleString()}`;
}

function getBodyTypeDisplay(bodyType: string): string {
  const displays: Record<string, string> = {
    'sedan': 'Sedan', 'suv': 'SUV', 'crossover': 'Crossover', 'truck': 'Truck',
    'hatchback': 'Hatchback', 'coupe': 'Coupe', 'wagon': 'Wagon', 'minivan': 'Minivan',
    'convertible': 'Convertible', 'sports': 'Sports Car', 'van': 'Van',
  };
  return displays[bodyType] || bodyType;
}

function getVehicleSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Generate match reasons based on user preferences and vehicle attributes
function generateMatchReasons(vehicle: Vehicle, params: URLSearchParams): string[] {
  const reasons: string[] = [];
  
  const budget = params.get('budget');
  const passengers = params.get('passengers');
  const primaryUse = params.get('use');
  const weather = params.get('weather');
  const powertrain = params.get('powertrain');
  const drivingExp = params.get('driving');
  const character = params.get('character');
  const capability = params.get('capability');
  const environmental = params.get('environmental');
  const emotional = params.get('emotional');
  
  // Budget match
  if (budget) {
    const budgetNum = parseInt(budget);
    if (vehicle.price <= budgetNum * 0.85) {
      reasons.push(`Well within your budget at ${formatPrice(vehicle.price)}, leaving room for options or accessories`);
    } else if (vehicle.price <= budgetNum) {
      reasons.push(`Fits your ${formatPrice(budgetNum * 1000)} budget at ${formatPrice(vehicle.price)}`);
    }
  }
  
  // Passenger capacity
  if (passengers) {
    const passNum = parseInt(passengers);
    if (vehicle.seats >= passNum) {
      if (vehicle.seats > passNum + 2) {
        reasons.push(`Seats ${vehicle.seats} passengers — extra room for friends or cargo`);
      } else {
        reasons.push(`Comfortably seats your ${passNum} regular passengers`);
      }
    }
  }
  
  // Primary use alignment
  if (primaryUse) {
    const useReasons: Record<string, string[]> = {
      'commute': ['Excellent for daily commuting', 'Great fuel efficiency for your commute', 'Comfortable for everyday driving'],
      'family': ['Perfect for family duties', 'Family-friendly features and space', 'Safe and practical for families'],
      'adventure': ['Built for adventure', 'Ready for weekend getaways', 'Adventure-ready capability'],
      'work': ['Work-ready capability', 'Professional and practical', 'Built for your work needs'],
      'luxury': ['Luxury experience you\'re looking for', 'Premium comfort and features', 'Refined driving experience'],
    };
    if (useReasons[primaryUse]) {
      const matching = useReasons[primaryUse].find(r => 
        (primaryUse === 'commute' && (vehicle.features.includes('efficient') || vehicle.powertrain === 'hybrid' || vehicle.powertrain === 'ev')) ||
        (primaryUse === 'family' && vehicle.useCases.includes('family')) ||
        (primaryUse === 'adventure' && vehicle.features.includes('offroad')) ||
        (primaryUse === 'work' && (vehicle.features.includes('towing') || vehicle.bodyType === 'truck')) ||
        (primaryUse === 'luxury' && (vehicle.segment === 'luxury' || vehicle.segment === 'premium'))
      );
      if (matching) reasons.push(matching);
    }
  }
  
  // Weather/AWD
  if (weather === 'snow' && vehicle.features.includes('awd')) {
    reasons.push('All-wheel drive for confident handling in snow and rain');
  }
  
  // Powertrain preference
  if (powertrain === 'ev' && vehicle.powertrain === 'ev') {
    reasons.push('Zero emissions electric powertrain you wanted');
  } else if (powertrain === 'hybrid' && (vehicle.powertrain === 'hybrid' || vehicle.powertrain === 'phev')) {
    reasons.push('Hybrid efficiency without range anxiety');
  }
  
  // Driving experience
  if (drivingExp === 'engaging' && vehicle.features.includes('performance')) {
    reasons.push('Engaging driving dynamics for enthusiasts');
  } else if (drivingExp === 'comfort' && vehicle.features.includes('comfort')) {
    reasons.push('Smooth, comfortable ride quality you prefer');
  } else if (drivingExp === 'commanding' && (vehicle.bodyType === 'suv' || vehicle.bodyType === 'truck')) {
    reasons.push('Commanding driving position with great visibility');
  }
  
  // Vehicle character
  if (character === 'rugged' && vehicle.features.includes('offroad')) {
    reasons.push('Rugged character with genuine off-road capability');
  } else if (character === 'sophisticated' && (vehicle.segment === 'luxury' || vehicle.segment === 'premium')) {
    reasons.push('Sophisticated design and premium materials');
  } else if (character === 'sporty' && vehicle.features.includes('performance')) {
    reasons.push('Sporty character with dynamic performance');
  } else if (character === 'practical' && vehicle.useCases.includes('family')) {
    reasons.push('Practical design maximizes everyday usability');
  }
  
  // Capability preference
  if (capability === 'want-capability' && (vehicle.features.includes('offroad') || vehicle.features.includes('towing'))) {
    reasons.push('The capability you want, even if you don\'t need it daily');
  }
  
  // Environmental values
  if (environmental === 'top-priority' && vehicle.powertrain === 'ev') {
    reasons.push('Aligns with your environmental priorities — zero tailpipe emissions');
  } else if (environmental === 'important' && (vehicle.powertrain === 'hybrid' || vehicle.powertrain === 'ev')) {
    reasons.push('Eco-friendly option that reduces your carbon footprint');
  }
  
  // Emotional connection
  if (emotional === 'adventure' && vehicle.features.includes('offroad')) {
    reasons.push('Perfect for the adventures you crave');
  } else if (emotional === 'driving-joy' && vehicle.features.includes('performance')) {
    reasons.push('Delivers the driving joy you\'re looking for');
  } else if (emotional === 'safety' && vehicle.useCases.includes('family')) {
    reasons.push('Strong safety focus for peace of mind');
  }
  
  // Brand reputation
  const reliableBrands = ['Toyota', 'Lexus', 'Honda', 'Acura', 'Mazda'];
  if (reliableBrands.includes(vehicle.brand)) {
    reasons.push(`${vehicle.brand}'s excellent reliability reputation`);
  }
  
  // Warranty
  if (['Hyundai', 'Kia', 'Genesis'].includes(vehicle.brand)) {
    reasons.push('Industry-leading warranty coverage');
  }
  
  // Ensure we have at least 3 reasons
  if (reasons.length < 3) {
    if (vehicle.features.includes('tech')) reasons.push('Modern technology and connectivity features');
    if (vehicle.features.includes('cargo')) reasons.push('Generous cargo space for your needs');
    if (reasons.length < 3) reasons.push(`Strong value in the ${getBodyTypeDisplay(vehicle.bodyType).toLowerCase()} segment`);
  }
  
  return reasons.slice(0, 5);
}

// Parse results from URL
function parseResultsFromUrl(params: URLSearchParams): Vehicle[] {
  const vehicleNames = params.get('vehicles')?.split(',') || [];
  return vehicleNames
    .map(name => vehicleDatabase.find(v => getVehicleSlug(v.name) === name))
    .filter(Boolean) as Vehicle[];
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  
  const vehicles = parseResultsFromUrl(searchParams);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Auto Wizard Results',
          text: `Check out my personalized car recommendations from Auto Wizard!`,
          url: currentUrl,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      handleCopyLink();
    }
  };
  
  const handleEmailResults = () => {
    const subject = encodeURIComponent('My Auto Wizard Car Recommendations');
    const body = encodeURIComponent(
      `I took the Auto Wizard quiz and here are my top matches:\n\n` +
      vehicles.slice(0, 5).map((v, i) => `${i + 1}. ${v.name} - ${formatPrice(v.price)}`).join('\n') +
      `\n\nSee full results: ${currentUrl}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };
  
  const toggleCompare = (vehicleName: string) => {
    if (selectedForCompare.includes(vehicleName)) {
      setSelectedForCompare(selectedForCompare.filter(v => v !== vehicleName));
    } else if (selectedForCompare.length < 3) {
      setSelectedForCompare([...selectedForCompare, vehicleName]);
    }
  };
  
  const compareUrl = selectedForCompare.length >= 2
    ? `/compare/${selectedForCompare.map(getVehicleSlug).join('-vs-')}`
    : null;

  if (vehicles.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🚗</div>
          <h1 className="text-2xl font-bold text-white mb-4">No Results Found</h1>
          <p className="text-slate-400 mb-6">Take our quiz to get personalized vehicle recommendations.</p>
          <Link
            href="/quiz"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl"
          >
            Take the Quiz →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Your Perfect Matches 🎯
              </h1>
              <p className="text-lg text-slate-300">
                Based on your preferences, here are the {vehicles.length} best vehicles for you.
              </p>
            </div>
            
            {/* Share Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handleEmailResults}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Compare Selection Bar */}
        {selectedForCompare.length > 0 && (
          <div className="sticky top-4 z-10 mb-6 bg-slate-800 rounded-xl border border-slate-600 p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-slate-300">
                {selectedForCompare.length} selected for comparison
              </span>
              {selectedForCompare.map(name => (
                <span key={name} className="px-2 py-1 bg-cyan-500/20 text-cyan-600 rounded text-sm">
                  {name}
                </span>
              ))}
            </div>
            {compareUrl ? (
              <Link
                href={compareUrl}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors"
              >
                Compare Now <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="text-slate-400 text-sm">Select 1 more to compare</span>
            )}
          </div>
        )}

        {/* Results Grid */}
        <div className="space-y-6">
          {vehicles.map((vehicle, index) => {
            const isExpanded = expandedVehicle === vehicle.name;
            const reasons = generateMatchReasons(vehicle, searchParams);
            const isSelected = selectedForCompare.includes(vehicle.name);
            
            return (
              <div
                key={vehicle.name}
                className={`bg-slate-900/50 rounded-2xl border transition-all ${
                  isSelected ? 'border-cyan-500' : 'border-slate-700'
                }`}
              >
                {/* Main Card */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Rank Badge & Image */}
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 ${
                        index === 0 ? 'bg-amber-500 text-black' :
                        index === 1 ? 'bg-slate-400 text-black' :
                        index === 2 ? 'bg-amber-700 text-slate-900' :
                        'bg-slate-700 text-slate-900'
                      }`}>
                        #{index + 1}
                      </div>
                      <div className="w-32 h-20 bg-slate-800 rounded-lg flex items-center justify-center">
                        <span className="text-4xl">🚗</span>
                      </div>
                    </div>
                    
                    {/* Vehicle Info */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h2 className="text-2xl font-bold text-slate-900">{vehicle.name}</h2>
                          <p className="text-slate-400">
                            {getBodyTypeDisplay(vehicle.bodyType)} • {vehicle.seats} seats • {vehicle.size}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-cyan-600">{formatPrice(vehicle.price)}</div>
                          <div className="text-slate-400 text-sm">Starting MSRP</div>
                        </div>
                      </div>
                      
                      {/* Quick Match Reasons */}
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-amber-600 mb-2">Why This Matches You:</h3>
                        <ul className="space-y-1">
                          {reasons.slice(0, 3).map((reason, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                              <span className="text-green-700 mt-0.5">✓</span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/cars/${getVehicleSlug(vehicle.name)}`}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all text-sm"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => toggleCompare(vehicle.name)}
                          className={`px-4 py-2 border rounded-lg font-medium text-sm transition-all ${
                            isSelected 
                              ? 'border-cyan-500 bg-cyan-500/20 text-cyan-600' 
                              : 'border-slate-600 text-slate-300 hover:border-slate-500'
                          }`}
                        >
                          {isSelected ? '✓ Selected' : 'Compare'}
                        </button>
                        <button
                          onClick={() => setExpandedVehicle(isExpanded ? null : vehicle.name)}
                          className="flex items-center gap-1 px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm"
                        >
                          {isExpanded ? 'Less Details' : 'More Details'}
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-slate-700 p-6 bg-slate-800/30">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* All Match Reasons */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Complete Match Analysis</h3>
                        <ul className="space-y-2">
                          {reasons.map((reason, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-300">
                              <span className="text-green-700 mt-0.5">✓</span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Key Features */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                        <div className="flex flex-wrap gap-2">
                          {vehicle.features.slice(0, 8).map(feature => (
                            <span 
                              key={feature}
                              className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm capitalize"
                            >
                              {feature.replace(/-/g, ' ')}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="text-lg font-semibold text-white mt-4 mb-3">Best For</h3>
                        <div className="flex flex-wrap gap-2">
                          {vehicle.useCases.map(useCase => (
                            <span 
                              key={useCase}
                              className="px-3 py-1 bg-cyan-500/20 text-cyan-600 rounded-full text-sm capitalize"
                            >
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {/* Retake Quiz */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6 text-center">
            <RefreshCw className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Want Different Results?</h3>
            <p className="text-slate-400 text-sm mb-4">Adjust your preferences and see new recommendations.</p>
            <Link
              href="/quiz"
              className="inline-flex items-center px-6 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition-colors"
            >
              Retake Quiz
            </Link>
          </div>
          
          {/* Save Results */}
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl border border-amber-500/20 p-6 text-center">
            <Mail className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Save Your Results</h3>
            <p className="text-slate-400 text-sm mb-4">Email yourself these recommendations to review later.</p>
            <button
              onClick={handleEmailResults}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium rounded-lg hover:from-amber-400 hover:to-amber-500 transition-colors"
            >
              Email My Results
            </button>
          </div>
        </div>

        {/* Explore More */}
        <div className="mt-12 bg-slate-900/50 rounded-xl border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Explore More Options</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/best/suvs" className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
              Browse All SUVs
            </Link>
            <Link href="/best/trucks" className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
              Browse All Trucks
            </Link>
            <Link href="/best/sedans" className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
              Browse All Sedans
            </Link>
            <Link href="/best/electric" className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
              Electric Vehicles
            </Link>
            <Link href="/brands" className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
              Browse by Brand
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-400">Loading your results...</p>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
