import { defineStore } from 'pinia'
import { authApi } from '@/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('admin_token') || '',
    userInfo: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async login(username, password) {
      const res = await authApi.login({ username, password })
      this.token = res.data.token
      this.userInfo = res.data.user
      localStorage.setItem('admin_token', this.token)
      return res
    },

    async fetchProfile() {
      const res = await authApi.getProfile()
      this.userInfo = res.data
    },

    logout() {
      this.token = ''
      this.userInfo = null
      localStorage.removeItem('admin_token')
    },
  },
})
