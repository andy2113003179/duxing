<template>
  <div class="product-card" @click="handleClick">
    <div class="product-image">
      <img :src="productImage" :alt="product.name" />
      
      <!-- 推荐标签 -->
      <div v-if="product.is_featured" class="featured-badge">
        <el-icon><Star /></el-icon>
        <span>推荐</span>
      </div>

      <!-- 遮罩层 -->
      <div class="image-overlay">
        <div class="overlay-content">
          <el-button type="primary" circle>
            <el-icon><View /></el-icon>
          </el-button>
        </div>
      </div>
    </div>

    <div class="product-info">
      <!-- 分类标签 -->
      <div v-if="product.category" class="product-category">
        {{ product.category.name }}
      </div>

      <!-- 产品名称 -->
      <h3 class="product-name">{{ product.name }}</h3>

      <!-- 产品描述 -->
      <p v-if="product.description" class="product-desc">
        {{ truncateText(product.description, 80) }}
      </p>

      <!-- 产品特点 -->
      <div v-if="product.features && product.features.length" class="product-features">
        <el-tag
          v-for="(feature, index) in product.features.slice(0, 3)"
          :key="index"
          size="small"
          effect="plain"
        >
          {{ feature }}
        </el-tag>
      </div>

      <!-- 查看详情按钮 -->
      <div class="product-actions">
        <el-button type="primary" text>
          查看详情
          <el-icon class="ml-1"><ArrowRight /></el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Star, View, ArrowRight } from '@element-plus/icons-vue'

const router = useRouter()

// Props
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Emits
const emit = defineEmits(['click'])

// 产品图片
const productImage = computed(() => {
  if (props.product.cover_image) {
    if (props.product.cover_image.startsWith('http')) {
      return props.product.cover_image
    }
    return `${import.meta.env.VITE_API_BASE_URL || ''}${props.product.cover_image}`
  }
  return 'https://via.placeholder.com/800x600/cccccc/666666?text=Product+Image'
})

// 文本截断
const truncateText = (text, maxLength) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// 点击处理
const handleClick = () => {
  emit('click', props.product)
  router.push(`/products/${props.product.id}`)
}
</script>

<style lang="scss" scoped>
.product-card {
  @include card;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform $transition-base $transition-ease, box-shadow $transition-base $transition-ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;

    .image-overlay {
      opacity: 1;
    }

    .product-image img {
      transform: scale(1.1);
    }
  }
}

.product-image {
  position: relative;
  width: 100%;
  padding-top: 75%; // 4:3 比例
  overflow: hidden;
  background: $bg-secondary;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform $transition-slow $transition-ease;
  }

  .featured-badge {
    position: absolute;
    top: $spacing-md;
    right: $spacing-md;
    @include flex-center;
    gap: 4px;
    padding: 4px 12px;
    background: $warning-color;
    color: $text-inverse;
    border-radius: $border-radius-full;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    z-index: 2;
  }

  .image-overlay {
    @include overlay(0.6);
    @include flex-center;
    opacity: 0;
    transition: opacity $transition-base $transition-ease;
    z-index: 1;

    .overlay-content {
      transform: translateY(20px);
      transition: transform $transition-base $transition-ease;
    }
  }

  &:hover {
    .overlay-content {
      transform: translateY(0);
    }
  }
}

.product-info {
  padding: $spacing-lg;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-category {
  display: inline-block;
  font-size: $font-size-xs;
  color: $primary-color;
  font-weight: $font-weight-medium;
  margin-bottom: $spacing-sm;
}

.product-name {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $text-primary;
  margin-bottom: $spacing-sm;
  @include text-ellipsis(2);
}

.product-desc {
  font-size: $font-size-sm;
  color: $text-secondary;
  line-height: $line-height-relaxed;
  margin-bottom: $spacing-md;
  flex: 1;
}

.product-features {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;

  .el-tag {
    font-size: $font-size-xs;
  }
}

.product-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .ml-1 {
    margin-left: 4px;
  }
}
</style>

