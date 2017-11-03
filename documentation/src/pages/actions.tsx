import glamorous from 'glamorous'
import {teal} from 'material-definitions'
import Delete from 'material-ui-icons/Delete'
import Edit from 'material-ui-icons/Edit'
import * as React from 'react'
import {Actions, Section} from 'react-material-app'
import {Example} from '../components/Example'

const Toolbar = glamorous.div({
  height: 48,
  width: 500,
  maxWidth: '100%',
  backgroundColor: teal[500],
})

module.exports = () => (
  <div>
    <Section title="Actions" />
    <Example>Auto placement</Example>
    <Toolbar>
      <Actions
        actions={[
          {
            icon: <Edit />,
            label: 'Edit',
            onClick: () => console.log('Edit'),
          },
          {
            icon: <Delete />,
            label: 'Delete',
            onClick: () => console.log('Delete'),
          },
        ]}
      />
    </Toolbar>
    <Example>Forced placements</Example>
    <Toolbar>
      <Actions
        actions={[
          {
            label: 'Save',
            onClick: () => console.log('Save'),
            placement: 'toolbar',
          },
          {
            icon: <Delete />,
            label: 'Delete',
            onClick: () => console.log('Delete'),
            placement: 'menu',
          },
        ]}
      />
    </Toolbar>
    <Example>Auto placement, disabled</Example>
    <Toolbar>
      <Actions
        actions={[
          {
            icon: <Edit />,
            label: 'Edit',
            onClick: () => console.log('Edit'),
            disabled: true,
          },
          {
            icon: <Delete />,
            label: 'Delete',
            onClick: () => console.log('Delete'),
            disabled: true,
          },
        ]}
      />
    </Toolbar>
    <Example>Forced placements, disabled</Example>
    <Toolbar>
      <Actions
        actions={[
          {
            label: 'Save',
            onClick: () => console.log('Save'),
            placement: 'toolbar',
            disabled: true,
          },
          {
            icon: <Delete />,
            label: 'Delete',
            onClick: () => console.log('Delete'),
            placement: 'menu',
            disabled: true,
          },
        ]}
      />
    </Toolbar>
  </div>
)
