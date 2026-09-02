import React from 'react';
import { BloodDropIcon, HeartIcon, CalendarIcon, ShieldAdminIcon, CheckCircleIcon } from '../components/Icons';

export const HomePage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in pb-16">
      
      {/* WHO Style Main Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#002b49] to-[#005f88] text-white p-8 sm:p-12 shadow-md relative overflow-hidden">
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#007eb4] text-white text-xs font-extrabold uppercase tracking-wider">
            <BloodDropIcon className="w-4 h-4 text-white" />
            24/7 Global Blood Safety & Donor Network
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Safe Blood Saves Lives. <br />
            <span className="text-blue-200">Universal Access for Every Patient.</span>
          </h1>

          <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
            Welcome to the LifePulse Blood Safety & Availability Portal. Join voluntary donors, schedule donation appointments, and access global health standards.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#/appointments"
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#002b49] font-extrabold text-xs shadow-md transition flex items-center gap-2"
            >
              <CalendarIcon className="w-4 h-4 text-[#007eb4]" />
              Schedule Donation Appointment
            </a>

            <a
              href="#/fact-sheet"
              className="px-6 py-3 rounded-xl bg-[#007eb4] hover:bg-[#005f88] text-white font-extrabold text-xs shadow-md transition flex items-center gap-2"
            >
              <ShieldAdminIcon className="w-4 h-4" />
              Read WHO Fact Sheet
            </a>
          </div>
        </div>
      </div>

      {/* Quick Navigation Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <a
          href="#/fact-sheet"
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#007eb4] transition group block"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#007eb4] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <BloodDropIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#002b49] mb-1">WHO Fact Sheet</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Read official global statistics on blood safety, voluntary donation rates, and screening protocols.
          </p>
        </a>

        <a
          href="#/services"
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#007eb4] transition group block"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#007eb4] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <CheckCircleIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#002b49] mb-1">Services We Provide</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Voluntary donation drives, emergency blood matching, and free donor health screening.
          </p>
        </a>

        <a
          href="#/contact"
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#007eb4] transition group block"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#007eb4] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <HeartIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#002b49] mb-1">Emergency Contact</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Connect with our 24/7 emergency blood helpline and support team.
          </p>
        </a>

      </div>

      {/* Blood Group Compatibility WHO Reference Table */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#002b49] flex items-center gap-2">
            <BloodDropIcon className="w-6 h-6 text-[#007eb4]" />
            Blood Group Compatibility Matrix
          </h2>
          <p className="text-xs text-slate-500 mt-1">Official blood donor and recipient compatibility reference</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { group: 'O-Negative', tag: 'Universal Donor', target: 'Compatible with all recipient types' },
            { group: 'AB-Positive', tag: 'Universal Recipient', target: 'Receives from all donor types' },
            { group: 'O-Positive', tag: 'High Prevalence', target: 'Gives to O+, A+, B+, AB+' },
            { group: 'A-Positive', tag: 'High Demand', target: 'Gives to A+, AB+' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-[#007eb4] uppercase block">{item.tag}</span>
              <h4 className="text-base font-extrabold text-[#002b49]">{item.group}</h4>
              <p className="text-[11px] text-slate-600">{item.target}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
