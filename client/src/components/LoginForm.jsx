import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BloodDropIcon, KeyIcon } from './Icons';

export const LoginForm = ({ onSwitchToRegister, showToast }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      showToast(result.message, 'success');
      if (result.user?.role === 'admin') {
        window.location.hash = '#/admin';
      } else {
        window.location.hash = '#/dashboard';
      }
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
          <h2 className="text-2xl font-extrabold text-[#002b49] tracking-tight">Sign In to Portal</h2>
          <p className="text-xs text-slate-500 mt-1">Access user dashboard and appointment management</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007eb4] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007eb4] text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-lg bg-[#002b49] hover:bg-[#001c30] text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <KeyIcon className="w-4 h-4 text-[#007eb4]" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Switch to Register */}
        <div className="mt-6 text-center text-xs text-slate-600">
          Don't have an account?{' '}
          <a
            href="#/register"
            className="text-[#007eb4] hover:underline font-bold"
          >
            Create Account
          </a>
        </div>

        {/* Admin Credentials Helper */}
        <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-[#002b49] text-center">
          <span className="font-bold block text-slate-800">Default Admin Credentials</span>
          <span className="text-slate-600">Email: <strong className="text-[#007eb4]">admin@lifepulse.org</strong></span>
          <span className="mx-1">•</span>
          <span className="text-slate-600">Password: <strong className="text-[#007eb4]">admin123</strong></span>
        </div>

      </div>
    </div>
  );
};
