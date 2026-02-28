import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Button, Form, Input, Select, DatePicker, message } from 'antd';
import type { FormInstance } from 'antd/lib/form';
import { api } from '@widget/api/comm/api';
import type { UserInfo } from '@widget/api/comm/interface';

const { Option } = Select;
const { RangePicker } = DatePicker;

const PersonalInfo: React.FC = () => {
  const [form] = Form.useForm<FormInstance>();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  console.log(111111, userInfo);
  debugger;

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const response = await api.getUserInfo();
      if (response.code === 0) {
        setUserInfo(response.data);
        form.setFieldsValue({
          username: response.data.username,
          email: response.data.email,
          real_name: response.data.real_name,
          phone: response.data.phone,
          gender: response.data.gender,
          birthdate: response.data.birthdate ? new Date(response.data.birthdate) : null,
        });
      } else {
        message.error('获取用户信息失败');
      }
    } catch (error) {
      message.error('获取用户信息失败');
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [location.href]);

  // 保存用户信息
  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      // 转换日期格式
      if (values.birthdate) {
        values.birthdate = values.birthdate.format('YYYY-MM-DD');
      }

      const response = await api.updateUserInfo(values);
      if (response.code === 200) {
        message.success('保存成功');
        fetchUserInfo();
      }
    } catch (error) {
      message.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="个人中心" style={{ marginBottom: 24 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={userInfo || {}}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input disabled placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            name="real_name"
            label="真实姓名"
            rules={[{ required: true, message: '请输入真实姓名' }]}
          >
            <Input placeholder="请输入真实姓名" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="手机号码"
            rules={[{ required: true, message: '请输入手机号码' }]}
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>

          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Select placeholder="请选择性别">
              <Option value={0}>未知</Option>
              <Option value={1}>男性</Option>
              <Option value={2}>女性</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="birthdate"
            label="出生日期"
            rules={[{ required: true, message: '请选择出生日期' }]}
          >
            <DatePicker style={{ width: '100%' }} placeholder="请选择出生日期" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            保存修改
          </Button>
        </Form.Item>
      </Form>

      <Descriptions title="账户状态" bordered>
        <Descriptions.Item label="状态">
          <span style={{ color: userInfo?.status === 1 ? '#52c41a' : '#ff4d4f' }}>
            {userInfo?.status === 1 ? '启用' : '禁用'}
          </span>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default PersonalInfo;
