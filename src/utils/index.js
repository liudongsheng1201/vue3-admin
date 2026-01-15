/**
 * 本地读取file文件
 * @param {Object} file 文件对象
 * @returns Promise
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    // 当读取成功时执行
    reader.onload = () => {
      resolve(reader.result) // 返回 base64 编码字符串
    }

    // 读取文件失败时执行
    reader.onerror = (error) => {
      reject(error) // 返回错误信息
    }

    // 读取文件为数据URL（即base64）
    reader.readAsDataURL(file)
  })
}
