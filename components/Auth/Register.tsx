import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { motion } from 'framer-motion';
import { registerUser } from '../../services/authService';
import { Eye, EyeOff } from 'lucide-react';

interface RegisterProps {
  onRegister: (user: UserProfile) => void;
  onNavigateLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onRegister, onNavigateLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '', // used for username
    university: '',
    major: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await registerUser(
        formData.email.trim(), // using email field for username
        formData.password,
        formData.name.trim(),
        formData.university.trim(),
        formData.major.trim()
      );

      if (result.success && result.user) {
        onRegister(result.user);
      } else {
        setError(result.error || 'Gagal mendaftar. Periksa kembali data Anda.');
      }
    } catch (err: any) {
      setError(err.message || 'Gagal mendaftar. Terjadi kesalahan sistem.');
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
          <div className="mb-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black tracking-[0.2em] mb-4 border border-emerald-100 uppercase"
            >
              Inisialisasi Sistem
            </motion.div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Daftar Akun Baru</h2>
            <p className="text-slate-400 text-sm font-medium mt-1">Bergabung dengan Gembira AI</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 rounded-2xl bg-red-50 text-red-600 text-xs font-bold text-center border border-red-100"
              >
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Nama Lengkap</label>
                <input
                  type="text" required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={loading}
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-400 focus:bg-white focus:outline-none transition-all text-slate-900 font-bold"
                  placeholder="Nama Lengkap"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Nama Pengguna</label>
                <input
                  type="text" required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading}
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-400 focus:bg-white focus:outline-none transition-all text-slate-900 font-bold"
                  placeholder="nama_pengguna"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Universitas</label>
                <input
                  type="text" required
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  disabled={loading}
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-400 focus:bg-white focus:outline-none transition-all text-slate-900 font-bold"
                  placeholder="Nama Universitas"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Jurusan</label>
                <input
                  type="text" required
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  disabled={loading}
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-400 focus:bg-white focus:outline-none transition-all text-slate-900 font-bold"
                  placeholder="Jurusan Kuliah"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Kata Sandi</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={loading}
                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-400 focus:bg-white focus:outline-none transition-all text-slate-900 font-bold tracking-widest"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-emerald-500 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black tracking-wider uppercase shadow-lg shadow-emerald-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Mendaftarkan...' : 'Konfirmasi Pendaftaran'}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs font-bold text-slate-400">
              SUDAH PUNYA AKUN?{' '}
              <button
                onClick={onNavigateLogin}
                className="text-emerald-500 hover:text-emerald-400 transition-colors ml-1"
              >
                Masuk
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
