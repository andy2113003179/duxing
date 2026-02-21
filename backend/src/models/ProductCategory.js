import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ProductCategory = sequelize.define('ProductCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: '分类名称不能为空' }
    }
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: true,
    unique: true,
    comment: 'URL友好名称'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '分类描述'
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '分类图片'
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
    allowNull: false
  }
}, {
  tableName: 'product_categories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default ProductCategory;

