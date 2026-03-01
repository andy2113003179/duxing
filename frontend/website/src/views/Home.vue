<template>
  <div class="home-page">
    <!-- 轮播图 Banner -->
    <Banner position="home" />

      <!-- 公司优势 -->
      <section class="page-section advantages-section">
        <div class="container">
          <div class="section-title">
            <h2>为什么选择我们</h2>
            <p>专业团队 · 先进设备 · 优质服务</p>
          </div>

          <div class="advantages-grid">
            <div
              v-for="(item, index) in advantages"
              :key="index"
              class="advantage-item fade-in-up"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="advantage-icon">
                <el-icon :size="48"><component :is="item.icon" /></el-icon>
              </div>
              <h3 class="advantage-title">{{ item.title }}</h3>
              <p class="advantage-desc">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 产品展示 -->
      <section class="page-section products-section" style="background: #f9fafb;">
        <div class="container">
          <div class="section-title">
            <h2>热门产品</h2>
            <p>优质覆膜纸产品，满足您的多样化需求</p>
          </div>

          <!-- 产品列表 -->
          <div v-if="!productsLoading && featuredProducts.length" class="products-grid">
            <ProductCard
              v-for="product in featuredProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- 加载状态 -->
          <div v-if="productsLoading" class="loading">
            <el-skeleton :rows="3" animated />
          </div>

          <!-- 查看更多 -->
          <div class="text-center mt-xl">
            <router-link to="/products">
              <el-button type="primary" size="large">
                查看全部产品
                <el-icon class="ml-2"><ArrowRight /></el-icon>
              </el-button>
            </router-link>
          </div>
        </div>
      </section>

      <!-- 工厂实力 -->
      <section class="page-section factory-section">
        <div class="container">
          <div class="section-title">
            <h2>工厂实力</h2>
            <p>先进的生产设备，专业的技术团队</p>
          </div>

          <div class="factory-stats">
            <div
              v-for="(stat, index) in factoryStats"
              :key="index"
              class="stat-item"
            >
              <div class="stat-number">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>

          <div class="factory-images">
            <div
              class="factory-image-item"
            >
              <img :src="shengchan" :alt="生产车间" />
              <div class="factory-image-item-title">生产车间</div>
            </div>
            <div
              class="factory-image-item"
            >
              <img :src="cangku" :alt="质检区域" />
              <div class="factory-image-item-title">质检区域</div>
            </div>
            <div
              class="factory-image-item"
            >
              <img :src="wuliu" :alt="仓储物流" />
              <div class="factory-image-item-title">仓储物流</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA 区域 -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>准备好开始合作了吗？</h2>
            <p>联系我们，获取专业的解决方案和报价</p>
            <div class="cta-actions">
              <router-link to="/contact">
                <el-button type="primary" size="large">立即联系</el-button>
              </router-link>
              <router-link to="/products">
                <el-button size="large">浏览产品</el-button>
              </router-link>
            </div>
          </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import shengchan from '@/assets/img/shengchan.jpg'
import cangku from '@/assets/img/cangku.png'
import wuliu from '@/assets/img/wuliu.png'
import { ref, onMounted } from 'vue'
import Banner from '@/components/Common/Banner.vue'
import ProductCard from '@/components/Common/ProductCard.vue'
import { getProductList } from '@/api/product'
import {
  Medal,
  Trophy,
  Service,
  Checked,
  ArrowRight
} from '@element-plus/icons-vue'

// 公司优势
const advantages = [
  {
    icon: Medal,
    title: '品质保证',
    description: '严格的质量管理体系，确保每一件产品都符合标准'
  },
  {
    icon: Trophy,
    title: '技术领先',
    description: '引进国际先进生产设备，技术处于行业领先水平'
  },
  {
    icon: Service,
    title: '贴心服务',
    description: '专业的售前售后服务团队，及时响应客户需求'
  },
  {
    icon: Checked,
    title: '值得信赖',
    description: '多年行业经验，服务众多知名企业，口碑良好'
  }
]

// 产品数据
const featuredProducts = ref([])
const productsLoading = ref(true)

// 工厂数据
const factoryStats = [
  { value: '2005', label: '成立于' },
  { value: '20000+', label: '生产面积(㎡)' },
  { value: '120+', label: '专业团队' },
  { value: '1000+', label: '合作客户' }
]

