import MUICheckbox, {
  CheckboxProps as MUICheckboxProps,
} from 'material-ui/Checkbox'
import React, {ReactNode} from 'react'
import {pure} from 'recompose'
import {Omit} from '../types'
import {FormField, FormFieldProps, wrapWithLabel} from './helpers'

export type CheckboxProps = Omit<
  MUICheckboxProps,
  'value' | 'onChange' | 'checked'
> &
  FormFieldProps & {
    value?: boolean
    onChange?: (value: boolean) => void
    label?: ReactNode
    id?: string
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
    >
      {wrapWithLabel(
        label,
        <MUICheckbox
          {...props}
          checked={value}
          onChange={onChange && ((_, checked) => onChange(checked))}
          disabled={disabled}
        />,
      )}
    </FormField>
  ),
)
