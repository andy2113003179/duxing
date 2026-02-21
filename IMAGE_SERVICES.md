# 可靠的免费图片占位服务推荐

## 🎯 推荐使用的服务

### 1. **Picsum Photos** ⭐️⭐️⭐️⭐️⭐️
- **网址**: https://picsum.photos
- **优点**: 
  - 非常稳定，全球CDN加速
  - 真实高质量图片
  - 支持种子(seed)参数，保证相同URL返回相同图片
  - 完全免费
- **用法**:
  ```
  https://picsum.photos/800/600                    # 随机图片
  https://picsum.photos/seed/product1/800/600      # 使用seed保证固定图片
  ```

### 2. **DummyImage** ⭐️⭐️⭐️⭐️
- **网址**: https://dummyimage.com
- **优点**:
  - 稳定性高
  - 可自定义颜色和文字
  - 响应速度快
- **用法**:
  ```
  https://dummyimage.com/800x600/000/fff          # 黑底白字
  https://dummyimage.com/800x600/1a5490/ffffff&text=Product  # 自定义文字
  ```

### 3. **Placehold.co** ⭐️⭐️⭐️⭐️
- **网址**: https://placehold.co
- **优点**:
  - 现代化设计
  - 支持多种格式(PNG, JPG, WebP)
  - 可自定义颜色、文字、字体
- **用法**:
  ```
  https://placehold.co/800x600                    # 默认灰色
  https://placehold.co/800x600/1a5490/FFF         # 自定义颜色
  https://placehold.co/800x600/png?text=Product   # 指定格式和文字
  ```

### 4. **Lorem Picsum** ⭐️⭐️⭐️⭐️⭐️
- 与 Picsum Photos 相同服务
- 备用域名: https://i.picsum.photos

### 5. **Unsplash Source API** ⭐️⭐️⭐️
- **网址**: https://source.unsplash.com
- **优点**: 
  - 高质量专业摄影图片
  - 支持分类搜索
- **缺点**:
  - 图片可能变化（不如picsum稳定）
- **用法**:
  ```
  https://source.unsplash.com/800x600/?nature     # 自然主题
  https://source.unsplash.com/800x600/?business   # 商业主题
  ```

## 🚫 不推荐的服务

### ❌ via.placeholder.com
- **问题**: 经常被墙或访问慢
- **状态**: 在国内访问不稳定

### ❌ placeholder.com
- **问题**: 服务已停止

### ❌ lorempixel.com
- **问题**: 服务不稳定，经常宕机

## 💡 本项目使用方案

### 当前使用: **Picsum Photos**
```javascript
// 轮播图
https://picsum.photos/seed/banner1/1920/600
https://picsum.photos/seed/banner2/1920/600
https://picsum.photos/seed/banner3/1920/600

// 产品图
https://picsum.photos/seed/product1/800/600
https://picsum.photos/seed/product2/800/600
...
```

### 备选方案: **DummyImage**
```javascript
// 如果 Picsum 访问慢，可以切换到 DummyImage
https://dummyimage.com/1920x600/1a5490/ffffff&text=Banner+1
https://dummyimage.com/800x600/64748b/ffffff&text=Product+1
```

### 最佳实践: **本地生成 SVG**
```javascript
// 使用 utils/placeholder.js 生成 SVG Data URI
// 优点: 不依赖外部服务，加载速度最快
import { placeholders } from '@/utils/placeholder'

const image = placeholders.banner1  // SVG Data URI
```

## 🔧 如何切换图片服务

### 方法1: 修改初始数据
编辑 `backend/src/seeders/init-data.js`，替换图片URL

### 方法2: 使用环境变量
```javascript
// backend/.env
IMAGE_SERVICE=picsum  # picsum | dummy | placehold

// 在代码中根据配置生成URL
const baseUrl = process.env.IMAGE_SERVICE === 'picsum' 
  ? 'https://picsum.photos/seed' 
  : 'https://dummyimage.com'
```

### 方法3: 前端兜底处理
```vue
<img 
  :src="product.image" 
  @error="handleImageError"
  :alt="product.name"
/>

<script>
const handleImageError = (e) => {
  // 图片加载失败时，使用本地生成的占位图
  e.target.src = generatePlaceholder(800, 600, product.name)
}
</script>
```

## 📊 服务对比

| 服务 | 稳定性 | 速度 | 图片质量 | 自定义 | 推荐度 |
|-----|--------|------|---------|--------|--------|
| Picsum Photos | ⭐️⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️⭐️ |
| DummyImage | ⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️ |
| Placehold.co | ⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️ |
| Unsplash | ⭐️⭐️⭐️ | ⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️⭐️ | ⭐️⭐️ | ⭐️⭐️⭐️ |
| 本地SVG | ⭐️⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️⭐️ | ⭐️⭐️ | ⭐️⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️ |

## 🎯 最终建议

**开发阶段**: 使用 **Picsum Photos**（真实图片，效果好）  
**生产环境**: 使用 **本地上传的真实图片**  
**兜底方案**: 使用 **本地生成的SVG占位图**（utils/placeholder.js）

