---
title: Actions
imports:
  'glamorous': 'glamorous'
  '{teal}': 'material-definitions'
  'Delete': 'material-ui-icons/Delete'
  'Edit': 'material-ui-icons/Edit'
  '{Actions, Section}': '../../../lib'
---

```global
const Toolbar = glamorous.div({
  height: 48,
  width: 500,
  maxWidth: '100%',
})
```

```store autoPlacement
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
```

```store forcedPlacement
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
```

```store autoPlacementDisabled
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
```

```store forcedPlacementDisabled
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
```

#### Actions

##### Auto placement

###### Demo

```render
  <div>
    {store.autoPlacement}
  </div>
```

###### Code

```stored autoPlacement jsx

```

##### Forced placement

###### Demo

```render
  <div>
    {store.forcedPlacement}
  </div>
```

###### Code

```stored forcedPlacement jsx

```

##### Auto placement disabled

###### Demo

```render
  <div>
    {store.autoPlacementDisabled}
  </div>
```

###### Code

```stored autoPlacementDisabled jsx

```

##### Forced placement disabled

###### Demo

```render
  <div>
    {store.forcedPlacementDisabled}
  </div>
```

###### Code

```stored forcedPlacementDisabled jsx

```
