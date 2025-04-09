import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Spin, Layout, Menu } from 'antd'
import { Outlet } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { appRoutes } from '@widget/router/index'
import { AISender } from "@widget/model/ai/Sender"
import { siderConf, siderItems } from '@widget/router'
import './main.css'
const App: React.FC = () => {
  const { Header, Sider, Content } = Layout
  return (
      <Layout>
          <Header style={{ color: 'white' }}>
              <div>Ai-Coder</div>
          </Header>
          <Layout>
              <Sider width={200} theme="light">
                  <Menu
                      mode="inline"
                      defaultSelectedKeys={['1']}
                      style={{ height: '100%', borderRight: 0 }}
                      items={siderItems(siderConf)}
                  >
                  </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                  <Content>
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