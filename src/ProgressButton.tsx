import Button, {ButtonProps} from 'material-ui/Button'
import {CircularProgress, CircularProgressProps} from 'material-ui/Progress'
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
export type ProgressButtonProps = Omit<ButtonProps, 'onClick'> & {
  loading?: boolean
  timeout?: number
  progressProps?: CircularProgressProps
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => any
}

/**
 * Displays an material button that when clicked can display
 * a progress until an asyncronous action has compleated.
 */
export class ProgressButton extends React.Component<
  ProgressButtonProps,
  {isLoading: boolean}
> {
  cancel?: () => void
  state = {isLoading: false}
  timeout: any

  onClick = (e: any): any => {
    if (!this.props.onClick) return

    const val: any = this.props.onClick(e)
    if (val && val.then && val.catch) {
      if (this.cancel) {
        this.cancel()
      }
      const {promise, cancel} = makeCancelable(val)
      this.cancel = cancel
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.setState({isLoading: true})
        this.timeout = undefined
      }, this.props.timeout || 100)
      return promise
        .then(() => {
          if (this.timeout) {
            clearTimeout(this.timeout)
          }
          this.cancel = undefined
          this.setState({isLoading: false})
        })
        .catch((e: any) => {
          if (this.timeout) {
            clearTimeout(this.timeout)
          }
          this.cancel = undefined
          this.setState({isLoading: false})
          throw e
        })
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
      ...props,
    } = this.props
    const {isLoading} = this.state

    return (
      <Button
        {...props}
        onClick={onClick ? this.onClick : undefined}
        disabled={isLoading || disabled}
        style={{position: 'relative', ...style}}
      >
        {children}
        {isLoading && (
          <div style={{...fill(), ...center}}>
            <CircularProgress
              size={24}
              color={props.color === 'secondary' ? 'secondary' : 'primary'}
              {...progressProps}
            />
          </div>
        )}
      </Button>
    )
  }
}
