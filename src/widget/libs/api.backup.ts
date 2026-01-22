/**
 * @name API请求封装
 * @description 基于Axios的API请求封装，包含请求拦截、响应拦截、错误处理等
 * @author AI
 * @date 2025-12-22
 */

import message from 'antd/es/message';
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from './cookie';

const SUCC_CODE = 0

// 创建Axios实例
const apiInstance: AxiosInstance = axios.create({
  baseURL: '', // API基础路径
  timeout: 6000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从cookie获取token
    const token = getCookie('u_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;

    // 成功响应
    if (data.code === SUCC_CODE) {
      return data;
    }
    
    // 业务错误
    return Promise.reject(new Error(data.message || '请求失败'));
  },
  (error) => {
    // 网络错误或服务器错误
    let errorMessage = '请求失败，请稍后重试';
    
    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          errorMessage = data.message || '请求参数错误';
          break;
        case 401:
          errorMessage = '登录已过期，请重新登录';
          // 跳转到登录页
          window.location.href = '/login';
          break;
        case 403:
          errorMessage = '没有权限访问该资源';
          break;
        case 404:
          errorMessage = '请求的资源不存在';
          break;
        case 500:
          errorMessage = '服务器内部错误';
          break;
        default:
          errorMessage = data.message || `请求失败(${status})`;
      }
    } else if (error.request) {
      // 请求已发送，但没有收到响应
      errorMessage = '网络异常，请检查网络连接';
    }
    
    message.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

// 定义API响应类型
interface ApiResponse<T> {
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

// 导出API对象，包含所有业务接口
export const api = {
  /**
   * GET请求
   * @param url 请求URL
   * @param params 请求参数
   * @returns Promise
   */
  get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    return apiInstance.get<ApiResponse<T>>(url, { params }).then(res => res.data);
  },

  /**
   * POST请求
   * @param url 请求URL
   * @param data 请求数据
   * @returns Promise
   */
  post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return apiInstance.post<ApiResponse<T>>(url, data).then(res => res.data);
  },

  /**
   * PUT请求
   * @param url 请求URL
   * @param data 请求数据
   * @returns Promise
   */
  put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return apiInstance.put<ApiResponse<T>>(url, data).then(res => res.data);
  },

  /**
   * DELETE请求
   * @param url 请求URL
   * @param params 请求参数
   * @returns Promise
   */
  delete<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    return apiInstance.delete<ApiResponse<T>>(url, { params }).then(res => res.data);
  },

  /**
   * 获取用户信息
   * @returns Promise<UserInfo>
   */
  getUserInfo(): Promise<ApiResponse<UserInfo>> {
    return api.get<UserInfo>('/api/user/info', {name: 'xiaoxiao72'});
  },

  /**
   * 更新用户信息
   * @param data 用户信息
   * @returns Promise
   */
  updateUserInfo(data: Partial<UserInfo>): Promise<ApiResponse<void>> {
    return api.put<void>('/api/user/info', data);
  },

  /**
   * 修改密码
   * @param data 密码信息
   * @returns Promise
   */
  changePassword(data: { oldPassword: string; newPassword: string; confirmPassword: string }): Promise<ApiResponse<void>> {
    return api.put<void>('/api/user/password', data);
  },

  /**
   * 修改邮箱
   * @param data 邮箱信息
   * @returns Promise
   */
  changeEmail(data: { email: string; password: string }): Promise<ApiResponse<void>> {
    return api.put<void>('/api/user/email', data);
  },

  /**
   * 保存主题设置
   * @param data 主题设置
   * @returns Promise
   */
  saveThemeSettings(data: ThemeSettings): Promise<ApiResponse<void>> {
    return api.put<void>('/api/user/theme', data);
  },
};



export default api;
