# GEMBIRA AI - Backend Quick Start

## 🚀 Quick Setup (5 Menit)

### 1. Buat Supabase Project
- Buka https://app.supabase.com
- Klik "New Project"
- Isi nama: `GEMBIRA-AI`
- Pilih region: `Southeast Asia (Singapore)`
- Klik "Create"

### 2. Setup Database
Di Supabase Dashboard:
1. Buka **SQL Editor**
2. Copy-paste isi `supabase/schema.sql` → Run
3. Copy-paste isi `supabase/seed.sql` → Run

### 3. Get API Keys
1. Buka **Settings** → **API**
2. Copy:
   - Project URL
   - anon public key

### 4. Update .env.local
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### 5. Run App
```bash
npm run dev
```

## ✅ Test
1. Register user baru
2. Login
3. Complete 1 literacy topic
4. Check XP bertambah

## 📚 Docs
- Setup lengkap: `docs/BACKEND_SETUP.md`
- API reference: `docs/API_DOCUMENTATION.md`
- Walkthrough: Lihat artifact walkthrough.md
