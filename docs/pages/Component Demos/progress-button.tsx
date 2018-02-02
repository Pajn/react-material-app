import glamorous from 'glamorous'
import {fontFamily, subheading1} from 'material-definitions'
import {timeout} from 'promise-land'
import * as React from 'react'
import {ReactChild} from 'react'
import {column, row} from 'style-definitions'
import {ProgressButton} from '../../../lib'

export const attributes = {
  title: 'ProgressButton',
}

const ButtonExampleContainer = glamorous.div([
  column({horizontal: 'center'}),
  {
    '& + &': {
      paddingLeft: 24,
    },
  },
])

const ButtonExample = ({
  title,
  children,
}: {
  title: string
  children: ReactChild
}) => (
  <ButtonExampleContainer>
    {children}
    <h4 style={Object.assign({fontFamily}, subheading1)}>{title}</h4>
  </ButtonExampleContainer>
)

export default () => (
  <div>
    <div style={row()}>
      <ButtonExample title="normal">
        <ProgressButton onClick={() => timeout(1000)}>Load</ProgressButton>
      </ButtonExample>
      <ButtonExample title="raised">
        <ProgressButton variant="raised" onClick={() => timeout(1000)}>
          Load
        </ProgressButton>
      </ButtonExample>
      <ButtonExample title="primary">
        <ProgressButton color="primary" onClick={() => timeout(1000)}>
          Load
        </ProgressButton>
      </ButtonExample>
      <ButtonExample title="primary raised">
        <ProgressButton
          variant="raised"
          color="primary"
          onClick={() => timeout(1000)}
        >
          Load
        </ProgressButton>
      </ButtonExample>
      <ButtonExample title="secondary">
        <ProgressButton color="secondary" onClick={() => timeout(1000)}>
          Load
        </ProgressButton>
      </ButtonExample>
      <ButtonExample title="secondary raised">
        <ProgressButton
          variant="raised"
          color="secondary"
          onClick={() => timeout(1000)}
        >
          Load
        </ProgressButton>
      </ButtonExample>
    </div>
  </div>
)
