/**
 * Vue I18n 配置
 * 国际化配置文件
 */

import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'

// 获取浏览器语言
const getBrowserLanguage = () => {
  const lang = navigator.language.toLowerCase()
  if (lang.indexOf('zh') > -1) {
    return 'zh-CN'
  } else if (lang.indexOf('en') > -1) {
    return 'en-US'
  }
  return 'zh-CN' // 默认中文
}

// 从 localStorage 获取保存的语言设置
const getStoredLanguage = () => {
  return localStorage.getItem('language') || getBrowserLanguage()
}

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getStoredLanguage(), // 默认语言
  fallbackLocale: 'zh-CN', // 回退语言
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
  globalInjection: true, // 全局注入 $t 方法
})

// 切换语言
export const setLanguage = (lang) => {
  i18n.global.locale.value = lang
  localStorage.setItem('language', lang)
  
  // 更新 HTML lang 属性
  document.documentElement.lang = lang
  
  // 更新页面标题
  updatePageTitle()
}

// 获取当前语言
export const getCurrentLanguage = () => {
  return i18n.global.locale.value
}

// 更新页面标题
const updatePageTitle = () => {
  const currentRoute = window.$router?.currentRoute.value
  if (currentRoute) {
    const title = i18n.global.t(currentRoute.meta.titleKey || 'home.title')
    document.title = title
  }
}

export default i18n

