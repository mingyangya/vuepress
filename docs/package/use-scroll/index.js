import { ref } from 'vue'

import { useEventListener } from '@package/use-event-listener'
import { useDebounce } from '@package/use-debounce'
import { useThrottle } from '@package/use-throttle'
import { resolveUnref, unrefElement, noop } from '@package/use-shared'

/**
 * 判断元素是否滚动到底
 * scrollTop是一个非整数，而scrollHeight和clientHeight是四舍五入的，因此确定滚动区域是否滚动到底的唯一方法是查看滚动量是否足够接近某个阈值（1）
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled
 */
// 阈值
const ARRIVED_STATE_THRESHOLD_PIXELS = 1

/**
 * 滚动
 * @param {ref}         element 绑定scroll事件的dom
 * @param {object}      options 
 * @param {number}      options.throttle 滚动事件的节流时间，默认为0ms
 * @param {number}      options.idle 检测滚动事件结束的时间，默认为200ms
 * @param {offset}      options.offset 边界的坐标值，单位px offset?: { top?: number, right: number, bottom?: number, left?: number}
 * @param {function}    options.onScroll 滚动事件
 * @param {function}    options.onStop 滚动停止事件

 * @returns 
 */
export const useScroll = (element, options = {}) => {
  const { onScroll = noop, onStop = noop, throttle = 0, idel = 200, offset = {} } = options

  let x = ref(0)
  let y = ref(0)
  let isScrolling = ref(false)

  // 滚动是否到达边界
  let arrivedState = ref({
    left: true,
    right: false,
    top: true,
    bottom: false,
  })

  // 滑动方向
  let directions = ref({
    left: false,
    right: false,
    top: false,
    bottom: false,
  })

  // 滚动结束
  const onScrollEnd = (event) => {
    if (!isScrolling.value) return

    directions.value = {
      left: false,
      right: false,
      top: false,
      bottom: false,
    }

    isScrolling.value = false

    onStop && onStop(event)
  }

  const onScrollEndDebounced = useDebounce(onScrollEnd, throttle + idel)

  const onScrollHandler = (event) => {
    let { scrollLeft, scrollTop, clientWidth, clientHeight, scrollWidth, scrollHeight } = event.target

    directions.value = {
      top: scrollTop < y.value,
      right: scrollLeft > x.value,
      bottom: scrollTop > y.value,
      left: scrollLeft < x.value
    }

    arrivedState.value = {
      top: scrollTop <= 0 + (offset?.top || 0),
      right: scrollLeft + clientWidth >= scrollWidth - (offset?.right || 0) - ARRIVED_STATE_THRESHOLD_PIXELS,
      bottom: scrollTop + clientHeight >= scrollHeight - (offset?.bottom || 0) - ARRIVED_STATE_THRESHOLD_PIXELS,
      left: scrollLeft <= 0 + (offset?.left || 0),
    }

    x.value = scrollLeft
    y.value = scrollTop

    isScrolling.value = true

    onScrollEndDebounced()
    onScroll && onScroll(event)
  }

  function scrollTo(x = undefined, y = undefined, behavior = "auto") {
    const ele = unrefElement(element)

    ele?.scrollTo({
      top: resolveUnref(y),
      left: resolveUnref(x),
      behavior: resolveUnref(behavior)
    })
  }

  const init = () => {
    useEventListener(element, 'scroll', throttle ? useThrottle(onScrollHandler, throttle, true, false) : onScrollHandler, options)
    // 支持scrollend的浏览器处理
    useEventListener(element, 'scrollend', onScrollEndDebounced, options)
  }

  init()

  return {
    isScrolling,
    directions,
    arrivedState,
    x,
    y,
    scrollTo
  }
}
