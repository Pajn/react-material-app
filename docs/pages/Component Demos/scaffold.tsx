import DraftsIcon from 'material-ui-icons/Drafts'
import InboxIcon from 'material-ui-icons/MoveToInbox'
import SendIcon from 'material-ui-icons/Send'
import StarIcon from 'material-ui-icons/Star'
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import * as React from 'react'
import {Scaffold, Section} from '../../../lib'
import {Example} from '../../components/Example'

export const attributes = {
  title: 'Scaffold',
}

declare module 'material-ui/List' {
  export interface ListItemProps {
    to?: string
  }
}

const Content = () => (
  <div style={{padding: 24, height: 200, backgroundColor: 'white'}}>
    Sit exercitation ut nostrud id ad anim aute veniam ut ad eiusmod.
  </div>
)

export default class extends React.Component<{}, {page?: string}> {
  render() {
    return (
      <div style={{position: 'relative'}}>
        <Example>Basic</Example>
        <Scaffold appName="Basic">
          <Content />
        </Scaffold>

        <Example>Drawer</Example>
        <Scaffold
          appName="Drawer"
          drawer={
            <div>
              <ListItem button onClick={() => this.setState({page: 'Inbox'})}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItem>
              <ListItem button onClick={() => this.setState({page: 'Starred'})}>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItem>
              <ListItem
                button
                onClick={() => this.setState({page: 'Send Mail'})}
              >
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Send mail" />
              </ListItem>
              <ListItem button onClick={() => this.setState({page: 'Drafts'})}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItem>
            </div>
          }
        >
          <Content />
          {this.state && this.state.page && <Section title={this.state.page} />}
        </Scaffold>
      </div>
    )
  }
}
