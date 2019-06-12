import MUISwitch, {
  SwitchProps as MUISwitchProps,
} from '@material-ui/core/Switch'
import React, {ReactNode} from 'react'
import {pure} from 'recompose'
import {Omit} from '../types'
import {
  FormControlLabelProps,
  FormField,
  FormFieldProps,
  wrapWithLabel,
} from './helpers'

export type SwitchProps = Omit<
  MUISwitchProps,
  'value' | 'onChange' | 'checked'
> &
  FormFieldProps & {
    value?: boolean
    onChange?: (value: boolean) => void
    label?: ReactNode
    id?: string
    containerProps?: FormFieldProps
    FormControlLabelProps?: FormControlLabelProps
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
    containerProps,
    FormControlLabelProps,
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
      {...containerProps}
    >
      {wrapWithLabel(
        label,
        <MUISwitch
          {...props}
          checked={value}
          onChange={onChange && ((_, checked) => onChange(checked))}
          disabled={disabled}
        />,
        FormControlLabelProps,
      )}
    </FormField>
  ),
)
