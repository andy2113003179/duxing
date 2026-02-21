/**
 * 统一响应格式工具
 */

// 成功响应
export const success = (data = null, message = '操作成功', code = 200) => {
  return {
    code,
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};

// 失败响应
export const error = (message = '操作失败', code = 400, error = null) => {
  return {
    code,
    success: false,
    message,
    error,
    timestamp: new Date().toISOString()
  };
};

// 分页响应
export const paginate = (items, pagination, message = '获取成功') => {
  return {
    code: 200,
    success: true,
    message,
    data: {
      items,
      pagination
    },
    timestamp: new Date().toISOString()
  };
};

// 创建分页对象
export const createPagination = (page, pageSize, total) => {
  return {
    page: parseInt(page),
    pageSize: parseInt(pageSize),
    total: parseInt(total),
    totalPages: Math.ceil(total / pageSize)
  };
};

