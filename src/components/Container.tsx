import React, { CSSProperties, forwardRef } from 'react'
import clsx from 'clsx'

interface IOuterContainerProps {
  className?: string
}
export const OuterContainer = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<IOuterContainerProps>
>(function OuterContainer({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  )
})

interface InnerContainerProps {
  className?: string
}
export const InnerContainer = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<InnerContainerProps>
>(function InnerContainer({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  )
})
interface ContainerProps {
  className?: string
  style?: Omit<CSSProperties, 'position'> & { position: string }
}
export const Container = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<ContainerProps>
>(function Container({ children, ...props }, ref) {
  return (
    <OuterContainer ref={ref} {...props}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  )
})
