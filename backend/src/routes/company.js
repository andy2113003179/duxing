import express from 'express';
import * as companyController from '../controllers/companyController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// 公开路由
router.get('/', companyController.getCompany);

// 需要认证的路由
router.put('/', authenticate, companyController.updateCompany);

export default router;

