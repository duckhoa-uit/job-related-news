import React, { HTMLProps, ReactNode } from 'react'
import { LoadingDots } from '../LoadingDots'

type PrimaryButtonProps = {
  loading?: boolean
  loadingText?: string
  type?: 'button' | 'submit' | 'reset'
  text: string
} & HTMLProps<HTMLButtonElement>

const PrimaryButton = ({
  type = 'button',
  loading = false,
  loadingText = '',
  text,
  ...restProps
}: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      disabled={loading}
      className="group relative flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed"
      {...restProps}
    >
      {loading ? (
        <>
          <span className="flex justify-center py-2">
            <LoadingDots color="white" style="large" />
          </span>
          <span className="ml-2">{loadingText}</span>
        </>
      ) : (
        <>{text}</>
      )}
    </button>
  )
}

export default PrimaryButton
