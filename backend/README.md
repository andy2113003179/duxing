# 都兴工贸官网 - 后端 API 服务

基于 Node.js + Express + SQLite + Sequelize 构建的企业官网后端 API 系统。

## 📋 目录

- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [API 文档](#api-文档)
- [环境配置](#环境配置)
- [开发说明](#开发说明)

## ✨ 功能特性

- ✅ RESTful API 设计
- ✅ JWT 身份认证
- ✅ 文件上传（支持图片）
- ✅ SQLite 数据库（零配置）
- ✅ Sequelize ORM
- ✅ 统一错误处理
- ✅ 请求参数验证
- ✅ CORS 跨域支持
- ✅ 日志记录

## 🛠 技术栈

- **运行环境**: Node.js 18+
- **Web 框架**: Express 4.x
- **数据库**: SQLite 3
- **ORM**: Sequelize 6.x
- **身份认证**: JWT (jsonwebtoken)
- **密码加密**: bcryptjs
- **文件上传**: multer
- **环境变量**: dotenv
- **跨域处理**: cors

## 📁 项目结构

```
backend/
├── src/
│   ├── config/              # 配置文件
│   │   ├── database.js      # 数据库配置
│   │   ├── server.js        # 服务器配置
│   │   └── upload.js        # 上传配置
│   ├── models/              # 数据模型
│   │   ├── User.js
│   │   ├── Company.js
│   │   ├── Banner.js
│   │   ├── Product.js
│   │   ├── ProductCategory.js
│   │   ├── Contact.js
│   │   └── index.js
│   ├── controllers/         # 控制器
│   │   ├── authController.js
│   │   ├── companyController.js
│   │   ├── bannerController.js
│   │   ├── productController.js
│   │   ├── contactController.js
│   │   └── uploadController.js
│   ├── services/            # 业务逻辑层
│   │   ├── authService.js
│   │   ├── companyService.js
│   │   ├── bannerService.js
│   │   ├── productService.js
│   │   └── contactService.js
│   ├── middlewares/         # 中间件
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── upload.js
│   │   └── validator.js
│   ├── routes/              # 路由
│   │   ├── auth.js
│   │   ├── company.js
│   │   ├── banner.js
│   │   ├── product.js
│   │   ├── contact.js
│   │   ├── upload.js
│   │   └── index.js
│   ├── utils/               # 工具函数
│   │   ├── jwt.js
│   │   ├── response.js
│   │   ├── validator.js
│   │   └── logger.js
│   ├── seeders/             # 数据填充
│   │   └── init-data.js
│   └── app.js               # Express 应用
├── database/                # SQLite 数据库文件
│   └── duxing.db
├── uploads/                 # 上传文件目录
│   ├── banners/
│   ├── products/
│   ├── news/
│   └── company/
├── logs/                    # 日志文件
├── .env                     # 环境变量
├── .env.example             # 环境变量示例
├── .gitignore
├── package.json
├── server.js                # 服务器入口
└── README.md
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并根据需要修改配置：

```bash
cp .env.example .env
```

### 3. 初始化数据库

```bash
npm run init-db
```

这将创建数据库表并插入初始数据，包括：
- 管理员账号（用户名: admin, 密码: 123456）
- 示例公司信息
- 示例轮播图
- 示例产品分类和产品
- 示例联系方式

### 4. 启动开发服务器

```bash
npm run dev
```

服务器将在 `http://localhost:3000` 启动

### 5. 测试 API

访问健康检查接口：

```bash
curl http://localhost:3000/api/health
```

## 📚 API 文档

### 基础信息

- **Base URL**: `http://localhost:3000/api/v1`
- **认证方式**: Bearer Token (JWT)

### 认证相关 API

#### 登录
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123456"
}
```

#### 获取当前用户信息
```http
GET /api/v1/auth/profile
Authorization: Bearer <token>
```

#### 修改密码
```http
PUT /api/v1/auth/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "oldPassword": "123456",
  "newPassword": "newpassword"
}
```

### 公司信息 API

#### 获取公司信息
```http
GET /api/v1/company
```

#### 更新公司信息（需认证）
```http
PUT /api/v1/company
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "都兴工贸有限公司",
  "description": "公司简介..."
}
```

### 轮播图 API

#### 获取轮播图列表
```http
GET /api/v1/banners?position=home&status=active
```

#### 创建轮播图（需认证）
```http
POST /api/v1/banners
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "标题",
  "subtitle": "副标题",
  "image": "/uploads/banners/xxx.jpg",
  "position": "home",
  "status": "active"
}
```

#### 更新轮播图（需认证）
```http
PUT /api/v1/banners/:id
Authorization: Bearer <token>
Content-Type: application/json
```

#### 删除轮播图（需认证）
```http
DELETE /api/v1/banners/:id
Authorization: Bearer <token>
```

### 产品 API

#### 获取产品列表（带分页）
```http
GET /api/v1/products?page=1&pageSize=12&category_id=1&status=active
```

#### 获取产品详情
```http
GET /api/v1/products/:id
```

#### 创建产品（需认证）
```http
POST /api/v1/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "产品名称",
  "category_id": 1,
  "description": "产品描述",
  "status": "active"
}
```

#### 更新产品（需认证）
```http
PUT /api/v1/products/:id
Authorization: Bearer <token>
Content-Type: application/json
```

#### 删除产品（需认证）
```http
DELETE /api/v1/products/:id
Authorization: Bearer <token>
```

### 联系方式 API

#### 获取联系方式列表
```http
GET /api/v1/contacts
```

#### 创建联系方式（需认证）
```http
POST /api/v1/contacts
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "company",
  "name": "都兴工贸",
  "phone": "0755-12345678",
  "address": "深圳市..."
}
```

### 文件上传 API

#### 上传单张图片（需认证）
```http
POST /api/v1/upload/image
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <图片文件>
type: banner (可选：banner/product/news/company)
```

#### 上传多张图片（需认证）
```http
POST /api/v1/upload/images
Authorization: Bearer <token>
Content-Type: multipart/form-data

