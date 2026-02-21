import express from 'express';
import * as productController from '../controllers/productController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// 公开路由
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.patch('/:id/view', productController.increaseViews);

// 需要认证的路由
router.post('/', authenticate, productController.createProduct);
router.put('/:id', authenticate, productController.updateProduct);
router.delete('/:id', authenticate, productController.deleteProduct);

export default router;

