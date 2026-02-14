"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, Percent, Calendar, ExternalLink } from 'lucide-react';

interface FinancingCalculatorProps {
  vehiclePrice: number; // in thousands
  vehicleName: string;
}

export default function FinancingCalculator({ vehiclePrice, vehicleName }: FinancingCalculatorProps) {
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(60);

  const priceInDollars = vehiclePrice * 1000;

  const calculation = useMemo(() => {
    const downPaymentAmount = (priceInDollars * downPayment) / 100;
    const loanAmount = priceInDollars - downPaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    
    let monthlyPayment: number;
    if (interestRate === 0) {
      monthlyPayment = loanAmount / loanTerm;
    } else {
      monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                       (Math.pow(1 + monthlyRate, loanTerm) - 1);
    }
    
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;
    
    return {
      downPaymentAmount,
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
    };
  }, [priceInDollars, downPayment, interestRate, loanTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Affiliate links - replace with your actual affiliate URLs
  const lenderLinks = [
    { name: 'Caribou', url: 'https://www.caribou.com', description: 'Refinance & save' },
    { name: 'LightStream', url: 'https://www.lightstream.com', description: 'Low rates, no fees' },
    { name: 'myAutoloan', url: 'https://www.myautoloan.com', description: 'Compare 4 offers' },
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-bold text-slate-900">Financing Calculator</h3>
      </div>
      
      <p className="text-sm text-slate-600 mb-4">
        Estimate your monthly payment for the {vehicleName}
      </p>

      {/* Vehicle Price Display */}
      <div className="bg-white rounded-lg p-3 mb-4 border border-green-100">
        <div className="flex justify-between items-center">
          <span className="text-slate-600 text-sm">Vehicle Price</span>
          <span className="text-lg font-bold text-slate-900">{formatCurrency(priceInDollars)}</span>
        </div>
      </div>

      {/* Down Payment Slider */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-slate-600 flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> Down Payment
          </label>
          <span className="text-sm font-medium text-slate-900">
            {downPayment}% ({formatCurrency(calculation.downPaymentAmount)})
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          step="5"
          value={downPayment}
          onChange={(e) => setDownPayment(Number(e.target.value))}
          className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
      </div>

      {/* Interest Rate Slider */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-slate-600 flex items-center gap-1">
            <Percent className="w-3 h-3" /> Interest Rate (APR)
          </label>
          <span className="text-sm font-medium text-slate-900">{interestRate}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="15"
          step="0.5"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
      </div>

      {/* Loan Term Selector */}
      <div className="mb-6">
        <label className="text-sm text-slate-600 flex items-center gap-1 mb-2">
          <Calendar className="w-3 h-3" /> Loan Term
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[36, 48, 60, 72].map((term) => (
            <button
              key={term}
              onClick={() => setLoanTerm(term)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                loanTerm === term
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-green-400'
              }`}
            >
              {term} mo
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl p-4 border border-green-200 mb-4">
        <div className="text-center mb-3">
          <p className="text-sm text-slate-500">Estimated Monthly Payment</p>
          <p className="text-3xl font-bold text-green-600">
            {formatCurrency(calculation.monthlyPayment)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center p-2 bg-slate-50 rounded-lg">
            <p className="text-slate-500">Loan Amount</p>
            <p className="font-semibold text-slate-900">{formatCurrency(calculation.loanAmount)}</p>
          </div>
          <div className="text-center p-2 bg-slate-50 rounded-lg">
            <p className="text-slate-500">Total Interest</p>
            <p className="font-semibold text-slate-900">{formatCurrency(calculation.totalInterest)}</p>
          </div>
        </div>
      </div>

      {/* Lender Links */}
      <div className="space-y-2">
        <p className="text-xs text-slate-500 text-center mb-2">Compare rates from trusted lenders:</p>
        {lenderLinks.map((lender) => (
          <a
            key={lender.name}
            href={lender.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-green-400 hover:shadow-sm transition-all group"
          >
            <div>
              <p className="font-medium text-slate-900 group-hover:text-green-600">{lender.name}</p>
              <p className="text-xs text-slate-500">{lender.description}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-green-600" />
          </a>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        *Estimates only. Actual rates vary based on credit score and lender.
      </p>
    </div>
  );
}
