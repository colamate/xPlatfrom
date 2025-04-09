/**
 * 侧边栏配置
 * @author: dbxiao
 */

// 引入路由配置
import { Link } from 'react-router-dom';
import routerMap from './routerMap';

// 侧边栏配置
const siderConf = [
    routerMap.home,
    routerMap.demo
]

// 递归生成侧边栏配置
const siderItems = (items: any[]): any => {
    return items.map((item) => {
        if (item.hasOwnProperty('children')) {
            return {
                ...item,
                label: <Link to={item.path}>{item.label}</Link>,
                children: siderItems(item.children)
            }
        } else {
            return {
                ...item,
                label: <Link to={item.path}>{item.label}</Link>
            };
        }
    });
}

export  { siderConf, siderItems }