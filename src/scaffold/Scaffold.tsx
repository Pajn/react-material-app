import glamorous from 'glamorous'
import {History, Location} from 'history'
import {StyledComponentProps} from 'material-ui'
import BackIcon from 'material-ui-icons/ArrowBack'
import MenuIcon from 'material-ui-icons/Menu'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Hidden from 'material-ui/Hidden'
import IconButton from 'material-ui/IconButton'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import {Theme} from 'material-ui/styles'
import withStyles from 'material-ui/styles/withStyles'
import React, {ReactNode} from 'react'
import {withRouter} from 'react-router'
import {compose} from 'recompose'
import {column, flex} from 'style-definitions'
import {Action, Actions} from '../Actions'
import {ScaffoldContext, Section, scaffoldContextType} from './context'

const drawerWidth = 240
const Container = glamorous.div([column({flex: 1}), {position: 'relative'}])
const styles = (theme: Theme) => ({
  appBar: {
    position: 'static',
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative' as 'relative',
      height: '100%',
    },
  },
})

export type ScaffoldProps = {
  appName: string
  drawer?: ReactNode
}
export type PrivateScaffoldProps = ScaffoldProps &
  StyledComponentProps<'drawerPaper' | 'navIconHide' | 'appBar'> & {
    location: Location
    history: History
  }
export type State = {
  sections: Array<Section>
  contextActions?: Array<Action>
  drawerOpen: boolean
}

const enhance = compose(withRouter, withStyles(styles, {withTheme: true}))

export class ScaffoldView extends React.Component<PrivateScaffoldProps, State> {
  static childContextTypes = scaffoldContextType
  context: ScaffoldContext
  state: State = {
    sections: [],
    drawerOpen: false,
  }

  get activeSection() {
    return this.state.sections[0]
  }

  get currentUrl() {
    return this.activeSection && this.activeSection.path
  }

  back = () => this.props.history.goBack()

  pushSection = (section: Section) => {
    // Set state synchronously to not drop multiple changes in the same render
    this.state.sections = [section, ...this.state.sections]
    this.setState({})
  }
  popSection = (title?: string) => {
    const index = title
      ? this.state.sections.findIndex(section => section.title === title)
      : 0
    if (index >= 0) {
      // Set state synchronously to not drop multiple changes in the same render
      this.state.sections = [
        ...(index > 0 ? this.state.sections.slice(0, index) : []),
        ...this.state.sections.slice(index + 1),
      ]
      this.setState({})
    }
  }
  replaceSection = (newSection: Section, oldTitle?: string) => {
    const index = oldTitle
      ? this.state.sections.findIndex(section => section.title === oldTitle)
      : 0

    if (index >= 0) {
      this.setState({
        sections: [
          ...this.state.sections.slice(0, index),
          newSection,
          ...this.state.sections.slice(index + 1),
        ],
      })
    }
  }

  handleDrawerToggle = () => {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  getChildContext(): ScaffoldContext {
    return {
      activeSection: this.activeSection,

      pushSection: this.pushSection,
      popSection: this.popSection,
      replaceSection: this.replaceSection,

      setContextActions: contextActions => {
        this.setState({contextActions})
      },
      clearContextActions: () => {
        if (this.state.contextActions)
          this.setState({contextActions: undefined})
      },
    }
  }

  render() {
    const {appName, drawer, classes, children} = this.props
    const {contextActions} = this.state
    const activeSection = this.activeSection

    return (
      <Container>
        <AppBar className={classes!.appBar}>
          <Toolbar>
            {drawer &&
              !activeSection && (
                <IconButton
                  color="contrast"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes!.navIconHide}
                >
                  <MenuIcon />
                </IconButton>
              )}
            {activeSection && (
              <IconButton
                color="contrast"
                aria-label="Back"
                onClick={
                  activeSection.onBack
                    ? () => activeSection.onBack!(this.props.history)
                    : undefined
                }
              >
                <BackIcon />
              </IconButton>
            )}
            <Typography type="title" color="inherit" style={flex(true)}>
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
        {drawer && [
          <Hidden mdUp key="mobile drawer">
            <Drawer
              type="temporary"
              open={this.state.drawerOpen}
              onRequestClose={this.handleDrawerToggle}
              classes={{paper: classes!.drawerPaper}}
            >
              {drawer}
            </Drawer>
          </Hidden>,
          <Hidden mdDown implementation="css" key="desktop drawer">
            <Drawer
              type="permanent"
              open
              classes={{paper: classes!.drawerPaper}}
            >
              {drawer}
            </Drawer>
          </Hidden>,
        ]}
        {children}
      </Container>
    )
  }
}

export const Scaffold = enhance(ScaffoldView) as React.ComponentClass<
  ScaffoldProps
>
