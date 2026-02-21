/**
 * 文件上传相关 API
 */

import { upload } from './request'

/**
 * 上传单张图片
 * @param {File} file - 文件对象
 * @param {string} type - 文件类型（banner/product/news/company）
 * @param {Function} onProgress - 上传进度回调
 */
export const uploadImage = (file, type = 'other', onProgress) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', type)

  return upload('/v1/upload/image', formData, onProgress)
}

/**
 * 上传多张图片
 * @param {FileList|Array} files - 文件列表
 * @param {string} type - 文件类型
 * @param {Function} onProgress - 上传进度回调
 */
export const uploadImages = (files, type = 'other', onProgress) => {
  const formData = new FormData()
  
  Array.from(files).forEach((file) => {
    formData.append('files', file)
  })
  
  formData.append('type', type)

  return upload('/v1/upload/images', formData, onProgress)
}

