import glamorous from 'glamorous'
import {grey} from 'material-definitions'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import List, {
  ListItem,
  ListItemProps,
  ListItemText,
  ListSubheader,
} from 'material-ui/List'
import withStyles from 'material-ui/styles/withStyles'
import Collapse from 'material-ui/transitions/Collapse'
import * as React from 'react'
import {Children, ReactElement, cloneElement} from 'react'
import {ContextActions, Scaffold} from 'react-material-app'
import {Route} from 'react-router'
import {BrowserRouter, Link, LinkProps} from 'react-router-dom'
import {withStateHandlers} from 'recompose'
import {GitHubIcon} from '../components/GitHubIcon'
import './index.css'

const HLink = (props: LinkProps) => <Link to={props.href} {...props} />
const ListItemLink: React.ComponentType<ListItemProps> = withStyles(theme => ({
  activeLink: {color: theme.palette.primary[500]},
}))(props => (
  <Route
    exact
    path={props.href}
    children={({match}) => (
      <ListItem
        {...props}
        button
        component={HLink}
        children={
          match
            ? Children.map(
                props.children,
                child =>
                  typeof child === 'object' && child.type === ListItemText
                    ? cloneElement(child, {
                        classes: {text: props.classes.activeLink},
                      })
                    : child,
              )
            : props.children
        }
      />
    )}
  />
))
const Container = glamorous.div({
  display: 'flex',
  height: '100%',
})
const ContentWrapper = glamorous.div({
  boxSizing: 'border-box',
  padding: 24,
  height: '100%',
  backgroundColor: `rgb(${grey[50]})`,
})

export const layoutQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        siteName
      }
    }
  }
`

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface Props {
  children: () => ReactElement<any>
  data: {
    site: {
      siteMetadata: {
        siteName: string
      }
    }
  }
  isOpen: boolean
  open: () => void
  close: () => void
}

module.exports = withStateHandlers(
  {isOpen: false},
  {
    open: () => () => ({isOpen: true}),
    close: () => () => ({isOpen: false}),
  },
)((({children, data, isOpen, open, close}: Props) => (
  <BrowserRouter>
    <Container>
      <Scaffold
        appName={data.site.siteMetadata.siteName}
        drawer={
          <div>
            <List>
              <ListSubheader>Components</ListSubheader>
              <ListItemLink
                component={HLink}
                href="/scaffold"
                onClick={() => (isOpen ? close() : open())}
              >
                <ListItemText primary="Scaffold" />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemLink>
              <Collapse in={isOpen} transitionDuration="auto" unmountOnExit>
                <ListItemLink
                  component={HLink}
                  href="/scaffold/context-actions"
                  disableGutters
                >
                  <ListItemText inset primary="ContextActions" />
                </ListItemLink>
                <ListItemLink
                  component={HLink}
                  href="/scaffold/section"
                  disableGutters
                >
                  <ListItemText inset primary="Section" />
                </ListItemLink>
              </Collapse>
              <ListItemLink component={HLink} href="/actions">
                <ListItemText primary="Actions" />
              </ListItemLink>
              <ListItemLink component={HLink} href="/image">
                <ListItemText primary="Image" />
              </ListItemLink>
              <ListItemLink component={HLink} href="/progress-button">
                <ListItemText primary="ProgressButton" />
              </ListItemLink>
            </List>
          </div>
        }
      >
        <ContextActions
          contextActions={[
            {
              icon: GitHubIcon,
              label: 'Github',
              href: 'https://github.com/Pajn/react-material-app',
            },
          ]}
        />
        <ContentWrapper>{children()}</ContentWrapper>
      </Scaffold>
    </Container>
  </BrowserRouter>
)) as any)
