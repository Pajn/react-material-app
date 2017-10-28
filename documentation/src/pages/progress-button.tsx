import {timeout} from 'promise-land'
import * as React from 'react'
import {ProgressButton} from 'react-material-app'

module.exports = () => (
  <div>
    <ProgressButton onClick={() => timeout(1000)}>Load</ProgressButton>
    <ProgressButton raised color="primary" onClick={() => timeout(1000)}>
      Load
    </ProgressButton>
  </div>
)
