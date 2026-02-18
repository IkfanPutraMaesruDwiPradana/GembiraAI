
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageCircle, Eye, ThumbsUp, MessageSquare, Award, Mic2, FileText, Share2 } from 'lucide-react';

export const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'debate' | 'peer_review' | 'showcase'>('debate');

  return (
    <div className="space-y-8 pb-20 font-[Inter]">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-teal-100 text-teal-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-teal-200">
              Forum Etika
            </span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
            Suara <span className="text-teal-600">Mahasiswa</span>
          </h2>
          <p className="text-slate-500 font-medium mt-3 max-w-xl">
            Ruang dialektika, kolaborasi, dan apresiasi karya akademik.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {[
            { id: 'debate', label: 'Debat Arena', icon: <Mic2 size={16} /> },
            { id: 'peer_review', label: 'Peer Review', icon: <FileText size={16} /> },
            { id: 'showcase', label: 'Showcase Karya', icon: <Award size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === tab.id
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-200'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
            >
              {tab.icon}
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'debate' && <DebateArenaView />}
          {activeTab === 'peer_review' && <PeerReviewView />}
          {activeTab === 'showcase' && <ShowcaseView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Sub-Components ---

const DebateArenaView: React.FC = () => {
  const topics = [
    {
      id: 1,
      title: "Apakah AI Seharusnya Memiliki Hak Cipta?",
      pro: 45,
      contra: 55,
      participants: 128,
      status: 'live',
      desc: "Perdebatan mengenai status hukum karya seni yang dihasilkan sepenuhnya oleh algoritma generative AI tanpa campur tangan manusia."
    },
    {
      id: 2,
      title: "Larangan Total ChatGPT di Kampus: Solusi atau Kemunduran?",
      pro: 12,
      contra: 88,
      participants: 342,
      status: 'hot',
      desc: "Diskusi tentang kebijakan beberapa universitas yang melarang penggunaan AI tools dalam penyusunan tugas akhir."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {topics.map((topic) => (
        <div key={topic.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all group relative overflow-hidden">
          <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest text-white ${topic.status === 'live' ? 'bg-rose-500' : 'bg-orange-500'}`}>
            {topic.status === 'live' ? '● Live Debate' : '🔥 Trending'}
          </div>

          <h3 className="text-xl font-black text-slate-900 mt-4 mb-3 leading-tight group-hover:text-teal-600 transition-colors">
            {topic.title}
          </h3>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            {topic.desc}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden flex">
              <div className="bg-teal-500 h-full" style={{ width: `${topic.pro}%` }} />
              <div className="bg-rose-500 h-full" style={{ width: `${topic.contra}%` }} />
            </div>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
            <span className="text-teal-600">{topic.pro}% Pro</span>
            <span className="text-rose-600">{topic.contra}% Kontra</span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Users size={14} /> {topic.participants} Mahasiswa
            </div>
            <button className="px-6 py-2 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-600 transition-colors">
              Masuk Arena
            </button>
          </div>
        </div>
      ))}

      <button className="border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-8 hover:border-teal-500 hover:bg-teal-50 transition-all group min-h-[300px]">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
          <Mic2 size={24} className="text-slate-400 group-hover:text-teal-700" />
        </div>
        <span className="font-black text-slate-400 text-sm uppercase tracking-widest group-hover:text-teal-700">Ajukan Topik Debat Baru</span>
      </button>
    </div>
  );
};

const PeerReviewView: React.FC = () => {
  const reviews = [
    { title: "Analisis Dampak UU PDP terhadap Startup Fintech", author: "Rina S.", deadline: "2 Jam Lagi", reward: "50 XP", tags: ["Hukum", "Bisnis"] },
    { title: "Implementasi Algoritma A* pada Game Labirin", author: "Dimas A.", deadline: "Hari Ini", reward: "30 XP", tags: ["Teknik", "CS"] },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-teal-900 text-white p-10 rounded-[3rem] text-center mb-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-2">Bantu Teman, Dapat Insight</h3>
          <p className="text-teal-200 max-w-lg mx-auto mb-8">
            Review draf temanmu secara anonim (blind review) untuk melatih ketajaman analisis dan mendapatkan poin karma akademik.
          </p>
          <button className="bg-white text-teal-900 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-100 transition-colors shadow-xl">
            Upload Draf Saya
          </button>
        </div>
      </div>

      <h4 className="font-black text-slate-900 mb-6 flex items-center gap-2">
        <FileText size={20} className="text-teal-500" />
        Butuh Review Segera
      </h4>

      <div className="space-y-4">
        {reviews.map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded">{tag}</span>
                ))}
                <span className="px-2 py-0.5 bg-rose-100 text-rose-600 text-[9px] font-black uppercase tracking-widest rounded flex items-center gap-1">⏰ {item.deadline}</span>
              </div>
              <h5 className="font-bold text-slate-900 text-lg group-hover:text-teal-600 transition-colors">{item.title}</h5>
              <p className="text-sm text-slate-400 font-medium">Oleh: {item.author}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <span className="block text-2xl font-black text-teal-500">{item.reward}</span>
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Reward</span>
              </div>
              <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-teal-600 transition-colors">
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShowcaseView: React.FC = () => {
  const projects = [
    { title: "Deteksi Dini Stunting dengan Computer Vision", author: "Tim UGM", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000", likes: 240, views: 1200 },
    { title: "Aplikasi Manajemen Sampah Berbasis Gamifikasi", author: "Tim ITS", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1000", likes: 185, views: 980 },
    { title: "Arsitektur Vernakular di Metaverse", author: "Tim UI", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000", likes: 310, views: 1540 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {projects.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
        >
          <div className="h-48 overflow-hidden relative">
            <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-2 py-1 rounded mb-2 inline-block">Final Project</span>
            </div>
          </div>
          <div className="p-6">
            <h4 className="font-bold text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-teal-600 transition-colors">{p.title}</h4>
            <p className="text-xs text-slate-500 font-medium mb-4">{p.author}</p>

            <div className="flex justify-between items-center pt-4 border-t border-slate-50">
              <div className="flex gap-4 text-slate-400 text-xs font-bold">
                <span className="flex items-center gap-1 hover:text-rose-500 transition-colors"><ThumbsUp size={14} /> {p.likes}</span>
                <span className="flex items-center gap-1 hover:text-blue-500 transition-colors"><Eye size={14} /> {p.views}</span>
              </div>
              <Share2 size={16} className="text-slate-300 hover:text-slate-600 transition-colors" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

