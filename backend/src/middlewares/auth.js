import { verifyToken } from '../utils/jwt.js';
import { error } from '../utils/response.js';
import { User } from '../models/index.js';

/**
 * JWT 认证中间件
 */
export const authenticate = async (req, res, next) => {
  try {
    // 获取 token
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json(error('未提供认证令牌', 401));
    }

    const token = authHeader.substring(7); // 移除 'Bearer ' 前缀

    // 验证 token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json(error('认证令牌无效或已过期', 401));
    }

    // 查找用户
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json(error('用户不存在', 401));
    }

    if (user.status !== 'active') {
      return res.status(403).json(error('用户账号已被禁用', 403));
    }

    // 将用户信息附加到请求对象
    req.user = user;
    req.userId = user.id;
    
    next();
  } catch (err) {
    console.error('认证错误:', err);
    return res.status(401).json(error('认证失败', 401));
  }
};

/**
 * 角色验证中间件
 * @param {Array} roles - 允许的角色数组
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json(error('未认证', 401));
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json(error('无权限访问', 403));
    }

    next();
  };
};

/**
 * 可选认证中间件（不强制要求登录）
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = verifyToken(token);
      
      if (decoded) {
        const user = await User.findByPk(decoded.id);
        if (user && user.status === 'active') {
          req.user = user;
          req.userId = user.id;
        }
      }
    }
    
    next();
  } catch (err) {
    // 即使认证失败也继续
    next();
  }
};

