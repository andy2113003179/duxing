/**
 * Pinia Store - 全局应用状态
 */

import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // 全局加载状态
    loading: false,
    // 移动端菜单状态
    mobileMenuOpen: false,
    // 设备类型
    deviceType: 'desktop', // desktop | tablet | mobile
  }),

  getters: {
    // 是否移动端
    isMobile: (state) => state.deviceType === 'mobile',
    // 是否平板
    isTablet: (state) => state.deviceType === 'tablet',
    // 是否桌面端
    isDesktop: (state) => state.deviceType === 'desktop',
  },

  actions: {
    // 设置加载状态
    setLoading(loading) {
      this.loading = loading
    },

    // 切换移动端菜单
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },

    // 关闭移动端菜单
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },

    // 设置设备类型
    setDeviceType() {
      const width = window.innerWidth
      if (width < 768) {
        this.deviceType = 'mobile'
      } else if (width < 1024) {
        this.deviceType = 'tablet'
      } else {
        this.deviceType = 'desktop'
      }
    },

    // 初始化应用
    initApp() {
      this.setDeviceType()
      
      // 监听窗口大小变化
      window.addEventListener('resize', () => {
        this.setDeviceType()
      })
    },
  },
})

