import config from './../config';
import userRoutes from './user/user.routes';
import roleRoutes from './role/role.routes';

export default (server) => {
  server.get('/', (req, res) => {
    res.render('index', {
      name: '我是内容页'
    });
  });

  server.get('/health-check', (req, res) => {
    res.status(200);
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.json({
      health: 'good',
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage()
    });
  });

  server.use('/users', userRoutes);
  server.use('/roles', roleRoutes);
};
