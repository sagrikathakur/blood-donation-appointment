import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BloodDropIcon, LogoutIcon, ShieldAdminIcon, UserIcon, HeartIcon, KeyIcon, SearchIcon } from './Icons';

export const Navbar = ({ currentPath, showToast }) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'success');
    window.location.hash = '#/login';
  };

  const navLinks = [
    { path: '#/', label: 'Home' },
    { path: '#/fact-sheet', label: 'Fact Sheets' },
    { path: '#/about', label: 'Health Topics & About' },
    { path: '#/services', label: 'Services' },
    { path: '#/appointments', label: 'Appointments' },
    { path: '#/contact', label: 'Contact Us' }
  ];

  const isLinkActive = (path) => {
    if (path === '#/' && (currentPath === '/' || currentPath === '' || currentPath === '/home')) return true;
    return currentPath === path.replace('#', '');
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 text-slate-800 shadow-sm sticky top-0 z-50">
      
      {/* Top Header: Logo, Search & Auth Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between border-b border-slate-100">
        
        {/* WHO Style Brand Logo */}
        <a href="#/" className="flex items-center gap-3.5 group">
          <div className="w-12 h-12 rounded-full bg-[#007eb4] text-white flex items-center justify-center shadow-md group-hover:bg-[#005f88] transition">
            <BloodDropIcon className="w-7 h-7" />
          </div>
          <div>
            <div className="font-extrabold text-xl tracking-tight text-[#002b49] leading-none">
              World Health Organization
            </div>
            <div className="text-xs font-semibold text-[#007eb4] mt-1 flex items-center gap-2">
              <span>Global Blood Safety & Availability Portal</span>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-[10px] uppercase font-bold border border-blue-200">Official</span>
            </div>
          </div>
        </a>

        {/* Right Action Bar (Search & Login) */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* WHO Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search fact sheets & topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-full bg-slate-100 border border-slate-300 text-xs text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#007eb4] w-60"
            />
            <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* User Sign In / Profile status */}
          {user ? (
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#002b49] text-white font-bold text-xs flex items-center justify-center uppercase">
                  {user.name ? user.name.slice(0, 2) : 'US'}
                </div>
                <div className="text-left text-xs">
                  <span className="font-bold text-slate-800 block truncate max-w-[120px]">{user.name}</span>
                  <span className="text-[10px] font-bold text-[#007eb4] uppercase">
                    {user.email === 'admin@lifepulse.org' ? 'ADMIN' : (user.role || 'USER')}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-rose-50 text-rose-600 transition text-xs font-semibold flex items-center gap-1 border border-rose-200"
                title="Logout"
              >
                <LogoutIcon className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <a
                href="#/login"
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5"
              >
                <KeyIcon className="w-3.5 h-3.5 text-[#007eb4]" />
                Sign In
              </a>
              <a
                href="#/register"
                className="px-4 py-2 rounded-lg bg-[#007eb4] hover:bg-[#005f88] text-white text-xs font-bold shadow-sm transition"
              >
                Register
              </a>
            </div>
          )}

        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-700"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </div>

      {/* Main WHO Navigation Bar (Navy Blue Bar) */}
      <div className="bg-[#002b49] text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <nav className="flex items-center">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`px-5 py-3.5 text-xs font-bold transition-all border-b-4 ${
                  isLinkActive(link.path)
                    ? 'border-[#007eb4] bg-white/10 text-white'
                    : 'border-transparent text-slate-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* User / Admin Dashboard Links */}
          {user && (
            <div className="flex items-center gap-2 py-2">
              <a
                href="#/dashboard"
                className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition ${
                  currentPath === '/dashboard' ? 'bg-[#007eb4] text-white' : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5" />
                My Dashboard
              </a>

              {(user.role === 'admin' || user.email === 'admin@lifepulse.org') && (
                <a
                  href="#/admin"
                  className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition ${
                    currentPath === '/admin' ? 'bg-emerald-600 text-white' : 'bg-emerald-800/80 text-emerald-100 hover:bg-emerald-700'
                  }`}
                >
                  <ShieldAdminIcon className="w-3.5 h-3.5" />
                  Admin Panel
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#002b49] text-white p-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left px-4 py-2.5 rounded text-xs font-bold ${
                isLinkActive(link.path) ? 'bg-[#007eb4] text-white' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              {link.label}
            </a>
          ))}
          {user ? (
            <div className="pt-2 border-t border-slate-700 space-y-2">
              <a href="#/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded bg-slate-800 text-white text-xs font-bold">
                My Dashboard
              </a>
              {(user.role === 'admin' || user.email === 'admin@lifepulse.org') && (
                <a href="#/admin" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded bg-emerald-700 text-white text-xs font-bold">
                  Admin Panel
                </a>
              )}
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded bg-rose-700 text-white text-xs font-bold">
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-700 flex gap-2">
              <a href="#/login" onClick={() => setMobileMenuOpen(false)} className="w-1/2 text-center py-2 rounded bg-white text-slate-900 text-xs font-bold">
                Sign In
              </a>
              <a href="#/register" onClick={() => setMobileMenuOpen(false)} className="w-1/2 text-center py-2 rounded bg-[#007eb4] text-white text-xs font-bold">
                Register
              </a>
            </div>
          )}
        </div>
      )}

    </header>
  );
};
