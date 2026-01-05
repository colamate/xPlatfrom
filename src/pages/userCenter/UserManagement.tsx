import React, { useState, useEffect } from 'react'
import { Table, Input, Button, Space, Popconfirm, message, Modal, Form, Select, DatePicker } from 'antd'
import { useNavigate } from 'react-router-dom'
import { routerMap } from '@widget/router'
import { PageContainer } from '@widget/ui/PageContainer/PageContainer'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const { Search } = Input
const { Option } = Select

// 用户数据类型定义（参考users.sql表结构）
interface User {
  id: number;
  username: string;
  email: string;
  real_name?: string;
  phone?: string;
  status: number;
  avatar_url?: string;
  birthdate?: string;
  gender: number;
  created_at: string;
  updated_at: string;
}

// 编辑用户表单数据类型
interface EditUserForm {
  username: string;
  email: string;
  real_name?: string;
  phone?: string;
  status: number;
  gender: number;
  birthdate: Date | null;
}

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate()

  // 模拟从API获取用户列表
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // 这里应该调用真实的API
      // const response = await api.get('/users');
      // setUsers(response.data);
      
      // 模拟数据
      setTimeout(() => {
        setUsers([
          { 
            id: 1, 
            username: 'admin', 
            email: 'admin@example.com', 
            real_name: '管理员', 
            phone: '13800138000', 
            status: 1, 
            gender: 1, 
            created_at: '2025-01-01T00:00:00.000Z', 
            updated_at: '2025-01-01T00:00:00.000Z'
          },
          { 
            id: 2, 
            username: 'user1', 
            email: 'user1@example.com', 
            real_name: '用户1', 
            phone: '13800138001', 
            status: 1, 
            gender: 1, 
            created_at: '2025-01-02T00:00:00.000Z', 
            updated_at: '2025-01-02T00:00:00.000Z'
          },
          { 
            id: 3, 
            username: 'user2', 
            email: 'user2@example.com', 
            real_name: '用户2', 
            phone: '13800138002', 
            status: 1, 
            gender: 2, 
            created_at: '2025-01-03T00:00:00.000Z', 
            updated_at: '2025-01-03T00:00:00.000Z'
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      message.error('获取用户列表失败');
      setLoading(false);
      console.error('获取用户列表失败:', error);
    }
  };

  // 组件挂载时获取用户列表
  useEffect(() => {
    fetchUsers();
  }, []);

  // 搜索用户
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.username.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      (user.real_name && user.real_name.toLowerCase().includes(searchLower)) ||
      (user.phone && user.phone.includes(searchTerm))
    );
  });

  // 删除用户
  const handleDelete = (id: number) => {
    setLoading(true);
    try {
      // 这里应该调用真实的API
      // await api.delete(`/api/users/${id}`);
      
      // 模拟删除
      setTimeout(() => {
        setUsers(users.filter(user => user.id !== id));
        message.success('删除用户成功');
        setLoading(false);
      }, 500);
    } catch (error) {
      message.error('删除用户失败');
      setLoading(false);
      console.error('删除用户失败:', error);
    }
  };

  // 打开编辑模态框
  const showEditModal = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue({
      ...user,
      birthdate: user.birthdate ? new Date(user.birthdate) : null,
    });
    setIsModalVisible(true);
  };

  // 关闭编辑模态框
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  // 保存用户编辑
  const handleSave = async (values: EditUserForm) => {
    setLoading(true);
    try {
      if (!editingUser) return;
      
      // 处理出生日期格式
      const updatedValues = {
        ...values,
        birthdate: values.birthdate ? values.birthdate.toISOString().split('T')[0] : null,
      };
      
      // 这里应该调用真实的API
      // const response = await api.put(`/api/users/${editingUser.id}`, updatedValues);
      
      // 模拟更新
      setTimeout(() => {
        setUsers(users.map(user => 
          user.id === editingUser.id ? { ...user, ...updatedValues, birthdate: updatedValues.birthdate ?? undefined, updated_at: new Date().toISOString() } : user
        ));
        message.success('更新用户信息成功');
        setIsModalVisible(false);
        setEditingUser(null);
        form.resetFields();
        setLoading(false);
      }, 1000);
    } catch (error) {
      message.error('更新用户信息失败');
      setLoading(false);
      console.error('更新用户信息失败:', error);
    }
  };

  // 表格列配置
  const columns = [
    { 
      title: '用户 ID', 
      dataIndex: 'id', 
      key: 'id',
      width: 80
    },
    { 
      title: '用户名', 
      dataIndex: 'username', 
      key: 'username'
    },
    { 
      title: '邮箱', 
      dataIndex: 'email', 
      key: 'email'
    },
    { 
      title: '真实姓名', 
      dataIndex: 'real_name', 
      key: 'real_name',
      render: (text: string) => text || '-'
    },
    { 
      title: '手机号', 
      dataIndex: 'phone', 
      key: 'phone',
      render: (text: string) => text || '-'
    },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: number) => (
        <span style={{ color: status === 1 ? '#52c41a' : '#ff4d4f' }}>
          {status === 1 ? '启用' : '禁用'}
        </span>
      )
    },
    { 
      title: '性别', 
      dataIndex: 'gender', 
      key: 'gender',
      render: (gender: number) => {
        const genderMap = { 0: '未知', 1: '男', 2: '女' };
        return genderMap[gender as keyof typeof genderMap];
      }
    },
    { 
      title: '出生日期', 
      dataIndex: 'birthdate', 
      key: 'birthdate',
      render: (birthdate: string) => birthdate || '-'
    },
    { 
      title: '创建时间', 
      dataIndex: 'created_at', 
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleString()
    },
    { 
      title: '操作', 
      key: 'action',
      width: 150,
      render: (_: unknown, record: User) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个用户吗?"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer  header={{title: '用户管理页'}}>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="搜索用户名、邮箱、真实姓名、手机号"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => {
          const userAddPath = routerMap.userCenter.children?.userAdd?.path;
          if (userAddPath) {
            navigate(userAddPath);
          }
        }}>
          新增用户
        </Button>
      </Space>
      
      <Table 
        columns={columns} 
        dataSource={filteredUsers} 
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* 用户编辑模态框 */}
      <Modal
        title="编辑用户"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input disabled={true} placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱!' },
              { type: 'email', message: '请输入有效的邮箱地址!' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            name="real_name"
            label="真实姓名"
          >
            <Input placeholder="请输入真实姓名" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号!' },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态!' }]}
          >
            <Select placeholder="请选择状态">
              <Option value={1}>启用</Option>
              <Option value={0}>禁用</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: '请选择性别!' }]}
          >
            <Select placeholder="请选择性别">
              <Option value={0}>未知</Option>
              <Option value={1}>男</Option>
              <Option value={2}>女</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="birthdate"
            label="出生日期"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel}>取消</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                保存
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  )
}

export default UserManagement