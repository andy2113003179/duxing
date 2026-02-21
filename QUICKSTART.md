# 都兴工贸官网 - 快速启动指南

## ✅ 已修复和新增功能

### 🐛 Bug 修复
- ✅ **修复 SASS mixin 未定义错误**
  - 在 `vite.config.js` 中同时导入 `variables.scss` 和 `mixins.scss`
  - 现在所有组件都可以正常使用 `@include respond-to()` 等 mixins

### 🌍 国际化支持
- ✅ **添加 vue-i18n 国际化插件**
- ✅ **支持中文和英文切换**
- ✅ **语言持久化（保存到 localStorage）**
- ✅ **自动检测浏览器语言**
- ✅ **桌面端和移动端语言切换UI**

### 📱 响应式优化
- ✅ **完善的响应式设计**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- ✅ **响应式工具函数库**
  - `useBreakpoint()` - 设备类型检测
  - `useScroll()` - 滚动监听
  - `useTouch()` - 触摸手势
  - `useDebounce()` - 防抖
  - `useThrottle()` - 节流
  - `useLazyLoad()` - 图片懒加载

## 🚀 启动项目

### 1. 后端服务

```bash
# 进入后端目录
cd F:\自定义项目\duxing\backend

# 安装依赖
npm install

# 创建 .env 文件（如果还没有）
# 复制以下内容到 backend/.env 文件：
PORT=3000
NODE_ENV=development
DB_PATH=./database/duxing.db
JWT_SECRET=duxing-secret-key-2026
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png,image/gif,image/webp
CORS_ORIGIN=http://localhost:5173,http://localhost:5174

# 初始化数据库
npm run init-db

# 启动开发服务器
npm run dev
```

服务器将在 `http://localhost:3000` 启动

**默认管理员账号：**
- 用户名：`admin`
- 密码：`123456`

### 2. 前端服务

```bash
# 打开新终端，进入前端目录
cd F:\自定义项目\duxing\frontend\website

# 安装依赖（包含新增的 vue-i18n）
npm install

# 启动开发服务器
npm run dev
```

前端将在 `http://localhost:5173` 启动

## 🌍 使用国际化

### 在浏览器中切换语言

1. **桌面端**：点击导航栏右侧的语言切换按钮（🇨🇳 简体中文 / 🇺🇸 English）
2. **移动端**：打开移动菜单后，底部会显示语言切换按钮

### 在代码中使用国际化

#### 在模板中使用

```vue
<template>
  <!-- 使用 $t 函数 -->
  <h1>{{ $t('home.title') }}</h1>
  <p>{{ $t('home.subtitle') }}</p>
</template>
```

#### 在脚本中使用

```vue
<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 使用 t 函数
console.log(t('home.title'))
</script>
```

#### 使用 i18n Store

```vue
<script setup>
import { useI18nStore } from '@/stores/i18n'

const i18nStore = useI18nStore()

// 切换语言
const switchLanguage = () => {
  i18nStore.setLanguage('en-US') // 切换到英文
}

// 切换到下一个语言
const toggleLanguage = () => {
  i18nStore.toggleLanguage()
}
</script>
```

## 📱 响应式开发

### 使用响应式工具

```vue
<script setup>
import { useBreakpoint, useScroll } from '@/utils/responsive'

// 设备类型检测
const { isMobile, isTablet, isDesktop, width } = useBreakpoint()

// 滚动监听
const { scrollY, isScrolled } = useScroll()

// 根据设备类型执行不同逻辑
watch(isMobile, (value) => {
  if (value) {
    console.log('切换到移动端')
  }
})
</script>

<template>
  <div class="responsive-component">
    <!-- 根据设备显示不同内容 -->
    <div v-if="isMobile">移动端内容</div>
    <div v-else-if="isTablet">平板内容</div>
    <div v-else>桌面端内容</div>
    
    <!-- 根据滚动状态改变样式 -->
    <header :class="{ 'is-scrolled': isScrolled }">
      导航栏
    </header>
  </div>
</template>
```

### 在样式中使用响应式

```scss
<style lang="scss" scoped>
.my-component {
  padding: 40px;
  
  // 平板及以下
  @include respond-to('md') {
    padding: 24px;
  }
  
  // 手机
  @include respond-to('sm') {
    padding: 16px;
  }
}
</style>
```

## 🎨 可用的 SCSS Mixins

```scss
// 响应式断点
@include respond-to('xs');  // < 480px
@include respond-to('sm');  // < 640px
@include respond-to('md');  // < 768px
@include respond-to('lg');  // < 1024px
@include respond-to('xl');  // < 1280px

// 容器
@include container;

// Flex 布局
@include flex-center;
@include flex-between;
@include flex-column;

// 文本截断
@include text-ellipsis(1);  // 单行
@include text-ellipsis(2);  // 多行

// 过渡动画
@include transition(opacity, transform);

// 卡片样式
@include card;

// 渐变背景
@include gradient-primary;
@include gradient-dark;
```

## 📂 语言文件位置

- 中文：`src/locales/zh-CN.js`
- 英文：`src/locales/en-US.js`

### 添加新的翻译

在两个语言文件中添加相同的 key：

```javascript
// zh-CN.js
export default {
  myFeature: {
    title: '我的功能',
    description: '这是一个新功能'
  }
}

// en-US.js
export default {
  myFeature: {
    title: 'My Feature',
    description: 'This is a new feature'
  }
}
```

## 🔍 测试步骤

### 1. 测试国际化
1. 启动前端项目
2. 点击导航栏的语言切换按钮
3. 验证页面内容是否正确切换
4. 刷新页面，验证语言是否保持

### 2. 测试响应式
1. 在桌面浏览器中打开
2. 使用浏览器开发者工具切换设备
3. 测试 Mobile (375px)、Tablet (768px)、Desktop (1920px)
4. 验证布局和功能是否正常

### 3. 测试移动端
1. 打开手机模拟器（宽度 < 768px）
2. 点击移动端菜单按钮
3. 测试导航菜单
4. 测试语言切换
5. 测试页面滚动和交互

## ⚠️ 注意事项

1. **语言切换会刷新页面**：由于 Element Plus 不支持动态语言切换，切换语言时页面会自动刷新
2. **首次安装需要运行**：`npm install` 以安装 `vue-i18n` 依赖
3. **SASS 错误已修复**：如果之前遇到 mixin 未定义错误，现在应该已经解决

## 📦 新增依赖

```json
{
  "dependencies": {
    "vue-i18n": "^9.9.1"  // ← 新增
  }
}
```

## 🎯 下一步

项目现在已经具备：
- ✅ 完整的前后端功能
- ✅ 国际化支持
- ✅ 响应式设计
- ✅ 商业级代码质量

你可以：
1. 继续开发后台管理系统
2. 优化现有功能
3. 添加更多语言
4. 部署到生产环境

## 📞 遇到问题？

如果遇到任何问题，请检查：
1. Node.js 版本是否 >= 18
2. 所有依赖是否正确安装
3. `.env` 文件是否正确配置
4. 后端服务是否正常运行
5. 浏览器控制台是否有错误信息

祝开发顺利！🚀

