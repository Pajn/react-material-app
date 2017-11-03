import glamorous from 'glamorous'
import {fontFamily, subheading1} from 'material-definitions'
import {timeout} from 'promise-land'
import * as React from 'react'
import {ReactChild} from 'react'
import {ProgressButton, Section} from 'react-material-app'
import {column, row} from 'style-definitions'

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

module.exports = () => (
  <div>
    <Section title="ProgressButton" />
    <div style={row()}>
      <ButtonExample title="normal">
        <ProgressButton onClick={() => timeout(1000)}>Load</ProgressButton>
      </ButtonExample>
      <ButtonExample title="raised">
        <ProgressButton raised onClick={() => timeout(1000)}>
          Load
        </ProgressButton>
      </ButtonExample>
      <ButtonExample title="primary">
        <ProgressButton color="primary" onClick={() => timeout(1000)}>
          Load
        </ProgressButton>
      </ButtonExample>
      <ButtonExample title="primary raised">
        <ProgressButton raised color="primary" onClick={() => timeout(1000)}>
          Load
        </ProgressButton>
      </ButtonExample>
      <ButtonExample title="accent">
        <ProgressButton color="accent" onClick={() => timeout(1000)}>
          Load
        </ProgressButton>
      </ButtonExample>
      <ButtonExample title="accent raised">
        <ProgressButton raised color="accent" onClick={() => timeout(1000)}>
          Load
        </ProgressButton>
      </ButtonExample>
    </div>
  </div>
)
