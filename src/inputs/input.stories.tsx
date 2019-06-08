import React, {useState} from 'react'
import {styled} from '@material-ui/styles'
import {storiesOf} from '@storybook/react'
import {Checkbox, Select, Switch, TextField} from '.'

const fixHooks = (Story: any) => <Story />

const InputExample = styled('div')({
  paddingTop: 8,
  paddingBottom: 8,
})
const InputExampleBig = styled('div')({
  paddingTop: 24,
  paddingBottom: 24,
})

storiesOf('inputs', module)
  .addDecorator(fixHooks)
  .add('Checkbox', () => {
    const [value, setValue] = useState(false)

    return (
      <>
        <InputExample>
          <Checkbox value={value} onChange={setValue} />
        </InputExample>
        <InputExample>
          <Checkbox value={value} onChange={setValue} label="Remember me" />
        </InputExample>
      </>
    )
  })
  .add('Switch', () => {
    const [value, setValue] = useState(false)

    return (
      <>
        <InputExample>
          <Switch value={value} onChange={setValue} />
        </InputExample>
        <InputExample>
          <Switch value={value} onChange={setValue} label="Remember me" />
        </InputExample>
      </>
    )
  })
  .add('TextField', () => {
    const [value, setValue] = useState('')

    return (
      <>
        <>
          <InputExampleBig>
            <TextField value={value} onChange={setValue} />
          </InputExampleBig>
          <InputExampleBig>
            <TextField value={value} onChange={setValue} label="Username" />
          </InputExampleBig>
          <InputExampleBig>
            <TextField
              value={value}
              onChange={setValue}
              label="Display Name"
              description="The name shown to other people"
            />
          </InputExampleBig>
          <InputExampleBig>
            <TextField
              value={value}
              onChange={setValue}
              label="Email"
              error="A valid email is required"
            />
          </InputExampleBig>
          <InputExampleBig>
            <TextField value={value} onChange={setValue} startAdornment="$" />
          </InputExampleBig>
          <InputExampleBig>
            <TextField value={value} onChange={setValue} endAdornment="km/h" />
          </InputExampleBig>
        </>
      </>
    )
  })
  .add('Select', () => {
    const [value, setValue] = useState<string | undefined>(undefined)

    return (
      <>
        <InputExample>
          <Select
            value={value}
            onChange={setValue}
            choices={[
              {value: 'red', label: 'Red'},
              {value: 'green', label: 'Green'},
              {value: 'blue', label: 'Blue'},
            ]}
          />
        </InputExample>
        <InputExample>
          <Select
            value={value}
            onChange={setValue}
            choices={[
              {value: undefined, label: ''},
              {value: 'red', label: 'Red'},
              {value: 'green', label: 'Green'},
              {value: 'blue', label: 'Blue'},
            ]}
          />
        </InputExample>
        <InputExample>
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
        </InputExample>
        <InputExample>
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
        </InputExample>
      </>
    )
  })
