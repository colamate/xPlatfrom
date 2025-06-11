import React from 'react';
import { Form, Input, Button } from 'antd';

const PermissionEdit: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('编辑权限提交数据:', values);
  };

  return (
    <div>
      <h1>权限编辑页</h1>
      <Form
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 400, margin: '0 auto' }}
      >
        <Form.Item
          label="权限名称"
          name="name"
          rules={[{ required: true, message: '请输入权限名称' }]}
        >
          <Input placeholder="请输入权限名称" />
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          rules={[{ required: true, message: '请输入描述' }]}
        >
          <Input placeholder="请输入描述" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PermissionEdit;
