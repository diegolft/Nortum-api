import 'reflect-metadata';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente primeiro
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { AppDataSource } from './infrastructure/config/database';
import { config } from './infrastructure/config/environment';
import routes from './presentation/routes';
import { errorMiddleware } from './presentation/middleware/ErrorMiddleware';

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling middleware (must be last)
app.use(errorMiddleware);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Database connection and server startup
async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected successfully');

    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📊 Environment: ${config.nodeEnv}`);
      console.log(`🌐 API URL: http://localhost:${config.port}/api`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
