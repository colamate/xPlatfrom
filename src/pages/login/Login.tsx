/**
 * @name 登录页
 * @description 用户登录页面，支持邮箱和密码登录
 * @author AI
 * @date 2025-12-22
 */

import React, { useState } from 'react'
import { Form, Input, Button, Card, Typography, message, Row, Col } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { PageContainer } from '@widget/ui/PageContainer/PageContainer'
import api from '@widget/api/comm/api'
import { log } from '@widget/libs/log'
import { setCookie, setJsonCookie } from '@widget/libs/cookie'

const { Title, Paragraph } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 登录表单提交
  const onFinish = async (values: { email: string; password: string }) => {
    try {      
      // 这里应该调用真实的登录API
      const response = await api.post('/api/auth/login', values);

      log('登录响应:', response);

      if (response.code === 0) {
        setLoading(true);
        // 模拟登录成功
        setTimeout(() => {
          // 保存token到cookie
          if ((response.data as { token?: string }).token) {
            setCookie('u_token', (response.data as any).token, { maxAge: 7 * 24 * 60 * 60 }); // 7天有效期
          }
          
          // 保存用户信息到cookie
          if (response.data && typeof response.data === 'object' && 'userInfo' in response.data && response.data.userInfo) {
            setJsonCookie('uInfo', response.data.userInfo, { maxAge: 7 * 24 * 60 * 60 }); // 7天有效期
          }
          
          message.success('登录成功');
          navigate('/home');
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      message.error('登录失败，请检查邮箱和密码');
      setLoading(false);
      console.error('登录失败:', error);
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

          {/* 右侧登录表单 */}
          <Col xs={24} md={12}>
            <Card style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', borderRadius: 8 }}>
              <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
                用户登录
              </Title>
              <Form
                name="login"
                onFinish={onFinish}
                layout="vertical"
              >
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

                <Form.Item style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to="/forgot-password">忘记密码?</Link>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    style={{ width: '100%', height: 40 }}
                  >
                    登录
                  </Button>
                </Form.Item>

                <div style={{ textAlign: 'center', marginTop: 16 }}>
                  <Paragraph>还没有账号? <Link to="/register">立即注册</Link></Paragraph>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default Login;
