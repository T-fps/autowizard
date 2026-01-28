"use client";

import Link from 'next/link';
import { useState } from 'react';
import { X, Check, Send } from 'lucide-react';

const LOGO_SRC = "/logo.png";

export default function Navigation() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = () => {
    setTimeout(() => {
      setEmailSent(true);
      setTimeout(() => {
        setShowEmailModal(false);
        setEmailSent(false);
        setEmailAddress('');
      }, 2000);
    }, 1000);
  };

  return (
    <>
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <img src={LOGO_SRC} alt="Auto Wizard" className="h-20 w-auto" />
            </Link>
            <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-2">
              <Link href="/guide" className="px-4 py-2 rounded-lg text-white font-bold hover:text-amber-400 hover:bg-white/5 transition-all">Wizard&apos;s Guide</Link>
              <Link href="/services" className="px-4 py-2 rounded-lg text-white font-bold hover:text-amber-400 hover:bg-white/5 transition-all">Services</Link>
              <Link href="/expertise" className="px-4 py-2 rounded-lg text-white font-bold hover:text-amber-400 hover:bg-white/5 transition-all">Our Expertise</Link>
              <Link href="/quiz" className="px-4 py-2 rounded-lg text-white font-bold hover:text-amber-400 hover:bg-white/5 transition-all">Find My Car</Link>
            </nav>
            <Link href="/consultation" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25 text-sm md:text-base">Book Consultation</Link>
          </div>
          <nav className="md:hidden flex items-center justify-center gap-2 mt-3 pt-3 border-t border-white/10">
            <Link href="/guide" className="px-3 py-1.5 rounded-lg text-sm text-white font-bold hover:text-amber-400 hover:bg-white/5 transition-all">Wizard&apos;s Guide</Link>
            <Link href="/services" className="px-3 py-1.5 rounded-lg text-sm text-white font-bold hover:text-amber-400 hover:bg-white/5 transition-all">Services</Link>
            <Link href="/quiz" className="px-3 py-1.5 rounded-lg text-sm text-white font-bold hover:text-amber-400 hover:bg-white/5 transition-all">Find My Car</Link>
          </nav>
        </div>
      </header>

      {showEmailModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Email Results</h3>
              <button onClick={() => setShowEmailModal(false)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            {emailSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-amber-400" />
                </div>
                <p className="text-lg text-white">Sent!</p>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white mb-4 focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={sendEmail}
                  disabled={!emailAddress.includes('@')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />Send
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
