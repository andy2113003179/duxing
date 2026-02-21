import { success } from '../utils/response.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import * as companyService from '../services/companyService.js';

/**
 * 获取公司信息
 * GET /api/v1/company
 */
export const getCompany = asyncHandler(async (req, res) => {
  const result = await companyService.getCompanyInfo();
  return res.json(success(result, '获取成功'));
});

/**
 * 更新公司信息
 * PUT /api/v1/company
 */
export const updateCompany = asyncHandler(async (req, res) => {
  const result = await companyService.updateCompanyInfo(req.body);
  return res.json(success(result, '更新成功'));
});

