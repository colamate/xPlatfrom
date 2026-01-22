/**
 * API响应类型定义
 * @template T 响应数据类型
 * @property {number} code 状态码，0表示成功
 * @property {string} message 状态描述
 * @property {T} data 响应数据
 * @example
 * {
 *   code: 0,
 *   message: '成功',
 *   data: {
 *     id: 123,
 *     username: 'example',
 *     email: 'example@example.com'
 *   }
 * }
 */
// 定义API响应类型
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 用户信息类型定义
export interface UserInfo {
  id: number;
  username: string;
  email: string;
  real_name?: string;
  phone?: string;
  avatar_url?: string;
  birthdate?: string;
  gender?: number;
  status?: number;
  theme?: 'light' | 'dark';
  font_size?: 'compact' | 'standard' | 'large';
}

// 主题设置类型定义
export interface ThemeSettings {
  theme: 'light' | 'dark';
  fontSize: 'compact' | 'standard' | 'large';
}