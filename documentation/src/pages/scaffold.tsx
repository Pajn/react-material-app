import DraftsIcon from 'material-ui-icons/Drafts'
import InboxIcon from 'material-ui-icons/MoveToInbox'
import SendIcon from 'material-ui-icons/Send'
import StarIcon from 'material-ui-icons/Star'
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import * as React from 'react'
import {Scaffold, Section} from 'react-material-app'
import {Example} from '../components/Example'

const Content = () => (
  <div style={{padding: 24, height: 200, backgroundColor: 'white'}}>
    Sit exercitation ut nostrud id ad anim aute veniam ut ad eiusmod.
  </div>
)

module.exports = () => (
  <div style={{position: 'relative'}}>
    <Section title="Scaffold" />

    <Example>Basic</Example>
    <Scaffold appName="Basic">
      <Content />
    </Scaffold>

    <Example>Drawer</Example>
    <Scaffold
      appName="Drawer"
      drawer={
        <div>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Send mail" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </div>
      }
    >
      <Content />
    </Scaffold>
  </div>
)
