import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

import { errorHandler } from './server/middleware/errorHandler.js';
import routes from './server/routes/index.js';
import { connectDB } from './server/config/db.js';

// ES modules'da __dirname alternative
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env FIRST before any other imports that use process.env
const envPath = path.join(__dirname, '.env.local');

dotenv.config({ path: envPath });

// Read package.json
const packageJson = JSON.parse(readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));

process.env.APP_VERSION = packageJson.version;
process.env.API_VERSION = `v${packageJson.version.split('.')[0]}`;

const app = express();
const distPath = path.join(__dirname, 'dist');

// Connect to MongoDB
connectDB();

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? ['https://mockint.vercel.app'] : '*',
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API version from package.json
const apiVersion = `v${packageJson.version.split('.')[0]}`;

// API Routes - versioned
app.use(`/api/${apiVersion}`, routes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    version: packageJson.version,
    apiVersion: apiVersion,
    timestamp: new Date().toISOString(),
  });
});

// Serve static files
app.use(express.static(distPath));

// Client-side routing fallback
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error handling
app.use(errorHandler);

// Export for Vercel serverless
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📚 API ${process.env.API_VERSION}: http://localhost:${PORT}/api/${process.env.API_VERSION}`);
  });
}
