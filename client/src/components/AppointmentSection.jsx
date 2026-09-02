import React, { useState } from 'react';
import { CalendarIcon, BloodDropIcon, CheckCircleIcon, HeartIcon } from './Icons';
import { useAuth } from '../context/AuthContext';

export const AppointmentSection = ({ showToast, onOpenAuth }) => {
  const { user } = useAuth();
  const [appointmentType, setAppointmentType] = useState('Blood Donation');
  const [center, setCenter] = useState('Central City Blood Bank');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [date, setDate] = useState('');
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [booked, setBooked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date) {
      showToast('Please select a date for your appointment', 'error');
      return;
    }
    if (!user) {
      showToast('Please sign in or create an account to confirm your appointment reservation', 'error');
      window.location.hash = '#/login';
      return;
    }

    setBooked(true);
    showToast('Appointment successfully reserved! Details sent to email.', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-16">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#007eb4] border border-blue-200 text-xs font-bold uppercase tracking-wider">
          <CalendarIcon className="w-4 h-4" />
          Appointment Scheduling
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002b49] tracking-tight">
          Reserve Your Blood Donation Appointment
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm">
          Select your preferred blood bank facility, blood group, and reservation date.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
        {booked ? (
          <div className="text-center py-10 space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-300">
              <CheckCircleIcon className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#002b49]">Appointment Confirmed</h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Thank you <span className="font-bold text-slate-800">{fullName}</span>. Your {appointmentType} appointment at <span className="font-bold text-slate-800">{center}</span> is reserved for <span className="font-bold text-[#007eb4]">{date}</span>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setBooked(false)}
                className="px-6 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 border border-slate-300"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Appointment Type
                </label>
                <select
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                >
                  <option value="Blood Donation">Whole Blood Donation</option>
                  <option value="Platelet Donation">Platelet Donation</option>
                  <option value="Pre-Donation Screening">Pre-Donation Screening</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Blood Group
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                >
                  <option value="O+">O Positive (O+)</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="AB-">AB Negative (AB-)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Facility / Location
              </label>
              <select
                value={center}
                onChange={(e) => setCenter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
              >
                <option value="Central City Blood Bank">Central City Blood Bank (Main Hub)</option>
                <option value="St. Jude Hospital Blood Wing">St. Jude Hospital Blood Wing</option>
                <option value="Metropolitan Health Center">Metropolitan Health Center</option>
                <option value="Community Mobile Drive Unit">Community Mobile Drive Unit</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
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
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-[#007eb4] hover:bg-[#005f88] text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
            >
              <HeartIcon className="w-4 h-4" />
              Confirm Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
