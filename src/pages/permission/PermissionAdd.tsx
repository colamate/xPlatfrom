import React from 'react';
import { Form, Input, Button } from 'antd';
import { PageContainer } from '@widget/ui/PageContainer/PageContainer'

const PermissionAdd: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('新增权限提交数据:', values);
  };

  return (
    <PageContainer header={{ title: '新增权限' }}>
      <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400, margin: '0 auto' }}>
        <Form.Item
          label="权限名称"
          name="name"
          rules={[{ required: true, message: '请输入权限名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          rules={[{ required: true, message: '请输入权限描述' }]}
        >
          <Input.TextArea />
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

export default PermissionAdd;