# Backend Setup Guide - GEMBIRA AI

Panduan lengkap untuk mengatur backend Supabase untuk aplikasi GEMBIRA AI.

## Prerequisites

- Node.js (v16 atau lebih baru)
- Akun Supabase (gratis di [supabase.com](https://supabase.com))
- Git

## Langkah 1: Membuat Proyek Supabase

1. Buka [https://app.supabase.com](https://app.supabase.com)
2. Klik **"New Project"**
3. Isi detail proyek:
   - **Name**: GEMBIRA-AI (atau nama pilihan Anda)
   - **Database Password**: Buat password yang kuat (simpan dengan aman!)
   - **Region**: Pilih region terdekat (contoh: Southeast Asia - Singapore)
4. Klik **"Create new project"**
5. Tunggu beberapa menit hingga proyek selesai dibuat

## Langkah 2: Menjalankan Database Schema

1. Di dashboard Supabase, buka **SQL Editor** (ikon di sidebar kiri)
2. Klik **"New query"**
3. Copy seluruh isi file `supabase/schema.sql` dari proyek ini
4. Paste ke SQL Editor
5. Klik **"Run"** atau tekan `Ctrl+Enter`
6. Pastikan tidak ada error - Anda akan melihat pesan "Success. No rows returned"

## Langkah 3: Menambahkan Seed Data

1. Masih di SQL Editor, buat query baru
2. Copy seluruh isi file `supabase/seed.sql`
3. Paste ke SQL Editor
4. Klik **"Run"**
5. Verifikasi data berhasil ditambahkan:
   - Buka **Table Editor** di sidebar
   - Cek tabel `literacy_topics` - seharusnya ada 10 topik
   - Cek tabel `badges` - seharusnya ada 10 badges

## Langkah 4: Mendapatkan API Keys

1. Di dashboard Supabase, buka **Settings** (ikon gear di sidebar)
2. Pilih **API** dari menu
3. Anda akan melihat:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: String panjang yang dimulai dengan `eyJ...`
4. Copy kedua nilai ini

## Langkah 5: Konfigurasi Environment Variables

1. Buka file `.env.local` di root proyek
2. Update dengan nilai dari Supabase:

```env
GEMINI_API_KEY=AIzaSyC-WQmY-rQAY1n1YusMf3NpEAVk4YetIDs

# Supabase Configuration
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **PENTING**: Jangan commit file `.env.local` ke Git!

## Langkah 6: Install Dependencies

```bash
npm install
```

Package `@supabase/supabase-js` sudah ditambahkan ke dependencies.

## Langkah 7: Menjalankan Aplikasi

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## Verifikasi Setup

### Test 1: Registrasi User Baru
1. Buka aplikasi di browser
2. Klik "Register" atau "Daftar"
3. Isi form registrasi dengan data test
4. Submit form
5. Cek di Supabase Dashboard → Authentication → Users
6. User baru seharusnya muncul di list

### Test 2: Login
1. Gunakan email dan password yang baru didaftarkan
2. Login seharusnya berhasil dan redirect ke Dashboard
3. Cek di Supabase Dashboard → Table Editor → users
4. Profile user seharusnya ada dengan XP = 0, Level = 1

### Test 3: Literacy Progress
1. Di aplikasi, buka "Literacy Hub"
2. Pilih salah satu topik
3. Complete topik tersebut
4. Cek XP bertambah
5. Verifikasi di Supabase → literacy_progress table

### Test 4: Reflection Entry
1. Buka "Self Reflection"
2. Isi form refleksi
3. Submit
4. Cek di Supabase → reflection_entries table
5. Entry baru seharusnya muncul

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Pastikan `.env.local` ada dan berisi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`
- Restart dev server setelah menambahkan env variables

### Error: "Failed to fetch"
- Cek koneksi internet
- Pastikan Supabase project masih aktif
- Verifikasi URL dan API key benar

### Error: "Row Level Security policy violation"
- Pastikan RLS policies sudah dijalankan dari `schema.sql`
- Cek di Supabase → Authentication bahwa user sudah login

### Data tidak muncul
- Cek browser console untuk error messages
- Verifikasi di Supabase Table Editor bahwa data ada
- Pastikan user sudah authenticated

## Struktur Database

### Tables
- **users**: Extended user profiles
- **reflection_entries**: Self-reflection journal
- **literacy_topics**: Available learning topics
- **literacy_progress**: User progress tracking
- **projects**: Student projects
- **community_posts**: Forum posts
- **community_comments**: Post comments
- **post_likes**: Post likes
- **badges**: Achievement definitions
- **user_badges**: User achievements

### Security
- Row Level Security (RLS) enabled pada semua tabel
- Users hanya bisa akses data mereka sendiri
- Public data (topics, badges) bisa dibaca semua orang

## Next Steps

Setelah setup berhasil:
1. Customize literacy topics sesuai kebutuhan
2. Tambahkan badges baru jika diperlukan
3. Integrate dengan komponen React yang ada
4. Test semua fitur end-to-end

## Support

Jika ada masalah:
1. Cek Supabase logs di Dashboard → Logs
2. Cek browser console untuk error messages
3. Review dokumentasi Supabase: [https://supabase.com/docs](https://supabase.com/docs)
