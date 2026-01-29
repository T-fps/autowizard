'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

export interface Trim {
  name: string;
  price: number;
  features?: string[];
}

interface TrimSelectorProps {
  vehicleName: string;
  basePrice: number;
  trims: Trim[];
}

export default function TrimSelector({ vehicleName, basePrice, trims }: TrimSelectorProps) {
  const [selectedTrim, setSelectedTrim] = useState<Trim>(trims[0]);

  const formatPrice = (price: number) => `$${(price * 1000).toLocaleString()}`;

  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Available Trims</h3>
      
      <div className="space-y-3">
        {trims.map((trim, index) => (
          <button
            key={trim.name}
            onClick={() => setSelectedTrim(trim)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selectedTrim.name === trim.name
                ? 'bg-amber-100 border-amber-400'
                : 'bg-white border-slate-200 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedTrim.name === trim.name 
                    ? 'bg-amber-500 border-amber-500' 
                    : 'border-slate-400'
                }`}>
                  {selectedTrim.name === trim.name && <Check className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <span className={`font-semibold ${selectedTrim.name === trim.name ? 'text-slate-900' : 'text-slate-700'}`}>
                    {trim.name}
                  </span>
                  {trim.features && trim.features.length > 0 && (
                    <p className="text-sm text-slate-500 mt-0.5">
                      {trim.features.slice(0, 2).join(' • ')}
                    </p>
                  )}
                </div>
              </div>
              <span className={`font-bold ${selectedTrim.name === trim.name ? 'text-amber-600' : 'text-slate-600'}`}>
                {formatPrice(trim.price)}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Trim Details */}
      <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-slate-900">{vehicleName} {selectedTrim.name}</h4>
          <span className="text-2xl font-bold text-amber-600">{formatPrice(selectedTrim.price)}</span>
        </div>
        {selectedTrim.features && selectedTrim.features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTrim.features.map((feature, i) => (
              <span key={i} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-full text-sm">
                {feature}
              </span>
            ))}
          </div>
        )}
        <p className="text-slate-500 text-xs mt-3">
          *Starting MSRP. Destination, taxes, and fees not included.
        </p>
      </div>
    </div>
  );
}
