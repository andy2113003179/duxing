<template>
  <Layout />
</template>


<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { useCompanyStore } from '@/stores/company'
import Layout from '@/components/Layout/Layout.vue'

const appStore = useAppStore()
const companyStore = useCompanyStore()

onMounted(() => {
  // 初始化应用
  appStore.initApp()
  
  // 加载公司信息
  companyStore.fetchCompanyInfo().catch(err => {
    console.error('加载公司信息失败:', err)
  })
})
</script>

<style lang="scss">
// 全局样式已在 main.js 中导入
// 这里可以添加应用级别的特殊样式

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>

