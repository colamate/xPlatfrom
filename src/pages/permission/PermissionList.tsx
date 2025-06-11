import React, { useState } from 'react';
import { Table, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routerMap } from '@widget/router';

const PermissionList: React.FC = () => {
  const [permissions] = useState([
    { id: 1, name: '查看用户', description: '允许查看用户信息' },
    { id: 2, name: '编辑用户', description: '允许编辑用户信息' },
  ]);

  const navigate = useNavigate();

  const columns = [
    { title: '权限 ID', dataIndex: 'id', key: 'id' },
    { title: '权限名称', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Space>
          <Button
            type="link"
            onClick={() => navigate(`${routerMap.permission.children?.permissionEdit.path}?id=${record.id}`)}
          >
            编辑
          </Button>
          <Button
            type="link"
            onClick={() => navigate(`${routerMap.permission.children?.permissionDetail.path}?id=${record.id}`)}
          >
            查看详情
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>权限列表页</h1>
      <Table columns={columns} dataSource={permissions} />
    </div>
  );
};

export default PermissionList;
