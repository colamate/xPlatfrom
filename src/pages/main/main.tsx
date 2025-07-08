/**
 * @name 应用主入口
 * @description 该文件是整个应用的主入口，负责创建 React 根节点并渲染应用。使用appRoutes、SiderRouter和AISender组件
 * @author: dbxiao
 * @date 2025/05/02
 */

import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Spin, Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { appRoutes } from '@widget/router/index'
import { AISender } from "@widget/model/ai/Sender"
import { SiderRouter } from '@widget/router'
import './main.css'
const App: React.FC = () => {
  const { Header, Content } = Layout
  return (
      <Layout>
          <Header style={{ color: 'white' }}>
              <div>AICoder</div>
          </Header>
          <Layout>
              <SiderRouter />
              <Layout>
                  <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                      <Outlet />
                  </Content>
              </Layout>
          </Layout>
          <AISender />
      </Layout>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Suspense fallback={<Spin tip='正在努力加载数据，请稍后…' style={{ marginTop: 30 }} />}>
        <Routes>
          <Route path="/" element={<App />}>
            {appRoutes.map((item:any, index: number) => (
                <Route key={index} path={item.path} element={item.component} />
            ))}
            <Route path={`*`} element={<Navigate to={'/'} replace />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  </StrictMode>
)