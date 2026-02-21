/**
 * 响应式工具函数和 Composables
 */

import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 使用响应式断点
 * 返回当前设备类型
 */
export function useBreakpoint() {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)
  const width = ref(window.innerWidth)

  const updateBreakpoint = () => {
    width.value = window.innerWidth
    
    if (width.value < 768) {
      isMobile.value = true
      isTablet.value = false
      isDesktop.value = false
    } else if (width.value < 1024) {
      isMobile.value = false
      isTablet.value = true
      isDesktop.value = false
    } else {
      isMobile.value = false
      isTablet.value = false
      isDesktop.value = true
    }
  }

  onMounted(() => {
    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoint)
  })

  return {
    isMobile,
    isTablet,
    isDesktop,
    width
  }
}

/**
 * 使用滚动监听
 * 返回滚动相关状态
 */
export function useScroll() {
  const scrollY = ref(0)
  const isScrolled = ref(false)

  const handleScroll = () => {
    scrollY.value = window.scrollY
    isScrolled.value = scrollY.value > 50
  }

  onMounted(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    scrollY,
    isScrolled
  }
}

/**
 * 使用触摸事件
 * 用于移动端手势
 */
export function useTouch() {
  const touchStartX = ref(0)
  const touchStartY = ref(0)
  const touchEndX = ref(0)
  const touchEndY = ref(0)

  const handleTouchStart = (e) => {
    touchStartX.value = e.touches[0].clientX
    touchStartY.value = e.touches[0].clientY
  }

  const handleTouchMove = (e) => {
    touchEndX.value = e.touches[0].clientX
    touchEndY.value = e.touches[0].clientY
  }

  const getSwipeDirection = () => {
    const deltaX = touchEndX.value - touchStartX.value
    const deltaY = touchEndY.value - touchStartY.value

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? 'right' : 'left'
    } else {
      return deltaY > 0 ? 'down' : 'up'
    }
  }

  return {
    touchStartX,
    touchStartY,
    touchEndX,
    touchEndY,
    handleTouchStart,
    handleTouchMove,
    getSwipeDirection
  }
}

/**
 * 使用防抖
 */
export function useDebounce(fn, delay = 300) {
  let timer = null
  
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 使用节流
 */
export function useThrottle(fn, delay = 300) {
  let lastTime = 0
  
  return function (...args) {
    const now = Date.now()
    
    if (now - lastTime >= delay) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}

/**
 * 使用图片懒加载
 */
export function useLazyLoad() {
  const observer = ref(null)

  onMounted(() => {
    if ('IntersectionObserver' in window) {
      observer.value = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target
              const src = img.dataset.src
              
              if (src) {
                img.src = src
                img.removeAttribute('data-src')
                observer.value.unobserve(img)
              }
            }
          })
        },
        {
          rootMargin: '50px'
        }
      )
    }
  })

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect()
    }
  })

  const observe = (el) => {
    if (observer.value) {
      observer.value.observe(el)
    }
  }

  return {
    observe
  }
}

