import { HTMLProps, MouseEventHandler } from 'react'
import {
  PlusIcon,
  MinusIcon,
  EditIcon,
  DeleteIcon,
  CloseIcon,
  ReplyIcon,
} from './CommentIcon'

function ScoreButton(props: {
  children: React.ReactNode
  ariaLabel: string
  handleClick?: MouseEventHandler<HTMLButtonElement>
  isClicked?: boolean
  isPositive: boolean
}): JSX.Element {
  return (
    <button
      className={`flex h-full w-full items-center justify-center sm:h-24 ${
        props.isClicked
          ? props.isPositive
            ? 'fill-moderateBlue dark:fill-darkModeModerateBlue'
            : 'fill-softRed'
          : 'fill-lightGrayishBlue'
      }`}
      onClick={props.handleClick}
      aria-label={props.ariaLabel}
    >
      {props.children}
    </button>
  )
}

export function Plus(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>
  isClicked?: boolean
}): JSX.Element {
  return (
    <ScoreButton
      handleClick={props.handleClick}
      ariaLabel={'Upvote comment'}
      isClicked={props.isClicked}
      isPositive={true}
    >
      <PlusIcon />
    </ScoreButton>
  )
}

export function Minus(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>
  isClicked?: boolean
}): JSX.Element {
  return (
    <ScoreButton
      handleClick={props.handleClick}
      ariaLabel={'Downvote comment'}
      isClicked={props.isClicked}
      isPositive={false}
    >
      <MinusIcon />
    </ScoreButton>
  )
}

export function Reply(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>
}): JSX.Element {
  return (
    <button
      className="text-moderateBlue hover:text-lightGrayishBlue fill-moderateBlue hover:fill-lightGrayishBlue dark:text-darkModeModerateBlue dark:hover:text-lightGrayishBlue dark:fill-darkModeModerateBlue dark:hover:fill-lightGrayishBlue flex flex-row items-center justify-center gap-2 font-medium"
      onClick={props.handleClick}
      aria-label={'Add a comment reply'}
    >
      <ReplyIcon />
      Reply
    </button>
  )
}

export function Edit(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>
  readOnly?: boolean
}): JSX.Element {
  return (
    <button
      className={`flex flex-row items-center justify-center gap-2 font-medium  ${
        props.readOnly
          ? 'fill-moderateBlue text-moderateBlue dark:fill-darkModeModerateBlue dark:text-darkModeModerateBlue hover:text-lightGrayishBlue hover:fill-lightGrayishBlue'
          : 'fill-lightGrayishBlue text-lightGrayishBlue hover:fill-lightGrayishBlue cursor-not-allowed'
      } `}
      disabled={!props.readOnly}
      onClick={props.handleClick}
      aria-label={'Edit comment'}
    >
      <EditIcon />
      Edit
    </button>
  )
}

export function Delete(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>
}): JSX.Element {
  return (
    <button
      className="hover:text-paleRed fill-softRed hover:fill-paleRed flex flex-row items-center justify-center gap-2 font-medium text-red-500"
      onClick={props.handleClick}
      aria-label={'Delete comment'}
    >
      <DeleteIcon />
      Delete
    </button>
  )
}

type TextButtonProps = {
  label: string
  classStyle: string
  handleClick?: MouseEventHandler<HTMLButtonElement>
} & HTMLProps<HTMLButtonElement>
export function TextButton(props: TextButtonProps): JSX.Element {
  return (
    // inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 ml-4 flex-none
    <button
      className={`ml-4 inline-flex flex-none items-center justify-center gap-2 rounded-md bg-zinc-800 py-2 px-3 text-sm font-semibold text-zinc-100 outline-offset-2 transition hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 active:transition-none dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 ${props.classStyle}`}
      onClick={props.handleClick}
    >
      {props.label}
    </button>
  )
}
type PrimaryButtonProps = {
  label: string
  handleClick?: MouseEventHandler<HTMLButtonElement>
} & HTMLProps<HTMLButtonElement>
export function PrimaryButton(props: PrimaryButtonProps): JSX.Element {
  return (
    <TextButton
      label={props.label}
      classStyle={'bg-moderateBlue hover:bg-lightGrayishBlue'}
      handleClick={props.handleClick}
      {...props}
    />
  )
}

export function SecondaryButton(props: {
  label: string
  handleClick: MouseEventHandler<HTMLButtonElement>
}): JSX.Element {
  return (
    <TextButton
      label={props.label}
      classStyle={'bg-grayishBlue hover:bg-darkBlue w-full'}
      handleClick={props.handleClick}
    />
  )
}

export function ErrorButton(props: {
  label: string
  handleClick: MouseEventHandler<HTMLButtonElement>
}): JSX.Element {
  return (
    <TextButton
      label={props.label}
      classStyle={'bg-red-400 hover:bg-paleRed w-full'}
      handleClick={props.handleClick}
    />
  )
}

export function SendButton(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>
}): JSX.Element {
  return <PrimaryButton label={'Send'} handleClick={props.handleClick} />
}

export function ReplyButton(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>
}): JSX.Element {
  return (
    <PrimaryButton
      type="submit"
      label={'Reply'}
      handleClick={props.handleClick}
    />
  )
}

export function UpdateButton(props: {
  handleClick?: MouseEventHandler<HTMLButtonElement>
}): JSX.Element {
  return (
    <PrimaryButton
      type="submit"
      label={'Update'}
      handleClick={props.handleClick}
    />
  )
}

export function CloseButton(props: {
  classStyle?: string
  handleClose: MouseEventHandler<HTMLButtonElement>
}): JSX.Element {
  return (
    <button
      className="w-[16px]"
      onClick={props.handleClose}
      aria-label="Close menu"
    >
      <CloseIcon />
    </button>
  )
}
