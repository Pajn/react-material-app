import MUICheckbox, {
  CheckboxProps as MUICheckboxProps,
} from '@material-ui/core/Checkbox'
import React, {ReactNode} from 'react'
import {pure} from 'recompose'
import {Omit} from '../types'
import {
  FormControlLabelProps,
  FormField,
  FormFieldProps,
  wrapWithLabel,
} from './helpers'

export type CheckboxProps = Omit<
  MUICheckboxProps,
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

export const Checkbox = pure(
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
  }: CheckboxProps) => (
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
        <MUICheckbox
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
