import React, { useState } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routerMap } from '@widget/router'

const { Search } = Input;

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState([
    { id: 1, name: '张三', gender: '男', age: 25 },
    { id: 2, name: '李四', gender: '女', age: 30 },
    { id: 3, name: '王五', gender: '男', age: 35 },
  ]);

  const filteredUsers = users.filter(user => {
    return Object.values(user).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const columns = [
    { title: '用户 ID', dataIndex: 'id', key: 'id' },
    { title: '用户名', dataIndex: 'name', key: 'name' },
    { title: '性别', dataIndex: 'gender', key: 'gender' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
  ];

  const navigate = useNavigate();

  const onRow = (record: any) => {
    return {
      onClick: () => {
        // 假设用户详情页的路由是 /user/detail/:id
        navigate(`/user/detail/${record.id}`);
      },
    };
  };

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
        <Button type="primary">新增用户</Button>
      </Space>
      <Table columns={columns} dataSource={filteredUsers} onRow={onRow} />
    </div>
  );
};

export default UserManagement;