"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Car, Wrench, Briefcase, Star, Check, X, Phone, Mail } from 'lucide-react';
import PageWrapper from '../components/shared/PageWrapper';

export default function ConsultationPage() {
  const router = useRouter();
  const [consultForm, setConsultForm] = useState({
    name: '',
    email: '',
    phone: '',
    dates: [] as string[],
    times: [] as string[],
    notes: '',
    services: [] as string[]
  });

  const toggleService = (val: string) => {
    const current = consultForm.services || [];
    if (current.includes(val)) {
      setConsultForm({ ...consultForm, services: current.filter((v) => v !== val) });
    } else {
      setConsultForm({ ...consultForm, services: [...current, val] });
    }
  };

  const toggleTime = (val: string) => {
    const current = consultForm.times || [];
    if (current.includes(val)) {
      setConsultForm({ ...consultForm, times: current.filter((v) => v !== val) });
    } else {
      setConsultForm({ ...consultForm, times: [...current, val] });
    }
  };

  const addDate = (date: string) => {
    if (!date) return;
    const current = consultForm.dates || [];
    if (!current.includes(date)) {
      setConsultForm({ ...consultForm, dates: [...current, date] });
    }
  };

  const removeDate = (date: string) => {
    const current = consultForm.dates || [];
    setConsultForm({ ...consultForm, dates: current.filter((d) => d !== date) });
  };

  const handleConsult = () => {
    if (!consultForm.name || !consultForm.email || !consultForm.phone || consultForm.dates.length === 0 || consultForm.times.length === 0) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Thank you! We will contact you to confirm your appointment.');
    setConsultForm({ name: '', email: '', phone: '', dates: [], times: [], notes: '', services: [] });
    router.push('/');
  };

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Schedule Consultation</h1>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3 text-slate-600">Services (Select all that apply)</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { value: 'consultation', label: 'Expert Consultation - $119', icon: Car },
                  { value: 'customization', label: 'Customization Support - $49', icon: Wrench },
                  { value: 'purchase', label: 'Purchase Assistance - $79', icon: Briefcase },
                  { value: 'bundle', label: 'Full Bundle - $319', icon: Star }
                ].map((s) => {
                  const selected = (consultForm.services || []).includes(s.value);
                  return (
                    <button
                      key={s.value}
                      onClick={() => toggleService(s.value)}
                      className={`p-4 rounded-xl border transition-all text-left flex items-center gap-3 ${selected ? 'bg-amber-100 border-amber-500' : 'bg-white border-slate-200 hover:border-amber-400'}`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'bg-amber-500 border-amber-500' : 'border-slate-300'}`}>
                        {selected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <s.icon className={`w-5 h-5 ${selected ? 'text-amber-600' : 'text-slate-500'}`} />
                      <span className={`font-medium ${selected ? 'text-amber-700' : 'text-slate-700'}`}>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-600">Name *</label>
                <input
                  type="text"
                  value={consultForm.name}
                  onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-600">Email *</label>
                <input
                  type="email"
                  value={consultForm.email}
                  onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-600">Phone *</label>
              <input
                type="tel"
                value={consultForm.phone}
                onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-600">Preferred Date(s) *</label>
              <div className="flex gap-3 mb-3">
                <input
                  type="date"
                  id="date-picker"
                  className="flex-1 bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={() => {
                    const input = document.getElementById('date-picker') as HTMLInputElement;
                    if (input) {
                      addDate(input.value);
                      input.value = '';
                    }
                  }}
                  className="px-4 py-3 rounded-xl bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 transition-all"
                >
                  Add Date
                </button>
              </div>
              {consultForm.dates && consultForm.dates.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {consultForm.dates.map((date, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30">
                      <span className="text-amber-600 text-sm">
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </span>
                      <button onClick={() => removeDate(date)} className="text-amber-600/60 hover:text-amber-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3 text-slate-600">Preferred Time of Day *</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'morning', label: 'Morning', desc: '9 AM - 12 PM' },
                  { value: 'midday', label: 'Mid-Day', desc: '12 PM - 3 PM' },
                  { value: 'afternoon', label: 'Afternoon', desc: '3 PM - 6 PM' }
                ].map((t) => {
                  const selected = (consultForm.times || []).includes(t.value);
                  return (
                    <button
                      key={t.value}
                      onClick={() => toggleTime(t.value)}
                      className={`p-4 rounded-xl border transition-all text-center ${selected ? 'bg-amber-100 border-amber-500' : 'bg-white border-slate-200 hover:border-amber-400'}`}
                    >
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'bg-amber-500 border-amber-500' : 'border-slate-300'}`}>
                          {selected && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className={`font-medium ${selected ? 'text-amber-700' : 'text-slate-700'}`}>{t.label}</span>
                      </div>
                      <span className="text-xs text-slate-500">{t.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-600">Notes</label>
              <textarea
                value={consultForm.notes}
                onChange={(e) => setConsultForm({ ...consultForm, notes: e.target.value })}
                className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-amber-500 h-24 resize-none"
              />
            </div>
            
            <button
              onClick={handleConsult}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-lg font-semibold hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20"
            >
              Schedule
            </button>
            
            <div className="pt-6 border-t border-slate-200 flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-slate-500">
                <Phone className="w-4 h-4 text-amber-600" />(413) 333-8401
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Mail className="w-4 h-4 text-amber-600" />autowizardcompany@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
