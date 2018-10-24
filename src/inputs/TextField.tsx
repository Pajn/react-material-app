import {FilledInputProps} from '@material-ui/core/FilledInput'
import {InputProps as StandardInputProps} from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import {OutlinedInputProps} from '@material-ui/core/OutlinedInput'
import MUITextField, {
  BaseTextFieldProps as MUITextFieldProps,
} from '@material-ui/core/TextField'
import React, {ReactNode} from 'react'
import {pure} from 'recompose'
import {Omit} from '../types'
import {FormField, FormFieldProps} from './helpers'

export type BaseTextFieldProps = Omit<
  MUITextFieldProps,
  'value' | 'onChange' | 'error'
> &
  FormFieldProps & {
    value?: string
    onChange?: (value: string) => void
    label?: ReactNode
    id?: string
    startAdornment?: StandardInputProps['startAdornment']
    endAdornment?: StandardInputProps['endAdornment']
    containerProps?: FormFieldProps
  }

export interface StandardTextFieldProps extends BaseTextFieldProps {
  variant?: 'standard'
  InputProps?: Partial<StandardInputProps>
  inputProps?: StandardInputProps['inputProps']
}

export interface FilledTextFieldProps extends BaseTextFieldProps {
  variant: 'filled'
  InputProps?: Partial<FilledInputProps>
  inputProps?: FilledInputProps['inputProps']
}

export interface OutlinedTextFieldProps extends BaseTextFieldProps {
  variant: 'outlined'
  InputProps?: Partial<OutlinedInputProps>
  inputProps?: OutlinedInputProps['inputProps']
}

export type TextFieldProps =
  | StandardTextFieldProps
  | FilledTextFieldProps
  | OutlinedTextFieldProps

export const TextField = pure(
  ({
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
    containerProps,
    variant,
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
      {...containerProps}
    >
      <MUITextField
        {...props}
        id={id}
        label={label}
        value={value}
        variant={variant as any}
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
  ),
)
