import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import MUISelect, {
  SelectProps as MUISelectProps,
} from '@material-ui/core/Select'
import React, {ReactNode} from 'react'
import {pure} from 'recompose'
import {Omit} from '../types'
import {FormField, FormFieldProps} from './helpers'

export type Choice<T = any> = {value: T; label: ReactNode}

export type SelectProps = Omit<MUISelectProps, 'value' | 'onChange' | 'error'> &
  FormFieldProps & {
    value?: string
    onChange?: (value: string) => void
    label?: ReactNode
    id?: string
    choices: Array<Choice>
    containerProps?: FormFieldProps
  }

export const Select = pure(
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
    choices,
    containerProps,
    ...props
  }: SelectProps) => (
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
      {label && (
        <InputLabel htmlFor={id} error={false} required={false}>
          {label}
        </InputLabel>
      )}
      <MUISelect
        {...props}
        value={value}
        onChange={onChange && (event => onChange(event.target.value))}
        input={
          <Input
            id={id}
            disabled={disabled}
            startAdornment={
              startAdornment && (
                <InputAdornment position="start">
                  {startAdornment}
                </InputAdornment>
              )
            }
            endAdornment={
              endAdornment && (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              )
            }
          />
        }
      >
        {choices.map((choice, i) => (
          <MenuItem key={i} value={choice.value}>
            {choice.label}
          </MenuItem>
        ))}
      </MUISelect>
    </FormField>
  ),
)
