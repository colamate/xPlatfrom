/**
 * Cookie 工具库
 * 
 * 提供浏览器端 Cookie 的操作功能，包括读取、写入、修改和删除。
 * 支持设置过期时间、路径、域名、安全标志等选项。
 * 
 * @author xiaoxiao72@jd.com
 * @copyright jd.com
 * @module cookie
 */

/**
 * Cookie 选项接口
 */
export interface CookieOptions {
  /** 过期时间（天数），默认为 7 天 */
  expires?: number;
  /** 过期时间（Date 对象），优先级高于 expires */
  expiresDate?: Date;
  /** Cookie 路径，默认为 '/' */
  path?: string;
  /** Cookie 域名 */
  domain?: string;
  /** 是否仅通过 HTTPS 传输 */
  secure?: boolean;
  /** SameSite 属性，防止 CSRF 攻击 */
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * 默认 Cookie 选项
 */
const DEFAULT_OPTIONS: CookieOptions = {
  expires: 7,
  path: '/',
  sameSite: 'lax'
};

/**
 * 设置 Cookie
 * 
 * @param {string} name - Cookie 名称
 * @param {string} value - Cookie 值
 * @param {CookieOptions} options - Cookie 选项
 * @example
 * // 设置基本 Cookie
 * setCookie('username', 'john')
 * 
 * // 设置带过期时间的 Cookie
 * setCookie('token', 'abc123', { expires: 30 })
 * 
 * // 设置带安全选项的 Cookie
 * setCookie('session', 'xyz789', { 
 *   secure: true, 
 *   sameSite: 'strict' 
 * })
 */
export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
): void => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  
  // 设置过期时间
  if (opts.expiresDate) {
    cookieString += `; expires=${opts.expiresDate.toUTCString()}`;
  } else if (opts.expires) {
    const date = new Date();
    date.setTime(date.getTime() + opts.expires * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${date.toUTCString()}`;
  }
  
  // 设置路径
  if (opts.path) {
    cookieString += `; path=${opts.path}`;
  }
  
  // 设置域名
  if (opts.domain) {
    cookieString += `; domain=${opts.domain}`;
  }
  
  // 设置安全标志
  if (opts.secure) {
    cookieString += '; secure';
  }
  
  // 设置 SameSite
  if (opts.sameSite) {
    cookieString += `; samesite=${opts.sameSite}`;
  }
  
  document.cookie = cookieString;
};

/**
 * 获取 Cookie 值
 * 
 * @param {string} name - Cookie 名称
 * @returns {string | null} Cookie 值，如果不存在则返回 null
 * @example
 * // 获取 Cookie
 * const username = getCookie('username')
 * if (username) {
 *   console.log('用户名:', username)
 * }
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  
  return null;
};

/**
 * 获取所有 Cookie
 * 
 * @returns {Record<string, string>} 包含所有 Cookie 的对象
 * @example
 * // 获取所有 Cookie
 * const allCookies = getAllCookies()
 * console.log(allCookies)
 * // 输出: { username: 'john', token: 'abc123' }
 */
export const getAllCookies = (): Record<string, string> => {
  const cookies: Record<string, string> = {};
  const cookieStrings = document.cookie.split(';');
  
  for (const cookieString of cookieStrings) {
    const [name, value] = cookieString.trim().split('=');
    if (name && value) {
      cookies[decodeURIComponent(name)] = decodeURIComponent(value);
    }
  }
  
  return cookies;
};

/**
 * 修改 Cookie
 * 
 * 通过重新设置 Cookie 来修改其值和选项。
 * 
 * @param {string} name - Cookie 名称
 * @param {string} value - 新的 Cookie 值
 * @param {CookieOptions} options - 新的 Cookie 选项
 * @example
 * // 修改 Cookie 值
 * updateCookie('username', 'jane')
 * 
 * // 修改 Cookie 并延长过期时间
 * updateCookie('token', 'newToken123', { expires: 30 })
 */
export const updateCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
): void => {
  setCookie(name, value, options);
};

/**
 * 删除 Cookie
 * 
 * 通过设置过期时间为过去的时间来删除 Cookie。
 * 
 * @param {string} name - Cookie 名称
 * @param {CookieOptions} options - Cookie 选项（用于匹配路径和域名）
 * @example
 * // 删除 Cookie
 * removeCookie('username')
 * 
 * // 删除特定路径下的 Cookie
 * removeCookie('session', { path: '/app' })
 */
export const removeCookie = (name: string, options: CookieOptions = {}): void => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // 设置过期时间为过去的时间
  const pastDate = new Date();
  pastDate.setTime(pastDate.getTime() - 1);
  
  setCookie(name, '', {
    ...opts,
    expiresDate: pastDate
  });
};

/**
 * 检查 Cookie 是否存在
 * 
 * @param {string} name - Cookie 名称
 * @returns {boolean} Cookie 是否存在
 * @example
 * // 检查 Cookie 是否存在
 * if (hasCookie('token')) {
 *   console.log('用户已登录')
 * }
 */
export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== null;
};

/**
 * 清除所有 Cookie
 * 
 * 删除当前域名下所有可访问的 Cookie。
 * 
 * @example
 * // 清除所有 Cookie
 * clearAllCookies()
 */
export const clearAllCookies = (): void => {
  const cookies = getAllCookies();
  Object.keys(cookies).forEach(name => {
    removeCookie(name);
  });
};

/**
 * 获取 JSON 格式的 Cookie
 * 
 * 将 Cookie 值解析为 JSON 对象。
 * 
 * @param {string} name - Cookie 名称
 * @returns {T | null} 解析后的 JSON 对象，如果不存在或解析失败则返回 null
 * @example
 * // 设置 JSON Cookie
 * setCookie('userInfo', JSON.stringify({ id: 1, name: 'John' }))
 * 
 * // 获取 JSON Cookie
 * const userInfo = getJsonCookie<{ id: number; name: string }>('userInfo')
 * if (userInfo) {
 *   console.log(userInfo.name) // 输出: John
 * }
 */
export const getJsonCookie = <T = any>(name: string): T | null => {
  const value = getCookie(name);
  if (!value) {
    return null;
  }
  
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`解析 Cookie ${name} 失败:`, error);
    return null;
  }
};

/**
 * 设置 JSON 格式的 Cookie
 * 
 * 将对象序列化为 JSON 字符串后存储到 Cookie。
 * 
 * @param {string} name - Cookie 名称
 * @param {any} value - 要存储的对象
 * @param {CookieOptions} options - Cookie 选项
 * @example
 * // 设置 JSON Cookie
 * setJsonCookie('userInfo', { id: 1, name: 'John', age: 30 })
 * 
 * // 获取 JSON Cookie
 * const userInfo = getJsonCookie('userInfo')
 */
export const setJsonCookie = (
  name: string,
  value: any,
  options: CookieOptions = {}
): void => {
  try {
    const jsonString = JSON.stringify(value);
    setCookie(name, jsonString, options);
  } catch (error) {
    console.error(`序列化 Cookie ${name} 失败:`, error);
  }
};