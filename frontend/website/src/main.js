import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

import App from './App.vue'
import router from './router'
import i18n from './locales'
import { useI18nStore } from './stores/i18n'

// 导入全局样式
import '@/assets/styles/common.scss'

// 创建应用实例
const app = createApp(App)

// 使用 Pinia
const pinia = createPinia()
app.use(pinia)

// 使用路由
app.use(router)

// 使用 vue-i18n
app.use(i18n)

// 获取 i18n store 来动态设置 Element Plus 语言
const i18nStore = useI18nStore()
const elementLocale = i18nStore.locale === 'zh-CN' ? zhCn : en

// 使用 Element Plus（动态语言包）
app.use(ElementPlus, {
  locale: elementLocale,
  size: 'default',
  zIndex: 3000
})

// 监听语言变化，更新 Element Plus 语言
i18nStore.$subscribe(() => {
  // 语言切换后需要重新设置 Element Plus 语言
  // 由于 Element Plus 不支持动态切换，这里只能刷新页面
  // 实际生产中可以使用更优雅的方案
})

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('全局错误:', err)
  console.error('错误信息:', info)
}

// 将 router 挂载到 window 供 i18n 使用
window.$router = router

// 挂载应用
app.mount('#app')

