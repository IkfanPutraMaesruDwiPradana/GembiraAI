
import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { motion } from 'framer-motion';

interface EditProfileProps {
  user: UserProfile;
  onUpdate: (updatedUser: UserProfile) => void;
  onCancel: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({ user, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState<UserProfile>({ ...user });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API delay
    setTimeout(() => {
      onUpdate(formData);
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Edit Identity Node 👤</h2>
          <p className="text-slate-500 font-medium mt-2">Personalize your academic presence in the network.</p>
        </div>
        <button 
          onClick={onCancel}
          className="text-xs font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest px-4 py-2"
        >
          Cancel
        </button>
      </header>

      <div className="glass-card p-10 rounded-[3rem] bg-white/90 border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-slate-50">
            <div className="relative group">
              <div className={`w-32 h-32 rounded-[2.5rem] ${formData.avatarColor} flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-emerald-200 transition-transform group-hover:rotate-3`}>
                {formData.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg ring-1 ring-slate-100">
                <span className="text-xs">📸</span>
              </div>
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h3 className="text-xl font-black text-slate-900">{formData.name || 'Set Your Name'}</h3>
              <p className="text-sm text-slate-500 font-medium">Avatar identity is automatically generated based on your academic credentials.</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {['bg-emerald-500', 'bg-blue-500', 'bg-rose-500', 'bg-amber-500', 'bg-indigo-500'].map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({...formData, avatarColor: color})}
                    className={`w-6 h-6 rounded-full ${color} ring-offset-2 transition-all ${formData.avatarColor === color ? 'ring-2 ring-slate-900 scale-110' : 'opacity-40 hover:opacity-100'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500/50 focus:bg-white focus:outline-none transition-all text-slate-900 font-bold"
                placeholder="Ex: Siti Aminah"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Digital Core (Email)</label>
              <input 
                type="email" 
                disabled
                value={formData.email}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-300 font-bold cursor-not-allowed italic"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">University Base</label>
              <input 
                type="text" 
                value={formData.university}
                onChange={(e) => setFormData({...formData, university: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500/50 focus:bg-white focus:outline-none transition-all text-slate-900 font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Academic Major</label>
              <input 
                type="text" 
                value={formData.major}
                onChange={(e) => setFormData({...formData, major: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500/50 focus:bg-white focus:outline-none transition-all text-slate-900 font-bold"
              />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.01, boxShadow: '0 10px 20px rgba(16,185,129,0.2)' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSaving}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Syncing Identity...
              </>
            ) : (
              'Save Configuration'
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
};
