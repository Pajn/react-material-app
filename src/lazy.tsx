import {DrawerProps} from '@material-ui/core/Drawer'
import {MenuProps} from '@material-ui/core/Menu'
import {MenuItemProps} from '@material-ui/core/MenuItem'
import {TooltipProps} from '@material-ui/core/Tooltip'
import loadable from 'loadable-components'

export {DrawerProps, MenuProps, MenuItemProps, TooltipProps}

export const LazyDrawer = loadable(() => import('@material-ui/core/Drawer'))
export const LazyMenu = loadable(() => import('@material-ui/core/Menu'))
export const LazyMenuItem = loadable(() => import('@material-ui/core/MenuItem'))
export const LazyTooltip = loadable(() => import('@material-ui/core/Tooltip'))
