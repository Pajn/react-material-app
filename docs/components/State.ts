import {Component, ReactNode} from 'react'

export type Props<T> = {
  children: (state: T, setState: (newState: T) => void) => ReactNode
  initialState?: T
}

export class State<T> extends Component<Props<T>, {value: T}> {
  constructor(props: Props<T>) {
    super(props)
    this.state = {value: props.initialState!}
  }
  render() {
    return this.props.children(this.state.value, value =>
      this.setState({value}),
    )
  }
}
