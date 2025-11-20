import express from 'express';
import authRoutes from './api/v1/auth/auth.routes';
import { swaggerUi, swaggerSpec } from './config/swagger';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.get('/', (req, res) => res.send('Server is running...'));
app.use('/api/auth', authRoutes);
app.use(errorHandler);


export default app;
