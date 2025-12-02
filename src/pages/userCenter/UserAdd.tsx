import React from 'react'
import { Form, Input, Button, Select, DatePicker } from 'antd'
import { PageContainer } from '@widget/ui/PageContainer/PageContainer'

const { Option } = Select;

// 用户表单数据类型定义
interface UserFormData {
    username: string;
    password: string;
    email: string;
    real_name: string;
    phone: string;
    status: number;
    birthdate: string;
    gender: number;
}

const UserAdd: React.FC = () => {
    const onFinish = (values: UserFormData) => {
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
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                    label="用户密码"
                    name="password"
                    rules={[{ required: true, message: '请输入用户密码' }]}
                >
                    <Input.Password placeholder="请输入用户密码" />
                </Form.Item>
                <Form.Item
                    label="用户邮箱"
                    name="email"
                    rules={[
                        { required: true, message: '请输入用户邮箱' },
                        { type: 'email', message: '请输入有效的邮箱地址' }
                    ]}
                >
                    <Input placeholder="请输入用户邮箱" />
                </Form.Item>
                <Form.Item
                    label="用户真实姓名"
                    name="real_name"
                    rules={[{ required: true, message: '请输入用户真实姓名' }]}
                >
                    <Input placeholder="请输入用户真实姓名" />
                </Form.Item>
                <Form.Item
                    label="用户手机号"
                    name="phone"
                    rules={[
                        { required: true, message: '请输入用户手机号' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
                    ]}
                >
                    <Input placeholder="请输入用户手机号" />
                </Form.Item>
                <Form.Item
                    label="用户状态"
                    name="status"
                    rules={[{ required: true, message: '请选择用户状态' }]}
                >
                    <Select placeholder="请选择用户状态">
                        <Option value={0}>禁用</Option>
                        <Option value={1}>启用</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="用户出生日期"
                    name="birthdate"
                    rules={[{ required: true, message: '请选择用户出生日期' }]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="用户性别"
                    name="gender"
                    rules={[{ required: true, message: '请选择用户性别' }]}
                >
                    <Select placeholder="请选择用户性别">
                        <Option value={0}>未知</Option>
                        <Option value={1}>男</Option>
                        <Option value={2}>女</Option>
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