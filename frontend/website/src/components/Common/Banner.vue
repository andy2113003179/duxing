<template>
  <div class="banner-carousel">
    <el-carousel
      :interval="5000"
      :height="bannerHeight"
      arrow="hover"
      indicator-position="none"
      @change="handleCarouselChange"
    >
      <el-carousel-item v-for="(banner, index) in banners" :key="banner.id">
        <div class="banner-item" :style="{ backgroundImage: `url(${getBannerImage(banner)})` }">
          <!-- 遮罩层 -->
          <div class="banner-overlay"></div>

          <!-- 内容 -->
          <div class="banner-content">
            <div class="container">
              <div class="banner-text" :class="`slide-${index % 3}`">
                <h2 v-if="banner.title" class="banner-title">
                  {{ banner.title }}
                </h2>
                <p v-if="banner.subtitle" class="banner-subtitle">
                  {{ banner.subtitle }}
                </p>
                <div v-if="banner.link" class="banner-actions">
                  <router-link :to="banner.link" class="btn btn-primary btn-lg">
                    了解更多
                    <el-icon class="ml-2"><ArrowRight /></el-icon>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 自定义指示器 -->
    <div v-if="banners.length > 1" class="banner-indicators">
      <div class="container">
        <div class="indicators-wrapper">
          <button
            v-for="(banner, index) in banners"
            :key="banner.id"
            class="indicator-dot"
            :class="{ 'is-active': currentIndex === index }"
            @click="changeSlide(index)"
            :aria-label="`跳转到第${index + 1}张轮播图`"
          ></button>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="banner-loading">
      <el-skeleton :rows="0" animated :loading="true" style="height: 100%">
        <template #template>
          <div style="height: 100%; background: #f5f7fa"></div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getBannerList } from '@/api/banner'
import { ArrowRight } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// Props
const props = defineProps({
  position: {
    type: String,
    default: 'home'
  },
  height: {
    type: String,
    default: '' // 如果不指定，使用响应式高度
  }
})

// 数据
const banners = ref([])
const loading = ref(true)
const currentIndex = ref(0)

// 轮播图高度
const bannerHeight = computed(() => {
  if (props.height) {
    return props.height
  }
  // 响应式高度
  if (appStore.isMobile) {
    return '400px'
  } else if (appStore.isTablet) {
    return '500px'
  }
  return '600px'
})

// 获取轮播图数据
const fetchBanners = async () => {
  loading.value = true
  try {
    const res = await getBannerList({
      position: props.position,
      status: 'active'
    })
    banners.value = res.data || []
    console.log('轮播图数据:', banners.value) // 调试日志
  } catch (error) {
    console.error('获取轮播图失败:', error)
    banners.value = []
  } finally {
    loading.value = false
  }
}

// 获取轮播图图片
const getBannerImage = (banner) => {
  if (banner.image) {
    // 如果是完整URL，直接返回
    if (banner.image.startsWith('http')) {
      return banner.image
    }
    // 否则拼接API地址
    return `${import.meta.env.VITE_API_BASE_URL || ''}${banner.image}`
  }
  // 默认占位图
  return 'https://via.placeholder.com/1920x600/1a5490/ffffff?text=Banner+Image'
}

// 切换轮播图
const changeSlide = (index) => {
  currentIndex.value = index
  // 这里需要访问 el-carousel 的实例来改变当前项
  // 由于 Element Plus 没有提供直接方法，我们更新索引即可
}

// 轮播图改变事件
const handleCarouselChange = (newIndex) => {
  currentIndex.value = newIndex
}

onMounted(() => {
  fetchBanners()
})
</script>

<style lang="scss" scoped>
.banner-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;

  :deep(.el-carousel) {
    .el-carousel__container {
      height: 100%;
    }
  }
}

.banner-item {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.banner-overlay {
  @include overlay(0.4);
}

.banner-content {
  position: relative;
  height: 100%;
  @include flex-center;
  z-index: 1;

  .container {
    width: 100%;
  }
}

.banner-text {
  color: $text-inverse;
  text-align: center;
  animation: fadeInUp 1s $transition-ease;

  &.slide-1 {
    animation: fadeInUp 1s $transition-ease 0.2s backwards;
  }

  &.slide-2 {
    animation: slideInLeft 1s $transition-ease 0.2s backwards;
  }

  .banner-title {
    font-size: $font-size-5xl;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-lg;
    line-height: $line-height-tight;

    @include respond-to('md') {
      font-size: $font-size-3xl;
    }
  }

  .banner-subtitle {
    font-size: $font-size-xl;
    font-weight: $font-weight-normal;
    margin-bottom: $spacing-2xl;
    opacity: 0.95;

    @include respond-to('md') {
      font-size: $font-size-lg;
      margin-bottom: $spacing-xl;
    }
  }

  .banner-actions {
    @include flex-center;
    gap: $spacing-lg;

    .btn {
      min-width: 180px;

      @include respond-to('md') {
        min-width: 140px;
      }
    }

    .ml-2 {
      margin-left: 8px;
    }
  }
}

// 自定义指示器
.banner-indicators {
  position: absolute;
  bottom: $spacing-2xl;
  left: 0;
  right: 0;
  z-index: 2;

  @include respond-to('md') {
    bottom: $spacing-lg;
  }

  .indicators-wrapper {
    @include flex-center;
    gap: $spacing-md;
  }

  .indicator-dot {
    width: 12px;
    height: 12px;
    border-radius: $border-radius-full;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all $transition-base $transition-ease;

    &:hover {
      background: rgba(255, 255, 255, 0.8);
      transform: scale(1.2);
    }

    &.is-active {
      width: 32px;
      background: $text-inverse;
    }
  }
}

// 加载状态
.banner-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
</style>

