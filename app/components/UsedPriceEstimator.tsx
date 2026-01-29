'use client';

import { useState, useEffect } from 'react';
import { Calculator, Info } from 'lucide-react';

interface UsedPriceEstimatorProps {
  vehicleName: string;
  basePrice: number; // MSRP in thousands
  brand: string;
}

// Depreciation rates by brand (luxury brands depreciate faster initially)
const brandDepreciationRates: Record<string, number> = {
  // Premium depreciation (holds value well)
  'Toyota': 0.12,
  'Lexus': 0.13,
  'Honda': 0.13,
  'Porsche': 0.13,
  'Subaru': 0.14,
  'Mazda': 0.14,
  
  // Standard depreciation
  'Hyundai': 0.15,
  'Kia': 0.15,
  'Ford': 0.15,
  'Chevrolet': 0.15,
  'GMC': 0.15,
  'Nissan': 0.16,
  'Volkswagen': 0.16,
  'Acura': 0.15,
  'Genesis': 0.16,
  'Ram': 0.15,
  'Jeep': 0.15,
  'Dodge': 0.16,
  
  // Higher depreciation (luxury brands)
  'BMW': 0.17,
  'Mercedes-Benz': 0.17,
  'Audi': 0.17,
  'Volvo': 0.17,
  'Infiniti': 0.18,
  'Lincoln': 0.18,
  'Cadillac': 0.18,
  'Jaguar': 0.19,
  'Land Rover': 0.19,
  'Alfa Romeo': 0.19,
  'Maserati': 0.20,
  
  // EVs (higher depreciation due to tech changes)
  'Tesla': 0.16,
  'Rivian': 0.18,
  'Lucid': 0.19,
  
  // Exotics (can vary wildly, using moderate rate)
  'Ferrari': 0.10,
  'Lamborghini': 0.12,
  'McLaren': 0.18,
  'Aston Martin': 0.18,
  'Bentley': 0.17,
  'Rolls-Royce': 0.15,
};

export default function UsedPriceEstimator({ vehicleName, basePrice, brand }: UsedPriceEstimatorProps) {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear - 3);
  const [mileage, setMileage] = useState(36000);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  // Calculate estimated used price
  useEffect(() => {
    const vehicleAge = currentYear - year;
    
    // Get brand-specific depreciation rate (default to 0.15 if not found)
    const annualDepreciationRate = brandDepreciationRates[brand] || 0.15;
    
    // Calculate age-based depreciation (diminishing returns each year)
    let ageDepreciation = 0;
    for (let i = 0; i < vehicleAge; i++) {
      // First year depreciates most, then slows down
      const yearRate = i === 0 ? annualDepreciationRate * 1.5 : annualDepreciationRate * (1 - i * 0.05);
      ageDepreciation += Math.max(yearRate, 0.03); // Minimum 3% per year
    }
    
    // Calculate mileage depreciation
    // Average is ~12,000 miles/year
    const expectedMileage = vehicleAge * 12000;
    const mileageDifference = mileage - expectedMileage;
    
    // About $0.10-0.15 per mile over/under average for mainstream, more for luxury
    const perMileRate = basePrice > 60 ? 0.00015 : 0.00012; // As percentage of base price
    const mileageAdjustment = (mileageDifference / 1000) * perMileRate;
    
    // Calculate final price
    const totalDepreciation = Math.min(ageDepreciation + mileageAdjustment, 0.85); // Max 85% depreciation
    const usedPrice = basePrice * (1 - totalDepreciation);
    
    // Round to nearest $500
    const roundedPrice = Math.round(usedPrice * 2) / 2;
    
    setEstimatedPrice(Math.max(roundedPrice, basePrice * 0.15)); // Floor at 15% of MSRP
  }, [year, mileage, basePrice, brand, currentYear]);

  // Generate year options (current year minus 1 to 15 years old)
  const yearOptions = [];
  for (let y = currentYear - 1; y >= currentYear - 15; y--) {
    yearOptions.push(y);
  }

  const formatPrice = (price: number) => {
    return `$${(price * 1000).toLocaleString()}`;
  };

  return (
    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-slate-900">Used Price Estimator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Model Year</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mileage</label>
          <input
            type="number"
            value={mileage}
            onChange={(e) => setMileage(Math.max(0, Number(e.target.value)))}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
            placeholder="Enter mileage"
            step="1000"
            min="0"
          />
        </div>
        
        {estimatedPrice !== null && (
          <div className="bg-white rounded-xl p-4 border border-blue-200">
            <p className="text-sm text-slate-500 mb-1">Estimated Value</p>
            <p className="text-2xl font-bold text-blue-600">{formatPrice(estimatedPrice)}</p>
            <p className="text-xs text-slate-400 mt-1">
              {year} {vehicleName} • {mileage.toLocaleString()} mi
            </p>
          </div>
        )}
        
        <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-100 rounded-lg p-3">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-400" />
          <p>
            Estimate assumes <span className="font-medium text-slate-600">good condition</span> with clean title and no major accidents. 
            Actual prices vary by location, options, and market conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
