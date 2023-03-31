import React from 'react'
import { useController, useFormContext } from 'react-hook-form'

type SelectProps = {
  name: string
  label: React.ReactNode
  placeholder?: string
  disabled?: boolean
  options: {
    label: string
    value: string
  }[]
}

function SelectField(props: SelectProps) {
  const {
    name,
    label,
    options,
    placeholder,
    disabled = false,
    ...restProps
  } = props
  const { control } = useFormContext()

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <div className="col-span-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-zinc-800 dark:text-zinc-100"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          id={name}
          name={name}
          autoComplete={name}
          disabled={disabled}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          {...field}
          {...restProps}
        >
          {placeholder && (
            <option value="" disabled selected hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <span className="text-red-600">{error?.message}</span>
    </div>
  )
}

export default SelectField
