import React from 'react'
import { Descriptions } from 'antd'
import { PageContainer } from '@widget/ui/PageContainer/PageContainer'

const UserDetail: React.FC = () => {
  // 模拟用户数据
  const user = {
    name: '张三',
    age: 25,
    gender: '男'
  };

  return (
    <PageContainer  header={{title: '用户详情页'}}>
      <Descriptions bordered>
        <Descriptions.Item label="姓名">{user.name}</Descriptions.Item>
        <Descriptions.Item label="年龄">{user.age}</Descriptions.Item>
        <Descriptions.Item label="性别">{user.gender}</Descriptions.Item>
      </Descriptions>
    </PageContainer>
  )
}

export default UserDetail