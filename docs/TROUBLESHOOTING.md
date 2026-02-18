# 🔧 Troubleshooting: Error "Baris baru melanggar kebijakan keamanan tingkat baris untuk tabel pengguna"

## Masalah
Error ini terjadi karena ada konflik antara tabel yang ada di database dengan schema baru.

## Solusi: Reset Database

### Langkah 1: Buka Supabase SQL Editor
1. Buka https://app.supabase.com
2. Pilih project GEMBIRA-AI
3. Klik **SQL Editor** di sidebar kiri

### Langkah 2: Reset Database
1. Buka file `supabase/reset.sql`
2. Copy SEMUA isinya
3. Paste ke SQL Editor
4. Klik **Run** atau tekan `Ctrl+Enter`
5. Tunggu sampai selesai (akan muncul "Success")

### Langkah 3: Buat Tabel Baru
1. Buka file `supabase/schema.sql`
2. Copy SEMUA isinya
3. Paste ke SQL Editor (query baru)
4. Klik **Run**
5. Tunggu sampai selesai

### Langkah 4: Tambah Data Awal
1. Buka file `supabase/seed.sql`
2. Copy SEMUA isinya
3. Paste ke SQL Editor (query baru)
4. Klik **Run**
5. Tunggu sampai selesai

### Langkah 5: Verifikasi
1. Buka **Table Editor** di Supabase
2. Pastikan ada 10 tabel:
   - ✅ users
   - ✅ reflection_entries
   - ✅ literacy_topics
   - ✅ literacy_progress
   - ✅ projects
   - ✅ community_posts
   - ✅ community_comments
   - ✅ post_likes
   - ✅ badges
   - ✅ user_badges

3. Klik tabel `literacy_topics` → seharusnya ada 10 rows
4. Klik tabel `badges` → seharusnya ada 10 rows

### Langkah 6: Test Lagi
1. Refresh browser di `http://localhost:3001`
2. Klik "Register Device"
3. Isi form dengan data baru
4. Klik "Initiate Core"
5. **Seharusnya berhasil!**

## Verifikasi Berhasil

Setelah registrasi berhasil:
1. Buka Supabase → **Authentication** → **Users**
   - User baru seharusnya muncul
2. Buka **Table Editor** → **users**
   - Profile user seharusnya ada
3. Buka **Table Editor** → **user_badges**
   - Badge "Newbie" seharusnya sudah diberikan

## Jika Masih Error

### Error: "relation does not exist"
- Schema.sql belum dijalankan dengan benar
- Ulangi Langkah 3

### Error: "duplicate key value"
- Seed.sql sudah pernah dijalankan
- Ini normal, abaikan saja

### Error: "permission denied"
- RLS policies belum ter-setup
- Pastikan schema.sql dijalankan LENGKAP (semua 417 baris)

### Error koneksi
- Cek `.env.local` sudah benar
- Restart dev server: `Ctrl+C` lalu `npm run dev`

## Quick Check

Jalankan query ini di SQL Editor untuk cek tabel:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Seharusnya muncul 10 tabel dengan nama bahasa Inggris (users, badges, dll).
