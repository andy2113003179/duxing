<template>
  <header class="site-header" :class="{ 'is-sticky': isSticky, 'is-scrolled': isScrolled }">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <router-link to="/" class="logo">
          <img v-if="companyStore.companyLogo" :src="companyStore.companyLogo" :alt="companyStore.companyName">
          <span v-else class="logo-text">{{ companyStore.companyName }}</span>
        </router-link>

        <!-- 桌面端导航 -->
        <nav class="desktop-nav">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="nav-item"
            :class="{ 'is-active': isActive(item.path) }"
          >
            {{ $t(item.labelKey) }}
          </router-link>
          
          <!-- 语言切换 -->
          <el-dropdown class="language-switcher" @command="handleLanguageChange">
            <span class="language-trigger">
              {{ i18nStore.currentLocale?.icon }} {{ i18nStore.currentLocale?.label }}
              <el-icon class="el-icon--right"><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="locale in i18nStore.availableLocales"
                  :key="locale.value"
                  :command="locale.value"
                  :disabled="locale.value === i18nStore.locale"
                >
                  {{ locale.icon }} {{ locale.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </nav>

        <!-- 移动端菜单按钮 -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <el-icon :size="24">
            <component :is="appStore.mobileMenuOpen ? 'Close' : 'Menu'" />
          </el-icon>
        </button>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <transition name="slide-down">
      <div v-show="appStore.mobileMenuOpen" class="mobile-menu">
        <nav class="mobile-nav">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="mobile-nav-item"
            :class="{ 'is-active': isActive(item.path) }"
            @click="closeMobileMenu"
          >
            {{ $t(item.labelKey) }}
          </router-link>
          
          <!-- 移动端语言切换 -->
          <div class="mobile-language">
            <button
              v-for="locale in i18nStore.availableLocales"
              :key="locale.value"
              class="language-btn"
              :class="{ 'is-active': locale.value === i18nStore.locale }"
              @click="handleLanguageChange(locale.value)"
            >
              {{ locale.icon }} {{ locale.label }}
            </button>
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useCompanyStore } from '@/stores/company'
import { useI18nStore } from '@/stores/i18n'
import { Menu, Close, ArrowDown } from '@element-plus/icons-vue'

const route = useRoute()
const appStore = useAppStore()
const companyStore = useCompanyStore()
const i18nStore = useI18nStore()

// 导航菜单项
const navItems = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/products', labelKey: 'nav.products' },
  { path: '/contact', labelKey: 'nav.contact' }
]

// 滚动状态
const isScrolled = ref(false)
const isSticky = ref(true)

// 判断当前路由是否激活
const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

// 切换移动端菜单
const toggleMobileMenu = () => {
  appStore.toggleMobileMenu()
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  appStore.closeMobileMenu()
}

// 切换语言
const handleLanguageChange = (locale) => {
  i18nStore.setLanguage(locale)
  closeMobileMenu()
  // 刷新页面以应用新语言（因为 Element Plus 不支持动态切换语言）
  window.location.reload()
}

// 滚动处理
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  background: $bg-primary;
  box-shadow: $shadow-sm;
  transition: all $transition-base $transition-ease;
  z-index: $z-index-sticky;

  @include respond-to('md') {
    height: $header-height-mobile;
  }

  &.is-scrolled {
    box-shadow: $shadow-md;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
  }

  .container {
    height: 100%;
  }

  .header-content {
    height: 100%;
    @include flex-between;
  }
}

// Logo
.logo {
  display: flex;
  align-items: center;
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $primary-color;
  text-decoration: none;
  @include transition(color);

  &:hover {
    color: $primary-dark;
  }

  img {
    height: 50px;
    object-fit: contain;

    @include respond-to('md') {
      height: 40px;
    }
  }

  .logo-text {
    font-size: $font-size-2xl;
    
    @include respond-to('md') {
      font-size: $font-size-xl;
    }
  }
}

// 桌面端导航
.desktop-nav {
  display: flex;
  align-items: center;
  gap: $spacing-xl;

  @include respond-to('md') {
    display: none;
  }

  .nav-item {
    position: relative;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $text-primary;
    text-decoration: none;
    padding: $spacing-sm 0;
    transition: color $transition-base $transition-ease;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: $primary-color;
      transition: width $transition-base $transition-ease;
    }

    &:hover,
    &.is-active {
      color: $primary-color;

      &::after {
        width: 100%;
      }
    }
  }
}

// 语言切换器
.language-switcher {
  margin-left: $spacing-md;
  cursor: pointer;

  .language-trigger {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: $font-size-sm;
    color: $text-primary;
    padding: 6px 12px;
    border-radius: $border-radius-base;
    transition: background $transition-base $transition-ease, color $transition-base $transition-ease;

    &:hover {
      background: $bg-secondary;
      color: $primary-color;
    }
  }

  @include respond-to('md') {
    display: none;
  }
}

// 移动端菜单按钮
.mobile-menu-btn {
  display: none;
  @include button-reset;
  color: $text-primary;

  @include respond-to('md') {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// 移动端菜单
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: $bg-primary;
  border-top: 1px solid $border-color;
  box-shadow: $shadow-lg;

  .mobile-nav {
    display: flex;
    flex-direction: column;
    padding: $spacing-md 0;

      .mobile-nav-item {
        padding: $spacing-md $spacing-lg;
        color: $text-primary;
        font-size: $font-size-base;
        font-weight: $font-weight-medium;
        text-decoration: none;
        transition: background $transition-base $transition-ease, color $transition-base $transition-ease;

        &:hover,
        &.is-active {
          background: $bg-secondary;
          color: $primary-color;
        }
      }

    .mobile-language {
      display: flex;
      gap: $spacing-sm;
      padding: $spacing-lg;
      border-top: 1px solid $border-color;

      .language-btn {
        flex: 1;
        padding: $spacing-sm $spacing-md;
        border: 1px solid $border-color;
        border-radius: $border-radius-base;
        background: $bg-primary;
        color: $text-primary;
        font-size: $font-size-sm;
        cursor: pointer;
        transition: all $transition-base $transition-ease;

        &:hover {
          border-color: $primary-color;
          color: $primary-color;
        }

        &.is-active {
          background: $primary-color;
          border-color: $primary-color;
          color: $text-inverse;
        }
      }
    }
  }
}

// 动画
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all $transition-base $transition-ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

