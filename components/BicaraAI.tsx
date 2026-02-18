
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Terminal, ShieldAlert, Play, CheckCircle, AlertTriangle } from 'lucide-react';

export const BicaraAI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'materials' | 'sandbox' | 'simulator'>('materials');

  return (
    <div className="space-y-8 pb-20 font-[Inter]">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-200">
              Literacy Lab
            </span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
            Bicara <span className="text-indigo-600">AI</span>
          </h2>
          <p className="text-slate-500 font-medium mt-3 max-w-xl">
            Tingkatkan kompetensi teknis dan etika Anda. Pahami cara kerja mesin sebelum menggunakannya.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {[
            { id: 'materials', label: 'Materi Fundamental', icon: <BookOpen size={16} /> },
            { id: 'sandbox', label: 'Prompt Sandbox', icon: <Terminal size={16} /> },
            { id: 'simulator', label: 'Simulator Etika', icon: <ShieldAlert size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
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
          {activeTab === 'materials' && <MaterialsView />}
          {activeTab === 'sandbox' && <PromptSandboxView />}
          {activeTab === 'simulator' && <EthicsSimulatorView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Sub-Components ---

const MaterialsView: React.FC = () => {
  const modules = [
    { title: 'Cara Kerja LLM', duration: '5 min', status: 'completed', type: 'video' },
    { title: 'Bias & Halusinasi', duration: '8 min', status: 'completed', type: 'video' },
    { title: 'Etika Akademik AI', duration: '12 min', status: 'current', type: 'video' },
    { title: 'Data Privacy', duration: '10 min', status: 'locked', type: 'article' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Featured Video */}
      <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] overflow-hidden relative group cursor-pointer">
        <img
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
          alt="AI Background"
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        <div className="absolute bottom-0 left-0 p-10 w-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full">Sedang Dipelajari</span>
            <span className="text-slate-300 text-xs font-bold flex items-center gap-1"><Play size={12} fill="currentColor" /> 12 Menit</span>
          </div>
          <h3 className="text-3xl font-black text-white mb-2">Etika Akademik dalam Era AI</h3>
          <p className="text-slate-300 line-clamp-2 max-w-lg mb-6">Pelajari batasan penggunaan AI dalam penulisan akademis, cara mengutip yang benar, dan menghindari plagiarisme tak disengaja.</p>

          <button className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-colors flex items-center gap-3">
            <Play size={16} fill="currentColor" /> Lanjutkan Menonton
          </button>
        </div>

        <div className="absolute center inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
            <Play size={32} fill="white" className="text-white ml-2" />
          </div>
        </div>
      </div>

      {/* Module List */}
      <div className="glass-card bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col h-full">
        <h3 className="font-black text-slate-900 text-lg mb-6">Kurikulum Foundation</h3>
        <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
          {modules.map((mod, i) => (
            <div key={i} className={`p-4 rounded-2xl flex items-center gap-4 transition-all ${mod.status === 'current' ? 'bg-indigo-50 border border-indigo-100' : 'bg-slate-50 border border-slate-100 opacity-80'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${mod.status === 'completed' ? 'bg-emerald-500 text-white' :
                  mod.status === 'current' ? 'bg-indigo-500 text-white' :
                    'bg-slate-200 text-slate-400'
                }`}>
                {mod.status === 'completed' ? <CheckCircle size={18} /> :
                  mod.status === 'current' ? <Play size={18} fill="currentColor" /> :
                    <span className="font-bold text-xs">{i + 1}</span>}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-sm">{mod.title}</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{mod.active ? 'Now Playing' : mod.type + ' • ' + mod.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PromptSandboxView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const analyzePrompt = () => {
    // Mock logic for demonstration
    if (prompt.length < 20) {
      setFeedback("⚠️ Prompt terlalu pendek. Berikan konteks, peran, dan format output yang jelas.");
    } else if (prompt.toLowerCase().includes("buatkan esai")) {
      setFeedback("❌ Peringatan Etika: Jangan minta AI membuatkan esai utuh. Ubah menjadi: 'Berikan kerangka/outline untuk esai tentang...' atau 'Kritik argumen saya berikut...'");
    } else {
      setFeedback("✅ Prompt yang bagus! Anda memposisikan AI sebagai mitra diskusi, bukan joki tugas.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
      <div className="glass-card bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col">
        <h3 className="font-black text-slate-900 mb-2">Prompt Input</h3>
        <p className="text-xs text-slate-400 font-bold mb-6">Latih cara memberi instruksi agar AI menjadi "Partner Diskusi".</p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ketik prompt Anda di sini...&#10;Contoh: 'Bertindaklah sebagai kritikus sastra, analisis argumen dalam paragraf berikut...'"
          className="flex-1 w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none resize-none font-medium text-slate-700 text-sm leading-relaxed"
        />

        <div className="mt-6 flex justify-between items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{prompt.length} Karakter</span>
          <button
            onClick={analyzePrompt}
            className="px-6 py-3 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-200"
          >
            Analisis Prompt
          </button>
        </div>
      </div>

      <div className="glass-card bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32" />

        {feedback ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center relative z-10"
          >
            <div className="text-4xl mb-4">{feedback.startsWith('✅') ? '🌟' : feedback.startsWith('❌') ? '🛡️' : '⚠️'}</div>
            <h3 className="text-2xl font-black mb-4">Analisis Sistem</h3>
            <p className="font-medium text-lg leading-relaxed text-slate-200">{feedback}</p>
          </motion.div>
        ) : (
          <div className="text-center opacity-30">
            <Terminal size={64} className="mx-auto mb-6" />
            <p className="font-black text-lg">Menunggu Input...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const EthicsSimulatorView: React.FC = () => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const scenarios = [
    {
      title: "Kasus: Referensi Buntu",
      desc: "Anda sedang mengerjakan skripsi. Anda menemukan kutipan sempurna yang dihasilkan ChatGPT, tetapi saat dicari di Google Scholar, jurnal tersebut tidak ada (halusinasi AI). Deadline tinggal 2 jam.",
      options: [
        { label: "Pakai saja, dosen mungkin tidak cek detail.", risk: "high", feedback: "❌ Pelanggaran Berat. Memalsukan data/referensi adalah fabrikasi akademik." },
        { label: "Pakai kutipan itu tapi tulis 'sumber: ChatGPT'.", risk: "medium", feedback: "⚠️ Kurang Tepat. ChatGPT bukan sumber primer yang kredibel untuk karya ilmiah." },
        { label: "Hapus kutipan tersebut dan cari referensi lain yang asli.", risk: "low", feedback: "✅ Tepat Sekali. Lebih baik argumen kurang sempurna daripada data palsu." }
      ]
    }
  ];

  const handleChoice = (opt: any) => {
    setResult(opt.feedback);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass-card bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-200">Skenario {step + 1}</span>
          <span className="text-slate-300 text-xs font-bold">Level: Intermediate</span>
        </div>

        <h3 className="text-3xl font-black text-slate-900 mb-4">{scenarios[step].title}</h3>
        <p className="text-slate-600 text-lg leading-relaxed mb-10">{scenarios[step].desc}</p>

        {!result ? (
          <div className="space-y-4">
            {scenarios[step].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleChoice(opt)}
                className="w-full text-left p-6 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-black text-slate-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="font-bold text-slate-700 group-hover:text-indigo-900">{opt.label}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 rounded-3xl ${result.includes('✅') ? 'bg-emerald-50 border border-emerald-100 text-emerald-800' : 'bg-rose-50 border border-rose-100 text-rose-800'}`}
          >
            <h4 className="font-black text-xl mb-2">{result.split('.')[0]}</h4>
            <p className="font-medium">{result.split('.').slice(1).join('.')}</p>
            <button
              onClick={() => setResult(null)}
              className="mt-6 px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50"
            >
              Ulangi Kasus
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

