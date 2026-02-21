/**
 * Pinia Store - 国际化
 */

import { defineStore } from 'pinia'
import { setLanguage as i18nSetLanguage, getCurrentLanguage } from '@/locales'

export const useI18nStore = defineStore('i18n', {
  state: () => ({
    // 当前语言
    locale: getCurrentLanguage(),
    // 可用语言列表
    availableLocales: [
      { value: 'zh-CN', label: '简体中文', icon: '🇨🇳' },
      { value: 'en-US', label: 'English', icon: '🇺🇸' },
    ],
  }),

  getters: {
    // 当前语言对象
    currentLocale: (state) => {
      return state.availableLocales.find(l => l.value === state.locale)
    },
    // 是否中文
    isZhCN: (state) => state.locale === 'zh-CN',
    // 是否英文
    isEnUS: (state) => state.locale === 'en-US',
  },

  actions: {
    // 切换语言
    setLanguage(locale) {
      if (this.availableLocales.some(l => l.value === locale)) {
        this.locale = locale
        i18nSetLanguage(locale)
      }
    },

    // 切换到下一个语言
    toggleLanguage() {
      const currentIndex = this.availableLocales.findIndex(l => l.value === this.locale)
      const nextIndex = (currentIndex + 1) % this.availableLocales.length
      this.setLanguage(this.availableLocales[nextIndex].value)
    },
  },
})

