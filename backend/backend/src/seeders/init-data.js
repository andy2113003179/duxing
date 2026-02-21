import sequelize from '../config/database.js';
import { User, Company, Banner, ProductCategory, Product, Contact } from '../models/index.js';
import logger from '../utils/logger.js';

/**
 * 初始化数据库数据
 */
const initData = async () => {
  try {
    logger.info('开始初始化数据...');

    // 同步数据库（强制重建表）
    await sequelize.sync({ force: true });
    logger.info('✅ 数据库表已创建');

    // 1. 创建管理员用户
    const admin = await User.create({
      username: 'admin',
      password: '123456',
      email: 'admin@duxing.com',
      role: 'admin',
      status: 'active'
    });
    logger.info('✅ 管理员账号已创建 (用户名: admin, 密码: 123456)');

    // 2. 创建公司信息
    const company = await Company.create({
      name: '都兴工贸有限公司',
      name_en: 'Duxing Industry and Trade Co., Ltd.',
      description: '专业覆膜纸生产制造商，为包装印刷行业提供优质产品和服务',
      introduction: '都兴工贸有限公司成立于2010年，是一家专业从事覆膜纸研发、生产、销售的现代化企业。公司位于山东省临沂市兰山区半程镇工业园，拥有先进的生产设备和完善的质量管理体系，致力于为客户提供高品质的覆膜纸产品。',
      established_year: 2010,
      slogan: '品质至上，服务第一',
      keywords: '覆膜纸,包装材料,印刷材料,工业材料',
      meta_description: '都兴工贸 - 专业覆膜纸生产制造商'
    });
    logger.info('✅ 公司信息已创建');

    // 3. 创建轮播图（使用稳定的图片服务）
    const banners = await Banner.bulkCreate([
      {
        title: '专业覆膜纸生产商',
        subtitle: '品质保证 · 服务至上',
        image: 'https://picsum.photos/seed/banner1/1920/600',
        position: 'home',
        sort_order: 1,
        status: 'active'
      },
      {
        title: '先进的生产设备',
        subtitle: '技术领先 · 质量可靠',
        image: 'https://picsum.photos/seed/banner2/1920/600',
        position: 'home',
        sort_order: 2,
        status: 'active'
      },
      {
        title: '优质的客户服务',
        subtitle: '快速响应 · 贴心服务',
        image: 'https://picsum.photos/seed/banner3/1920/600',
        position: 'home',
        sort_order: 3,
        status: 'active'
      }
    ]);
    logger.info(`✅ 已创建 ${banners.length} 个轮播图`);

    // 4. 创建产品分类
    const categories = await ProductCategory.bulkCreate([
      {
        name: '镀铝覆膜纸',
        slug: 'aluminized-laminated-paper',
        description: '高品质镀铝覆膜纸，广泛应用于包装行业',
        sort_order: 1,
        status: 'active'
      },
      {
        name: '彩色覆膜纸',
        slug: 'colored-laminated-paper',
        description: '多种颜色可选，满足不同包装需求',
        sort_order: 2,
        status: 'active'
      },
      {
        name: '透明覆膜纸',
        slug: 'transparent-laminated-paper',
        description: '透明覆膜，保护产品的同时展现原本色彩',
        sort_order: 3,
        status: 'active'
      }
    ]);
    logger.info(`✅ 已创建 ${categories.length} 个产品分类`);

    // 5. 创建产品（使用在线占位图）
    const products = await Product.bulkCreate([
      {
        category_id: categories[0].id,
        name: '高光镀铝覆膜纸',
        slug: 'high-gloss-aluminized-paper',
        description: '高光泽度，优异的阻隔性能，适用于高端包装',
        content: '采用先进的镀铝工艺，表面光滑细腻，具有优异的金属质感和阻隔性能。适用于食品包装、礼品包装等领域。',
        cover_image: 'https://picsum.photos/seed/product1/800/600',
        specifications: {
          width: '1200mm',
          thickness: '0.3mm',
          weight: '80g/㎡'
        },
        features: ['高光泽度', '优异阻隔性', '环保材料', '易于印刷'],
        applications: '食品包装、礼品包装、烟酒包装',
        sort_order: 1,
        is_featured: true,
        status: 'active'
      },
      {
        category_id: categories[0].id,
        name: '哑光镀铝覆膜纸',
        slug: 'matte-aluminized-paper',
        description: '哑光质感，典雅大方，适用于高档包装',
        content: '哑光表面处理，呈现出低调奢华的质感。具有良好的印刷适性和加工性能。',
        cover_image: 'https://picsum.photos/seed/product2/800/600',
        specifications: {
          width: '1200mm',
          thickness: '0.3mm',
          weight: '80g/㎡'
        },
        features: ['哑光质感', '典雅大方', '印刷清晰', '加工方便'],
        applications: '化妆品包装、电子产品包装',
        sort_order: 2,
        is_featured: true,
        status: 'active'
      },
      {
        category_id: categories[1].id,
        name: '红色覆膜纸',
        slug: 'red-laminated-paper',
        description: '鲜艳的红色，喜庆热烈，适合节日包装',
        content: '采用环保染料，颜色鲜艳持久，不易褪色。适用于各种喜庆场合的包装需求。',
        cover_image: 'https://picsum.photos/seed/product3/800/600',
        specifications: {
          width: '1200mm',
          thickness: '0.25mm',
          weight: '70g/㎡'
        },
        features: ['颜色鲜艳', '不易褪色', '环保材料', '喜庆大方'],
        applications: '节日礼品包装、婚庆用品包装',
        sort_order: 3,
        is_featured: true,
        status: 'active'
      },
      {
        category_id: categories[2].id,
        name: '透明覆膜纸',
        slug: 'transparent-laminated-paper',
        description: '高透明度，保护产品同时展现本色',
        content: '高透明度薄膜，不影响产品原有色彩，同时提供防水防尘保护。',
        cover_image: 'https://picsum.photos/seed/product4/800/600',
        specifications: {
          width: '1200mm',
          thickness: '0.2mm',
          weight: '60g/㎡'
        },
        features: ['高透明度', '防水防尘', '不影响印刷', '保护性好'],
        applications: '书籍封面、宣传册、卡片包装',
        sort_order: 4,
        is_featured: false,
        status: 'active'
      },
      {
        category_id: categories[1].id,
        name: '金色覆膜纸',
        slug: 'gold-laminated-paper',
        description: '奢华金色，高端大气，提升产品档次',
        content: '采用特殊工艺制作，呈现出奢华的金色光泽，是高端礼品包装的首选材料。',
        cover_image: 'https://picsum.photos/seed/product5/800/600',
        specifications: {
          width: '1200mm',
          thickness: '0.3mm',
          weight: '85g/㎡'
        },
        features: ['奢华质感', '金色光泽', '高端大气', '耐用持久'],
        applications: '高档礼品包装、节日礼盒、奢侈品包装',
        sort_order: 5,
        is_featured: true,
        status: 'active'
      },
      {
        category_id: categories[1].id,
        name: '蓝色覆膜纸',
        slug: 'blue-laminated-paper',
        description: '清新蓝色，时尚现代，适合科技产品包装',
        content: '现代时尚的蓝色设计，清新自然，特别适合科技类产品和商务礼品的包装。',
        cover_image: 'https://picsum.photos/seed/product6/800/600',
        specifications: {
          width: '1200mm',
          thickness: '0.25mm',
          weight: '75g/㎡'
        },
        features: ['时尚设计', '清新色调', '科技感强', '商务风格'],
        applications: '电子产品包装、商务礼品、科技产品',
        sort_order: 6,
        is_featured: true,
        status: 'active'
      }
    ]);
    logger.info(`✅ 已创建 ${products.length} 个产品`);

    // 6. 创建联系方式
    const contacts = await Contact.bulkCreate([
      {
        type: 'company',
        name: '都兴工贸有限公司',
        phone: '15192958777',
        mobile: '15192958777',
        email: 'info@duxing.com',
        address: '山东省临沂市兰山区半程镇工业园任家村南',
        province: '山东省',
        city: '临沂市',
        district: '兰山区',
        postal_code: '276000',
        working_hours: '周一至周六 8:00-18:00',
        wechat: 'duxing2010',
        sort_order: 1,
        status: 'active'
      },
      {
        type: 'sales',
        name: '销售部',
        phone: '15192958777',
        mobile: '15192958777',
        email: 'sales@duxing.com',
        working_hours: '周一至周日 8:00-20:00',
        wechat: 'duxing_sales',
        sort_order: 2,
        status: 'active'
      }
    ]);
    logger.info(`✅ 已创建 ${contacts.length} 个联系方式`);

    logger.info('\n========================================');
    logger.info('✅ 数据初始化完成！');
    logger.info('========================================');
    logger.info('管理员账号信息：');
    logger.info('  用户名: admin');
    logger.info('  密码: 123456');
    logger.info('========================================\n');

    process.exit(0);
  } catch (error) {
    logger.error('❌ 数据初始化失败:', error);
    process.exit(1);
  }
};

// 执行初始化
initData();

