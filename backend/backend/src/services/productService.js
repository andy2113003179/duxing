import { Product, ProductCategory } from '../models/index.js';
import { Op } from 'sequelize';

/**
 * 获取产品列表（带分页）
 */
export const getProducts = async (filters = {}, pagination = {}) => {
  const { page = 1, pageSize = 12 } = pagination;
  const where = {};

  // 分类筛选
  if (filters.category_id) {
    where.category_id = filters.category_id;
  }

  // 状态筛选
  if (filters.status) {
    where.status = filters.status;
  }

  // 是否推荐
  if (filters.is_featured !== undefined) {
    where.is_featured = filters.is_featured === 'true' || filters.is_featured === true;
  }

  // 关键词搜索
  if (filters.keyword) {
    where[Op.or] = [
      { name: { [Op.like]: `%${filters.keyword}%` } },
      { description: { [Op.like]: `%${filters.keyword}%` } }
    ];
  }

  const offset = (page - 1) * pageSize;

  const { count, rows } = await Product.findAndCountAll({
    where,
    include: [
      {
        model: ProductCategory,
        as: 'category',
        attributes: ['id', 'name', 'slug']
      }
    ],
    limit: parseInt(pageSize),
    offset: offset,
    order: [
      ['sort_order', 'ASC'],
      ['created_at', 'DESC']
    ]
  });

  return {
    items: rows,
    pagination: {
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      total: count,
      totalPages: Math.ceil(count / pageSize)
    }
  };
};

/**
 * 获取产品详情
 */
export const getProductById = async (id) => {
  const product = await Product.findByPk(id, {
    include: [
      {
        model: ProductCategory,
        as: 'category',
        attributes: ['id', 'name', 'slug']
      }
    ]
  });

  if (!product) {
    throw new Error('产品不存在');
  }

  return product;
};

/**
 * 创建产品
 */
export const createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};

/**
 * 更新产品
 */
export const updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error('产品不存在');
  }

  await product.update(data);
  return product;
};

/**
 * 删除产品
 */
export const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error('产品不存在');
  }

  await product.destroy();
  return true;
};

/**
 * 增加浏览量
 */
export const increaseProductViews = async (id) => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error('产品不存在');
  }

  await product.increment('views', { by: 1 });
  return product;
};

