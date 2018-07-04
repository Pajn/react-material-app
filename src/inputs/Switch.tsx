import MUISwitch, {SwitchProps as MUISwitchProps} from '@material-ui/core/Switch'
import React, {ReactNode} from 'react'
import {pure} from 'recompose'
import {Omit} from '../types'
import {FormField, FormFieldProps, wrapWithLabel} from './helpers'

export type SwitchProps = Omit<
  MUISwitchProps,
  'value' | 'onChange' | 'checked'
> &
  FormFieldProps & {
    value?: boolean
    onChange?: (value: boolean) => void
    label?: ReactNode
    id?: string
  }

export const Switch = pure(
  ({
    value = false,
    onChange,
    label,
    error,
    description,
    disabled,
    required,
    fullWidth,
    margin,
    onBlur,
    onFocus,
    ...props
  }: SwitchProps) => (
    <FormField
      disabled={disabled}
      required={required}
      description={description}
      error={error}
      fullWidth={fullWidth}
      margin={margin}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      {wrapWithLabel(
        label,
        <MUISwitch
          {...props}
          checked={value}
          onChange={onChange && ((_, checked) => onChange(checked))}
          disabled={disabled}
        />,
      )}
    </FormField>
  ),
)
