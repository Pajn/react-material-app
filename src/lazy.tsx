import {DrawerProps} from '@material-ui/core/Drawer'
import {MenuProps} from '@material-ui/core/Menu'
import MenuItem, {MenuItemProps} from '@material-ui/core/MenuItem'
import {SnackbarProps} from '@material-ui/core/Snackbar'
import {TooltipProps} from '@material-ui/core/Tooltip'
import loadable from 'loadable-components'

export {DrawerProps, MenuProps, MenuItemProps, SnackbarProps, TooltipProps}

export const LazyDrawer = loadable(() => import('@material-ui/core/Drawer'))
export const LazyMenu = loadable(() => import('@material-ui/core/Menu'))
export const LazyMenuItem = (loadable(() =>
  import('@material-ui/core/MenuItem'),
) as any) as typeof MenuItem
export const LazySnackbar = loadable(() => import('@material-ui/core/Snackbar'))
export const LazyTooltip = loadable(() => import('@material-ui/core/Tooltip'))
