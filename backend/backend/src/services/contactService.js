import { Contact } from '../models/index.js';

/**
 * 获取联系方式列表
 */
export const getContacts = async (filters = {}) => {
  const where = {};

  if (filters.type) {
    where.type = filters.type;
  }

  if (filters.status) {
    where.status = filters.status;
  }

  const contacts = await Contact.findAll({
    where,
    order: [
      ['sort_order', 'ASC'],
      ['created_at', 'DESC']
    ]
  });

  return contacts;
};

/**
 * 获取单个联系方式
 */
export const getContactById = async (id) => {
  const contact = await Contact.findByPk(id);

  if (!contact) {
    throw new Error('联系方式不存在');
  }

  return contact;
};

/**
 * 创建联系方式
 */
export const createContact = async (data) => {
  const contact = await Contact.create(data);
  return contact;
};

/**
 * 更新联系方式
 */
export const updateContact = async (id, data) => {
  const contact = await Contact.findByPk(id);

  if (!contact) {
    throw new Error('联系方式不存在');
  }

  await contact.update(data);
  return contact;
};

/**
 * 删除联系方式
 */
export const deleteContact = async (id) => {
  const contact = await Contact.findByPk(id);

  if (!contact) {
    throw new Error('联系方式不存在');
  }

  await contact.destroy();
  return true;
};

