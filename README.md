A collection of higher level components useful in building material design based React applictions.
All components can be individually imported so that you only bundle those that you actually need.

## Components

### Scaffold
A component to help you manage the application level toolbar while still keeping logic cleanly seperated. It also help
with managing the history so that the back button works as expected.

#### Section
Sets the current page

```jsx
<Section
  title="System Settings"
  onBack={goBack} 
/>
```

#### SectionActions
Sets [actions](#actions) that are avalible in the app bar, for example save in a form or create new in a list.

```jsx
<SectionActions
  actions={[
    {
      icon: 'add',
      onClick: createNew,
    },
  ]}
/>
```

### ListDetail
A component to responsively display a list together with a detail page similar to the Settings app on Android.
The list will be displayed next to the detail page when there is room but behaves as separate pages on 
phones and small tablets. It automatically manages the history so that the back button works as expected.

### Actions
Display actions in for example a toolbar or a list item. Automatically renders them as separate buttons
or in a menu depending on the avalible space.

### ProgressButton
Displays an material button that when clicked can display a progress until an asyncronous action has compleated.

### Image
Displays an image that is animated in when loaded following the [loading images pattern](https://material.io/guidelines/patterns/loading-images.html).

### ReduxDialog
Renders a dialog that is controlled by dispatching Redux actions. It allows you to separate logic that
needs to display confirmations or urgent information from actually rendering them.

### ReduxSnackbar
Renders a snackbar that is controlled by dispatching Redux actions. It allows you to separate logic that
needs to display notifications from actually rendering them.

