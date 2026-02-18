
import React from 'react';
import { AppView, UserProfile } from '../types';
import { NAV_ITEMS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  user: UserProfile | null;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, user, onLogout }) => {
  if (!user) return <>{children}</>;

  const levelProgress = (user.xp % 100);

  return (
    <div className="flex h-screen overflow-hidden text-slate-800">
      {/* Light Futuristic Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="w-72 bg-white/40 backdrop-blur-3xl flex flex-col border-r border-slate-200/50 relative z-20"
      >
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-10">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center font-black text-white shadow-xl shadow-emerald-200"
            >
              G
            </motion.div>
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none text-slate-900">GEMBIRA <span className="text-emerald-500">AI</span></h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-bold">Mahasiswa v2.0</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Lv. {user.level}</span>
              <span className="text-[10px] font-bold text-slate-400">{user.xp} XP</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full"
              ></motion.div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.8)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center px-5 py-3.5 rounded-2xl transition-all duration-300 group ${activeView === item.id
                ? 'bg-white shadow-lg shadow-slate-200/50 text-emerald-600 ring-1 ring-slate-100'
                : 'text-slate-500 hover:text-slate-900'
                }`}
            >
              <span className={`mr-4 text-xl transition-all ${activeView === item.id ? 'scale-110 drop-shadow-md' : 'opacity-50 grayscale'}`}>{item.icon}</span>
              <span className="text-sm font-bold tracking-tight">{item.label}</span>
              {activeView === item.id && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200"
                />
              )}
            </motion.button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 bg-white/20">
          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            onClick={() => setActiveView(AppView.EDIT_PROFILE)}
            className={`w-full flex items-center p-3.5 rounded-2xl transition-all group ${activeView === AppView.EDIT_PROFILE
              ? 'bg-emerald-50 border border-emerald-100'
              : 'border border-slate-100 bg-white hover:bg-slate-50'
              }`}
          >
            <div className={`w-10 h-10 rounded-xl ${user.avatarColor} flex items-center justify-center text-xs font-black mr-3 shadow-lg text-white group-hover:rotate-6 transition-transform`}>
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-[11px] font-black truncate text-slate-900">{user.name}</p>
              <p className="text-[9px] text-emerald-600/70 font-black uppercase tracking-widest">{user.major}</p>
            </div>
          </motion.button>
          <button
            onClick={onLogout}
            className="mt-4 w-full flex items-center justify-center p-3 rounded-2xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all font-bold group"
          >
            <LogOut size={18} className="mr-3 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Keluar</span>
          </button>
        </div>
      </motion.aside>

      {/* Light-Theme Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar relative">
        <div className="max-w-6xl mx-auto p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "circOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
