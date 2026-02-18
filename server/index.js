
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import literacyRoutes from './routes/literacy.js';
import projectRoutes from './routes/project.js';
import reflectionRoutes from './routes/reflection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/literacy', literacyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reflections', reflectionRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'GEMBIRA AI Local API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: err.message || 'Something went wrong!'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
