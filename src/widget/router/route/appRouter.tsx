/**
 * @name 应用路由配置
 * @author dbxiao
 * @date 2025/05/02
 * @description 
 * 定义 getAppRouteItem 函数用于递归遍历 routerMap 并将所有路由项（包括子路由）收集到一个数组中，
 * 最后基于该函数生成 appRoutes 作为应用路由配置，并添加了相应注释说明功能。
 */
import { routerMap } from "../router"
import { RouteMap } from "../types"

const getAppRouteItem = (routerMap: {[key: string]: RouteMap}): RouteMap[] => {
    const routes: RouteMap[] = []
    Object.values(routerMap).map((item: any) => {
      if (item.hasOwnProperty('children')) {
        const { children } = item
        routes.push(item)
        Object.values(children).map((child: any) => {
          routes.push(child)
        })
      } else {
        routes.push(item)
      }
    })
    return routes
}

/**
 * @name 应用路由配置
 * @description 应用路由配置，使用 routerMap 中的 key 进行配置
 */
export const appRoutes:RouteMap[] = getAppRouteItem(routerMap)