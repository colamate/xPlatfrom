/**
 * @name 侧边栏路由
 * @author: dbxiao
 * @date 2025/05/02
 * @description 
 * 侧边栏实例，该组件借助 antd 库的 Layout 和 Menu 组件
 * 依据 siderRoutes 递归生成侧边栏菜单，
 * 菜单项通过 react-router-dom 的 Link 组件实现路由跳转。
 */

// 引入路由配置
import { Link } from 'react-router-dom'
import { siderRoutes } from '../router'
import { Layout, Menu } from 'antd'

// 引入类型定义
import { RouteMap } from '../types';
import type { MenuProps } from 'antd';

// 定义侧边栏菜单项类型
type SiderMenuItem = MenuProps['items'][number];

// 递归生成侧边栏配置
const siderItems = (items: RouteMap[]): SiderMenuItem[] => {
    return items.map((item) => {
        if (item.children) {
            const { children } = item;
            const childrenSiders = Object.values(children);
            return {
                ...item,
                label: <Link to={item.path}>{item.label}</Link>,
                children: siderItems(childrenSiders as RouteMap[])
            } as SiderMenuItem;
        } else {
            return {
                ...item,
                label: <Link to={item.path}>{item.label}</Link>
            } as SiderMenuItem;
        }
    });
}

const SiderRouter: React.FC = () => {
    const { Sider } = Layout
    return (
        <Sider width={200} theme="light" style={{ height: 'calc(100vh - 64px)' }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%', borderRight: 0 }}
                items={siderItems(siderRoutes)}>
            </Menu>
        </Sider>
    )
}

export  { SiderRouter }