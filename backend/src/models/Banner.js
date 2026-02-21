import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Banner = sequelize.define('Banner', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '标题'
  },
  subtitle: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: '副标题'
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: '图片路径不能为空' }
    },
    comment: '图片路径'
  },
  link: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: '跳转链接'
  },
  position: {
    type: DataTypes.ENUM('home', 'about', 'product', 'news'),
    defaultValue: 'home',
    allowNull: false,
    comment: '显示位置'
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: '排序顺序（数字越小越靠前）'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
    allowNull: false,
    comment: '状态'
  }
}, {
  tableName: 'banners',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['position']
    },
    {
      fields: ['status']
    },
    {
      fields: ['sort_order']
    }
  ]
});

export default Banner;

