import InboxIcon from 'material-ui-icons/MoveToInbox'
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import * as React from 'react'
import {ReactElement} from 'react'
import {Scaffold} from 'react-material-app'

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
}

module.exports = ({children, data}: Props) => (
  <Scaffold
    appName={data.site.siteMetadata.siteName}
    drawer={
      <div>
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
        </List>
      </div>
    }
  >
    {children()}
  </Scaffold>
)
