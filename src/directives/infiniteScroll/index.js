import { h, render } from 'vue'
import { NFloatButton } from 'naive-ui'
import { debounce } from 'lodash-es'

import ExpandIcon from '@/components/ExpandIcon/ExpandIcon.vue'

/**
 * 无限滚动
 * @param {Number} Object.threshold  default:150  到达底部的距离触发 onScroll
 * @param {Function} Object.onScroll  default:undefined  到达阈值后调用
 * @param {Number} Object.wait  default:150 防抖延迟
 * @param {Boolean} Object.visible default:true 是否可见返回顶部
 * @param {Number}  Object.top  default:300 距离顶部的距离显示“返回顶部”的按钮
 * @param {Object}  Object.floatButtonProps default:{} floatButton 参数  https://www.naiveui.com/zh-CN/os-theme/components/float-button#API
 */
export default {
  created(el) {
    el.style.overflowY = 'auto'
    el.style.scrollBehavior = 'smooth'
  },
  mounted(el, { value = {} }) {
    const {
      threshold = 150,
      onScroll,
      wait = 150,
      visible = true,
      top = 300,
      floatButtonProps = {},
    } = value

    /**
     * 计算是否到达阈值
     */
    const computedScroll = debounce(() => {
      const { scrollHeight, scrollTop, clientHeight } = el
      if (scrollHeight - (scrollTop + clientHeight) < threshold) {
        onScroll && onScroll()
      }
    }, wait)

    /**
     * 创建返回顶部
     */
    const container = document.createElement('div')
    el.appendChild(container)
    const button = h(
      NFloatButton,
      {
        right: 40,
        bottom: 40,
        style: { zIndex: 1 },
        onClick() {
          el.scrollTo(0, 0)
        },
        ...floatButtonProps,
      },
      () => h(ExpandIcon, { name: 'KeyboardDoubleArrowUpSharp', size: '1.5rem' }),
    )

    const createBackTop = () => {
      const { scrollTop } = el
      render(button, container)
      container.style.visibility = scrollTop > top ? 'visible' : 'hidden'
    }

    /**
     * 滚动事件
     * @param {*} e
     */
    el.handleScroll = () => {
      computedScroll()
      visible && createBackTop()
    }
    el.addEventListener('scroll', el.handleScroll)
  },
  beforeUnmount(el) {
    el.removeEventListener('scroll', el.handleScroll)
    delete el.handleScroll
  },
}
