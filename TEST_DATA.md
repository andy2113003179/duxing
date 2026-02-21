# 测试数据说明

## 📸 图片资源

项目已配置使用在线占位图服务（placeholder.com），所有图片都会自动显示。

### 占位图服务说明

- **轮播图**: 1920x600 尺寸
- **产品图**: 800x600 尺寸
- **工厂图**: 600x400 尺寸

### 如何替换为真实图片

#### 方案1：通过后台上传（推荐）
后台管理系统开发完成后，可以直接通过界面上传图片。

#### 方案2：手动添加图片
1. 准备图片文件
2. 放到 `backend/uploads/` 对应目录
3. 修改数据库中的图片路径

#### 方案3：修改初始化数据
编辑 `backend/src/seeders/init-data.js`，将图片URL改为实际路径。

## 🗄️ 测试数据

### 管理员账号
- 用户名: `admin`
- 密码: `123456`

### 已初始化的数据

#### 轮播图 (3张)
- 专业覆膜纸生产商
- 先进的生产设备
- 优质的客户服务

#### 产品分类 (3个)
- 镀铝覆膜纸
- 彩色覆膜纸
- 透明覆膜纸

#### 产品 (6个)
1. 高光镀铝覆膜纸 ⭐ 推荐
2. 哑光镀铝覆膜纸 ⭐ 推荐
3. 红色覆膜纸 ⭐ 推荐
4. 透明覆膜纸
5. 金色覆膜纸 ⭐ 推荐
6. 蓝色覆膜纸 ⭐ 推荐

#### 联系方式 (2个)
- 公司总机
- 销售部门

## 🔄 重新初始化数据

如果需要重置数据库到初始状态：

```bash
cd backend
npm run init-db
```

⚠️ **警告**: 这会清空所有现有数据！

## 🎨 自定义测试数据

编辑文件：`backend/src/seeders/init-data.js`

可以修改：
- 公司信息
- 轮播图内容
- 产品信息
- 联系方式
- 等等...

## 📝 API 测试

### 获取轮播图
```bash
curl http://localhost:3000/api/v1/banners?position=home&status=active
```

### 获取推荐产品
```bash
curl http://localhost:3000/api/v1/products?is_featured=true&status=active
```

### 获取公司信息
```bash
curl http://localhost:3000/api/v1/company
```

## 🖼️ 使用高质量图片素材网站

如果需要真实的测试图片，可以从以下网站获取：

### 免费图片素材
- **Unsplash**: https://unsplash.com/ (高质量免费图片)
- **Pexels**: https://www.pexels.com/ (免费商用图片)
- **Pixabay**: https://pixabay.com/ (免费图片和视频)

### 搜索关键词建议
- "factory" (工厂)
- "manufacturing" (制造业)
- "industrial" (工业)
- "paper" (纸张)
- "production line" (生产线)
- "warehouse" (仓库)

### 下载后使用
1. 下载图片
2. 调整尺寸（推荐使用 https://www.iloveimg.com/）
3. 放到 `backend/uploads/` 目录
4. 更新数据库中的路径

## 🎯 完整测试流程

1. **启动后端**
   ```bash
   cd backend
   npm run dev
   ```

2. **初始化数据**（如果还没有）
   ```bash
   npm run init-db
   ```

3. **启动前端**
   ```bash
   cd ../frontend/website
   npm run dev
   ```

4. **访问网站**
   打开浏览器访问：http://localhost:5173

5. **验证功能**
   - 查看轮播图是否显示
   - 浏览热门产品
   - 切换语言
   - 测试移动端响应式

现在首页应该可以正常显示内容了！ 🎉

