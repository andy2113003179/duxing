import sequelize from '../config/database.js';
import User from './User.js';
import Company from './Company.js';
import Banner from './Banner.js';
import ProductCategory from './ProductCategory.js';
import Product from './Product.js';
import Contact from './Contact.js';

// 定义模型关联关系

// 产品分类 和 产品 的关系
ProductCategory.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'products'
});

Product.belongsTo(ProductCategory, {
  foreignKey: 'category_id',
  as: 'category'
});

// 导出所有模型
const models = {
  User,
  Company,
  Banner,
  ProductCategory,
  Product,
  Contact,
  sequelize
};

export default models;

export {
  User,
  Company,
  Banner,
  ProductCategory,
  Product,
  Contact,
  sequelize
};

