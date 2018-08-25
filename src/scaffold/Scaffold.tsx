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
import glamorous from 'glamorous'
import {History, Location} from 'history'
import React, {ReactNode} from 'react'
import {withRouter} from 'react-router'
import {compose} from 'recompose'
import {column, flex, row} from 'style-definitions'
import {Action, Actions} from '../Actions'
import {LazyDrawer} from '../lazy'
import {ScaffoldContext, Section, scaffoldContext} from './context'

const drawerWidth = 240
const Container = glamorous.div([row({flex: 1}), {position: 'relative'}])
const ContentContainer = glamorous.div(column({flex: 1}))
const styles = (theme: Theme) => ({
  appBar: {
    position: 'static' as 'static',
  },
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
  drawer?: ReactNode
}
export type PrivateScaffoldProps = ScaffoldProps &
  StyledComponentProps<'docked' | 'drawerPaper' | 'navIconHide' | 'appBar'> & {
    location: Location
    history: History
  }
export type State = {
  sections: Array<Section>
  contextActions?: Array<Action>
  drawerOpen: boolean
}

const enhance = compose(
  withRouter,
  withStyles(styles, {withTheme: true}),
)

export class ScaffoldView extends React.Component<PrivateScaffoldProps, State> {
  childContext: ScaffoldContext
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

  constructor(props) {
    super(props)

    this.childContext = {
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

  back = () => this.props.history.goBack()

  pushSection = (section: Section) => {
    // Set state synchronously to not drop multiple changes in the same render
    this.state.sections = [section, ...this.state.sections]
    this.setState({})
  }
  popSection = (title?: string) => {
    if (
      title === undefined ||
      (this.state.sections[0] && this.state.sections[0].title === title)
    ) {
      // Set state synchronously to not drop multiple changes in the same render
      const [poppedSection, ...keptSections] = this.state.sections
      this.state.sections = keptSections
      this.setState({})
      if (poppedSection.onUnload) {
        poppedSection.onUnload()
      }
    }
  }
  replaceSection = (newSection: Section, oldTitle?: string) => {
    const index = oldTitle
      ? this.state.sections.findIndex(section => section.title === oldTitle)
      : 0

    if (index >= 0) {
      const replacedSections = this.state.sections[index]
      this.setState({
        sections: [
          ...this.state.sections.slice(0, index),
          newSection,
          ...this.state.sections.slice(index + 1),
        ],
      })
      if (replacedSections.onUnload) {
        replacedSections.onUnload()
      }
    }
  }

  handleDrawerToggle = () => {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  render() {
    const {appName, drawer, classes, children} = this.props
    const {contextActions, sections} = this.state
    const activeSection = this.activeSection
    const showBack = drawer
      ? activeSection && sections.length > 1
      : activeSection

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
            <AppBar className={classes!.appBar}>
              <Toolbar>
                {drawer &&
                  !showBack && (
                    <IconButton
                      aria-label="Open drawer"
                      color="inherit"
                      onClick={this.handleDrawerToggle}
                      className={classes!.navIconHide}
                    >
                      <MenuIcon />
                    </IconButton>
                  )}
                {showBack && (
                  <IconButton
                    aria-label="Back"
                    color="inherit"
                    onClick={
                      activeSection.onBack
                        ? () => activeSection.onBack!(this.props.history)
                        : undefined
                    }
                  >
                    <BackIcon />
                  </IconButton>
                )}
                <Typography variant="title" color="inherit" style={flex(true)}>
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
            <div style={{flex: 1}}>{children}</div>
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
