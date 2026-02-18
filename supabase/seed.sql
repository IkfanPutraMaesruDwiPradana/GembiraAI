-- GEMBIRA AI Seed Data
-- Sample data for development and testing

-- =====================================================
-- LITERACY TOPICS
-- =====================================================

INSERT INTO literacy_topics (title, description, icon, xp_reward, content, order_index) VALUES
('Apa itu AI?', 'Memahami dasar-dasar kecerdasan buatan dan bagaimana AI bekerja', '🤖', 10, 
'Kecerdasan Buatan (AI) adalah simulasi proses kecerdasan manusia oleh mesin, terutama sistem komputer. Proses ini mencakup pembelajaran, penalaran, dan koreksi diri.', 1),

('Machine Learning Basics', 'Pengenalan konsep machine learning dan aplikasinya', '🧠', 15,
'Machine Learning adalah subset dari AI yang memungkinkan sistem untuk belajar dan meningkatkan dari pengalaman tanpa diprogram secara eksplisit.', 2),

('Etika AI', 'Memahami implikasi etis penggunaan AI dalam kehidupan sehari-hari', '⚖️', 20,
'Etika AI membahas pertanyaan moral tentang pengembangan dan penggunaan kecerdasan buatan, termasuk bias, privasi, dan tanggung jawab.', 3),

('Natural Language Processing', 'Bagaimana AI memahami dan memproses bahasa manusia', '💬', 15,
'NLP adalah cabang AI yang membantu komputer memahami, menginterpretasi, dan memanipulasi bahasa manusia.', 4),

('Computer Vision', 'Memahami bagaimana AI "melihat" dan menginterpretasi gambar', '👁️', 15,
'Computer Vision memungkinkan komputer untuk mendapatkan pemahaman tingkat tinggi dari gambar atau video digital.', 5),

('AI dalam Pendidikan', 'Eksplorasi penggunaan AI untuk meningkatkan pembelajaran', '📚', 20,
'AI dapat mempersonalisasi pembelajaran, memberikan feedback instan, dan membantu pendidik mengidentifikasi area yang perlu ditingkatkan.', 6),

('Bias dalam AI', 'Memahami dan mengatasi bias dalam sistem AI', '🎯', 25,
'Bias AI terjadi ketika algoritma menghasilkan hasil yang sistematis prejudis karena asumsi yang salah dalam proses machine learning.', 7),

('AI dan Privasi', 'Memahami implikasi AI terhadap privasi data pribadi', '🔒', 20,
'Penggunaan AI menimbulkan pertanyaan penting tentang bagaimana data pribadi dikumpulkan, digunakan, dan dilindungi.', 8),

('Future of AI', 'Menjelajahi tren dan prediksi masa depan AI', '🚀', 25,
'Memahami kemana arah perkembangan AI dan bagaimana hal itu akan mempengaruhi masyarakat, pekerjaan, dan kehidupan kita.', 9),

('AI Tools untuk Mahasiswa', 'Mengenal berbagai tools AI yang berguna untuk studi', '🛠️', 15,
'Eksplorasi berbagai tools AI seperti ChatGPT, Gemini, dan lainnya yang dapat membantu produktivitas akademik.', 10);

-- =====================================================
-- BADGES
-- =====================================================

INSERT INTO badges (name, description, icon, requirement_type, requirement_value) VALUES
('Newbie', 'Selamat datang di GEMBIRA AI!', '🌱', 'xp', 0),
('Explorer', 'Mencapai 50 XP', '🧭', 'xp', 50),
('Scholar', 'Mencapai 100 XP', '📖', 'xp', 100),
('Expert', 'Mencapai 250 XP', '🎓', 'xp', 250),
('Master', 'Mencapai 500 XP', '👑', 'xp', 500),
('AI Enthusiast', 'Menyelesaikan 5 topik literasi', '🤖', 'literacy', 5),
('Deep Thinker', 'Membuat 10 refleksi', '🧘', 'reflections', 10),
('Community Builder', 'Membuat 5 post di komunitas', '🤝', 'community', 5),
('Project Pioneer', 'Menyelesaikan 3 proyek', '🚀', 'projects', 3),
('Ethical AI Advocate', 'Menyelesaikan semua topik etika AI', '⚖️', 'literacy', 3);

-- =====================================================
-- SAMPLE COMMUNITY POSTS (Optional - for demo)
-- =====================================================

-- Note: These will need actual user_ids after users are created
-- This is just a template for reference

-- INSERT INTO community_posts (user_id, title, content, category) VALUES
-- ('user-uuid-here', 'Bagaimana AI akan mengubah dunia kerja?', 'Saya penasaran bagaimana AI akan mempengaruhi pekerjaan di masa depan. Apa pendapat kalian?', 'discussion'),
-- ('user-uuid-here', 'Tips menggunakan ChatGPT untuk belajar', 'Berikut beberapa tips yang saya gunakan untuk memaksimalkan ChatGPT dalam pembelajaran...', 'showcase'),
-- ('user-uuid-here', 'Pertanyaan tentang Machine Learning', 'Saya baru belajar ML dan masih bingung tentang konsep supervised vs unsupervised learning. Ada yang bisa jelaskan?', 'question');

-- =====================================================
-- NOTES
-- =====================================================

-- After running this seed data:
-- 1. Literacy topics will be available for all users
-- 2. Badge system will be ready to auto-award based on user achievements
-- 3. Users can start earning XP and progressing through the platform
-- 4. Community posts can be created by authenticated users
