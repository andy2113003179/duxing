/**
 * 轮播图相关 API
 */

import { get, post, put, patch, del } from './request'

/**
 * 获取轮播图列表
 * @param {object} params - 查询参数
 * @param {string} params.position - 位置（home/about/product）
 * @param {string} params.status - 状态（active/inactive）
 */
export const getBannerList = (params) => {
  return get('/v1/banners', params)
}

/**
 * 获取单个轮播图
 * @param {number} id - 轮播图ID
 */
export const getBannerById = (id) => {
  return get(`/v1/banners/${id}`)
}

/**
 * 创建轮播图
 * @param {object} data - 轮播图数据
 */
export const createBanner = (data) => {
  return post('/v1/banners', data)
}

/**
 * 更新轮播图
 * @param {number} id - 轮播图ID
 * @param {object} data - 轮播图数据
 */
export const updateBanner = (id, data) => {
  return put(`/v1/banners/${id}`, data)
}

/**
 * 更新轮播图排序
 * @param {number} id - 轮播图ID
 * @param {number} sortOrder - 排序值
 */
export const updateBannerSort = (id, sortOrder) => {
  return patch(`/v1/banners/${id}/sort`, { sort_order: sortOrder })
}

/**
 * 删除轮播图
 * @param {number} id - 轮播图ID
 */
export const deleteBanner = (id) => {
  return del(`/v1/banners/${id}`)
}

