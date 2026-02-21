import { Banner } from '../models/index.js';
import { Op } from 'sequelize';

/**
 * 获取轮播图列表
 */
export const getBanners = async (filters = {}) => {
  const where = {};

  if (filters.position) {
    where.position = filters.position;
  }

  if (filters.status) {
    where.status = filters.status;
  }

  const banners = await Banner.findAll({
    where,
    order: [
      ['sort_order', 'ASC'],
      ['created_at', 'DESC']
    ]
  });

  return banners;
};

/**
 * 获取单个轮播图
 */
export const getBannerById = async (id) => {
  const banner = await Banner.findByPk(id);
  
  if (!banner) {
    throw new Error('轮播图不存在');
  }

  return banner;
};

/**
 * 创建轮播图
 */
export const createBanner = async (data) => {
  const banner = await Banner.create(data);
  return banner;
};

/**
 * 更新轮播图
 */
export const updateBanner = async (id, data) => {
  const banner = await Banner.findByPk(id);
  
  if (!banner) {
    throw new Error('轮播图不存在');
  }

  await banner.update(data);
  return banner;
};

/**
 * 删除轮播图
 */
export const deleteBanner = async (id) => {
  const banner = await Banner.findByPk(id);
  
  if (!banner) {
    throw new Error('轮播图不存在');
  }

  await banner.destroy();
  return true;
};

/**
 * 更新排序
 */
export const updateBannerSort = async (id, sortOrder) => {
  const banner = await Banner.findByPk(id);
  
  if (!banner) {
    throw new Error('轮播图不存在');
  }

  await banner.update({ sort_order: sortOrder });
  return banner;
};

