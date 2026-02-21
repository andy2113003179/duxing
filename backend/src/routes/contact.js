import express from 'express';
import * as contactController from '../controllers/contactController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// 公开路由
router.get('/', contactController.getContacts);
router.get('/:id', contactController.getContact);

// 需要认证的路由
router.post('/', authenticate, contactController.createContact);
router.put('/:id', authenticate, contactController.updateContact);
router.delete('/:id', authenticate, contactController.deleteContact);

export default router;

