"use client";

import Link from 'next/link';
import { DollarSign, ExternalLink, TrendingUp, TrendingDown, Car, Wrench, FileText, CheckCircle, AlertCircle, Info } from 'lucide-react';
import PageWrapper from '../components/shared/PageWrapper';

const valuationTools = [
  {
    name: 'Kelley Blue Book',
    description: 'The most recognized name in car valuations. Trusted by consumers and dealers alike.',
    url: 'https://www.kbb.com/whats-my-car-worth/',
    color: 'from-blue-500 to-blue-600',
    logo: 'KBB'
  },
  {
    name: 'Edmunds',
    description: 'Known for accurate True Market Value pricing based on actual transactions.',
    url: 'https://www.edmunds.com/appraisal/',
    color: 'from-emerald-500 to-emerald-600',
    logo: 'EDM'
  },
  {
    name: 'NADA Guides',
    description: 'Used by banks and credit unions for loan values. Great for financing.',
    url: 'https://www.nadaguides.com/Cars',
    color: 'from-amber-500 to-amber-600',
    logo: 'NADA'
  },
  {
    name: 'CarGurus',
    description: 'Shows Instant Market Value based on similar listings in your area.',
    url: 'https://www.cargurus.com/Cars/sellYourCar.action',
    color: 'from-purple-500 to-purple-600',
    logo: 'CG'
  },
];

const instantOffers = [
  {
    name: 'CarMax',
    description: 'Get a real offer good for 7 days. No obligation to sell.',
    url: 'https://www.carmax.com/sell-my-car',
    note: 'Offer valid 7 days'
  },
  {
    name: 'Carvana',
    description: 'Instant offer online. They\'ll pick up your car for free.',
    url: 'https://www.carvana.com/sell-my-car',
    note: 'Free pickup'
  },
  {
    name: 'Vroom',
    description: 'Get a real cash offer in minutes. Free vehicle pickup.',
    url: 'https://www.vroom.com/sell',
    note: 'Cash offer'
  },
];

const valueTypes = [
  {
    type: 'Trade-In Value',
    icon: TrendingDown,
    description: 'What a dealer will offer when you trade in your car toward a new purchase.',
    typical: 'Lowest value',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    details: [
      'Convenient - no private sale hassle',
      'Can reduce sales tax on new car',
      'Dealers need profit margin for resale',
      'Typically 10-20% below private party'
    ]
  },
  {
    type: 'Private Party Value',
    icon: DollarSign,
    description: 'What you can expect selling directly to another person.',
    typical: 'Middle value',
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    details: [
      'Higher return than trade-in',
      'Requires more effort (listing, showings)',
      'You handle paperwork and payment',
      'May take weeks to find a buyer'
    ]
  },
  {
    type: 'Dealer Retail Value',
    icon: TrendingUp,
    description: 'What dealers charge when selling similar used cars.',
    typical: 'Highest value',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    details: [
      'Includes dealer overhead and profit',
      'Often includes limited warranty',
      'Vehicle has been inspected/reconditioned',
      'Reference point for negotiation'
    ]
  },
];

const valueTips = [
  {
    title: 'Gather Your Documentation',
    icon: FileText,
    tips: [
      'Service records showing regular maintenance',
      'Original window sticker (if available)',
      'Receipts for recent repairs or upgrades',
      'Clean title with no liens'
    ]
  },
  {
    title: 'Know Your Car\'s Condition',
    icon: Car,
    tips: [
      'Be honest about scratches, dents, and wear',
      'Check all features work (A/C, windows, lights)',
      'Note tire tread depth and brake condition',
      'Document any modifications'
    ]
  },
  {
    title: 'Maximize Your Value',
    icon: TrendingUp,
    tips: [
      'Clean inside and out before photos/appraisal',
      'Fix minor issues (burned out lights, etc.)',
      'Get multiple offers to compare',
      'Time your sale (spring/summer often better)'
    ]
  },
  {
    title: 'Avoid Common Mistakes',
    icon: AlertCircle,
    tips: [
      'Don\'t over-invest in repairs before selling',
      'Don\'t accept the first offer without comparing',
      'Don\'t forget to cancel insurance after sale',
      'Don\'t hand over title until payment clears'
    ]
  },
];

