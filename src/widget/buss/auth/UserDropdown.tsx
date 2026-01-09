/**
 * @name 用户展示和登出组件
 * @description 展示用户头像和用户名，提供登出功能
 * @author AI
 * @date 2025-12-22
 */

import React from 'react';
import { Dropdown, Avatar, Space, message } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getJsonCookie, removeCookie } from '@widget/libs/cookie';

interface UserInfo {
  id: number;
  username: string;
  gender: string;
}

/**
 * 用户展示和登出组件
 */
export const UserDropdown: React.FC = () => {
  const navigate = useNavigate();

  console.log('userInfo');
  
  // 从cookie获取用户信息
  const userInfo = getJsonCookie<UserInfo>('u_info');
  
  // 登出处理
  const handleLogout = async () => {
    try {
      // 清除前端cookie
      removeCookie('u_token');
      removeCookie('u_info');
      
      // 调用后端登出接口
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      message.success('登出成功');
      navigate('/login');
    } catch (error) {
      console.error('登出失败:', error);
      message.error('登出失败，请重试');
    }
  };
  
  // 下拉菜单项
  const items = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout
    }
  ];
  
  // 如果没有用户信息，不显示组件
  if (!userInfo) {
    return null;
  }

  console.log('userInfo', userInfo);
  
  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Space className="user-info" style={{ cursor: 'pointer' }}>
        <Avatar 
          size="small" 
          icon={<UserOutlined />}
          src={undefined}
        />
        <span className="username">{userInfo.username}</span>
      </Space>
    </Dropdown>
  );
};
