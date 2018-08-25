import {History} from 'history'
import React, {ComponentType, createContext} from 'react'
import {Action} from '../Actions'

export type Section = {
  path?: string
  title: string
  onBack?: (history: History) => void
  onUnload?: () => void
}

export type ScaffoldContext = {
  activeSection?: Section

  pushSection: (section: Section) => void
  popSection: (title: string) => void
  replaceSection: (newSection: Section, oldTitle?: string) => void

  setContextActions: (actions: Array<Action>) => void
  clearContextActions: () => void
}

export const scaffoldContext = createContext<ScaffoldContext>(undefined as any)

export function withScaffoldContext<P>(
  WrappedComponent: ComponentType<P & ScaffoldContext>,
) {
  return (props: P) => (
    <scaffoldContext.Consumer>
      {context => <WrappedComponent {...props} {...context} />}
    </scaffoldContext.Consumer>
  )
}
