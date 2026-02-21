import { success } from '../utils/response.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import path from 'path';

/**
 * 上传图片
 * POST /api/v1/upload/image
 */
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json(error('请上传图片文件', 400));
  }

  // 构建文件访问路径
  const type = req.body.type || req.query.type || 'other';
  const fileUrl = `/uploads/${type}/${req.file.filename}`;

  const result = {
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    url: fileUrl,
    path: req.file.path
  };

  return res.json(success(result, '上传成功'));
});

/**
 * 上传多张图片
 * POST /api/v1/upload/images
 */
export const uploadImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json(error('请上传图片文件', 400));
  }

  const type = req.body.type || req.query.type || 'other';

  const result = req.files.map(file => ({
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    url: `/uploads/${type}/${file.filename}`,
    path: file.path
  }));

  return res.json(success(result, '上传成功'));
});

