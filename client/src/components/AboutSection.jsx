import React from 'react';
import { BloodDropIcon, HeartIcon, UsersGroupIcon, CheckCircleIcon } from './Icons';

export const AboutSection = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#007eb4] border border-blue-200 text-xs font-bold uppercase tracking-wider">
          <HeartIcon className="w-4 h-4" />
          About LifePulse & WHO Standards
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002b49] tracking-tight">
          Connecting Voluntary Donors, Saving Lives Globally
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          LifePulse is committed to strengthening voluntary blood donation systems, advancing quality-assured infection screening, and ensuring equitable access to safe blood products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#007eb4] flex items-center justify-center font-bold">
            <BloodDropIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#002b49]">Our Core Mission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eliminating blood shortages by establishing regular voluntary unpaid blood donor registries across healthcare networks.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#007eb4] flex items-center justify-center font-bold">
            <UsersGroupIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#002b49]">Verified Registries</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All user and donor accounts are authenticated and audited to maintain data privacy and transfusion safety standards.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#007eb4] flex items-center justify-center font-bold">
            <CheckCircleIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#002b49]">24/7 Rapid Response</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Automated emergency donor dispatch matching blood groups instantly during critical patient transfusions.
          </p>
        </div>
      </div>

      <div className="bg-[#002b49] text-white p-8 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-md">
        <div>
          <div className="text-3xl font-extrabold text-blue-300">120.4M</div>
          <div className="text-xs text-slate-300 uppercase font-semibold mt-1">Donations Globally</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-emerald-300">80+</div>
          <div className="text-xs text-slate-300 uppercase font-semibold mt-1">Voluntary Countries</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-amber-300">100%</div>
          <div className="text-xs text-slate-300 uppercase font-semibold mt-1">Mandatory Screening</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-rose-300">24/7</div>
          <div className="text-xs text-slate-300 uppercase font-semibold mt-1">Hotline Support</div>
        </div>
      </div>
    </div>
  );
};
