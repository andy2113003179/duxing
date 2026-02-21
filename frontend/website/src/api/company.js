/**
 * 公司信息相关 API
 */

import { get, put } from './request'

/**
 * 获取公司信息
 */
export const getCompanyInfo = () => {
  return get('/v1/company')
}

/**
 * 更新公司信息
 * @param {object} data - 公司信息数据
 */
export const updateCompanyInfo = (data) => {
  return put('/v1/company', data)
}

