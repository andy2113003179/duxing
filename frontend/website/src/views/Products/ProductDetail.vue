<template>
  <div class="product-detail-page">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
        <el-skeleton :rows="10" animated />
      </div>

      <!-- 产品详情 -->
      <div v-else-if="product" class="page-section">
        <div class="container">
          <div class="product-detail">
            <!-- 产品图片 -->
            <div class="product-images">
              <img :src="productImage" :alt="product.name" />
            </div>

            <!-- 产品信息 -->
            <div class="product-info">
              <div v-if="product.category" class="product-category">
                {{ product.category.name }}
              </div>
              <h1 class="product-name">{{ product.name }}</h1>
              <p class="product-description">{{ product.description }}</p>

              <!-- 产品特点 -->
              <div v-if="product.features && product.features.length" class="product-features">
                <h3>产品特点</h3>
                <ul>
                  <li v-for="(feature, index) in product.features" :key="index">
                    <el-icon><Check /></el-icon>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <!-- 产品规格 -->
              <div v-if="product.specifications" class="product-specs">
                <h3>产品规格</h3>
                <el-descriptions :column="1" border>
                  <el-descriptions-item
                    v-for="(value, key) in product.specifications"
                    :key="key"
                    :label="key"
                  >
                    {{ value }}
                  </el-descriptions-item>
                </el-descriptions>
              </div>

              <!-- 操作按钮 -->
              <div class="product-actions">
                <router-link to="/contact">
                  <el-button type="primary" size="large">立即咨询</el-button>
                </router-link>
                <el-button size="large" @click="goBack">返回列表</el-button>
              </div>
            </div>
          </div>

          <!-- 产品内容 -->
          <div v-if="product.content" class="product-content">
            <h2>产品详情</h2>
            <div class="content-text" v-html="product.content"></div>
          </div>
        </div>
      </div>

      <!-- 错误状态 -->
      <div v-else class="error-container">
        <el-empty description="产品不存在" />
        <el-button type="primary" @click="goBack">返回列表</el-button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { getProductById, increaseProductView } from '@/api/product'
  import { Check } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const product = ref(null)
const loading = ref(true)

const productImage = computed(() => {
  if (product.value?.cover_image) {
    if (product.value.cover_image.startsWith('http')) {
      return product.value.cover_image
    }
    return `${import.meta.env.VITE_API_BASE_URL || ''}${product.value.cover_image}`
  }
  return 'https://via.placeholder.com/800x600/cccccc/666666?text=Product+Image'
})

const fetchProduct = async () => {
  loading.value = true
  try {
    const productId = route.params.id
    const res = await getProductById(productId)
    product.value = res.data

    // 增加浏览量
    increaseProductView(productId).catch(err => {
      console.error('增加浏览量失败:', err)
    })
  } catch (error) {
    console.error('获取产品详情失败:', error)
    product.value = null
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/products')
}

onMounted(() => {
  fetchProduct()
})
</script>

<style lang="scss" scoped>
.product-detail-page {
  .loading-container,
  .error-container {
    min-height: 400px;
    @include flex-center;
    @include flex-column;
  }

  .product-detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-4xl;
    margin-bottom: $spacing-4xl;

    @include respond-to('md') {
      grid-template-columns: 1fr;
      gap: $spacing-2xl;
    }

    .product-images {
      img {
        width: 100%;
        border-radius: $border-radius-lg;
      }
    }

    .product-info {
      .product-category {
        display: inline-block;
        padding: 4px 12px;
        background: $primary-color;
        color: $text-inverse;
        border-radius: $border-radius-base;
        font-size: $font-size-sm;
        margin-bottom: $spacing-md;
      }

      .product-name {
        font-size: $font-size-4xl;
        font-weight: $font-weight-bold;
        margin-bottom: $spacing-lg;
      }

      .product-description {
        font-size: $font-size-lg;
        color: $text-secondary;
        line-height: $line-height-relaxed;
        margin-bottom: $spacing-2xl;
      }

      .product-features,
      .product-specs {
        margin-bottom: $spacing-2xl;

        h3 {
          font-size: $font-size-xl;
          margin-bottom: $spacing-lg;
        }

        ul {
          list-style: none;
          padding: 0;

          li {
            display: flex;
            align-items: center;
            gap: $spacing-sm;
            padding: $spacing-sm 0;
            font-size: $font-size-base;

            .el-icon {
              color: $success-color;
            }
          }
        }
      }

      .product-actions {
        display: flex;
        gap: $spacing-lg;
        margin-top: $spacing-2xl;
      }
    }
  }

  .product-content {
    padding-top: $spacing-4xl;
    border-top: 1px solid $border-color;

    h2 {
      font-size: $font-size-3xl;
      margin-bottom: $spacing-xl;
    }

    .content-text {
      font-size: $font-size-base;
      line-height: $line-height-relaxed;
      color: $text-secondary;
    }
  }
}
</style>

