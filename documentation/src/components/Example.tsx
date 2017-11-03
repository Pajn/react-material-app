import glamorous from 'glamorous'
import {
  fontFamily,
  title,
  typographyMarginAdjustment,
} from 'material-definitions'

export const Example = glamorous.h3([
  {fontFamily, color: 'rgba(0,0,0,0.7)'},
  title,
  typographyMarginAdjustment.title,
  {'&~&': {paddingTop: 48}},
])
