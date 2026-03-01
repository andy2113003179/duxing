import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import serverConfig from './config/server.js';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import logger from './utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 创建 Express 应用
const app = express();

// CORS 配置
app.use(cors({
  origin: serverConfig.corsOrigin,
  credentials: true
}));

// 请求体解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务（上传的文件）
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/uploads', express.static(path.join(__dirname, '../uploads')));

// 请求日志
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// API 路由
app.use('/api', routes);

// 根路由
app.get('/', (req, res) => {
  res.json({
    message: '都兴工贸官网 API 服务',
    version: '1.0.0',
    docs: '/api/health'
  });
});

// 404 处理
app.use(notFound);

// 错误处理
app.use(errorHandler);

export default app;

