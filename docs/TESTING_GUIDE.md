# Testing Supabase Integration

## ✅ Langkah yang Sudah Dilakukan

1. **Environment Variables** - Sudah dikonfigurasi di `.env.local`
2. **Login Component** - Sudah terintegrasi dengan `authService.loginUser()`
3. **Register Component** - Sudah terintegrasi dengan `authService.registerUser()`
4. **Dev Server** - Sudah dijalankan

## 🧪 Cara Testing

### 1. Pastikan Supabase Sudah Setup
Sebelum testing, pastikan:
- ✅ Supabase project sudah dibuat
- ✅ `schema.sql` sudah dijalankan di SQL Editor
- ✅ `seed.sql` sudah dijalankan di SQL Editor
- ✅ `.env.local` sudah berisi URL dan ANON_KEY yang benar

### 2. Test Registration
1. Buka `http://localhost:5173`
2. Klik "Register Device"
3. Isi form:
   - Full Name: `Test User`
   - Email: `test@university.ac.id`
   - Password: `password123` (min 6 karakter)
   - University: `Universitas Test`
   - Major: `Teknik Informatika`
4. Klik "Initiate Core"
5. **Expected**: Redirect ke Dashboard dengan user baru

**Verifikasi di Supabase:**
- Buka Supabase Dashboard → Authentication → Users
- User baru seharusnya muncul
- Buka Table Editor → users
- Profile user seharusnya ada dengan XP=0, Level=1
- Buka Table Editor → user_badges
- Badge "Newbie" seharusnya sudah diberikan

### 3. Test Login
1. Logout (jika sudah login)
2. Klik "Access Portal"
3. Masukkan email dan password yang sama
4. Klik "Connect Identity"
5. **Expected**: Login berhasil, redirect ke Dashboard

### 4. Check Console
Buka browser DevTools (F12) → Console
- Tidak boleh ada error merah
- Jika ada error "Missing Supabase environment variables" → cek `.env.local`
- Jika ada error "Failed to fetch" → cek koneksi internet dan Supabase project

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"
**Solusi:**
1. Pastikan `.env.local` ada dan berisi:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...
   ```
2. Restart dev server: `Ctrl+C` lalu `npm run dev`

### Error: "User already registered"
**Solusi:**
- Email sudah terdaftar
- Gunakan email lain atau login dengan email tersebut

### Error: "Invalid login credentials"
**Solusi:**
- Email atau password salah
- Cek di Supabase Dashboard → Authentication → Users untuk email yang benar

### Error: "Failed to create user account"
**Solusi:**
1. Cek Supabase Dashboard → Logs untuk detail error
2. Pastikan `schema.sql` sudah dijalankan dengan benar
3. Cek RLS policies sudah enabled

### Login berhasil tapi data tidak muncul
**Solusi:**
- Cek browser console untuk error
- Verifikasi di Supabase Table Editor bahwa data user ada
- Pastikan `seed.sql` sudah dijalankan untuk literacy topics

## 📊 Next Steps

Setelah authentication berhasil:
1. **Integrate Literacy Hub** - Connect dengan `literacyService`
2. **Integrate Self Reflection** - Connect dengan `reflectionService`
3. **Integrate Projects** - Connect dengan `projectService`
4. **Integrate Community** - Connect dengan `communityService`
5. **Add XP System** - Update XP saat complete topic

## 🔍 Quick Debug Checklist

- [ ] Supabase project created?
- [ ] schema.sql executed?
- [ ] seed.sql executed?
- [ ] .env.local has correct values?
- [ ] Dev server restarted after .env changes?
- [ ] Browser console shows no errors?
- [ ] Network tab shows requests to Supabase?
