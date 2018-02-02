import glamorous from 'glamorous'
import {History, Location} from 'history'
import {PropTypes} from 'material-ui'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import IconButton from 'material-ui/IconButton'
import {ListItemIcon} from 'material-ui/List'
import Menu, {MenuItem} from 'material-ui/Menu'
import React, {ReactNode} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {withMedia} from 'react-with-media'
import {compose} from 'recompose'
import {row} from 'style-definitions'

declare module 'material-ui/ButtonBase/ButtonBase' {
  interface ButtonBaseProps {
    to?: string
  }
}

export type Placement = 'menu' | 'toolbar' | 'auto'

export type Action = {
  disabled?: boolean
  label?: string
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
    const {actions, color, isMobile, isMouse, style, history} = this.props

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
              <IconButton
                key={item.label || i}
                component={item.to ? (Link as any) : undefined}
                aria-label={item.label}
                onClick={item.onClick}
                disabled={item.disabled}
                type={item.type}
                form={item.form}
                href={item.href}
                to={item.to}
                color={color}
              >
                <Icon children={item.icon} />
              </IconButton>
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
