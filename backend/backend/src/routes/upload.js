import express from 'express';
import * as uploadController from '../controllers/uploadController.js';
import { authenticate } from '../middlewares/auth.js';
import { uploadSingle, uploadMultiple } from '../middlewares/upload.js';

const router = express.Router();

// 所有上传接口都需要认证
router.post('/image', authenticate, uploadSingle('file'), uploadController.uploadImage);
router.post('/images', authenticate, uploadMultiple('files', 10), uploadController.uploadImages);

export default router;