const factoryImages = [
  { url: '@/assets/img/shengchan.jpg', alt: '生产车间' },
  { url: '@/assets/img/cangku.png', alt: '质检区域' },
  { url: '@/assets/img/wuliu.png', alt: '仓储物流' }
]

// 获取推荐产品
const fetchFeaturedProducts = async () => {
  productsLoading.value = true
  try {
    const res = await getProductList({
      is_featured: true,
      status: 'published',
      page: 1,
      pageSize: 6
    })
    featuredProducts.value = res.data?.items || []
    console.log('推荐产品数据:', featuredProducts.value) // 调试日志
  } catch (error) {
    console.error('获取推荐产品失败:', error)
  } finally {
    productsLoading.value = false
  }
}

onMounted(() => {
  console.log('Home 页面已挂载') // 调试日志
  fetchFeaturedProducts()
})
</script>

<style lang="scss" scoped>
.home-page {
  width: 100%;
}

// 公司优势区块
.advantages-section {
  .advantages-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-2xl;

    @include respond-to('lg') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to('sm') {
      grid-template-columns: 1fr;
      gap: $spacing-xl;
    }
  }

  .advantage-item {
    text-align: center;
    padding: $spacing-xl;
    border-radius: $border-radius-lg;
    @include transition(transform, box-shadow);

    &:hover {
      transform: translateY(-8px);
      box-shadow: $shadow-lg;
    }

    .advantage-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 96px;
      height: 96px;
      margin: 0 auto $spacing-lg;
      border-radius: $border-radius-full;
      background: linear-gradient(135deg, $primary-light 0%, $primary-color 100%);
      color: $text-inverse;
    }

    .advantage-title {
      font-size: $font-size-xl;
      font-weight: $font-weight-semibold;
      color: $text-primary;
      margin-bottom: $spacing-md;
    }

    .advantage-desc {
      font-size: $font-size-base;
      color: $text-secondary;
      line-height: $line-height-relaxed;
    }
  }
}

// 产品展示区块
.products-section {
  .products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-2xl;

    @include respond-to('lg') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to('sm') {
      grid-template-columns: 1fr;
    }
  }

  .ml-2 {
    margin-left: 8px;
  }
}

// 工厂实力区块
.factory-section {
  .factory-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-2xl;
    margin-bottom: $spacing-4xl;

    @include respond-to('md') {
      grid-template-columns: repeat(2, 1fr);
      gap: $spacing-xl;
    }

    .stat-item {
      text-align: center;
      padding: $spacing-xl;
      background: $bg-secondary;
      border-radius: $border-radius-lg;

      .stat-number {
        font-size: $font-size-4xl;
        font-weight: $font-weight-bold;
        color: $primary-color;
        margin-bottom: $spacing-sm;
      }

      .stat-label {
        font-size: $font-size-base;
        color: $text-secondary;
      }
    }
  }

  .factory-images {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-lg;

    @include respond-to('md') {
      grid-template-columns: 1fr;
    }

    .factory-image-item {
      border-radius: $border-radius-lg;
      overflow: hidden;
      aspect-ratio: 4 / 3;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform $transition-slow $transition-ease;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .factory-image-item-title {
      font-size: $font-size-xl;
      font-weight: $font-weight-semibold;
      position: absolute;
      text-align: center;
      margin-top: $spacing-lg;
      color: $text-primary;
    }
  }
}

// CTA 区块
.cta-section {
  padding: $spacing-4xl 0;
  background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);
  color: $text-inverse;

  @include respond-to('md') {
    padding: $spacing-3xl 0;
  }

  .cta-content {
    text-align: center;

    h2 {
      font-size: $font-size-4xl;
      font-weight: $font-weight-bold;
      margin-bottom: $spacing-lg;

      @include respond-to('md') {
        font-size: $font-size-3xl;
      }
    }

    p {
      font-size: $font-size-xl;
      margin-bottom: $spacing-2xl;
      opacity: 0.9;

      @include respond-to('md') {
        font-size: $font-size-lg;
      }
    }

    .cta-actions {
      @include flex-center;
      gap: $spacing-lg;

      @include respond-to('sm') {
        flex-direction: column;
      }

      .el-button {
        min-width: 180px;

        @include respond-to('sm') {
          width: 100%;
        }
      }
    }
  }
}
</style>

