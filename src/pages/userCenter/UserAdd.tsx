import React from 'react'
import { Form, Input, Button, Select } from 'antd'
import { PageContainer, ProCard } from '@ant-design/pro-components'

const { Option } = Select;

const UserAdd: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('表单提交数据:', values);
  };

  return (
    <PageContainer  header={{title: '用户新增页'}}>
      <Form
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 400, margin: '0 auto' }}
      >
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          label="年龄"
          name="age"
          rules={[{ required: true, message: '请输入年龄' }]}
        >
          <Input type="number" placeholder="请输入年龄" />
        </Form.Item>
        <Form.Item
          label="性别"
          name="gender"
          rules={[{ required: true, message: '请选择性别' }]}
        >
          <Select placeholder="请选择性别">
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};

export default UserAdd;