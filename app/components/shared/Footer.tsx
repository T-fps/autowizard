"use client";

import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

const LOGO_SRC = "/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/80 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img src={LOGO_SRC} alt="Auto Wizard" className="h-16 w-auto" />
            </Link>
            <p className="text-white/50 text-sm">Your partner in finding the perfect vehicle.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Expert Consultation - $119</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Customization Support - $49</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Purchase Assistance - $79</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Our Expertise</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link href="/expertise" className="hover:text-amber-400 transition-colors">Buying Guide</Link></li>
              <li><Link href="/expertise" className="hover:text-amber-400 transition-colors">Financing Options</Link></li>
              <li><Link href="/guide" className="hover:text-amber-400 transition-colors">Wizard's Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <Link href="/consultation" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                  <Mail className="w-4 h-4 text-amber-400" />autowizardcompany@gmail.com
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                  <Phone className="w-4 h-4 text-amber-400" />(413) 333-8401
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-white/40 text-sm">
          © 2026 Auto Wizard. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
