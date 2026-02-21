/**
 * Pinia Store - 公司信息
 */

import { defineStore } from 'pinia'
import { getCompanyInfo } from '@/api/company'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    // 公司信息
    info: null,
    // 加载状态
    loading: false,
    // 错误信息
    error: null,
  }),

  getters: {
    // 公司名称
    companyName: (state) => state.info?.name || '都兴工贸',
    // 公司描述
    companyDesc: (state) => state.info?.description || '',
    // 公司Logo
    companyLogo: (state) => state.info?.logo || '',
    // 是否已加载
    isLoaded: (state) => state.info !== null,
  },

  actions: {
    // 获取公司信息
    async fetchCompanyInfo() {
      // 如果已加载且数据存在，直接返回
      if (this.info) {
        return this.info
      }

      this.loading = true
      this.error = null

      try {
        const res = await getCompanyInfo()
        this.info = res.data
        return this.info
      } catch (err) {
        this.error = err.message
        console.error('获取公司信息失败:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    // 重置状态
    reset() {
      this.info = null
      this.loading = false
      this.error = null
    },
  },
})

