import AppBar from '@material-ui/core/AppBar/AppBar'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import {Route} from 'react-router'
import {Tab, Tabs} from '../../../lib'

export const attributes = {
  title: 'Tabs',
}

function TabContainer(props) {
  return (
    <Typography varaint='body2' component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  )
}

export default () => (
  <div>
    <AppBar position="static">
      <Tabs>
        <Tab value="/component-demos/tabs/a" label="A" />
        <Tab value="/component-demos/tabs/b" label="B" />
        <Tab value="/component-demos/tabs/c" label="C" />
      </Tabs>
    </AppBar>
    <Route
      exact
      path="/component-demos/tabs"
      render={() => <TabContainer>No tab selected</TabContainer>}
    />
    <Route
      path="/component-demos/tabs/a"
      render={() => <TabContainer>Item A</TabContainer>}
    />
    <Route
      path="/component-demos/tabs/b"
      render={() => <TabContainer>Item B</TabContainer>}
    />
    <Route
      path="/component-demos/tabs/c"
      render={() => <TabContainer>Item C</TabContainer>}
    />
  </div>
)
