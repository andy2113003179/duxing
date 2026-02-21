import { success, error } from '../utils/response.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import * as bannerService from '../services/bannerService.js';

/**
 * 获取轮播图列表
 * GET /api/v1/banners
 */
export const getBanners = asyncHandler(async (req, res) => {
  const { position, status } = req.query;
  const filters = {};

  if (position) filters.position = position;
  if (status) filters.status = status;

  const result = await bannerService.getBanners(filters);
  return res.json(success(result, '获取成功'));
});

/**
 * 获取单个轮播图
 * GET /api/v1/banners/:id
 */
export const getBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await bannerService.getBannerById(id);
    return res.json(success(result, '获取成功'));
  } catch (err) {
    return res.status(404).json(error(err.message, 404));
  }
});

/**
 * 创建轮播图
 * POST /api/v1/banners
 */
export const createBanner = asyncHandler(async (req, res) => {
  const result = await bannerService.createBanner(req.body);
  return res.status(201).json(success(result, '创建成功'));
});

/**
 * 更新轮播图
 * PUT /api/v1/banners/:id
 */
export const updateBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await bannerService.updateBanner(id, req.body);
    return res.json(success(result, '更新成功'));
  } catch (err) {
    return res.status(404).json(error(err.message, 404));
  }
});

/**
 * 删除轮播图
 * DELETE /api/v1/banners/:id
 */
export const deleteBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await bannerService.deleteBanner(id);
    return res.json(success(null, '删除成功'));
  } catch (err) {
    return res.status(404).json(error(err.message, 404));
  }
});

/**
 * 更新排序
 * PATCH /api/v1/banners/:id/sort
 */
export const updateBannerSort = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { sort_order } = req.body;

  if (sort_order === undefined) {
    return res.status(400).json(error('请提供排序值', 400));
  }

  try {
    const result = await bannerService.updateBannerSort(id, sort_order);
    return res.json(success(result, '排序更新成功'));
  } catch (err) {
    return res.status(404).json(error(err.message, 404));
  }
});

