<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# GEMBIRA AI - Gerakan Mahasiswa Bicara AI

Platform edukasi AI literacy untuk mahasiswa Indonesia dengan backend Supabase.

## 🚀 Features

- ✅ **Authentication System** - Register, login, session management
- ✅ **User Profiles** - XP, levels, badges, progress tracking
- ✅ **Literacy Hub** - 10 AI learning topics with XP rewards
- ✅ **Self Reflection** - Journal entries with AI analysis
- ✅ **Project Builder** - Create and submit projects
- ✅ **Community** - Posts, comments, likes
- ✅ **Gamification** - 10 achievement badges
- ✅ **Gemini AI Integration** - Socratic tutoring

## 📋 Prerequisites

- Node.js (v16+)
- Supabase account (free at [supabase.com](https://supabase.com))

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase Backend

**Option A: Quick Setup (5 minutes)**
Follow [QUICK_START.md](QUICK_START.md)

**Option B: Detailed Setup**
Follow [docs/BACKEND_SETUP.md](docs/BACKEND_SETUP.md)

**Steps:**
1. Create Supabase project at https://app.supabase.com
2. Run `supabase/schema.sql` in SQL Editor
3. Run `supabase/seed.sql` in SQL Editor
4. Copy Project URL and anon key from Settings → API

### 3. Configure Environment

Update `.env.local`:
```env
GEMINI_API_KEY=your_gemini_api_key
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173`

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - 5-minute setup guide
- **[docs/BACKEND_SETUP.md](docs/BACKEND_SETUP.md)** - Complete backend setup
- **[docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)** - API reference

## 🗄️ Database

**10 Tables:**
- users, reflection_entries, literacy_topics, literacy_progress
- projects, community_posts, community_comments, post_likes
- badges, user_badges

**Features:**
- Row Level Security (RLS)
- Auto-triggers for XP, badges, counters
- Real-time capabilities

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: Google Gemini API
- **Styling**: Vanilla CSS
- **Charts**: Recharts
- **Animation**: Framer Motion

## 📦 Project Structure

```
├── supabase/          # Database schema & seeds
├── services/          # Backend API services
├── components/        # React components
├── docs/             # Documentation
├── types.ts          # TypeScript types
└── App.tsx           # Main app
```

## 🎮 Usage

1. **Register** - Create account with university info
2. **Complete Topics** - Learn AI concepts, earn XP
3. **Reflect** - Daily self-reflection with AI analysis
4. **Build Projects** - Create AI-related projects
5. **Join Community** - Share ideas, discuss AI
6. **Earn Badges** - Unlock achievements

## 🏆 Badges

- Newbie, Explorer, Scholar, Expert, Master (XP-based)
- AI Enthusiast, Deep Thinker, Community Builder
- Project Pioneer, Ethical AI Advocate

## 🔐 Security

- Supabase Authentication
- Row Level Security policies
- Secure API keys via environment variables

## 📄 License

Educational project for Indonesian university students.

---

**View your app in AI Studio:** https://ai.studio/apps/temp/1
