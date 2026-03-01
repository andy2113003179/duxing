import request from './request'

// ==================== 认证 ====================
export const authApi = {
  login: (data) => request.post('/v1/auth/login', data),
  getProfile: () => request.get('/v1/auth/profile'),
  changePassword: (data) => request.put('/v1/auth/password', data),
}

// ==================== 公司信息 ====================
export const companyApi = {
  get: () => request.get('/v1/company'),
  update: (data) => request.put('/v1/company', data),
}

// ==================== 轮播图 ====================
export const bannerApi = {
  list: (params) => request.get('/v1/banners', { params }),
  get: (id) => request.get(`/v1/banners/${id}`),
  create: (data) => request.post('/v1/banners', data),
  update: (id, data) => request.put(`/v1/banners/${id}`, data),
  delete: (id) => request.delete(`/v1/banners/${id}`),
}

// ==================== 产品 ====================
export const productApi = {
  list: (params) => request.get('/v1/products', { params }),
  get: (id) => request.get(`/v1/products/${id}`),
  create: (data) => request.post('/v1/products', data),
  update: (id, data) => request.put(`/v1/products/${id}`, data),
  delete: (id) => request.delete(`/v1/products/${id}`),
}

// ==================== 联系方式 ====================
export const contactApi = {
  list: (params) => request.get('/v1/contacts', { params }),
  get: (id) => request.get(`/v1/contacts/${id}`),
  create: (data) => request.post('/v1/contacts', data),
  update: (id, data) => request.put(`/v1/contacts/${id}`, data),
  delete: (id) => request.delete(`/v1/contacts/${id}`),
}

// ==================== 上传 ====================
export const uploadApi = {
  image: (file, type = 'other') => {
    const form = new FormData()
    form.append('file', file)
    form.append('type', type)
    return request.post('/v1/upload/image', form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}
