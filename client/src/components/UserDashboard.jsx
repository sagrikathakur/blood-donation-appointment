import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  BloodDropIcon,
  HeartIcon,
  UserIcon,
  CalendarIcon,
  EditIcon,
  CheckCircleIcon,
  XIcon,
  ShieldAdminIcon,
  PlusIcon
} from './Icons';

export const UserDashboard = ({ showToast }) => {
  const { user, updateUser } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const [appointments, setAppointments] = useState([
    { id: 101, type: 'Blood Donation', center: 'Central City Blood Bank', date: '2026-09-15', status: 'Confirmed', bloodGroup: 'O+' },
    { id: 102, type: 'Pre-Donation Screening', center: 'St. Jude Hospital Blood Wing', date: '2026-06-10', status: 'Completed', bloodGroup: 'O+' }
  ]);

  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [newType, setNewType] = useState('Blood Donation');
  const [newCenter, setNewCenter] = useState('Central City Blood Bank');
  const [newDate, setNewDate] = useState('');
  const [newBloodGroup, setNewBloodGroup] = useState('O+');

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const res = await updateUser(user.id, { name: editName, email: editEmail });
    setLoading(false);
    if (res.success) {
      showToast('Profile updated successfully!', 'success');
      setIsEditModalOpen(false);
    } else {
      showToast(res.message || 'Failed to update profile', 'error');
    }
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (!newDate) {
      showToast('Please select a date for appointment', 'error');
      return;
    }
    const item = {
      id: Date.now(),
      type: newType,
      center: newCenter,
      date: newDate,
      status: 'Confirmed',
      bloodGroup: newBloodGroup
    };
    setAppointments([item, ...appointments]);
    showToast('Blood Donation Appointment Booked!', 'success');
    setIsNewAppointmentOpen(false);
    setNewDate('');
  };

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Welcome Banner WHO Navy */}
      <div className="rounded-2xl bg-[#002b49] text-white p-8 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#007eb4] text-white text-xs font-bold uppercase tracking-wider mb-2">
            <HeartIcon className="w-3.5 h-3.5" />
            Active Voluntary Donor
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome, {user.name}
          </h1>
          <p className="text-slate-200 text-xs mt-1 max-w-xl">
            Account Status: Registered Voluntary Donor. Thank you for contributing to safe blood transfusion networks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewAppointmentOpen(true)}
            className="px-4 py-2.5 rounded-lg bg-[#007eb4] hover:bg-[#005f88] text-white font-bold text-xs shadow-sm transition flex items-center gap-2"
          >
            <CalendarIcon className="w-4 h-4" />
            Book Appointment
          </button>
          <button
            onClick={() => {
              setEditName(user.name);
              setEditEmail(user.email);
              setIsEditModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition flex items-center gap-2"
          >
            <EditIcon className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#007eb4] flex items-center justify-center font-bold">
            <BloodDropIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Blood Group</p>
            <p className="text-xl font-extrabold text-[#002b49] mt-0.5">O-Positive</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircleIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Donation Eligibility</p>
            <p className="text-xl font-extrabold text-emerald-600 mt-0.5">Eligible</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <HeartIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Lives Impacted</p>
            <p className="text-xl font-extrabold text-[#002b49] mt-0.5">6 Lives</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Total Donations</p>
            <p className="text-xl font-extrabold text-[#002b49] mt-0.5">2 Times</p>
          </div>
        </div>

      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-[#002b49] flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-[#007eb4]" />
              Account Info
            </h2>
            <button
              onClick={() => {
                setEditName(user.name);
                setEditEmail(user.email);
                setIsEditModalOpen(true);
              }}
              className="text-xs text-[#007eb4] hover:underline font-bold flex items-center gap-1"
            >
              <EditIcon className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">User ID</span>
              <span className="text-slate-900 font-bold font-mono">#{user.id}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Full Name</span>
              <span className="text-slate-900 font-bold">{user.name}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Email Address</span>
              <span className="text-slate-900 font-bold">{user.email}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Role</span>
                <span className="text-slate-900 font-bold capitalize">{user.role || 'User'}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#007eb4] border border-blue-200 uppercase">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Appointments Panel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-[#002b49] flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#007eb4]" />
                Donation Appointments & Records
              </h2>
            </div>
            <button
              onClick={() => setIsNewAppointmentOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#007eb4] hover:bg-[#005f88] text-white text-xs font-bold transition flex items-center gap-1"
            >
              <PlusIcon className="w-3.5 h-3.5" />
              Book New
            </button>
          </div>

          <div className="space-y-3">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#007eb4] flex items-center justify-center font-bold">
                    <BloodDropIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{appt.type} ({appt.bloodGroup})</h3>
                    <p className="text-[11px] text-slate-500">{appt.center}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">{appt.date}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                    {appt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-[#002b49] flex items-center gap-2">
                <EditIcon className="w-4 h-4 text-[#007eb4]" />
                Update Profile Info
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-[#007eb4] hover:bg-[#005f88] text-white text-xs font-bold transition"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Book Appointment Modal */}
      {isNewAppointmentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-[#002b49] flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#007eb4]" />
                Book Donation Appointment
              </h3>
              <button onClick={() => setIsNewAppointmentOpen(false)} className="text-slate-400 hover:text-slate-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Appointment Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                >
                  <option value="Blood Donation">Whole Blood Donation</option>
                  <option value="Platelet Donation">Platelet Donation</option>
                  <option value="Pre-Donation Screening">Pre-Donation Screening</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Blood Group</label>
                <select
                  value={newBloodGroup}
                  onChange={(e) => setNewBloodGroup(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                >
                  <option value="O+">O Positive (O+)</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Donation Center</label>
                <input
                  type="text"
                  value={newCenter}
                  onChange={(e) => setNewCenter(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewAppointmentOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#007eb4] hover:bg-[#005f88] text-white text-xs font-bold shadow-sm transition"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
