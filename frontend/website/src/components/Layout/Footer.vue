<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="container">
        <div class="footer-grid">
          <!-- 公司信息 -->
          <div class="footer-section">
            <h3 class="footer-title">{{ companyStore.companyName }}</h3>
            <p class="footer-desc">{{ companyStore.companyDesc }}</p>
          </div>

          <!-- 快速链接 -->
          <div class="footer-section">
            <h3 class="footer-title">快速链接</h3>
            <ul class="footer-links">
              <li v-for="item in quickLinks" :key="item.path">
                <router-link :to="item.path">{{ item.label }}</router-link>
              </li>
            </ul>
          </div>

          <!-- 产品分类 -->
          <div class="footer-section">
            <h3 class="footer-title">产品分类</h3>
            <ul class="footer-links">
              <li v-for="item in productLinks" :key="item.path">
                <router-link :to="item.path">{{ item.label }}</router-link>
              </li>
            </ul>
          </div>

          <!-- 联系方式 -->
          <div class="footer-section">
            <h3 class="footer-title">联系我们</h3>
            <ul class="footer-contact">
              <li v-if="contactInfo.phone">
                <el-icon><Phone /></el-icon>
                <span>{{ contactInfo.phone }}</span>
              </li>
              <li v-if="contactInfo.email">
                <el-icon><Message /></el-icon>
                <span>{{ contactInfo.email }}</span>
              </li>
              <li v-if="contactInfo.address">
                <el-icon><Location /></el-icon>
                <span>{{ contactInfo.address }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 版权信息 -->
    <div class="footer-bottom">
      <div class="container">
        <div class="copyright">
          鲁ICP备18057312号·鲁ICP备18057312号-1
          <p>&copy; {{ currentYear }} {{ companyStore.companyName }}. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCompanyStore } from '@/stores/company'
import { Phone, Message, Location } from '@element-plus/icons-vue'

const companyStore = useCompanyStore()

// 当前年份
const currentYear = computed(() => new Date().getFullYear())

// 快速链接
const quickLinks = [
  { path: '/', label: '首页' },
  { path: '/about', label: '公司介绍' },
  { path: '/products', label: '产品中心' },
  { path: '/contact', label: '联系我们' }
]

// 产品链接（示例）
const productLinks = [
  { path: '/products?category=2', label: '彩色覆膜纸' }
]

// 联系信息
const contactInfo = ref({
  phone: '0539-2919777',
  email: '1793775728@qq.com',
  address: '山东省临沂市兰山区半程镇工业园任家村南'
})
</script>

<style lang="scss" scoped>
.site-footer {
  background: $bg-dark;
  color: rgba(255, 255, 255, 0.8);
  margin-top: auto;
}

.footer-content {
  padding: $spacing-4xl 0 $spacing-3xl;

  @include respond-to('md') {
    padding: $spacing-3xl 0 $spacing-2xl;
  }
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-3xl;

  @include respond-to('lg') {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-2xl;
  }

  @include respond-to('sm') {
    grid-template-columns: 1fr;
    gap: $spacing-xl;
  }
}

.footer-section {
  .footer-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $text-inverse;
    margin-bottom: $spacing-lg;
  }

  .footer-desc {
    font-size: $font-size-sm;
    line-height: $line-height-relaxed;
    color: rgba(255, 255, 255, 0.6);
  }
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: $spacing-sm;

    a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: $font-size-sm;
      transition: color $transition-base $transition-ease;

      &:hover {
        color: $text-inverse;
      }
    }
  }
}

.footer-contact {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
    font-size: $font-size-sm;
    color: rgba(255, 255, 255, 0.7);

    .el-icon {
      margin-top: 2px;
      color: $accent-color;
    }
  }
}

.footer-bottom {
  padding: $spacing-lg 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  .copyright {
    text-align: center;

    p {
      font-size: $font-size-sm;
      color: rgba(255, 255, 255, 0.5);
      margin: 0;
    }
  }
}
</style>

