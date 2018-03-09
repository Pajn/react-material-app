import {InputAdornment, InputProps} from 'material-ui/Input'
import MUITextField, {
  TextFieldProps as MUITextFieldProps,
} from 'material-ui/TextField'
import React, {ReactNode} from 'react'
import {Omit} from '../types'
import {FormField, FormFieldProps} from './helpers'

export type TextFieldProps = Omit<
  MUITextFieldProps,
  'value' | 'onChange' | 'error'
> &
  FormFieldProps & {
    value?: string
    onChange?: (value: string) => void
    label?: ReactNode
    id?: string
    startAdornment?: InputProps['startAdornment']
    endAdornment?: InputProps['endAdornment']
  }

export const TextField = ({
  value = '',
  onChange,
  label,
  error,
  description,
  disabled,
  required,
  id,
  startAdornment,
  endAdornment,
  fullWidth,
  margin,
  onBlur,
  onFocus,
  ...props
}: TextFieldProps) => (
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
    <MUITextField
      {...props}
      id={id}
      label={label}
      value={value}
      onChange={onChange && (event => onChange(event.target.value))}
      disabled={disabled}
      InputProps={{
        startAdornment: startAdornment && (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
        endAdornment: endAdornment && (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ),
      }}
    />
  </FormField>
)
