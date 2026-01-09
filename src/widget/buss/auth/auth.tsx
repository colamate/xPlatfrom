/**
 * @name 路由守卫组件
 * @description 检查用户登录状态，保护需要登录的路由
 * @author AI
 * @date 2025-12-22
 */

import { getCookie } from '@widget/libs/cookie';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthGuardProps {
  children?: React.ReactNode;
}

/**
 * 路由守卫组件
 * 检查用户是否登录，未登录则重定向到登录页
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  // 从cookie获取token
  const uInfo = getCookie('u_info');
  
  // 如果有token，允许访问路由
  if (uInfo) {
    return children || <Outlet />;
  }
  
  // 否则重定向到登录页
  return <Navigate to="/login" replace />;
};

/**
 * 登录页面守卫
 * 检查用户是否已登录，已登录则重定向到首页
 */
export const LoginGuard: React.FC<AuthGuardProps> = ({ children }) => {
  // 从cookie获取token
  const uInfo = getCookie('u_info');
  
  // 如果有token，重定向到首页
  if (uInfo) {
    return <Navigate to="/home" replace />;
  }
  
  // 否则允许访问登录/注册页
  return children || <Outlet />;
};
