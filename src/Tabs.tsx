import MUITab, {TabProps as MUITabProps} from '@material-ui/core/Tab'
import MUITabs, {TabsProps as MUITabsProps} from '@material-ui/core/Tabs'
import * as React from 'react'
import {Route} from 'react-router'
import {Omit} from './types'

export const Tabs = (props: Omit<MUITabsProps, 'value'>) => (
  <Route path="/">
    {({location, history}) => (
      <MUITabs
        {...props}
        value={location.pathname}
        onChange={(e, value) => {
          history.replace(value)
          if (props.onChange !== undefined) {
            return props.onChange(e, value)
          }
        }}
      />
    )}
  </Route>
)

export type TabProps = Omit<MUITabProps, 'value'> & {
  value: string
}
export const Tab = MUITab as React.ComponentClass<TabProps>
