import {Documentation} from 'documittu-template-default/dist/components/ui/docs'
import glamorous from 'glamorous'
import * as React from 'react'
import {Checkbox, Select, Switch, TextField} from '../../../lib'
import {Example} from '../../components/Example'

export const attributes = {
  title: 'Inputs',
}

const InputExample = glamorous.div(({slim}: {slim?: boolean}) => ({
  paddingTop: slim ? 8 : 24,
  paddingBottom: slim ? 8 : 24,
}))

export default () => (
  <Documentation>
    <p>
      react-material-app provides wrappers around the input components in
      material-ui. These wrappers provide a higher level API with the common
      pattern of mirrored <code>value</code> and <code>onChange</code>{' '}
      properties. The intent is to provide a single component with props for
      common configurations. If you instead want to use the material-ui
      components in a non standard way, you are better of using them directly.
    </p>

    <Example>Checkbox</Example>
    <InputExample slim>
      <Checkbox />
    </InputExample>
    <InputExample slim>
      <Checkbox label="Remember me" />
    </InputExample>
    <Example>Switch</Example>
    <InputExample slim>
      <Switch />
    </InputExample>
    <InputExample slim>
      <Switch label="Remember me" />
    </InputExample>
    <Example>TextField</Example>
    <InputExample>
      <TextField />
    </InputExample>
    <InputExample>
      <TextField label="Username" />
    </InputExample>
    <InputExample>
      <TextField
        label="Display Name"
        description="The name shown to other people"
      />
    </InputExample>
    <InputExample>
      <TextField label="Email" error="A valid email is required" />
    </InputExample>
    <InputExample>
      <TextField startAdornment="$" />
    </InputExample>
    <InputExample>
      <TextField endAdornment="km/h" />
    </InputExample>
    <Example>Select</Example>
    <InputExample>
      <Select
        choices={[
          {value: 'red', label: 'Red'},
          {value: 'green', label: 'Green'},
          {value: 'blue', label: 'Blue'},
        ]}
      />
    </InputExample>
    <InputExample>
      <Select
        label="Color"
        choices={[
          {value: 'red', label: 'Red'},
          {value: 'green', label: 'Green'},
          {value: 'blue', label: 'Blue'},
        ]}
      />
    </InputExample>
    <InputExample>
      <Select
        label="Color"
        description="Select a color"
        choices={[
          {value: 'red', label: 'Red'},
          {value: 'green', label: 'Green'},
          {value: 'blue', label: 'Blue'},
        ]}
      />
    </InputExample>
    <InputExample>
      <Select
        label="Color"
        error="A value must be selected"
        choices={[
          {value: 'red', label: 'Red'},
          {value: 'green', label: 'Green'},
          {value: 'blue', label: 'Blue'},
        ]}
      />
    </InputExample>
    <Example>MultiSelect</Example>
  </Documentation>
)
