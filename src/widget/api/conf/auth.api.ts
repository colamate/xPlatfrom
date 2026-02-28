
/**
 * API业务接口定义
 * @description 定义了所有业务相关的API接口，包括用户信息、主题设置等。
 * @property {function} get GET请求
 * @property {function} post POST请求
 * @property {function} put PUT请求
 * @property {function} delete DELETE请求
 * @property {function} getUserInfo 获取用户信息
 * @property {function} updateUserInfo 更新用户信息
 * @property {function} changePassword 修改密码
 * @property {function} changeEmail 修改邮箱
 * @property {function} getThemeSettings 获取主题设置
 * @property {function} updateThemeSettings 更新主题设置
 * @example
 * // 获取用户信息
 * api.getUserInfo().then(info => console.log(info));
 */
import { ApiResponse, UserInfo, ThemeSettings } from '@widget/api/comm/interface';
import { api } from '@widget/api/comm/api';

// 导出API对象，包含所有业务接口
export const authApi = {
  /**
   * 获取用户信息
   * @returns Promise<ApiResponse<UserInfo>>
   */
  getUserInfo(): Promise<ApiResponse<UserInfo>> {
    return api.get<UserInfo>('/api/user/info', {name: 'xiaoxiao72'});
  },

  /**
   * 更新用户信息
   * @param data 用户信息
   * @returns Promise<ApiResponse<void>>
   */
  updateUserInfo(data: Partial<UserInfo>): Promise<ApiResponse<void>> {
    return api.put<void>('/api/user/info', data);
  },

  /**
   * 修改密码
   * @param data 密码信息
   * @returns Promise<ApiResponse<void>>
   */
  changePassword(data: { oldPassword: string; newPassword: string; confirmPassword: string }): Promise<ApiResponse<void>> {
    return api.put<void>('/api/user/password', data);
  },

  /**
   * 修改邮箱
   * @param data 邮箱信息
   * @returns Promise<ApiResponse<void>>
   */
  changeEmail(data: { email: string; password: string }): Promise<ApiResponse<void>> {
    return api.put<void>('/api/user/email', data);
  },

  /**
   * 保存主题设置
   * @param data 主题设置
   * @returns Promise<ApiResponse<void>>
   */
  saveThemeSettings(data: ThemeSettings): Promise<ApiResponse<void>> {
    return api.put<void>('/api/user/theme', data);
  },
};