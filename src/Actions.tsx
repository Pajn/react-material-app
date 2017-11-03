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
import {withMedia} from 'react-with-media'
import {compose} from 'recompose'
import {row} from 'style-definitions'

export type Placement = 'menu' | 'toolbar' | 'auto'

export type Action = {
  disabled?: boolean
  label?: string
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
  color?: PropTypes.Color | 'contrast'
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

  handleRequestClose = () => {
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

    return (
      <ActionRow style={style}>
        {icons.map(
          (item, i) =>
            item.icon && !item.label ? (
              <IconButton
                key={item.label || i}
                aria-label={item.label}
                onClick={item.onClick}
                disabled={item.disabled}
                type={item.type}
                form={item.form}
                href={item.href}
                color={color}
              >
                <Icon children={item.icon} />
              </IconButton>
            ) : (
              <Button
                key={item.label || i}
                onClick={item.onClick}
                disabled={item.disabled}
                type={item.type}
                form={item.form}
                href={item.href}
                style={{minWidth: 0}}
                dense={isMouse}
                color={color}
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
            aria-owns={this.state.open ? 'action-menu' : null}
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
            onRequestClose={this.handleRequestClose}
            anchorEl={this.state.anchorEl}
          >
            {menuItems.map((item, i) => (
              <MenuItem
                key={item.label || i}
                dense={isMouse}
                onClick={e => {
                  this.handleRequestClose()
                  if (item.onClick) return item.onClick(e)
                }}
                disabled={item.disabled}
                type={item.type}
                form={item.form}
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

export const Actions = enhance(ActionsView)
