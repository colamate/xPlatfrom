/**
 * @name 路由配置
 * @author dbxiao
 * @date 2025/04/09
 * @description 
    * 通过 React.lazy 对页面进行懒加载引入；
    * 定义全局路由配置 routerMap 来描述页面层级、图标、路径和组件等信息；
    * 基于 routerMap 配置侧边路由 siderRoutes， 管理页面侧边栏菜单；
    * routerMap 和 siderRoutes 导出供 AppRoute 和 SiderRoute 使用；
    * 定义规范： 路由中的key必须驼峰命名，path中的路径和层级需要和定义 object 层级保持一致。
 * @example 
    * 路由配置步骤：
    * 1. 页面引入
    * 2. 定义全局路由配置
    * 3. 配置侧边路由
 */

import React from 'react'
import { BorderInnerOutlined, TeamOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { RouteMap } from './types'

/**
 * @name 页面引入
 * @description 页面懒加载引入
 **/
const Home = React.lazy(() => import('@pages/home/Home'))
// 引入新页面
const UserManagement = React.lazy(() => import('@pages/userCenter/UserManagement'));
const UserAdd = React.lazy(() => import('@pages/userCenter/UserAdd'));
const UserDetail = React.lazy(() => import('@pages/userCenter/UserDetail'));
const PermissionList = React.lazy(() => import('@pages/permission/PermissionList'));
const PermissionAdd = React.lazy(() => import('@pages/permission/PermissionAdd'));
const PermissionEdit = React.lazy(() => import('@pages/permission/PermissionEdit'));
const PermissionDetail = React.lazy(() => import('@pages/permission/PermissionDetail'));

const routerMap: { [key: string]: RouteMap } = {
    home: {
        key: 'home',
        label: 'Home',
        path: '/home',
        icon: <BorderInnerOutlined />,
        component: <Home />,
    },
    userCenter: {
        key: 'userCenter',
        label: '用户中心',
        icon: <TeamOutlined />,
        children: {
            userManagement: {
                key: 'userManagement',
                label: '用户管理',
                path: '/userCenter/userManagement',
                icon: <TeamOutlined />,
                component: <UserManagement />
            },
            userAdd: {
                key: 'userAdd',
                label: '用户新增',
                path: '/userCenter/userAdd',
                icon: <PlusOutlined />,
                component: <UserAdd />
            },
            userDetail: {
                key: 'userDetail',
                label: '用户详情',
                path: '/userCenter/userDetail',
                icon: <InfoCircleOutlined />,
                component: <UserDetail />
            }
        }
    },
    permission: {
        key: 'permission',
        label: '权限管理',
        icon: <TeamOutlined />,
        children: {
            permissionList: {
                key: 'permissionList',
                label: '权限列表',
                path: '/permission/list',
                icon: <BorderInnerOutlined />,
                component: <PermissionList />
            },
            permissionAdd: {
                key: 'permissionAdd',
                label: '新增权限',
                path: '/permission/add',
                icon: <PlusOutlined />,
                component: <PermissionAdd />
            },
            permissionEdit: {
                key: 'permissionEdit',
                label: '编辑权限',
                path: '/permission/edit',
                icon: <InfoCircleOutlined />,
                component: <PermissionEdit />
            },
            permissionDetail: {
                key: 'permissionDetail',
                label: '权限详情',
                path: '/permission/detail',
                icon: <InfoCircleOutlined />,
                component: <PermissionDetail />
            }
        }
    },
}

/**
 * @name 侧边路由配置
 * @description 侧边路由配置，管理页面侧边栏菜单，使用 routerMap 中的 key 进行配置
 */
const siderRoutes = [
    routerMap.home,
    {
        ...routerMap.userCenter,
        children: {
            userManagement: routerMap.userCenter.children?.userManagement,
            userAdd: routerMap.userCenter.children?.userAdd,
            // 隐藏 userDetail，不包含在侧边栏中
        }
    },
    {
        ...routerMap.permission,
        children: {
            permissionList: routerMap.permission.children?.permissionList,
            permissionAdd: routerMap.permission.children?.permissionAdd,
            // 编辑和详情不在侧边栏中
        }
    }
]

export {
    routerMap,
    siderRoutes
}