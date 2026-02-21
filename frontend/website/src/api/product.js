/**
 * 产品相关 API
 */

import { get, post, put, patch, del } from './request'

/**
 * 获取产品列表
 * @param {object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 * @param {number} params.category_id - 分类ID
 * @param {string} params.status - 状态
 * @param {boolean} params.is_featured - 是否推荐
 * @param {string} params.keyword - 关键词
 */
export const getProductList = (params) => {
  return get('/v1/products', params)
}

/**
 * 获取产品详情
 * @param {number} id - 产品ID
 */
export const getProductById = (id) => {
  return get(`/v1/products/${id}`)
}

/**
 * 创建产品
 * @param {object} data - 产品数据
 */
export const createProduct = (data) => {
  return post('/v1/products', data)
}

/**
 * 更新产品
 * @param {number} id - 产品ID
 * @param {object} data - 产品数据
 */
export const updateProduct = (id, data) => {
  return put(`/v1/products/${id}`, data)
}

/**
 * 删除产品
 * @param {number} id - 产品ID
 */
export const deleteProduct = (id) => {
  return del(`/v1/products/${id}`)
}

/**
 * 增加产品浏览量
 * @param {number} id - 产品ID
 */
export const increaseProductView = (id) => {
  return patch(`/v1/products/${id}/view`)
}

