<template>
  <div class="contact-page">
    <!-- 页面头部 -->
    <div class="page-header">
        <div class="container">
          <h1 class="page-title">联系我们</h1>
          <p class="page-subtitle">我们随时为您服务</p>
        </div>
      </div>

      <!-- 联系信息 -->
      <section class="page-section">
        <div class="container">
          <div class="contact-grid">
            <div
              v-for="(contact, index) in contacts"
              :key="index"
              class="contact-card"
            >
              <div class="contact-icon">
                <el-icon :size="32"><component :is="contact.icon" /></el-icon>
              </div>
              <h3>{{ contact.title }}</h3>
              <p>{{ contact.content }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { Phone, Message, Location, Clock } from '@element-plus/icons-vue'

const contacts = [
  {
    icon: Phone,
    title: '联系电话',
    content: '15192958777'
  },
  {
    icon: Message,
    title: '电子邮箱',
    content: 'info@duxing.com'
  },
  {
    icon: Location,
    title: '公司地址',
    content: '山东省临沂市兰山区半程镇工业园任家村南'
  },
  {
    icon: Clock,
    title: '工作时间',
    content: '周一至周六 8:00-18:00'
  }
]
</script>

<style lang="scss" scoped>
.contact-page {
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

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-2xl;

    @include respond-to('md') {
      grid-template-columns: 1fr;
    }

    .contact-card {
      @include card;
      text-align: center;

      .contact-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        margin: 0 auto $spacing-lg;
        border-radius: $border-radius-full;
        background: $primary-color;
        color: $text-inverse;
      }

      h3 {
        font-size: $font-size-xl;
        margin-bottom: $spacing-md;
      }

      p {
        font-size: $font-size-base;
        color: $text-secondary;
      }
    }
  }
}
</style>

