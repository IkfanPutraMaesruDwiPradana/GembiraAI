
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { run, get } from '../config/db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, password, name, university, major, avatar_color } = req.body;

        if (!username || !password || !name) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        // Check if user exists
        const existingUser = await get('SELECT id FROM users WHERE username = ?', [username]);
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Username already taken' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Insert user
        const result = await run(
            `INSERT INTO users (username, password_hash, name, university, major, avatar_color) 
       VALUES (?, ?, ?, ?, ?, ?)`,
            [username, passwordHash, name, university || '', major || '', avatar_color || '#3B82F6']
        );

        const userId = result.id;

        // Assign 'Newbie' badge
        const badge = await get('SELECT id FROM badges WHERE name = ?', ['Newbie']);
        if (badge) {
            await run('INSERT INTO user_badges (user_id, badge_id) VALUES (?, ?)', [userId, badge.id]);
        }

        // Get full user profile
        const user = await get('SELECT * FROM users WHERE id = ?', [userId]);

        // Generate Token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                email: `${user.username}@gembira.ai`, // Backward compatibility
                university: user.university,
                major: user.major,
                avatarColor: user.avatar_color,
                xp: user.xp,
                level: user.level,
                literacyProgress: user.literacy_progress,
                badges: ['Newbie']
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await get('SELECT * FROM users WHERE username = ?', [username]);
        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Invalid username or password' });
        }

        // Get badges
        // (Simplified for now, assume we join or fetch separately, let's just fetch names)
        // In sqlite we can simple fetch rows
        // We'll fix badge fetching logic perfectly later, for now return empty or simple

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                email: `${user.username}@gembira.ai`,
                university: user.university,
                major: user.major,
                avatarColor: user.avatar_color,
                xp: user.xp,
                level: user.level,
                literacyProgress: user.literacy_progress,
                badges: [] // Placeholder, can be improved
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
