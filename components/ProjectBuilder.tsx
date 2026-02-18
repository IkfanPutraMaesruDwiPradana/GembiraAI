
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Search, History, AlertTriangle, CheckCircle, FileText, ChevronRight } from 'lucide-react';
import { sparArgument, checkCitations as checkCitationsService } from '../services/geminiService';

export const ProjectBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sparring' | 'citation' | 'evolution'>('sparring');
  const [content, setContent] = useState('');

  return (
    <div className="space-y-8 pb-20 font-[Inter]">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-200">
              Integrity Studio
            </span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
            Lab <span className="text-amber-500">Karya</span>
          </h2>
          <p className="text-slate-500 font-medium mt-3 max-w-xl">
            Uji orisinalitas pemikiran, validasi referensi, dan rekam jejak evolusi karyamu.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {[
            { id: 'sparring', label: 'Sparring Partner', icon: <Swords size={16} /> },
            { id: 'citation', label: 'Citation Checker', icon: <Search size={16} /> },
            { id: 'evolution', label: 'Draft Evolution', icon: <History size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === tab.id
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-200'
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
          {activeTab === 'sparring' && <SparringPartnerView content={content} setContent={setContent} />}
          {activeTab === 'citation' && <CitationCheckerView content={content} />}
          {activeTab === 'evolution' && <DraftEvolutionView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Sub-Components ---

const SparringPartnerView: React.FC<{ content: string, setContent: (s: string) => void }> = ({ content, setContent }) => {
  const [critique, setCritique] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChallenge = async () => {
    if (!content.trim()) return;
    setIsLoading(true);
    try {
      const response = await sparArgument(content);
      setCritique(response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
      {/* Editor Area */}
      <div className="glass-card bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-slate-900">Workspace</h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{content.split(/\s+/).filter(Boolean).length} Kata</span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tempelkan argumen atau draf tulisanmu di sini untuk diuji..."
          className="flex-1 w-full bg-slate-50 rounded-2xl p-6 border-slate-100 focus:border-amber-400 focus:bg-white focus:outline-none resize-none text-slate-700 leading-relaxed font-medium transition-all"
        />
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleChallenge}
            disabled={isLoading || !content.trim()}
            className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? 'Menganalisis...' : '⚔️ Tantang Argumen Ini'}
          </button>
        </div>
      </div>

      {/* Critique Area */}
      <div className="glass-card bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          <h3 className="font-black text-amber-900 mb-6 flex items-center gap-2">
            <Swords size={20} className="text-amber-600" />
            Sparring Feedback
          </h3>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            {critique ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100/50"
              >
                <p className="text-slate-700 leading-loose whitespace-pre-wrap font-medium">{critique}</p>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <div className="w-24 h-24 bg-amber-200 rounded-full flex items-center justify-center mb-6">
                  <Swords size={40} className="text-amber-600" />
                </div>
                <p className="font-bold text-amber-900 max-w-xs">
                  "Besi menajamkan besi, orang menajamkan sesamanya." — Masukkan drafmu untuk mulai sparring logis.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CitationCheckerView: React.FC<{ content: string }> = ({ content }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const checkCitations = async () => {
    setIsChecking(true);
    // Mock simulation
    try {
      const data = await checkCitationsService(content);
      if (data) {
        setResults(data);
      } else {
        setResults([
          { text: "System Warning", status: 'suspicious', note: "Gagal menghubungkan ke database jurnal." },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 text-center">
        <Search size={48} className="text-amber-500 mx-auto mb-4" />
        <h3 className="text-2xl font-black text-slate-900 mb-2">Anti-Halusinasi Detektor</h3>
        <p className="text-slate-500 max-w-lg mx-auto mb-6">
          Sistem akan memindai teks Anda untuk mencari kutipan referensi dan memverifikasinya dengan database jurnal kredibel (Mock Mode).
        </p>
        <button
          onClick={checkCitations}
          disabled={isChecking}
          className="px-10 py-4 bg-amber-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-amber-200 hover:bg-amber-400 transition-all disabled:opacity-70"
        >
          {isChecking ? 'Memindai Database...' : 'Scan Referensi'}
        </button>
      </div>

      {results && (
        <div className="space-y-4">
          {results.map((res, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-3xl border-l-8 flex items-start gap-4 shadow-sm bg-white ${res.status === 'verified' ? 'border-l-emerald-500' :
                res.status === 'hallucinated' ? 'border-l-rose-500' : 'border-l-amber-500'
                }`}
            >
              <div className={`mt-1 bg-slate-100 p-2 rounded-full ${res.status === 'verified' ? 'text-emerald-600' :
                res.status === 'hallucinated' ? 'text-rose-600' : 'text-amber-600'
                }`}>
                {res.status === 'verified' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">"{res.text.substring(0, 60)}..."</h4>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{res.status}</p>
                <p className={`text-sm font-semibold ${res.status === 'verified' ? 'text-emerald-600' :
                  res.status === 'hallucinated' ? 'text-rose-600' : 'text-amber-600'
                  }`}>
                  {res.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const DraftEvolutionView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Visual Timeline */}
      <div className="lg:col-span-2 bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
        <h3 className="font-black text-slate-900 mb-8 flex items-center gap-3">
          <History size={20} className="text-slate-400" />
          Riwayat Evolusi Dokumen
        </h3>

        <div className="space-y-0 relative border-l-2 border-slate-200 ml-4 pl-8 pb-10">
          {[
            { ver: "V1.0", time: "2 Jam lalu", type: "Draft Awal", author: "Human", desc: "Kerangka dasar dan argumen utama.", count: 450 },
            { ver: "V1.1", time: "1.5 Jam lalu", type: "AI Critique", author: "AI Assistant", desc: "Saran perbaikan logika pada paragraf 2.", count: 450 },
            { ver: "V1.2", time: "1 Jam lalu", type: "Revisi Mayor", author: "Human", desc: "Penulisan ulang berdasarkan kritik. Penambahan data.", count: 620 },
            { ver: "V1.3", time: "Baru saja", type: "Polishing", author: "Human", desc: "Perbaikan typo dan struktur kalimat.", count: 615 },
          ].map((v, i) => (
            <div key={i} className="mb-10 relative">
              <div className={`absolute -left-[41px] top-0 w-6 h-6 rounded-full border-4 border-slate-50 flex items-center justify-center ${v.author === 'Human' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${v.author === 'Human' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {v.author} Edit
                  </span>
                  <span className="text-xs font-bold text-slate-300">{v.time}</span>
                </div>
                <h4 className="font-black text-slate-800 text-lg mb-1">{v.type} <span className="text-slate-300 ml-2 font-medium text-sm">{v.ver}</span></h4>
                <p className="text-slate-500 text-sm mb-4">{v.desc}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <FileText size={14} /> {v.count} Kata
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Panel */}
      <div className="glass-card bg-slate-900 text-white p-8 rounded-[2.5rem] flex flex-col justify-between">
        <div>
          <h3 className="font-black text-xl mb-6">Origin Telemetry</h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2 text-slate-400 uppercase tracking-widest">
                <span>Human Typed</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 w-[85%] h-full rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-2 text-slate-400 uppercase tracking-widest">
                <span>AI Generated</span>
                <span>10%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 w-[10%] h-full rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-2 text-slate-400 uppercase tracking-widest">
                <span>Copy/Paste (Ext)</span>
                <span>5%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 w-[5%] h-full rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-900/30 p-6 rounded-2xl border border-emerald-500/20 mt-10">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle size={20} className="text-emerald-400" />
            <h4 className="font-bold text-emerald-400">Authenticity Verified</h4>
          </div>
          <p className="text-xs text-emerald-200/70 leading-relaxed font-medium">
            Pola pengetikan dan riwayat revisi menunjukkan karya ini adalah hasil pemikiran orisinal manusia dengan bantuan AI yang wajar.
          </p>
        </div>
      </div>
    </div>
  );
};
