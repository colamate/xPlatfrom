import React, { useState } from 'react';
import { Card, Form, Input, Button, message, Tabs } from 'antd';
import { api } from '@widget/api/api';

const { TabPane } = Tabs;
const { Password } = Input;

const SecuritySetting: React.FC = () => {
  const [formPassword] = Form.useForm();
  const [formEmail] = Form.useForm();
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

  // 修改密码
  const handleChangePassword = async (values: any) => {
    setLoadingPassword(true);
    try {
      const response = await api.changePassword(values);
      if (response.code === 200) {
        message.success('密码修改成功');
        formPassword.resetFields();
      }
    } catch (error) {
      message.error('密码修改失败');
    } finally {
      setLoadingPassword(false);
    }
  };

  // 修改邮箱
  const handleChangeEmail = async (values: any) => {
    setLoadingEmail(true);
    try {
      const response = await api.changeEmail(values);
      if (response.code === 200) {
        message.success('邮箱修改成功');
        formEmail.resetFields();
      }
    } catch (error) {
      message.error('邮箱修改失败');
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <Card title="安全设置">
      <Tabs defaultActiveKey="1">
        <TabPane tab="修改密码" key="1">
          <Form
            form={formPassword}
            layout="vertical"
            onFinish={handleChangePassword}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="oldPassword"
              label="旧密码"
              rules={[{ required: true, message: '请输入旧密码' }]}
            >
              <Password placeholder="请输入旧密码" />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="新密码"
              rules={[{ required: true, message: '请输入新密码' }, { min: 6, message: '密码长度不能少于6位' }]}
            >
              <Password placeholder="请输入新密码" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="确认新密码"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: '请确认新密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                }),
              ]}
            >
              <Password placeholder="请确认新密码" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loadingPassword}>
                修改密码
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane tab="修改邮箱" key="2">
          <Form
            form={formEmail}
            layout="vertical"
            onFinish={handleChangeEmail}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="newEmail"
              label="新邮箱"
              rules={[{ required: true, message: '请输入新邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}
            >
              <Input placeholder="请输入新邮箱" />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loadingEmail}>
                修改邮箱
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default SecuritySetting;
