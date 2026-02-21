<template>
  <div class="not-found-page">
    <div class="container">
        <div class="not-found-content">
          <div class="error-code">404</div>
          <h1 class="error-title">页面不存在</h1>
          <p class="error-desc">抱歉，您访问的页面不存在或已被删除</p>
          <div class="error-actions">
            <router-link to="/">
              <el-button type="primary" size="large">返回首页</el-button>
            </router-link>
            <el-button size="large" @click="goBack">返回上一页</el-button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.not-found-page {
  min-height: calc(100vh - #{$header-height} - #{$footer-height});
  @include flex-center;
  padding: $spacing-4xl 0;

  .not-found-content {
    text-align: center;

    .error-code {
      font-size: 120px;
      font-weight: $font-weight-bold;
      color: $primary-color;
      line-height: 1;
      margin-bottom: $spacing-lg;
    }

    .error-title {
      font-size: $font-size-3xl;
      font-weight: $font-weight-semibold;
      margin-bottom: $spacing-md;
    }

    .error-desc {
      font-size: $font-size-lg;
      color: $text-secondary;
      margin-bottom: $spacing-2xl;
    }

    .error-actions {
      @include flex-center;
      gap: $spacing-lg;
    }
  }
}
</style>

