import Delete from 'material-ui-icons/Delete'
import Edit from 'material-ui-icons/Edit'
import * as React from 'react'
import {Actions} from 'react-material-app'

module.exports = () => (
  <div>
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
  </div>
)
