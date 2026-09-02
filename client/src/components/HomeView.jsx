import React from 'react';
import { BloodDropIcon, HeartIcon, CalendarIcon, ShieldAdminIcon, CheckCircleIcon } from './Icons';

export const HomeView = ({ onBookClick, onAuthClick, onNavigateTab }) => {
  return (
    <div className="space-y-16 animate-fade-in pb-12">
      
      {/* Main Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-rose-950/80 via-slate-900 to-indigo-950/80 p-8 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold">
            <BloodDropIcon className="w-4 h-4 text-rose-400 animate-pulse" />
            24/7 LifePulse Emergency Donor Portal
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Every Drop Counts. <br />
            <span className="bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent">
              Save a Life Today.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Join thousands of voluntary donors across our network. Reserve your donation appointment, request emergency blood units, or manage your donor profile seamlessly.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onBookClick}
              className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-xl shadow-rose-950/60 transition-all flex items-center gap-2"
            >
              <CalendarIcon className="w-5 h-5" />
              Book Appointment Now
            </button>

            <button
              onClick={onAuthClick}
              className="px-6 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition-all flex items-center gap-2"
            >
              <HeartIcon className="w-5 h-5 text-rose-400" />
              Become a Donor
            </button>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div
          onClick={() => onNavigateTab('about')}
          className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 hover:border-rose-500/40 cursor-pointer transition group"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <HeartIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">About Our Mission</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Learn how LifePulse bridges patients and voluntary donors across the nation.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('services')}
          className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition group"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <CheckCircleIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Services We Provide</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Explore emergency matching, blood screening, and donation scheduling services.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('contact')}
          className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ShieldAdminIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Contact & Support</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Need urgent assistance or have questions? Get in touch with our 24/7 hotline.
          </p>
        </div>

      </div>

      {/* Blood Group Compatibility Quick Chart */}
      <div className="bg-slate-900/90 p-8 rounded-3xl border border-slate-800 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BloodDropIcon className="w-6 h-6 text-rose-500" />
            Blood Type Compatibility Guide
          </h2>
          <p className="text-xs text-slate-400 mt-1">Understanding compatible blood types for donors and receivers</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { group: 'O-Negative', tag: 'Universal Donor', target: 'Gives to all blood types' },
            { group: 'AB-Positive', tag: 'Universal Receiver', target: 'Receives from all blood types' },
            { group: 'O-Positive', tag: 'Most Common', target: 'Gives to O+, A+, B+, AB+' },
            { group: 'A-Positive', tag: 'High Demand', target: 'Gives to A+, AB+' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
              <span className="text-xs font-semibold text-rose-400 uppercase block">{item.tag}</span>
              <h4 className="text-base font-bold text-white">{item.group}</h4>
              <p className="text-[11px] text-slate-400">{item.target}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
