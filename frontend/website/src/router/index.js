/**
 * Vue Router 路由配置 - 前台官网
 */

import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/stores/app'
import i18n from '@/locales'

// 路由懒加载
const Home = () => import('@/views/Home.vue')
const About = () => import('@/views/About.vue')
const ProductList = () => import('@/views/Products/ProductList.vue')
const ProductDetail = () => import('@/views/Products/ProductDetail.vue')
const Contact = () => import('@/views/Contact.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      titleKey: 'home.title'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      titleKey: 'about.title'
    }
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList,
    meta: {
      titleKey: 'product.title'
    }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: {
      titleKey: 'product.detail'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      titleKey: 'contact.title'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      titleKey: 'error.notFound.title'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（浏览器后退），返回到该位置
    if (savedPosition) {
      return savedPosition
    }
    // 如果有锚点，滚动到锚点位置
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    // 否则滚动到顶部
    return { top: 0, behavior: 'smooth' }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 关闭移动端菜单
  const appStore = useAppStore()
  appStore.closeMobileMenu()

  // 设置页面标题
  const titleKey = to.meta.titleKey
  if (titleKey) {
    document.title = i18n.global.t(titleKey) + ' - ' + i18n.global.t('footer.company')
  } else {
    document.title = i18n.global.t('home.title')
  }

  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 可以在这里添加页面访问统计等
  console.log(`路由跳转: ${from.path} -> ${to.path}`)
})

export default router

