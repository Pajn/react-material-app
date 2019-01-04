import React, {ComponentType, createContext, useContext} from 'react'
import {Action} from '../Actions'
import {SnackbarProps} from '../lazy'

export type Section = {
  backTo?: string
  title: string
  appBar?:
    | false
    | {
        position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative'
        elevated?: boolean
      }
  onUnload?: () => void
}

export type Notification = Pick<
  SnackbarProps,
  'action' | 'autoHideDuration' | 'message' | 'onClose' | 'resumeHideDuration'
>

export type ScaffoldContext = {
  activeSection?: Section
  activeAppBar:
    | false
    | {
        position: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative'
        elevated: boolean
      }

  setSection: (section: Section) => void
  removeSection: (section: Section) => void

  setContextActions: (actions: Array<Action>) => void
  clearContextActions: () => void

  notify: (notification: Notification) => void
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

export const useNotify = () => {
  const context = useContext(scaffoldContext)

  return context.notify
}
