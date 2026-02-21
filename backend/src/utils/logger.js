/**
 * 简单的日志工具
 */

const getTimestamp = () => {
  return new Date().toISOString();
};

export const logger = {
  info: (message, ...args) => {
    console.log(`[INFO] [${getTimestamp()}]`, message, ...args);
  },
  
  error: (message, ...args) => {
    console.error(`[ERROR] [${getTimestamp()}]`, message, ...args);
  },
  
  warn: (message, ...args) => {
    console.warn(`[WARN] [${getTimestamp()}]`, message, ...args);
  },
  
  debug: (message, ...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] [${getTimestamp()}]`, message, ...args);
    }
  }
};

export default logger;

