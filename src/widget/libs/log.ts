/**
 * 日志工具库
 * 封装控制台日志输出，支持浏览器和Node.js环境。
 * 输出日志包括代码位置、行号、日志级别和日志内容。
 * @author xiaoxiao72@jd.com
 * @copyright jd.com
 * @module log
 */
import { color } from '../constant/color'

/**
 * 获取当前代码栈信息
 * 从调用栈中提取调用者的位置信息，用于日志输出时显示代码位置。
 * @returns {string} 返回调用栈信息的字符串，格式为文件名:行号:列号，如果不可用则返回提示信息
 * @example
 * // 返回: "at log (/path/to/file.ts:10:5)"
 * getStack()
 */
const getStack = () => {
  // 获取并处理调用栈信息
  const stackTrace = new Error().stack
  if (stackTrace) {
    return stackTrace.split('\n').slice(3, 4).join('\n').trim()
  } else {
    return 'Stack trace is not available.'
  }
}

/**
 * 获取当前的调试类型
 * 从URL查询参数或localStorage中读取debug配置，决定日志输出方式。
 * 优先使用localStorage中的debug配置，如果不存在则使用URL参数。
 * @returns {string} 返回调试类型，'console'表示控制台输出，'prompt'表示弹窗输出，其他值表示不输出
 * @example
 * // URL: http://example.com?debug=console
 * getLogType() // 返回 'console'
 */
const getLogType = () => {
  const search = new URLSearchParams(location.search)
  const localDebug = localStorage.getItem('debug')
  const urlDebug = search.get('debug')

  return localDebug || urlDebug
}

/**
 * 使用系统提示框输出日志信息
 * 当debug类型为'prompt'时，通过浏览器prompt弹窗显示日志内容。
 * @param {...any} msg - 要输出的日志信息，支持多个参数
 * @example
 * prompts('用户登录', { username: 'admin' })
 */
const prompts = (...msg: any) => {
  const type = getLogType()
  type === 'prompt' && prompt('debug', JSON.stringify(msg))
}

/**
 * 使用Console输出日志信息
 * 当debug类型为'console'时，通过浏览器控制台输出日志。
 * @param {...any} args - 要输出的日志信息，支持多个参数
 * @example
 * print('用户登录成功', { userId: 123 })
 */
const print = (...args: any) => {
  const type = getLogType()
  type === 'console' && console.log.apply(void 0, args)
}

/**
 * 输出普通日志
 * 输出普通级别的日志信息，带有[log]标签和代码位置信息。
 * @param {...any} msg - 要输出的日志信息数组
 * @example
 * log('用户访问页面', '/home')
 */
export const log = (...msg: any[]) => {
  print('%c[log]', color.log, ...msg, `\n${getStack()}`)
  prompts(...msg)
}

/**
 * 输出信息日志
 * 输出信息级别的日志信息，带有[info]标签和代码位置信息。
 * @param {...any} msg - 要输出的信息日志信息数组
 * @example
 * info('系统启动', '版本: 1.0.0')
 */
export const info = (...msg: any[]) => {
  print('%c[info]', color.info, ...msg, `\n${getStack()}`)
  prompts(...msg)
}

/**
 * 输出错误日志
 * 输出错误级别的日志信息，带有[error]标签和代码位置信息。
 * @param {...any} msg - 要输出的错误日志信息数组
 * @example
 * error('请求失败', { status: 500, message: 'Internal Server Error' })
 */
export const error = (...msg: any[]) => {
  print('%c[error]', color.error, ...msg, `\n${getStack()}`)
  prompts(...msg)
}

/**
 * 输出计数日志
 * 输出计数值，用于统计某个操作执行的次数。
 * @param {...any} msg - 要输出的计数日志信息数组
 * @example
 * count('API调用次数')
 * // 输出: API调用次数: 1
 */
export const count = (...msg: any[]) => {
  const type = getLogType()
  type === 'console' && console.count(...msg)
  type === 'prompt' && prompts(...msg)
}