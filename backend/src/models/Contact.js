import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.ENUM('company', 'sales', 'service'),
    defaultValue: 'company',
    allowNull: false,
    comment: '类型'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '联系人名称'
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: '电话'
  },
  mobile: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: '手机'
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '邮箱'
  },
  address: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: '地址'
  },
  postal_code: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: '邮编'
  },
  province: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: '省份'
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: '城市'
  },
  district: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: '区县'
  },
  wechat: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '微信号'
  },
  qq: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'QQ号'
  },
  working_hours: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: '工作时间'
  },
  map_longitude: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: true,
    comment: '地图经度'
  },
  map_latitude: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: true,
    comment: '地图纬度'
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
  tableName: 'contacts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Contact;

