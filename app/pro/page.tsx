"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, X, Zap, Shield, Clock, Users, ArrowRight, Star } from 'lucide-react';
import PageWrapper from '../components/shared/PageWrapper';

export default function WizardProPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: 'Free',
      description: 'Everything you need to start your car search',
      price: { monthly: 0, yearly: 0 },
      features: [
        { name: 'Car Matchmaking Quiz', included: true },
        { name: 'Browse 400+ Vehicles', included: true },
        { name: 'Compare up to 3 Cars', included: true },
        { name: 'Read Buying Guides', included: true },
        { name: 'Basic Recommendations', included: true },
        { name: 'AI Negotiation Scripts', included: false },
        { name: 'Dealer Invoice Data', included: false },
        { name: 'Market Price Analysis', included: false },
        { name: 'Priority Support', included: false },
      ],
      cta: 'Current Plan',
      ctaLink: '/quiz',
      popular: false,
      ctaStyle: 'border border-slate-300 text-slate-600 cursor-default',
    },
    {
      name: 'Pro',
      description: 'AI-powered tools to negotiate like a pro',
      price: { monthly: 29, yearly: 99 },
      features: [
        { name: 'Everything in Free', included: true },
        { name: 'AI Negotiation Scripts', included: true },
        { name: 'Dealer Invoice Prices', included: true },
        { name: 'Market Price Analysis', included: true },
        { name: 'Personalized Deal Alerts', included: true },
        { name: 'Financing Calculator Pro', included: true },
        { name: 'Trade-In Value Estimator', included: true },
        { name: 'Email Support', included: true },
        { name: 'Concierge Service', included: false },
      ],
      cta: 'Start Free Trial',
      ctaLink: '/pro/checkout?plan=pro',
      popular: true,
      ctaStyle: 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500',
    },
    {
      name: 'Concierge',
      description: 'We negotiate and find the best deal for you',
      price: { monthly: 199, yearly: 199 },
      oneTime: true,
      features: [
        { name: 'Everything in Pro', included: true },
        { name: 'Personal Car Buying Expert', included: true },
        { name: 'AI Negotiates on Your Behalf', included: true },
        { name: 'Multi-Dealer Price Comparison', included: true },
        { name: 'Paperwork Review', included: true },
        { name: 'Financing Optimization', included: true },
        { name: 'Trade-In Maximization', included: true },
        { name: 'Priority Phone Support', included: true },
        { name: 'Satisfaction Guarantee', included: true },
      ],
      cta: 'Get Started',
      ctaLink: '/pro/checkout?plan=concierge',
      popular: false,
      ctaStyle: 'bg-slate-800 text-white hover:bg-slate-700',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'First-time buyer',
      quote: 'The AI negotiation script saved me $3,200 on my new RAV4. Worth every penny!',
      savings: '$3,200',
    },
    {
      name: 'Michael R.',
      role: 'Pro subscriber',
      quote: 'Dealer invoice data showed me exactly what the dealership paid. Game changer.',
      savings: '$2,800',
    },
    {
      name: 'Jennifer L.',
      role: 'Concierge client',
      quote: 'They handled everything. I just showed up and signed. Easiest car purchase ever.',
      savings: '$4,500',
    },
  ];

  const faqs = [
    {
      q: 'How do the AI negotiation scripts work?',
      a: 'Our AI analyzes current market data, dealer inventory, and pricing trends to generate personalized scripts you can use when negotiating. Just enter the car you want, and we\'ll tell you exactly what to say.',
    },
    {
      q: 'What is dealer invoice pricing?',
      a: 'Dealer invoice is what the dealership actually pays the manufacturer. Knowing this gives you leverage—you can negotiate up from invoice rather than down from MSRP.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes! Pro subscriptions can be canceled anytime. You\'ll keep access until the end of your billing period. Concierge is a one-time payment with no recurring charges.',
    },
    {
      q: 'How does the Concierge service work?',
      a: 'After you tell us what car you want, our team contacts multiple dealers, negotiates the best price, handles trade-in valuations, and presents you with the best deal. You just show up and sign.',
    },
  ];

  return (
    <PageWrapper>
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 text-sm mb-6">
            <Zap className="w-4 h-4" />
            Average savings: $2,800+
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Stop Overpaying for Your Next Car
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Wizard Pro gives you dealer-level insights and AI negotiation tools. 
            Know exactly what to pay—and what to say.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-slate-800 rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-full transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-white text-slate-900' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                billingCycle === 'yearly' 
                  ? 'bg-white text-slate-900' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                Save 72%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-6 -mt-12">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl border-2 p-6 ${
                plan.popular 
                  ? 'border-amber-500 shadow-xl shadow-amber-500/20' 
                  : 'border-slate-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-black text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-slate-500 text-sm mb-4">{plan.description}</p>
              
              <div className="mb-6">
                {plan.oneTime ? (
                  <div>
                    <span className="text-4xl font-bold text-slate-900">${plan.price.monthly}</span>
                    <span className="text-slate-500 ml-2">one-time</span>
                  </div>
                ) : plan.price.monthly === 0 ? (
                  <div>
                    <span className="text-4xl font-bold text-slate-900">Free</span>
                    <span className="text-slate-500 ml-2">forever</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-4xl font-bold text-slate-900">
                      ${billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-slate-500 ml-2">
                      {billingCycle === 'yearly' ? '/year' : '/month'}
                    </span>
                    {billingCycle === 'yearly' && plan.price.monthly > 0 && (
                      <p className="text-green-600 text-sm mt-1">
                        Save ${plan.price.monthly * 12 - plan.price.yearly}/year
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? 'text-slate-700' : 'text-slate-400'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              
              {plan.name === 'Free' ? (
                <div className={`w-full py-3 rounded-xl text-center font-semibold ${plan.ctaStyle}`}>
                  {plan.cta}
                </div>
              ) : (
                <Link
                  href={plan.ctaLink}
                  className={`block w-full py-3 rounded-xl text-center font-semibold transition-all ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-center gap-8 text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            <span>Cancel Anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            <span>10,000+ Happy Customers</span>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Real Savings from Real Customers
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Saved</p>
                    <p className="text-lg font-bold text-green-600">{testimonial.savings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            How Wizard Pro Saves You Money
          </h2>
          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Know the Real Price',
                description: 'See dealer invoice costs—what the dealership actually paid. This is your starting point for negotiation, not MSRP.',
              },
              {
                step: '2',
                title: 'Get Your Script',
                description: 'Our AI generates personalized negotiation scripts based on current market conditions, inventory levels, and dealer incentives.',
              },
              {
                step: '3',
                title: 'Negotiate with Confidence',
                description: 'Walk in knowing exactly what to say. Our scripts handle objections, reveal hidden fees, and get you the best price.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to Save Thousands?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Join 10,000+ car buyers who saved an average of $2,800 with Wizard Pro.
          </p>
          <Link
            href="/pro/checkout?plan=pro"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-lg font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
          >
            Start Your Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-slate-500 mt-4">
            7-day free trial • Cancel anytime • No credit card required
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
