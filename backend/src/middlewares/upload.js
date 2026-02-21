import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload.js';
import { error } from '../utils/response.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 确保上传目录存在
const ensureUploadDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// 配置存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 根据上传类型决定存储目录
    const type = req.body.type || req.query.type || 'other';
    const subDir = uploadConfig.directories[type] || 'other';
    const uploadPath = path.join(uploadConfig.uploadDir, subDir);
    
    // 确保目录存在
    ensureUploadDir(uploadPath);
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名：时间戳 + 随机数 + 原始扩展名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// 文件过滤器
const fileFilter = (req, file, cb) => {
  // 检查文件类型
  if (uploadConfig.allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`不支持的文件类型: ${file.mimetype}。允许的类型: ${uploadConfig.allowedFileTypes.join(', ')}`), false);
  }
};

// 创建 multer 实例
const upload = multer({
  storage: storage,
  limits: {
    fileSize: uploadConfig.maxFileSize
  },
  fileFilter: fileFilter
});

/**
 * 单文件上传中间件
 */
export const uploadSingle = (fieldName = 'file') => {
  return (req, res, next) => {
    const uploadHandler = upload.single(fieldName);
    
    uploadHandler(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Multer 错误
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json(error('文件大小超过限制（最大5MB）', 400));
        }
        return res.status(400).json(error(err.message, 400));
      } else if (err) {
        // 其他错误
        return res.status(400).json(error(err.message, 400));
      }
      
      // 检查是否有文件
      if (!req.file) {
        return res.status(400).json(error('请上传文件', 400));
      }
      
      next();
    });
  };
};

/**
 * 多文件上传中间件
 */
export const uploadMultiple = (fieldName = 'files', maxCount = 10) => {
  return (req, res, next) => {
    const uploadHandler = upload.array(fieldName, maxCount);
    
    uploadHandler(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json(error('文件大小超过限制（最大5MB）', 400));
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json(error(`最多只能上传${maxCount}个文件`, 400));
        }
        return res.status(400).json(error(err.message, 400));
      } else if (err) {
        return res.status(400).json(error(err.message, 400));
      }
      
      if (!req.files || req.files.length === 0) {
        return res.status(400).json(error('请上传文件', 400));
      }
      
      next();
    });
  };
};

/**
 * 删除文件
 */
export const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export default upload;

