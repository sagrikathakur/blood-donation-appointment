import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BloodDropIcon, UserIcon, HeartIcon, PlusIcon } from './Icons';

export const RegisterForm = ({ onSwitchToLogin, showToast }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      showToast(result.message, 'success');
      window.location.hash = '#/dashboard';
    } else {
      showToast(result.message, 'error');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md relative">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#007eb4] text-white shadow-md mb-3">
            <BloodDropIcon className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#002b49] tracking-tight">Create Account</h2>
          <p className="text-xs text-slate-500 mt-1">Join the LifePulse Voluntary Donor Registry</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Account Member Type Selector (User vs Donor) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Registration Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRoleSelect('user')}
                className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition ${
                  formData.role === 'user'
                    ? 'bg-blue-50 border-[#007eb4] text-[#007eb4]'
                    : 'bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                Standard User
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('donor')}
                className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition ${
                  formData.role === 'donor'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                    : 'bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <HeartIcon className="w-4 h-4" />
                Blood Donor
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007eb4] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007eb4] text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007eb4] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Confirm
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007eb4] text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-lg bg-[#007eb4] hover:bg-[#005f88] text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <PlusIcon className="w-4 h-4" />
                Register Account
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-600">
          Already registered?{' '}
          <a
            href="#/login"
            className="text-[#007eb4] hover:underline font-bold"
          >
            Sign In Here
          </a>
        </div>

      </div>
    </div>
  );
};
