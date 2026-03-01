import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const AdminLayout = () => import('@/layout/AdminLayout.vue')

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: AdminLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: '仪表盘', icon: 'Odometer' }
      },
      {
        path: 'company',
        name: 'Company',
        component: () => import('@/views/Company.vue'),
        meta: { title: '公司信息', icon: 'OfficeBuilding' }
      },
      {
        path: 'banners',
        name: 'Banners',
        component: () => import('@/views/Banners.vue'),
        meta: { title: '轮播图管理', icon: 'PictureFilled' }
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/Products.vue'),
        meta: { title: '产品管理', icon: 'Box' }
      },
      {
        path: 'contacts',
        name: 'Contacts',
        component: () => import('@/views/Contacts.vue'),
        meta: { title: '联系方式', icon: 'Phone' }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  document.title = (to.meta.title || '后台管理') + ' - 都兴工贸'

  const userStore = useUserStore()

  if (to.path === '/login') {
    if (userStore.isLoggedIn) return next('/')
    return next()
  }

  if (!userStore.isLoggedIn) {
    return next('/login')
  }

  next()
})

export default router
