import React from 'react';
import { BloodDropIcon, HeartIcon, CalendarIcon, ShieldAdminIcon, CheckCircleIcon } from './Icons';

export const ServicesSection = ({ onBookClick }) => {
  const services = [
    {
      icon: <BloodDropIcon className="w-6 h-6 text-[#007eb4]" />,
      title: 'Voluntary Blood Donation',
      desc: 'Schedule voluntary blood donations at certified hospital blood banks or mobile community donation drives.',
      badge: 'Core Service'
    },
    {
      icon: <HeartIcon className="w-6 h-6 text-rose-600" />,
      title: 'Emergency Blood Matching',
      desc: 'Instant broadcast system connecting emergency patients with verified nearby donors matching specific blood types.',
      badge: '24/7 Available'
    },
    {
      icon: <CalendarIcon className="w-6 h-6 text-indigo-600" />,
      title: 'Appointment Reservation',
      desc: 'Reserve convenient time slots at your chosen facility with automated digital appointment pass generation.',
      badge: 'Online Booking'
    },
    {
      icon: <ShieldAdminIcon className="w-6 h-6 text-emerald-600" />,
      title: 'Donor Health Screening',
      desc: 'Complimentary pre-donation health checkups including hemoglobin testing, blood pressure, and pulse evaluation.',
      badge: 'Free Screening'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#007eb4] border border-blue-200 text-xs font-bold uppercase tracking-wider">
          <CheckCircleIcon className="w-4 h-4" />
          Services We Provide
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002b49] tracking-tight">
          Comprehensive Blood Safety & Transfusion Services
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          From routine voluntary blood drives to urgent emergency dispatches, LifePulse provides integrated healthcare support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#007eb4] transition"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {s.icon}
                </div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {s.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#002b49] mb-1">{s.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{s.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-[#007eb4] font-bold flex items-center gap-1">
                <CheckCircleIcon className="w-3.5 h-3.5" />
                WHO Quality System
              </span>
              <a
                href="#/appointments"
                className="px-3.5 py-1.5 rounded-lg bg-[#007eb4] hover:bg-[#005f88] text-white text-xs font-bold transition shadow-sm"
              >
                Book Service
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
