import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { AppointmentSection } from './components/AppointmentSection';
import { ContactSection } from './components/ContactSection';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Toast } from './components/Toast';
import { BloodSafetyFactSheet } from './pages/BloodSafetyFactSheet';

const MainApp = () => {
  const { user } = useAuth();
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.hash ? window.location.hash.replace('#', '') : '/';
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Listen for browser URL hash changes (multi-page routing)
  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash ? window.location.hash.replace('#', '') : '/';
      setCurrentPath(path);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // When user logs in or registers, route to appropriate dashboard page
  useEffect(() => {
    if (user) {
      if (currentPath === '/login' || currentPath === '/register') {
        if (user.role === 'admin') {
          window.location.hash = '#/admin';
        } else {
          window.location.hash = '#/dashboard';
        }
      }
    }
  }, [user, currentPath]);

  // Route matching renderer
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/fact-sheet':
        return <BloodSafetyFactSheet />;

      case '/about':
        return <AboutSection />;

      case '/services':
        return (
          <ServicesSection
            onBookClick={() => {
              window.location.hash = '#/appointments';
            }}
          />
        );

      case '/appointments':
        if (!user) {
          return (
            <div className="flex flex-col items-center justify-center py-20 space-y-5 text-center animate-fade-in max-w-lg mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-[#007eb4] flex items-center justify-center border border-blue-200 text-2xl">
                🔒
              </div>
              <h2 className="text-2xl font-extrabold text-[#002b49]">Sign In Required to Book Appointments</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                To ensure donor safety, pre-donation health screening, and accurate reservation records, scheduling a blood donation appointment requires an active user account.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#/login"
                  className="px-5 py-2.5 rounded-lg bg-[#007eb4] hover:bg-[#005f88] text-white font-bold text-xs shadow-sm transition"
                >
                  Sign In to Book
                </a>
                <a
                  href="#/register"
                  className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs transition"
                >
                  Create Account
                </a>
              </div>
            </div>
          );
        }
        return (
          <AppointmentSection
            showToast={showToast}
            onOpenAuth={() => {
              window.location.hash = '#/login';
            }}
          />
        );

      case '/contact':
        return <ContactSection showToast={showToast} />;

      case '/login':
        return (
          <div className="py-8">
            <LoginForm
              onSwitchToRegister={() => {
                window.location.hash = '#/register';
              }}
              showToast={showToast}
            />
          </div>
        );

      case '/register':
        return (
          <div className="py-8">
            <RegisterForm
              onSwitchToLogin={() => {
                window.location.hash = '#/login';
              }}
              showToast={showToast}
            />
          </div>
        );

      case '/dashboard':
        if (!user) {
          return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center max-w-lg mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
              <h2 className="text-2xl font-bold text-[#002b49]">Sign In Required</h2>
              <p className="text-xs text-slate-600">
                Please log in to your account to view your user dashboard, schedule appointments, and manage profile settings.
              </p>
              <a
                href="#/login"
                className="px-6 py-2.5 rounded-lg bg-[#007eb4] hover:bg-[#005f88] text-white font-bold text-xs shadow-sm transition"
              >
                Sign In Now
              </a>
            </div>
          );
        }
        return <UserDashboard showToast={showToast} />;

      case '/admin':
        if (!user) {
          return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center max-w-lg mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
              <h2 className="text-2xl font-bold text-[#002b49]">Admin Authentication Required</h2>
              <p className="text-xs text-slate-600">
                Please sign in with administrator credentials to access the control panel.
              </p>
              <a
                href="#/login"
                className="px-6 py-2.5 rounded-lg bg-[#002b49] text-white font-bold text-xs shadow-sm transition"
              >
                Sign In as Admin
              </a>
            </div>
          );
        }
        if (user.role !== 'admin' && user.email !== 'admin@lifepulse.org') {
          return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center max-w-lg mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
              <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-2xl font-bold">
                🚫
              </div>
              <h2 className="text-2xl font-bold text-[#002b49]">Access Forbidden</h2>
              <p className="text-xs text-slate-600">
                Your account ({user.email}) does not have administrative privileges.
              </p>
              <a
                href="#/dashboard"
                className="px-6 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition"
              >
                Return to My Dashboard
              </a>
            </div>
          );
        }
        return <AdminDashboard showToast={showToast} />;

      case '/':
      case '/home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#007eb4] selection:text-white relative">
      
      {/* WHO Multi-Page Navigation Header */}
      <Navbar currentPath={currentPath} showToast={showToast} />

      {/* Main Page Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPage()}
      </main>

      {/* Official WHO Style Multi-Column Footer */}
      <footer className="w-full bg-[#002b49] text-white py-12 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs border-b border-slate-800 pb-8">
            <div>
              <h4 className="font-extrabold text-blue-300 uppercase tracking-wider mb-3">Regions</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#/" className="hover:underline">Africa</a></li>
                <li><a href="#/" className="hover:underline">Americas</a></li>
                <li><a href="#/" className="hover:underline">Eastern Mediterranean</a></li>
                <li><a href="#/" className="hover:underline">Europe</a></li>
                <li><a href="#/" className="hover:underline">South-East Asia</a></li>
                <li><a href="#/" className="hover:underline">Western Pacific</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-blue-300 uppercase tracking-wider mb-3">Policies</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#/" className="hover:underline">Cybersecurity</a></li>
                <li><a href="#/" className="hover:underline">Ethics</a></li>
                <li><a href="#/" className="hover:underline">Permissions & Licensing</a></li>
                <li><a href="#/" className="hover:underline">Terms of Use</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-blue-300 uppercase tracking-wider mb-3">About WHO & Portal</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#/about" className="hover:underline">About Us</a></li>
                <li><a href="#/fact-sheet" className="hover:underline">Fact Sheets & Publications</a></li>
                <li><a href="#/services" className="hover:underline">Global Blood Safety Services</a></li>
                <li><a href="#/contact" className="hover:underline">Frequently Asked Questions</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-blue-300 uppercase tracking-wider mb-3">Contact & Support</h4>
              <p className="text-slate-300 mb-2">LifePulse Global Blood Safety Portal</p>
              <p className="text-slate-400 font-mono mb-4">+1 (800) 555-LIFE</p>
              <a
                href="#/contact"
                className="inline-block px-4 py-2 rounded bg-[#007eb4] hover:bg-[#005f88] text-white font-bold text-xs transition"
              >
                Contact Support
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} World Health Organization - LifePulse Blood Safety & Availability Portal. All rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-300">
              <a href="#/fact-sheet" className="hover:underline">Fact Sheets</a>
              <span>•</span>
              <a href="#/appointments" className="hover:underline">Appointments</a>
              <span>•</span>
              <a href="#/contact" className="hover:underline">Contact</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Toast Alert */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}