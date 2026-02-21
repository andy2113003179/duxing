import { User } from '../models/index.js';
import { generateToken, generateRefreshToken } from '../utils/jwt.js';
import logger from '../utils/logger.js';

/**
 * 用户登录
 */
export const login = async (username, password) => {
  // 查找用户
  const user = await User.findOne({ where: { username } });
  
  if (!user) {
    throw new Error('用户名或密码错误');
  }

  // 验证密码
  const isValidPassword = await user.validatePassword(password);
  
  if (!isValidPassword) {
    throw new Error('用户名或密码错误');
  }

  // 检查用户状态
  if (user.status !== 'active') {
    throw new Error('用户账号已被禁用');
  }

  // 更新最后登录时间
  await user.update({ last_login: new Date() });

  // 生成令牌
  const token = generateToken({ id: user.id, username: user.username, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id });

  logger.info(`用户登录成功: ${username}`);

  return {
    user: user.toJSON(),
    token,
    refreshToken
  };
};

/**
 * 获取用户信息
 */
export const getUserProfile = async (userId) => {
  const user = await User.findByPk(userId);
  
  if (!user) {
    throw new Error('用户不存在');
  }

  return user.toJSON();
};

/**
 * 更新用户信息
 */
export const updateUserProfile = async (userId, data) => {
  const user = await User.findByPk(userId);
  
  if (!user) {
    throw new Error('用户不存在');
  }

  const allowedFields = ['email'];
  const updateData = {};
  
  allowedFields.forEach(field => {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  });

  await user.update(updateData);

  return user.toJSON();
};

/**
 * 修改密码
 */
export const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findByPk(userId);
  
  if (!user) {
    throw new Error('用户不存在');
  }

  // 验证旧密码
  const isValidPassword = await user.validatePassword(oldPassword);
  
  if (!isValidPassword) {
    throw new Error('原密码错误');
  }

  // 更新密码
  await user.update({ password: newPassword });

  logger.info(`用户修改密码: ${user.username}`);

  return true;
};

