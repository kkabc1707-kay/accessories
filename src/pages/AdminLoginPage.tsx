import React, { useState } from 'react';
import { Lock, ArrowLeft, ShieldCheck, Key } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { useStore } from '../context/StoreContext';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onGoHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onGoHome,
}) => {
  const { loginAdmin } = useStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = loginAdmin(password);
    if (success) {
      onLoginSuccess();
    } else {
      setError('Incorrect password. Please use the default password: crochet2026!');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8EF] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="flex justify-center mb-2">
          <BrandLogo iconSize={52} />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#6B4A3A]">
          Admin Portal Login
        </h2>
        <p className="text-xs text-[#6B4A3A]/75">
          Sign in to manage Leisure Loopz products, custom orders, and messages.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-[#FFFDF8] py-8 px-6 sm:px-10 rounded-3xl border border-[#F3B6B6]/50 shadow-md space-y-6">
          
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
                />
                <Lock className="w-4 h-4 text-[#6B4A3A]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[11px] text-[#6B4A3A]/60 mt-1.5 flex items-center gap-1">
                <Key className="w-3 h-3 text-[#B8324A]" />
                <span>Default password: <strong className="text-[#B8324A]">crochet2026!</strong></span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Access Dashboard
            </button>
          </form>

          <div className="pt-4 border-t border-[#F3B6B6]/30 flex items-center justify-between text-xs">
            <button
              onClick={onGoHome}
              className="inline-flex items-center gap-1 text-[#6B4A3A]/80 hover:text-[#B8324A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </button>

            <span className="flex items-center gap-1 text-[#718B68] font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authorized Access</span>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
