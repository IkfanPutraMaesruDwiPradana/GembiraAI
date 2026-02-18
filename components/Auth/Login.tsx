
import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { loginUser } from '../../services/authService';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
  onNavigateRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onNavigateRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser(email, password); // 'email' holds username

      if (result.success && result.user) {
        onLogin(result.user);
      } else {
        setError(result.error || 'Gagal masuk. Periksa kembali nama pengguna dan kata sandi Anda.');
      }
    } catch (err: any) {
      setError(err.message || 'Gagal masuk. Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-[Inter]">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-12 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -ml-32 -mb-32 opacity-60" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Header */}
          <div className="mb-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black tracking-[0.2em] mb-6 border border-emerald-100 uppercase"
            >
              Mode Akses Terminal
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-3"
            >
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                GEMBIRA <span className="text-emerald-500">AI</span>
              </h1>
            </motion.div>

            <p className="text-slate-400 font-medium text-sm">
              Buka potensi akademikmu.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 rounded-2xl bg-red-50 text-red-600 text-xs font-bold text-center border border-red-100"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Nama Pengguna</label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-400 focus:bg-white focus:outline-none transition-all text-slate-900 font-bold placeholder:text-slate-300 disabled:opacity-50"
                placeholder="nama pengguna"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Kata Sandi</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-400 focus:bg-white focus:outline-none transition-all text-slate-900 font-bold placeholder:text-slate-300 disabled:opacity-50 tracking-widest"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-emerald-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black tracking-wider uppercase shadow-lg shadow-emerald-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs font-bold text-slate-400">
              BARU DI SINI?{' '}
              <button
                onClick={onNavigateRegister}
                className="text-emerald-500 hover:text-emerald-400 transition-colors ml-1"
              >
                Daftar Sekarang
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
