import Link, { LinkProps } from 'next/link'
import clsx from 'clsx'
import Image from 'next/future/image'
import { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react'
import { UserDataType } from '@/context/types'

function ChevronRightIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface CardProps {
  as?: keyof JSX.IntrinsicElements
  className?: string
  children: ReactNode
}
export const Card = ({
  as: Component = 'div',
  className,
  children,
}: CardProps) => {
  return (
    <Component
      className={clsx(
        className,
        'group relative flex max-w-2xl flex-col items-start '
      )}
    >
      {children}
    </Component>
  )
}

type CardLinkProps = {
  children: ReactNode
} & LinkProps
const CardLink = ({ children, ...props }: CardLinkProps) => (
  <>
    <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
    <Link {...props} passHref>
      <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
      <span className="relative z-10">{children}</span>
    </Link>
  </>
)
Card.Link = CardLink

Card.PostMedia = function CardPostMedia({ src }: { src: string }) {
  return (
    <div className="relative z-10 aspect-video w-full flex-shrink-0 overflow-hidden rounded-xl sm:rounded-2xl">
      <Image className="w-full object-cover" src={src} alt="" fill />
    </div>
  )
}

Card.PostMeta = function CardMeta({ date, dateTime, category }) {
  return (
    <div className="flex items-center gap-x-4 text-xs">
      <time dateTime={dateTime} className="text-gray-500">
        {date}
      </time>
      <a
        // TODO: add href
        // href={category.href}
        className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100"
      >
        {category}
      </a>
    </div>
  )
}

Card.PostBody = function PostBody({ href = '', title = '', description = '' }) {
  return (
    <div className="group relative mb-3">
      <h3 className="mt-3 text-base font-semibold leading-6 tracking-tight text-zinc-800 dark:text-zinc-100">
        {href ? (
          <Link href={href}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        ) : (
          <>{title}</>
        )}
      </h3>
      <p className="relative z-10 mt-2 text-sm leading-6 text-zinc-600 line-clamp-3 dark:text-zinc-400">
        {description}
      </p>
    </div>
  )
}
Card.PostAuthor = function PostAuthor({ author }: { author: UserDataType }) {
  return (
    <div className="relative mt-auto flex items-center gap-x-4">
      <div className="relative h-10 w-10 ">
        <Image
          fill
          src={author.photo}
          alt=""
          className="rounded-full bg-gray-50 object-cover"
        />
      </div>
      <div className="text-sm leading-5">
        <p className="text-base font-semibold leading-6 tracking-tight text-zinc-800 dark:text-zinc-100">
          {/* <Link href={'post.author.href'}> */}
          <span className="absolute inset-0" />
          {author.name}
          {/* </Link> */}
        </p>
        <p className="text-gray-600">{author.email}</p>
      </div>
    </div>
  )
}

interface CardTitleProps {
  as?: keyof JSX.IntrinsicElements
  href: string
  children: ReactNode
}
Card.Title = function CardTitle({
  as: Component = 'h2',
  href,
  children,
}: CardTitleProps) {
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  )
}

Card.Description = function CardDescription({ children }) {
  return (
    <p className="relative z-10 mt-2 text-sm text-zinc-600 line-clamp-3 dark:text-zinc-400">
      {children}
    </p>
  )
}
interface CardCtaProps {
  className?: string
  children: ReactNode
}
Card.Cta = function CardCta({ className, children }: CardCtaProps) {
  return (
    <div
      className={clsx(
        className,
        'relative z-10 flex items-center text-sm font-medium text-teal-500'
      )}
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  )
}

interface CardEyebrowProps {
  as: keyof JSX.IntrinsicElements
  decorate?: boolean
  className?: string
  children: ReactNode
}
Card.Eyebrow = function CardEyebrow({
  as: Component = 'p',
  decorate = false,
  className,
  children,
  ...props
}: CardEyebrowProps) {
  return (
    <Component
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
        decorate && 'pl-3.5'
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  )
}
