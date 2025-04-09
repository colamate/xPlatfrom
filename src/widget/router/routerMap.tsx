/**
 * @file routerMap.tsx
 * @description 路由配置
 */
import React from 'react'
import { BorderInnerOutlined, HddOutlined } from '@ant-design/icons'
import { Route } from './types'



const Home = React.lazy(() => import('@pages/home/Home'))
const Demo = React.lazy(() => import('@pages/demo/Demo'))

const routerMap: { [key: string]: Route } = {
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
        component: <Demo />
    }
}

export default routerMap