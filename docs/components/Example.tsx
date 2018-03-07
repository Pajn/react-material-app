import glamorous from 'glamorous'
import {
  fontFamily,
  title,
  typographyMarginAdjustment,
} from 'material-definitions'
import React, {ReactNode} from 'react'

export const ExampleHeader = glamorous.h3([
  {fontFamily, color: 'rgba(0,0,0,0.7)'},
  title,
  typographyMarginAdjustment.title,
  {'&~&': {paddingTop: 48}},
])

export const Example = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => (
  <div>
    <ExampleHeader>{title}</ExampleHeader>
    <div style={{paddingLeft: 16}}>{children}</div>
  </div>
)
