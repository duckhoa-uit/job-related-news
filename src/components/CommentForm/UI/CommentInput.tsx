import { useAuth } from '@/hooks/useAuth'
import { LegacyRef } from 'react'

const REPLY_PLACEHOLDER = 'Add a comment...'

export default function Textarea(props: {
  textareaRef?: LegacyRef<HTMLTextAreaElement>
  content?: string
}): JSX.Element {
  const { user } = useAuth()
  return (
    <>
      <textarea
        ref={props.textareaRef}
        cols={25}
        rows={3}
        placeholder={REPLY_PLACEHOLDER}
        className={`text-md w-full rounded-lg border-[1px] border-slate-200 bg-white px-4 py-2 text-[#324152] selection:bg-[#c3c4ef] focus:border-transparent focus:outline-none  dark:bg-zinc-900 dark:text-slate-400
        `}
        defaultValue={props.content}
        autoFocus={user ? true : false}
      ></textarea>
    </>
  )
}
