import { success, error, paginate } from '../utils/response.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import * as productService from '../services/productService.js';

/**
 * 获取产品列表
 * GET /api/v1/products
 */
export const getProducts = asyncHandler(async (req, res) => {
  const { category_id, status, is_featured, keyword, page, pageSize } = req.query;

  const filters = {};
  if (category_id) filters.category_id = category_id;
  if (status) filters.status = status;
  if (is_featured !== undefined) filters.is_featured = is_featured;
  if (keyword) filters.keyword = keyword;

  const result = await productService.getProducts(filters, { page, pageSize });
  return res.json(paginate(result.items, result.pagination, '获取成功'));
});

/**
 * 获取产品详情
 * GET /api/v1/products/:id
 */
export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await productService.getProductById(id);
    return res.json(success(result, '获取成功'));
  } catch (err) {
    return res.status(404).json(error(err.message, 404));
  }
});

/**
 * 创建产品
 * POST /api/v1/products
 */
export const createProduct = asyncHandler(async (req, res) => {
  const result = await productService.createProduct(req.body);
  return res.status(201).json(success(result, '创建成功'));
});

/**
 * 更新产品
 * PUT /api/v1/products/:id
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await productService.updateProduct(id, req.body);
    return res.json(success(result, '更新成功'));
  } catch (err) {
    return res.status(404).json(error(err.message, 404));
  }
});

/**
 * 删除产品
 * DELETE /api/v1/products/:id
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await productService.deleteProduct(id);
    return res.json(success(null, '删除成功'));
  } catch (err) {
    return res.status(404).json(error(err.message, 404));
  }
});

/**
 * 增加产品浏览量
 * PATCH /api/v1/products/:id/view
 */
export const increaseViews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await productService.increaseProductViews(id);
    return res.json(success(null, '操作成功'));
  } catch (err) {
    return res.status(404).json(error(err.message, 404));
  }
});

