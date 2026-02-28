/**
 * @name API请求封装
 * @description 基于Axios的API请求封装，包含请求拦截、响应拦截、错误处理等
 * @author AI
 * @date 2025-12-22
 */

import message from 'antd/es/message';
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from '@widget/libs/cookie';

const SUCC_CODE = 0;

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
    return Promise.reject(new Error(data || '请求失败'));
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

export default apiInstance;
