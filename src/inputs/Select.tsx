import Input, {InputAdornment, InputLabel} from 'material-ui/Input'
import {MenuItem} from 'material-ui/Menu'
import MUISelect, {SelectProps as MUISelectProps} from 'material-ui/Select'
import React, {ReactNode} from 'react'
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
  }

export const Select = ({
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
              <InputAdornment position="start">{startAdornment}</InputAdornment>
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
)
