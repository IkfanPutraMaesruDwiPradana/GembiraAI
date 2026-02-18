
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, PieChart, Target, Compass, ArrowRight, Heart, Briefcase, Globe, Zap } from 'lucide-react';
import { interviewChat } from '../services/geminiService';

export const SelfReflection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'interview' | 'ikigai' | 'career'>('interview');

  // Shared State
  const [ikigaiData, setIkigaiData] = useState({
    passion: ['Coding', 'Music'],
    mission: ['Digital Literacy', 'Education'],
    vocation: ['Software Engineer', 'Teacher'],
    profession: ['Tech Lead', 'EdTech Founder']
  });

  return (
    <div className="space-y-8 pb-20 font-[Inter]">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-rose-100 text-rose-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-rose-200">
              Ikigai Engine
            </span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
            Eksplorasi <span className="text-rose-500">Diri</span>
          </h2>
          <p className="text-slate-500 font-medium mt-3 max-w-xl">
            Temukan titik temu antara apa yang kamu cintai, apa yang kamu kuasai, dan apa yang dunia butuhkan.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {[
            { id: 'interview', label: 'Talent Interview', icon: <MessageSquare size={16} /> },
            { id: 'ikigai', label: 'Ikigai Map', icon: <PieChart size={16} /> },
            { id: 'career', label: 'SDG Matchmaker', icon: <Target size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === tab.id
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
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
          {activeTab === 'interview' && <InterviewView />}
          {activeTab === 'ikigai' && <IkigaiMapView data={ikigaiData} />}
          {activeTab === 'career' && <CareerMatchmakerView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Sub-Components ---

const InterviewView: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', content: string }[]>([
    { role: 'ai', content: "Halo! Saya di sini bukan untuk memberitahu siapa kamu, tapi untuk membantumu menemukannya sendiri. Coba ceritakan, kegiatan apa yang membuatmu lupa waktu belakangan ini?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input } as const];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Mock AI response for now, can be replaced with actual API
      const response = await interviewChat(messages, input);
      setMessages(prev => [...prev, {
        role: 'ai',
        content: response || "Maaf, saya sedang berpikir keras. Bisa ulangi?"
      }]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
      <div className="lg:col-span-2 glass-card bg-white rounded-[2.5rem] flex flex-col overflow-hidden border border-slate-100 shadow-sm">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-xl">🧘</div>
            <div>
              <h4 className="font-black text-slate-800 text-sm">Socratic Guide</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Deep Discovery Mode</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30 custom-scrollbar">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-6 rounded-2xl text-sm font-medium leading-relaxed ${m.role === 'user'
                ? 'bg-rose-500 text-white rounded-br-none shadow-lg shadow-rose-200'
                : 'bg-white text-slate-600 border border-slate-100 rounded-bl-none shadow-sm'
                }`}>
                {m.content}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm flex gap-2">
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:-.2s]" />
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:-.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-white border-t border-slate-100">
          <div className="flex gap-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ceritakan pemikiranmu..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-rose-400 focus:bg-white transition-all"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-slate-900 text-white px-6 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              Jawab
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card bg-rose-50 p-8 rounded-[2.5rem] flex flex-col justify-center border border-rose-100">
        <div className="text-center mb-8">
          <Compass size={48} className="text-rose-400 mx-auto mb-4" />
          <h3 className="font-black text-slate-900 text-lg">Insight Sementara</h3>
          <p className="text-slate-500 text-sm mt-2">AI sedang memetakan pola jawabanmu...</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-rose-100/50">
            <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Top Interest</div>
            <div className="font-bold text-slate-700">Creative Problem Solving</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-rose-100/50">
            <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Potential Value</div>
            <div className="font-bold text-slate-700">Social Impact</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IkigaiMapView: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Visual Map Area - Simplified for UI */}
      <div className="col-span-1 lg:col-span-2 glass-card bg-white p-10 rounded-[2.5rem] border border-slate-100 relative overflow-hidden flex items-center justify-center min-h-[500px]">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-200 via-white to-white" />

        {/* Conceptual Circles Representation */}
        <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-rose-500/20 flex items-center justify-center text-center p-4 border border-rose-200 backdrop-blur-sm -translate-y-12">
            <div>
              <span className="font-black text-rose-600 text-[10px] uppercase tracking-widest block mb-1">Hobi</span>
              <p className="text-xs font-bold text-rose-900">{data.passion.join(', ')}</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-blue-500/20 flex items-center justify-center text-center p-4 border border-blue-200 backdrop-blur-sm translate-y-12">
            <div>
              <span className="font-black text-blue-600 text-[10px] uppercase tracking-widest block mb-1">Profesi</span>
              <p className="text-xs font-bold text-blue-900">{data.profession.join(', ')}</p>
            </div>
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-emerald-500/20 flex items-center justify-center text-center p-4 border border-emerald-200 backdrop-blur-sm -translate-x-12">
            <div>
              <span className="font-black text-emerald-600 text-[10px] uppercase tracking-widest block mb-1">Misi</span>
              <p className="text-xs font-bold text-emerald-900">{data.mission.join(', ')}</p>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-amber-500/20 flex items-center justify-center text-center p-4 border border-amber-200 backdrop-blur-sm translate-x-12">
            <div>
              <span className="font-black text-amber-600 text-[10px] uppercase tracking-widest block mb-1">Bakat</span>
              <p className="text-xs font-bold text-amber-900">{data.vocation.join(', ')}</p>
            </div>
          </div>

          {/* Center IKIGAI */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center shadow-xl z-10 border-4 border-white">
            <span className="text-white font-black text-sm tracking-widest">IKIGAI</span>
          </div>
        </div>
      </div>

      {/* Details Panel */}
      <div className="glass-card bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col gap-4">
        <h3 className="font-black text-slate-900 mb-2">Komponen Ikigai</h3>
        {[
          { label: 'Apa yang kamu sukai', icon: <Heart size={14} />, items: data.passion, color: 'text-rose-500', bg: 'bg-rose-100' },
          { label: 'Apa yang kamu kuasai', icon: <Zap size={14} />, items: data.vocation, color: 'text-amber-500', bg: 'bg-amber-100' },
          { label: 'Apa yang dunia butuhkan', icon: <Globe size={14} />, items: data.mission, color: 'text-emerald-500', bg: 'bg-emerald-100' },
          { label: 'Apa yang menghasilkan', icon: <Briefcase size={14} />, items: data.profession, color: 'text-blue-500', bg: 'bg-blue-100' },
        ].map((section, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-6 h-6 rounded-full ${section.bg} ${section.color} flex items-center justify-center`}>{section.icon}</div>
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wide">{section.label}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {section.items.map((item: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
        <button className="mt-auto w-full py-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors">
          Update Mapping
        </button>
      </div>
    </div>
  );
};

const CareerMatchmakerView: React.FC = () => {
  const careers = [
    {
      title: "Renewable Energy Analyst",
      sdg: "SDG 7: Affordable and Clean Energy",
      match: 92,
      desc: "Menggunakan data science untuk mengoptimalkan distribusi energi terbarukan.",
      color: "bg-yellow-500"
    },
    {
      title: "EdTech Curriculum Developer",
      sdg: "SDG 4: Quality Education",
      match: 88,
      desc: "Merancang pengalaman belajar digital yang inklusif menggunakan AI.",
      color: "bg-red-500"
    },
    {
      title: "Sustainable Urban Planner",
      sdg: "SDG 11: Sustainable Cities",
      match: 85,
      desc: "Merancang tata kota ramah lingkungan dengan bantuan simulasi komputer.",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-black text-slate-900 mb-3">SDG Career Matchmaker</h3>
        <p className="text-slate-500 font-medium max-w-lg mx-auto">
          Berdasarkan profil Ikigai kamu, berikut adalah rekomendasi karir masa depan yang berdampak pada tujuan pembangunan berkelanjutan (SDGs).
        </p>
      </div>

      <div className="grid gap-6">
        {careers.map((career, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -z-0 group-hover:bg-slate-100 transition-colors" />

            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-xl shadow-slate-200">
                {career.match}%
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${career.color}`}>
                    {career.sdg.split(':')[0]}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">High Impact Role</span>
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-1 group-hover:text-rose-600 transition-colors">{career.title}</h4>
                <p className="text-slate-500 text-sm font-medium">{career.desc}</p>
              </div>
              <div className="hidden md:block">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-300 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-all">
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
