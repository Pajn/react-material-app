import {StyledComponentProps} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {Theme} from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import BackIcon from '@material-ui/icons/ArrowBack'
import MenuIcon from '@material-ui/icons/Menu'
import {History, Location} from 'history'
import React, {ReactNode} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {compose} from 'recompose'
import {column, flex, row} from 'style-definitions'
import {Action, Actions} from '../Actions'
import {LazyDrawer, LazySnackbar, SnackbarProps} from '../lazy'
import {
  Notification,
  ScaffoldContext,
  Section,
  scaffoldContext,
} from './context'

const drawerWidth = 240
const Container = (props: React.HTMLProps<HTMLDivElement>) => (
  <div {...props} style={{...row({flex: 1}), position: 'relative'}} />
)
const ContentContainer = (props: React.HTMLProps<HTMLDivElement>) => (
  <div {...props} style={column({flex: 1})} />
)
const styles = (theme: Theme) => ({
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none' as 'none',
    },
  },
  drawerPaper: {
    width: 250,
    height: 'calc(100% + 56px)',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative' as 'relative',
      height: '100%',
    },
  },
  docked: {
    position: 'relative' as 'relative',
  },
})

export type ScaffoldProps = {
  appName: string
  appBar?:
    | false
    | {
        position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative'
        elevated?: boolean
      }
  drawer?: ReactNode
  basePath?: string
  snackbar?: {
    anchorOrigin: SnackbarProps['anchorOrigin']
    autoHideDuration: SnackbarProps['autoHideDuration']
    onClose: SnackbarProps['onClose']
    onMouseEnter: SnackbarProps['onMouseEnter']
    onMouseLeave: SnackbarProps['onMouseLeave']
    ClickAwayListenerProps: SnackbarProps['ClickAwayListenerProps']
    disableWindowBlurListener: SnackbarProps['disableWindowBlurListener']
    TransitionComponent: SnackbarProps['TransitionComponent']
    transitionDuration: SnackbarProps['transitionDuration']
    TransitionProps: SnackbarProps['TransitionProps']
  }
}
export type PrivateScaffoldProps = ScaffoldProps &
  StyledComponentProps<'docked' | 'drawerPaper' | 'navIconHide' | 'appBar'> & {
    location: Location
    history: History
  }
export type State = {
  sections: Array<Section>
  notifications: Array<Notification>
  contextActions?: Array<Action>
  drawerOpen: boolean
  loadSnackbar: boolean
}

const enhance = compose(
  withRouter,
  withStyles(styles, {withTheme: true}),
)

export class ScaffoldView extends React.Component<PrivateScaffoldProps, State> {
  childContext: ScaffoldContext
  state: State = {
    sections: [],
    notifications: [],
    drawerOpen: false,
    loadSnackbar: false,
  }
  historyIndex = 0

  get activeSection(): Section | undefined {
    return this.state.sections[0]
  }

  get activeAppBar():
    | false
    | {
        position: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative'
        elevated: boolean
      } {
    const activeSection = this.activeSection || {appBar: undefined}
    if (activeSection.appBar === false) return false
    if (activeSection.appBar === undefined && this.props.appBar === false)
      return false

    const {position: propsPosition = 'static', elevated: propsElevated = true} =
      this.props.appBar || {}
    const {
      position: sectionPosition = propsPosition,
      elevated: sectionElevated = propsElevated,
    } = activeSection.appBar || {}

    return {position: sectionPosition, elevated: sectionElevated}
  }

  constructor(props) {
    super(props)
    this.updateContext()
  }

  updateContext = () => {
    this.childContext = {
      activeSection: this.activeSection,
      activeAppBar: this.activeAppBar,

      setSection: this.setSection,
      removeSection: this.removeSection,

      setContextActions: contextActions => {
        this.setState({contextActions})
      },
      clearContextActions: () => {
        if (this.state.contextActions)
          this.setState({contextActions: undefined})
      },

      notify: notification =>
        this.setState(state => ({
          notifications: state.notifications.concat(notification),
          loadSnackbar: true,
        })),
    }
    this.setState({})
  }

  componentDidMount() {
    setTimeout(() => {
      if (!this.state.loadSnackbar) {
        this.setState({loadSnackbar: true})
      }
    }, 3000)
  }

  setSection = (section: Section) => {
    this.state.sections.unshift(section)
    this.updateContext()
  }

  removeSection = (section: Section) => {
    this.state.sections = this.state.sections.filter(
      s => s.title !== section.title,
    )
    this.updateContext()
  }

  handleDrawerToggle = () => {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  render() {
    const {appName, drawer, classes, children} = this.props
    const {contextActions, notifications, loadSnackbar} = this.state
    const activeSection = this.activeSection
    const backTo = activeSection && activeSection.backTo

    const appBar = this.activeAppBar

    return (
      <scaffoldContext.Provider value={this.childContext}>
        <Container>
          {drawer && [
            <Hidden mdUp key="mobile drawer">
              <LazyDrawer
                variant="temporary"
                open={this.state.drawerOpen}
                onClose={this.handleDrawerToggle}
                classes={{paper: classes!.drawerPaper}}
              >
                {drawer}
              </LazyDrawer>
            </Hidden>,
            <Hidden mdDown key="desktop drawer">
              <LazyDrawer
                variant="permanent"
                open
                classes={{docked: classes!.docked, paper: classes!.drawerPaper}}
              >
                {drawer}
              </LazyDrawer>
            </Hidden>,
          ]}
          <ContentContainer>
            {appBar && (
              <AppBar
                position={appBar.position}
                elevation={appBar.elevated ? 4 : 0}
              >
                <Toolbar>
                  {drawer && !backTo && (
                    <IconButton
                      aria-label="Open drawer"
                      color="inherit"
                      onClick={this.handleDrawerToggle}
                      className={classes!.navIconHide}
                    >
                      <MenuIcon />
                    </IconButton>
                  )}
                  {backTo && (
                    <Link to={backTo} replace style={{color: 'inherit'}}>
                      <IconButton aria-label="Back" color="inherit">
                        <BackIcon />
                      </IconButton>
                    </Link>
                  )}
                  <Typography
                    variant="title"
                    color="inherit"
                    style={flex(true)}
                  >
                    {activeSection ? activeSection.title : appName}
                  </Typography>
                  {contextActions && (
                    <Actions
                      actions={contextActions}
                      color="inherit"
                      style={{marginRight: -8}}
                    />
                  )}
                </Toolbar>
              </AppBar>
            )}
            <div style={{flex: 1}}>{children}</div>
            {loadSnackbar && (
              <LazySnackbar
                open={notifications.length > 0}
                {...this.props.snackbar}
                {...notifications[0]}
                onClose={(e, r) => {
                  this.setState(state => ({
                    notifications: state.notifications.slice(1),
                  }))
                  if (notifications[0].onClose) {
                    notifications[0].onClose(e, r)
                  }
                }}
              />
            )}
          </ContentContainer>
        </Container>
      </scaffoldContext.Provider>
    )
  }
}

/**
 * A component to help you manage the application level
 * toolbar while still keeping logic cleanly seperated.
 * It also help with managing the history so that the back
 * button works as expected.
 */
export const Scaffold = enhance(ScaffoldView) as React.ComponentClass<
  ScaffoldProps
>
