import withTheme, {WithTheme} from '@material-ui/core/styles/withTheme'
import {CSSProperties} from 'jss/css'
import React, {ReactChild} from 'react'
import {WithMedia} from 'react-with-media'
import {scaffoldContext} from './context'

export type ScaffoldInfo = {
  appBarHeight: number
}

export const ScaffoldAware = withTheme()(
  ({
    theme,
    children,
  }: WithTheme & {
    children?: (scaffoldInfo: ScaffoldInfo) => ReactChild | null
  }) => (
    <scaffoldContext.Consumer>
      {context =>
        children
          ? context.activeAppBar !== false &&
            context.activeAppBar.position === 'sticky'
            ? (Object.keys(theme.mixins.toolbar)
                .filter(key => key.startsWith('@media'))
                .reduce(
                  (inner, mediaQuery) => (
                    <WithMedia query={mediaQuery.slice('@media'.length)}>
                      {matches =>
                        matches
                          ? children({
                              appBarHeight: (theme.mixins.toolbar[
                                mediaQuery
                              ] as CSSProperties).minHeight as number,
                            })
                          : inner ||
                            children({
                              appBarHeight: theme.mixins.toolbar
                                .minHeight as number,
                            })
                      }
                    </WithMedia>
                  ),
                  undefined,
                ) as React.ReactElement<any>)
            : children({appBarHeight: 0})
          : null
      }
    </scaffoldContext.Consumer>
  ),
)