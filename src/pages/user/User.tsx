import React from 'react';
import { Card, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import './User.css';

const User: React.FC = () => {
  const userInfo: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '姓名',
      children: '张三',
    },
    {
      key: '2',
      label: '年龄',
      children: '28',
    },
  ];

  return (
    <Card title="用户信息" bordered={false} className="user-card">
      <Descriptions 
        items={userInfo} 
        column={1} 
        bordered
      />
    </Card>
  );
};

export default User;