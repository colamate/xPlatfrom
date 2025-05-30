import React, { useState } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routerMap } from '@widget/router'

const { Search } = Input;

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [users] = useState([
    { id: 1, name: '张三', gender: '男', age: 25 },
    { id: 2, name: '李四', gender: '女', age: 30 },
    { id: 3, name: '王五', gender: '男', age: 35 },
  ]);

  const filteredUsers = users.filter(user => {
    return Object.values(user).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const columns = [
    { title: '用户 ID', dataIndex: 'id', key: 'id' },
    { title: '用户名', dataIndex: 'name', key: 'name' },
    { title: '性别', dataIndex: 'gender', key: 'gender' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Button
          type="link"
          onClick={() => navigate(`${routerMap.userCenter.children?.userDetail?.path}?id=${record.id}`)}
        >
          编辑
        </Button>
      ),
    },
  ]

  return (
    <div>
      <h1>用户管理页</h1>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="搜索用户名、性别、年龄"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={() => navigate(routerMap.userCenter.children?.userAdd.path!)}>
          新增用户
        </Button>
      </Space>
      <Table columns={columns} dataSource={filteredUsers} />
    </div>
  );
};

export default UserManagement;