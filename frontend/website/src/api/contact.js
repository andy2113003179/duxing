/**
 * 联系方式相关 API
 */

import { get, post, put, del } from './request'

/**
 * 获取联系方式列表
 * @param {object} params - 查询参数
 * @param {string} params.type - 类型（company/sales/service）
 * @param {string} params.status - 状态
 */
export const getContactList = (params) => {
  return get('/v1/contacts', params)
}

/**
 * 获取单个联系方式
 * @param {number} id - 联系方式ID
 */
export const getContactById = (id) => {
  return get(`/v1/contacts/${id}`)
}

/**
 * 创建联系方式
 * @param {object} data - 联系方式数据
 */
export const createContact = (data) => {
  return post('/v1/contacts', data)
}

/**
 * 更新联系方式
 * @param {number} id - 联系方式ID
 * @param {object} data - 联系方式数据
 */
export const updateContact = (id, data) => {
  return put(`/v1/contacts/${id}`, data)
}

/**
 * 删除联系方式
 * @param {number} id - 联系方式ID
 */
export const deleteContact = (id) => {
  return del(`/v1/contacts/${id}`)
}

