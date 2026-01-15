/**
 * 存储
 * @param {*} key
 * @param {*} data
 */
export const set = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('JSON解析失败！', error)
    localStorage.setItem(key, data)
  }
}

/**
 * 获取
 * @param {*} key
 * @returns
 */
export const get = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (err) {
    console.log(key)
    console.error('JSON解析失败！', err)
    return localStorage.getItem(key)
  }
}

/**
 * 清空
 * @returns
 */
export const clear = () => localStorage.clear()

/**
 * 删除
 * @param {*} key
 * @returns
 */
export const remove = (key) => localStorage.removeItem(key)
