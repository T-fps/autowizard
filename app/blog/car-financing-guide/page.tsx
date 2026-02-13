"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, DollarSign, Calculator, TrendingUp, AlertTriangle, CheckCircle, PiggyBank, CreditCard, FileText, Car } from 'lucide-react';
import PageWrapper from '../../components/shared/PageWrapper';

export default function BlogPost() {
  return (
    <PageWrapper>
      <article className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Wizard's Guide
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />January 29, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />18 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Car Financing Guide: Loans, Leasing & Budgeting Explained</h1>
          <p className="text-xl text-slate-500">Master the financial side of car buying. Learn when to finance, when to lease, and how to budget wisely for your next vehicle.</p>
        </header>

        <div className="prose prose prose-amber max-w-none">
          <div className="bg-amber-100 border border-amber-200 rounded-2xl p-6 mb-8">
            <p className="text-amber-700 m-0 flex items-start gap-3">
              <DollarSign className="w-6 h-6 flex-shrink-0 mt-1" />
              <span><strong>Key Principle:</strong> The best financing option isn't always the lowest monthly payment—it's the one that minimizes your total cost while fitting your lifestyle and financial goals.</span>
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 mb-12">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">In This Guide</h3>
            <ul className="text-slate-600 space-y-2 m-0">
              <li>1. Budgeting: How Much Car Can You Afford?</li>
              <li>2. Financing with Auto Loans</li>
              <li>3. Leasing: How It Works</li>
              <li>4. Buying vs. Leasing: Decision Framework</li>
              <li>5. Getting the Best Rates</li>
              <li>6. Common Mistakes to Avoid</li>
            </ul>
          </div>

          {/* Section 1: Budgeting */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 flex items-center gap-3">
            <PiggyBank className="w-7 h-7 text-amber-600" />
            1. Budgeting: How Much Car Can You Afford?
          </h2>
          
          <p className="text-slate-600 mb-4">Before shopping for financing, you need to know your budget. The biggest mistake car buyers make is focusing on monthly payments instead of total cost.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">The 20/4/10 Rule</h3>
          <p className="text-slate-600 mb-4">Financial experts recommend this guideline for affordable car ownership:</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>20% down payment</strong> — Reduces loan amount and builds instant equity</li>
            <li><strong>4-year (48 month) loan maximum</strong> — Keeps you from being underwater on the loan</li>
            <li><strong>10% of gross income for total car costs</strong> — Including payment, insurance, gas, and maintenance</li>
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Example Budget Calculation
            </h4>
            <p className="text-slate-700 mb-3">For someone earning $60,000/year ($5,000/month gross):</p>
            <ul className="text-slate-700 space-y-1 m-0">
              <li>• Maximum monthly car costs: $500 (10% of gross)</li>
              <li>• Estimated insurance: $150/month</li>
              <li>• Estimated gas: $100/month</li>
              <li>• Maintenance fund: $50/month</li>
              <li>• <strong>Available for payment: $200/month</strong></li>
            </ul>
            <p className="text-slate-700 mt-3 mb-0">With a 48-month loan at 7% APR and 20% down, this supports roughly a <strong>$12,000-15,000</strong> vehicle purchase.</p>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">True Cost of Ownership</h3>
          <p className="text-slate-600 mb-4">Your monthly payment is just the beginning. Factor in these ongoing costs:</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Recurring Costs</h4>
              <ul className="text-slate-600 text-sm space-y-1 m-0">
                <li>• Insurance (varies by vehicle, driver, location)</li>
                <li>• Fuel (based on MPG and driving habits)</li>
                <li>• Registration & taxes (annual)</li>
                <li>• Routine maintenance (oil, tires, brakes)</li>
              </ul>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Often Overlooked</h4>
              <ul className="text-slate-600 text-sm space-y-1 m-0">
                <li>• Depreciation (biggest cost for new cars)</li>
                <li>• Major repairs (especially out of warranty)</li>
                <li>• Parking fees (urban areas)</li>
                <li>• Toll roads & commuting costs</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Brand Matters for Budget</h3>
          <p className="text-slate-600 mb-4">A $40,000 Toyota will cost significantly less to own than a $40,000 BMW:</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>Lowest ownership costs:</strong> Toyota, Honda, Mazda, Hyundai/Kia</li>
            <li><strong>Moderate costs:</strong> Ford, Chevrolet, Subaru, Nissan</li>
            <li><strong>Higher costs:</strong> European luxury (BMW, Mercedes, Audi), Land Rover, Jaguar</li>
          </ul>

          {/* Section 2: Auto Loans */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 flex items-center gap-3">
            <CreditCard className="w-7 h-7 text-amber-600" />
            2. Financing with Auto Loans
          </h2>

          <p className="text-slate-600 mb-4">An auto loan lets you purchase and own a vehicle while paying it off over time. You'll pay interest on the borrowed amount, but once paid off, the car is yours with no further payments.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">How Auto Loans Work</h3>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>Principal:</strong> The amount you borrow (vehicle price minus down payment and trade-in)</li>
            <li><strong>Interest Rate (APR):</strong> The cost of borrowing, expressed annually</li>
            <li><strong>Term:</strong> Length of the loan (36, 48, 60, 72, or 84 months)</li>
            <li><strong>Monthly Payment:</strong> Fixed amount covering principal + interest</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Loan Term Comparison</h3>
          <p className="text-slate-600 mb-4">Here's how term length affects a $30,000 loan at 7% APR:</p>
          
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-2 text-left text-slate-900">Loan Term</th>
                  <th className="border border-slate-300 px-4 py-2 text-left text-slate-900">Monthly Payment</th>
                  <th className="border border-slate-300 px-4 py-2 text-left text-slate-900">Total Interest</th>
                  <th className="border border-slate-300 px-4 py-2 text-left text-slate-900">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">36 months</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">$926</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">$3,347</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700 font-semibold">$33,347</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">48 months</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">$718</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">$4,489</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700 font-semibold">$34,489</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">60 months</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">$594</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">$5,644</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700 font-semibold">$35,644</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">72 months</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">$511</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">$6,812</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700 font-semibold">$36,812</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">84 months</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">$453</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">$7,993</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700 font-semibold">$37,993</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              The Long Loan Trap
            </h4>
            <p className="text-slate-700 m-0">72 and 84-month loans seem attractive due to low payments, but they're risky. Cars depreciate faster than you pay down the loan, leaving you "underwater" (owing more than the car is worth). If you need that long to afford the payment, <strong>you're buying too much car</strong>.</p>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Where to Get Auto Loans</h3>
          
          <div className="space-y-4 mb-8">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Credit Unions — Often Best Rates</h4>
              <p className="text-slate-600 text-sm m-0">Member-owned, so they pass savings to borrowers. Typically 0.5-1% lower than banks. Many have easy membership requirements.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Banks — Convenient if You're a Customer</h4>
              <p className="text-slate-600 text-sm m-0">May offer relationship discounts. Easy to manage with existing accounts. Rates vary widely.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Dealer Financing — Convenient but Compare First</h4>
              <p className="text-slate-600 text-sm m-0">Can be competitive, especially with manufacturer incentives (0% APR deals). But dealers can mark up rates, so always come with pre-approval as leverage.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Online Lenders — Quick Approval</h4>
              <p className="text-slate-600 text-sm m-0">Companies like Capital One Auto, LightStream, and Carvana offer competitive rates with fast online approval.</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">When Financing Makes Sense</h3>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />You plan to keep the car long-term (5+ years)</li>
            <li><CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />You drive more than 12,000-15,000 miles per year</li>
            <li><CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />You want to build equity and eventually own outright</li>
            <li><CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />You prefer customizing your vehicle</li>
            <li><CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />You can qualify for low interest rates (under 5%)</li>
          </ul>

          {/* Section 3: Leasing */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 flex items-center gap-3">
            <FileText className="w-7 h-7 text-amber-600" />
            3. Leasing: How It Works
          </h2>

          <p className="text-slate-600 mb-4">Leasing is essentially a long-term rental. You pay for the vehicle's depreciation during the lease term, plus interest (called "money factor"), then return it at the end.</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Lease Terminology</h3>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>Capitalized Cost (Cap Cost):</strong> The negotiated price of the vehicle</li>
            <li><strong>Residual Value:</strong> What the car is expected to be worth at lease end</li>
            <li><strong>Money Factor:</strong> The interest rate (multiply by 2,400 to get approximate APR)</li>
            <li><strong>Mileage Allowance:</strong> Annual miles included (typically 10,000-15,000)</li>
            <li><strong>Disposition Fee:</strong> Charge at lease end if you don't buy or lease again</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">How Lease Payments Are Calculated</h3>
          <p className="text-slate-600 mb-4">Your monthly lease payment covers:</p>
          <ol className="text-slate-600 space-y-2 mb-6">
            <li><strong>1. Depreciation:</strong> (Cap Cost - Residual) ÷ Lease Term</li>
            <li><strong>2. Finance Charge:</strong> (Cap Cost + Residual) × Money Factor</li>
            <li><strong>3. Taxes:</strong> Varies by state (some tax monthly, some upfront)</li>
          </ol>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h4 className="font-semibold text-blue-900 mb-3">Example Lease Calculation</h4>
            <p className="text-slate-700 mb-2">$40,000 vehicle, 36-month lease, 55% residual, .00125 money factor:</p>
            <ul className="text-slate-700 space-y-1 m-0">
              <li>• Residual Value: $40,000 × 55% = $22,000</li>
              <li>• Depreciation: ($40,000 - $22,000) ÷ 36 = $500/month</li>
              <li>• Finance Charge: ($40,000 + $22,000) × .00125 = $77.50/month</li>
              <li>• <strong>Base Payment: ~$578/month</strong> (plus tax)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">What Makes a Good Lease</h3>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>High Residual Value:</strong> Means you're paying for less depreciation</li>
            <li><strong>Low Money Factor:</strong> Under .00125 is good (equivalent to 3% APR)</li>
            <li><strong>Manufacturer Incentives:</strong> Lease cash, bonus miles, loyalty discounts</li>
            <li><strong>Brands that lease well:</strong> Honda, Toyota, Lexus, BMW, Mercedes (high residuals)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">When Leasing Makes Sense</h3>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />You drive under 12,000-15,000 miles per year</li>
            <li><CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />You want a new car every 2-3 years</li>
            <li><CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />You prefer always having warranty coverage</li>
            <li><CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />You want lower monthly payments than financing</li>
            <li><CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />You use the car for business (tax advantages)</li>
            <li><CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />You don't want to deal with selling a used car</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Leasing Downsides</h3>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><AlertTriangle className="w-4 h-4 inline text-amber-600 mr-2" />No equity—you'll always have a car payment</li>
            <li><AlertTriangle className="w-4 h-4 inline text-amber-600 mr-2" />Mileage penalties (typically $0.15-0.30/mile over limit)</li>
            <li><AlertTriangle className="w-4 h-4 inline text-amber-600 mr-2" />Wear and tear charges at lease end</li>
            <li><AlertTriangle className="w-4 h-4 inline text-amber-600 mr-2" />Expensive to exit early (termination fees)</li>
            <li><AlertTriangle className="w-4 h-4 inline text-amber-600 mr-2" />No modifications allowed</li>
            <li><AlertTriangle className="w-4 h-4 inline text-amber-600 mr-2" />Higher insurance requirements</li>
          </ul>

          {/* Section 4: Decision Framework */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-amber-600" />
            4. Buying vs. Leasing: Decision Framework
          </h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-2 text-left text-slate-900">Factor</th>
                  <th className="border border-slate-300 px-4 py-2 text-left text-slate-900">Choose Financing If...</th>
                  <th className="border border-slate-300 px-4 py-2 text-left text-slate-900">Choose Leasing If...</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700 font-medium">Annual Mileage</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">15,000+ miles/year</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">Under 12,000 miles/year</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700 font-medium">Ownership Duration</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">5+ years</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">2-3 years</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700 font-medium">Long-term Cost</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">Lower (once paid off)</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">Higher (perpetual payments)</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700 font-medium">Monthly Payment</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">Higher</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">Lower</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700 font-medium">Flexibility</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">Modify, sell anytime</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">Restricted by contract</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700 font-medium">Maintenance</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">Your responsibility</td>
                  <td className="border border-slate-300 px-4 py-2 text-slate-700">Usually under warranty</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">The Math Over 10 Years</h3>
          <p className="text-slate-600 mb-4">Comparing total cost for a $35,000 vehicle over 10 years:</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="font-semibold text-green-900 mb-2">Buying (5-year loan, keep 10 years)</h4>
              <ul className="text-slate-700 text-sm space-y-1 m-0">
                <li>• Down payment: $7,000</li>
                <li>• 60 payments × $560: $33,600</li>
                <li>• Years 6-10: $0 payments</li>
                <li>• Maintenance years 6-10: ~$5,000</li>
                <li>• <strong>Total: ~$45,600</strong></li>
                <li>• Car worth ~$8,000 at end</li>
                <li>• <strong>Net cost: ~$37,600</strong></li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-red-900 mb-2">Leasing (3 leases over 10 years)</h4>
              <ul className="text-slate-700 text-sm space-y-1 m-0">
                <li>• Down payments: $2,000 × 3 = $6,000</li>
                <li>• Lease payments: $400 × 108 = $43,200</li>
                <li>• Disposition fees: $350 × 3 = $1,050</li>
                <li>• Wear & tear charges: ~$500</li>
                <li>• <strong>Total: ~$50,750</strong></li>
                <li>• No car at end</li>
                <li>• <strong>Net cost: ~$50,750</strong></li>
              </ul>
            </div>
          </div>

          <p className="text-slate-600 mb-4"><strong>Bottom line:</strong> Buying and keeping is almost always cheaper long-term. Leasing makes sense when you value having a new car, warranty coverage, and lower payments more than building equity.</p>

          {/* Section 5: Getting Best Rates */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-amber-600" />
            5. Getting the Best Rates
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Know Your Credit Score</h3>
          <p className="text-slate-600 mb-4">Your credit score is the biggest factor in your interest rate:</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><strong>Excellent (750+):</strong> Best rates, 0% offers, premium lease terms</li>
            <li><strong>Good (700-749):</strong> Competitive rates, most incentives available</li>
            <li><strong>Fair (650-699):</strong> Higher rates, fewer promotional offers</li>
            <li><strong>Poor (below 650):</strong> Significantly higher rates, may need co-signer</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Rate Shopping Strategy</h3>
          <ol className="text-slate-600 space-y-2 mb-6">
            <li><strong>1. Check credit reports first</strong> — Dispute errors before applying</li>
            <li><strong>2. Get pre-approved</strong> — From credit union or bank before dealership</li>
            <li><strong>3. Shop within 14 days</strong> — Multiple inquiries count as one for scoring</li>
            <li><strong>4. Compare APR, not payment</strong> — Dealers can manipulate payment with term length</li>
            <li><strong>5. Negotiate the price first</strong> — Then discuss financing separately</li>
          </ol>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">When to Take Dealer Financing</h3>
          <p className="text-slate-600 mb-4">Sometimes dealer financing beats your pre-approval:</p>
          <ul className="text-slate-600 space-y-2 mb-6">
            <li><CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />0% APR promotional offers (common from Toyota, Honda, Ford)</li>
            <li><CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />Manufacturer loyalty discounts</li>
            <li><CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />College grad or military programs</li>
            <li><CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />When they beat your pre-approval rate</li>
          </ul>

          {/* Section 6: Common Mistakes */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 flex items-center gap-3">
            <AlertTriangle className="w-7 h-7 text-amber-600" />
            6. Common Mistakes to Avoid
          </h2>

          <div className="space-y-4 mb-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ Focusing Only on Monthly Payment</h4>
              <p className="text-slate-700 text-sm m-0">Dealers love stretching loans to 84 months to hit your "target payment." You pay thousands more in interest. Always ask about total cost.</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ Rolling Negative Equity Forward</h4>
              <p className="text-slate-700 text-sm m-0">Trading in a car you're underwater on and adding that debt to a new loan is a debt spiral. Pay off the old loan or wait until you have equity.</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ Skipping GAP Insurance on Loans</h4>
              <p className="text-slate-700 text-sm m-0">If you total a financed car, insurance pays market value—which may be less than you owe. GAP covers the difference. Buy from your insurance company, not the dealer.</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ Not Reading Lease Terms Carefully</h4>
              <p className="text-slate-700 text-sm m-0">Excess mileage charges, wear definitions, and disposition fees are all negotiable or avoidable. Read everything before signing.</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ Buying More Car Than You Need</h4>
              <p className="text-slate-700 text-sm m-0">It's easy to justify upgrades when payments seem manageable. Stick to your budget. The best car is one that doesn't stress your finances.</p>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-semibold text-amber-700 mb-4 flex items-center gap-2">
              <Car className="w-6 h-6" />
              Quick Decision Guide
            </h3>
            <div className="space-y-3">
              <p className="text-slate-700 m-0"><strong>Choose Financing if:</strong> You drive a lot, want to keep the car 5+ years, prefer building equity, and can handle higher payments now for zero payments later.</p>
              <p className="text-slate-700 m-0"><strong>Choose Leasing if:</strong> You drive under 12K miles/year, want a new car every 3 years, prioritize warranty coverage and lower payments, and don't mind always having a car payment.</p>
              <p className="text-slate-700 m-0"><strong>Choose Paying Cash if:</strong> You have the funds, hate debt, plan to keep the car long-term, and the money isn't needed for higher-return investments.</p>
            </div>
          </div>

          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-semibold text-amber-600 mb-4">Find Your Perfect Car Within Budget</h3>
            <p className="text-slate-600 mb-6">Now that you understand financing, let our CarMatch™ tool find vehicles that fit your budget and needs.</p>
            <Link href="/quiz" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all">
              Take Free Assessment →
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/how-much-car-can-i-afford" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-600">How Much Car Can I Afford?</span>
            </Link>
            <Link href="/blog/lease-vs-buy-car" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-600">Lease vs Buy: Detailed Comparison</span>
            </Link>
            <Link href="/blog/what-credit-score-to-buy-car" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-600">What Credit Score Do You Need?</span>
            </Link>
            <Link href="/blog/how-long-should-car-loan-be" className="p-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-600">How Long Should Your Car Loan Be?</span>
            </Link>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
}
