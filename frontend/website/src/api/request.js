/**
 * Axios 请求封装
 * 统一配置请求拦截器和响应拦截器
 */

import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('access_token')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 打印请求日志（开发环境）
    if (import.meta.env.DEV) {
      console.log('📤 Request:', config.method?.toUpperCase(), config.url, config.data || config.params)
    }

    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data

    // 打印响应日志（开发环境）
    if (import.meta.env.DEV) {
      console.log('📥 Response:', response.config.url, res)
    }

    // 检查业务状态码
    if (res.success === false || (res.code && res.code !== 200)) {
      // 显示错误提示
      ElMessage.error(res.message || '请求失败')
      
      // 特殊错误码处理
      if (res.code === 401) {
        // 未授权，清除 token 并跳转到登录页
        localStorage.removeItem('access_token')
        window.location.href = '/admin/login'
      }

      return Promise.reject(new Error(res.message || '请求失败'))
    }

    // 返回数据
    return res
  },
  (error) => {
    console.error('❌ Response Error:', error)

    let message = '网络请求失败'

    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response

      switch (status) {
        case 400:
          message = data.message || '请求参数错误'
          break
        case 401:
          message = '未授权，请重新登录'
          localStorage.removeItem('access_token')
          window.location.href = '/admin/login'
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        case 502:
          message = '网关错误'
          break
        case 503:
          message = '服务不可用'
          break
        case 504:
          message = '网关超时'
          break
        default:
          message = data.message || `请求失败(${status})`
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      message = '网络连接失败，请检查网络'
    } else {
      // 其他错误
      message = error.message || '请求失败'
    }

    ElMessage.error(message)
    return Promise.reject(error)
  }
)

/**
 * GET 请求
 * @param {string} url - 请求地址
 * @param {object} params - 请求参数
 * @param {object} config - 额外配置
 */
export const get = (url, params, config) => {
  return request.get(url, { params, ...config })
}

/**
 * POST 请求
 * @param {string} url - 请求地址
 * @param {object} data - 请求数据
 * @param {object} config - 额外配置
 */
export const post = (url, data, config) => {
  return request.post(url, data, config)
}

/**
 * PUT 请求
 * @param {string} url - 请求地址
 * @param {object} data - 请求数据
 * @param {object} config - 额外配置
 */
export const put = (url, data, config) => {
  return request.put(url, data, config)
}

/**
 * PATCH 请求
 * @param {string} url - 请求地址
 * @param {object} data - 请求数据
 * @param {object} config - 额外配置
 */
export const patch = (url, data, config) => {
  return request.patch(url, data, config)
}

/**
 * DELETE 请求
 * @param {string} url - 请求地址
 * @param {object} params - 请求参数
 * @param {object} config - 额外配置
 */
export const del = (url, params, config) => {
  return request.delete(url, { params, ...config })
}

/**
 * 上传文件
 * @param {string} url - 上传地址
 * @param {FormData} formData - 表单数据
 * @param {Function} onProgress - 上传进度回调
 */
export const upload = (url, formData, onProgress) => {
  return request.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(percent)
      }
    }
  })
}

export default request

