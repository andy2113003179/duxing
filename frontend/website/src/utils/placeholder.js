/**
 * 占位图生成工具
 * 使用 SVG Data URI 生成渐变色占位图，无需外部依赖
 */

/**
 * 生成渐变色占位图
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @param {string} text - 显示文字
 * @param {string} color1 - 渐变起始颜色（默认蓝色）
 * @param {string} color2 - 渐变结束颜色（默认深蓝）
 * @returns {string} Data URI
 */
export function generatePlaceholder(
  width = 800,
  height = 600,
  text = '',
  color1 = '#c0231e',
  color2 = '#6b0f0c'
) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      ${text ? `
        <text 
          x="50%" 
          y="50%" 
          font-family="Arial, sans-serif" 
          font-size="${Math.min(width, height) * 0.08}" 
          fill="white" 
          text-anchor="middle" 
          dominant-baseline="middle"
          opacity="0.9"
        >${text}</text>
      ` : ''}
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

/**
 * 预设的占位图配置
 */
export const placeholders = {
  // 轮播图
  banner1: generatePlaceholder(1920, 600, '都兴工贸 - 专业覆膜纸生产', '#c0231e', '#6b0f0c'),
  banner2: generatePlaceholder(1920, 600, '品质保证 · 技术领先', '#d93a35', '#8f1510'),
  banner3: generatePlaceholder(1920, 600, '服务至上 · 合作共赢', '#b5200b', '#7a1208'),
  
  // 产品图
  product1: generatePlaceholder(400, 300, '镀铝覆膜纸', '#64748b', '#475569'),
  product2: generatePlaceholder(400, 300, '彩色覆膜纸', '#c0231e', '#6b0f0c'),
  product3: generatePlaceholder(400, 300, '透明覆膜纸', '#d93a35', '#8f1510'),
  product4: generatePlaceholder(400, 300, '珠光覆膜纸', '#e8890c', '#b56a09'),
  product5: generatePlaceholder(400, 300, '哑光覆膜纸', '#8f1510', '#5c0b0b'),
  product6: generatePlaceholder(400, 300, '激光覆膜纸', '#b5200b', '#7a1208'),
  
  // 公司图片
  company: generatePlaceholder(600, 400, '都兴工贸有限公司', '#c0231e', '#6b0f0c'),
  factory: generatePlaceholder(600, 400, '现代化生产基地', '#d93a35', '#8f1510'),
  
  // 产品详情大图
  productDetail: generatePlaceholder(800, 600, '产品详情', '#c0231e', '#6b0f0c'),
  
  // 默认占位图
  default: generatePlaceholder(400, 300, '图片', '#94a3b8', '#64748b')
}

/**
 * 获取产品占位图（循环使用）
 * @param {number} index - 产品索引
 * @returns {string} Data URI
 */
export function getProductPlaceholder(index) {
  const productImages = [
    placeholders.product1,
    placeholders.product2,
    placeholders.product3,
    placeholders.product4,
    placeholders.product5,
    placeholders.product6
  ]
  return productImages[index % productImages.length]
}

/**
 * 获取轮播图占位图
 * @param {number} index - 轮播图索引
 * @returns {string} Data URI
 */
export function getBannerPlaceholder(index) {
  const bannerImages = [
    placeholders.banner1,
    placeholders.banner2,
    placeholders.banner3
  ]
  return bannerImages[index % bannerImages.length]
}

export default {
  generatePlaceholder,
  placeholders,
  getProductPlaceholder,
  getBannerPlaceholder
}

