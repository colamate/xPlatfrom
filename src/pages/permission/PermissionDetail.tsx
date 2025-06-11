import React from 'react';
import { Card, Descriptions } from 'antd';

const PermissionDetail: React.FC = () => {
  // 模拟权限数据
  const permission = {
    id: 1,
    name: '查看用户',
    description: '允许查看用户信息',
  };

  return (
    <Card title="权限详情页">
      <Descriptions bordered>
        <Descriptions.Item label="权限 ID">{permission.id}</Descriptions.Item>
        <Descriptions.Item label="权限名称">{permission.name}</Descriptions.Item>
        <Descriptions.Item label="描述">{permission.description}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default PermissionDetail;
