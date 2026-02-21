import { error } from '../utils/response.js';
import logger from '../utils/logger.js';

/**
 * 全局错误处理中间件
 */
export const errorHandler = (err, req, res, next) => {
  // 记录错误日志
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip
  });

  // Sequelize 验证错误
  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map(e => e.message).join('; ');
    return res.status(400).json(error(messages, 400, {
      type: 'ValidationError',
      details: err.errors
    }));
  }

  // Sequelize 唯一约束错误
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0]?.path || 'unknown';
    return res.status(400).json(error(`${field} 已存在`, 400, {
      type: 'UniqueConstraintError',
      field
    }));
  }

  // Sequelize 外键约束错误
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json(error('关联数据不存在', 400, {
      type: 'ForeignKeyConstraintError'
    }));
  }

  // JWT 错误
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json(error('无效的认证令牌', 401));
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json(error('认证令牌已过期', 401));
  }

  // 文件上传错误
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json(error('文件大小超过限制', 400));
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json(error('文件字段不匹配', 400));
  }

  // 默认错误
  const statusCode = err.statusCode || 500;
  const message = err.message || '服务器内部错误';

  return res.status(statusCode).json(error(message, statusCode, {
    type: err.name || 'Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  }));
};

/**
 * 404 错误处理中间件
 */
export const notFound = (req, res) => {
  res.status(404).json(error(`路由 ${req.originalUrl} 不存在`, 404));
};

/**
 * 异步路由错误捕获包装器
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

