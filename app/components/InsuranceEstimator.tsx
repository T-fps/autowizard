"use client";

import React, { useState, useMemo } from 'react';
import { Shield, User, MapPin, AlertCircle, ExternalLink, Check } from 'lucide-react';

interface InsuranceEstimatorProps {
  vehicleName: string;
  vehiclePrice: number; // in thousands
  vehicleType: string;
}

export default function InsuranceEstimator({ 
  vehicleName, 
  vehiclePrice, 
  vehicleType 
}: InsuranceEstimatorProps) {
  const [age, setAge] = useState<string>('30-39');
  const [coverageLevel, setCoverageLevel] = useState<'basic' | 'standard' | 'full'>('standard');
  const [showQuotes, setShowQuotes] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Base rates by vehicle type
  const baseRates: Record<string, number> = {
    sedan: 120,
    suv: 140,
    crossover: 130,
    truck: 150,
    hatchback: 115,
    coupe: 160,
    sports: 200,
    minivan: 125,
    wagon: 125,
    convertible: 180,
    van: 145,
  };

  // Age multipliers
  const ageMultipliers: Record<string, number> = {
    '16-19': 2.0,
    '20-24': 1.5,
    '25-29': 1.2,
    '30-39': 1.0,
    '40-49': 0.95,
    '50-59': 0.90,
    '60-69': 0.95,
    '70+': 1.1,
  };

  // Coverage multipliers
  const coverageMultipliers = {
    basic: 0.6,    // Liability only
    standard: 1.0, // Liability + Collision
    full: 1.4,     // Comprehensive
  };

  // Price factor (more expensive cars cost more to insure)
  const priceFactor = useMemo(() => {
    if (vehiclePrice < 25) return 0.9;
    if (vehiclePrice < 40) return 1.0;
    if (vehiclePrice < 60) return 1.15;
    if (vehiclePrice < 100) return 1.3;
    return 1.5;
  }, [vehiclePrice]);

  const estimate = useMemo(() => {
    const baseRate = baseRates[vehicleType] || 130;
    const ageMultiplier = ageMultipliers[age] || 1.0;
    const coverageMultiplier = coverageMultipliers[coverageLevel];
    
    const monthlyEstimate = baseRate * ageMultiplier * coverageMultiplier * priceFactor;
    const annualEstimate = monthlyEstimate * 12;
    
    // Create range (±20%)
    return {
      monthlyLow: Math.round(monthlyEstimate * 0.8),
      monthlyHigh: Math.round(monthlyEstimate * 1.2),
      annualLow: Math.round(annualEstimate * 0.8),
      annualHigh: Math.round(annualEstimate * 1.2),
    };
  }, [vehicleType, age, coverageLevel, priceFactor]);

  // Affiliate insurance providers
  const insuranceProviders = [
    { 
      name: 'Liberty Mutual', 
      tagline: 'Customize your coverage',
      url: '#',
      highlight: 'Bundle & save up to 25%',
    },
    { 
      name: 'Allstate', 
      tagline: "You're in good hands",
      url: '#',
      highlight: 'Safe driver bonus',
    },
    { 
      name: 'Progressive', 
      tagline: 'Name your price',
      url: '#',
      highlight: 'Compare rates instantly',
    },
    { 
      name: 'Root Insurance', 
      tagline: 'Based on how you drive',
      url: '#',
      highlight: 'Good drivers save 50%+',
    },
  ];

  const handleGetQuotes = async () => {
    if (!email.includes('@')) return;
    
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'quiz',
          quizAnswers: { vehicleName, vehiclePrice, vehicleType, age, coverageLevel },
        }),
      });
    } catch (e) {
      console.error('Failed to save email:', e);
    }
    
    setSubmitted(true);
    setShowQuotes(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-white" />
          <div>
            <h3 className="text-lg font-bold text-white">Insurance Estimator</h3>
            <p className="text-emerald-100 text-sm">See estimated rates for {vehicleName}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!showQuotes ? (
          <>
            {/* Age Selection */}
            <div className="mb-5">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <User className="w-4 h-4" />
                Your Age
              </label>
              <div className="grid grid-cols-4 gap-2">
                {Object.keys(ageMultipliers).slice(0, 4).map((ageRange) => (
                  <button
                    key={ageRange}
                    onClick={() => setAge(ageRange)}
                    className={`py-2 rounded-lg text-sm font-medium transition-all ${
                      age === ageRange
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {ageRange}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {Object.keys(ageMultipliers).slice(4).map((ageRange) => (
                  <button
                    key={ageRange}
                    onClick={() => setAge(ageRange)}
                    className={`py-2 rounded-lg text-sm font-medium transition-all ${
                      age === ageRange
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {ageRange}
                  </button>
                ))}
              </div>
            </div>

            {/* Coverage Level */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Shield className="w-4 h-4" />
                Coverage Level
              </label>
              <div className="space-y-2">
                {[
                  { value: 'basic', label: 'Basic', desc: 'Liability only - state minimum' },
                  { value: 'standard', label: 'Standard', desc: 'Liability + Collision coverage' },
                  { value: 'full', label: 'Full Coverage', desc: 'Comprehensive protection' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setCoverageLevel(option.value as any)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      coverageLevel === option.value
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{option.label}</p>
                        <p className="text-sm text-slate-500">{option.desc}</p>
                      </div>
                      {coverageLevel === option.value && (
                        <Check className="w-5 h-5 text-emerald-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Estimate Display */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 mb-6">
              <p className="text-sm text-slate-600 mb-2 text-center">Estimated Monthly Premium</p>
              <p className="text-3xl font-bold text-slate-900 text-center">
                ${estimate.monthlyLow} - ${estimate.monthlyHigh}
                <span className="text-lg text-slate-500">/mo</span>
              </p>
              <p className="text-sm text-slate-500 text-center mt-2">
                ${estimate.annualLow.toLocaleString()} - ${estimate.annualHigh.toLocaleString()} per year
              </p>
            </div>

            {/* Email Capture for Quotes */}
            <div className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for quotes"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleGetQuotes}
                disabled={!email.includes('@')}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Get Actual Quotes →
              </button>
              <p className="text-xs text-slate-400 text-center">
                We'll send you personalized quotes from top insurers. No spam, ever.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Quotes Display */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-emerald-600 mb-4">
                <Check className="w-5 h-5" />
                <p className="font-medium">Quotes ready! Compare and save:</p>
              </div>
              
              <div className="space-y-3">
                {insuranceProviders.map((provider, i) => (
                  <a
                    key={i}
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all group"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-emerald-600">
                        {provider.name}
                      </p>
                      <p className="text-sm text-slate-500">{provider.tagline}</p>
                      <p className="text-xs text-emerald-600 font-medium mt-1">
                        {provider.highlight}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-emerald-600">Get Quote</span>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Pro Tip</p>
                  <p className="text-sm text-amber-700">
                    Get quotes from at least 3 insurers before deciding. Rates can vary by 50% or more 
                    for the same coverage!
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowQuotes(false);
                setSubmitted(false);
                setEmail('');
              }}
              className="w-full mt-4 py-2 text-slate-600 hover:text-slate-900 transition-colors text-sm"
            >
              ← Adjust estimate
            </button>
          </>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-slate-400 mt-4">
          * Estimates based on national averages. Actual rates depend on location, driving history, 
          credit score, and other factors. Partner links may earn us a commission at no cost to you.
        </p>
      </div>
    </div>
  );
}
