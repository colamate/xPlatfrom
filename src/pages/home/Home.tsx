/**
 * @name 首页
 * @description 首页页面
 * @author dbxiao
 * @date 2025/05/28
 */

import React from 'react';
import { PageContainer } from '@ant-design/pro-components';

const Home: React.FC = () => {
  return (
    <PageContainer header={{ title: '首页' }}>
      <div>
        <h1>Home Page</h1>
        <p>This is the Home page.</p>
      </div>
    </PageContainer>
  );
};

export default Home;