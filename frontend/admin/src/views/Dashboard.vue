<template>
  <div class="dashboard">
    <h2 class="page-title">仪表盘</h2>

    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stat-row">
      <el-col :span="6" v-for="stat in stats" :key="stat.label">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <p class="stat-value">{{ stat.value }}</p>
              <p class="stat-label">{{ stat.label }}</p>
            </div>
            <el-icon class="stat-icon" :style="{ color: stat.color, backgroundColor: stat.bg }">
              <component :is="stat.icon" />
            </el-icon>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 快捷操作 -->
    <el-card class="section-card">
      <template #header>
        <span>快捷操作</span>
      </template>
      <el-row :gutter="16">
        <el-col :span="6" v-for="action in actions" :key="action.label">
          <div class="action-card" @click="$router.push(action.path)">
            <el-icon :style="{ color: action.color }"><component :is="action.icon" /></el-icon>
            <span>{{ action.label }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 系统信息 -->
    <el-card class="section-card">
      <template #header>
        <span>系统信息</span>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="系统名称">都兴工贸官网管理系统</el-descriptions-item>
        <el-descriptions-item label="系统版本">v1.0.0</el-descriptions-item>
        <el-descriptions-item label="前端框架">Vue 3 + Element Plus</el-descriptions-item>
        <el-descriptions-item label="后端框架">Node.js + Express</el-descriptions-item>
        <el-descriptions-item label="数据库">SQLite</el-descriptions-item>
        <el-descriptions-item label="ORM">Sequelize</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { bannerApi, productApi, contactApi, companyApi } from '@/api'

const stats = ref([
  { label: '轮播图', value: '-', icon: 'PictureFilled', color: '#409eff', bg: '#ecf5ff' },
  { label: '产品数量', value: '-', icon: 'Box', color: '#67c23a', bg: '#f0f9eb' },
  { label: '联系记录', value: '-', icon: 'ChatDotRound', color: '#e6a23c', bg: '#fdf6ec' },
  { label: '公司信息', value: '已配置', icon: 'OfficeBuilding', color: '#909399', bg: '#f4f4f5' },
])

const actions = [
  { label: '编辑公司信息', icon: 'Edit', color: '#409eff', path: '/company' },
  { label: '管理轮播图', icon: 'PictureFilled', color: '#67c23a', path: '/banners' },
  { label: '管理产品', icon: 'Box', color: '#e6a23c', path: '/products' },
  { label: '联系方式', icon: 'Phone', color: '#f56c6c', path: '/contacts' },
]

onMounted(async () => {
  try {
    const [bannerRes, productRes, contactRes] = await Promise.allSettled([
      bannerApi.list({ page: 1, limit: 1 }),
      productApi.list({ page: 1, limit: 1 }),
      contactApi.list({ page: 1, limit: 1 }),
    ])

    if (bannerRes.status === 'fulfilled') stats.value[0].value = bannerRes.value.data?.pagination?.total ?? '-'
    if (productRes.status === 'fulfilled') stats.value[1].value = productRes.value.data?.pagination?.total ?? '-'
    if (contactRes.status === 'fulfilled') stats.value[2].value = contactRes.value.data?.pagination?.total ?? '-'
  } catch { /* ignore */ }
})
</script>

<style lang="scss" scoped>
.dashboard {
  .page-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #303133;
  }

  .stat-row {
    margin-bottom: 20px;
  }

  .stat-card {
    .stat-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .stat-value {
      font-size: 28px;
      font-weight: bold;
      color: #303133;
    }

    .stat-label {
      font-size: 13px;
      color: #909399;
      margin-top: 4px;
    }

    .stat-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
    }
  }

  .section-card {
    margin-bottom: 20px;
  }

  .action-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 24px 0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    background: #fafafa;

    &:hover {
      background: #f0f7ff;
      transform: translateY(-2px);
    }

    .el-icon {
      font-size: 32px;
    }

    span {
      font-size: 13px;
      color: #606266;
    }
  }
}
</style>
