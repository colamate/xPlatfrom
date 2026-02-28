
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
import apiInstance from '@widget/api/comm/apiInstance';
import { ApiResponse } from '@widget/api/comm/interface';

// 导出API对象，包含所有业务接口
export const api = {
  /**
   * GET请求
   * @param url 请求URL
   * @param params 请求参数
   * @returns Promise<ApiResponse<T>>
   */
  get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    return apiInstance.get<ApiResponse<T>>(url, { params }).then(res => res.data);
  },

  /**
   * POST请求
   * @param url 请求URL
   * @param data 请求数据
   * @returns Promise<ApiResponse<T>>
   */
  post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return apiInstance.post<ApiResponse<T>>(url, data).then(res => res.data);
  },

  /**
   * PUT请求
   * @param url 请求URL
   * @param data 请求数据
   * @returns Promise<ApiResponse<T>>
   */
  put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return apiInstance.put<ApiResponse<T>>(url, data).then(res => res.data);
  },

  /**
   * DELETE请求
   * @param url 请求URL
   * @param params 请求参数
   * @returns Promise<ApiResponse<T>>
   */
  delete<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    return apiInstance.delete<ApiResponse<T>>(url, { params }).then(res => res.data);
  }
};