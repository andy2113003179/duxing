# 都兴工贸官网 - 启动指南

## 🚀 快速启动（5分钟）

### 第1步：启动后端

```bash
# 打开终端1
cd F:\自定义项目\duxing\backend

# 安装依赖（仅首次）
npm install

# 初始化数据库（仅首次或重置数据）
npm run init-db

# 启动后端服务
npm run dev
```

✅ 看到这个提示表示成功：
```
╔════════════════════════════════════════════╗
║   都兴工贸官网 API 服务已启动              ║
║   端口: 3000                               ║
║   地址: http://localhost:3000             ║
╚════════════════════════════════════════════╝
```

### 第2步：启动前端

```bash
# 打开终端2（新终端）
cd F:\自定义项目\duxing\frontend\website

# 安装依赖（仅首次）
npm install

# 启动前端服务
npm run dev
```

✅ 看到这个提示表示成功：
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 第3步：打开浏览器

访问：http://localhost:5173

## ✅ 成功标志

### 应该看到：
1. **导航栏** - 带语言切换按钮
2. **轮播图** - 3张蓝色占位图
3. **为什么选择我们** - 4个图标卡片
4. **热门产品** - 6个产品卡片
5. **工厂实力** - 数据展示
6. **页脚** - 完整信息

### 如果看到空白页面：
1. 按 F12 打开控制台
2. 查看是否有红色错误
3. 参考 `TROUBLESHOOTING.md`

## 🔑 测试账号

- **用户名**: admin
- **密码**: 123456

（后台管理系统开发完成后使用）

## 📱 测试响应式

1. 按 F12 打开开发者工具
2. 点击设备图标（或按 Ctrl+Shift+M）
3. 选择不同设备查看效果

## 🌍 测试国际化

点击导航栏右侧的语言切换按钮：
- 🇨🇳 简体中文
- 🇺🇸 English

## 🎯 常用命令

### 后端
```bash
npm run dev      # 启动开发服务器
npm run init-db  # 初始化/重置数据库
npm start        # 生产环境启动
```

### 前端
```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览生产版本
```

## 🐛 遇到问题？

查看详细排查指南：
- **问题排查**: `TROUBLESHOOTING.md`
- **测试数据**: `TEST_DATA.md`
- **后端文档**: `backend/README.md`
- **前端文档**: `frontend/website/README.md`

## 📊 项目状态

- ✅ 后端 API 服务
- ✅ 前台官网
- ✅ 国际化（中/英）
- ✅ 响应式设计
- ⏳ 后台管理系统（待开发）

---

**祝开发顺利！** 🎉

