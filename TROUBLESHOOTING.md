# 都兴工贸官网 - 问题排查指南

## 🐛 首页空白问题排查

### 快速检查清单

#### 1️⃣ 检查后端服务
```bash
# 确认后端正在运行
# 访问 http://localhost:3000/api/health
# 应该返回: {"status":"ok","message":"服务运行正常"}
```

#### 2️⃣ 检查前端控制台
打开浏览器开发者工具（F12），查看：
- **Console** 标签：查看 JavaScript 错误
- **Network** 标签：查看 API 请求状态

#### 3️⃣ 常见问题和解决方案

##### 问题1：CORS 跨域错误
**症状**: Console 显示 CORS 错误
```
Access to fetch at 'http://localhost:3000/api/...' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**解决方案**:
检查后端 `.env` 文件中的 `CORS_ORIGIN` 配置：
```env
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
```

##### 问题2：API 请求失败
**症状**: Network 标签显示 API 请求 404 或 500 错误

**解决方案**:
1. 确认后端正在运行：`npm run dev`
2. 确认数据库已初始化：`npm run init-db`
3. 检查 API 地址是否正确

##### 问题3：数据为空
**症状**: API 请求成功但返回空数组

**解决方案**:
重新初始化数据库：
```bash
cd backend
npm run init-db
```

##### 问题4：组件未渲染
**症状**: 页面白屏，Console 没有错误

**解决方案**:
1. 清除浏览器缓存
2. 硬刷新页面（Ctrl + Shift + R）
3. 重启 Vite 开发服务器

##### 问题5：Vue 组件错误
**症状**: Console 显示 Vue 相关错误

**解决方案**:
```bash
cd frontend/website
# 删除 node_modules
rm -rf node_modules
# 重新安装依赖
npm install
# 重启服务
npm run dev
```

### 🔍 详细调试步骤

#### 步骤1：验证后端
```bash
# 测试健康检查
curl http://localhost:3000/api/health

# 测试轮播图 API
curl http://localhost:3000/api/v1/banners?position=home&status=active

# 测试产品 API
curl http://localhost:3000/api/v1/products?is_featured=true&status=active&page=1&pageSize=6

# 测试公司信息 API
curl http://localhost:3000/api/v1/company
```

所有请求都应该返回 JSON 数据。

#### 步骤2：检查前端日志
打开浏览器控制台，应该看到：
```
📤 Request: GET /v1/banners {...}
📥 Response: /v1/banners {...}
📤 Request: GET /v1/company {...}
📥 Response: /v1/company {...}
📤 Request: GET /v1/products {...}
📥 Response: /v1/products {...}
```

#### 步骤3：查看 Network 请求
1. 打开开发者工具
2. 切换到 Network 标签
3. 刷新页面
4. 查看所有请求的状态码（应该都是 200）

### 🛠️ 完整重启流程

如果上述方法都无效，尝试完整重启：

```bash
# 1. 停止所有服务（Ctrl+C）

# 2. 重新初始化后端
cd F:\自定义项目\duxing\backend
npm run init-db

# 3. 启动后端
npm run dev

# 4. 在新终端，重启前端
cd F:\自定义项目\duxing\frontend\website
npm run dev

# 5. 清除浏览器缓存并硬刷新（Ctrl+Shift+R）
```

### 📊 预期结果

访问 `http://localhost:5173` 应该看到：

1. **加载动画**（0.5秒）
2. **导航栏**
   - Logo/公司名称
   - 导航菜单（首页、公司介绍、产品中心、联系我们）
   - 语言切换按钮
3. **轮播图**（3张）
4. **为什么选择我们**（4个优势卡片）
5. **热门产品**（6个产品卡片）
6. **工厂实力**（数据统计 + 3张图片）
7. **CTA区域**（蓝色背景）
8. **页脚**

### 🔧 环境变量检查

前端 `.env.development` 应该包含：
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=都兴工贸官网
VITE_DEBUG=true
```

后端 `.env` 应该包含：
```env
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
```

### 📱 测试不同设备

确保在以下设备上都能正常显示：
- Desktop (>1024px)
- Tablet (768px-1024px)
- Mobile (<768px)

可以使用浏览器开发者工具的设备模拟功能测试。

### 💡 其他提示

1. **确保端口没有被占用**
   - 后端：3000
   - 前端：5173

2. **检查防火墙设置**
   - 确保本地端口可以访问

3. **使用 Chrome/Edge 浏览器**
   - 推荐使用最新版本的 Chrome 或 Edge

4. **清除浏览器数据**
   - 清除缓存、Cookie、LocalStorage

### 📞 仍然无法解决？

请提供以下信息：
1. 浏览器控制台的完整错误信息
2. Network 标签中失败的请求详情
3. 后端终端的完整日志
4. 前端终端的错误信息

---

## 🎯 快速测试脚本

创建一个测试文件 `test-api.js` 在后端目录：

```javascript
// test-api.js
import fetch from 'node-fetch';

const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
  console.log('🧪 开始测试 API...\n');

  // 测试健康检查
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    console.log('✅ 健康检查:', data);
  } catch (err) {
    console.log('❌ 健康检查失败:', err.message);
  }

  // 测试轮播图
  try {
    const res = await fetch(`${API_BASE}/v1/banners?position=home&status=active`);
    const data = await res.json();
    console.log('✅ 轮播图数量:', data.data?.length || 0);
  } catch (err) {
    console.log('❌ 轮播图失败:', err.message);
  }

  // 测试产品
  try {
    const res = await fetch(`${API_BASE}/v1/products?is_featured=true&status=active&page=1&pageSize=6`);
    const data = await res.json();
    console.log('✅ 推荐产品数量:', data.data?.items?.length || 0);
  } catch (err) {
    console.log('❌ 产品失败:', err.message);
  }
}

testAPI();
```

运行测试：
```bash
node test-api.js
```

