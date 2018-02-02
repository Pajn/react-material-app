import {
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormHelperText,
} from 'material-ui/Form'
import React, {ReactElement, ReactNode} from 'react'
import {Omit} from '../types'

export const wrapWithLabel = (label: ReactNode, control: ReactElement<any>) =>
  label ? <FormControlLabel label={label} control={control} /> : control

export type FormFieldProps = Omit<FormControlProps, 'onChange' | 'error'> & {
  label?: ReactNode
  description?: ReactNode
  error?: ReactNode
}

export const FormField = ({
  disabled,
  required,
  description,
  error,
  fullWidth,
  margin,
  onBlur,
  onFocus,
  children,
}: FormFieldProps) => (
  <FormControl
    disabled={disabled}
    required={required}
    error={!!error}
    fullWidth={fullWidth}
    margin={margin}
    onBlur={onBlur}
    onFocus={onFocus}
  >
    {children}
    {error && <FormHelperText>{error}</FormHelperText>}
    {!error && description && <FormHelperText>{description}</FormHelperText>}
  </FormControl>
)
