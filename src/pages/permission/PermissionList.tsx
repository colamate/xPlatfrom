import React from 'react'
import { Table, Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { routerMap } from '@widget/router'
import { PageContainer } from '@widget/ui/PageContainer/PageContainer'

const PermissionList: React.FC = () => {
  const navigate = useNavigate();

  const data = [
    { id: 1, name: '查看用户', description: '允许查看用户信息' },
    { id: 2, name: '编辑用户', description: '允许编辑用户信息' },
  ];

  const columns = [
    { title: '权限 ID', dataIndex: 'id', key: 'id' },
    { title: '权限名称', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              navigate(`${routerMap.permission?.children?.permissionEdit?.path}?id=${record.id}`);
            }}
          >
            编辑
          </Button>
          <Button type="link" danger>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer  header={{title: '权限列表'}}>
      <Table dataSource={data} columns={columns} rowKey="id" />
    </PageContainer>
  )
    
}

export default PermissionList