files: <图片文件数组>
type: product
```

### 响应格式

#### 成功响应
```json
{
  "code": 200,
  "success": true,
  "message": "操作成功",
  "data": { ... },
  "timestamp": "2026-02-21T10:00:00.000Z"
}
```

#### 错误响应
```json
{
  "code": 400,
  "success": false,
  "message": "错误信息",
  "error": { ... },
  "timestamp": "2026-02-21T10:00:00.000Z"
}
```

## ⚙️ 环境配置

### .env 文件说明

```env
# 服务器配置
PORT=3000                    # 服务器端口
NODE_ENV=development         # 运行环境

# 数据库配置
DB_PATH=./database/duxing.db # SQLite 数据库文件路径

# JWT 配置
JWT_SECRET=your-secret-key   # JWT 密钥（生产环境请修改）
JWT_EXPIRES_IN=7d            # Token 过期时间
JWT_REFRESH_EXPIRES_IN=30d   # 刷新 Token 过期时间

# 上传配置
UPLOAD_DIR=./uploads         # 上传文件目录
MAX_FILE_SIZE=5242880        # 最大文件大小（5MB）
ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png,image/gif,image/webp

# 跨域配置
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
```

## 🔧 开发说明

### 数据库迁移

当修改了 Model 定义后，可以重新同步数据库：

```bash
# 开发环境会自动同步（alter模式）
npm run dev

# 或者重新初始化（会清空所有数据）
npm run init-db
```

### 添加新的 API

1. 在 `src/models/` 创建数据模型
2. 在 `src/services/` 创建业务逻辑
3. 在 `src/controllers/` 创建控制器
4. 在 `src/routes/` 创建路由
5. 在 `src/routes/index.js` 注册路由

### 错误处理

使用 `asyncHandler` 包装异步路由：

```javascript
import { asyncHandler } from '../middlewares/errorHandler.js';

export const getItems = asyncHandler(async (req, res) => {
  // 代码逻辑
  // 错误会被自动捕获并处理
});
```

### 日志记录

使用内置的 logger 工具：

```javascript
import logger from '../utils/logger.js';

logger.info('信息日志');
logger.error('错误日志');
logger.warn('警告日志');
logger.debug('调试日志'); // 仅在开发环境输出
```

## 📝 注意事项

1. **生产环境部署前**，请修改：
   - JWT_SECRET 为强密码
   - 管理员默认密码
   - CORS 配置

2. **文件上传限制**：
   - 单文件最大 5MB
   - 仅支持图片格式：jpg, jpeg, png, gif, webp

3. **数据库备份**：
   - SQLite 数据库文件位于 `database/duxing.db`
   - 定期备份该文件

## 📄 License

MIT

## 👥 作者

都兴工贸技术团队

