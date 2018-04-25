import Button, {ButtonProps} from 'material-ui/Button'
import CircularProgress, {
  CircularProgressProps,
} from 'material-ui/Progress/CircularProgress'
import Grow from 'material-ui/transitions/Grow'
import React from 'react'
import {center, fill} from 'style-definitions'
import {Omit} from './types'

function makeCancelable<T>(
  promise: Promise<T>,
): {promise: Promise<T>; cancel: () => void} {
  let resolve: ((value?: T | PromiseLike<T>) => void) | null
  let reject: ((reason?: any) => void) | null

  const wrappedPromise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject

    promise.then(val => {
      if (resolve != null) resolve(val)
    })
    promise.catch(error => {
      if (reject != null) reject(error)
    })
  })

  return {
    promise: wrappedPromise,
    cancel() {
      resolve = null
      reject = null
    },
  }
}
export type DelayedCircularProgressProps = CircularProgressProps & {
  timeout?: number
  open: boolean
}

/**
 * CircularProgress from material-ui but with a timeout to avoid it beeing display immediately
 */
export class DelayedCircularProgress extends React.PureComponent<
  DelayedCircularProgressProps,
  {spin: boolean}
> {
  cancel?: () => void
  timeout: any
  state = {spin: false}

  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.setState({spin: true})
        this.timeout = undefined
      }, this.props.timeout || 100)
    } else if (this.props.open && !nextProps.open) {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.setState({spin: false})
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  render() {
    const {spin} = this.state

    return (
      <Grow in={spin}>
        <CircularProgress {...this.props} />
      </Grow>
    )
  }
}

export type ProgressButtonProps = Omit<ButtonProps, 'onClick'> & {
  loading?: boolean
  timeout?: number
  progressProps?: CircularProgressProps
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any
  /**
   * @default true
   */
  disableOnProgress?: boolean
}

/**
 * Displays an material button that when clicked can display
 * a progress until an asyncronous action has compleated.
 */
export class ProgressButton extends React.PureComponent<
  ProgressButtonProps,
  {isLoading: boolean}
> {
  cancel?: () => void
  state = {isLoading: false}

  onClick = (e: any): any => {
    if (!this.props.onClick) return

    const val: any = this.props.onClick(e)
    if (val && val.then && val.catch) {
      if (this.cancel) {
        this.cancel()
      }
      const {promise, cancel} = makeCancelable(val)
      this.cancel = cancel
      this.setState({isLoading: true})
      return promise.then(
        () => {
          this.cancel = undefined
          this.setState({isLoading: false})
        },
        (e: any) => {
          this.cancel = undefined
          this.setState({isLoading: false})
          throw e
        },
      )
    } else return val
  }

  componentWillUnmount() {
    if (this.cancel) {
      this.cancel()
    }
  }

  render() {
    const {
      onClick,
      children,
      loading,
      style,
      disabled,
      progressProps,
      disableOnProgress = true,
      ...props
    } = this.props
    const {isLoading} = this.state
    const spin = loading || isLoading

    return (
      <Button
        {...props}
        onClick={onClick ? this.onClick : undefined}
        disabled={disabled || (disableOnProgress && spin)}
        style={{position: 'relative', ...style}}
      >
        {children}
        <div style={{...fill(), ...center, touchAction: 'none'}}>
          <DelayedCircularProgress
            open={spin}
            size={24}
            color={props.color === 'secondary' ? 'secondary' : 'primary'}
            {...progressProps}
          />
        </div>
      </Button>
    )
  }
}
