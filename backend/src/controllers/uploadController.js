import { success, error } from '../utils/response.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import uploadConfig from '../config/upload.js';

/**
 * 上传图片
 * POST /api/v1/upload/image?type=xxx
 */
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json(error('请上传图片文件', 400));
  }

  // 使用与 middleware 一致的目录逻辑
  const type = req.query.type || req.body.type || 'other';
  const subDir = uploadConfig.directories[type] || 'other';
  const fileUrl = `/uploads/${subDir}/${req.file.filename}`;

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
 * POST /api/v1/upload/images?type=xxx
 */
export const uploadImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json(error('请上传图片文件', 400));
  }

  const type = req.query.type || req.body.type || 'other';
  const subDir = uploadConfig.directories[type] || 'other';

  const result = req.files.map(file => ({
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    url: `/uploads/${subDir}/${file.filename}`,
    path: file.path
  }));

  return res.json(success(result, '上传成功'));
});

