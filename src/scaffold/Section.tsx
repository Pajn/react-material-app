import React from 'react'
import {matchPath} from 'react-router'
import {compose, getContext, lifecycle, withHandlers} from 'recompose'
import {
  ScaffoldContext,
  Section as SectionType,
  scaffoldContextType,
} from './context'

export type SectionProps = SectionType
export type PrivateSectionProps = SectionProps &
  ScaffoldContext & {
    children: React.ReactElement<any>
    popstateListener: () => void
  }

const enhance = compose<PrivateSectionProps, SectionProps>(
  getContext(scaffoldContextType as any),
  withHandlers({
    popstateListener: ({
      path,
      popSection,
      title,
    }: PrivateSectionProps) => () => {
      if (!matchPath(window.location.pathname, {path})) {
        popSection(title)
      }
    },
  }),
  lifecycle<PrivateSectionProps, PrivateSectionProps>({
    componentDidMount() {
      const {
        title,
        path,
        onBack,
        onUnload,
        pushSection,
        popstateListener,
      } = this.props as PrivateSectionProps
      pushSection({title, path, onBack, onUnload})
      if (path) {
        window.addEventListener('popstate', popstateListener, true)
      }
    },
    componentWillReceiveProps(nextProps: PrivateSectionProps) {
      const {title, onBack, path} = nextProps as PrivateSectionProps
      if (title !== this.props.title || path !== this.props.path) {
        nextProps.replaceSection({title, onBack, path}, this.props.title)
      }
    },
    componentWillUnmount() {
      const {title, path, popSection, popstateListener} = this
        .props as PrivateSectionProps
      popSection(title)
      if (path) {
        window.removeEventListener('popstate', popstateListener, true)
      }
    },
  }),
)

export const SectionView = ({children = null}: PrivateSectionProps) => children!

/**
 * Sets the current page in the Appbar
 */
export const Section = enhance(SectionView)
