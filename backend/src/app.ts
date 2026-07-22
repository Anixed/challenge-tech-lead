import express from 'express';
import cors from 'cors';
import postRoutes from './routes/post.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Solo permitir peticiones desde el frontend.
app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }));
app.use(express.json());

// Endpoint para healthchecks.
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Rutas de la API.
app.use('/api/posts', postRoutes);

// Middlewares.
app.use(errorHandler);

export default app;
