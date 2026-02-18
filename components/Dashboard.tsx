
import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { UserProfile } from '../types';
import { motion } from 'framer-motion';
import { Quote, TrendingUp, ShieldCheck, Activity } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
}

// Mock Data for Human-AI Balance (Based on "Lab Karya" telemetry)
const humanAiBalanceData = [
  { name: 'Sesi 1', human: 80, ai: 20 },
  { name: 'Sesi 2', human: 65, ai: 35 },
  { name: 'Sesi 3', human: 50, ai: 50 }, // Warning zone
  { name: 'Sesi 4', human: 70, ai: 30 }, // Correction
  { name: 'Sesi 5', human: 85, ai: 15 }, // Ideal mastery
];

// Mock Data for Literacy Score Card
const literacyMetrics = [
  { label: 'Fundamental AI', score: 85, max: 100 },
  { label: 'Etika & Bias', score: 92, max: 100 },
  { label: 'Prompt Engineering', score: 78, max: 100 },
  { label: 'Deteksi Hoax', score: 60, max: 100 },
];

const ETHICAL_QUOTES = [
  "AI adalah kompas, bukan nahkoda. Kamu yang pegang kendali.",
  "Kejujuran akademik adalah mata uang masa depan di era sintesis AI.",
  "Integritas bukan tentang siapa yang melihat, tapi tentang siapa dirimu saat tidak ada yang melihat.",
  "Gunakan AI untuk memperluas pikiran, bukan menggantikannya."
];

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const randomQuote = ETHICAL_QUOTES[Math.floor(Math.random() * ETHICAL_QUOTES.length)];

  return (
    <div className="space-y-10 pb-20 font-[Inter]">
      {/* 1. Header: Daily Ethical Quote & Welcome */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4 bg-emerald-50 w-fit px-4 py-2 rounded-full border border-emerald-100">
            <Quote size={14} className="text-emerald-600" />
            <p className="text-xs font-bold text-emerald-800 italic">"{randomQuote}"</p>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Selamat Datang, <span className="text-emerald-500">{user.name.split(' ')[0]}</span> 👋
          </h2>
          <p className="text-slate-500 font-medium mt-2">Pantau keseimbangan kolaborasi kemanusiaan dan kecerdasan buatanmu di sini.</p>
        </motion.div>

        <div className="text-right hidden lg:block">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total XP</p>
          <p className="text-3xl font-black text-slate-800">{user.xp.toLocaleString()}</p>
        </div>
      </header>

      {/* 2. Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Feature: Human-AI Balance Graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Activity size={20} className="text-indigo-500" />
                <h3 className="text-xl font-black text-slate-900">Human-AI Balance</h3>
              </div>
              <p className="text-xs text-slate-400 font-medium">Monitoring rasio orisinalitas vs bantuan AI dalam karya.</p>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={humanAiBalanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHuman" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} dy={10} />
                <YAxis hide />
                <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="3 3" />
                <Tooltip
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="human" stackId="1" stroke="#8b5cf6" fill="url(#colorHuman)" name="Kontribusi Manusia (Human Effort)" />
                <Area type="monotone" dataKey="ai" stackId="1" stroke="#10b981" fill="url(#colorAi)" name="Bantuan AI (AI Assist)" />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 'bold' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Feature: Literacy Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 bg-slate-900 text-white rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-20 -mt-20" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck size={20} className="text-emerald-400" />
              <h3 className="text-xl font-black">Literacy Score</h3>
            </div>

            <div className="space-y-6">
              {literacyMetrics.map((metric, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-300">{metric.label}</span>
                    <span className="text-emerald-400">{metric.score}/{metric.max}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(metric.score / metric.max) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Score</p>
                  <p className="text-2xl font-black text-white">315<span className="text-slate-500 text-sm">/400</span></p>
                </div>
                <div className="px-4 py-2 bg-emerald-500 text-slate-900 text-xs font-black rounded-xl cursor-pointer hover:bg-emerald-400 transition-colors">
                  Tingkatkan
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Bottom Quick Stats / Gamification */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Weekly Streak', val: '5 Hari', icon: '🔥', color: 'orange' },
          { label: 'Modul Selesai', val: '12', icon: '✅', color: 'emerald' },
          { label: 'Forum Kontribusi', val: '8 Post', icon: '💬', color: 'blue' },
          { label: 'Etika Rank', val: 'Guardian', icon: '🛡️', color: 'purple' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (i * 0.1) }}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className={`w-10 h-10 bg-${stat.color}-50 rounded-xl flex items-center justify-center mb-3 text-xl`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h4 className="text-xl font-black text-slate-900">{stat.val}</h4>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
