"use client";

import Navigation from './Navigation';
import Footer from './Footer';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[100px]" />
      </div>
      <Navigation />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
}
