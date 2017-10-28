import {History} from 'history'
import PropTypes from 'prop-types'
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

export const scaffoldContextType: {
  [p in keyof ScaffoldContext]: PropTypes.Validator<ScaffoldContext[p]>
} = {
  activeSection: PropTypes.object,

  pushSection: PropTypes.func,
  popSection: PropTypes.func,
  replaceSection: PropTypes.func,

  setContextActions: PropTypes.func,
  clearContextActions: PropTypes.func,
}
