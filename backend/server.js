import app from './src/app.js';
import { testConnection, syncDatabase } from './src/config/database.js';
import serverConfig from './src/config/server.js';
import logger from './src/utils/logger.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 确保必要的目录存在
const ensureDirectories = () => {
  const dirs = [
    './database',
    './uploads',
    './uploads/banners',
    './uploads/products',
    './uploads/news',
    './uploads/company',
    './logs'
  ];

  dirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      logger.info(`创建目录: ${dir}`);
    }
  });
};

// 启动服务器
const startServer = async () => {
  try {
    // 确保目录存在
    ensureDirectories();

    // 测试数据库连接
    await testConnection();

    // 同步数据库（开发环境）
    // 生产环境不使用 alter，避免表结构冲突
    if (serverConfig.env === 'development') {
      await syncDatabase({ alter: true });
      logger.info('数据库表结构已同步（开发模式）');
    } else {
      // 生产环境只验证表存在，不修改结构
      await syncDatabase({ alter: false });
      logger.info('数据库连接已验证（生产模式）');
    }

    // 启动服务器
    const PORT = serverConfig.port;
    app.listen(PORT, () => {
      logger.info(`
╔════════════════════════════════════════════╗
║   都兴工贸官网 API 服务已启动              ║
║                                            ║
║   环境: ${serverConfig.env.padEnd(33)}║
║   端口: ${PORT.toString().padEnd(33)}║
║   地址: http://localhost:${PORT.toString().padEnd(21)}║
║                                            ║
║   API文档: http://localhost:${PORT}/api/health${' '.repeat(4)}║
╚════════════════════════════════════════════╝
      `);

      logger.info('提示：首次运行请执行 npm run init-db 初始化数据');
    });

  } catch (error) {
    logger.error('服务器启动失败:', error);
    process.exit(1);
  }
};

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  logger.error('未捕获的异常:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('未处理的 Promise 拒绝:', reason);
  process.exit(1);
});

// 启动
startServer();

