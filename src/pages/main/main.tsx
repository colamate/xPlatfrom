/**
 * @name 应用主入口
 * @description 该文件是整个应用的主入口，负责创建 React 根节点并渲染应用。使用appRoutes、SiderRouter和AISender组件
 * @author: dbxiao
 * @date 2025/05/02
 */

import { StrictMode, Suspense, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Spin, Layout, Button } from 'antd'
import { Outlet } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { appRoutes } from '@widget/router/index'
import { SiderRouter } from '@widget/router'
import { AntCloudOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
// import { AIControl } from "@widget/buss/aiControl/aiControl"
import './main.css'


const App: React.FC = () => {
  const { Header, Content, Sider } = Layout
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  const [showSider, setShowSider] = useState(window.innerWidth >= 768)

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      setMobile(isMobile)
      // 在移动端默认隐藏侧边栏，在PC端显示侧边栏
      if (isMobile) {
        setShowSider(false)
      } else {
        setShowSider(true)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 切换侧边栏显示/隐藏
  const toggleSider = () => {
    setShowSider(!showSider)
  }

  return (
      <Layout className="app-layout-header">
          <Header className="app-header">
              {mobile && (
                  <Button 
                    type="text" 
                    icon={showSider ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                    onClick={toggleSider}
                    className="mobile-menu-btn"
                  />
              )}
              <div className='header-logo'>
                  <AntCloudOutlined className='logo' />
                  <span className='text'>追光</span>
              </div>
          </Header>
          <Layout className='app-layout-sider'>
              {showSider && (
                  <Sider
                    width={mobile ? '100%' : 200}
                    theme="light"
                    className="app-sider"
                    style={{ 
                      height: mobile ? 'calc(100vh - 64px)' : 'auto',
                      position: mobile ? 'fixed' : 'relative',
                      zIndex: 999
                    }}
                  >
                    <SiderRouter />
                  </Sider>
              )}
              <Layout className="main-content-layout">
                  <Content className="app-content">
                      <Outlet />
                  </Content>
              </Layout>
          </Layout>
          {/* <AIControl /> */}
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