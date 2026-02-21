import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: '公司名称不能为空' }
    }
  },
  name_en: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '公司简介'
  },
  introduction: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '详细介绍'
  },
  established_year: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1900,
      max: new Date().getFullYear()
    }
  },
  logo: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Logo图片路径'
  },
  cover_image: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '封面图片路径'
  },
  slogan: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: '公司标语'
  },
  keywords: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'SEO关键词'
  },
  meta_description: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'SEO描述'
  }
}, {
  tableName: 'companies',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Company;

