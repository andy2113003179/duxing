import { success, error } from '../utils/response.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import * as contactService from '../services/contactService.js';

/**
 * 获取联系方式列表
 * GET /api/v1/contacts
 */
export const getContacts = asyncHandler(async (req, res) => {
  const { type, status } = req.query;
  const filters = {};

  if (type) filters.type = type;
  if (status) filters.status = status;

  const result = await contactService.getContacts(filters);
  return res.json(success(result, '获取成功'));
});

/**
 * 获取单个联系方式
 * GET /api/v1/contacts/:id
 */
export const getContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await contactService.getContactById(id);
    return res.json(success(result, '获取成功'));
  } catch (err) {
    return res.status(404).json(error(err.message, 404));
  }
});

/**
 * 创建联系方式
 * POST /api/v1/contacts
 */
export const createContact = asyncHandler(async (req, res) => {
  const result = await contactService.createContact(req.body);
  return res.status(201).json(success(result, '创建成功'));
});

/**
 * 更新联系方式
 * PUT /api/v1/contacts/:id
 */
export const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await contactService.updateContact(id, req.body);
    return res.json(success(result, '更新成功'));
  } catch (err) {
    return res.status(404).json(error(err.message, 404));
  }
});

/**
 * 删除联系方式
 * DELETE /api/v1/contacts/:id
 */
export const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await contactService.deleteContact(id);
    return res.json(success(null, '删除成功'));
  } catch (err) {
    return res.status(404).json(error(err.message, 404));
  }
});

