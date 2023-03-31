import React from 'react'
import { useController, useFormContext } from 'react-hook-form'

type TextInputFieldProps = {
  name: string
  label: React.ReactNode
  disabled?: boolean
} & React.HTMLProps<HTMLInputElement>

function TextField(props: TextInputFieldProps) {
  const { name, label, disabled = false, ...restProps } = props
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
        <input
          id={name}
          name={name}
          type="text"
          disabled={disabled}
          autoComplete={name}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          {...field}
          {...restProps}
        />
      </div>
      <span className="text-red-600">{error?.message}</span>
    </div>
  )
}

export default TextField
