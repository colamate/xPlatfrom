/**
 * @name 路由配置
 * @description 
    * 路由配置，仅引入 page 页面，
    * 通过 React.lazy 对页面进行懒加载引入，定义全局路由配置 routerMap 来描述页面层级、图标、路径和组件等信息，
    * 并基于 routerMap 配置侧边路由 siderRoutes 用于管理页面侧边栏菜单，
    * 最后将 routerMap 和 siderRoutes 导出供 AppRoute 和 SiderRoute 使用。
 * @example 
    * 路由配置步骤：
    * 1. 页面引入
    * 2. 定义全局路由配置
    * 3. 配置侧边路由
 * @author dbxiao
 * @date 2025/04/09
 */

import React from 'react'
import { BorderInnerOutlined, HddOutlined, UserOutlined } from '@ant-design/icons'
import { RouteMap } from './types'

/**
 * @name 页面引入
 * @description 页面懒加载引入
 **/
const Home = React.lazy(() => import('@pages/home/Home'))
const Demo = React.lazy(() => import('@pages/demo/Demo'))
const User = React.lazy(() => import('@pages/user/User'))

/**
 * @name 全局路由配置
 * @description 全局路由配置，AppRoute 和 SiderRoute 均依赖使用该配置，使用 key 进行配置
 */
const routerMap: { [key: string]: RouteMap } = {
  home: {
    key: 'home',
    label: 'Home',
    path: '/home',
    icon: <BorderInnerOutlined />,
    component: <Home />,
  },
  demo: {
    key: 'demo',
    label: 'Demo',
    path: '/demo',
    icon: <HddOutlined />,
    component: <Demo />,
    children: [
      {
        key: 'user',
        label: '用户信息',
        path: '/user',
        icon: <UserOutlined />,
        component: <User />
      }
    ]
  }
}

/**
 * @name 侧边路由配置
 * @description 侧边路由配置，管理页面侧边栏菜单，使用 routerMap 中的 key 进行配置
 */
const siderRoutes = [
  routerMap.home,
  routerMap.demo
]

export {
  routerMap,
  siderRoutes
}