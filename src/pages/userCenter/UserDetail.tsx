import React from 'react';
import { Card, Descriptions } from 'antd';

const UserDetail: React.FC = () => {
  // 模拟用户数据
  const user = {
    name: '张三',
    age: 25,
    gender: '男'
  };

  return (
    <Card title="用户详情页">
      <Descriptions bordered>
        <Descriptions.Item label="姓名">{user.name}</Descriptions.Item>
        <Descriptions.Item label="年龄">{user.age}</Descriptions.Item>
        <Descriptions.Item label="性别">{user.gender}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default UserDetail;