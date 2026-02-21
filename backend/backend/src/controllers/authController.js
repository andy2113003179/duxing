import { success, error } from '../utils/response.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import * as authService from '../services/authService.js';

/**
 * 用户登录
 * POST /api/v1/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json(error('请提供用户名和密码', 400));
  }

  try {
    const result = await authService.login(username, password);
    return res.json(success(result, '登录成功'));
  } catch (err) {
    return res.status(400).json(error(err.message, 400));
  }
});

/**
 * 获取当前用户信息
 * GET /api/v1/auth/profile
 */
export const getProfile = asyncHandler(async (req, res) => {
  const result = await authService.getUserProfile(req.userId);
  return res.json(success(result, '获取成功'));
});

/**
 * 更新当前用户信息
 * PUT /api/v1/auth/profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const result = await authService.updateUserProfile(req.userId, req.body);
  return res.json(success(result, '更新成功'));
});

/**
 * 修改密码
 * PUT /api/v1/auth/password
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json(error('请提供原密码和新密码', 400));
  }

  if (newPassword.length < 6) {
    return res.status(400).json(error('新密码长度至少为6位', 400));
  }

  try {
    await authService.changePassword(req.userId, oldPassword, newPassword);
    return res.json(success(null, '密码修改成功'));
  } catch (err) {
    return res.status(400).json(error(err.message, 400));
  }
});

/**
 * 登出
 * POST /api/v1/auth/logout
 */
export const logout = asyncHandler(async (req, res) => {
  // 客户端删除 token 即可
  return res.json(success(null, '登出成功'));
});

