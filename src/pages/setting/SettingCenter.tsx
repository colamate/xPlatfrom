import React from 'react';
import { Tabs, Layout } from 'antd';
import PersonalInfo from './PersonalInfo';
import SecuritySetting from './SecuritySetting';
import ThemeSetting from './ThemeSetting';
import { SettingOutlined, UserOutlined, LockOutlined, BulbOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { TabPane } = Tabs;

const SettingCenter: React.FC = () => {
  return (
    <Content style={{ margin: '0 16px' }}>
      <Tabs
        defaultActiveKey="1"
        type="card"
        style={{ minHeight: 600 }}
        items={[
          {
            key: '1',
            label: (
              <span>
                <UserOutlined />
                个人中心
              </span>
            ),
            children: <PersonalInfo />,
          },
          {
            key: '2',
            label: (
              <span>
                <LockOutlined />
                安全设置
              </span>
            ),
            children: <SecuritySetting />,
          },
          {
            key: '3',
            label: (
              <span>
                <BulbOutlined />
                主题设置
              </span>
            ),
            children: <ThemeSetting />,
          },
        ]}
      />
    </Content>
  );
};

export default SettingCenter;
