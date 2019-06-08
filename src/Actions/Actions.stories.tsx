import React from 'react'
import {styled} from '@material-ui/styles'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import {storiesOf} from '@storybook/react'
import {Actions} from '.'

const Toolbar = styled('div')({
  padding: 8,
  width: 500,
  maxWidth: '100%',
  backgroundColor: 'whitesmoke',
})

storiesOf('Actions', module)
  .add('Auto placement', () => (
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
  ))
  .add('Forced Placement', () => (
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
  ))
  .add('Auto placement with disabled actions', () => (
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
  ))
  .add('Forced Placement with disabled actions', () => (
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
  ))
