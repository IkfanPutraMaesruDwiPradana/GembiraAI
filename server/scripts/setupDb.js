
import { run } from '../config/db.js';
import bcrypt from 'bcryptjs';

async function setupDatabase() {
    console.log('Setting up SQLite database...');

    try {
        // 1. Users Table
        await run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        university TEXT,
        major TEXT,
        avatar_color TEXT DEFAULT '#3B82F6',
        xp INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1,
        literacy_progress INTEGER DEFAULT 0,
        role TEXT DEFAULT 'student',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // 2. Reflection Entries
        await run(`
      CREATE TABLE IF NOT EXISTS reflection_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        answers TEXT NOT NULL, -- Stored as JSON string
        ai_analysis TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

        // 3. Literacy Topics
        await run(`
      CREATE TABLE IF NOT EXISTS literacy_topics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        icon TEXT NOT NULL,
        xp_reward INTEGER DEFAULT 10,
        content TEXT,
        order_index INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1, -- Boolean as 0/1
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // 4. Literacy Progress
        await run(`
      CREATE TABLE IF NOT EXISTS literacy_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        topic_id INTEGER NOT NULL,
        completed INTEGER DEFAULT 0, -- Boolean as 0/1
        completed_at DATETIME,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, topic_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (topic_id) REFERENCES literacy_topics(id) ON DELETE CASCADE
      )
    `);

        // 5. Projects
        await run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        content TEXT,
        status TEXT DEFAULT 'draft',
        ai_feedback TEXT,
        submitted_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

        // 6. Community Posts
        await run(`
      CREATE TABLE IF NOT EXISTS community_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT DEFAULT 'general',
        likes_count INTEGER DEFAULT 0,
        comments_count INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

        // 7. Badges
        await run(`
      CREATE TABLE IF NOT EXISTS badges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT NOT NULL,
        icon TEXT NOT NULL,
        requirement_type TEXT NOT NULL,
        requirement_value INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // 8. User Badges
        await run(`
      CREATE TABLE IF NOT EXISTS user_badges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        badge_id INTEGER NOT NULL,
        earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, badge_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE
      )
    `);

        console.log('Tables created.');

        // Seed Badges
        await run(`
      INSERT OR IGNORE INTO badges (name, description, icon, requirement_type, requirement_value)
      VALUES 
        ('Newbie', 'Baru bergabung di Gembira AI', '🌱', 'system', 0),
        ('Explorer', 'Menyelesaikan 1 topik', '🧭', 'literacy_count', 1),
        ('Scholar', 'Mencapai Level 5', '🎓', 'level', 5)
    `);

        // Seed Topics (Example)
        await run(`
      INSERT OR IGNORE INTO literacy_topics (title, description, icon, xp_reward, content, order_index)
      VALUES 
        ('Apa itu AI?', 'Pengenalan dasar kecerdasan buatan', '🤖', 10, 'AI adalah...', 1),
        ('Etika AI', 'Memahami dampak sosial AI', '⚖️', 15, 'Etika penting karena...', 2)
    `);

        // Create Admin/Test User (Optional)
        // const hashedPassword = await bcrypt.hash('admin123', 10);
        // await run(`INSERT OR IGNORE INTO users (username, password_hash, name, role) VALUES (?, ?, ?, ?)`, ['admin', hashedPassword, 'Admin User', 'admin']);

        console.log('✅ Database setup complete!');
    } catch (err) {
        console.error('❌ Database setup failed:', err);
    }
}

setupDatabase();
