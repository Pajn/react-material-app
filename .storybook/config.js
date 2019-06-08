import {configure, addDecorator} from '@storybook/react'
import React from 'react'
import {MemoryRouter} from 'react-router-dom'

const req = require.context('../src', true, /.stories.tsx$/)

function loadStories() {
  addDecorator(storyFn => <MemoryRouter>{storyFn()}</MemoryRouter>)
  req.keys().forEach(req)
}

configure(loadStories, module)
