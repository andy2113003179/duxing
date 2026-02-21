<template>
  <div class="about-page">
    <!-- 页面头部 -->
    <div class="page-header">
        <div class="container">
          <h1 class="page-title">公司介绍</h1>
          <p class="page-subtitle">了解都兴工贸</p>
        </div>
      </div>

      <!-- 公司简介 -->
      <section class="page-section">
        <div class="container">
          <div class="about-intro">
            <div class="intro-content">
              <h2>关于我们</h2>
              <p v-if="companyStore.info">
                {{ companyStore.info.introduction || companyStore.info.description }}
              </p>
              <p v-else>
                都兴工贸有限公司成立于2010年，是一家专业从事覆膜纸研发、生产、销售的现代化企业。
                公司位于山东省临沂市兰山区半程镇工业园，拥有先进的生产设备和完善的质量管理体系，致力于为客户提供高品质的覆膜纸产品。
              </p>
            </div>
            <div class="intro-image">
              <img src="https://picsum.photos/seed/company/600/400" alt="公司简介" />
            </div>
          </div>
        </div>
      </section>

      <!-- 企业文化 -->
      <section class="page-section" style="background: #f9fafb;">
        <div class="container">
          <div class="section-title">
            <h2>企业文化</h2>
          </div>

          <div class="culture-grid">
            <div v-for="(item, index) in cultureItems" :key="index" class="culture-item">
              <div class="culture-icon">
                <el-icon :size="40"><component :is="item.icon" /></el-icon>
              </div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 联系CTA -->
      <section class="contact-cta">
        <div class="container">
          <h2>期待与您的合作</h2>
          <router-link to="/contact">
            <el-button type="primary" size="large">联系我们</el-button>
          </router-link>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { useCompanyStore } from '@/stores/company'
  import { Flag, Trophy, UserFilled, Lightning } from '@element-plus/icons-vue'

const companyStore = useCompanyStore()

const cultureItems = [
  {
    icon: Flag,
    title: '企业使命',
    content: '为客户提供优质的覆膜纸产品和专业的服务'
  },
  {
    icon: Trophy,
    title: '企业愿景',
    content: '成为行业领先的覆膜纸生产企业'
  },
  {
    icon: UserFilled,
    title: '核心价值观',
    content: '品质第一，客户至上，诚信经营，持续创新'
  },
  {
    icon: Lightning,
    title: '经营理念',
    content: '质量为本，服务至上，合作共赢'
  }
]
</script>

<style lang="scss" scoped>
.about-page {
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

  .about-intro {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-4xl;
    align-items: center;

    @include respond-to('md') {
      grid-template-columns: 1fr;
      gap: $spacing-2xl;
    }

    .intro-content {
      h2 {
        font-size: $font-size-3xl;
        margin-bottom: $spacing-lg;
      }

      p {
        font-size: $font-size-base;
        line-height: $line-height-relaxed;
        color: $text-secondary;
        margin-bottom: $spacing-md;
      }
    }

    .intro-image {
      border-radius: $border-radius-lg;
      overflow: hidden;

      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .culture-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-2xl;

    @include respond-to('lg') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to('sm') {
      grid-template-columns: 1fr;
    }

    .culture-item {
      text-align: center;
      padding: $spacing-2xl;
      background: $bg-primary;
      border-radius: $border-radius-lg;

      .culture-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        margin: 0 auto $spacing-lg;
        border-radius: $border-radius-full;
        background: $bg-secondary;
        color: $primary-color;
      }

      h3 {
        font-size: $font-size-xl;
        margin-bottom: $spacing-md;
      }

      p {
        font-size: $font-size-sm;
        color: $text-secondary;
        line-height: $line-height-relaxed;
      }
    }
  }

  .contact-cta {
    padding: $spacing-4xl 0;
    text-align: center;
    background: $bg-secondary;

    h2 {
      font-size: $font-size-3xl;
      margin-bottom: $spacing-xl;
    }
  }
}
</style>

