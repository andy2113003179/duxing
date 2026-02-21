<template>
  <div class="website-layout">
    <!-- 头部 -->
    <Header />

    <!-- 主内容区 -->
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <!-- 底部 -->
    <Footer />

    <!-- 返回顶部按钮 -->
    <transition name="fade">
      <button
        v-show="showBackTop"
        class="back-top-btn"
        @click="scrollToTop"
        aria-label="返回顶部"
      >
        <el-icon :size="24"><Top /></el-icon>
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import { Top } from '@element-plus/icons-vue'

// 是否显示返回顶部按钮
const showBackTop = ref(false)

// 滚动处理
const handleScroll = () => {
  showBackTop.value = window.scrollY > 300
}

// 返回顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.website-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-top: $header-height;

  @include respond-to('md') {
    margin-top: $header-height-mobile;
  }
}

// 返回顶部按钮
.back-top-btn {
  position: fixed;
  right: $spacing-xl;
  bottom: $spacing-xl;
  width: 48px;
  height: 48px;
  @include flex-center;
  @include button-reset;
  background: $primary-color;
  color: $text-inverse;
  border-radius: $border-radius-full;
  box-shadow: $shadow-lg;
  cursor: pointer;
  z-index: $z-index-fixed;
  transition: background $transition-base $transition-ease, transform $transition-base $transition-ease;

  @include respond-to('md') {
    right: $spacing-lg;
    bottom: $spacing-lg;
    width: 40px;
    height: 40px;
  }

  &:hover {
    background: $primary-dark;
    transform: translateY(-4px);
  }

  &:active {
    transform: translateY(-2px);
  }
}

// 页面切换动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-base $transition-ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

