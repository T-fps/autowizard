"use client";

import React, { useState, useMemo } from 'react';
import { Shield, User, MapPin, ExternalLink, Check } from 'lucide-react';

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
    '50-59': 0.9,
    '60+': 0.95,
  };

  // Coverage multipliers
  const coverageMultipliers = {
    basic: 0.6,
    standard: 1.0,
    full: 1.5,
  };

  const estimate = useMemo(() => {
    const baseRate = baseRates[vehicleType] || 130;
    const priceMultiplier = 1 + (vehiclePrice - 30) * 0.01; // Adjust for vehicle price
    const ageMultiplier = ageMultipliers[age] || 1.0;
    const coverageMultiplier = coverageMultipliers[coverageLevel];
    
    const monthlyEstimate = baseRate * priceMultiplier * ageMultiplier * coverageMultiplier;
    
    return {
      monthly: Math.round(monthlyEstimate),
      annual: Math.round(monthlyEstimate * 12),
      sixMonth: Math.round(monthlyEstimate * 6),
    };
  }, [vehicleType, vehiclePrice, age, coverageLevel]);

  // Affiliate links - replace with your actual affiliate URLs
  const insuranceProviders = [
    { name: 'Liberty Mutual', url: 'https://www.libertymutual.com', tagline: 'Customize your coverage' },
    { name: 'Allstate', url: 'https://www.allstate.com', tagline: 'You\'re in good hands' },
    { name: 'Progressive', url: 'https://www.progressive.com', tagline: 'Name your price' },
    { name: 'Root', url: 'https://www.root.com', tagline: 'Based on how you drive' },
  ];

  const handleGetQuotes = async () => {
    if (!email) return;
    
    // Save to your email collection API
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'insurance-estimator',
          vehicle: vehicleName,
          estimate: estimate.monthly,
        }),
      });
    } catch (e) {
      // Silent fail - still show quotes
    }
    
    setSubmitted(true);
    setShowQuotes(true);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-slate-900">Insurance Estimate</h3>
      </div>
      
      <p className="text-sm text-slate-600 mb-4">
        Estimated insurance cost for the {vehicleName}
      </p>

      {/* Age Selector */}
      <div className="mb-4">
        <label className="text-sm text-slate-600 flex items-center gap-1 mb-2">
          <User className="w-3 h-3" /> Driver Age
        </label>
        <select
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 rounded-lg border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="16-19">16-19 years</option>
          <option value="20-24">20-24 years</option>
          <option value="25-29">25-29 years</option>
          <option value="30-39">30-39 years</option>
          <option value="40-49">40-49 years</option>
          <option value="50-59">50-59 years</option>
          <option value="60+">60+ years</option>
        </select>
      </div>

      {/* Coverage Level */}
      <div className="mb-6">
        <label className="text-sm text-slate-600 mb-2 block">Coverage Level</label>
        <div className="grid grid-cols-3 gap-2">
          {(['basic', 'standard', 'full'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setCoverageLevel(level)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize ${
                coverageLevel === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {coverageLevel === 'basic' && 'Liability only - minimum required coverage'}
          {coverageLevel === 'standard' && 'Liability + collision + comprehensive'}
          {coverageLevel === 'full' && 'Full coverage with low deductibles'}
        </p>
      </div>

      {/* Estimate Display */}
      <div className="bg-white rounded-xl p-4 border border-blue-200 mb-4">
        <div className="text-center mb-3">
          <p className="text-sm text-slate-500">Estimated Monthly Premium</p>
          <p className="text-3xl font-bold text-blue-600">
            ${estimate.monthly}/mo
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center p-2 bg-slate-50 rounded-lg">
            <p className="text-slate-500">6-Month</p>
            <p className="font-semibold text-slate-900">${estimate.sixMonth}</p>
          </div>
          <div className="text-center p-2 bg-slate-50 rounded-lg">
            <p className="text-slate-500">Annual</p>
            <p className="font-semibold text-slate-900">${estimate.annual}</p>
          </div>
        </div>
      </div>

      {/* Email Capture or Quote Links */}
      {!showQuotes ? (
        <div className="space-y-3">
          <p className="text-sm text-slate-600 text-center">
            Get personalized quotes from top insurers:
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleGetQuotes}
            disabled={!email}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Free Quotes
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {submitted && (
            <div className="flex items-center gap-2 text-green-600 text-sm mb-3 justify-center">
              <Check className="w-4 h-4" />
              <span>We&apos;ll send you tips to save on insurance!</span>
            </div>
          )}
          <p className="text-xs text-slate-500 text-center mb-2">Compare quotes from these providers:</p>
          {insuranceProviders.map((provider) => (
            <a
              key={provider.name}
              href={provider.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all group"
            >
              <div>
                <p className="font-medium text-slate-900 group-hover:text-blue-600">{provider.name}</p>
                <p className="text-xs text-slate-500">{provider.tagline}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </a>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-400 mt-4 text-center">
        *Estimates based on national averages. Actual rates vary by location and driving history.
      </p>
    </div>
  );
}
