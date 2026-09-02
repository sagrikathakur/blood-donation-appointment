import React from 'react';
import { BloodDropIcon, CheckCircleIcon, CalendarIcon, HeartIcon, ShieldAdminIcon } from '../components/Icons';

export const BloodSafetyFactSheet = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* WHO Breadcrumb Navigation */}
      <nav className="text-xs text-slate-500 flex items-center gap-2 pt-2">
        <a href="#/" className="hover:text-[#007eb4] transition">Home</a>
        <span>/</span>
        <a href="#/fact-sheet" className="hover:text-[#007eb4] transition">Fact sheets</a>
        <span>/</span>
        <span className="text-slate-800 font-bold">Blood safety and availability</span>
      </nav>

      {/* Main WHO Fact Sheet Title Header */}
      <div className="space-y-4 border-b border-slate-200 pb-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#002b49] tracking-tight leading-tight">
          Blood safety and availability
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
          <span className="font-semibold text-slate-700">12 June 2026</span>
          <span>•</span>
          <span>Reading time: <strong className="text-slate-700">6 min read</strong></span>
          <span>•</span>
          <span className="px-2.5 py-0.5 rounded bg-blue-100 text-[#007eb4] border border-blue-200 font-bold uppercase text-[10px]">
            Global Fact Sheet
          </span>
        </div>
      </div>

      {/* Hero Banner Cover Image */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-[#002b49] text-white p-8 sm:p-12 relative shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#007eb4] text-white text-xs font-bold uppercase tracking-wider">
            <BloodDropIcon className="w-4 h-4" />
            Global Health Overview
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Providing Safe and Adequate Blood for Every Patient
          </h2>
          <p className="text-slate-200 text-sm leading-relaxed">
            Blood transfusion saves lives and improves health. WHO recommends coordinated national blood systems based on voluntary unpaid donations to ensure universal access to safe blood and blood products.
          </p>
        </div>
      </div>

      {/* Main 2-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Main Article Column */}
        <div className="lg:col-span-2 space-y-8 text-slate-700 text-sm leading-relaxed">
          
          {/* Key Facts WHO Box */}
          <div className="bg-[#e6f2f8] p-6 sm:p-8 rounded-2xl border-l-4 border-[#007eb4] space-y-4 shadow-sm">
            <h2 className="text-xl font-extrabold text-[#002b49] flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-[#007eb4]" />
              Key Facts
            </h2>

            <ul className="space-y-3 list-disc list-inside text-slate-800">
              <li>
                Of the <strong className="text-slate-900">120.4 million blood donations</strong> collected globally, 36% are collected in high-income countries, home to 15% of the world’s population.
              </li>
              <li>
                The blood donation rate per 1,000 people is <strong className="text-slate-900">28.9 donations in high-income countries</strong> compared to <strong className="text-slate-900">4.5 donations in low-income countries</strong>.
              </li>
              <li>
                An increase of <strong className="text-slate-900">10.7 million voluntary unpaid blood donations</strong> has been reported globally between 2013 and 2023.
              </li>
              <li>
                <strong className="text-slate-900">80 countries</strong> collect over 90% of their blood supply from voluntary unpaid blood donors; however, 59 countries still rely heavily on family/replacement donors.
              </li>
              <li>
                Only <strong className="text-slate-900">49 of 168 reporting countries</strong> produce plasma-derived medicinal products (PDMP) through domestic plasma fractionation.
              </li>
            </ul>
          </div>

          {/* Section: National Blood Policy */}
          <section className="space-y-3 pt-2">
            <h2 className="text-2xl font-bold text-[#002b49] border-b border-slate-200 pb-2">
              National Blood Policy and Organization
            </h2>
            <p>
              Providing safe and adequate blood should be an integral part of every country’s national health-care policy and infrastructure. WHO recommends that all activities related to blood collection, testing, processing, storage, and distribution be coordinated at the national level through effective organization and integrated blood supply networks.
            </p>
            <p>
              In 2023, 79% of reporting countries (133 out of 168) had a national blood policy, and 71% had specific legislation covering the safety and quality of blood transfusion.
            </p>
          </section>

          {/* Section: Blood Supply Rates */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-[#002b49] border-b border-slate-200 pb-2">
              Blood Supply & Access Indicators
            </h2>
            <p>
              About 120.4 million blood donations are collected worldwide. There is a marked difference in the level of access to blood between low- and high-income countries:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <div className="text-2xl font-extrabold text-[#007eb4]">28.9</div>
                <div className="text-[11px] font-semibold text-slate-600 mt-1">High-Income (per 1,000)</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <div className="text-2xl font-extrabold text-indigo-600">18.2</div>
                <div className="text-[11px] font-semibold text-slate-600 mt-1">Upper-Middle Income</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <div className="text-2xl font-extrabold text-amber-600">8.5</div>
                <div className="text-[11px] font-semibold text-slate-600 mt-1">Lower-Middle Income</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <div className="text-2xl font-extrabold text-emerald-600">4.5</div>
                <div className="text-[11px] font-semibold text-slate-600 mt-1">Low-Income (per 1,000)</div>
              </div>
            </div>
          </section>

          {/* Section: Blood Screening */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-[#002b49] border-b border-slate-200 pb-2">
              Mandatory Blood Screening & Testing
            </h2>
            <p>
              WHO recommends that all blood donations should be screened for infections prior to clinical use. Screening for HIV, hepatitis B, hepatitis C, and syphilis should be mandatory and performed according to strict quality management requirements.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-3">
              <div className="p-3 bg-blue-50 text-[#002b49] font-bold text-xs rounded-lg border border-blue-200 text-center">
                HIV 1 & 2
              </div>
              <div className="p-3 bg-blue-50 text-[#002b49] font-bold text-xs rounded-lg border border-blue-200 text-center">
                Hepatitis B (HBV)
              </div>
              <div className="p-3 bg-blue-50 text-[#002b49] font-bold text-xs rounded-lg border border-blue-200 text-center">
                Hepatitis C (HCV)
              </div>
              <div className="p-3 bg-blue-50 text-[#002b49] font-bold text-xs rounded-lg border border-blue-200 text-center">
                Syphilis
              </div>
            </div>
          </section>

          {/* Section: WHO Strategic Response */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-[#002b49] border-b border-slate-200 pb-2">
              WHO Response & Integrated Strategy
            </h2>
            <div className="p-6 rounded-2xl bg-[#002b49] text-white space-y-3 shadow-md">
              <div className="flex items-center gap-2 font-bold text-sm text-blue-200 uppercase tracking-wider">
                <ShieldAdminIcon className="w-5 h-5 text-[#007eb4]" />
                WHO Recommended Integrated Strategy
              </div>
              <ol className="space-y-2 text-xs text-slate-200 list-decimal list-inside leading-relaxed">
                <li>Establishment of a national blood system with effective legislation and integrated supply networks.</li>
                <li>Collection of blood and plasma from regular, voluntary unpaid blood donors.</li>
                <li>Universal quality-assured screening for transfusion-transmissible infections.</li>
                <li>Rational clinical use of blood to minimize unnecessary transfusions.</li>
                <li>Stepwise implementation of quality systems, standards, and haemovigilance.</li>
              </ol>
            </div>
          </section>

        </div>

        {/* Right Sidebar: Related WHO Content & Action Cards */}
        <div className="space-y-6">
          
          {/* Action Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#002b49] flex items-center gap-2 border-b border-slate-100 pb-2">
              <HeartIcon className="w-5 h-5 text-rose-600" />
              Take Action
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Join the global network of voluntary blood donors. Reserve your appointment at a certified facility or register as a donor.
            </p>
            <div className="space-y-2 pt-1">
              <a
                href="#/appointments"
                className="block w-full py-2.5 text-center rounded-lg bg-[#007eb4] hover:bg-[#005f88] text-white font-bold text-xs shadow-sm transition"
              >
                Schedule Appointment
              </a>
              <a
                href="#/register"
                className="block w-full py-2.5 text-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition"
              >
                Register as Voluntary Donor
              </a>
            </div>
          </div>

          {/* Related Publications */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-[#002b49] uppercase tracking-wider border-b border-slate-200 pb-2">
              Related WHO Publications
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <a href="#/fact-sheet" className="font-bold text-[#007eb4] hover:underline block">
                  Global Status Report on Blood Safety 2025
                </a>
                <span className="text-slate-500 text-[11px] block">Global Database & Guidelines</span>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-200">
                <a href="#/about" className="font-bold text-[#007eb4] hover:underline block">
                  Towards 100% Voluntary Unpaid Blood Donation
                </a>
                <span className="text-slate-500 text-[11px] block">Donor Recruitment Framework</span>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-200">
                <a href="#/services" className="font-bold text-[#007eb4] hover:underline block">
                  Establishing National Haemovigilance Systems
                </a>
                <span className="text-slate-500 text-[11px] block">Transfusion Safety Guidelines</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
