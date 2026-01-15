import { ref, reactive } from 'vue'
import { CREATE, UPDATE, READ, DELETE } from '@/config'

/**
 * 创建一个通用的异步操作效果（支持全局和行级loading）
 * @param {Function} api - 需要执行的异步API函数
 * @param {Object} options - 配置项
 * @param {Boolean} options.perItem - 是否启用行级loading（默认为false，即全局loading）
 * @param {Function} options.getId - 当perItem为true时，用于从API参数中提取行标识符的函数
 * @returns {{ loading: Ref<Boolean>, itemLoading: ReactiveObject, execute: Function }}
 */
export const Effect = (api, options = {}) => {
  const { perItem = false, getId } = options

  // 全局loading状态
  const loading = ref(false)
  // 行级loading状态，使用一个响应式对象存储 { [rowId]: true/false }
  const itemLoading = reactive({})
  const response = ref({})

  const execute = async (...args) => {
    const hasCallback = typeof args[args.length - 1] === 'function'
    const callback = hasCallback ? args.pop() : null
    const apiArgs = args

    let itemId = null
    // 如果启用了行级loading，则尝试获取当前操作的行ID
    if (perItem && getId) {
      itemId = getId(...apiArgs)
    }

    // 设置loading状态
    if (perItem && itemId !== null) {
      itemLoading[itemId] = true
    } else {
      loading.value = true
    }

    try {
      const res = await api(...apiArgs)
      callback && callback(res)
      response.value = res
      return res
    } finally {
      // 无论成功失败，最终都清除loading状态
      if (perItem && itemId !== null) {
        itemLoading[itemId] = false
      } else {
        loading.value = false
      }
    }
  }

  return {
    loading,
    itemLoading,
    execute,
    response,
  }
}

/**
 * 专门用于创建操作的Effect（通常不需要行级loading）
 */
export const useCreateEffect = (api) => {
  return { ...Effect(api), handleType: CREATE }
}

/**
 * 专门用于读取操作的Effect（通常不需要行级loading）
 */
export const useReadEffect = (api) => {
  return { ...Effect(api), handleType: READ }
}

/**
 * 专门用于更新操作的Effect（通常需要行级loading）
 * @param {Function} api - 更新API
 * @param {Function} getId - 从API参数中提取行ID的函数
 */
export const useUpdateEffect = (api, getId) => {
  return {
    ...Effect(api, { perItem: true, getId }),
    handleType: UPDATE,
  }
}

/**
 * 专门用于删除操作的Effect（通常需要行级loading）
 * @param {Function} api - 删除API
 * @param {Function} getId - 从API参数中提取行ID的函数
 */
export const useDeleteEffect = (api, getId) => {
  return {
    ...Effect(api, { perItem: true, getId }),
    handleType: DELETE,
  }
}
