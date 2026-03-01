<template>
  <div class="products-page">
    <!-- 页面头部 -->
    <div class="page-header">
        <div class="container">
          <h1 class="page-title">产品中心</h1>
          <p class="page-subtitle">优质覆膜纸产品</p>
        </div>
      </div>

      <div class="page-section">
        <div class="container">
          <!-- 筛选区域 -->
          <!-- <div class="filter-section">
            <el-button-group>
              <el-button
                :type="!currentCategory ? 'primary' : ''"
                @click="filterByCategory(null)"
              >
                全部产品
              </el-button>
              <el-button
                v-for="cat in categories"
                :key="cat.id"
                :type="currentCategory === cat.id ? 'primary' : ''"
                @click="filterByCategory(cat.id)"
              >
                {{ cat.name }}
              </el-button>
            </el-button-group>
          </div> -->

          <!-- 产品列表 -->
          <div v-if="!loading && products.length" class="products-grid">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
          </div>

          <!-- 加载状态 -->
          <div v-if="loading" class="loading">
            <el-skeleton :rows="6" animated />
          </div>

          <!-- 空状态 -->
          <div v-if="!loading && !products.length" class="empty">
            <el-empty description="暂无产品" />
          </div>

          <!-- 分页 -->
          <div v-if="!loading && pagination.total > pagination.pageSize" class="pagination">
            <el-pagination
              v-model:current-page="pagination.page"
              v-model:page-size="pagination.pageSize"
              :total="pagination.total"
              :page-sizes="[12, 24, 36]"
              layout="total, sizes, prev, pager, next, jumper"
              @current-change="handlePageChange"
              @size-change="handleSizeChange"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import ProductCard from '@/components/Common/ProductCard.vue'
  import { getProductList } from '@/api/product'

const route = useRoute()
const router = useRouter()

const products = ref([])
const categories = ref([
  { id: 1, name: '镀铝覆膜纸' },
  { id: 2, name: '彩色覆膜纸' },
  { id: 3, name: '透明覆膜纸' }
])
const loading = ref(true)
const currentCategory = ref(null)
const pagination = ref({
  page: 1,
  pageSize: 12,
  total: 0
})

// 获取产品列表
const fetchProducts = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.value.page,
      pageSize: pagination.value.pageSize,
      status: 'published'
    }

    if (currentCategory.value) {
      params.category_id = currentCategory.value
    }

    const res = await getProductList(params)
    products.value = res.data?.items || []
    pagination.value.total = res.data?.pagination?.total || 0
  } catch (error) {
    console.error('获取产品列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 按分类筛选
const filterByCategory = (categoryId) => {
  currentCategory.value = categoryId
  pagination.value.page = 1
  fetchProducts()
}

// 页码变化
const handlePageChange = () => {
  fetchProducts()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 每页数量变化
const handleSizeChange = () => {
  pagination.value.page = 1
  fetchProducts()
}

onMounted(() => {
  // 从URL参数获取分类ID
  const categoryId = route.query.category
  if (categoryId) {
    currentCategory.value = parseInt(categoryId)
  }
  fetchProducts()
})
</script>

<style lang="scss" scoped>
.products-page {
  .page-header {
    padding: $spacing-4xl 0 $spacing-3xl;
    background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);
    color: $text-inverse;
    text-align: center;

    .page-title {
      font-size: $font-size-5xl;
      font-weight: $font-weight-bold;
      margin-bottom: $spacing-md;
    }

    .page-subtitle {
      font-size: $font-size-xl;
      opacity: 0.9;
    }
  }

  .filter-section {
    margin-bottom: $spacing-2xl;
    display: flex;
    justify-content: center;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-2xl;
    margin-bottom: $spacing-3xl;

    @include respond-to('lg') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to('sm') {
      grid-template-columns: 1fr;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: $spacing-2xl;
  }
}
</style>