export default function ValuePage() {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-200 rounded-full mb-6">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-green-700 text-sm font-medium">Free Car Valuation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">What&apos;s My Car Worth?</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Get your car&apos;s value from multiple trusted sources. Compare trade-in, private party, and dealer prices.
          </p>
        </div>

        {/* Valuation Tools */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">📊 Get Your Car&apos;s Value</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {valuationTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                  <span className="text-white font-bold text-sm">{tool.logo}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors flex items-center gap-2">
                  {tool.name}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-slate-500 text-sm">{tool.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Instant Cash Offers */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">💰 Get Instant Cash Offers</h2>
            <p className="text-slate-600 mb-6">Skip the estimates—get real offers from companies that will buy your car today.</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              {instantOffers.map((offer) => (
                <a
                  key={offer.name}
                  href={offer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border border-green-200 rounded-xl p-4 hover:border-green-400 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">{offer.name}</h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{offer.note}</span>
                  </div>
                  <p className="text-slate-500 text-sm">{offer.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Understanding Value Types */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">📈 Understanding Car Values</h2>
          <p className="text-slate-600 mb-6">Not all car values are equal. Here&apos;s what each type means and when to use it.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {valueTypes.map((type) => (
              <div key={type.type} className={`border rounded-xl p-6 ${type.bgColor}`}>
                <div className="flex items-center gap-3 mb-4">
                  <type.icon className={`w-8 h-8 ${type.color}`} />
                  <div>
                    <h3 className="font-bold text-slate-900">{type.type}</h3>
                    <span className={`text-sm font-medium ${type.color}`}>{type.typical}</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Value Example */}
        <section className="mb-16">
          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Example: 2021 Toyota Camry SE (40,000 miles)
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-sm text-slate-500 mb-1">Trade-In Value</p>
                <p className="text-2xl font-bold text-orange-600">$21,500</p>
                <p className="text-xs text-slate-400">What dealers typically offer</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-green-200 ring-2 ring-green-500">
                <p className="text-sm text-slate-500 mb-1">Private Party Value</p>
                <p className="text-2xl font-bold text-green-600">$24,800</p>
                <p className="text-xs text-slate-400">Sell it yourself price</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-sm text-slate-500 mb-1">Dealer Retail</p>
                <p className="text-2xl font-bold text-blue-600">$27,500</p>
                <p className="text-xs text-slate-400">Used car lot price</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              <strong>The difference:</strong> Selling privately could net you $3,300 more than trading in—but requires more time and effort.
            </p>
          </div>
        </section>

        {/* Tips Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">💡 Tips for Getting the Best Value</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {valueTips.map((section) => (
              <div key={section.title} className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Factors Affecting Value */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">🔍 What Affects Your Car&apos;s Value?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { factor: 'Mileage', impact: 'High Impact', desc: 'Lower is better. ~12K/year is average.' },
              { factor: 'Condition', impact: 'High Impact', desc: 'Interior, exterior, mechanical state.' },
              { factor: 'Service History', impact: 'Medium Impact', desc: 'Documented maintenance adds value.' },
              { factor: 'Location', impact: 'Medium Impact', desc: 'Prices vary by region and demand.' },
              { factor: 'Color', impact: 'Low Impact', desc: 'Neutral colors typically sell faster.' },
              { factor: 'Options', impact: 'Medium Impact', desc: 'Popular features add value.' },
              { factor: 'Accidents', impact: 'High Impact', desc: 'History reduces value significantly.' },
              { factor: 'Market Trends', impact: 'Variable', desc: 'Supply/demand affects prices.' },
            ].map((item) => (
              <div key={item.factor} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-slate-900">{item.factor}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.impact === 'High Impact' ? 'bg-red-100 text-red-700' :
                    item.impact === 'Medium Impact' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-200 text-slate-600'
                  }`}>{item.impact}</span>
                </div>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Looking for Your Next Car?</h3>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Once you know what your current car is worth, let us help you find the perfect replacement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/quiz"
              className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500 transition-all"
            >
              Take the CarMatch™ Quiz →
            </Link>
            <Link 
              href="/best"
              className="inline-block px-8 py-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all"
            >
              Browse All Cars
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
