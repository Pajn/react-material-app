import {Documentation} from 'documittu-template-default/dist/components/ui/docs'
import glamorous from 'glamorous'
import * as React from 'react'
import {Checkbox, Select, Switch, TextField} from '../../../lib'
import {Example} from '../../components/Example'
import {State} from '../../components/State'

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

    <Example title="Checkbox">
      <State>
        {(value: boolean, setValue) => (
          <>
            <InputExample slim>
              <Checkbox value={value} onChange={setValue} />
            </InputExample>
            <InputExample slim>
              <Checkbox value={value} onChange={setValue} label="Remember me" />
            </InputExample>
          </>
        )}
      </State>
    </Example>
    <Example title="Switch">
      <State>
        {(value: boolean, setValue) => (
          <>
            <InputExample slim>
              <Switch value={value} onChange={setValue} />
            </InputExample>
            <InputExample slim>
              <Switch value={value} onChange={setValue} label="Remember me" />
            </InputExample>
          </>
        )}
      </State>
    </Example>
    <Example title="TextField">
      <State>
        {(value: string, setValue) => (
          <>
            <InputExample>
              <TextField value={value} onChange={setValue} />
            </InputExample>
            <InputExample>
              <TextField value={value} onChange={setValue} label="Username" />
            </InputExample>
            <InputExample>
              <TextField
                value={value}
                onChange={setValue}
                label="Display Name"
                description="The name shown to other people"
              />
            </InputExample>
            <InputExample>
              <TextField
                value={value}
                onChange={setValue}
                label="Email"
                error="A valid email is required"
              />
            </InputExample>
            <InputExample>
              <TextField value={value} onChange={setValue} startAdornment="$" />
            </InputExample>
            <InputExample>
              <TextField
                value={value}
                onChange={setValue}
                endAdornment="km/h"
              />
            </InputExample>
          </>
        )}
      </State>
    </Example>
    <Example title="Select">
      <InputExample>
        <State>
          {(value: string | undefined, setValue) => (
            <Select
              value={value}
              onChange={setValue}
              choices={[
                {value: 'red', label: 'Red'},
                {value: 'green', label: 'Green'},
                {value: 'blue', label: 'Blue'},
              ]}
            />
          )}
        </State>
      </InputExample>
      <InputExample>
        <State>
          {(value: string | undefined, setValue) => (
            <Select
              value={value}
              onChange={setValue}
              label="Color"
              choices={[
                {value: 'red', label: 'Red'},
                {value: 'green', label: 'Green'},
                {value: 'blue', label: 'Blue'},
              ]}
            />
          )}
        </State>
      </InputExample>
      <InputExample>
        <State>
          {(value: string | undefined, setValue) => (
            <Select
              value={value}
              onChange={setValue}
              label="Color"
              description="Select a color"
              choices={[
                {value: 'red', label: 'Red'},
                {value: 'green', label: 'Green'},
                {value: 'blue', label: 'Blue'},
              ]}
            />
          )}
        </State>
      </InputExample>
      <InputExample>
        <State>
          {(value: string | undefined, setValue) => (
            <Select
              value={value}
              onChange={setValue}
              label="Color"
              error={value ? undefined : 'A value must be selected'}
              choices={[
                {value: 'red', label: 'Red'},
                {value: 'green', label: 'Green'},
                {value: 'blue', label: 'Blue'},
              ]}
            />
          )}
        </State>
      </InputExample>
    </Example>
    {/* <Example>MultiSelect</Example> */}
  </Documentation>
)
