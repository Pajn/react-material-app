import deepEqual from 'deep-equal'
import {compose, getContext, lifecycle} from 'recompose'
import {Action} from '../Actions'
import {ScaffoldContext, scaffoldContextType} from './context'

export type ContextActionsProps = {
  contextActions: Array<Action>
}
export type PrivateContextActionsProps = ContextActionsProps &
  ScaffoldContext & {}

const enhance = compose<PrivateContextActionsProps, ContextActionsProps>(
  getContext(scaffoldContextType),
  lifecycle<PrivateContextActionsProps, PrivateContextActionsProps>({
    componentDidMount() {
      const {contextActions, setContextActions} = this
        .props as PrivateContextActionsProps
      setContextActions(contextActions)
    },
    componentWillReceiveProps(nextProps: PrivateContextActionsProps) {
      if (
        nextProps.contextActions !== this.props.contextActions &&
        !deepEqual(nextProps.contextActions, this.props.contextActions)
      ) {
        const {contextActions, setContextActions} = nextProps
        setContextActions(contextActions)
      }
    },
    componentWillUnmount() {
      const {clearContextActions} = this.props as PrivateContextActionsProps
      clearContextActions()
    },
  }),
)

export const ContextActionsView = ({}: PrivateContextActionsProps) => null

export const ContextActions = enhance(ContextActionsView)
