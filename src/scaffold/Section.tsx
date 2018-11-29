import React from 'react'
import {compose, lifecycle} from 'recompose'
import {
  ScaffoldContext,
  Section as SectionType,
  withScaffoldContext,
} from './context'

export type SectionProps = SectionType
export type PrivateSectionProps = SectionProps &
  ScaffoldContext & {
    children: React.ReactElement<any> | null
  }

const enhance = compose<PrivateSectionProps, SectionProps>(
  withScaffoldContext,
  lifecycle<PrivateSectionProps, PrivateSectionProps>({
    componentDidMount() {
      const {title, backTo, appBar, onUnload, setSection} = this.props
      setSection({title, backTo, appBar, onUnload})
    },
    componentDidUpdate(nextProps) {
      const {title, backTo, appBar, onUnload, setSection} = nextProps
      if (
        nextProps.title !== this.props.title ||
        nextProps.backTo !== this.props.backTo ||
        nextProps.onUnload !== this.props.onUnload ||
        !nextProps.activeSection
      ) {
        setSection({title, backTo, appBar, onUnload})
      }
    },
    componentWillUnmount() {
      const {title, backTo, appBar, onUnload, removeSection} = this.props
      removeSection({title, backTo, appBar, onUnload})
    },
  }),
)

export const SectionView = ({children = null}: PrivateSectionProps) => children

/**
 * Sets the current page in the Appbar
 */
export const Section = enhance(SectionView)
