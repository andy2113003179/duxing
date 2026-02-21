import dotenv from 'dotenv';

dotenv.config();

export default {
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
  allowedFileTypes: process.env.ALLOWED_FILE_TYPES 
    ? process.env.ALLOWED_FILE_TYPES.split(',') 
    : ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  directories: {
    banner: 'banners',
    product: 'products',
    news: 'news',
    company: 'company',
  }
};

