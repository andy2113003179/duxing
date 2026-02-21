import { Company } from '../models/index.js';

/**
 * 获取公司信息
 */
export const getCompanyInfo = async () => {
  // 返回第一条公司信息记录
  let company = await Company.findOne();
  
  // 如果没有记录，返回空对象
  if (!company) {
    company = {};
  }

  return company;
};

/**
 * 更新公司信息
 */
export const updateCompanyInfo = async (data) => {
  let company = await Company.findOne();

  if (!company) {
    // 如果不存在，创建新记录
    company = await Company.create(data);
  } else {
    // 否则更新现有记录
    await company.update(data);
  }

  return company;
};

