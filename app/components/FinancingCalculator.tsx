"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, Percent, Calendar, TrendingDown, ExternalLink } from 'lucide-react';

interface FinancingCalculatorProps {
  vehiclePrice: number; // in thousands (e.g., 35 = $35,000)
  vehicleName: string;
}

export default function FinancingCalculator({ vehiclePrice, vehicleName }: FinancingCalculatorProps) {
  const basePrice = vehiclePrice * 1000;
  
  const [downPayment, setDownPayment] = useState(Math.round(basePrice * 0.1)); // 10% default
  const [tradeInValue, setTradeInValue] = useState(0);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(60); // months
  const [salesTax, setSalesTax] = useState(7); // percent
  
  const calculations = useMemo(() => {
    const taxAmount = (basePrice - tradeInValue) * (salesTax / 100);
    const totalPrice = basePrice + taxAmount;
    const amountFinanced = totalPrice - downPayment - tradeInValue;
    
    // Monthly payment calculation (amortization formula)
    const monthlyRate = interestRate / 100 / 12;
    let monthlyPayment: number;
    
    if (monthlyRate === 0) {
      monthlyPayment = amountFinanced / loanTerm;
    } else {
      monthlyPayment = amountFinanced * 
        (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
        (Math.pow(1 + monthlyRate, loanTerm) - 1);
    }
    
    const totalPayments = monthlyPayment * loanTerm;
    const totalInterest = totalPayments - amountFinanced;
    
    return {
      taxAmount,
      totalPrice,
      amountFinanced: Math.max(0, amountFinanced),
      monthlyPayment: Math.max(0, monthlyPayment),
      totalPayments: Math.max(0, totalPayments),
      totalInterest: Math.max(0, totalInterest),
    };
  }, [basePrice, downPayment, tradeInValue, interestRate, loanTerm, salesTax]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Affiliate links (placeholder - replace with actual affiliate links)
  const lenderLinks = [
    { name: 'Caribou Auto Refinance', description: 'Lower your rate', url: '#' },
    { name: 'LightStream', description: 'No fees, low rates', url: '#' },
    { name: 'myAutoloan', description: 'Compare 4 offers', url: '#' },
  ];

  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <Calculator className="w-6 h-6 text-white" />
          <div>
            <h3 className="text-lg font-bold text-white">Financing Calculator</h3>
            <p className="text-cyan-100 text-sm">Estimate your monthly payment</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Inputs */}
        <div className="space-y-5 mb-6">
          {/* Vehicle Price (Display Only) */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <DollarSign className="w-4 h-4" />
              Vehicle Price
            </label>
            <div className="px-4 py-3 bg-slate-100 rounded-lg text-slate-900 font-semibold">
              {formatCurrency(basePrice)}
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
              <span className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Down Payment
              </span>
              <span className="text-amber-600">
                {Math.round((downPayment / basePrice) * 100)}%
              </span>
            </label>
            <input
              type="range"
              min="0"
              max={basePrice}
              step="500"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between mt-1">
              <span className="text-sm text-slate-500">$0</span>
              <span className="text-sm font-medium text-slate-900">{formatCurrency(downPayment)}</span>
              <span className="text-sm text-slate-500">{formatCurrency(basePrice)}</span>
            </div>
          </div>

          {/* Trade-In Value */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <DollarSign className="w-4 h-4" />
              Trade-In Value
            </label>
            <input
              type="number"
              min="0"
              max="100000"
              step="500"
              value={tradeInValue}
              onChange={(e) => setTradeInValue(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="Enter trade-in value"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
              <span className="flex items-center gap-2">
                <Percent className="w-4 h-4" />
                Interest Rate (APR)
              </span>
              <span className="text-amber-600">{interestRate}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between mt-1">
              <span className="text-sm text-slate-500">0%</span>
              <span className="text-sm text-slate-500">20%</span>
            </div>
          </div>

          {/* Loan Term */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <Calendar className="w-4 h-4" />
              Loan Term
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[36, 48, 60, 72].map((term) => (
                <button
                  key={term}
                  onClick={() => setLoanTerm(term)}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${
                    loanTerm === term
                      ? 'bg-amber-500 text-black'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {term} mo
                </button>
              ))}
            </div>
          </div>

          {/* Sales Tax */}
          <div>
            <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
              <span>Sales Tax Rate</span>
              <span className="text-amber-600">{salesTax}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="12"
              step="0.25"
              value={salesTax}
              onChange={(e) => setSalesTax(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
          <div className="text-center mb-4">
            <p className="text-sm text-slate-600 mb-1">Estimated Monthly Payment</p>
            <p className="text-4xl font-bold text-slate-900">
              {formatCurrency(calculations.monthlyPayment)}
              <span className="text-lg text-slate-500">/mo</span>
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/50 rounded-lg p-3">
              <p className="text-slate-500">Amount Financed</p>
              <p className="font-semibold text-slate-900">{formatCurrency(calculations.amountFinanced)}</p>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <p className="text-slate-500">Total Interest</p>
              <p className="font-semibold text-slate-900">{formatCurrency(calculations.totalInterest)}</p>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <p className="text-slate-500">Sales Tax</p>
              <p className="font-semibold text-slate-900">{formatCurrency(calculations.taxAmount)}</p>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <p className="text-slate-500">Total Cost</p>
              <p className="font-semibold text-slate-900">{formatCurrency(calculations.totalPayments + downPayment + tradeInValue)}</p>
            </div>
          </div>
        </div>

        {/* Get Pre-Approved CTA */}
        <div className="mt-6 p-4 bg-slate-100 rounded-xl">
          <p className="text-sm font-medium text-slate-900 mb-3">Get Pre-Approved for Better Rates</p>
          <div className="space-y-2">
            {lenderLinks.map((lender, i) => (
              <a
                key={i}
                href={lender.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-amber-400 transition-all group"
              >
                <div>
                  <p className="font-medium text-slate-900 group-hover:text-amber-600 transition-colors">
                    {lender.name}
                  </p>
                  <p className="text-sm text-slate-500">{lender.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
              </a>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3">
            * Partner links. We may earn a commission at no cost to you.
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-slate-400 mt-4">
          This calculator provides estimates only. Actual rates and terms will vary based on 
          credit score, lender, and other factors. Sales tax may vary by location.
        </p>
      </div>
    </div>
  );
}
