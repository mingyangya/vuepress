// 防抖（等待wait后执行, 若在 wait内被重复触发，则重新计时）
/**
 * @param {function} fn 回调函数
 * @param {number} wait 等待时间 单位ms, 默认3000ms
 * @param {boolean} immediate 第一次是否立即执行， 默认false
 */
export const useDebounce  = (fn, wait = 3000, immediate = false) => {
  let timer = null

  return function () {
    let context = this 
    let arg = arguments

    if (timer) clearTimeout(timer)

    if(immediate) {
      let callNow = !timer //  第一次（timer 为 null）会立即执行，以后只有事件执行后才会再次触发

      timer = setTimeout(() => {
        timer = null
      }, wait)

      if(callNow) fn && fn.apply(context, arg)
    } else {
      timer = setTimeout(() => {
        fn && fn.apply(context, arg)
      }, wait)
    }
  }
}
