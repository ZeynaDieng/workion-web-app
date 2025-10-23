/**
 * Utilitaire de debounce pour Nuxt 3
 */

export const useDebounceFn = (fn: Function, delay: number = 300) => {
  let timeoutId: NodeJS.Timeout | null = null
  
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      fn.apply(null, args)
    }, delay)
  }
}

export const debounce = (fn: Function, delay: number = 300) => {
  let timeoutId: NodeJS.Timeout | null = null
  
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      fn.apply(null, args)
    }, delay)
  }
}
