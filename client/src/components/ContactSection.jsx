import React, { useState } from 'react';
import { BloodDropIcon, CheckCircleIcon } from './Icons';

export const ContactSection = ({ showToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message || !email) {
      showToast('Please enter your email and message', 'error');
      return;
    }
    setSent(true);
    showToast('Your inquiry has been submitted to the support team!', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#007eb4] border border-blue-200 text-xs font-bold uppercase tracking-wider">
          <BloodDropIcon className="w-4 h-4" />
          Contact & Support
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002b49] tracking-tight">
          Get in Touch With LifePulse Portal Team
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Questions regarding blood safety guidelines, donor eligibility, or technical account support? Contact us 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-[#002b49] border-b border-slate-100 pb-2">
            Emergency Contacts
          </h3>
          
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-[11px] font-bold text-[#007eb4] block uppercase">24/7 Global Helpline</span>
              <span className="text-base font-extrabold text-[#002b49] font-mono mt-0.5 block">+1 (800) 555-LIFE</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-600 block uppercase">Official Email</span>
              <span className="text-slate-900 font-bold mt-0.5 block">support@lifepulse.org</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-600 block uppercase">Headquarters</span>
              <span className="text-slate-800 font-medium mt-0.5 block">
                100 LifePulse Plaza, Medical District, NY 10001
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          {sent ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-300">
                <CheckCircleIcon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#002b49]">Message Received</h3>
              <p className="text-slate-600 text-xs max-w-md mx-auto">
                Thank you <span className="font-bold text-slate-800">{name || 'there'}</span>. A support specialist will respond to <span className="font-bold text-[#007eb4]">{email}</span> within 24 hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 px-6 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 border border-slate-300"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Inquiry subject..."
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Type your message..."
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4] resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-[#007eb4] hover:bg-[#005f88] text-white font-bold text-xs shadow-sm transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
