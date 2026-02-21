import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'product_categories',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: '产品名称不能为空' }
    }
  },
  slug: {
    type: DataTypes.STRING(200),
    allowNull: true,
    unique: true,
    comment: 'URL友好名称'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '简短描述'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '详细内容'
  },
  cover_image: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '封面图片'
  },
  images: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '多图存储（JSON数组）',
    get() {
      const rawValue = this.getDataValue('images');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('images', JSON.stringify(value));
    }
  },
  specifications: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '产品规格（JSON对象）',
    get() {
      const rawValue = this.getDataValue('specifications');
      return rawValue ? JSON.parse(rawValue) : {};
    },
    set(value) {
      this.setDataValue('specifications', JSON.stringify(value));
    }
  },
  features: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '产品特点（JSON数组）',
    get() {
      const rawValue = this.getDataValue('features');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('features', JSON.stringify(value));
    }
  },
  applications: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '应用领域'
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: '浏览量'
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: '是否推荐'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
    allowNull: false
  }
}, {
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['category_id']
    },
    {
      fields: ['status']
    },
    {
      fields: ['is_featured']
    }
  ]
});

export default Product;

