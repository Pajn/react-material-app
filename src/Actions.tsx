import {PropTypes} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip, {TooltipProps} from '@material-ui/core/Tooltip'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import glamorous from 'glamorous'
import {History, Location} from 'history'
import React, {ReactElement, ReactNode} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {withMedia} from 'react-with-media'
import {compose} from 'recompose'
import {row} from 'style-definitions'
import {Omit} from './types'

declare module '@material-ui/core/ButtonBase/ButtonBase' {
  interface ButtonBaseProps {
    to?: string
  }
}

export type Placement = 'menu' | 'toolbar' | 'auto'

export type Action = {
  disabled?: boolean
  label?: string
  ariaLabel?: string
  tooltip?: string | Omit<TooltipProps, 'children'>
  to?: string
  href?: string
  icon?: ReactNode
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void
  /**
   * Determines if the action is placed as a separate icon or in the menu
   * @default auto
   */
  placement?: Placement
  form?: string
  type?: string
}

export type ActionsProps = {
  actions: Array<Action>
  color?: PropTypes.Color
  style?: React.CSSProperties
  tooltipPlacement?: TooltipProps['placement']
}
export type PrivateActionsProps = ActionsProps & {
  isMobile: boolean
  isMouse: boolean
} & {
  location: Location
  history: History
}

const ActionRow = glamorous.div(
  row({horizontal: 'flex-end', vertical: 'center'}),
)

const wrapWithTooltip = (
  tooltip: Omit<TooltipProps, 'children'> | string | undefined,
  tooltipPlacement,
  children: ReactElement<any>,
) =>
  tooltip === undefined ? (
    children
  ) : typeof tooltip === 'string' ? (
    <Tooltip key={children.key!} title={tooltip} placement={tooltipPlacement}>
      {children}
    </Tooltip>
  ) : (
    <Tooltip key={children.key!} placement={tooltipPlacement} {...tooltip}>
      {children}
    </Tooltip>
  )

const enhance = compose<PrivateActionsProps, ActionsProps>(
  withRouter,
  withMedia('(max-width: 700px)', {
    name: 'isMobile',
  }),
  withMedia('(pointer: fine)', {
    name: 'isMouse',
  }),
)

export class ActionsView extends React.Component<
  PrivateActionsProps,
  {anchorEl?: Element; open: boolean}
> {
  state = {
    anchorEl: undefined,
    open: false,
  }

  handleClick = (event: React.MouseEvent<Element>) => {
    this.setState({open: true, anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    const {
      actions,
      color,
      tooltipPlacement,
      isMobile,
      isMouse,
      style,
      history,
    } = this.props

    const icons: Array<Action> = []
    const menuItems: Array<Action> = []
    const auto: Array<Action> = []

    for (let action of actions) {
      if (action.href !== undefined) {
        const onClick = action.onClick
        action = {
          ...action,
          onClick: () => {
            history.push(action.href!)
            if (onClick) {
              onClick!()
            }
          },
        }
      }
      switch (action.placement) {
        case undefined:
        case 'auto':
          auto.push(action)
          break
        case 'toolbar':
          icons.push(action)
          break
        case 'menu':
          menuItems.push(action)
          break
      }
    }

    {
      let action: Action
      if (isMobile && icons.length === 0 && auto.length === 1) {
        icons.push(auto.shift()!)
      } else {
        while ((action = auto.shift()!) !== undefined) {
          if (
            !isMobile &&
            (icons.length < 2 || (auto.length === 1 && icons.length === 2))
          ) {
            icons.push(action)
          } else {
            menuItems.unshift(action)
          }
        }
      }
    }

    return (
      <ActionRow style={style}>
        {icons.map(
          (item, i) =>
            item.icon && !item.label ? (
              wrapWithTooltip(
                item.tooltip,
                tooltipPlacement,
                <IconButton
                  key={item.label || i}
                  component={item.to ? (Link as any) : undefined}
                  aria-label={item.ariaLabel}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  type={item.type}
                  form={item.form}
                  href={item.href}
                  to={item.to}
                  color={color}
                >
                  <Icon children={item.icon} />
                </IconButton>,
              )
            ) : (
              <Button
                key={item.label || i}
                component={item.to ? (Link as any) : undefined}
                onClick={item.onClick}
                disabled={item.disabled}
                type={item.type}
                form={item.form}
                href={item.href}
                to={item.to}
                style={{minWidth: 0}}
                color={color}
                size={isMouse ? 'small' : 'medium'}
                aria-label={item.ariaLabel}
              >
                {item.icon && (
                  <ListItemIcon style={{marginRight: 8}}>
                    <Icon children={item.icon} />
                  </ListItemIcon>
                )}
                {item.label}
              </Button>
            ),
        )}
        {menuItems.length > 0 && [
          <IconButton
            key="button"
            aria-label="More"
            aria-owns={this.state.open ? 'action-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
            color={color}
          >
            <MoreVertIcon />
          </IconButton>,
          <Menu
            key="menu"
            id="action-menu"
            open={this.state.open}
            onClose={this.handleClose}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {menuItems.map((item, i) => (
              <MenuItem
                key={item.label || i}
                aria-label={item.ariaLabel}
                component={item.to ? (Link as any) : undefined}
                dense={isMouse}
                onClick={e => {
                  this.handleClose()
                  if (item.onClick) return item.onClick(e)
                }}
                disabled={item.disabled}
                type={item.type}
                form={item.form}
                to={item.to}
                href={item.href}
              >
                {item.icon && (
                  <ListItemIcon>
                    <Icon children={item.icon} />
                  </ListItemIcon>
                )}{' '}
                {item.label || ''}
              </MenuItem>
            ))}
          </Menu>,
        ]}
      </ActionRow>
    )
  }
}

/**
 * Display actions in for example a toolbar or a list item.
 *
 * Automatically renders them as separate buttons or in a menu
 * depending on the avalible space.
 */
export const Actions = enhance(ActionsView)
