# 都兴工贸官网 - 部署指南

## 📋 部署信息
- **服务器IP**: 8.141.120.243
- **前端端口**: 8200
- **后端端口**: 3000
- **部署路径**: /web/duxing

---

## 🚀 部署步骤

### 第一步：本地构建前端

```bash
# 进入前端目录
cd F:\自定义项目\duxing\frontend\website

# 构建生产版本
npm run build

# 会生成 dist 文件夹
```

### 第二步：上传文件到服务器

使用 FTP/SFTP 工具（如 FileZilla、WinSCP）上传：

**前端文件：**
- 上传 `frontend/website/dist` 文件夹
- 到服务器路径：`/web/duxing/dist`

**后端文件：**
- 上传整个 `backend` 文件夹
- 到服务器路径：`/web/duxing/backend`
- **排除以下文件夹**：
  - `node_modules`
  - `database/*.db`（数据库会在服务器重新生成）
  - `logs`
  - `uploads`（上传内容）

**配置文件：**
- 上传 `deploy/ecosystem.config.js`
- 到：`/web/duxing/backend/ecosystem.config.js`

### 第三步：服务器上安装依赖

SSH 连接到服务器：

```bash
ssh root@8.141.120.243

# 进入后端目录
cd /web/duxing/backend

# 安装依赖
npm install --production

# 创建必要的目录
mkdir -p database logs uploads/{banners,products,company}

# 创建 .env 文件
nano .env
```

复制以下内容到 `.env` 文件：
```env
PORT=3000
NODE_ENV=production
DB_STORAGE=./database/duxing.db
JWT_SECRET=duxing_prod_secret_2024_change_me
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
LOG_LEVEL=info
```

保存退出（Ctrl+X, Y, Enter）

### 第四步：初始化数据库

```bash
# 在 /web/duxing/backend 目录下
npm run init-db
```

### 第五步：配置 Nginx

编辑 Nginx 配置：

```bash
nano /etc/nginx/nginx.conf
```

在 `http { }` 块的**最后**，`}` 之前添加：

```nginx
# 都兴工贸官网 - 端口 8200
server {
    listen       8200;
    server_name  localhost;

    location / {
        root   /web/duxing/dist;
        try_files $uri $uri/ @router;
        index  index.html index.htm;
    }
    
    location @router {
        rewrite ^.*$ /index.html last;
    }
    
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 20M;
    }
    
    location /uploads {
        alias /web/duxing/backend/uploads;
        expires 30d;
        client_max_body_size 20M;
    }

    error_page   500 502 503 504  /50x.html;
}
```

保存后测试配置：

```bash
# 测试配置
nginx -t

# 如果显示 OK，重载配置
nginx -s reload
```

### 第六步：启动后端服务

```bash
# 进入后端目录
cd /web/duxing/backend

# 如果没有 PM2，先安装
npm install -g pm2

# 启动服务
pm2 start ecosystem.config.js

# 保存 PM2 配置（开机自启）
pm2 save
pm2 startup
```

---

## ✅ 访问网站

**前端地址**：http://8.141.120.243:8200

**测试API**：http://8.141.120.243:8200/api/health

---

## 📝 常用命令

```bash
# 查看后端日志
pm2 logs duxing-backend

# 重启后端
pm2 restart duxing-backend

# 停止后端
pm2 stop duxing-backend

# 查看运行状态
pm2 status

# 查看 Nginx 错误日志
tail -f /var/log/nginx/error.log
```

---

## 🔄 后续更新部署

当代码有更新时：

1. 本地重新构建：`npm run build`
2. 上传 `dist` 文件夹覆盖服务器的 `/web/duxing/dist`
3. 上传 `backend` 代码
4. SSH 到服务器：`pm2 restart duxing-backend`

---

## ⚠️ 注意事项

1. **防火墙**：确保服务器开放了 8200 和 3000 端口
2. **权限**：确保 `/web/duxing` 目录有正确的读写权限
3. **数据库**：首次部署需要初始化数据库
4. **密钥**：记得修改 `.env` 中的 `JWT_SECRET`

