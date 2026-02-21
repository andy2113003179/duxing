# 都兴工贸官网 - 前台展示网站（更新版）

基于 Vue3 + Vite + Element Plus 构建的多语言企业官网前台展示系统。

## ✨ 功能特性

- ✅ **响应式设计**，完美适配桌面端、平板和移动端
- ✅ **国际化支持**，支持中文/英文切换
- ✅ 轮播图展示
- ✅ 产品展示和详情
- ✅ 公司介绍
- ✅ 联系我们
- ✅ SEO优化
- ✅ 页面过渡动画
- ✅ 返回顶部功能
- ✅ 现代化UI设计
- ✅ 移动端手势支持

## 🛠 技术栈

- **Vue 3** - 渐进式JavaScript框架
- **Vite** - 下一代前端构建工具
- **Vue Router** - 官方路由管理器
- **Pinia** - 状态管理
- **Vue I18n** - 国际化插件
- **Element Plus** - Vue 3 UI组件库
- **Axios** - HTTP客户端
- **Sass** - CSS预处理器

## 🌍 国际化

项目支持多语言切换：

- 🇨🇳 简体中文 (zh-CN)
- 🇺🇸 English (en-US)

语言文件位置：
- `src/locales/zh-CN.js` - 中文翻译
- `src/locales/en-US.js` - 英文翻译

### 如何添加新语言

1. 在 `src/locales/` 创建新的语言文件，如 `ja-JP.js`
2. 在 `src/locales/index.js` 中导入并注册
3. 在 `src/stores/i18n.js` 中添加到 `availableLocales` 数组

### 在组件中使用

```vue
<template>
  <!-- 使用 $t 函数 -->
  <h1>{{ $t('home.title') }}</h1>
  
  <!-- 使用 Composition API -->
  <p>{{ t('home.description') }}</p>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
```

## 📱 响应式设计

### 断点定义

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### 使用响应式工具

```javascript
import { useBreakpoint } from '@/utils/responsive'

const { isMobile, isTablet, isDesktop, width } = useBreakpoint()
```

### SCSS Mixins

```scss
// 在组件中使用
.my-component {
  width: 100%;
  
  @include respond-to('md') {
    // 平板及以下设备
    width: 50%;
  }
  
  @include respond-to('sm') {
    // 手机设备
    width: 100%;
  }
}
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env.development` 文件：

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173`

### 4. 构建生产版本

```bash
npm run build
```

## 🎨 设计规范

### 颜色系统
- 主色调：`#1a5490` (工业蓝)
- 辅助色：`#00a8ff` (科技蓝)
- 文本色：`#1f2937` / `#6b7280` / `#9ca3af`

### 字体大小
- xs: 12px
- sm: 14px
- base: 16px
- lg: 18px
- xl: 20px
- 2xl: 24px
- 3xl: 30px
- 4xl: 36px
- 5xl: 48px

## 📂 项目结构

```
src/
├── api/                  # API接口
├── assets/               # 静态资源
│   └── styles/          # 样式文件
├── components/           # 公共组件
│   ├── Layout/          # 布局组件
│   └── Common/          # 通用组件
├── locales/              # 国际化语言包
│   ├── index.js
│   ├── zh-CN.js
│   └── en-US.js
├── router/               # 路由配置
├── stores/               # Pinia状态管理
│   ├── app.js
│   ├── company.js
│   └── i18n.js          # 国际化状态
├── utils/                # 工具函数
│   └── responsive.js    # 响应式工具
├── views/                # 页面视图
├── App.vue
└── main.js
```

## 🔧 常用功能

### 切换语言

```javascript
import { useI18nStore } from '@/stores/i18n'

const i18nStore = useI18nStore()

// 切换到英文
i18nStore.setLanguage('en-US')

// 切换到下一个语言
i18nStore.toggleLanguage()
```

### 响应式适配

```javascript
import { useBreakpoint } from '@/utils/responsive'

const { isMobile, isTablet, isDesktop } = useBreakpoint()

// 根据设备类型执行不同逻辑
if (isMobile.value) {
  // 移动端逻辑
}
```

### 滚动监听

```javascript
import { useScroll } from '@/utils/responsive'

const { scrollY, isScrolled } = useScroll()

// isScrolled 为 true 时执行操作
watch(isScrolled, (value) => {
  if (value) {
    // 滚动超过50px后的逻辑
  }
})
```

## 📝 开发指南

### 添加新页面

1. 在 `src/views/` 创建页面组件
2. 在 `src/router/index.js` 添加路由
3. 在 `src/locales/zh-CN.js` 和 `en-US.js` 添加翻译
4. 在导航菜单中添加链接

### API调用

```javascript
import { getProductList } from '@/api/product'

const fetchProducts = async () => {
  try {
    const res = await getProductList({ page: 1, pageSize: 12 })
    console.log(res.data)
  } catch (error) {
    console.error(error)
  }
}
```

## 🔄 更新日志

### v1.1.0 (2026-02-21)

- ✅ 修复 SASS mixin 未定义错误
- ✅ 添加国际化支持（中文/英文）
- ✅ 优化响应式设计
- ✅ 添加语言切换功能
- ✅ 创建响应式工具函数库
- ✅ 改进移动端体验

### v1.0.0 (2026-02-21)

- ✅ 初始版本发布
- ✅ 基础页面和组件
- ✅ API集成
- ✅ 响应式布局

## 🌐 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移动端浏览器

## ⚠️ 注意事项

1. **语言切换需要刷新页面**：由于 Element Plus 不支持动态切换语言，切换语言时会自动刷新页面
2. **图片路径**：确保后端 API 返回的图片路径正确
3. **环境变量**：生产环境部署时需要修改 `.env.production` 中的 API 地址

## 📄 License

MIT
