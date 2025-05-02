export interface RouteMap {
    key: string
    label: string
    path?: string
    icon?: React.ReactNode
    component?: React.ReactNode,
    children?: RouteMap | any
}