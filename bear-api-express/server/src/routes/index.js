import express from 'express'
import config from './../config'
import adminRoutes from './admin/admin.routes';
import authRoutes from './auth/auth.routes'
import tokenRoutes from './token/token.routes'
import userRoutes from './user/user.routes'

const API_PREFIX = config.server.apiPrefix;

export default app => {
  app.get(`${API_PREFIX}/health-check`, (req, res) => {
    res.status(200);
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.json({
      health: 'good',
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    });
  });
  import adminRoutes from './admin/admin.routes';
  app.use(`${API_PREFIX}/admin`, adminRoutes);
  app.use(`${API_PREFIX}/auth`, authRoutes);
  app.use(`${API_PREFIX}/tokens`, tokenRoutes);
  app.use(`${API_PREFIX}/users`, userRoutes);
};
