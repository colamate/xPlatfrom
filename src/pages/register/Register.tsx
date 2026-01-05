/**
 * @name 注册页
 * @description 用户注册页面，支持邮箱和密码注册
 * @author AI
 * @date 2025-12-22
 */

import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { PageContainer } from '@widget/ui/PageContainer/PageContainer';
import api from '@widget/libs/api';

const { Title, Paragraph } = Typography;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 注册表单提交
  const onFinish = async (values: { username: string; email: string; password: string; confirmPassword: string }) => {
    setLoading(true);
    try {
      // 验证密码一致性
      if (values.password !== values.confirmPassword) {
        message.error('两次输入的密码不一致');
        setLoading(false);
        return;
      }

      // 模拟API请求
      console.log('注册请求:', values);
      
      // 这里应该调用真实的注册API
      const response = await api.post('/api/auth/register', {
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword
      });

      console.log('注册响应:', response);
      
      // 模拟注册成功
      setTimeout(() => {
        message.success('注册成功，请登录');
        navigate('/login');
        setLoading(false);
      }, 1000);
    } catch (error) {
      message.error('注册失败，请稍后重试');
      setLoading(false);
      console.error('注册失败:', error);
    }
  };

  return (
    <PageContainer>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <Row gutter={[48, 0]} style={{ width: '100%', maxWidth: 1000 }}>
          {/* 左侧展示区 */}
          <Col xs={24} md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#1890ff', marginBottom: 24 }}>
                追光 - AI标准化开发平台
              </Title>
              <Paragraph style={{ fontSize: 18, color: '#666', marginBottom: 32 }}>
                标准化AI自主开发、编辑、上线和发布的平台
              </Paragraph>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ margin: '16px', textAlign: 'left', maxWidth: 200 }}>
                  <h3 style={{ marginBottom: 8 }}>AI自主开发</h3>
                  <p style={{ fontSize: 14, color: '#666' }}>标准化AI完成代码生成、优化和单元测试</p>
                </div>
                <div style={{ margin: '16px', textAlign: 'left', maxWidth: 200 }}>
                  <h3 style={{ marginBottom: 8 }}>流程自动化</h3>
                  <p style={{ fontSize: 14, color: '#666' }}>从需求到上线的全流程AI自动化</p>
                </div>
              </div>
            </div>
          </Col>

          {/* 右侧注册表单 */}
          <Col xs={24} md={12}>
            <Card style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', borderRadius: 8 }}>
              <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
                用户注册
              </Title>
              <Form
                name="register"
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: '请输入用户名!' },
                    { min: 3, message: '用户名长度不能少于3位!' },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="请输入用户名"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: '请输入邮箱!' },
                    { type: 'email', message: '请输入有效的邮箱地址!' },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="请输入邮箱"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: '请输入密码!' },
                    { min: 6, message: '密码长度不能少于6位!' },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="请输入密码"
                    size="large"
                    iconRender={(visible) => (
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    )}
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  rules={[
                    { required: true, message: '请确认密码!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('两次输入的密码不一致!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="请确认密码"
                    size="large"
                    iconRender={(visible) => (
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    )}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    style={{ width: '100%', height: 40 }}
                  >
                    注册
                  </Button>
                </Form.Item>

                <div style={{ textAlign: 'center', marginTop: 16 }}>
                  <Paragraph>已有账号? <Link to="/login">立即登录</Link></Paragraph>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default Register;
