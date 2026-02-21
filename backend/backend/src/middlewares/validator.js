import { validationResult } from 'express-validator';
import { error } from '../utils/response.js';

/**
 * 验证结果处理中间件
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => ({
      field: err.path || err.param,
      message: err.msg
    }));
    
    return res.status(400).json(error(
      '请求参数验证失败',
      400,
      { errors: errorMessages }
    ));
  }
  
  next();
};

export default validate;

