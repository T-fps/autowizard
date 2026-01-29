"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Fuel, Leaf, Zap } from 'lucide-react';
import PageWrapper from '../../components/shared/PageWrapper';

export default function BlogPost() {
  return (
    <PageWrapper>
      <article className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/blog" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />January 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />8 min read</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Fuel Economy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Best Cars for Gas Mileage in 2026</h1>
          <p className="text-xl text-slate-600">From hybrids to efficient gas engines—these vehicles will save you thousands at the pump.</p>
        </header>

        <div className="prose prose-lg max-w-none text-slate-600">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
            <p className="text-green-800 m-0 flex items-start gap-3">
              <Fuel className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Top Pick:</strong> The 2026 Toyota Prius achieves up to 57 MPG combined, making it the most fuel-efficient non-EV on the market. For gas-only engines, the Mitsubishi Mirage leads at 39 MPG combined.</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Most Fuel-Efficient Hybrids</h2>
          
          <div className="overflow-x-auto my-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 font-bold text-slate-900">Vehicle</th>
                  <th className="text-left py-3 font-bold text-slate-900">City MPG</th>
                  <th className="text-left py-3 font-bold text-slate-900">Hwy MPG</th>
                  <th className="text-left py-3 font-bold text-slate-900">Combined</th>
                  <th className="text-left py-3 font-bold text-slate-900">Starting Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 bg-green-50"><td className="py-3 font-semibold">Toyota Prius</td><td>57</td><td>56</td><td className="text-green-600 font-bold">57</td><td>$29,500</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Hyundai Ioniq Hybrid</td><td>55</td><td>54</td><td className="font-bold">55</td><td>$26,700</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Toyota Corolla Hybrid</td><td>53</td><td>46</td><td className="font-bold">50</td><td>$24,500</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Honda Accord Hybrid</td><td>51</td><td>44</td><td className="font-bold">48</td><td>$33,990</td></tr>
                <tr><td className="py-3 font-semibold">Toyota Camry Hybrid</td><td>51</td><td>53</td><td className="font-bold">52</td><td>$30,180</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Most Fuel-Efficient Gas-Only Cars</h2>
          
          <div className="overflow-x-auto my-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 font-bold text-slate-900">Vehicle</th>
                  <th className="text-left py-3 font-bold text-slate-900">City MPG</th>
                  <th className="text-left py-3 font-bold text-slate-900">Hwy MPG</th>
                  <th className="text-left py-3 font-bold text-slate-900">Combined</th>
                  <th className="text-left py-3 font-bold text-slate-900">Starting Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 bg-green-50"><td className="py-3 font-semibold">Mitsubishi Mirage</td><td>36</td><td>43</td><td className="text-green-600 font-bold">39</td><td>$17,990</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Nissan Versa</td><td>32</td><td>40</td><td className="font-bold">35</td><td>$17,130</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Kia Rio</td><td>33</td><td>41</td><td className="font-bold">36</td><td>$17,490</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Toyota Corolla</td><td>31</td><td>40</td><td className="font-bold">34</td><td>$22,995</td></tr>
                <tr><td className="py-3 font-semibold">Honda Civic</td><td>31</td><td>40</td><td className="font-bold">34</td><td>$25,045</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Most Fuel-Efficient SUVs &amp; Crossovers</h2>
          
          <div className="overflow-x-auto my-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 font-bold text-slate-900">Vehicle</th>
                  <th className="text-left py-3 font-bold text-slate-900">Type</th>
                  <th className="text-left py-3 font-bold text-slate-900">Combined MPG</th>
                  <th className="text-left py-3 font-bold text-slate-900">Starting Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 bg-green-50"><td className="py-3 font-semibold">Toyota RAV4 Prime</td><td>PHEV</td><td className="text-green-600 font-bold">94 MPGe</td><td>$45,390</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Lexus UX Hybrid</td><td>Hybrid</td><td className="font-bold">42</td><td>$38,600</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Toyota RAV4 Hybrid</td><td>Hybrid</td><td className="font-bold">41</td><td>$34,030</td></tr>
                <tr className="border-b border-slate-200"><td className="py-3 font-semibold">Honda CR-V Hybrid</td><td>Hybrid</td><td className="font-bold">40</td><td>$34,750</td></tr>
                <tr><td className="py-3 font-semibold">Mazda CX-30</td><td>Gas</td><td className="font-bold">28</td><td>$28,950</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Annual Fuel Cost Calculator</h2>
          <p>At $3.50/gallon driving 12,000 miles per year:</p>
          
          <div className="bg-slate-900 text-white rounded-xl p-6 my-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span>57 MPG (Prius)</span>
                <span className="text-green-400 font-bold">$737/year</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span>40 MPG (Efficient Hybrid)</span>
                <span className="text-green-400">$1,050/year</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span>30 MPG (Average Car)</span>
                <span className="text-amber-400">$1,400/year</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span>22 MPG (Average SUV)</span>
                <span className="text-orange-400">$1,909/year</span>
              </div>
              <div className="flex justify-between items-center">
                <span>16 MPG (Large Truck)</span>
                <span className="text-red-400 font-bold">$2,625/year</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-4">10-year savings of Prius vs. truck: <span className="text-white font-bold">$18,880</span></p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Tips to Maximize Fuel Economy</h2>
          <ul className="space-y-2 my-4">
            <li><strong>Maintain proper tire pressure:</strong> Under-inflated tires reduce MPG by up to 3%</li>
            <li><strong>Drive smoothly:</strong> Aggressive acceleration and braking waste fuel</li>
            <li><strong>Use cruise control:</strong> Maintains consistent speed on highways</li>
            <li><strong>Remove excess weight:</strong> Every 100 lbs reduces efficiency by 1%</li>
            <li><strong>Keep up with maintenance:</strong> Clean air filters and fresh oil help efficiency</li>
          </ul>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Find Your Fuel-Efficient Match</h3>
            <p className="text-slate-700 mb-6">Tell us about your commute and driving habits, and we&apos;ll recommend the most fuel-efficient vehicles for your needs.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Try CarMatch™ Free →
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/electric-vs-hybrid" className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <span className="text-amber-600 font-medium">Electric vs. Hybrid: Which Is Right for You?</span>
            </Link>
            <Link href="/blog/most-reliable-cars-2026" className="p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <span className="text-amber-600 font-medium">Most Reliable Cars of 2026</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
