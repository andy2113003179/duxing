import express from 'express';
import * as bannerController from '../controllers/bannerController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// 公开路由
router.get('/', bannerController.getBanners);
router.get('/:id', bannerController.getBanner);

// 需要认证的路由
router.post('/', authenticate, bannerController.createBanner);
router.put('/:id', authenticate, bannerController.updateBanner);
router.patch('/:id/sort', authenticate, bannerController.updateBannerSort);
router.delete('/:id', authenticate, bannerController.deleteBanner);

export default router;

