// 节流（n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效）
/**
 * @param {function} fn 回调函数
 * @param {number} delay 等待时间 单位ms, 默认300ms
 */
export const useThrottle  = (fn, delay = 300) => {
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
