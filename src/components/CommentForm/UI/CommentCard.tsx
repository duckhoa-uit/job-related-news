type CardProps = {
  children: React.ReactNode
}

export default function CommentCard({ children }: CardProps): JSX.Element {
  return (
    <div className="mx-auto h-auto w-full max-w-3xl rounded-lg bg-zinc-100 p-4 text-[#67727e] shadow-sm dark:bg-stone-900 dark:text-slate-400 sm:p-6">
      {children}
    </div>
  )
}
