import express from 'express';
import authRoutes from './auth.js';
import companyRoutes from './company.js';
import bannerRoutes from './banner.js';
import productRoutes from './product.js';
import contactRoutes from './contact.js';
import uploadRoutes from './upload.js';

const router = express.Router();

// API 版本前缀
const API_VERSION = '/v1';

// 健康检查
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: '服务运行正常',
    timestamp: new Date().toISOString()
  });
});

// 注册路由
router.use(`${API_VERSION}/auth`, authRoutes);
router.use(`${API_VERSION}/company`, companyRoutes);
router.use(`${API_VERSION}/banners`, bannerRoutes);
router.use(`${API_VERSION}/products`, productRoutes);
router.use(`${API_VERSION}/contacts`, contactRoutes);
router.use(`${API_VERSION}/upload`, uploadRoutes);

export default router;

